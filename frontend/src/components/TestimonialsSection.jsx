import React, { useEffect, useRef } from 'react';

const testimonials = [
  {
    name: 'Ali Khan',
    comment: 'The best trainer I’ve ever had! I got my license in one go.',
    location: 'Riyadh',
  },
  {
    name: 'Fatima Noor',
    comment: 'Professional and friendly instructors. Highly recommended!',
    location: 'Jeddah',
  },
  {
    name: 'Omar Al-Zahrani',
    comment: 'Flexible timings and real-world practice made me confident.',
    location: 'Dammam',
  },
  {
    name: 'Aisha Malik',
    comment: 'Loved the experience! Booking was easy and support was great.',
    location: 'Makkah',
  },
];

export default function TestimonialsSection() {
  const scrollRef = useRef();

  useEffect(() => {
    const interval = setInterval(() => {
      if (scrollRef.current) {
        scrollRef.current.scrollLeft += 1;
        if (
          scrollRef.current.scrollLeft + scrollRef.current.clientWidth >=
          scrollRef.current.scrollWidth
        ) {
          scrollRef.current.scrollLeft = 0;
        }
      }
    }, 30); // Speed

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-16 px-4 bg-white dark:bg-gray-900">
      <h2 className="text-3xl font-bold text-center text-blue-600 dark:text-white mb-8">
        What Learners Say About Us
      </h2>
      <div
        className="flex gap-6 overflow-x-auto no-scrollbar scroll-smooth"
        ref={scrollRef}
      >
        {testimonials.map((t, i) => (
          <div
            key={i}
            className="min-w-[300px] bg-gray-100 dark:bg-gray-800 p-6 rounded-lg shadow-md"
          >
            <p className="text-gray-700 dark:text-gray-200 mb-4">"{t.comment}"</p>
            <h4 className="text-md font-bold text-gray-900 dark:text-white">
              - {t.name}, {t.location}
            </h4>
          </div>
        ))}
      </div>
    </section>
  );
}
