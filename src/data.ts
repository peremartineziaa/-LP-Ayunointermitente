import { CommunityPost, RankingItem } from "./types";

export interface ProgramModule {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  lessons: { title: string; duration: string; summary: string; action: string }[];
}

export const PROGRAM_MODULES: ProgramModule[] = [
  {
    id: 1,
    title: "MÓDULO 1: Reinicio Metabólico",
    subtitle: "Activa la pérdida de grasa sin bajones de energía",
    description: "Aprenderás cómo desbloquear tus reservas de glucógeno y dar paso a la lipólisis celular. El objetivo es enseñar a tu cuerpo a utilizar la grasa como combustible principal sin perder masa muscular ni sentir cansancio constante.",
    lessons: [
      {
        title: "1.1 El Cambio de Combustible Celular",
        duration: "12 min",
        summary: "Cómo pasar de quemar azúcar a usar grasa. Explicación biológica sencilla y primeros pasos.",
        action: "Eliminar aceites vegetales refinados de tu cocina hoy mismo."
      },
      {
        title: "1.2 Almidones vs Fibra: La Clave de la Insulina",
        duration: "15 min",
        summary: "Cuáles hidratos de carbono aceleran la pérdida de grasa y cuáles la detienen completamente.",
        action: "Sustituye el pan o arroz blanco por verduras crucíferas y tubérculos moderados por 7 días."
      },
      {
        title: "1.3 Hidratación y Electrólitos Críticos",
        duration: "9 min",
        summary: "El secreto olvidado que previene el dolor de cabeza y la fatiga durante la primera semana.",
        action: "Añadir una pizca de sal marina sin refinar a tu primera botella de agua del día."
      }
    ]
  },
  {
    id: 2,
    title: "MÓDULO 2: Sistema de Ayuno Progresivo",
    subtitle: "Avanza paso a paso sin improvisar ni sufrir",
    description: "Descubre el poder de la autofagia y la estabilización de la grelina sin pasar hambre extrema. Este método progresivo te guiará de manera natural desde un ayuno de 12 horas hasta el protocolo estratégico de 16:8.",
    lessons: [
      {
        title: "2.1 La Escalera del Ayuno: De 12 a 16 Horas",
        duration: "14 min",
        summary: "Cómo mover tu ventana de alimentación paulatinamente para que tu cuerpo ni lo note.",
        action: "Mantén una ventana nocturna de ayuno de 13 horas los próximos 3 días."
      },
      {
        title: "2.2 Romper el Ayuno Correctamente",
        duration: "11 min",
        summary: "El error común de comer carbohidratos simples al abrir la ventana. Estructura de proteína y grasas.",
        action: "Asegúrate de que tu primera comida incluya huevos, aguacate o carne magra."
      },
      {
        title: "2.3 Qué sí se permite beber durante las horas de ayuno",
        duration: "8 min",
        summary: "Bebidas que no activan la insulina: café solo, tés específicos y caldos ligeros purificadores.",
        action: "Prepara café negro o té verde sin endulzar en tu ventana de ayuno."
      }
    ]
  },
  {
    id: 3,
    title: "MÓDULO 3: Control de Hambre y Antojos",
    subtitle: "Cómo hackear la ansiedad cuando aparece",
    description: "Saber qué comer es fácil; el reto real es mantenerlo cuando el estrés diario o la ansiedad nocturna aparecen. Desarrollarás defensas neurobiológicas para desactivar la tentación en segundos.",
    lessons: [
      {
        title: "3.1 Hackear la Dopamina de la Comida Basura",
        duration: "16 min",
        summary: "Por qué deseamos azúcar a las 6 pm y cómo sustituir esa recompensa cerebral.",
        action: "Aplica la regla de los 10 minutos y bebe una infusión tibia cuando surja un antojo dulce."
      },
      {
        title: "3.2 El Protocolo de la Respiración Parasimpática",
        duration: "7 min",
        summary: "Reduce el cortisol (la hormona acumuladora de grasa de vientre) con respiración de caja.",
        action: "Realiza 4 ciclos de respiración 4-4-4-4 antes de almorzar."
      },
      {
        title: "3.3 El Menú Salvador: Dulces Saludables Caseros",
        duration: "12 min",
        summary: "Recetas con cacao puro y eritritol que calman la mente sin romper la pérdida de peso.",
        action: "Prepara la trufa de cacao y coco de emergencia para momentos especiales."
      }
    ]
  },
  {
    id: 4,
    title: "MÓDULO 4: Acelerador de Pérdida de Grasa",
    subtitle: "Técnicas avanzadas para maximizar resultados visibles",
    description: "Maximiza la quema calórica residual post-entrenamiento e introduce variabilidad metabólica controlada para duplicar el gasto energético sin agotamiento físico.",
    lessons: [
      {
        title: "4.1 NEAT: Tu Verdadero Aliado Quemagrasas",
        duration: "10 min",
        summary: "La diferencia abismal entre ir 1 hora al gimnasio o aumentar la actividad no programada.",
        action: "Camina 10,000 pasos hoy anotándolos en tu dashboard."
      },
      {
        title: "4.2 Sesiones Micro-HIIT de 15 Minutos",
        duration: "13 min",
        summary: "Ejercicios corporales simples en casa que estimulan las mitocondrias sin pesas masivas.",
        action: "Realiza la rutina exprés de 4 ejercicios metabólicos de 3 rondas."
      },
      {
        title: "4.3 Ciclado de Carbohidratos Estratégico",
        duration: "15 min",
        summary: "Por qué comer carbohidratos una vez a la semana reactiva la tiroides y el metabolismo estancado.",
        action: "Planifica tu día de recarga limpia al final de la semana."
      }
    ]
  },
  {
    id: 5,
    title: "MÓDULO 5: Blindaje Anti-Rebote",
    subtitle: "Tu estrategia definitiva para no volver a empezar nunca",
    description: "La fase más importante del programa. Diseña un estilo de vida flexible donde puedas salir con amigos, beber vino y comer pizza ocasionalmente sin recuperar un solo gramo.",
    lessons: [
      {
        title: "5.1 El Set-Point del Peso Corporal",
        duration: "18 min",
        summary: "Cómo convencer a tu cerebro de que tu nuevo peso es el valor predeterminado seguro.",
        action: "Mantén un rango de peso de 1.5kg de variación durante 3 semanas sin alarmarte."
      },
      {
        title: "5.2 Regla del 80/20 en el Mundo Real",
        duration: "12 min",
        summary: "Cómo el 80% de disciplina compensa el 20% de disfrute social sin culpa.",
        action: "Anota tus 3 comidas flexibles semanales libres de culpa."
      },
      {
        title: "5.3 Autoevaluación Semanal y Correcciones Rápidas",
        duration: "11 min",
        summary: "Qué hacer si ganas 1 kg después de vacaciones para bajarlo en solo 36 horas.",
        action: "Implementar el protocolo de ayuno reparador de 18 horas post-exceso."
      }
    ]
  }
];

