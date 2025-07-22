import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import HomeImg from '../assets/home page.png';
import { useTranslation } from 'react-i18next';

// === Counter Card Component ===
const CounterCard = ({ label, count }) => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    let start = 0;
    const duration = 1500;
    const increment = Math.ceil(count / (duration / 30));
    const timer = setInterval(() => {
      start += increment;
      if (start >= count) {
        start = count;
        clearInterval(timer);
      }
      setCurrent(start);
    }, 30);

    return () => clearInterval(timer);
  }, [count]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="rounded-xl p-6 text-center shadow-lg transition duration-300 transform hover:scale-105 
                 bg-white dark:bg-gray-800 hover:bg-gradient-to-r from-[#004d40] to-[#00796b] dark:hover:bg-orange-400 
                 hover:text-white dark:hover:text-gray-900"
    >
      <h2 className="text-4xl font-bold text-yellow-500 dark:text-orange-400">
        {current}+
      </h2>
      <p className="mt-2 text-lg font-semibold text-gray-700 dark:text-gray-200">
        {label}
      </p>
    </motion.div>
  );
};

export default function Home() {
  const { t } = useTranslation();

  const counters = [
    { label: t('home_counters.schools'), count: 67 },
    { label: t('home_counters.trainers'), count: 1200 },
    { label: t('home_counters.students'), count: 2000 },
  ];

  return (
    <section id="home" className="bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-white">
      {/* === Banner Image === */}
      <div className="w-full overflow-hidden">
        <motion.div
          initial={{ opacity: 0, scale: 1 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="overflow-hidden w-full"
        >
          <img
            src={HomeImg}
            alt="Driving Banner"
            className="w-full h-auto object-cover transition-transform duration-700 ease-in-out transform hover:scale-105"
          />
        </motion.div>
      </div>

      {/* === Welcome Section === */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center py-12 px-4 md:px-10"
      >
        <h1 className="text-3xl md:text-5xl font-bold text-teal-900 dark:text-yellow-500 mb-4 animate-fadeUp">
          {t('home_heading')}
        </h1>
        <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 max-w-3xl mx-auto animate-fadeUp">
          {t('home_subheading')}
        </p>
      </motion.div>

      {/* === Counters === */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 px-6 md:px-16 mb-12">
        {counters.map((item, idx) => (
          <CounterCard key={idx} label={item.label} count={item.count} />
        ))}
      </div>

      {/* === Quote Section === */}
      <div className="flex justify-center px-6 mb-16">
        <div className="relative text-xl md:text-2xl font-semibold italic max-w-4xl text-center 
                        bg-teal-700 text-yellow-400 px-6 py-8 rounded-2xl shadow-xl quote-glow overflow-hidden">
          <span className="text-4xl text-cyan-100">“</span>
          <span className="inline-block leading-relaxed font-bold">
            {t('home_quote')}
          </span>
          <span className="text-4xl text-cyan-100">”</span>
        </div>
      </div>
    </section>
  );
}
