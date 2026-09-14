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

export const INSURANCE_BASE_COST = 250000;
export const WAYBILL_BASE_COST = 180000;

export interface InvoiceItem {
  id: string;
  title: string;
  description: string;
  amount: number;
}

export interface DetailedInvoice {
  items: InvoiceItem[];
  subtotal: number;
  discount: number;
  tax: number;
  total: number;
  isIntercity: boolean;
  distanceKm: number | null;
}

export function calculateDetailedInvoice(
  input: CostEstimateInput,
  _options?: { serviceLabel?: string; originCity?: string; destinationCity?: string },
): DetailedInvoice {
  const distanceKm =
    input.originLat != null && input.originLng != null && input.destinationLat != null && input.destinationLng != null
      ? haversineKm(input.originLat, input.originLng, input.destinationLat, input.destinationLng)
      : null;

  const isIntercity = (distanceKm ?? 0) > INTERCITY_DISTANCE_THRESHOLD_KM;
  const baseFare = isIntercity ? input.perKmRate * (distanceKm as number) : input.basePrice;

  const originFloorCost = floorCost(input.originFloor, input.originHasElevator, input.floorCostExempt);
  const destFloorCost = floorCost(input.destinationFloor, input.destinationHasElevator, input.floorCostExempt);
  const totalFloorCost = originFloorCost + destFloorCost;

  const propCost = propertyTypeCost(input.originPropertyType) + propertyTypeCost(input.destinationPropertyType);
  const laborAmount = laborCost(input.laborChoice);
  const packingAmount = input.wantsPacking ? PACKING_COST : 0;
  const insuranceAmount = INSURANCE_BASE_COST;
  const waybillAmount = WAYBILL_BASE_COST;

  const freightTotal = Math.round(baseFare + propCost);

  const items: InvoiceItem[] = [
    {
      id: 'freight',
      title: 'کرایه پایه حمل و نقل',
      description: isIntercity && distanceKm
        ? `حمل بار بین‌شهری — مسافت تقریبی ${Math.round(distanceKm)} کیلومتر`
        : 'کرایه ناوگان و راننده در مسیر درون‌شهری',
      amount: freightTotal,
    },
  ];

  if (laborAmount > 0) {
    const laborDesc =
      input.laborChoice === 'both'
        ? 'خدمات کارگر متخصص بارگیری و تخلیه (مبدأ و مقصد)'
        : input.laborChoice === 'origin'
        ? 'خدمات کارگر بارگیری در مبدأ'
        : 'خدمات کارگر تخلیه در مقصد';
    items.push({
      id: 'labor',
      title: 'خدمات نیروی کارگر باربری',
      description: laborDesc,
      amount: laborAmount,
    });
  } else {
    items.push({
      id: 'labor',
      title: 'خدمات نیروی کارگر باربری',
      description: 'عدم درخواست کارگر توسط مشتری',
      amount: 0,
    });
  }

  items.push({
    id: 'insurance',
    title: 'حق بیمه‌نامه رسمی باربری',
    description: 'پوشش کامل حوادث، آتش‌سوزی، سرقت و خسارت حین بارگیری و حمل کالا',
    amount: insuranceAmount,
  });

  items.push({
    id: 'waybill',
    title: 'صدور بارنامه رسمی راهداری',
    description: 'سند الکترونیک رسمی راهداری، تمبر دولتی و کد رهگیری ترابری کشوری',
    amount: waybillAmount,
  });

  if (packingAmount > 0) {
    items.push({
      id: 'packing',
      title: 'خدمات بسته‌بندی و لوازم ایمن',
      description: 'کارتن‌های ۵ لایه، بابل‌رپ، سلفون‌کشی و بسته‌بندی حرفه‌ای اثاثیه',
      amount: packingAmount,
    });
  }

  if (totalFloorCost > 0) {
    const floorDetails: string[] = [];
    if (originFloorCost > 0) floorDetails.push(`مبدأ: طبقه ${input.originFloor} بدون آسانسور`);
    if (destFloorCost > 0) floorDetails.push(`مقصد: طبقه ${input.destinationFloor} بدون آسانسور`);
    items.push({
      id: 'floors',
      title: 'هزینه جابه‌جایی طبقات',
      description: floorDetails.join(' · '),
      amount: totalFloorCost,
    });
  }

  const total = freightTotal + laborAmount + insuranceAmount + waybillAmount + packingAmount + totalFloorCost;

  return {
    items,
    subtotal: total,
    discount: 0,
    tax: 0,
    total,
    isIntercity,
    distanceKm: distanceKm != null ? Math.round(distanceKm) : null,
  };
}

