import React, { useState } from 'react';
import { ArrowDownToLine, X, ChevronRight, ChevronLeft } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function TrainerDetails({ trainer, onClose }) {
  const { t } = useTranslation();
  const [activePhotoIndex, setActivePhotoIndex] = useState(null);

  const photoList = [
    { src: trainer.selfPhoto, label: t('trainerRequest.profilePhoto') },
    { src: trainer.licensePhoto, label: t('trainerRequest.licensePhoto') },
    { src: trainer.nationalIdPhoto, label: t('trainerRequest.nationalIdPhoto') },
  ];

  const openPhoto = (index) => setActivePhotoIndex(index);
  const closePhoto = () => setActivePhotoIndex(null);
  const nextPhoto = () => setActivePhotoIndex((prev) => (prev + 1) % photoList.length);
  const prevPhoto = () => setActivePhotoIndex((prev) => (prev - 1 + photoList.length) % photoList.length);
  const downloadImage = (url) => {
    const link = document.createElement('a');
    link.href = `http://localhost:5000/uploads/${url}`;
    link.download = url;
    link.click();
  };

  if (!trainer) return null;

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-5xl relative max-h-[90vh] overflow-y-auto">
          <button
            onClick={onClose}
            className="absolute top-2 right-2 text-gray-600 hover:text-black dark:hover:text-white"
          >
            ❌
          </button>

          <h2 className="text-xl font-bold mb-4">{t('trainerRequest.title')}</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2 text-sm">
              <p><strong>{t('trainerRequest.name')}:</strong> {trainer.name}</p>
              <p><strong>{t('trainerRequest.gender')}:</strong> {trainer.gender}</p>
              <p><strong>{t('trainerRequest.email')}:</strong> {trainer.email}</p>
              <p><strong>{t('trainerRequest.contact')}:</strong> {trainer.contact}</p>
              <p><strong>{t('trainerRequest.location')}:</strong> {trainer.location}</p>
              <p><strong>{t('trainerRequest.experience')}:</strong> {trainer.experience} {t('trainerRequest.years')}</p>
              <p><strong>{t('trainerRequest.age')}:</strong> {trainer.age}</p>
              <p><strong>{t('trainerRequest.nationalId')}:</strong> {trainer.nationalId}</p>
              <p><strong>{t('trainerRequest.licenseNumber')}:</strong> {trainer.licenseNumber}</p>
              <p><strong>{t('trainerRequest.status')}:</strong> {trainer.approved ? '✅ ' + t('trainerRequest.approved') : '⏳ ' + t('trainerRequest.pending')}</p>
            </div>

            <div>
              <p className="font-semibold mb-1">{t('trainerRequest.profilePhoto')}</p>
              <img
                src={`http://localhost:5000/uploads/${trainer.selfPhoto}`}
                alt="Profile"
                className="w-64 h-64 object-cover rounded cursor-pointer"
                onClick={() => openPhoto(0)}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
            <div>
              <p className="font-semibold mb-1">{t('trainerRequest.licensePhoto')}</p>
              <img
                src={`http://localhost:5000/uploads/${trainer.licensePhoto}`}
                alt="License"
                className="w-full h-48 object-cover rounded cursor-pointer"
                onClick={() => openPhoto(1)}
              />
            </div>
            <div>
              <p className="font-semibold mb-1">{t('trainerRequest.nationalIdPhoto')}</p>
              <img
                src={`http://localhost:5000/uploads/${trainer.nationalIdPhoto}`}
                alt="National ID"
                className="w-full h-48 object-cover rounded cursor-pointer"
                onClick={() => openPhoto(2)}
              />
            </div>
          </div>

          <div className="mt-4 text-gray-600 text-xs">
            <p><strong>{t('trainerRequest.trainingHistory')}:</strong> ({t('trainerRequest.comingSoon')})</p>
          </div>
        </div>
      </div>

      {activePhotoIndex !== null && (
        <div className="fixed inset-0 bg-black bg-opacity-80 z-50 flex items-center justify-center">
          <div className="relative max-w-3xl w-full px-4">
            <img
              src={`http://localhost:5000/uploads/${photoList[activePhotoIndex].src}`}
              alt="Preview"
              className="w-full max-h-[80vh] object-contain rounded"
            />
            <button
              onClick={closePhoto}
              className="absolute top-4 right-4 bg-white dark:bg-gray-700 text-black dark:text-white p-2 rounded-full hover:bg-red-500 hover:text-white transition"
            >
              <X size={18} />
            </button>
            <button
              onClick={() => downloadImage(photoList[activePhotoIndex].src)}
              className="absolute top-4 left-4 bg-white dark:bg-gray-700 p-2 rounded-full hover:bg-blue-600 hover:text-white transition"
            >
              <ArrowDownToLine size={18} />
            </button>
            <button
              onClick={prevPhoto}
              className="absolute left-0 top-1/2 -translate-y-1/2 p-2 bg-white dark:bg-gray-700 rounded-full hover:bg-gray-600 hover:text-white transition"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={nextPhoto}
              className="absolute right-0 top-1/2 -translate-y-1/2 p-2 bg-white dark:bg-gray-700 rounded-full hover:bg-gray-600 hover:text-white transition"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
