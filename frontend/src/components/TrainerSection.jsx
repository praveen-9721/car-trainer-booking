import React from 'react';
import { motion } from 'framer-motion';

const trainers = [
  {
    name: 'Ahmed Al-Sabah',
    experience: '5 Years',
    location: 'Riyadh',
    image: 'https://via.placeholder.com/150',
  },
  {
    name: 'Fatima Al-Harbi',
    experience: '3 Years',
    location: 'Jeddah',
    image: 'https://via.placeholder.com/150',
  },
  {
    name: 'Mohammed Al-Zahrani',
    experience: '8 Years',
    location: 'Dammam',
    image: 'https://via.placeholder.com/150',
  },
  {
    name: 'Sara Al-Qahtani',
    experience: '2 Years',
    location: 'Makkah',
    image: 'https://via.placeholder.com/150',
  },
];

export default function TrainerSection() {
  return (
    <section className="py-16 px-4 bg-white dark:bg-gray-900">
      <h2 className="text-3xl font-bold text-center text-blue-600 dark:text-white mb-8">
        Meet Our Trainers
      </h2>

      <div className="overflow-x-auto pb-4">
        <div className="flex space-x-6 w-max">
          {trainers.map((trainer, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              viewport={{ once: true }}
              className="min-w-[250px] bg-gray-100 dark:bg-gray-800 shadow-lg rounded-lg p-4 text-center"
            >
              <img
                src={trainer.image}
                alt={trainer.name}
                className="w-24 h-24 mx-auto rounded-full object-cover"
              />
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white mt-4">
                {trainer.name}
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                {trainer.experience}
              </p>
              <p className="text-gray-600 dark:text-gray-400">{trainer.location}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