export const MOCK_FAQ = [
  {
    q: "¿Necesito experiencia previa con dietas o ayuno?",
    a: "No. El programa explica todo desde cero. De hecho, si has tenido malas experiencias con dietas restrictivas, te encantará ver cómo este sistema se enfoca en el comportamiento hormonal y metabólico sin castigarte."
  },
  {
    q: "¿Qué pasa si tengo ansiedad o sufro con el hambre?",
    a: "Esa es la razón por la que incluimos el Módulo 3 y el Menú Destructor de Antojos. Te enseñamos a estabilizar las hormonas del hambre (grelina y leptina) para que el apetito sea una señal lógica, no un impulso incontrolable."
  },
  {
    q: "¿Es seguro el ayuno intermitente para mí?",
    a: "El ayuno intermitente es un proceso totalmente natural y seguro para personas sanas. Comenzamos con protocolos sumamente ligeros (12 y 13 horas) idénticos al ritmo biológico normal antes de avanzar."
  },
  {
    q: "¿Cuánto tiempo al día requiere preparar la comida?",
    a: "Muy poco. Las recetas y menús destructores de antojos están pensados para personas que trabajan, estudian o tienen familias. Se preparan en menos de 20 minutos con ingredientes accesibles en cualquier supermercado común."
  },
  {
    q: "¿La consultoría grupal es en vivo?",
    a: "Sí. Una vez al mes nos conectamos en privado para resolver las dudas de los alumnos, revisar los bloqueos de pérdida de peso y optimizar el plan. Quede grabada para que la veas cuando quieras."
  }
];

