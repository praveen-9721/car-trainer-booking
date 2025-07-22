import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import feedbackData from '../assets/feedback.json';

const ContactUs = () => {
  const { t } = useTranslation();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [bgColor, setBgColor] = useState('');

  const getRandomLightColor = () => {
    const hue = Math.floor(Math.random() * 360);
    return `hsl(${hue}, 100%, 85%)`;
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === feedbackData.feedbacks.length - 1 ? 0 : prevIndex + 1
      );
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    setBgColor(getRandomLightColor());
  }, [currentIndex]);

  const currentFeedback = feedbackData.feedbacks[currentIndex];

  return (
    <div
      id="contact"
      className="px-6 py-12 md:px-12 bg-gray-100 dark:bg-gray-900 transition-all duration-300 text-gray-800 dark:text-gray-200 font-sans"
    >
      {/* Feedback Section */}
      <h2 className="text-3xl font-bold text-center mb-10 text-emerald-800 dark:text-yellow-400">
        {t('contact.feedbackTitle')}
      </h2>

      <div
        className="max-w-3xl mx-auto shadow-lg rounded-2xl p-6 md:p-10 text-center animate-fadeSlide"
        style={{ backgroundColor: bgColor, transition: 'background-color 0.5s ease' }}
      >
        <h3 className="text-2xl font-semibold text-emerald-800 dark:text-emerald-800 mb-2">
          {currentFeedback.name}
        </h3>
        <p className="italic text-lg text-gray-700 dark:text-gray-600 mb-2">
          "{currentFeedback.feedback}"
        </p>
        <span className="text-sm text-gray-600 dark:text-gray-800">- {currentFeedback.city}</span>
      </div>

      {/* Contact Form Section */}
      <h1 className="text-4xl font-bold text-center mt-16 mb-10 text-emerald-900 dark:text-yellow-400">
        {t('contact.title')}
      </h1>

      <div className="flex flex-col md:flex-row items-start gap-10 justify-between max-w-6xl mx-auto">
        {/* Info */}
        <div className="flex-1 space-y-4">
          <h2 className="text-2xl font-bold text-emerald-800 dark:text-yellow-300">{t('contact.brand')}</h2>
          <p className="text-gray-700 dark:text-gray-300 text-base">{t('contact.tagline1')}</p>
          <p className="text-gray-700 dark:text-gray-300 text-base">{t('contact.tagline2')}</p>
        </div>

        {/* Form */}
        <div className="flex-1 w-full">
          <form className="space-y-4 bg-white dark:bg-gray-800 shadow-md rounded-xl p-6">
            <input
              type="text"
              placeholder={t('contact.name')}
              required
              className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
            <input
              type="email"
              placeholder={t('contact.email')}
              required
              className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
            <textarea
              placeholder={t('contact.message')}
              rows="2"
              required
              className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
            ></textarea>
            <button
              type="submit"
              className="w-full py-3 bg-emerald-700 hover:bg-emerald-800 text-white font-semibold rounded-lg transition-all duration-300"
            >
              {t('contact.submit')}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
