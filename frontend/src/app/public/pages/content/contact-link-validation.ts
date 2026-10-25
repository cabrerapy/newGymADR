import type { ContactChannel, SocialProfile } from './public-content.models';

const socialHosts = new Set([
  'facebook.com',
  'instagram.com',
  'linkedin.com',
  'tiktok.com',
  'x.com',
  'youtube.com',
]);

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function isApproved(value: string): boolean {
  return value.trim().length > 0;
}

function isPhoneHref(href: string): boolean {
  return /^tel:\+[1-9]\d{7,14}$/i.test(href.trim());
}

function isWhatsAppHref(href: string): boolean {
  try {
    const url = new URL(href.trim());
    const phoneNumber = url.pathname.slice(1);

    return (
      url.protocol === 'https:' &&
      url.hostname === 'wa.me' &&
      url.username === '' &&
      url.password === '' &&
      url.search === '' &&
      url.hash === '' &&
      /^\d{7,15}$/.test(phoneNumber)
    );
  } catch {
    return false;
  }
}

function isEmailHref(href: string): boolean {
  const value = href.trim();

  return /^mailto:[^\s?#]+@[^\s?#]+\.[^\s?#]+$/i.test(value) && emailPattern.test(value.slice(7));
}

export function isVerifiedContactChannel(
  channel: ContactChannel,
): channel is ContactChannel & { href: string } {
  if (channel.status !== 'approved' || !isApproved(channel.href ?? '')) {
    return false;
  }

  const href = channel.href as string;

  if (channel.type === 'phone') {
    return isPhoneHref(href);
  }

  if (channel.type === 'whatsapp') {
    return isWhatsAppHref(href);
  }

  return isEmailHref(href);
}

export function isVerifiedSocialProfile(
  profile: SocialProfile,
): profile is SocialProfile & { url: string } {
  if (profile.status !== 'approved' || !isApproved(profile.url)) {
    return false;
  }

  try {
    const url = new URL(profile.url.trim());
    const hostname = url.hostname.replace(/^www\./, '');

    return (
      url.protocol === 'https:' &&
      socialHosts.has(hostname) &&
      url.username === '' &&
      url.password === '' &&
      url.pathname !== '/' &&
      url.search === '' &&
      url.hash === ''
    );
  } catch {
    return false;
  }
}
