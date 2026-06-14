/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import LandingPage from "./components/LandingPage";
import OnboardingCheckout from "./components/OnboardingCheckout";
import StudentDashboard from "./components/StudentDashboard";
import { SelectedPlan, UserProfile } from "./types";

type ViewState = "landing" | "checkout" | "dashboard";

export default function App() {
  const [view, setView] = useState<ViewState>("landing");
  const [selectedPlan, setSelectedPlan] = useState<SelectedPlan>("standard");
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);

  // Check storage on load
  useEffect(() => {
    const savedProfile = localStorage.getItem("cuerpo_nuevo_profile");
    const savedPlan = localStorage.getItem("cuerpo_nuevo_plan");
    const savedView = localStorage.getItem("cuerpo_nuevo_view");

    if (savedProfile && savedPlan) {
      setUserProfile(JSON.parse(savedProfile));
      setSelectedPlan(savedPlan as SelectedPlan);
      if (savedView === "dashboard") {
        setView("dashboard");
      }
    }
  }, []);

  const handleSelectPlan = (plan: SelectedPlan) => {
    setSelectedPlan(plan);
    setView("checkout");
    localStorage.setItem("cuerpo_nuevo_plan", plan);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handlePaymentSuccess = (profile: UserProfile, plan: SelectedPlan) => {
    setUserProfile(profile);
    setSelectedPlan(plan);
    setView("dashboard");
    localStorage.setItem("cuerpo_nuevo_profile", JSON.stringify(profile));
    localStorage.setItem("cuerpo_nuevo_plan", plan);
    localStorage.setItem("cuerpo_nuevo_view", "dashboard");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDirectDemoAccess = () => {
    // Inject a beautiful mock client profile for immediate review
    const reviewerProfile: UserProfile = {
      name: "Invitado de AI Studio",
      age: 32,
      height: 175,
      initialWeight: 89.4,
      targetWeight: 75.0,
      blocker: "Ataques de ansiedad por la comida"
    };
    handlePaymentSuccess(reviewerProfile, "vip_monthly");
  };

  const handleLogout = () => {
    // Clear state but maintain local inputs for next login attempt
    localStorage.removeItem("cuerpo_nuevo_view");
    setView("landing");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 selection:bg-rose-500 selection:text-white font-sans antialiased">
      {view === "landing" && (
        <LandingPage 
          onSelectPlan={handleSelectPlan} 
          onEnterStudentMode={handleDirectDemoAccess} 
        />
      )}

      {view === "checkout" && (
        <OnboardingCheckout 
          selectedPlan={selectedPlan} 
          onPaymentSuccess={handlePaymentSuccess} 
          onCancel={handleLogout} 
        />
      )}

      {view === "dashboard" && userProfile && (
        <StudentDashboard 
          userProfile={userProfile} 
          selectedPlan={selectedPlan} 
          onLogout={handleLogout} 
        />
      )}
    </div>
  );
}
