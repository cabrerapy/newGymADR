import {
  activities,
  activitiesPageContent,
  coachProfiles,
  coachesPageContent,
  contactInformation,
  facilitiesPageContent,
  studentAccessPageContent,
  facilityGalleryItems,
  gymPageContent,
  homePageContent,
  scheduleDays,
  schedulesPageContent,
} from './public-content';

describe('Contenido público tipado', () => {
  it('mantiene todo el contenido inicial pendiente de validación', () => {
    expect(homePageContent.status).toBe('pending-validation');
    expect(homePageContent.hero.status).toBe('pending-validation');
    expect(gymPageContent.status).toBe('pending-validation');
    expect(gymPageContent.hero.status).toBe('pending-validation');
    expect(coachesPageContent.status).toBe('pending-validation');
    expect(coachesPageContent.hero.status).toBe('pending-validation');
    expect(facilitiesPageContent.status).toBe('pending-validation');
    expect(facilitiesPageContent.hero.status).toBe('pending-validation');
    expect(schedulesPageContent.status).toBe('pending-validation');
    expect(schedulesPageContent.hero.status).toBe('pending-validation');
    expect(activitiesPageContent.status).toBe('pending-validation');
    expect(activitiesPageContent.hero.status).toBe('pending-validation');
    expect(homePageContent.benefits.every((item) => item.status === 'pending-validation')).toBe(true);
    expect(gymPageContent.benefits.every((item) => item.status === 'pending-validation')).toBe(true);
    expect(gymPageContent.photos.every((item) => item.status === 'pending-validation')).toBe(true);
    expect(facilitiesPageContent.facilities.every((item) => item.status === 'pending-validation')).toBe(true);
    expect(facilitiesPageContent.features.every((item) => item.status === 'pending-validation')).toBe(true);
  });

  it('no publica galería, horarios ni actividades antes de su aprobación', () => {
    expect(facilityGalleryItems).toEqual([]);
    expect(scheduleDays).toEqual([]);
    expect(activities).toEqual([]);
  });

  it('no publica perfiles de entrenadores antes de su aprobación', () => {
    expect(coachProfiles).toEqual([]);
  });

  it('mantiene los datos de contacto sin destinos operativos inventados', () => {
    expect(contactInformation.status).toBe('pending-validation');
    expect(contactInformation.channels.every((channel) => channel.status === 'pending-validation')).toBe(true);
    expect(contactInformation.channels.every((channel) => !channel.href)).toBe(true);
    expect(contactInformation.socialProfiles).toEqual([]);
    expect(contactInformation.location.status).toBe('pending-validation');
    expect(contactInformation.supportHours).toEqual([]);
  });

  it('diferencia las funciones planificadas del acceso público disponible', () => {
    expect(studentAccessPageContent.status).toBe('pending-validation');
    expect(studentAccessPageContent.features.every((feature) => feature.contentStatus === 'pending-validation')).toBe(true);
    expect(studentAccessPageContent.features.filter((feature) => feature.availability === 'planned')).toHaveLength(5);

    const helpAndContact = studentAccessPageContent.features.find(
      (feature) => feature.id === 'help-and-contact',
    );
    expect(helpAndContact?.availability).toBe('available');
    expect(studentAccessPageContent.architecture.safeguards).toContain(
      'No se ha implementado autenticación en esta entrega.',
    );
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
