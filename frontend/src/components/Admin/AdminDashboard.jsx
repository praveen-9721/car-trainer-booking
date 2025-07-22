import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import LearnerRequests from './Dashboard/LearnerRequests';
import ApprovedRequests from './Dashboard/ApprovedRequests';
import TrainerList from './Dashboard/TrainerList';
import BookingHistory from './Dashboard/BookingHistory';
import PaymentHistory from './Dashboard/PaymentHistory';
import StatsOverview from './Dashboard/StatsOverview';
import { Menu, X } from 'lucide-react';

export default function AdminDashboard({ onLogout }) {
  const { t } = useTranslation();
  const [section, setSection] = useState('overview');
  const [menuOpen, setMenuOpen] = useState(false);

  const handleSectionClick = (selectedSection) => {
    setSection(selectedSection);
    setMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-white flex flex-col md:flex-row">
      {/* Mobile Header */}
      <div className="md:hidden p-4 flex justify-between items-center bg-gray-800 text-white shadow-md">
        <h2 className="text-xl font-bold">{t('adminDashboard.title')}</h2>
        <button onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Sidebar */}
      <aside
        className={`md:w-64 bg-teal-200 dark:bg-gray-800 shadow-md p-6 space-y-4 md:block ${
          menuOpen ? 'block' : 'hidden'
        }`}
      >
        <div className="hidden md:block text-2xl font-bold text-yellow-400 mb-6">
          {t('adminDashboard.title')}
        </div>

        <nav className="space-y-2">
          <button onClick={() => handleSectionClick('overview')} className="block w-full text-left hover:text-blue-500">
            📊 {t('adminDashboard.overview')}
          </button>
          <button onClick={() => handleSectionClick('learners')} className="block w-full text-left hover:text-blue-500">
            👨‍🎓 {t('adminDashboard.learnerRequests')}
          </button>
          <button onClick={() => handleSectionClick('approved')} className="block w-full text-left hover:text-blue-500">
            ✅ {t('adminDashboard.approvedRequests')}
          </button>
          <button onClick={() => handleSectionClick('trainers')} className="block w-full text-left hover:text-blue-500">
            🚗 {t('adminDashboard.trainers')}
          </button>
          <button onClick={() => handleSectionClick('bookings')} className="block w-full text-left hover:text-blue-500">
            📘 {t('adminDashboard.bookingHistory')}
          </button>
          <button onClick={() => handleSectionClick('payments')} className="block w-full text-left hover:text-blue-500">
            💳 {t('adminDashboard.paymentHistory')}
          </button>
        </nav>

        <button
          onClick={onLogout}
          className="mt-8 w-full bg-red-600 text-white py-2 rounded hover:bg-red-700 transition"
        >
          {t('adminDashboard.logout')}
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 overflow-y-auto">
        {section === 'overview' && <StatsOverview />}
        {section === 'learners' && <LearnerRequests />}
        {section === 'approved' && <ApprovedRequests />}
        {section === 'trainers' && <TrainerList />}
        {section === 'bookings' && <BookingHistory />}
        {section === 'payments' && <PaymentHistory />}
      </main>
    </div>
  );
}
