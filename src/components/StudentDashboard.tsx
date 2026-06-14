import React, { useState, useEffect } from "react";
import { 
  Dumbbell, 
  BookOpen, 
  UtensilsCrossed, 
  Users, 
  TrendingDown, 
  CheckCircle, 
  Clock, 
  Plus, 
  Send, 
  Trophy, 
  LogOut, 
  ChevronRight, 
  HelpCircle,
  Sparkles,
  Calendar,
  Layers,
  HeartCrack,
  Check,
  SendHorizontal
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from "recharts";
import { UserProfile, SelectedPlan, WeightLog, DayTask, CommunityPost, RankingItem } from "../types";
import { 
  PROGRAM_MODULES, 
  MOCK_MEALS, 
  INITIAL_COMMUNITY_POSTS, 
  INITIAL_RANKING 
} from "../data";

interface StudentDashboardProps {
  userProfile: UserProfile;
  selectedPlan: SelectedPlan;
  onLogout: () => void;
}

export default function StudentDashboard({ userProfile, selectedPlan, onLogout }: StudentDashboardProps) {
  const [activeTab, setActiveTab] = useState<"plan" | "modules" | "menus" | "vip">("plan");
  const [currentWeek, setCurrentWeek] = useState<number>(1);
  const [selectedModule, setSelectedModule] = useState<number>(1);
  
  // Weight tracking state
  const [weightLogs, setWeightLogs] = useState<WeightLog[]>([]);
  const [inputWeight, setInputWeight] = useState("");
  const [currentWeight, setCurrentWeight] = useState(userProfile.initialWeight);
  
  // Day checklist state
  const [tasks, setTasks] = useState<DayTask[]>([]);
  const [selectedDay, setSelectedDay] = useState<number>(1);
  
  // Community and ranking states
  const [communityPosts, setCommunityPosts] = useState<CommunityPost[]>([]);
  const [newPostText, setNewPostText] = useState("");
  const [rankingList, setRankingList] = useState<RankingItem[]>([]);
  
  // Monthly mission state
  const [userWaist, setUserWaist] = useState<number>(88);
  const [newWaistInput, setNewWaistInput] = useState("");
  
  // Consult Q&A
  const [consultQuestion, setConsultQuestion] = useState("");
  const [consultSubmitted, setConsultSubmitted] = useState(false);

  // Load persistence or set default initial weights
  useEffect(() => {
    // Generate weight projection logs
    const initialLogs: WeightLog[] = [];
    const weeksCount = 7;
    for (let i = 0; i < weeksCount; i++) {
      // Simulate slow realistic drop
      const lossRatio = i * 0.7; // ~0.7kg loss per week
      initialLogs.push({
        date: `Semana ${i}`,
        weight: parseFloat((userProfile.initialWeight - lossRatio).toFixed(1))
      });
    }
    setWeightLogs(initialLogs);

    // Generate dynamic tasks template for the 90 days
    const generatedTasks: DayTask[] = [];
    for (let day = 1; day <= 90; day++) {
      const weekNum = Math.ceil(day / 7);
      let dayText = "Toma 2 litros de agua purificada, realiza ayuno de 13h nocturnas.";
      let type: DayTask["type"] = "metabolic";

      if (weekNum <= 2) {
        dayText = `Módulo 1: Elimina aceites refinados, añade sal marina al agua y camina 8k pasos.`;
        type = "metabolic";
      } else if (weekNum <= 4) {
        dayText = `Módulo 2: Eleva tu ventana de ayuno a 14h. Rompe el ayuno con grasas saludables y proteínas limpias.`;
        type = "fasting";
      } else if (weekNum <= 7) {
        dayText = `Módulo 3: Completa respiración parasimpática pre-almuerzo. Bebe té verde cuando asome el antojo de azúcar.`;
        type = "mindset";
      } else if (weekNum <= 10) {
        dayText = `Módulo 4: Haz rutina micro-HIIT de 15 min en casa y eleva tu NEAT subiendo escaleras.`;
        type = "booster";
      } else {
        dayText = `Módulo 5: Sellar el Set-point corporal. Prueba la regla del 80/20 en tus comidas sociales.`;
        type = "habits";
      }

      generatedTasks.push({
        id: `t-${day}`,
        dayIndex: day,
        text: dayText,
        type,
        completed: day < 12 // Pre-check some days for realistic simulation
      });
    }
    setTasks(generatedTasks);

    setCommunityPosts(INITIAL_COMMUNITY_POSTS);
    
    // Setup initial ranking with the user appended to list
    const userLoss = parseFloat((userProfile.initialWeight - currentWeight).toFixed(1));
    const userRankingItem: RankingItem = {
      id: "user-rank",
      rank: 3, 
      name: `Tú (${userProfile.name})`,
      weightLost: userLoss || 1.2,
      waistLost: 2.0,
      points: Math.round((userLoss || 1.2) * 100),
      isUser: true
    };
    
    const updatedRanking = [...INITIAL_RANKING];
    updatedRanking.push(userRankingItem);
    // Sort ranking based on weight loss descending
    updatedRanking.sort((a, b) => b.weightLost - a.weightLost);
    // Assign proper ranks
    updatedRanking.forEach((item, idx) => {
      item.rank = idx + 1;
    });
    setRankingList(updatedRanking);

  }, [userProfile]);

  // Handle task checktoggle
  const handleToggleTask = (taskId: string) => {
    setTasks(prev => prev.map(t => t.id === taskId ? { ...t, completed: !t.completed } : t));
    
    // Award 15 points to user in ranking
    setRankingList(prev => {
      const updated = prev.map(item => {
        if (item.isUser) {
          const newPoints = item.points + 15;
          return { ...item, points: newPoints };
        }
        return item;
      });
      return updated.sort((a, b) => b.points - a.points).map((item, idx) => ({ ...item, rank: idx + 1 }));
    });
  };

  // Add a new weight log
  const handleAddWeight = (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = parseFloat(inputWeight);
    if (!parsed || parsed < 30 || parsed > 250) {
      alert("Por favor introduce un peso válido.");
      return;
    }

    const newLog: WeightLog = {
      date: `Reg ${weightLogs.length + 1}`,
      weight: parsed
    };

    const newLogs = [...weightLogs, newLog];
    setWeightLogs(newLogs);
    setCurrentWeight(parsed);
    setInputWeight("");

    // Update weight lost in ranking
    const totalLost = parseFloat((userProfile.initialWeight - parsed).toFixed(1));
    setRankingList(prev => {
      const updated = prev.map(item => {
        if (item.isUser) {
          // Add 100 points per kg lost!
          const earnedPoints = Math.max(0, Math.round(totalLost * 100));
          return { ...item, weightLost: totalLost, points: item.points + 50 + earnedPoints };
        }
        return item;
      });
      return updated.sort((a, b) => b.points - a.points).map((item, idx) => ({ ...item, rank: idx + 1 }));
    });
  };

  // Add waist measurement log (misión mensual)
  const handleAddWaist = (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = parseFloat(newWaistInput);
    if (!parsed || parsed < 40 || parsed > 200) {
      alert("Por favor introduce una medida válida.");
      return;
    }
    const currentWaistLost = 92 - parsed; // Assume 92cm baseline
    setUserWaist(parsed);
    setNewWaistInput("");

    setRankingList(prev => {
      const updated = prev.map(item => {
        if (item.isUser) {
          return { ...item, waistLost: parseFloat(currentWaistLost.toFixed(1)), points: item.points + 100 };
        }
        return item;
      });
      return updated.sort((a, b) => b.points - a.points).map((item, idx) => ({ ...item, rank: idx + 1 }));
    });
  };

  // Post in VIP Community simulation
  const handleAddPost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPostText.trim()) return;

    const newPost: CommunityPost = {
      id: `p-${Date.now()}`,
      userName: userProfile.name,
      avatarColor: "bg-orange-500 text-zinc-950",
      timeAgo: "Hace unos segundos",
      content: newPostText,
      likes: 0,
      commentsCount: 0,
      isLikedByUser: false
    };

    setCommunityPosts([newPost, ...communityPosts]);
    setNewPostText("");
  };

  const handleLikePost = (postId: string) => {
    setCommunityPosts(prev => prev.map(post => {
      if (post.id === postId) {
        const liked = !post.isLikedByUser;
        return {
          ...post,
          likes: liked ? post.likes + 1 : post.likes - 1,
          isLikedByUser: liked
        };
      }
      return post;
    }));
  };

  // Percent calculation
  const totalCompletedTasks = tasks.filter(t => t.completed).length;
  const progressPercent = Math.min(100, Math.round((totalCompletedTasks / 90) * 100));
  const currentTotalLost = parseFloat((userProfile.initialWeight - currentWeight).toFixed(1));

  // Filter tasks belonging to current week selection
  const weekStartDay = (currentWeek - 1) * 7 + 1;
  const weekEndDay = Math.min(90, currentWeek * 7);
  const weekTasks = tasks.filter(t => t.dayIndex >= weekStartDay && t.dayIndex <= weekEndDay);

  return (
    <div className="bg-zinc-950 text-zinc-100 min-h-screen font-sans flex flex-col md:flex-row selection:bg-orange-500 selection:text-black" id="dashboard-root">
      
      {/* LEFT SIDEBAR NAVIGATION */}
      <aside className="w-full md:w-68 bg-zinc-900 border-b md:border-b-0 md:border-r border-zinc-800 p-5 flex flex-col justify-between shrink-0" id="sidebar">
        <div>
          {/* Brand */}
          <div className="flex items-center gap-2 mb-8 bg-zinc-950 p-3 border-l-4 border-orange-500 rounded-none">
            <span className="text-orange-500 text-xl font-black italic tracking-wide">90 DÍAS</span>
            <span className="text-white text-xs font-black uppercase tracking-widest leading-none block font-mono">CUERPO NUEVO</span>
          </div>

          {/* User Brief profile card */}
          <div className="bg-zinc-950 border-2 border-zinc-800 rounded-none p-4 mb-6">
            <div className="flex items-center gap-3">
              <div className="bg-orange-500 text-zinc-950 font-black text-sm w-9 h-9 rounded-none flex items-center justify-center italic">
                {userProfile.name.charAt(0).toUpperCase()}
              </div>
              <div className="overflow-hidden">
                <span className="text-sm font-black text-white block truncate uppercase">{userProfile.name}</span>
                <span className="text-[10px] text-orange-400 block tracking-wide uppercase font-mono font-black italic mt-1">
                  {selectedPlan === "standard" ? "Alumno Básico" : selectedPlan === "vip_monthly" ? "Club VIP Mensual" : "👑 VIP Elite Anual"}
                </span>
              </div>
            </div>

            {/* Micro stats inside card */}
            <div className="grid grid-cols-2 gap-2 mt-4 pt-4 border-t border-zinc-800 text-center">
              <div>
                <span className="text-[9px] text-zinc-500 font-mono block font-black uppercase">PESO ACTUAL</span>
                <span className="text-white font-extrabold text-sm block mt-0.5 font-mono">{currentWeight} kg</span>
              </div>
              <div>
                <span className="text-[9px] text-zinc-500 font-mono block font-black uppercase">PERDIDO</span>
                <span className="text-orange-500 font-extrabold text-sm block mt-0.5 font-mono">-{currentTotalLost} kg</span>
              </div>
            </div>
          </div>

          {/* Tabs Menu */}
          <nav className="space-y-1.5" id="nav-tabs">
            <button
              onClick={() => setActiveTab("plan")}
              className={`w-full text-left px-4 py-3 rounded-none text-xs font-black uppercase italic tracking-wider flex items-center gap-3 transition cursor-pointer ${activeTab === "plan" ? "bg-orange-500 text-zinc-950" : "text-zinc-400 hover:bg-zinc-950 hover:text-white"}`}
              id="tab-plan"
            >
              <Calendar className="w-4.5 h-4.5 shrink-0" />
              <span>Mi Plan 90 Días</span>
            </button>

            <button
              onClick={() => setActiveTab("modules")}
              className={`w-full text-left px-4 py-3 rounded-none text-xs font-black uppercase italic tracking-wider flex items-center gap-3 transition cursor-pointer ${activeTab === "modules" ? "bg-orange-500 text-zinc-950" : "text-zinc-400 hover:bg-zinc-950 hover:text-white"}`}
              id="tab-modules"
            >
              <BookOpen className="w-4.5 h-4.5 shrink-0" />
              <span>Módulos de Ciencia</span>
            </button>

            <button
              onClick={() => setActiveTab("menus")}
              className={`w-full text-left px-4 py-3 rounded-none text-xs font-black uppercase italic tracking-wider flex items-center gap-3 transition cursor-pointer ${activeTab === "menus" ? "bg-orange-500 text-zinc-950" : "text-zinc-400 hover:bg-zinc-950 hover:text-white"}`}
              id="tab-menus"
            >
              <UtensilsCrossed className="w-4.5 h-4.5 shrink-0" />
              <span>Plan de Comidas</span>
            </button>

            <button
              onClick={() => setActiveTab("vip")}
              className={`w-full text-left px-4 py-3 rounded-none text-xs font-black uppercase italic tracking-wider flex items-center gap-3 transition cursor-pointer ${activeTab === "vip" ? "bg-orange-500 text-zinc-950" : "text-zinc-400 hover:bg-zinc-950 hover:text-white"}`}
              id="tab-vip"
            >
              <Users className="w-4.5 h-4.5 shrink-0" />
              <span>Club Anti-Rebote VIP</span>
            </button>
          </nav>
        </div>

        {/* Bottom actions */}
        <div className="pt-6 border-t border-zinc-800 mt-6 flex flex-col gap-3">
          <div className="bg-zinc-950 rounded-none p-3 border border-zinc-800">
            <span className="text-[10px] text-zinc-550 font-mono uppercase font-black block">PROGRESO DEL PLAN</span>
            <div className="w-full bg-zinc-800 rounded-none h-2 mt-2">
              <div 
                className="bg-orange-500 h-2 rounded-none transition-all duration-300"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
            <span className="text-right text-[10px] font-mono font-black text-orange-550 block mt-1.5">{progressPercent}% LOGRADO</span>
          </div>

          <button
            onClick={onLogout}
            className="w-full border-2 border-zinc-800 text-zinc-400 hover:text-white hover:bg-zinc-950 py-2.5 px-3 rounded-none text-xs font-black uppercase italic tracking-tight flex items-center gap-2 justify-center transition cursor-pointer"
            id="sidebar-logout"
          >
            <LogOut className="w-3.5 h-3.5 text-orange-500" />
            <span>Volver a Portada</span>
          </button>
        </div>
      </aside>

      {/* MAIN DASHBOARD CONTENT AREA */}
      <main className="flex-1 p-4 sm:p-6 md:p-8 bg-zinc-950 overflow-y-auto" id="main-content">
        
        <AnimatePresence mode="wait">
          
          {/* TAB 1: 90 DAYS PLANNER & TRACKING */}
          {activeTab === "plan" && (
            <motion.div
              key="plan"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-6"
            >
              <div className="flex flex-col xl:flex-row xl:justify-between xl:items-center gap-4">
                <div>
                  <h1 className="text-3xl font-black text-white uppercase italic tracking-tight">Mi Plan Diario de Acción</h1>
                  <p className="text-zinc-405 text-xs sm:text-sm font-semibold text-zinc-400">Completa tus misiones estratégicas para desplazar el Set-Point biológico.</p>
                </div>

                {/* Weeks Grid quick switcher */}
                <div className="flex items-center gap-2 overflow-x-auto pb-1 max-w-full">
                  <span className="text-xs font-mono text-zinc-400 uppercase shrink-0 font-black italic mr-1">Semana:</span>
                  {[...Array(13)].map((_, idx) => {
                    const wNum = idx + 1;
                    return (
                      <button
                        key={wNum}
                        onClick={() => setCurrentWeek(wNum)}
                        className={`w-8 h-8 rounded-none text-xs font-mono font-black shrink-0 transition cursor-pointer ${currentWeek === wNum ? "bg-orange-500 text-black border border-orange-500" : "bg-zinc-900 text-zinc-300 hover:bg-zinc-800 border border-zinc-800"}`}
                      >
                        {wNum}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Grid with Checklist & Weight Chart */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                
                {/* Weekly Goal Checklist block (Left 2 cols) */}
                <div className="bg-zinc-900 border-2 border-zinc-800 rounded-none p-5 sm:p-6 lg:col-span-2 space-y-5">
                  <div className="flex justify-between items-center pb-4 border-b border-zinc-800">
                    <div>
                      <h2 className="font-extrabold text-lg text-white uppercase italic">Semana {currentWeek}: Agenda de Acciones</h2>
                      <p className="text-xs text-zinc-400 font-semibold">Consolida tu día. Al pulsar sumas +15 puntos en la Tribu VIP.</p>
                    </div>
                    <span className="text-[10px] font-mono uppercase bg-orange-500/10 text-orange-500 px-2.5 py-1 rounded-none border border-orange-500/20 font-black italic">
                      Días {weekStartDay} - {weekEndDay}
                    </span>
                  </div>

                  {/* Tasks List */}
                  <div className="space-y-3.5">
                    {weekTasks.map((task) => (
                      <div 
                        key={task.id}
                        className={`p-4 rounded-none border-2 transition flex gap-3.5 items-start ${task.completed ? "bg-orange-500/5 border-orange-500/20 text-zinc-300" : "bg-zinc-950 border-zinc-850 text-white"}`}
                      >
                        <button
                          onClick={() => handleToggleTask(task.id)}
                          className={`w-6 h-6 rounded-none border-2 flex items-center justify-center shrink-0 transition cursor-pointer ${task.completed ? "bg-orange-500 border-orange-500 text-zinc-950" : "border-zinc-700 hover:border-zinc-500 bg-zinc-900"}`}
                        >
                          {task.completed && <Check className="w-4 h-4 stroke-[4] text-zinc-950" />}
                        </button>

                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="text-[10px] font-mono font-black uppercase tracking-wider text-orange-500 italic">Día {task.dayIndex}</span>
                            <span className="w-1.5 h-1.5 rounded-full bg-zinc-700" />
                            <span className="text-[9px] font-mono tracking-widest uppercase text-zinc-400 font-black">{task.type}</span>
                          </div>
                          <p className="text-xs sm:text-sm font-semibold leading-relaxed">
                            {task.text}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Weight Tracking & Recharts Chart block (Right col) */}
                <div className="space-y-6">
                  
                  {/* Log Weight Form */}
                  <div className="bg-zinc-900 border-2 border-zinc-800 rounded-none p-5 sm:p-6 space-y-4">
                    <h2 className="font-extrabold text-base text-white uppercase italic flex items-center gap-2">
                      <TrendingDown className="w-5 h-5 text-orange-500" />
                      <span>Control de Peso</span>
                    </h2>

                    <p className="text-xs text-zinc-400 leading-relaxed font-semibold">
                      Controla tu peso semanal para registrar tu curva de set-point metabólico. Tu meta: {userProfile.targetWeight} kg.
                    </p>

                    <form onSubmit={handleAddWeight} className="flex gap-2">
                      <input 
                        type="number" 
                        step="0.1"
                        required
                        placeholder={`${currentWeight} kg`} 
                        value={inputWeight}
                        onChange={(e) => setInputWeight(e.target.value)}
                        className="bg-zinc-950 border border-zinc-800 rounded-none px-3 py-2 text-sm text-white font-mono font-bold focus:border-orange-500 outline-none w-full"
                      />
                      <button
                        type="submit"
                        className="bg-orange-500 hover:bg-orange-400 active:scale-98 text-zinc-950 px-4 py-2 rounded-none text-xs font-black transition flex items-center gap-1.5 cursor-pointer shrink-0 uppercase italic tracking-tighter"
                      >
                        <Plus className="w-4 h-4 text-zinc-950" />
                        Log Peso
                      </button>
                    </form>
                  </div>

                  {/* Weight Progress chart */}
                  <div className="bg-zinc-900 border-2 border-zinc-800 rounded-none p-5 sm:p-6 space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-mono text-zinc-400 uppercase font-black italic tracking-wider">Curva de Descenso</span>
                      <Sparkles className="w-4 h-4 text-orange-500 animate-pulse" />
                    </div>

                    <div className="h-48 w-full" id="chart-container">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={weightLogs} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                           <CartesianGrid strokeDasharray="3 3" stroke="#27272a" />
                           <XAxis dataKey="date" stroke="#71717a" fontSize={9} />
                           <YAxis stroke="#71717a" fontSize={9} domain={['dataMin - 2', 'dataMax + 2']} />
                           <Tooltip 
                             contentStyle={{ backgroundColor: "#09090b", borderColor: "#27272a", borderRadius: "0px", fontSize: "11px" }}
                             labelStyle={{ color: "#ffffff", fontWeight: "bold" }}
                           />
                           <Line 
                             type="monotone" 
                             dataKey="weight" 
                             stroke="#f97316" 
                             strokeWidth={3} 
                             dot={{ fill: "#f97316", r: 4 }}
                           />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>

                    <div className="pt-2 border-t border-zinc-800 text-center">
                      <span className="text-[10px] text-zinc-500 font-mono uppercase font-black block">
                        Pesado: <strong className="text-white">{currentWeight}kg</strong> · Meta: <strong className="text-orange-500">{userProfile.targetWeight}kg</strong>
                      </span>
                    </div>
                  </div>

                </div>

              </div>
            </motion.div>
          )}

          {/* TAB 2: PROGRAM MODULES & LESSONS */}
          {activeTab === "modules" && (
            <motion.div
              key="modules"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-6"
            >
              <div>
                <h1 className="text-3xl font-black text-white uppercase italic tracking-tight">Temario del Método</h1>
                <p className="text-zinc-400 text-xs sm:text-sm mt-0.5 font-semibold">Comprende la neurobiología y el comportamiento celular de tu grasa.</p>
              </div>

              {/* Modules layout */}
              <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                
                {/* Left side: Module selection buttons */}
                <div className="lg:col-span-1 space-y-2">
                  <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest block mb-2 px-1 font-black">Plan de Estudios</span>
                  {PROGRAM_MODULES.map((mod) => (
                    <button
                      key={mod.id}
                      onClick={() => setSelectedModule(mod.id)}
                      className={`w-full text-left p-3.5 border-2 font-black text-xs sm:text-sm transition flex justify-between items-center cursor-pointer rounded-none uppercase italic tracking-tight ${selectedModule === mod.id ? "bg-orange-500/10 border-orange-500 text-orange-400" : "bg-zinc-900 border-zinc-800 text-zinc-300 hover:bg-zinc-800"}`}
                    >
                      <span className="truncate pr-2">{mod.title.split(":")[1] || mod.title}</span>
                      <ChevronRight className="w-4 h-4 shrink-0 text-orange-500" />
                    </button>
                  ))}
                </div>

                {/* Right side: Lesson detail accordion/list */}
                {(() => {
                  const currentMod = PROGRAM_MODULES.find(m => m.id === selectedModule);
                  if (!currentMod) return null;
                  return (
                    <div className="lg:col-span-3 bg-zinc-900 border-2 border-zinc-800 rounded-none p-5 sm:p-6 space-y-6">
                      
                      {/* Module header card */}
                      <div className="p-4 bg-zinc-950 rounded-none border border-zinc-800">
                        <span className="text-[10px] font-mono text-orange-500 font-black uppercase tracking-widest block mb-1 italic">PROGRAMACIÓN INTEGRADA</span>
                        <h2 className="text-lg sm:text-xl font-black text-white uppercase italic leading-tight">{currentMod.title}</h2>
                        <span className="text-xs text-orange-350 block mt-0.5 font-bold uppercase tracking-tight">{currentMod.subtitle}</span>
                        <p className="text-zinc-400 text-xs sm:text-sm mt-3 leading-relaxed border-t border-zinc-800 pt-3 font-semibold">
                          {currentMod.description}
                        </p>
                      </div>

                      {/* Lessons schedule */}
                      <div>
                        <h3 className="text-xs font-mono text-zinc-500 uppercase font-black tracking-wider mb-4">Módulos de Implementación</h3>
                        <div className="space-y-4">
                          {currentMod.lessons.map((lesson, idx) => (
                            <div key={idx} className="p-4 bg-zinc-950 rounded-none border-2 border-zinc-800 space-y-3">
                              <div className="flex justify-between items-start gap-4">
                                <h4 className="font-extrabold text-sm text-zinc-150 uppercase italic leading-tight">{lesson.title}</h4>
                                <span className="text-[10px] bg-zinc-90 w bg-zinc-900 text-zinc-300 rounded-none font-mono px-2 py-0.5 shrink-0 flex items-center gap-1 font-bold">
                                  <Clock className="w-3 h-3 text-orange-500" />
                                  {lesson.duration}
                                </span>
                              </div>
                              <p className="text-xs text-zinc-400 leading-normal font-semibold">{lesson.summary}</p>
                              <div className="bg-zinc-900 border border-zinc-800 rounded-none p-2.5 flex items-center gap-2 text-[11px] font-bold text-emerald-400">
                                <Check className="w-4 h-4 shrink-0 text-emerald-500 stroke-[3]" />
                                <span><strong>Paso de acción inmediato:</strong> {lesson.action}</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                    </div>
                  );
                })()}

              </div>
            </motion.div>
          )}

          {/* TAB 3: MENUS & BONUSES */}
          {activeTab === "menus" && (
            <motion.div
              key="menus"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-6"
            >
              <div>
                <h1 className="text-3xl font-black text-white uppercase italic tracking-tight">Menú Destructor de Antojos</h1>
                <p className="text-zinc-405 text-xs sm:text-sm font-semibold text-zinc-400">Platos saciantes metabólicos para anular la ansiedad dulce por las noches.</p>
              </div>

              {/* Layout for meals category */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                
                {/* Desayunos */}
                <div className="bg-zinc-900 border-2 border-zinc-800 rounded-none p-5 space-y-4">
                  <div className="flex items-center gap-2 pb-3 border-b border-zinc-850">
                    <span className="text-orange-500 text-xs font-black font-mono tracking-widest uppercase italic">☀️ DESAYUNOS</span>
                  </div>
                  <div className="space-y-4">
                    {MOCK_MEALS.desayunos.map((meal, idx) => (
                      <div key={idx} className="bg-zinc-950 p-3 rounded-none border border-zinc-850 space-y-1.5">
                        <strong className="text-white text-xs block font-extrabold leading-tight uppercase font-mono tracking-tight">{meal.name}</strong>
                        <p className="text-zinc-400 text-[10px] leading-relaxed font-semibold">{meal.desc}</p>
                        <span className="inline-block text-[9px] font-mono bg-zinc-900 text-orange-500 px-1.5 py-0.5 rounded-none font-black border border-zinc-850 italic">~{meal.cals} KCAL</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Almuerzos */}
                <div className="bg-zinc-900 border-2 border-zinc-800 rounded-none p-5 space-y-4">
                  <div className="flex items-center gap-2 pb-3 border-b border-zinc-850">
                    <span className="text-orange-500 text-xs font-black font-mono tracking-widest uppercase italic">🌤️ ALMUERZOS</span>
                  </div>
                  <div className="space-y-4">
                    {MOCK_MEALS.almuerzos.map((meal, idx) => (
                      <div key={idx} className="bg-zinc-950 p-3 rounded-none border border-zinc-850 space-y-1.5">
                        <strong className="text-white text-xs block font-extrabold leading-tight uppercase font-mono tracking-tight">{meal.name}</strong>
                        <p className="text-zinc-400 text-[10px] leading-relaxed font-semibold">{meal.desc}</p>
                        <span className="inline-block text-[9px] font-mono bg-zinc-900 text-orange-500 px-1.5 py-0.5 rounded-none font-black border border-zinc-850 italic">~{meal.cals} KCAL</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Cenas */}
                <div className="bg-zinc-900 border-2 border-zinc-800 rounded-none p-5 space-y-4">
                  <div className="flex items-center gap-2 pb-3 border-b border-zinc-850">
                    <span className="text-orange-500 text-xs font-black font-mono tracking-widest uppercase italic">🌙 CENAS</span>
                  </div>
                  <div className="space-y-4">
                    {MOCK_MEALS.cenas.map((meal, idx) => (
                      <div key={idx} className="bg-zinc-950 p-3 rounded-none border border-zinc-850 space-y-1.5">
                        <strong className="text-white text-xs block font-extrabold leading-tight uppercase font-mono tracking-tight">{meal.name}</strong>
                        <p className="text-zinc-400 text-[10px] leading-relaxed font-semibold">{meal.desc}</p>
                        <span className="inline-block text-[9px] font-mono bg-zinc-900 text-orange-500 px-1.5 py-0.5 rounded-none font-black border border-zinc-850 italic">~{meal.cals} KCAL</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Antojos/Emergencia */}
                <div className="bg-zinc-900 border-2 border-zinc-800 rounded-none p-5 space-y-4">
                  <div className="flex items-center gap-2 pb-3 border-b border-zinc-850">
                    <span className="text-emerald-400 text-xs font-black font-mono tracking-widest uppercase italic">🚨 ACCESO DE ANTOJOS</span>
                  </div>
                  <div className="space-y-4">
                    {MOCK_MEALS.antojos.map((meal, idx) => (
                      <div key={idx} className="bg-zinc-950 p-3 rounded-none border border-zinc-850 space-y-1.5">
                        <strong className="text-white text-xs block font-extrabold leading-tight uppercase font-mono tracking-tight">{meal.name}</strong>
                        <p className="text-zinc-400 text-[10px] leading-relaxed font-semibold">{meal.desc}</p>
                        <span className="inline-block text-[9px] font-mono bg-emerald-950/10 text-emerald-400 px-1.5 py-0.5 rounded-none font-black border border-emerald-900/20 italic">~{meal.cals} KCAL</span>
                      </div>
                    ))}
                  </div>
                </div>

              </div>

              {/* Protocolo Anti-rebote cheat block */}
              <div className="bg-zinc-900 border-2 border-zinc-800 rounded-none p-6">
                <span className="text-[10px] font-mono text-orange-500 uppercase font-black tracking-wider">RECURSO DISPONIBLE</span>
                <h2 className="text-xl font-black text-white mt-1 mb-4 uppercase italic">Protocolo Anti-Rebote Mecánico</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm text-zinc-300">
                  <div className="space-y-1.5 p-4 bg-zinc-950 border border-zinc-800 rounded-none font-semibold">
                    <strong className="text-orange-500 block font-black text-xs uppercase font-mono">1. LA REGLA DEL 80/20</strong>
                    <p className="text-xs leading-normal">
                      Cuidar tu metabolismo un 80% del tiempo te da barra libre flexible el 20% restante para eventos familiares o comidas sociales sin culpa.
                    </p>
                  </div>
                  <div className="space-y-1.5 p-4 bg-zinc-950 border border-zinc-800 rounded-none font-semibold">
                    <strong className="text-orange-500 block font-black text-xs uppercase font-mono">2. MEMORIA DEL SET-POINT</strong>
                    <p className="text-xs leading-normal">
                      El hipotálamo necesita tiempo. Sostener el peso ideal por 30 días bloquea el rebote biológico y le dice a tu cuerpo cuál es el nuevo peso normal.
                    </p>
                  </div>
                  <div className="space-y-1.5 p-4 bg-zinc-950 border border-zinc-800 rounded-none font-semibold">
                    <strong className="text-orange-500 block font-black text-xs uppercase font-mono">3. COMPENSACIÓN DE AGUA</strong>
                    <p className="text-xs leading-normal">
                      Si ganas 1kg tras un fin de semana social, no es grasa biológica real; es inflamación osmótica. Ejecuta un ayuno de 16h y bebe caldo de sal.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* TAB 4: ANTI-REBOUND VIP ZONE (Telegram simulations, missions, rankings, counts) */}
          {activeTab === "vip" && (
            <motion.div
              key="vip"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-6"
            >
              <div>
                <h1 className="text-3xl font-black text-white uppercase italic tracking-tight">Ecosistema VIP Club</h1>
                <p className="text-zinc-405 text-xs sm:text-sm font-semibold text-zinc-400">Comunidad cerrada de apoyo recíproco. La clave de la consistencia.</p>
              </div>

              {/* Grid: community simulation vs missions/ranking */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                
                {/* Left block and center: Telegram Forums simulated dialog */}
                <div className="lg:col-span-2 space-y-6">
                  
                  {/* VIP Community Live Feed (Telegram style) */}
                  <div className="bg-zinc-900 border-2 border-zinc-800 rounded-none p-5 sm:p-6 space-y-4">
                    <div className="flex justify-between items-center pb-4 border-b border-zinc-800">
                      <div>
                        <h2 className="font-extrabold text-white uppercase italic flex items-center gap-2">
                          <Users className="w-5 h-5 text-orange-500" />
                          <span>Tribu Interna VIP Cuerpo Nuevo</span>
                        </h2>
                        <span className="text-[10px] text-zinc-450 block font-bold">Interactúa y comparte tus misiones y retos para empalmar victorias.</span>
                      </div>
                      <span className="text-[10px] tracking-wider uppercase font-mono bg-orange-500/10 text-orange-500 border border-orange-500/20 p-1.5 rounded-none font-black">
                        🟢 147 ALUMNOS ONLINE
                      </span>
                    </div>

                    {/* Messages Thread Container */}
                    <div className="space-y-4 max-h-[360px] overflow-y-auto pr-1">
                      {communityPosts.map((post) => (
                        <div key={post.id} className="p-4 bg-zinc-950 rounded-none border border-zinc-850 space-y-2">
                          <div className="flex justify-between items-center">
                            <div className="flex items-center gap-2">
                              <div className="bg-orange-500 text-zinc-950 font-black text-[11px] w-6 h-6 rounded-none flex items-center justify-center italic">
                                {post.userName.charAt(0).toUpperCase()}
                              </div>
                              <span className="text-xs font-black text-white uppercase italic">{post.userName}</span>
                            </div>
                            <span className="text-[10px] text-zinc-550 font-mono font-bold uppercase">{post.timeAgo}</span>
                          </div>

                          <p className="text-xs sm:text-sm text-zinc-300 leading-normal font-semibold">
                            {post.content}
                          </p>

                          {/* Action panel inside message */}
                          <div className="flex items-center gap-4 pt-1 text-[11px] font-mono text-zinc-500 font-bold">
                            <button
                              onClick={() => handleLikePost(post.id)}
                              className={`flex items-center gap-1 hover:text-orange-500 transition cursor-pointer ${post.isLikedByUser ? "text-orange-500 font-bold" : ""}`}
                            >
                              <span>❤️ {post.likes}</span>
                            </button>
                            <span className="uppercase">💬 {post.commentsCount} COMENTARIOS</span>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Quick input simulation form */}
                    <form onSubmit={handleAddPost} className="flex gap-2.5 pt-3 border-t border-zinc-800">
                      <input 
                        type="text"
                        required
                        placeholder="Escribe algo en la tribu cerrada (ej. ¡He completado el reto de hoy!)"
                        value={newPostText}
                        onChange={(e) => setNewPostText(e.target.value)}
                        className="bg-zinc-950 border border-zinc-800 focus:border-orange-500 rounded-none px-3 py-2 text-xs sm:text-sm text-white placeholder:text-zinc-650 outline-none w-full"
                      />
                      <button
                        type="submit"
                        className="bg-orange-500 hover:bg-orange-400 px-4 py-2 rounded-none text-xs font-black text-zinc-950 transition flex items-center gap-1.5 cursor-pointer shrink-0 uppercase italic tracking-tighter"
                      >
                        <SendHorizontal className="w-4 h-4 text-zinc-950" />
                        Publicar
                      </button>
                    </form>

                  </div>

                  {/* Ask to VIP live Coaches consultation session */}
                  <div className="bg-zinc-900 border-2 border-zinc-800 rounded-none p-5 sm:p-6 space-y-4">
                    <h2 className="font-extrabold text-base text-white uppercase italic">Consultoría Directa Grupal</h2>
                    <p className="text-xs text-zinc-400 leading-relaxed font-semibold">
                      Compara dudas, estancamientos o consultas nutricionales directamente con nuestro Head Coach deportivo.
                    </p>

                    <div className="bg-zinc-950 p-4 border border-zinc-850 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 rounded-none">
                      <div>
                        <span className="text-[10px] uppercase font-mono text-orange-500 font-black block leading-none italic">SOPORTE EN VIVO</span>
                        <span className="text-white font-extrabold text-sm block mt-1 uppercase">Sábado 27 de Junio, 18:00 (ESPAÑA)</span>
                        <span className="text-xs text-zinc-405 block mt-0.5 text-orange-400/85 font-semibold">Dispondrás de grabación en audio y acceso posterior.</span>
                      </div>
                      
                      <div className="text-xs text-zinc-300 font-mono bg-zinc-900 px-3 py-2 border border-zinc-800 rounded-none font-bold">
                        ⏳ FALTAN: <strong>13 DÍAS</strong>
                      </div>
                    </div>

                    {consultSubmitted ? (
                      <div className="bg-emerald-950/20 text-emerald-400 border border-emerald-900/40 rounded-none p-4 text-xs font-semibold text-center uppercase tracking-tight">
                        ✓ Tu pregunta se ha enviado al panel del Head-Coach. ¡Se resolverá al arrancar la sesión!
                      </div>
                    ) : (
                      <div className="space-y-3">
                        <textarea
                          placeholder="Envía tu consulta técnica de antemano para la llamada (ej. ¿Puedo saltarme el ayuno de 13h si entreno muy temprano?)"
                          rows={2}
                          value={consultQuestion}
                          onChange={(e) => setConsultQuestion(e.target.value)}
                          className="w-full bg-zinc-950 border border-zinc-800 text-xs sm:text-sm text-zinc-300 p-3 rounded-none focus:border-orange-500 outline-none placeholder:text-zinc-600"
                        />
                        <button
                          onClick={() => {
                            if (!consultQuestion.trim()) return;
                            setConsultSubmitted(true);
                          }}
                          className="bg-zinc-950 text-zinc-300 border border-zinc-850 hover:bg-zinc-900 font-black px-4 py-2.5 rounded-none text-xs cursor-pointer transition uppercase italic tracking-tight"
                        >
                          Enviar al Consultorio del Coach
                        </button>
                      </div>
                    )}
                  </div>

                </div>

                {/* Right block: Monthly Missions tracker & Highscore rankings */}
                <div className="space-y-6">
                  
                  {/* Current Mision tracker */}
                  <div className="bg-zinc-900 border-2 border-zinc-800 rounded-none p-5 sm:p-6 space-y-4">
                    <span className="text-[10px] font-mono text-orange-500 font-black uppercase tracking-wider block italic">MISIÓN INTERNA</span>
                    <h2 className="font-extrabold text-base text-white uppercase italic leading-tight">Misión 1: Liquidar volumen de cintura</h2>
                    
                    <p className="text-xs text-zinc-400 leading-normal font-semibold">
                      Mide tu contorno abdominal a nivel del ombligo semanalmente. Cada centímetro fuera recluta +100 puntos extra.
                    </p>

                    <div className="bg-zinc-950 p-3 border border-zinc-850 rounded-none flex justify-between items-center">
                      <div>
                        <span className="text-[8px] font-mono text-zinc-500 uppercase leading-none block font-black">CINTURA ACTUAL</span>
                        <span className="text-white font-extrabold text-sm block mt-1 font-mono">{userWaist} cm</span>
                      </div>
                      <div>
                        <span className="text-[8px] font-mono text-zinc-500 uppercase leading-none block font-black">CINTURA BASE</span>
                        <span className="text-orange-500 font-extrabold text-sm block mt-1 font-mono">92.0 cm</span>
                      </div>
                    </div>

                    <form onSubmit={handleAddWaist} className="flex gap-2">
                      <input 
                        type="number" 
                        step="0.1"
                        required
                        placeholder="cm de cintura"
                        value={newWaistInput}
                        onChange={(e) => setNewWaistInput(e.target.value)}
                        className="bg-zinc-950 border border-zinc-800 focus:border-orange-500 rounded-none px-3 py-2 text-xs text-white placeholder:text-zinc-650 outline-none w-full"
                      />
                      <button
                        type="submit"
                        className="bg-orange-500 hover:bg-orange-400 font-black px-3 py-2 rounded-none text-xs transition cursor-pointer text-zinc-950 shrink-0 uppercase italic tracking-tighter"
                      >
                        Log Medida
                      </button>
                    </form>
                  </div>

                  {/* Leaderboards */}
                  <div className="bg-zinc-900 border-2 border-zinc-800 rounded-none p-5 sm:p-6 space-y-4">
                    <div className="flex justify-between items-center pb-2 border-b border-zinc-800">
                      <h2 className="font-extrabold text-sm text-white flex items-center gap-1.5 uppercase italic">
                        <Trophy className="w-4 h-4 text-orange-500" />
                        <span>Tabla de Honor Club VIP</span>
                      </h2>
                    </div>

                    <div className="space-y-2">
                      {rankingList.map((rank) => (
                        <div 
                          key={rank.id} 
                          className={`p-2.5 rounded-none border text-xs flex justify-between items-center ${rank.isUser ? "bg-orange-500/10 border-orange-500/40 text-orange-200" : "bg-zinc-950 border-zinc-850 text-zinc-350"}`}
                        >
                          <div className="flex items-center gap-2">
                            <span className="font-mono font-bold text-zinc-400 w-4 block text-center">
                              {rank.rank === 1 ? "🥇" : rank.rank === 2 ? "🥈" : rank.rank === 3 ? "🥉" : `${rank.rank}.`}
                            </span>
                            <span className="font-black text-white uppercase text-[11px] italic">{rank.name}</span>
                          </div>

                          <div className="text-right">
                            <span className="text-[10px] text-zinc-200 font-black block">-{rank.weightLost}kg · -{rank.waistLost}cm</span>
                            <span className="text-[9px] text-zinc-500 block font-mono font-bold">{rank.points} PUNTOS</span>
                          </div>
                        </div>
                      ))}
                    </div>

                    <span className="text-[10px] text-zinc-500 font-mono text-center block leading-relaxed mt-2 p-1.5 bg-zinc-950 rounded-none border border-zinc-850">
                      💡 Completa tus misiones mecánicas diarias e introduce mediciones de cintura o peso para progresar al oro del Reto de 90 Días.
                    </span>
                  </div>

                </div>

              </div>
            </motion.div>
          )}

        </AnimatePresence>

      </main>

    </div>
  );
}
