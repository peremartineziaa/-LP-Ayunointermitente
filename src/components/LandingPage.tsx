import React, { useState } from "react";
import { 
  Flame, 
  Calendar, 
  ChevronDown, 
  ChevronUp, 
  Check, 
  CheckCircle2, 
  Maximize2, 
  Heart, 
  Sparkles, 
  ArrowRight, 
  MessageCircle, 
  Trophy, 
  Users, 
  ShieldCheck, 
  Video, 
  X,
  CreditCard
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { MOCK_FAQ } from "../data";
import { SelectedPlan } from "../types";

const SPAIN_LOCATIONS = [
  { city: "Madrid", country: "España" },
  { city: "Barcelona", country: "España" },
  { city: "Valencia", country: "España" },
  { city: "Sevilla", country: "España" },
  { city: "Zaragoza", country: "España" },
  { city: "Málaga", country: "España" },
  { city: "Bilbao", country: "España" },
  { city: "Alicante", country: "España" },
  { city: "Valladolid", country: "España" },
  { city: "Murcia", country: "España" }
];

const LATAM_LOCATIONS = [
  { city: "Ciudad de México", country: "México" },
  { city: "Bogotá", country: "Colombia" },
  { city: "Lima", country: "Perú" },
  { city: "Santiago de Chile", country: "Chile" },
  { city: "Buenos Aires", country: "Argentina" },
  { city: "Guadalajara", country: "México" },
  { city: "Monterrey", country: "México" },
  { city: "Quito", country: "Ecuador" },
  { city: "Medellín", country: "Colombia" },
  { city: "Montevideo", country: "Uruguay" }
];

const NOTIFICATION_NAMES = [
  "María", "Juan", "Alejandro", "Sofía", "Carmen", "Carlos", "Mateo", "Valentina", 
  "Diego", "Lucía", "José", "Camila", "Manuel", "Francisco", "Isabella", "Luis",
  "Laura", "Andrés", "Gabriela", "Daniel", "Patricia", "Javier"
];

const NOTIFICATION_PLANS = [
  "el Plan Estándar",
  "el Plan VIP"
];

interface LandingPageProps {
  onSelectPlan: (plan: SelectedPlan) => void;
  onEnterStudentMode: () => void;
}

export default function LandingPage({ onSelectPlan, onEnterStudentMode }: LandingPageProps) {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [hasReachedOffers, setHasReachedOffers] = useState(false);
  const [activeNotification, setActiveNotification] = useState<{
    name: string;
    city: string;
    country: string;
    plan: string;
  } | null>(null);
  const [notificationIndex, setNotificationIndex] = useState(0);

  React.useEffect(() => {
    const handleScroll = () => {
      const section = document.getElementById("pricing-section");
      if (section) {
        const rect = section.getBoundingClientRect();
        // Trigger social proof alerts and floating CTA once visitor reaches offers section (rect.top is <= window viewport height)
        if (rect.top <= window.innerHeight) {
          setHasReachedOffers(true);
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    // Initial check on mount
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  React.useEffect(() => {
    if (!hasReachedOffers) return;

    let showTimeout: NodeJS.Timeout;
    let hideTimeout: NodeJS.Timeout;

    const triggerNext = (isFirst: boolean) => {
      // First one is fast (2s), future ones appear every 15-20s
      const delay = isFirst ? 2000 : 15000 + Math.random() * 5000;

      showTimeout = setTimeout(() => {
        setNotificationIndex(prevIndex => {
          // Alternates Spain and Latam: Spain if even index, Latam if odd
          const isLatinAmerica = prevIndex % 2 === 1;
          const name = NOTIFICATION_NAMES[Math.floor(Math.random() * NOTIFICATION_NAMES.length)];
          const locationList = isLatinAmerica ? LATAM_LOCATIONS : SPAIN_LOCATIONS;
          const location = locationList[Math.floor(Math.random() * locationList.length)];
          const plan = NOTIFICATION_PLANS[Math.floor(Math.random() * NOTIFICATION_PLANS.length)];

          setActiveNotification({
            name,
            city: location.city,
            country: location.country,
            plan
          });

          return prevIndex + 1;
        });

        // Visible for 4 seconds, then disappears
        hideTimeout = setTimeout(() => {
          setActiveNotification(null);
          triggerNext(false);
        }, 4000);

      }, delay);
    };

    triggerNext(true);

    return () => {
      clearTimeout(showTimeout);
      clearTimeout(hideTimeout);
    };
  }, [hasReachedOffers]);

  const perks = [
    "Te pruebas ropa que habías dejado olvidada en el armario.",
    "Te miras al espejo sin evitar o rechazar tu reflejo.",
    "Subes una foto feliz sin esconderte detrás de otras personas.",
    "Tienes más energía que dura todo el día sin bajones.",
    "Duermes de tirón y despiertas con ligereza mental.",
    "Sientes que vuelves a tener el control total de tu cuerpo."
  ];

  const modules = [
    {
      num: "MÓDULO 1",
      title: "Reinicio Metabólico",
      desc: "Aprende cómo activar la pérdida grasa sin destruir tu energía.",
      features: ["Liberar depósitos grasos", "Evitar el modo tumba energética", "Estabilidad de insulina"]
    },
    {
      num: "MÓDULO 2",
      title: "Sistema de Ayuno Progresivo",
      desc: "Empieza desde cero y avanza paso a paso. Sin errores. Sin improvisar.",
      features: ["Protocolos de adaptación 12h, 14h, 16h", "Gestión biológica de la ventana", "Bebidas permitidas"]
    },
    {
      num: "MÓDULO 3",
      title: "Control Total de Hambre y Antojos",
      desc: "Porque el problema nunca es saber qué hacer, es mantenerlo cuando aparece la ansiedad.",
      features: ["Técnicas de desactivación neuro-antojo", "Control del cortisol", "Postres reparadores rápidos"]
    },
    {
      num: "MÓDULO 4",
      title: "Acelerador de Pérdida de Grasa",
      desc: "Las estrategias que generan resultados visibles en el espejo de forma más rápida.",
      features: ["Hacks de NEAT diario pasivo", "Rutinas micro-HIIT de 15 min", "Variabilidad calórica estratégica"]
    },
    {
      num: "MÓDULO 5",
      title: "Blindaje Anti-Rebote",
      desc: "La parte que casi ningún programa enseña. Cómo evitar recuperar el peso perdido.",
      features: ["Fijación del Set-Point corporal", "Interacciones en comidas sociales", "Protocolos de corrección rápida"]
    }
  ];

  const bonuses = [
    {
      title: "MENÚ DESTRUCTOR DE ANTOJOS",
      desc: "Comidas exquisitas diseñadas para ayudarte a perder peso sin sufrir hambre constante.",
      badge: "REGALO EXCLUSIVO"
    },
    {
      title: "CALENDARIO COMPLETO DE 90 DÍAS",
      desc: "Todo perfectamente esquematizado de antemano. Solo tienes que seguir la senda trazada.",
      badge: "GUÍA DE RUTA"
    },
    {
      title: "PROTOCOLO ANTI-REBOTE",
      desc: "Estrategia para consolidar tus resultados y mantenerte firme a largo plazo.",
      badge: "SISTEMA SEGURO"
    }
  ];

  const monthlyGoals = [
    { mes: "Mes 1", desc: "Pierde tus primeros 4 kg." },
    { mes: "Mes 2", desc: "Destruye la ansiedad por la comida." },
    { mes: "Mes 3", desc: "Acelera tu pérdida de grasa." },
    { mes: "Mes 4", desc: "Rompe cualquier estancamiento." },
    { mes: "Mes 5", desc: "Reduce centímetros de cintura." },
    { mes: "Mes 6", desc: "Blindaje Anti-Rebote activo." }
  ];

  return (
    <div className="bg-zinc-950 text-zinc-50 min-h-screen selection:bg-orange-500 selection:text-zinc-950 font-sans antialiased" id="landing-page-root">
      
      {/* Top Banner Demo Access */}
      <div className="bg-zinc-900 text-white text-sm font-bold py-3 px-4 text-center sticky top-0 z-50 shadow-md flex justify-between items-center max-w-7xl mx-auto rounded-none border-x border-b border-orange-500">
        <div className="flex items-center gap-2 text-zinc-200">
          <Sparkles className="w-4 h-4 text-orange-500 animate-pulse shrink-0" />
          <span><strong className="text-orange-500 uppercase italic tracking-wider">REVISIÓN EN VIVO:</strong> Acceso rápido a la plataforma interactiva de alumnos sin pagar</span>
        </div>
        <button 
          onClick={onEnterStudentMode} 
          className="bg-orange-500 text-zinc-950 hover:bg-orange-400 active:scale-95 transition duration-150 rounded-none px-4 py-1 text-xs font-black uppercase italic tracking-tighter cursor-pointer shrink-0 border-2 border-transparent"
          id="btn-fast-student-mode"
        >
          Ir al Portal Alumnos 💻
        </button>
      </div>

      {/* Hero Section */}
      <header className="relative pt-16 pb-24 px-4 max-w-5xl mx-auto text-center" id="hero">
        <div className="inline-flex items-center gap-2 bg-zinc-900 text-orange-500 px-4 py-1.5 rounded-none text-xs font-black tracking-widest uppercase mb-6 border-2 border-orange-500 animate-fade-in italic">
          <Flame className="w-3.5 h-3.5 fill-current" />
          <span>PROGRAMA DE TRANSFORMACIÓN PERSONAL</span>
        </div>

        <h1 className="font-sans font-black text-5xl sm:text-6xl md:text-7xl text-white tracking-tighter leading-none mb-6 uppercase italic">
          OPERACIÓN <span className="text-orange-500 block sm:inline">CUERPO NUEVO</span> <br className="hidden sm:inline" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 via-amber-400 to-orange-600">
            EN 90 DÍAS
          </span>
        </h1>

        <p className="text-lg sm:text-xl md:text-2xl text-zinc-300 font-medium max-w-3xl mx-auto leading-relaxed mb-8">
          Pierde tus primeros <span className="font-black text-white underline decoration-orange-500 decoration-4 underline-offset-4 uppercase italic">10 kg en 90 días</span> y deja de empezar una dieta nueva cada lunes.
        </p>

        <p className="text-orange-500 font-mono text-xs sm:text-sm tracking-wide max-w-2xl mx-auto mb-10 bg-zinc-900 rounded-none p-3 border-2 border-zinc-800 font-black uppercase italic">
          ⚡ Sin entrenamientos eternos · Sin pasar hambre · Sin vivir obsesionado contando calorías.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <a 
            href="#pricing-section"
            className="w-full sm:w-auto bg-orange-500 text-zinc-950 font-black rounded-none px-8 py-4 border-2 border-orange-500 hover:bg-orange-400 active:scale-98 transition text-center flex items-center justify-center gap-2 group cursor-pointer uppercase italic tracking-tighter"
            id="main-cta-hero"
          >
            Quiero Empezar Mi Cambio Ahora
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform text-zinc-950" />
          </a>
          <button 
            onClick={onEnterStudentMode}
            className="w-full sm:w-auto bg-zinc-900 border-2 border-zinc-700 text-zinc-100 font-bold rounded-none px-6 py-4 hover:bg-zinc-800 hover:border-zinc-500 active:scale-98 transition text-center cursor-pointer uppercase italic tracking-tighter"
            id="quick-demo-hero-btn"
          >
            Explorar Plataforma Demo (Socio)
          </button>
        </div>
      </header>

      {/* Pain Statement & The Loop */}
      <section className="bg-zinc-900 text-zinc-100 py-20 px-4 border-y-4 border-zinc-800" id="pain-points">
        <div className="max-w-4xl mx-auto">
          <span className="text-orange-500 font-mono text-xs tracking-widest uppercase block text-center mb-2 font-black italic">SI HAS INTENTADO ADELGAZAR MÁS DE UNA VEZ...</span>
          <h2 className="text-3xl sm:text-4xl font-black text-white text-center mb-12 tracking-tight uppercase italic">Ya sabes exactamente cómo termina la historia.</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-center">
            
            <div className="bg-zinc-950 border-2 border-zinc-850 p-6 rounded-none md:col-span-2 relative">
              <span className="absolute -top-3.5 left-4 bg-orange-600 text-zinc-950 text-[10px] font-mono font-black px-3 py-1 rounded-none uppercase italic tracking-wide">Círculo Vicioso</span>
              <ul className="space-y-4 text-sm text-zinc-300 mt-2">
                <li className="flex gap-2">
                  <span className="text-orange-500 font-black shrink-0">1.</span>
                  <span>Empiezas muy motivado el lunes, comiendo poquísimo.</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-orange-500 font-black shrink-0">2.</span>
                  <span>Pierdes algunos kilos rápidos de agua y glucógeno.</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-orange-500 font-black shrink-0">3.</span>
                  <span>Te relajas por cansancio, estrés social o hambre.</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-orange-500 font-black shrink-0">4.</span>
                  <span>Vuelven los viejos hábitos de confort.</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-orange-500 font-black shrink-0">5.</span>
                  <span className="text-white font-bold">Semanas después recuperas todo. A veces incluso más.</span>
                </li>
              </ul>
            </div>

            <div className="flex justify-center md:col-span-1 py-4 md:py-0">
              <ArrowRight className="w-8 h-8 text-orange-500 rotate-90 md:rotate-0" />
            </div>

            <div className="bg-zinc-950 border-2 border-orange-500/40 p-6 rounded-none md:col-span-2 relative">
              <span className="absolute -top-3.5 left-4 bg-emerald-600 text-white text-[10px] font-mono font-black px-3 py-1 rounded-none uppercase italic tracking-wide">El Enfoque Real</span>
              <p className="text-base font-black text-white mb-3 uppercase italic tracking-tight">No necesitas otra dieta obsesiva.</p>
              <p className="text-sm text-zinc-300 leading-relaxed mb-4">
                Necesitas un <span className="text-orange-400 font-bold underline decoration-dashed">sistema integral</span> que te lleve de la mano desde tu situación actual (Punto A) hasta tu peso idóneo (Punto B) y configure tu fisiología para mantenerte allí.
              </p>
              <p className="text-sm text-zinc-400 leading-relaxed">
                Porque perder peso no es el verdadero reto. <strong className="text-white font-bold">El único problema real es no volver a recuperarlo jamás.</strong>
              </p>
            </div>
            
          </div>
        </div>
      </section>

      {/* Visual Future (90 Days Vision) */}
      <section className="py-24 px-4 max-w-4xl mx-auto" id="vision-90-days">
        <h3 className="text-orange-500 font-mono text-xs tracking-widest uppercase text-center mb-2 font-black italic">LA TRANSFORMACIÓN EN ACCIÓN</h3>
        <h2 className="text-4xl font-black text-white text-center mb-4 tracking-tight uppercase italic">Imagina esto dentro de solo 90 días:</h2>
        <p className="text-zinc-400 text-center max-w-xl mx-auto mb-16">
          Cuando sigues un protocolo diseñado científicamente para tu metabolismo, los beneficios trascienden los dígitos de la báscula.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {perks.map((perk, i) => (
            <div key={i} className="bg-zinc-900 border-2 border-zinc-800 rounded-none p-5 flex gap-3.5 items-start">
              <div className="bg-zinc-950 rounded-none p-1 border border-orange-500/40 shrink-0 mt-0.5">
                <CheckCircle2 className="w-5 h-5 text-orange-500" />
              </div>
              <span className="text-zinc-100 font-bold text-sm sm:text-base leading-relaxed tracking-tight">{perk}</span>
            </div>
          ))}
        </div>

        <div className="mt-12 bg-zinc-900 border border-zinc-800 rounded-none p-6 text-center">
          <p className="text-orange-500 text-sm sm:text-base font-black uppercase italic tracking-tight">
            "Eso es exactamente para lo que fue creado Operación Cuerpo Nuevo: restaurar el equilibrio endocrino y dar estabilidad de vida."
          </p>
        </div>
      </section>

      {/* Features & Modules Grid */}
      <section className="bg-zinc-950 border-y-4 border-zinc-900 py-24 px-4" id="modules-section">
        <div className="max-w-5xl mx-auto">
          <span className="text-orange-500 font-mono text-xs tracking-widest uppercase block text-center mb-2 font-black italic">CONTENIDO PASO A PASO</span>
          <h2 className="text-4xl font-black text-white text-center mb-3 uppercase italic">Qué Conseguirás en Cada Módulo</h2>
          <p className="text-zinc-400 text-center max-w-xl mx-auto mb-16 text-sm sm:text-base font-medium">
            No es un libro ni teoría inútil. Es un sistema de acción diario pre-diseñado para ser intuitivo.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {modules.map((mod, i) => (
              <div key={i} className="bg-zinc-900 border-2 border-zinc-800 rounded-none p-6 flex flex-col justify-between transition-colors hover:border-orange-500/50">
                <div>
                  <div className="bg-orange-500 text-zinc-950 font-mono text-xs font-black px-3 py-1 rounded-none inline-block mb-3 italic tracking-wider">
                    {mod.num}
                  </div>
                  <h3 className="text-lg font-black text-white mb-2 leading-tight uppercase italic">
                    {mod.title}
                  </h3>
                  <p className="text-zinc-300 text-xs sm:text-sm leading-relaxed mb-4">
                    {mod.desc}
                  </p>
                </div>
                <div className="border-t border-zinc-800 pt-4 mt-2">
                  <span className="text-orange-500 font-mono font-black text-[10px] tracking-wider uppercase block mb-2">Claves de acción:</span>
                  <ul className="space-y-1.5">
                    {mod.features.map((feat, fIdx) => (
                      <li key={fIdx} className="flex items-center gap-2 text-xs text-zinc-300 font-bold uppercase tracking-tight">
                        <Check className="w-3.5 h-3.5 text-orange-500 shrink-0" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}

            {/* Exclusive Bonuses card */}
            <div className="bg-gradient-to-br from-orange-500 to-amber-600 text-zinc-950 rounded-none p-6 shadow-md flex flex-col justify-between md:col-span-2 lg:col-span-1 border-2 border-orange-400 text-left">
              <div>
                <span className="bg-zinc-950 text-orange-500 font-mono text-xs font-black px-3 py-1 rounded-none inline-block mb-3 border border-orange-500/20 italic tracking-wider">
                  🎁 BONUS GRATUITOS
                </span>
                <h3 className="text-xl font-black text-zinc-950 mb-2 leading-tight uppercase italic">Complementos de Éxito</h3>
                <p className="text-zinc-900 text-xs sm:text-sm leading-relaxed mb-4 font-semibold">
                  Herramientas tácticas inmediatas para saltar la barrera de la pereza y maximizar adherencia.
                </p>
              </div>
              <ul className="space-y-3 pt-2">
                {bonuses.map((bonus, bIdx) => (
                  <li key={bIdx} className="border-b border-zinc-950/20 pb-2 last:border-0 last:pb-0">
                    <span className="text-[10px] font-mono text-zinc-900 font-black uppercase tracking-wider block italic">{bonus.badge}</span>
                    <strong className="text-zinc-950 text-xs block font-extrabold uppercase">{bonus.title}</strong>
                    <span className="text-zinc-900 text-[11px] leading-tight block font-medium">{bonus.desc}</span>
                  </li>
                ))}
              </ul>
            </div>

          </div>
        </div>
      </section>

      {/* The VIP Anti-Rebound Club */}
      <section className="bg-zinc-900 text-white py-24 px-4 border-b-4 border-zinc-800" id="vip-club-section">
        <div className="max-w-5xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-orange-500 font-mono text-xs tracking-widest uppercase block mb-2 font-black italic">EL PODER DE LA COMUNIDAD</span>
            <h2 className="text-4xl font-black tracking-tight mb-4 uppercase italic">CLUB ANTI-REBOTE VIP</h2>
            <p className="text-zinc-300 text-sm sm:text-base leading-relaxed">
              Porque adelgazar durante 90 días es fácil con disciplina inicial, pero <strong className="text-white">mantenerlo y seguir mejorando durante años</strong> es donde está la verdadera batalla. No camines solo.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch mb-16">
            
            {/* Left box: Telegram channels and support */}
            <div className="bg-zinc-950 border-2 border-zinc-800 rounded-none p-6 sm:p-8 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="bg-orange-500/10 text-orange-500 p-2.5 rounded-none border border-orange-500/25">
                    <MessageCircle className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-white uppercase italic tracking-wider">Canales VIP de Telegram</h3>
                    <p className="text-xs text-zinc-400">Todo el ecosistema de apoyo directo en tu móvil</p>
                  </div>
                </div>

                <ul className="space-y-4 text-sm text-zinc-300">
                  <li className="flex gap-3 items-start">
                    <Check className="w-5 h-5 text-orange-500 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-white block font-bold text-sm uppercase italic">Canal Privado VIP Unidireccional:</strong>
                      <span className="text-xs text-zinc-400">Accede de forma directa a nuevos menús del mes, recetas fotográficas, recordatorios rápidos de calendario y estrategias avanzadas del método.</span>
                    </div>
                  </li>
                  <li className="flex gap-3 items-start">
                    <Check className="w-5 h-5 text-orange-500 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-white block font-bold text-sm uppercase italic">Grupo Privado VIP de Interacción:</strong>
                      <span className="text-xs text-zinc-400">Resuelve dudas con compañeros en tu misma situación, comparte fotos de tus platos y recibe aliento en momentos difíciles de ansiedad.</span>
                    </div>
                  </li>
                </ul>
              </div>

              <div className="border-t border-zinc-800 pt-6 mt-8 flex items-center gap-3">
                <Users className="text-orange-500 w-5 h-5 shrink-0" />
                <span className="text-xs text-zinc-300 font-bold uppercase tracking-wider">Tribu cerrada exclusiva con moderador certificado.</span>
              </div>
            </div>

            {/* Right box: Monthly Mission and Ranking */}
            <div className="bg-zinc-950 border-2 border-zinc-800 rounded-none p-6 sm:p-8 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="bg-orange-500/10 text-orange-500 p-2.5 rounded-none border border-orange-500/25">
                    <Trophy className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-white uppercase italic tracking-wider">Gamificación y Misión Mensual</h3>
                    <p className="text-xs text-zinc-400">Siempre con un objetivo dinámico para no caer en el aburrimiento</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 mb-6">
                  {monthlyGoals.map((m, idx) => (
                    <div key={idx} className="bg-zinc-900 border border-zinc-850 rounded-none p-2.5 text-center">
                      <span className="text-[10px] uppercase font-mono text-orange-500 font-bold block">{m.mes}</span>
                      <span className="text-xs text-white font-medium block leading-tight mt-0.5 uppercase">{m.desc}</span>
                    </div>
                  ))}
                </div>

                <ul className="space-y-3 text-sm text-zinc-300">
                  <li className="flex gap-2.5 items-center">
                    <Check className="w-4 h-4 text-orange-500 shrink-0" />
                    <span className="text-xs"><strong className="text-white uppercase italic tracking-wider">Ranking VIP Mensual:</strong> Reconocimiento motivador a la constancia, peso y centímetros perdidos.</span>
                  </li>
                  <li className="flex gap-2.5 items-center">
                    <Check className="w-4 h-4 text-orange-500 shrink-0" />
                    <span className="text-xs"><strong className="text-white uppercase italic tracking-wider">Consultorías Grupales:</strong> Una sesión en directo cada mes con el creador para optimizar tus resultados.</span>
                  </li>
                </ul>
              </div>

              <div className="border-t border-zinc-800 pt-6 mt-6 flex items-center gap-3">
                <ShieldCheck className="text-emerald-550 w-5 h-5 shrink-0" />
                <span className="text-xs text-zinc-300 font-bold uppercase tracking-wider">Diseño enfocado a la persistencia del hábito saludable.</span>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Pricing / Checkout options */}
      <section className="py-24 px-4 max-w-5xl mx-auto" id="pricing-section">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-orange-500 font-mono text-xs tracking-widest uppercase block mb-1 font-black italic">MÉTODO PROBADO</span>
          <h2 className="text-4xl font-black text-white uppercase italic">Comienza Hoy Mismo Tu Nueva Vida</h2>
          <p className="text-zinc-400 text-sm sm:text-base mt-2 font-medium">
            Selecciona el plan que mejor se adapte a tus metas. Recuerda que puedes acceder directamente en modo prueba.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch max-w-4xl mx-auto">
          
          {/* Card 1: Standard No VIP */}
          <div className="bg-zinc-900 border-2 border-zinc-800 rounded-none p-6 flex flex-col justify-between hover:border-zinc-700 transition duration-150">
            <div>
              <span className="text-zinc-400 font-mono text-[10px] font-black uppercase tracking-wider block mb-1">PROGRAMA INTEGRAL</span>
              <h3 className="text-xl font-black text-white leading-tight uppercase italic">Operación Cuerpo Nuevo</h3>
              <p className="text-zinc-300 text-xs sm:text-sm mt-2 leading-relaxed font-bold">
                Acceso completo al programa de 90 días, módulos paso a paso y los bonos de alimentación destructor de antojos.
              </p>

              <div className="my-6">
                <span className="text-5xl font-black text-orange-500 italic block">47€</span>
                <span className="text-zinc-400 text-xs font-black uppercase mt-1 block">Pago único para siempre</span>
              </div>

              <ul className="space-y-2 border-t border-zinc-850 pt-4 text-xs text-zinc-300">
                <li className="flex gap-2"><Check className="w-4 h-4 text-orange-500 shrink-0" /><span>Módulos 1 al 5 paso a paso</span></li>
                <li className="flex gap-2"><Check className="w-4 h-4 text-orange-500 shrink-0" /><span>Bono: Menú destructor de antojos</span></li>
                <li className="flex gap-2"><Check className="w-4 h-4 text-orange-500 shrink-0" /><span>Bono: Calendario completo 90 días</span></li>
                <li className="flex gap-2"><Check className="w-4 h-4 text-orange-500 shrink-0" /><span>Bono: Protocolo anti-rebote</span></li>
                <li className="flex gap-2 text-zinc-500 line-through"><X className="w-4 h-4 text-zinc-600 shrink-0" /><span>Canal VIP Telegram mensual</span></li>
                <li className="flex gap-2 text-zinc-500 line-through"><X className="w-4 h-4 text-zinc-600 shrink-0" /><span>Misiones dinamizadas & ranking</span></li>
              </ul>
            </div>

            <button 
              onClick={() => onSelectPlan("standard")}
              className="mt-8 w-full bg-zinc-950 text-orange-500 hover:text-orange-400 font-black py-3 px-4 rounded-none border-2 border-zinc-805 active:scale-98 transition flex items-center justify-center gap-2 cursor-pointer uppercase italic tracking-tighter"
              id="plan-standard-select"
            >
              Comprar por 47€
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Card 2: VIP Monthly - POPULAR */}
          <div className="bg-zinc-950 border-4 border-orange-500 rounded-none p-6 flex flex-col justify-between relative transform md:-translate-y-2">
            <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-orange-500 text-zinc-950 text-[10px] font-black tracking-widest font-mono uppercase px-3.5 py-1 rounded-none shadow-md unique-best-badge italic">
              RECOMENDADO VIP
            </span>
            
            <div className="pt-2">
              <span className="text-orange-500 font-mono text-[10px] font-black uppercase tracking-wider block mb-1">ACCESO + CLUB COMUNIDAD</span>
              <h3 className="text-xl font-black text-white leading-tight uppercase italic">Club Anti-Rebote VIP</h3>
              <p className="text-zinc-205 text-xs sm:text-sm mt-2 leading-relaxed font-black">
                El programa de 90 días completo + soporte diario, dinámicas de grupo, recetas mensuales continuas y misiones.
              </p>

              <div className="my-6">
                <span className="text-5xl font-black text-orange-500 italic block">39€</span>
                <span className="text-orange-400 text-xs font-black block mt-1 uppercase">Suscripción mensual, cancela cuando quieras</span>
              </div>

              <ul className="space-y-2 border-t border-zinc-800 pt-4 text-xs text-zinc-200">
                <li className="flex gap-2 bg-zinc-900 p-1 rounded-none border border-zinc-800"><Check className="w-4 h-4 text-orange-500 shrink-0" /><span className="font-extrabold text-white uppercase italic">Todo el programa Cuerpo Nuevo</span></li>
                <li className="flex gap-2"><Check className="w-4 h-4 text-orange-500 shrink-0" /><span>Canal VIP de Telegram con menús actualizados</span></li>
                <li className="flex gap-2"><Check className="w-4 h-4 text-orange-500 shrink-0" /><span>Grupo de Telegram (Tribu interactiva)</span></li>
                <li className="flex gap-2"><Check className="w-4 h-4 text-orange-500 shrink-0" /><span>Desafíos & Misión nueva cada mes</span></li>
                <li className="flex gap-2"><Check className="w-4 h-4 text-orange-500 shrink-0" /><span>Acceso al Ranking mensual con recompensas</span></li>
                <li className="flex gap-2"><Check className="w-4 h-4 text-orange-500 shrink-0" /><span className="text-white font-bold">Consultoría grupal interactiva mensual</span></li>
              </ul>
            </div>

            <button 
              onClick={() => onSelectPlan("vip_monthly")}
              className="mt-8 w-full bg-orange-500 text-zinc-950 font-black py-3.5 px-4 rounded-none hover:bg-orange-400 active:scale-98 shadow-md hover:shadow-lg transition flex items-center justify-center gap-2 cursor-pointer uppercase italic tracking-tighter"
              id="plan-vip-monthly-select"
            >
              Unirme al Club por 39€/mes
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </div>

        {/* Dynamic Trust Stats */}
        <div className="mt-20 border-t border-zinc-800 pt-12 grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
          <div>
            <span className="text-4xl font-black text-orange-500 block uppercase italic tracking-wider">4.8/5</span>
            <span className="text-xs text-zinc-400 font-mono uppercase font-black mt-1 block">Valoración de Alumnos</span>
          </div>
          <div>
            <span className="text-4xl font-black text-orange-500 block uppercase italic tracking-wider">+1,200</span>
            <span className="text-xs text-zinc-400 font-mono uppercase font-black mt-1 block">Vidas Transformadas</span>
          </div>
          <div>
            <span className="text-4xl font-black text-orange-500 block uppercase italic tracking-wider">90 Días</span>
            <span className="text-xs text-zinc-400 font-mono uppercase font-black mt-1 block">Garantía de Satisfacción</span>
          </div>
          <div>
            <span className="text-4xl font-black text-orange-500 block uppercase italic tracking-wider font-mono">100%</span>
            <span className="text-xs text-zinc-400 font-mono uppercase font-black mt-1 block">Contenido en Español</span>
          </div>
        </div>
      </section>

      {/* Frequently Asked Questions */}
      <section className="bg-zinc-950 border-t-4 border-zinc-900 py-24 px-4" id="faqs">
        <div className="max-w-3xl mx-auto">
          <span className="text-orange-500 font-mono text-xs tracking-widest uppercase block text-center mb-2 font-black italic">SOPORTE AL CLIENTE</span>
          <h2 className="text-4xl font-black text-white text-center mb-16 uppercase italic">Preguntas Frecuentes</h2>

          <div className="space-y-4">
            {MOCK_FAQ.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div 
                  key={idx} 
                  className="bg-zinc-90 w border-2 border-zinc-850 rounded-none overflow-hidden transition-all duration-200"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full text-left p-5 font-black text-sm sm:text-base text-zinc-150 flex justify-between items-center hover:bg-zinc-850 active:bg-zinc-800 transition duration-150 cursor-pointer uppercase italic tracking-tight"
                  >
                    <span>{faq.q}</span>
                    {isOpen ? <ChevronUp className="w-5 h-5 text-orange-500 shrink-0" /> : <ChevronDown className="w-5 h-5 text-orange-500 shrink-0" />}
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <div className="p-5 border-t border-zinc-850 bg-zinc-950 text-xs sm:text-sm text-zinc-300 leading-relaxed font-bold">
                          {faq.a}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Decision Footer */}
      <section className="bg-zinc-900 text-white py-24 px-4 text-center border-t-4 border-zinc-800" id="final-call">
        <div className="max-w-3xl mx-auto">
          <span className="text-orange-500 font-mono text-xs tracking-widest uppercase block mb-3 font-black italic">TU ÚLTIMO INTENTO</span>
          <h2 className="text-4xl font-black tracking-tight mb-4 uppercase italic text-white">Dentro de 90 días existirán dos versiones de ti</h2>
          <p className="text-zinc-300 text-sm sm:text-base max-w-xl mx-auto mb-10 leading-relaxed font-bold">
            La versión que siguió prometiendo que empezaría "el próximo lunes" y la que decidió deshacerse de las excusas hoy. Solo una de ellas se mirará feliz al espejo.
          </p>

          <div className="bg-zinc-950 border-2 border-zinc-800 rounded-none p-6 sm:p-8 max-w-xl mx-auto mb-10">
            <span className="text-xs font-mono text-zinc-400 block uppercase font-bold">No estás comprando un curso más.</span>
            <p className="text-orange-500 font-black text-lg sm:text-xl mt-2 leading-snug uppercase italic">
              Estás comprando la libertad física de no tener que volver a empezar desde cero nunca más en tu vida.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a 
              href="#pricing-section"
              className="w-full sm:w-auto bg-orange-500 hover:bg-orange-400 text-zinc-950 font-black rounded-none px-10 py-4 shadow-lg transition cursor-pointer uppercase italic tracking-tighter border-2 border-orange-500"
            >
              Comenzar AHORA por 47€
            </a>
            <button 
              onClick={onEnterStudentMode}
              className="w-full sm:w-auto bg-transparent border-2 border-zinc-700 text-zinc-300 hover:bg-zinc-800 hover:border-zinc-500 font-bold rounded-none px-8 py-4 transition cursor-pointer uppercase italic tracking-tighter"
            >
              Entrar en Modo Prueba Alumno
            </button>
          </div>

          <span className="text-[11px] text-zinc-500 font-mono mt-16 block">
            © 2026 Operación Cuerpo Nuevo. Todos los derechos reservados.
          </span>
        </div>
      </section>

      {/* Social Proof Notifications */}
      <AnimatePresence>
        {activeNotification && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="fixed bottom-[92px] left-4 md:bottom-6 md:left-6 z-50 max-w-sm w-[calc(100vw-2rem)] md:w-80 bg-zinc-90 w bg-zinc-900 border-2 border-zinc-800 p-4 shadow-2xl flex items-center gap-3.5 rounded-none"
            id="social-proof-toast"
          >
            <div className="absolute top-0 left-0 w-1.5 h-full bg-orange-500" />
            
            {/* Live pulsing dot */}
            <div className="relative flex h-3.5 w-3.5 shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-orange-500"></span>
            </div>

            <div className="flex-1 min-w-0">
              <p className="text-zinc-150 text-xs sm:text-sm font-semibold leading-normal">
                <span className="font-extrabold text-orange-500 italic uppercase">
                  {activeNotification.name}
                </span>{" "}
                de{" "}
                <span className="text-white font-bold">
                  {activeNotification.city}
                </span>{" "}
                acaba de comprar{" "}
                <span className="text-orange-500 font-extrabold italic uppercase whitespace-nowrap">
                  {activeNotification.plan}
                </span>.
              </p>
              <div className="flex items-center gap-1.5 mt-1">
                <span className="text-[9px] text-zinc-500 font-mono tracking-wider uppercase font-black">
                  ✓ COMPRA VERIFICADA
                </span>
                <span className="w-1 h-1 rounded-full bg-zinc-700" />
                <span className="text-[9px] text-zinc-400 font-mono font-bold uppercase"> hace unos segundos </span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Floating CTA */}
      <AnimatePresence>
        {hasReachedOffers && (
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 100 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-0 left-0 right-0 p-4 bg-zinc-950/90 backdrop-blur-md border-t-2 border-zinc-900 z-40 md:hidden"
            id="mobile-floating-cta-container"
          >
            <button
              onClick={() => {
                const vipSection = document.getElementById("plan-vip-monthly-select");
                if (vipSection) {
                  vipSection.scrollIntoView({ behavior: "smooth", block: "center" });
                } else {
                  const pricingSection = document.getElementById("pricing-section");
                  pricingSection?.scrollIntoView({ behavior: "smooth" });
                }
              }}
              className="w-full bg-orange-500 hover:bg-orange-400 text-zinc-950 font-black py-4 px-6 rounded-none text-xs sm:text-sm transition uppercase italic tracking-tighter shadow-lg flex items-center justify-center gap-2 cursor-pointer"
              id="mobile-floating-cta-btn"
            >
              <Sparkles className="w-4.5 h-4.5 text-zinc-950 stroke-[3.5] animate-pulse" />
              <span>Asegurar Mi Cupo VIP 39€</span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
