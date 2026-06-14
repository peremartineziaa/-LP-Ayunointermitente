import React, { useState } from "react";
import { 
  ArrowLeft, 
  ArrowRight, 
  ShieldCheck, 
  Users, 
  Trophy, 
  Check, 
  Sparkles, 
  Activity, 
  Lock,
  Compass
} from "lucide-react";
import { SelectedPlan, UserProfile } from "../types";
import { motion, AnimatePresence } from "motion/react";

interface OnboardingCheckoutProps {
  selectedPlan: SelectedPlan;
  onPaymentSuccess: (profile: UserProfile, plan: SelectedPlan) => void;
  onCancel: () => void;
}

export default function OnboardingCheckout({ selectedPlan, onPaymentSuccess, onCancel }: OnboardingCheckoutProps) {
  const [step, setStep] = useState<"quiz" | "payment">("quiz");
  
  // Form fields
  const [name, setName] = useState("");
  const [age, setAge] = useState<number>(35);
  const [height, setHeight] = useState<number>(172);
  const [weight, setWeight] = useState<number>(84);
  const [targetWeight, setTargetWeight] = useState<number>(73);
  const [blocker, setBlocker] = useState("Vuelve el hábito de antes (Efecto rebote)");

  // Payment form fields
  const [cardNumber, setCardNumber] = useState("4000 1234 5678 9010");
  const [cardName, setCardName] = useState("");
  const [cardExpiry, setCardExpiry] = useState("09/29");
  const [cardCvv, setCardCvv] = useState("123");
  const [paymentLoading, setPaymentLoading] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  // Dynamic calculations
  const calculateStartingKcal = () => {
    const base = weight * 22;
    return Math.round(base - 400); 
  };

  const calculateTargetLoss = () => {
    return Math.round(weight - targetWeight);
  };

  const getPlanDetails = () => {
    switch (selectedPlan) {
      case "standard":
        return { name: "OPERACIÓN CUERPO NUEVO - ACCESO ESTÁNDAR", price: "47€", terms: "Pago único. Acceso permanente." };
      case "vip_monthly":
        return { name: "CLUB ANTI-REBOTE VIP - ACCESO MENSUAL", price: "39€/mes", terms: "Cobrado mensualmente. Cancela cuando quieras." };
      case "vip_yearly":
        return { name: "CLUB ANTI-REBOTE VIP ELITE - ACCESO ANUAL", price: "297€/año", terms: "Cobrado anualmente. Acceso por 12 meses." };
    }
  };

  const handeQuizSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      alert("Por favor, introduce tu nombre.");
      return;
    }
    setCardName(name.toUpperCase());
    setStep("payment");
  };

  const handlePaymentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setPaymentLoading(true);

    // Simulate 1.5s gateway response
    setTimeout(() => {
      setPaymentLoading(false);
      setPaymentSuccess(true);

      // Simulate transition to dashboard
      setTimeout(() => {
        onPaymentSuccess({
          name: name || "Alumno Cuerpo Nuevo",
          age,
          height,
          initialWeight: weight,
          targetWeight,
          blocker
        }, selectedPlan);
      }, 1500);
    }, 1800);
  };

  const plan = getPlanDetails();

  return (
    <div className="bg-zinc-950 min-h-screen py-10 px-4 flex justify-center items-center font-sans selection:bg-orange-500 selection:text-black">
      
      <div className="w-full max-w-2xl bg-zinc-900 rounded-none border-2 border-zinc-800 shadow-2xl overflow-hidden">
        
        {/* Header decoration */}
        <div className="bg-orange-500 h-2 w-full animate-pulse" />
        
        <div className="p-6 sm:p-8">
          
          {/* Top navigation */}
          {!paymentSuccess && (
            <div className="flex justify-between items-center mb-8 pb-4 border-b border-zinc-800">
              <button 
                onClick={step === "payment" ? () => setStep("quiz") : onCancel}
                className="flex items-center gap-1.5 text-xs sm:text-sm text-zinc-400 hover:text-white font-black cursor-pointer uppercase italic tracking-wider transition"
              >
                <ArrowLeft className="w-4 h-4 text-orange-500" />
                <span>Atrás</span>
              </button>
              
              <div className="flex gap-2 text-[10px] sm:text-xs font-mono font-black tracking-widest text-zinc-500">
                <span className={step === "quiz" ? "text-orange-500" : "text-emerald-500"}>
                  {step === "quiz" ? "PASO 1: METABOLISMO" : "PASO 2: ACTIVACIÓN"}
                </span>
                <span>/</span>
                <span>REGISTRO</span>
              </div>
            </div>
          )}

          <AnimatePresence mode="wait">
            
            {/* STEP 1: METABOLISM & PROFILE QUIZ */}
            {step === "quiz" && (
              <motion.div
                key="quiz"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                className="space-y-6"
              >
                <div>
                  <h2 className="text-3xl font-black text-white tracking-tight uppercase italic">Estudio de Arranque Personal</h2>
                  <p className="text-zinc-400 text-xs sm:text-sm mt-1 font-semibold">
                    Calcularemos las calorías de inicio y velocidad metabólica recomendada antes de procesar el registro.
                  </p>
                </div>

                <form onSubmit={handeQuizSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] font-black uppercase text-zinc-400 mb-1.5 font-mono">Tu Nombre Completo</label>
                      <input 
                        type="text" 
                        required
                        placeholder="Ej. Juan Martínez" 
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full bg-zinc-950 border border-zinc-800 rounded-none px-3.5 py-2.5 text-sm font-bold text-white focus:border-orange-500 outline-none placeholder:text-zinc-700 transition"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-black uppercase text-zinc-400 mb-1.5 font-mono">Edad (Años)</label>
                      <input 
                        type="number" 
                        min="16" 
                        max="90"
                        required
                        value={age || ""}
                        onChange={(e) => setAge(parseInt(e.target.value) || 0)}
                        className="w-full bg-zinc-950 border border-zinc-800 rounded-none px-3.5 py-2.5 text-sm font-bold text-white focus:border-orange-500 outline-none transition"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-[10px] font-black uppercase text-zinc-400 mb-1.5 font-mono">Altura (cm)</label>
                      <input 
                        type="number" 
                        min="100" 
                        max="250"
                        required
                        value={height || ""}
                        onChange={(e) => setHeight(parseInt(e.target.value) || 0)}
                        className="w-full bg-zinc-950 border border-zinc-800 rounded-none px-3.5 py-2.5 text-sm font-bold text-white focus:border-orange-500 outline-none transition"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-black uppercase text-zinc-400 mb-1.5 font-mono">Peso Actual (kg)</label>
                      <input 
                        type="number" 
                        step="0.1"
                        min="40" 
                        max="200"
                        required
                        value={weight || ""}
                        onChange={(e) => setWeight(parseFloat(e.target.value) || 0)}
                        className="w-full bg-zinc-950 border border-zinc-800 rounded-none px-3.5 py-2.5 text-sm font-bold text-white focus:border-orange-500 outline-none transition"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-black uppercase text-zinc-400 mb-1.5 font-mono">Peso Objetivo (kg)</label>
                      <input 
                        type="number" 
                        step="0.1"
                        min="30" 
                        max="150"
                        required
                        value={targetWeight || ""}
                        onChange={(e) => setTargetWeight(parseFloat(e.target.value) || 0)}
                        className="w-full bg-zinc-950 border border-zinc-800 rounded-none px-3.5 py-2.5 text-sm font-bold text-white focus:border-orange-500 outline-none transition"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] font-black uppercase text-zinc-400 mb-1.5 font-mono">¿Cuál ha sido tu mayor obstáculo en el pasado?</label>
                    <select 
                      value={blocker} 
                      onChange={(e) => setBlocker(e.target.value)}
                      className="w-full bg-zinc-950 border border-zinc-800 rounded-none px-3.5 py-2.5 text-sm font-bold text-white focus:border-orange-550 outline-none transition cursor-pointer"
                    >
                      <option value="Vuelve el hábito de antes (Efecto rebote)">No retener los hábitos y volver a recuperar el peso perdido.</option>
                      <option value="Ataques de ansiedad por la comida">Los antojos y picoteos locos por la noche de dulce.</option>
                      <option value="Entrenamientos muy largos o complejos">Falta de tiempo para entrenar o preparar menús difíciles.</option>
                      <option value="Poca constancia y soledad">Sentirse solo/a en el proceso y desinflarse rápido.</option>
                    </select>
                  </div>

                  {/* Intermittent pre-calculation widget */}
                  <div className="bg-zinc-950 border-2 border-zinc-800 rounded-none p-4 sm:p-5 mt-6">
                    <div className="flex items-center gap-2 mb-3">
                      <Activity className="w-5 h-5 text-orange-500 shrink-0" />
                      <strong className="text-white text-sm sm:text-base font-black uppercase italic tracking-wider">Diagnóstico Metabólico Estimado:</strong>
                    </div>

                    <p className="text-zinc-300 text-xs sm:text-sm leading-relaxed mb-4">
                      Para perder los <span className="font-bold text-orange-500">{calculateTargetLoss() || 0} kg de exceso</span> en los próximos 90 días de la Operación Cuerpo Nuevo, te asignaremos de entrada las siguientes pautas mecánicas:
                    </p>

                    <div className="grid grid-cols-2 gap-3">
                      <div className="bg-zinc-900 rounded-none p-3 border border-zinc-800">
                        <span className="text-[9px] uppercase font-mono font-black block text-zinc-500 leading-none">CONSUMO DIARIO INICIO</span>
                        <span className="text-orange-500 font-extrabold text-lg block mt-1">{calculateStartingKcal() || 0} Kcal</span>
                        <span className="text-[10px] text-emerald-400 font-black uppercase block mt-0.5">Déficit controlado</span>
                      </div>
                      <div className="bg-zinc-900 rounded-none p-3 border border-zinc-800">
                        <span className="text-[9px] uppercase font-mono font-black block text-zinc-500 leading-none">AYUNO RECOMENDADO</span>
                        <span className="text-white font-extrabold text-base block mt-1 uppercase">13h Nocturnas</span>
                        <span className="text-[10px] text-zinc-400 block uppercase font-bold">Restablecimiento celular</span>
                      </div>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-orange-500 text-zinc-1500 hover:bg-orange-400 text-zinc-950 font-black py-4 px-4 rounded-none shadow-md transition flex items-center justify-center gap-2 cursor-pointer uppercase italic tracking-tighter"
                  >
                    <span>Proceder a la Activación del Plan</span>
                    <ArrowRight className="w-5 h-5 text-zinc-950" />
                  </button>
                </form>
              </motion.div>
            )}

            {/* STEP 2: SECURE CHECKOUT SIMULATION / SUCCESS SCREEN */}
            {step === "payment" && (
              <motion.div
                key="payment"
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                className="space-y-6"
              >
                {paymentSuccess ? (
                  // Success State Animated
                  <div className="py-10 text-center space-y-6">
                    <div className="w-20 h-20 bg-emerald-500/10 text-emerald-400 rounded-none flex items-center justify-center mx-auto border-2 border-emerald-500/30 animate-bounce">
                      <Check className="w-10 h-10 stroke-[3]" />
                    </div>

                    <div className="space-y-2">
                      <h2 className="text-3xl font-black text-white tracking-tight uppercase italic">¡Activación Lograda!</h2>
                      <p className="text-emerald-400 text-sm font-black uppercase tracking-wider">Tus credenciales y plan de 90 días han sido provisionados.</p>
                    </div>

                    <p className="text-zinc-400 text-xs sm:text-sm max-w-md mx-auto leading-relaxed font-semibold">
                      Bienvenido al programa, <strong className="text-white">{name}</strong>. Estamos configurando tu Calendario Completo de 90 días, asignando tus recetas de antojos y dándote acceso prioritario al Club Anti-Rebote VIP...
                    </p>

                    <div className="pt-4">
                      <span className="inline-flex items-center gap-1.5 text-xs font-mono text-zinc-500 uppercase font-black">
                        <Activity className="w-3.5 h-3.5 animate-spin text-orange-500" />
                        Redirigiendo a tu espacio de alumno privado...
                      </span>
                    </div>
                  </div>
                ) : (
                  // Native Checkout Form mockup
                  <div className="space-y-6">
                    <div>
                      <h2 className="text-3xl font-black text-white tracking-tight uppercase italic">Pasarela de Facturación Segura</h2>
                      <p className="text-zinc-400 text-xs sm:text-sm mt-1 font-semibold">
                        Consolida tu inscripción sin compromiso directo real. No se realizarán cargos verdaderos.
                      </p>
                    </div>

                    {/* Summary of checkout */}
                    <div className="bg-zinc-950 border-2 border-zinc-800 rounded-none p-4">
                      <span className="text-[9px] font-mono font-black text-zinc-500 block tracking-widest uppercase">CONCEPTO SELECCIONADO</span>
                      <div className="flex justify-between items-center mt-1">
                        <span className="text-white font-black text-sm sm:text-base uppercase italic">{plan?.name}</span>
                        <span className="text-orange-500 font-black text-xl shrink-0 ml-4 italic">{plan?.price}</span>
                      </div>
                      <span className="text-[11px] text-zinc-405 font-bold block mt-1 uppercase text-orange-400/80">{plan?.terms}</span>
                    </div>

                    <form onSubmit={handlePaymentSubmit} className="space-y-4">
                      
                      {/* Credit Card mockup */}
                      <div className="bg-zinc-950 rounded-none p-5 border-2 border-zinc-800 relative text-white shadow-lg">
                        <div className="flex justify-between items-start mb-6">
                          <Compass className="w-8 h-8 text-orange-500 stroke-[1.5]" />
                          <span className="bg-zinc-900 text-[9px] font-mono tracking-widest text-zinc-450 font-black uppercase rounded-none px-2 py-0.5 border border-zinc-800">BANCO SECURE</span>
                        </div>

                        <div>
                          <input 
                            type="text" 
                            required
                            placeholder="Número de tarjeta" 
                            value={cardNumber}
                            onChange={(e) => setCardNumber(e.target.value)}
                            className="bg-transparent border-b-2 border-zinc-800 focus:border-orange-500 text-lg sm:text-xl font-mono text-white placeholder:text-zinc-800 outline-none w-full tracking-widest font-black"
                          />
                          <span className="text-[9px] text-zinc-500 font-mono tracking-wider block mt-1 uppercase font-bold">Dato de prueba integrado para la demo</span>
                        </div>

                        <div className="grid grid-cols-2 gap-4 mt-6">
                          <div>
                            <span className="text-[8px] text-zinc-550 block font-mono uppercase leading-none font-bold">TITULAR</span>
                            <span className="text-sm font-black truncate block mt-1 uppercase tracking-wider text-orange-500 italic">{name || "NUEVO ALUMNO"}</span>
                          </div>
                          <div className="text-right">
                            <span className="text-[8px] text-zinc-550 block font-mono uppercase leading-none font-bold">VENCE</span>
                            <span className="text-sm font-black block mt-1 font-mono text-zinc-300">{cardExpiry}</span>
                          </div>
                        </div>
                      </div>

                      {/* Actual fields below */}
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-[10px] font-black uppercase text-zinc-400 mb-1 font-mono">Caducidad</label>
                          <input 
                            type="text" 
                            required
                            placeholder="MM/AA" 
                            value={cardExpiry}
                            onChange={(e) => setCardExpiry(e.target.value)}
                            className="w-full bg-zinc-950 border border-zinc-800 rounded-none px-3 py-2.5 text-sm font-bold text-white focus:border-orange-550 outline-none font-mono"
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] font-black uppercase text-zinc-400 mb-1 font-mono">Código CVV</label>
                          <input 
                            type="text" 
                            required
                            maxLength="3"
                            placeholder="123" 
                            value={cardCvv}
                            onChange={(e) => setCardCvv(e.target.value)}
                            className="w-full bg-zinc-950 border border-zinc-800 rounded-none px-3 py-2.5 text-sm font-bold text-white focus:border-orange-550 outline-none font-mono"
                          />
                        </div>
                      </div>

                      <div className="flex items-center gap-3 bg-zinc-950 text-zinc-400 p-4 rounded-none border border-zinc-850 text-xs font-semibold">
                        <Lock className="w-4 h-4 text-orange-500 shrink-0" />
                        <span>Pasarela integrada en AI Studio. Tus datos ficticios están protegidos con un cifrado militar simulado.</span>
                      </div>

                      <button
                        type="submit"
                        disabled={paymentLoading}
                        className="w-full bg-orange-500 text-zinc-950 font-black py-4 px-4 rounded-none hover:bg-orange-400 disabled:bg-zinc-800 disabled:text-zinc-650 active:scale-98 transition flex items-center justify-center gap-2 cursor-pointer uppercase italic tracking-tighter"
                      >
                        {paymentLoading ? (
                          <>
                            <Activity className="w-5 h-5 animate-spin" />
                            <span>Procesando pago ficticio...</span>
                          </>
                        ) : (
                          <>
                            <ShieldCheck className="w-5 h-5" />
                            <span>Activar Operación Cuerpo Nuevo</span>
                          </>
                        )}
                      </button>
                    </form>
                  </div>
                )}
              </motion.div>
            )}

          </AnimatePresence>

        </div>
      </div>
      
    </div>
  );
}
