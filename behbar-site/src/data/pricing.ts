const INTERCITY_DISTANCE_THRESHOLD_KM = 45;

const PROPERTY_TYPE_SURCHARGE: Record<string, number> = {
  residential: 0,
  commercial: 600000,
  office: 450000,
  warehouse: 800000,
  other: 0,
};

const FLOOR_COST_WITHOUT_ELEVATOR = 180000;
const PACKING_COST = 900000;
const LABOR_COST_PER_SIDE = 700000;

export interface CostEstimateInput {
  basePrice: number;
  perKmRate: number;
  floorCostExempt: boolean;
  originFloor: number;
  originHasElevator: boolean;
  originPropertyType: string;
  originLat?: number | null;
  originLng?: number | null;
  destinationFloor: number;
  destinationHasElevator: boolean;
  destinationPropertyType: string;
  destinationLat?: number | null;
  destinationLng?: number | null;
  wantsPacking: boolean;
  laborChoice: 'none' | 'origin' | 'destination' | 'both';
}

export interface CostEstimate {
  min: number;
  avg: number;
  max: number;
  distanceKm: number | null;
  isIntercity: boolean;
}

function haversineKm(lat1: number, lng1: number, lat2: number, lng2: number): number {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLng = ((lng2 - lng1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) * Math.cos((lat2 * Math.PI) / 180) * Math.sin(dLng / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

function floorCost(floor: number, hasElevator: boolean, exempt: boolean): number {
  if (hasElevator || floor <= 0 || exempt) return 0;
  return floor * FLOOR_COST_WITHOUT_ELEVATOR;
}

function laborCost(choice: CostEstimateInput['laborChoice']): number {
  if (choice === 'both') return LABOR_COST_PER_SIDE * 2;
  if (choice === 'origin' || choice === 'destination') return LABOR_COST_PER_SIDE;
  return 0;
}

function propertyTypeCost(type: string): number {
  return PROPERTY_TYPE_SURCHARGE[type] ?? 0;
}

export function estimateCost(input: CostEstimateInput): CostEstimate {
  const distanceKm =
    input.originLat != null && input.originLng != null && input.destinationLat != null && input.destinationLng != null
      ? haversineKm(input.originLat, input.originLng, input.destinationLat, input.destinationLng)
      : null;

  const isIntercity = (distanceKm ?? 0) > INTERCITY_DISTANCE_THRESHOLD_KM;

  const base = isIntercity ? input.perKmRate * (distanceKm as number) : input.basePrice;

  const total =
    base +
    floorCost(input.originFloor, input.originHasElevator, input.floorCostExempt) +
    floorCost(input.destinationFloor, input.destinationHasElevator, input.floorCostExempt) +
    propertyTypeCost(input.originPropertyType) +
    propertyTypeCost(input.destinationPropertyType) +
    (input.wantsPacking ? PACKING_COST : 0) +
    laborCost(input.laborChoice);

  return {
    min: Math.round(total * 0.88),
    avg: Math.round(total),
    max: Math.round(total * 1.18),
    distanceKm: distanceKm != null ? Math.round(distanceKm) : null,
    isIntercity,
  };
}
