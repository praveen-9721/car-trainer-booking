import React from 'react';
import { motion } from 'framer-motion';

const miniFeatures = [
  {
    title: "Learning and driving with friends are always fun",
    desc: "Enjoy collaborative driving sessions and boost your confidence with friends by your side.",
    image: "https://via.placeholder.com/300x200",
  },
  {
    title: "Your safety first wherever you drive",
    desc: "We teach you defensive driving techniques and ensure full safety awareness.",
    image: "https://via.placeholder.com/300x200",
  },
  {
    title: "We make you a highly proficient driver",
    desc: "Master driving skills with our expert trainers and real-world sessions.",
    image: "https://via.placeholder.com/300x200",
  },
  {
    title: "We help you get your Driver’s Licence with no hassle",
    desc: "From training to RTO test assistance, we’ve got your back all the way.",
    image: "https://via.placeholder.com/300x200",
  },
  {
    title: "Anytime Anywhere at your ease",
    desc: "Book sessions from your preferred location and schedule flexibly.",
    image: "https://via.placeholder.com/300x200",
  },
];

export default function MiniFeatureSections() {
  return (
    <section className="py-16 px-4 md:px-16 bg-gray-50 dark:bg-gray-900 space-y-16">
      {miniFeatures.map((feature, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 * index }}
          viewport={{ once: true }}
          className={`flex flex-col md:flex-row items-center gap-8 ${
            index % 2 === 1 ? 'md:flex-row-reverse' : ''
          }`}
        >
          <img
            src={feature.image}
            alt={feature.title}
            className="w-full md:w-1/2 rounded-lg shadow-md"
          />
          <div className="md:w-1/2">
            <h3 className="text-2xl font-bold text-blue-600 dark:text-white mb-2">
              {feature.title}
            </h3>
            <p className="text-gray-700 dark:text-gray-300">{feature.desc}</p>
          </div>
        </motion.div>
      ))}
    </section>
  );
}
