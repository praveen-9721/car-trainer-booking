import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import LearnerRegistration from './LearnerForm';

const planData = [
  {
    planId: 'Very BASIC',
    titleKey: 'plans.veryBasicTitle',
    daysPerWeek: 2,
    totalWeeks: 4,
    priceSAR: 20,
    vehicleTypeKey: 'plans.automatic',
  },
  {
    planId: 'BASIC',
    titleKey: 'plans.basicTitle',
    daysPerWeek: 3,
    totalWeeks: 4,
    priceSAR: 20,
    vehicleTypeKey: 'plans.automatic',
  },
  {
    planId: 'STANDARD I',
    titleKey: 'plans.standardTitle',
    daysPerWeek: 4,
    totalWeeks: 4,
    priceSAR: 20,
    vehicleTypeKey: 'plans.manualOrAutomatic',
  },
  {
    planId: 'STANDARD II',
    titleKey: 'plans.standardTitle',
    daysPerWeek: 5,
    totalWeeks: 4,
    priceSAR: 20,
    vehicleTypeKey: 'plans.manualAndAutomatic',
  },
  {
    planId: 'INTENSIVE',
    titleKey: 'plans.intensiveTitle',
    daysPerWeek: 6,
    totalWeeks: 4,
    priceSAR: 20,
    vehicleTypeKey: 'plans.manualAndAutomatic',
  },
];

const Plans = () => {
  const { t } = useTranslation();
  const [showLearnerForm, setShowLearnerForm] = useState(false);
  const handleCloseLearner = () => setShowLearnerForm(false);

  if (showLearnerForm) return <LearnerRegistration onClose={handleCloseLearner} />;

  return (
    <div
      id="plans"
      className="px-4 py-10 bg-gradient-to-r from-cyan-100 to-lime-100 dark:from-zinc-900 dark:to-gray-800 min-h-screen text-center"
    >
      <h1 className="text-3xl md:text-4xl font-bold text-teal-900 dark:text-white mb-4">
        {t('plans.title')}
      </h1>
      <h2 className="text-xl md:text-2xl font-semibold text-emerald-900 dark:text-lime-400 mb-2">
        {t('plans.subtitle')}
      </h2>
      <p className="text-base md:text-lg text-gray-800 dark:text-gray-300 max-w-xl mx-auto mb-10">
        {t('plans.description')}
      </p>

      <div className="flex flex-wrap justify-center gap-6">
        {planData.map((plan, index) => (
          <div
            key={index}
            className="bg-white dark:bg-zinc-900 rounded-2xl p-6 w-full sm:w-80 shadow-lg transform transition duration-300 hover:-translate-y-2 hover:scale-105 dark:shadow-zinc-700 animate-fade-in hover:bg-emerald-300 dark:hover:bg-teal-950"
            style={{ animationDelay: `${index * 0.2}s` }}
          >
            <h3 className="text-lg font-bold text-teal-800 dark:text-yellow-400 mb-2">
              {plan.planId}
            </h3>
            <p className="text-green-800 font-semibold dark:text-green-300 mb-2">
              💰 {t('plans.price')}: SAR {plan.priceSAR}
            </p>
            <ul className="text-left text-gray-700 dark:text-gray-300 text-sm font-semibold mb-4 space-y-1">
              <li>📘 {t('plans.titleLabel')}: {t(plan.titleKey)}</li>
              <li>📅 {t('plans.daysPerWeek')}: {plan.daysPerWeek}</li>
              <li>🗓️ {t('plans.totalWeeks')}: {plan.totalWeeks}</li>
              <li>🚗 {t('plans.vehicleType')}: {t(plan.vehicleTypeKey)}</li>
            </ul>
            <button
              onClick={() => setShowLearnerForm(true)}
              className="bg-emerald-900 dark:bg-emerald-700 text-white px-5 py-2 rounded-full hover:bg-orange-500 dark:hover:bg-emerald-600 transition"
            >
              {t('plans.buyButton')}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Plans;
