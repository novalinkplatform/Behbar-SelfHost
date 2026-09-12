import { renderRequestWizard } from './RequestWizard.ts';
import { pick } from '../i18n/lang.ts';
import type {
  VehicleTypeSetting,
  HomepageSection,
  ServiceCitiesSettings,
  ServiceCategoriesSettings,
  HeroSloganSetting,
} from '../utils/dynamicContent.ts';

export function renderHero(
  vehicleTypes?: VehicleTypeSetting[],
  section?: HomepageSection,
  serviceCities?: ServiceCitiesSettings,
  serviceCategorySettings?: ServiceCategoriesSettings,
  heroSlogan?: HeroSloganSetting,
): string {
  const isEnabled = heroSlogan?.enabled !== false;
  const headline = pick(
    heroSlogan?.headline?.fa || section?.heading || 'حمل و جابه‌جایی، ساده‌تر از همیشه',
    heroSlogan?.headline?.en || section?.headingEn || section?.heading || 'Moving and hauling, easier than ever',
  );
  const lead = pick(
    heroSlogan?.subtitle?.fa || section?.body || 'برای اثاث‌کشی یا حمل بار درخواست خود را ثبت کنید؛ در سریع‌ترین زمان با شما هماهنگ می‌کنیم.',
    heroSlogan?.subtitle?.en || section?.bodyEn || section?.body || "Submit your request for moving or freight; we'll get in touch with you as quickly as possible.",
  );
  const backgroundImageUrl = section?.backgroundImageUrl ?? '';

  return `
    <section class="hero"${backgroundImageUrl ? ` style="background-image: url('${backgroundImageUrl}')"` : ''}>
      ${backgroundImageUrl ? '<div class="hero-bg-overlay" aria-hidden="true"></div>' : ''}
      <div class="container hero-inner">
        ${
          isEnabled
            ? `
        <div class="hero-content">
          <h1>${headline}</h1>
          <p class="hero-lead">${lead}</p>
        </div>`
            : ''
        }

        ${renderRequestWizard(vehicleTypes, serviceCities, serviceCategorySettings)}
      </div>
    </section>
  `;
}
