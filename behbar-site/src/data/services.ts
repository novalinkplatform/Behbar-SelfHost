import type { ServiceCategory } from '../types/index.ts';
import { icons } from '../components/icons.ts';
import type { VehicleTypeSetting } from '../utils/dynamicContent.ts';

export const serviceCategories: ServiceCategory[] = [
  {
    id: 'domestic',
    label: 'ثبت بارهای داخلی',
    labelEn: 'Domestic Freight',
    icon: icons.truck,
    subtitle: 'تریلی، کامیون، کامیونت، نیسان، وانت و موتور',
    subtitleEn: 'Trailer, truck, light truck, van, pickup and motorcycle',
  },
  {
    id: 'transit',
    label: 'ثبت بارهای ترانزیت',
    labelEn: 'Transit Freight',
    icon: icons.truck,
    subtitle: 'بین‌الملل',
    subtitleEn: 'International',
  },
  {
    id: 'moving',
    label: 'ثبت بار اسباب‌کشی',
    labelEn: 'Household Moving',
    icon: icons.truck,
    subtitle: 'کامیونت، خاور، نیسان، وانت',
    subtitleEn: 'Light truck, van and pickup',
  },
];

// در صورتی که تنظیمات وسیله‌ها از سرور بارگذاری نشود، این فهرست پیش‌فرض به‌کار می‌رود.
export const DEFAULT_VEHICLE_TYPES: VehicleTypeSetting[] = [
  { id: 'motorcycle', label: 'موتور', labelEn: 'Motorcycle', icon: 'motorcycle', basePrice: 180000, perKmRate: 6000, floorCostExempt: true, active: true, sortOrder: 1 },
  { id: 'pickup', label: 'وانت', labelEn: 'Pickup', icon: 'pickup', basePrice: 950000, perKmRate: 26000, floorCostExempt: false, active: true, sortOrder: 2 },
  { id: 'van', label: 'نیسان', labelEn: 'Van', icon: 'van', basePrice: 1300000, perKmRate: 32000, floorCostExempt: false, active: true, sortOrder: 3 },
  { id: 'light-truck', label: 'خاور', labelEn: 'Light truck', icon: 'lightTruck', basePrice: 2100000, perKmRate: 55000, floorCostExempt: false, active: true, sortOrder: 4 },
  { id: 'truck', label: 'کامیون', labelEn: 'Truck', icon: 'truck', basePrice: 3000000, perKmRate: 90000, floorCostExempt: false, active: true, sortOrder: 5 },
  { id: 'trailer', label: 'تریلی', labelEn: 'Trailer', icon: 'trailer', basePrice: 4500000, perKmRate: 140000, floorCostExempt: false, active: true, sortOrder: 6 },
];

// هر دسته‌بندی بار فقط زیرمجموعه‌ای از وسایل نقلیه را در مرحله‌ی بعد نشان می‌دهد.
// «ترانزیت» فقط وسایل سنگین (کامیون/تریلی) را نشان می‌دهد چون حمل بین‌المللی جاده‌ای معمولاً با این دو انجام می‌شود.
export const CATEGORY_VEHICLE_IDS: Record<string, string[]> = {
  domestic: ['motorcycle', 'pickup', 'van', 'light-truck', 'truck', 'trailer'],
  transit: ['truck', 'trailer'],
  moving: ['pickup', 'van', 'light-truck'],
};

// موتور فقط برای بارهای داخلی و فقط درون‌شهری کاربرد دارد.
export const MOTORCYCLE_VEHICLE_ID = 'motorcycle';

const VEHICLE_ICON_MAP: Record<string, string> = {
  motorcycle: icons.motorcycle,
  pickup: icons.pickup,
  van: icons.van,
  lightTruck: icons.lightTruck,
  truck: icons.truck,
  trailer: icons.trailer,
};

export function vehicleIcon(iconKey: string): string {
  return VEHICLE_ICON_MAP[iconKey] ?? icons.van;
}
