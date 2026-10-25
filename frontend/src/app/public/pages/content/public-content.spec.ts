import {
  coachProfiles,
  coachesPageContent,
  gymPageContent,
  homePageContent,
} from './public-content';

describe('Contenido público tipado', () => {
  it('mantiene todo el contenido inicial pendiente de validación', () => {
    expect(homePageContent.status).toBe('pending-validation');
    expect(homePageContent.hero.status).toBe('pending-validation');
    expect(gymPageContent.status).toBe('pending-validation');
    expect(gymPageContent.hero.status).toBe('pending-validation');
    expect(coachesPageContent.status).toBe('pending-validation');
    expect(coachesPageContent.hero.status).toBe('pending-validation');
    expect(homePageContent.benefits.every((item) => item.status === 'pending-validation')).toBe(true);
    expect(gymPageContent.benefits.every((item) => item.status === 'pending-validation')).toBe(true);
    expect(gymPageContent.photos.every((item) => item.status === 'pending-validation')).toBe(true);
  });

  it('no publica perfiles de entrenadores antes de su aprobación', () => {
    expect(coachProfiles).toEqual([]);
  });

  it('define enlaces de portada sin datos operativos inventados', () => {
    expect(homePageContent.hero.actions.map((action) => action.path)).toEqual([
      '/gimnasio',
      '/horarios',
      '/contacto',
      '/acceso-alumnos',
    ]);
  });
});
