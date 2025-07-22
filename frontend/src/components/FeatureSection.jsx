import React from 'react';
import { motion } from 'framer-motion';
import { FaUserShield, FaClock, FaCarSide, FaIdCard } from 'react-icons/fa';

const features = [
  {
    icon: <FaUserShield size={40} className="text-blue-600" />,
    title: 'Certified Trainers',
    desc: 'Only government-certified trainers with proven experience.',
  },
  {
    icon: <FaClock size={40} className="text-green-600" />,
    title: 'Flexible Scheduling',
    desc: 'Book your trainer at your convenient time and place.',
  },
  {
    icon: <FaIdCard size={40} className="text-yellow-600" />,
    title: 'License Assistance',
    desc: 'Get full support for passing RTO and obtaining your license.',
  },
  {
    icon: <FaCarSide size={40} className="text-purple-600" />,
    title: 'Pickup & Drop',
    desc: 'Home pickup & drop facility available in selected areas.',
  },
];

export default function FeatureSection() {
  return (
    <section className="py-16 px-4 md:px-16 bg-white dark:bg-gray-800">
      <h2 className="text-3xl font-bold text-center mb-12 text-blue-600 dark:text-white">
        Why Choose Us?
      </h2>

      <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        {features.map((f, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.2 }}
            viewport={{ once: true }}
            className="p-6 rounded-lg shadow-md bg-gray-100 dark:bg-gray-700 text-center hover:scale-105 transition-transform duration-300"
          >
            <div className="mb-4">{f.icon}</div>
            <h3 className="text-xl font-semibold text-gray-800 dark:text-white">{f.title}</h3>
            <p className="text-gray-600 dark:text-gray-300 mt-2">{f.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
