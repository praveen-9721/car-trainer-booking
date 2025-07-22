import React from "react";
import { useTranslation } from "react-i18next";
import PlanVideo from "../assets/video.mp4";

const focusItemsKeys = [
  "focus.fun",
  "focus.safety",
  "focus.proficient",
  "focus.licence",
  "focus.anywhere"
];

const AboutUs = () => {
  const { t } = useTranslation();
  const trainers = t("trainer_section.trainers", { returnObjects: true });

  return (
    <div
      id="about"
      className="px-4 py-12 bg-gradient-to-r from-teal-200 to-lime-100 dark:from-zinc-900 dark:to-gray-800 text-gray-800 dark:text-white"
    >
      {/* Main Heading */}
      <h1 className="text-4xl font-bold text-center mb-10">{t("about.title")}</h1>

      {/* About Section */}
      <div className="flex flex-col md:flex-row gap-8 items-center mb-16">
        <div className="md:w-1/2">
          <h2 className="text-2xl font-semibold text-emerald-800 dark:text-emerald-300 mb-4">
            {t("about.subTitle")}
          </h2>
          <p className="leading-relaxed text-gray-700 dark:text-gray-300">
            {t("about.description")}
          </p>
        </div>
        <div className="md:w-1/2">
          <video controls className="rounded-lg shadow-xl w-full">
            <source src={PlanVideo} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      </div>

      {/* Trainers Section */}
      <h2 className="text-3xl font-semibold text-center text-teal-700 dark:text-lime-400 mb-8">
        {t("about.ourTrainers")}
      </h2>
      <div className="flex flex-wrap justify-center gap-6 mb-16">
        {trainers.map((trainer, index) => (
          <div
            key={index}
            className="bg-white dark:bg-gray-900 rounded-xl shadow-md p-4 w-64 text-center transform hover:scale-110 transition duration-300 hover:bg-teal-800"
          >
            <img
              src={`/${trainer.image}`}
              alt={trainer.name}
              className="w-full h-48 object-cover rounded-md mb-4"
            />
            <h3 className="text-xl font-bold text-yellow-500 dark:text-yellow-400">
              {trainer.name}
            </h3>
            <p className="text-teal-500 font-semibold dark:text-gray-300">
              {trainer.experience}
            </p>
          </div>
        ))}
      </div>

      {/* Focus Section */}
      <div className="max-w-4xl mx-auto px-4 overflow-hidden">
        <h2 className="text-3xl font-semibold text-center text-teal-700 dark:text-lime-400 mb-10">
          {t("about.ourFocus")}
        </h2>
        <div className="space-y-16">
          {focusItemsKeys.map((key, index) => (
            <div
              key={index}
              className={`flex flex-col md:flex-row ${index % 2 !== 0 ? "md:flex-row-reverse" : ""
                } items-center gap-8 md:gap-10 transition-transform`}
            >
              <div className="w-full md:w-1/2 transform transition-transform duration-300 hover:scale-105">
                <img
                  src={t(`${key}.image`)}
                  alt={t(`${key}.title`)}
                  className="rounded-lg shadow-lg w-full h-auto object-cover"
                />
              </div>

              <div className="w-full md:w-1/2 transform transition-transform duration-300 hover:scale-105">
                <h3 className="text-2xl font-semibold text-emerald-700 dark:text-teal-300 mb-2">
                  {t(`${key}.title`)}
                </h3>
                <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed">
                  {t(`${key}.text`)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
