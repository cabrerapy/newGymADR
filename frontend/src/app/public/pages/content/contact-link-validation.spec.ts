import {
  isVerifiedContactChannel,
  isVerifiedSocialProfile,
} from './contact-link-validation';
import type { ContactChannel, SocialProfile } from './public-content.models';

const makeChannel = (
  type: ContactChannel['type'],
  href: string,
  status: ContactChannel['status'] = 'approved',
): ContactChannel => ({
  id: `${type}-test`,
  type,
  label: 'Canal de prueba',
  description: 'Canal utilizado para validar el destino publicado.',
  status,
  href,
});

const makeProfile = (
  url: string,
  status: SocialProfile['status'] = 'approved',
): SocialProfile => ({
  id: 'social-test',
  network: 'instagram',
  label: 'Instagram de prueba',
  url,
  status,
});

describe('Validación de enlaces de contacto', () => {
  it('acepta teléfonos aprobados con formato internacional y rechaza formatos inseguros', () => {
    expect(isVerifiedContactChannel(makeChannel('phone', 'tel:+595981122333'))).toBe(true);
    expect(isVerifiedContactChannel(makeChannel('phone', 'tel:0981122333'))).toBe(false);
    expect(isVerifiedContactChannel(makeChannel('phone', 'tel:+01234567'))).toBe(false);
    expect(isVerifiedContactChannel(makeChannel('phone', 'https://example.com/phone'))).toBe(false);
  });

  it('acepta únicamente WhatsApp HTTPS en wa.me y sin parámetros', () => {
    expect(isVerifiedContactChannel(makeChannel('whatsapp', 'https://wa.me/595981122333'))).toBe(true);
    expect(isVerifiedContactChannel(makeChannel('whatsapp', 'http://wa.me/595981122333'))).toBe(false);
    expect(isVerifiedContactChannel(makeChannel('whatsapp', 'https://wa.me/abc'))).toBe(false);
    expect(isVerifiedContactChannel(makeChannel('whatsapp', 'https://wa.me/595981122333?text=hola'))).toBe(false);
    expect(isVerifiedContactChannel(makeChannel('whatsapp', 'https://example.com/595981122333'))).toBe(false);
  });

  it('acepta correos mailto aprobados y rechaza destinos incompletos o externos', () => {
    expect(isVerifiedContactChannel(makeChannel('email', 'mailto:contacto@adr.com.py'))).toBe(true);
    expect(isVerifiedContactChannel(makeChannel('email', 'mailto:contacto@adr'))).toBe(false);
    expect(isVerifiedContactChannel(makeChannel('email', 'mailto:contacto@adr.com.py?subject=Consulta'))).toBe(false);
    expect(isVerifiedContactChannel(makeChannel('email', 'https://adr.com.py/contacto'))).toBe(false);
  });

  it('no publica un canal aprobado cuando su contenido todavía está pendiente', () => {
    expect(
      isVerifiedContactChannel(
        makeChannel('phone', 'tel:+595981122333', 'pending-validation'),
      ),
    ).toBe(false);
  });

  it('acepta perfiles sociales HTTPS permitidos y rechaza dominios o URLs inseguras', () => {
    expect(isVerifiedSocialProfile(makeProfile('https://instagram.com/adrcross'))).toBe(true);
    expect(isVerifiedSocialProfile(makeProfile('https://www.youtube.com/@adrcross'))).toBe(true);
    expect(isVerifiedSocialProfile(makeProfile('http://instagram.com/adrcross'))).toBe(false);
    expect(isVerifiedSocialProfile(makeProfile('https://example.com/adrcross'))).toBe(false);
    expect(isVerifiedSocialProfile(makeProfile('https://instagram.com/'))).toBe(false);
    expect(isVerifiedSocialProfile(makeProfile('https://instagram.com/adrcross?utm=test'))).toBe(false);
  });

  it('no publica un perfil social aprobado cuando su contenido está pendiente', () => {
    expect(
      isVerifiedSocialProfile(
        makeProfile('https://instagram.com/adrcross', 'pending-validation'),
      ),
    ).toBe(false);
  });
});
