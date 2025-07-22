import './i18n/i18n';
import React, { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import Home from './components/Home';
import FeatureSection from './components/FeatureSection';
import PlanSection from './components/Plans';
import TrainerSection from './components/TrainerSection';
import MiniFeatureSections from './components/MiniFeatureSections';
import TestimonialsSection from './components/TestimonialsSection';
import Footer from './components/Footer';
import AdminLogin from './components/Admin/AdminLogin';
import AdminDashboard from './components/Admin/AdminDashboard';
import Services from './components/Services';
import AboutUs from './components/AboutUs';
import { Contact } from 'lucide-react';
import ContactUs from './components/ContactUs';

export default function App() {
  const [showAdminLogin, setShowAdminLogin] = useState(false);
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem('isAdminLoggedIn');
    if (stored === 'true') setIsAdminLoggedIn(true);
  }, []);

  const handleLoginSuccess = () => {
    setIsAdminLoggedIn(true);
    setShowAdminLogin(false);
    localStorage.setItem('isAdminLoggedIn', 'true');
  };

  const handleLogout = () => {
    setIsAdminLoggedIn(false);
    localStorage.removeItem('isAdminLoggedIn');
  };

  if (isAdminLoggedIn) return <AdminDashboard onLogout={handleLogout} />;

  return (
    <div className="bg-white dark:bg-gray-900 min-h-screen relative">
      <Navbar />
      <Home />
      <Services />
      {/* <FeatureSection /> */}
      <PlanSection />
      <AboutUs />
      <ContactUs />
      {/* <TrainerSection /> */}
      {/* <MiniFeatureSections /> */}
      {/* <TestimonialsSection /> */}
      <Footer setShowAdminLogin={setShowAdminLogin} />

      {showAdminLogin && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <AdminLogin
            onClose={() => setShowAdminLogin(false)}
            onLoginSuccess={handleLoginSuccess}
          />
        </div>
      )}
    </div>
  );
}
