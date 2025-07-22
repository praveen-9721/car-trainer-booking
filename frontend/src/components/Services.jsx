import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import learnerImg from '../assets/learner.png';
import trainerImg from '../assets/trainer.png';
import LearnerRegistration from './LearnerForm';
import TrainerRegistration from './TrainerForm';

const Services = () => {
  const { t } = useTranslation();
  const [showLearnerForm, setShowLearnerForm] = useState(false);
  const [showTrainerForm, setShowTrainerForm] = useState(false);

  const handleCloseLearner = () => setShowLearnerForm(false);
  const handleCloseTrainer = () => setShowTrainerForm(false);

  if (showLearnerForm) return <LearnerRegistration onClose={handleCloseLearner} />;
  if (showTrainerForm) return <TrainerRegistration onClose={handleCloseTrainer} />;

  return (
    <div
      id="services"
      className="relative overflow-x-hidden bg-emerald-100 dark:bg-gray-900 text-gray-800 dark:text-gray-100 px-4 sm:px-8 py-10 font-sans"
    >
      {/* Header */}
      <div className="flex justify-between items-center mb-10 relative">
        <h1 className="text-4xl sm:text-5xl font-bold text-center w-full">{t('Services')}</h1>
      </div>

      {/* Learner Section */}
      <div className="flex flex-col md:flex-row gap-10 items-center mb-20">
        <motion.div
          className="w-full md:w-1/2 relative"
          initial={{ x: -100, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <div className="relative group w-full max-w-full">
            <img
              src={learnerImg}
              alt="Learner"
              className="w-full h-auto object-cover rounded-xl shadow-lg transition-transform duration-700 ease-in-out hover:scale-105"
            />
            <div className="absolute -top-3 -left-3 w-full h-full border-4 border-teal-500 rotate-3 rounded-xl z-[-1]" />
          </div>
        </motion.div>

        <motion.div
          className="w-full md:w-1/2"
          initial={{ x: 100, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <h2 className="text-2xl sm:text-3xl font-bold text-teal-800 dark:text-teal-300 mb-4">
            {t('services.learnerTitle')}
          </h2>
          <p className="text-base sm:text-lg text-justify font-medium text-gray-700 dark:text-gray-300 mb-5">
            {t('services.learnerDescription')}
          </p>
          <button
            onClick={() => setShowLearnerForm(true)}
            className="bg-gradient-to-r from-teal-800 to-teal-600 hover:from-teal-600 hover:to-teal-800 text-white py-2 px-6 rounded-full transition-all"
          >
            {t('services.registerLearner')}
          </button>
        </motion.div>
      </div>

      {/* Trainer Section */}
      <div className="flex flex-col md:flex-row-reverse gap-10 items-center mb-20">
        <motion.div
          className="w-full md:w-1/2 relative"
          initial={{ x: 100, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <div className="relative group w-full max-w-full">
            <img
              src={trainerImg}
              alt="Trainer"
              className="w-full h-auto object-cover rounded-xl shadow-lg transition-transform duration-700 ease-in-out hover:scale-105"
            />
            <div className="absolute -top-3 -right-3 w-full h-full border-4 border-teal-500 -rotate-3 rounded-xl z-[-1]" />
          </div>
        </motion.div>

        <motion.div
          className="w-full md:w-1/2"
          initial={{ x: -100, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <h2 className="text-2xl sm:text-3xl font-bold text-teal-800 dark:text-teal-300 mb-4">
            {t('services.trainerTitle')}
          </h2>
          <p className="text-base sm:text-lg text-justify font-medium text-gray-700 dark:text-gray-300 mb-5">
            {t('services.trainerDescription')}
          </p>
          <button
            onClick={() => setShowTrainerForm(true)}
            className="bg-gradient-to-r from-teal-800 to-teal-600 hover:from-teal-600 hover:to-teal-800 text-white py-2 px-6 rounded-full transition-all"
          >
            {t('services.registerTrainer')}
          </button>
        </motion.div>
      </div>

      {/* Key Features */}
      <h2 className="text-3xl text-center font-bold text-teal-800 dark:text-teal-300 mb-10">
        {t('services.keyFeatures')}
      </h2>
      <div className="flex flex-wrap justify-center gap-8">
        {/* Feature 1 */}
        <motion.div
          className="bg-white dark:bg-gray-800 rounded-xl p-6 w-[280px] text-center shadow-lg hover:-translate-y-2 transition-all duration-300 hover:bg-teal-800 dark:hover:bg-teal-800"
          whileHover={{ scale: 1.05 }}
        >
          <div className="text-6xl mb-3">📅</div>
          <h3 className="text-xl text-yellow-400 font-semibold mb-2">
            {t('services.feature1Title')}
          </h3>
          <p className="text-teal-500 dark:text-gray-300 font-medium">
            {t('services.feature1Desc')}
          </p>
        </motion.div>

        {/* Feature 2 */}
        <motion.div
          className="bg-white dark:bg-gray-800 rounded-xl p-6 w-[280px] text-center shadow-lg hover:-translate-y-2 transition-all duration-300 hover:bg-teal-800 dark:hover:bg-teal-800"
          whileHover={{ scale: 1.05 }}
        >
          <div className="text-6xl mb-3">🛡️</div>
          <h3 className="text-xl text-yellow-400 font-semibold mb-2">
            {t('services.feature2Title')}
          </h3>
          <p className="text-teal-500 dark:text-gray-300 font-medium">
            {t('services.feature2Desc')}
          </p>
        </motion.div>

        {/* Feature 3 */}
        <motion.div
          className="bg-white dark:bg-gray-800 rounded-xl p-6 w-[280px] text-center shadow-lg hover:-translate-y-2 transition-all duration-300 hover:bg-teal-800 dark:hover:bg-teal-800"
          whileHover={{ scale: 1.05 }}
        >
          <div className="text-6xl mb-3">👨‍🏫</div>
          <h3 className="text-xl text-yellow-400 font-semibold mb-2">
            {t('services.feature3Title')}
          </h3>
          <p className="text-teal-500 dark:text-gray-300 font-medium">
            {t('services.feature3Desc')}
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Services;