export const MOCK_MEALS = {
  desayunos: [
    { name: "Tortilla Funcional de Aguacate", desc: "3 huevos de pastoreo, 1/4 aguacate, espinacas frescas y pizca de sal marina.", cals: 360 },
    { name: "Yogur de Coco con Trufa Energética", desc: "Yogur griego entero u opción de coco, semillas de chía, nueces pecanas picadas y arándanos frescos.", cals: 310 },
    { name: "Pan de Semillas con Salmón Ahumado", desc: "Rebanada tostada de pan proteico de chía, 60g salmón ahumado y queso de cabra suave.", cals: 340 }
  ],
  almuerzos: [
    { name: "Bowl de Pollo Cremoso de Hummus", desc: "180g pechuga a la plancha, brocolini al vapor, cucharada colmada de hummus orgánico y almendras fileteadas.", cals: 510 },
    { name: "Solomillo con Puré de Calabaza Asada", desc: "150g solomillo de ternera, puré de calabaza especiado con nuez moscada y ensalada rúcula.", cals: 480 },
    { name: "Ensalada Mediterránea de Atún de Lomo", desc: "Lata grande de atún en aceite de oliva, pepino, aceitunas kalamata, aderezo de vinagre de manzana y orégano.", cals: 450 }
  ],
  cenas: [
    { name: "Merluza al Horno con Espárragos", desc: "Filete de merluza fresca con ajo silvestre, limón y manojo de espárragos trigueños salteados.", cals: 320 },
    { name: "Revuelto de Champiñones y Jamón Serrano", desc: "2 huevos revueltos con champiñones portobello y taquitos de jamón premium.", cals: 340 },
    { name: "Crema Templada de Calabacín y Muslo de Pollo", desc: "Sopa densa de calabacín aromatizada, con muslo de pollo asado deshilachado sin piel.", cals: 380 }
  ],
  antojos: [
    { name: "Trufa Anti-Ansiedad Cacao/Coco", desc: "Mezcla de cacao puro en polvo con aceite de coco prensado en frío y stevia natural. Enfría 15 min.", cals: 110 },
    { name: "Rodajas de Pepino con Queso Crema y Tajín", desc: "Snack de volumen crujiente para calmar la necesidad de masticar salado.", cals: 80 },
    { name: "Taza de Caldo de Huesos Reparador", desc: "Rico en glicina, colágeno y minerales. Sacia instantáneamente la ventana nocturna.", cals: 45 }
  ]
};

export const INITIAL_COMMUNITY_POSTS: CommunityPost[] = [
  {
    id: "p1",
    userName: "Alberto S.",
    avatarColor: "bg-emerald-500",
    timeAgo: "Hace 23 minutos",
    content: "¡No me lo creo todavía! Me he pesado esta mañana de la segunda semana y he bajado 1.8 kg. Pero lo mejor no es eso, es que no he tenido nada de antojos por la noche. El truco de la taza de caldo antes de cenar realmente funciona para calmar la ansiedad. ¡A por todas, equipo! 🙌",
    likes: 14,
    commentsCount: 3,
    isLikedByUser: false
  },
  {
    id: "p2",
    userName: "María Ángeles L.",
    avatarColor: "bg-amber-500",
    timeAgo: "Hace 2 horas",
    content: "Hoy es mi primer día de ayuno de 14 horas progresivo. Tenía algo de miedo a cansarme en la oficina, pero me acabo de tomar el té verde con una pizca de sal marina y me siento super despierta. ¡Módulo 2 completado en su primera fase!",
    likes: 7,
    commentsCount: 1,
    isLikedByUser: false
  },
  {
    id: "p3",
    userName: "Carlos J. Gallego",
    avatarColor: "bg-indigo-500",
    timeAgo: "Hace Ayer",
    content: "¡Subes una foto sin esconderte detrás de los demás! Eso ponía en la landing y ayer por fin lo viví en los cumpleaños de mi hija. No me escondí detrás del sofá, me puse al frente. El cambio físico se nota, pero el cambio de mentalidad y confianza es increíble. ¡Gracias por el apoyo del grupo!",
    likes: 29,
    commentsCount: 5,
    isLikedByUser: false
  }
];

export const INITIAL_RANKING: RankingItem[] = [
  { id: "r1", rank: 1, name: "Patricia Román", weightLost: 9.4, waistLost: 11, points: 940 },
  { id: "r2", rank: 2, name: "Francisco Javier G.", weightLost: 8.8, waistLost: 9.5, points: 880 },
  { id: "r3", rank: 3, name: "Elena Sanz", weightLost: 8.2, waistLost: 10, points: 820 },
  { id: "r4", rank: 4, name: "Juan Carlos T.", weightLost: 7.9, waistLost: 8, points: 790 },
  { id: "r5", rank: 5, name: "Sofía M. Soler", weightLost: 7.5, waistLost: 9, points: 750 }
];