export function resolveOrderInvoice(order: {
  estimateAvg: number;
  serviceLabel?: string;
  originFloor?: number;
  originElevator?: boolean;
  destinationFloor?: number;
  destinationElevator?: boolean;
  wantsPacking?: boolean;
  laborChoice?: string;
  originCity?: string;
  destinationCity?: string;
}): DetailedInvoice {
  const laborChoice = (order.laborChoice || 'none') as CostEstimateInput['laborChoice'];
  let laborAmount = 0;
  let laborDesc = 'عدم درخواست کارگر';
  if (laborChoice === 'both') {
    laborAmount = LABOR_COST_PER_SIDE * 2;
    laborDesc = 'خدمات کارگر متخصص بارگیری و تخلیه (مبدأ و مقصد)';
  } else if (laborChoice === 'origin') {
    laborAmount = LABOR_COST_PER_SIDE;
    laborDesc = 'خدمات کارگر بارگیری در مبدأ';
  } else if (laborChoice === 'destination') {
    laborAmount = LABOR_COST_PER_SIDE;
    laborDesc = 'خدمات کارگر تخلیه در مقصد';
  }

  const packingAmount = order.wantsPacking ? PACKING_COST : 0;
  let floorAmount = 0;
  const floorDetails: string[] = [];
  if (!order.originElevator && (order.originFloor ?? 0) > 0) {
    floorAmount += (order.originFloor ?? 0) * FLOOR_COST_WITHOUT_ELEVATOR;
    floorDetails.push(`مبدأ: طبقه ${order.originFloor}`);
  }
  if (!order.destinationElevator && (order.destinationFloor ?? 0) > 0) {
    floorAmount += (order.destinationFloor ?? 0) * FLOOR_COST_WITHOUT_ELEVATOR;
    floorDetails.push(`مقصد: طبقه ${order.destinationFloor}`);
  }

  const insuranceAmount = INSURANCE_BASE_COST;
  const waybillAmount = WAYBILL_BASE_COST;

  const total = Math.max(order.estimateAvg || 0, 1000000);
  const extraCosts = laborAmount + packingAmount + floorAmount + insuranceAmount + waybillAmount;
  let freightAmount = total - extraCosts;
  if (freightAmount < 400000) {
    freightAmount = Math.round(total * 0.55);
  }

  // Adjust total to match items sum
  const itemsSum = freightAmount + laborAmount + insuranceAmount + waybillAmount + packingAmount + floorAmount;

  const items: InvoiceItem[] = [
    {
      id: 'freight',
      title: 'کرایه پایه حمل و نقل',
      description: order.originCity && order.destinationCity
        ? `کرایه ترابری از ${order.originCity} به ${order.destinationCity}`
        : 'کرایه پایه ناوگان و راننده',
      amount: freightAmount,
    },
    {
      id: 'labor',
      title: 'خدمات نیروی کارگر باربری',
      description: laborDesc,
      amount: laborAmount,
    },
    {
      id: 'insurance',
      title: 'حق بیمه‌نامه رسمی باربری',
      description: 'پوشش کامل حوادث، آتش‌سوزی، سرقت و خسارت حین بارگیری و حمل کالا',
      amount: insuranceAmount,
    },
    {
      id: 'waybill',
      title: 'صدور بارنامه رسمی راهداری',
      description: 'سند الکترونیک رسمی راهداری، تمبر دولتی و کد رهگیری ترابری کشوری',
      amount: waybillAmount,
    },
  ];

  if (packingAmount > 0) {
    items.push({
      id: 'packing',
      title: 'خدمات بسته‌بندی و لوازم ایمن',
      description: 'بسته‌بندی حرفه‌ای و لوازم محافظ اثاثیه',
      amount: packingAmount,
    });
  }

  if (floorAmount > 0) {
    items.push({
      id: 'floors',
      title: 'هزینه جابه‌جایی طبقات بدون آسانسور',
      description: floorDetails.join(' · '),
      amount: floorAmount,
    });
  }

  return {
    items,
    subtotal: itemsSum,
    discount: 0,
    tax: 0,
    total: itemsSum,
    isIntercity: false,
    distanceKm: null,
  };
}

export function estimateCost(input: CostEstimateInput): CostEstimate {
  const detailed = calculateDetailedInvoice(input);
  const total = detailed.total;

  return {
    min: Math.round(total * 0.9),
    avg: Math.round(total),
    max: Math.round(total * 1.15),
    distanceKm: detailed.distanceKm,
    isIntercity: detailed.isIntercity,
  };
}

