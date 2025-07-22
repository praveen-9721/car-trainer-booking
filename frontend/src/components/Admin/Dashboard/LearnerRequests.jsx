import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

export default function LearnerRequests() {
  const { t } = useTranslation();
  const [learners, setLearners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedLearner, setSelectedLearner] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageIndex, setImageIndex] = useState(0);

  const fetchLearners = async () => {
    setLoading(true);
    try {
      const res = await fetch('http://localhost:5000/api/learners/pending');
      const data = await res.json();
      setLearners(data);
    } catch (err) {
      console.error("❌ Failed to fetch learners:", err);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchLearners();
  }, []);

  const approveLearner = async (id) => {
    try {
      const res = await fetch(`http://localhost:5000/api/learners/approve/${id}`, {
        method: 'PATCH',
      });
      if (res.ok) {
        alert(t('learnerRequests.approvedSuccess'));
        fetchLearners();
      } else {
        alert(t('learnerRequests.approvedFail'));
      }
    } catch (err) {
      console.error(err);
    }
  };

  const deleteLearner = async (id) => {
    const confirm = window.confirm(t('learnerRequests.deleteConfirm'));
    if (!confirm) return;

    try {
      const res = await fetch(`http://localhost:5000/api/learners/${id}`, {
        method: 'DELETE',
      });
      if (res.ok) {
        alert(t('learnerRequests.deleteSuccess'));
        fetchLearners();
      } else {
        alert(t('learnerRequests.deleteFail'));
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleDownload = (url) => {
    const link = document.createElement('a');
    link.href = url;
    link.download = url.split('/').pop();
    link.click();
  };

  const images = selectedLearner ? [
    `http://localhost:5000/uploads/${selectedLearner.photo}`,
    `http://localhost:5000/uploads/${selectedLearner.nationalIdPhoto}`
  ] : [];

  if (loading) return <p className="p-4">{t('learnerRequests.loading')}</p>;

  return (
    <div className="p-4">
      <h2 className="text-lg font-bold mb-4">👨‍🎓 {t('learnerRequests.pendingTitle')}</h2>

      {learners.length === 0 ? (
        <p>{t('learnerRequests.noPending')}</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {learners.map((learner) => (
            <div
              key={learner.id}
              className="p-4 bg-white dark:bg-gray-800 rounded shadow"
            >
              <div className="flex flex-col md:flex-row items-center justify-between">
                <div className="w-full md:w-2/3 space-y-1">
                  <p><strong>{t('form.name')}:</strong> {learner.name}</p>
                  <p><strong>{t('form.email')}:</strong> {learner.email}</p>
                  <p><strong>{t('form.contact')}:</strong> {learner.contact}</p>
                  <p><strong>{t('form.age')}:</strong> {learner.age}</p>
                  <p><strong>{t('form.location')}:</strong> {learner.location}</p>
                  <p><strong>{t('form.nationalId')}:</strong> {learner.nationalId}</p>
                  <div className="flex space-x-2 mt-2">
                    <button
                      onClick={() => approveLearner(learner.id)}
                      className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
                    >✅ {t('buttons.approve')}</button>
                    <button
                      onClick={() => deleteLearner(learner.id)}
                      className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                    >🗑️ {t('buttons.delete')}</button>
                  </div>
                </div>
                <div className="mt-4 md:mt-0 flex flex-col items-center">
                  <img
                    src={`http://localhost:5000/uploads/${learner.photo}`}
                    alt="Learner"
                    className="w-24 h-24 object-cover rounded"
                  />
                  <button
                    onClick={() => setSelectedLearner(learner)}
                    className="mt-2 bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
                  >👁️ {t('buttons.view')}</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {selectedLearner && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
          <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-lg w-[90%] md:w-[600px] relative">
            <button
              className="absolute top-2 right-2 text-xl font-bold text-red-600 hover:text-red-800"
              onClick={() => setSelectedLearner(null)}
            >❌</button>
            <h3 className="text-lg font-bold mb-4">👁️ {t('learnerRequests.detailsTitle')}</h3>
            <div className="space-y-2">
              <p><strong>{t('form.name')}:</strong> {selectedLearner.name}</p>
              <p><strong>{t('form.email')}:</strong> {selectedLearner.email}</p>
              <p><strong>{t('form.contact')}:</strong> {selectedLearner.contact}</p>
              <p><strong>{t('form.age')}:</strong> {selectedLearner.age}</p>
              <p><strong>{t('form.gender')}:</strong> {selectedLearner.gender}</p>
              <p><strong>{t('form.location')}:</strong> {selectedLearner.location}</p>
              <p><strong>{t('form.nationalId')}:</strong> {selectedLearner.nationalId}</p>
              <p><strong>{t('form.plan')}:</strong> {selectedLearner.plan}</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div>
                  <p className="font-semibold">{t('form.profilePhoto')}:</p>
                  <img
                    src={`http://localhost:5000/uploads/${selectedLearner.photo}`}
                    alt="Profile"
                    className="w-full h-48 object-cover rounded cursor-pointer"
                    onClick={() => { setImageIndex(0); setSelectedImage(images[0]); }}
                  />
                </div>
                <div>
                  <p className="font-semibold">{t('form.nationalIdPhoto')}:</p>
                  <img
                    src={`http://localhost:5000/uploads/${selectedLearner.nationalIdPhoto}`}
                    alt="National ID"
                    className="w-full h-48 object-cover rounded cursor-pointer"
                    onClick={() => { setImageIndex(1); setSelectedImage(images[1]); }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {selectedImage && (
        <div className="fixed inset-0 bg-black bg-opacity-70 z-50 flex items-center justify-center">
          <div className="relative w-[90%] md:w-[500px]">
            <img src={selectedImage} className="w-full rounded shadow-lg" alt="Zoom" />
            <button
              className="absolute top-2 right-2 text-white text-2xl"
              onClick={() => setSelectedImage(null)}
            >❌</button>
            <div className="absolute bottom-2 left-2 space-x-3">
              <button
                onClick={() => handleDownload(selectedImage)}
                className="bg-white text-black px-2 py-1 rounded"
              >⬇️ {t('buttons.download')}</button>
              {imageIndex < images.length - 1 && (
                <button
                  onClick={() => {
                    const nextIndex = imageIndex + 1;
                    setImageIndex(nextIndex);
                    setSelectedImage(images[nextIndex]);
                  }}
                  className="bg-white text-black px-2 py-1 rounded"
                >{t('buttons.next')} ➡️</button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
