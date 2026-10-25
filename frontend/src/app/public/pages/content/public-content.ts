import type {
  CoachesPageContent,
  CoachProfile,
  GymPageContent,
  HomePageContent,
} from './public-content.models';

export const homePageContent: HomePageContent = {
  status: 'pending-validation',
  hero: {
    status: 'pending-validation',
    eyebrow: 'Portal público · Contenido provisional',
    title: 'ADR CROSS',
    intro:
      'Conoce el gimnasio, sus espacios y las vías de contacto. Este contenido institucional es provisional y editable hasta recibir la información oficial.',
    actions: [
      { path: '/gimnasio', label: 'Conocer el gimnasio', tone: 'primary' },
      { path: '/horarios', label: 'Consultar horarios', tone: 'secondary' },
      { path: '/contacto', label: 'Contacto', tone: 'secondary' },
      { path: '/acceso-alumnos', label: 'Acceso alumnos', tone: 'secondary' },
    ],
  },
  benefits: [
    {
      id: 'movement',
      status: 'pending-validation',
      title: 'Movimiento con propósito',
      description:
        'El entrenamiento funcional puede organizarse alrededor de patrones de movimiento y progresiones adaptadas. Texto provisional editable.',
    },
    {
      id: 'guidance',
      status: 'pending-validation',
      title: 'Acompañamiento y técnica',
      description:
        'El equipo podrá describir aquí su enfoque de seguimiento y corrección técnica. Información pendiente de validación.',
    },
    {
      id: 'community',
      status: 'pending-validation',
      title: 'Comunidad deportiva',
      description:
        'La motivación colectiva y el respeto son valores que el equipo podrá desarrollar con sus propias palabras.',
    },
  ],
  facilities: [
    {
      id: 'box',
      status: 'pending-validation',
      title: 'Box de entrenamiento',
      description:
        'La distribución, el equipamiento y las condiciones de uso están pendientes de confirmación oficial.',
    },
    {
      id: 'support',
      status: 'pending-validation',
      title: 'Zonas de apoyo',
      description:
        'La relación de espacios de preparación, descanso y atención queda pendiente de verificación oficial.',
    },
    {
      id: 'access',
      status: 'pending-validation',
      title: 'Acceso y comodidad',
      description:
        'Los detalles de acceso, capacidad y servicios complementarios se publicarán tras su revisión.',
    },
  ],
  coachPreview: {
    title: 'Entrenadores',
    description:
      'La presentación del equipo se publicará cuando existan perfiles aprobados. Conoce el estado de esta sección.',
  },
};

export const gymPageContent: GymPageContent = {
  status: 'pending-validation',
  hero: {
    status: 'pending-validation',
    eyebrow: 'Gimnasio · Contenido provisional',
    title: 'Gimnasio',
    intro:
      'Conoce el espacio y el enfoque del box. La información institucional, histórica y descriptiva de esta página es provisional y editable hasta su validación oficial.',
  },
  history: {
    title: 'Nuestra historia',
    description:
      'La historia de ADR Cross y los hitos del box se incorporarán cuando el equipo confirme fechas, origen y evolución del proyecto.',
  },
  philosophy: {
    title: 'Filosofía del box',
    description:
      'La filosofía de entrenamiento, los valores y el enfoque pedagógico están pendientes de revisión y aprobación editorial.',
  },
  benefits: [
    {
      id: 'functional-movement',
      status: 'pending-validation',
      title: 'Movilidad y control',
      description:
        'El entrenamiento funcional puede trabajar patrones de movimiento y control corporal. Descripción provisional editable.',
    },
    {
      id: 'progressive-strength',
      status: 'pending-validation',
      title: 'Fuerza progresiva',
      description:
        'Las propuestas de fuerza podrán presentarse aquí cuando el equipo valide progresiones, materiales y criterios de seguridad.',
    },
    {
      id: 'conditioning',
      status: 'pending-validation',
      title: 'Condición física',
      description:
        'La descripción de las sesiones y sus objetivos se completará con información oficial verificada.',
    },
  ],
  community: {
    title: 'Comunidad y espíritu deportivo',
    description:
      'El relato sobre la comunidad, la colaboración y el espíritu deportivo del box está pendiente de validación por el equipo.',
  },
  photos: [
    {
      id: 'box-overview',
      status: 'pending-validation',
      title: 'Vista general del box',
      description: 'Fotografía oficial pendiente de entrega y autorización de uso.',
    },
    {
      id: 'training-zones',
      status: 'pending-validation',
      title: 'Zonas de entrenamiento',
      description: 'Fotografía oficial pendiente de entrega y autorización de uso.',
    },
    {
      id: 'equipment-detail',
      status: 'pending-validation',
      title: 'Detalle del equipamiento',
      description: 'Fotografía oficial pendiente de entrega y autorización de uso.',
    },
  ],
};

export const coachesPageContent: CoachesPageContent = {
  status: 'pending-validation',
  hero: {
    status: 'pending-validation',
    eyebrow: 'Equipo · Contenido provisional',
    title: 'Entrenadores',
    intro:
      'Esta página reserva la estructura para presentar al equipo cuando existan nombres, funciones, experiencias, especialidades y fotografías aprobadas.',
  },
  emptyState: {
    title: 'Perfiles pendientes de aprobación',
    description:
      'Todavía no hay información oficial disponible para mostrar. No publicaremos perfiles, certificaciones ni fotografías sin validación.',
  },
};

export const coachProfiles: readonly CoachProfile[] = [];
