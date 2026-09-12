import { formatToman } from '../utils/format.ts';
import { toPersianDigits } from '../utils/jalali.ts';
import { pick } from '../i18n/lang.ts';
import type { CostEstimate } from '../data/pricing.ts';

export function renderCostChart(estimate: CostEstimate): string {
  return `
    <div class="cost-chart">
      <svg viewBox="0 0 400 150" role="img" aria-label="${pick('نمودار برآورد هزینه جابه‌جایی', 'Moving cost estimate chart')}">
        <path class="cost-chart-area" d="M20,125 C90,20 310,20 380,125 Z" />
        <line class="cost-chart-baseline" x1="20" y1="125" x2="380" y2="125" />
        <path class="cost-chart-arc" d="M20,125 C90,20 310,20 380,125" />
        <line class="cost-chart-avg-line" x1="200" y1="20" x2="200" y2="125" />
        <circle class="cost-chart-avg-dot" cx="200" cy="20" r="4.5" />
        <text class="cost-chart-label" x="20" y="144">${formatToman(estimate.min)}</text>
        <text class="cost-chart-label" x="380" y="144" text-anchor="end">${formatToman(estimate.max)}</text>
      </svg>
      <div class="cost-chart-avg-value">
        <span class="cost-chart-avg-caption">${pick('میانگین برآورد هزینه', 'Average estimated cost')}</span>
        <span class="cost-chart-avg-amount">${formatToman(estimate.avg)}</span>
      </div>
      ${
        estimate.isIntercity && estimate.distanceKm
          ? `<p class="cost-chart-distance">${pick(
              `مسیر بین‌شهری — فاصله تقریبی ${toPersianDigits(estimate.distanceKm)} کیلومتر`,
              `Intercity route — approx. ${toPersianDigits(estimate.distanceKm)} km`,
            )}</p>`
          : ''
      }
      <p class="cost-chart-disclaimer">
        ${pick('این فقط یک برآورد اولیه است؛ قیمت نهایی را با کارشناسان ما هماهنگ کنید.', 'This is only a preliminary estimate; confirm the final price with our team.')}
      </p>
    </div>
  `;
}
