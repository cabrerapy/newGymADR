import type {
  Activity,
  ActivitiesPageContent,
  CoachesPageContent,
  CoachProfile,
  FacilitiesPageContent,
  GalleryItem,
  GymPageContent,
  HomePageContent,
  ScheduleDay,
  SchedulesPageContent,
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

export const facilitiesPageContent: FacilitiesPageContent = {
  status: 'pending-validation',
  hero: {
    status: 'pending-validation',
    eyebrow: 'Instalaciones · Contenido provisional',
    title: 'Instalaciones',
    intro:
      'Conoce el espacio de entrenamiento de ADR Cross. La descripción de los espacios, el equipamiento y las condiciones de uso se publicará cuando el equipo confirme la información oficial.',
  },
  introduction: {
    title: 'Un espacio por describir con información oficial',
    description:
      'Esta página reserva una estructura editable para presentar el box, sus instalaciones y su equipamiento. No se publican medidas, capacidades, servicios ni características técnicas sin validación.',
  },
  facilities: [
    {
      id: 'training-space',
      category: 'space',
      status: 'pending-validation',
      title: 'Espacio de entrenamiento',
      description:
        'La distribución, las medidas, la capacidad y las condiciones de uso del espacio de entrenamiento están pendientes de confirmación oficial.',
    },
    {
      id: 'equipment',
      category: 'equipment',
      status: 'pending-validation',
      title: 'Equipamiento',
      description:
        'La relación de máquinas, accesorios y materiales de entrenamiento se incorporará cuando exista un inventario aprobado.',
    },
    {
      id: 'support-spaces',
      category: 'support',
      status: 'pending-validation',
      title: 'Zonas de apoyo',
      description:
        'Los espacios complementarios y sus condiciones de uso se describirán únicamente después de su verificación.',
    },
  ],
  features: [
    {
      id: 'verified-details',
      status: 'pending-validation',
      title: 'Detalles por confirmar',
      description:
        'Marcas, cantidades, medidas, accesibilidad y servicios complementarios quedan reservados para contenido oficial verificable.',
    },
    {
      id: 'official-gallery',
      status: 'pending-validation',
      title: 'Galería oficial',
      description:
        'Las fotografías se publicarán cuando el equipo entregue material autorizado y los textos alternativos sean revisados.',
    },
  ],
  gallery: [],
  emptyGalleryState: {
    title: 'Galería oficial pendiente',
    description:
      'Todavía no hay fotografías aprobadas para mostrar. Este espacio se mantendrá sin imágenes ficticias hasta recibir material verificado.',
  },
};

export const facilityGalleryItems: readonly GalleryItem[] = [];

export const scheduleDays: readonly ScheduleDay[] = [];

export const schedulesPageContent: SchedulesPageContent = {
  status: 'pending-validation',
  hero: {
    status: 'pending-validation',
    eyebrow: 'Horarios · Contenido informativo',
    title: 'Horarios',
    intro:
      'Consulta la estructura pública de horarios de ADR Cross. Los horarios de clases y actividades se publicarán cuando el equipo confirme días, franjas y niveles.',
  },
  timezone: 'America/Asuncion',
  days: scheduleDays,
  emptyState: {
    title: 'Horarios pendientes de publicación',
    description:
      'Aún no hay horarios informativos aprobados. La futura publicación será solo consultiva; las reservas se gestionarán, si corresponden, en el portal privado de alumnos.',
  },
  notice:
    'Los horarios publicados en esta página serán informativos. No representan reservas, cupos ni disponibilidad en tiempo real.',
};

export const activities: readonly Activity[] = [];

export const activitiesPageContent: ActivitiesPageContent = {
  status: 'pending-validation',
  hero: {
    status: 'pending-validation',
    eyebrow: 'Actividades · Contenido provisional',
    title: 'Actividades',
    intro:
      'Conoce el espacio reservado para competencias y actividades de ADR Cross. Solo se publicarán eventos, fechas, categorías y resultados cuando exista información oficial verificada.',
  },
  activities,
  emptyState: {
    title: 'Actividades pendientes de confirmar',
    description:
      'Todavía no hay eventos próximos ni finalizados aprobados para mostrar. No publicaremos competencias, atletas, resultados ni fechas sin validación.',
  },
};
