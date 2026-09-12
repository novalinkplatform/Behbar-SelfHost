import { localeDigits } from '../i18n/lang.ts';
import type { ContactSettings } from '../utils/dynamicContent.ts';

const FALLBACK_CONTACT: ContactSettings = {
  phoneDisplay: '021-200200',
  phoneTelHref: 'tel:+9821200200',
  socialLinks: [
    { id: 'wa1', platform: 'whatsapp', label: 'واتساپ', url: 'https://wa.me/9821200200' },
    { id: 'tg1', platform: 'telegram', label: 'تلگرام', url: '#' },
    { id: 'ig1', platform: 'instagram', label: 'اینستاگرام', url: '#' },
    { id: 'em1', platform: 'mail', label: 'ایمیل', url: '#' },
  ],
};

export function resolveContact(contact?: ContactSettings): ContactSettings {
  if (!contact) return FALLBACK_CONTACT;
  return { ...contact, socialLinks: contact.socialLinks ?? FALLBACK_CONTACT.socialLinks };
}

export function phoneNumberDisplay(contact?: ContactSettings): string {
  return localeDigits(resolveContact(contact).phoneDisplay);
}
