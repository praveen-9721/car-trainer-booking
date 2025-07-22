import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import LearnerForm from './LearnerForm';
import TrainerForm from './TrainerForm';
import DarkModeToggle from './DarkModeToggle';
import logoImg from '../assets/logo.png';

export default function Navbar() {
  const [popupOpen, setPopupOpen] = useState(false);
  const [showLearnerForm, setShowLearnerForm] = useState(false);
  const [showTrainerForm, setShowTrainerForm] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { t, i18n } = useTranslation();

  useEffect(() => {
    document.documentElement.dir = i18n.language === 'ar' ? 'rtl' : 'ltr';
  }, [i18n.language]);

  const toggleLanguage = () => {
    const newLang = i18n.language === 'en' ? 'ar' : 'en';
    i18n.changeLanguage(newLang);
    document.documentElement.dir = newLang === 'ar' ? 'rtl' : 'ltr';
  };

  const handleCloseAll = () => {
    setShowLearnerForm(false);
    setShowTrainerForm(false);
    setPopupOpen(false);
    setMenuOpen(false);
  };

  return (
    <>
      <nav className="sticky top-0 z-50 bg-teal-900 dark:bg-gray-900 shadow-md">
        <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img
              src={logoImg}
              alt="Logo"
              className="w-[50px] h-[50px] sm:w-20 sm:h-20 animate-spin-slow"
            />
            <h1 className="text-xl sm:text-3xl font-bold text-yellow-400 animate-glow flex gap-1">
              <span>{t('navbar_section.learn')}</span>
              <span>{t('navbar_section.to')}</span>
              <span>{t('navbar_section.drive')}</span>
            </h1>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-4">
            {['home', 'services', 'plans', 'about', 'contact'].map((key) => (
              <a
                key={key}
                href={`#${key}`}
                className="relative text-white font-semibold hover:text-yellow-400 after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-0 hover:after:w-full after:bg-yellow-400 after:transition-all after:duration-300"
              >
                {t(`navbar_section.${key}`)}
              </a>
            ))}
            <button
              onClick={() => setPopupOpen(true)}
              className="bg-orange-500 text-white font-bold px-4 py-2 rounded hover:bg-orange-600 shadow-md"
            >
              {t('navbar_section.register')}
            </button>
            <DarkModeToggle />
            <button
              onClick={toggleLanguage}
              className="bg-white text-black px-2 py-1 rounded ml-2 text-sm font-medium"
            >
              {t('navbar_section.toggle_language')}
            </button>
          </div>

          {/* Mobile Menu Icons */}
          <div className="md:hidden flex items-center gap-2">
            <button
              onClick={() => setPopupOpen(true)}
              className="bg-orange-500 text-white px-3 py-1.5 rounded text-sm shadow-md hover:bg-orange-600"
            >
              {t('navbar_section.register')}
            </button>
            <DarkModeToggle />
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="text-white focus:outline-none"
            >
              {menuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Links */}
        {menuOpen && (
          <div className="md:hidden bg-white dark:bg-gray-800 px-4 py-4 space-y-3">
            {['home', 'services', 'plans', 'about', 'contact'].map((key) => (
              <a
                key={key}
                href={`#${key}`}
                onClick={() => setMenuOpen(false)}
                className="block text-gray-900 dark:text-white font-medium hover:text-yellow-400"
              >
                {t(`navbar_section.${key}`)}
              </a>
            ))}
            <button
              onClick={toggleLanguage}
              className="w-full bg-white text-black px-3 py-1.5 rounded text-sm font-medium"
            >
              {t('navbar_section.toggle_language')}
            </button>
          </div>
        )}
      </nav>

      {/* Register Popup */}
      {popupOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg w-full max-w-4xl relative">
            <button
              onClick={() => setPopupOpen(false)}
              className="absolute top-4 right-4 text-gray-500 dark:text-gray-300 hover:text-black"
            >
              <X size={24} />
            </button>
            <div className="flex flex-col md:flex-row items-center justify-center py-8 px-6 md:px-10 gap-6">
              <div className="bg-gradient-to-b from-white to-blue-50 dark:from-gray-700 dark:to-gray-800 rounded-xl shadow-md w-full md:w-1/2 p-6 text-center">
                <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
                  {t('navbar_section.learner')}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-6">
                  {t('navbar_section.learner_desc')}
                </p>
                <button
                  onClick={() => {
                    setShowLearnerForm(true);
                    setPopupOpen(false);
                  }}
                  className="bg-teal-700 text-white px-4 py-2 rounded shadow hover:bg-teal-800"
                >
                  {t('navbar_section.register_as_learner')}
                </button>
              </div>
              <div className="text-gray-700 dark:text-gray-200 font-bold hidden md:block">OR</div>
              <div className="bg-gradient-to-b from-white to-blue-50 dark:from-gray-700 dark:to-gray-800 rounded-xl shadow-md w-full md:w-1/2 p-6 text-center">
                <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
                  {t('navbar_section.trainer')}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-6">
                  {t('navbar_section.trainer_desc')}
                </p>
                <button
                  onClick={() => {
                    setShowTrainerForm(true);
                    setPopupOpen(false);
                  }}
                  className="bg-teal-700 text-white px-4 py-2 rounded shadow hover:bg-teal-800"
                >
                  {t('navbar_section.register_as_trainer')}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {showLearnerForm && <LearnerForm onClose={handleCloseAll} />}
      {showTrainerForm && <TrainerForm onClose={handleCloseAll} />}
    </>
  );
}
