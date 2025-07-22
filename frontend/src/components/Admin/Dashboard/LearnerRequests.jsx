import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

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
      const res = await fetch(`${API_BASE_URL}/api/learners/pending`);
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
      const res = await fetch(`${API_BASE_URL}/api/learners/approve/${id}`, {
        method: 'PATCH',
      });
      if (res.ok) {
        alert(t('learnerRequests.approvedSuccess'));
        fetchLearners();
      } else {
        alert(t('learnerRequests.approvedFail'));
      }
    } catch (err) {
      alert(t('learnerRequests.approvedFail'));
      console.error(err);
    }
  };

  const deleteLearner = async (id) => {
    const confirm = window.confirm(t('learnerRequests.deleteConfirm'));
    if (!confirm) return;

    try {
      const res = await fetch(`${API_BASE_URL}/api/learners/${id}`, {
        method: 'DELETE',
      });
      if (res.ok) {
        alert(t('learnerRequests.deleteSuccess'));
        fetchLearners();
      } else {
        alert(t('learnerRequests.deleteFail'));
      }
    } catch (err) {
      alert(t('learnerRequests.deleteFail'));
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
    `${API_BASE_URL}/uploads/${selectedLearner.photo}`,
    `${API_BASE_URL}/uploads/${selectedLearner.nationalIdPhoto}`
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
                  <p><strong>Name:</strong> {learner.name}</p>
                  <p><strong>Email:</strong> {learner.email}</p>
                  <p><strong>Contact:</strong> {learner.contact}</p>
                  <p><strong>Age:</strong> {learner.age}</p>
                  <p><strong>Location:</strong> {learner.location}</p>
                  <p><strong>National ID:</strong> {learner.nationalId}</p>
                  <div className="flex space-x-2 mt-2">
                    <button
                      onClick={() => approveLearner(learner.id)}
                      className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
                    >✅ Approve</button>
                    <button
                      onClick={() => deleteLearner(learner.id)}
                      className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                    >🗑️ Delete</button>
                  </div>
                </div>
                <div className="mt-4 md:mt-0 flex flex-col items-center">
                  <img
                    src={`${API_BASE_URL}/uploads/${learner.photo}`}
                    alt="Learner"
                    className="w-24 h-24 object-cover rounded"
                  />
                  <button
                    onClick={() => setSelectedLearner(learner)}
                    className="mt-2 bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
                  >👁️ View</button>
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
              <p><strong>Name:</strong> {selectedLearner.name}</p>
              <p><strong>Email:</strong> {selectedLearner.email}</p>
              <p><strong>Contact:</strong> {selectedLearner.contact}</p>
              <p><strong>Age:</strong> {selectedLearner.age}</p>
              <p><strong>Gender:</strong> {selectedLearner.gender}</p>
              <p><strong>Location:</strong> {selectedLearner.location}</p>
              <p><strong>National ID:</strong> {selectedLearner.nationalId}</p>
              <p><strong>Plan:</strong> {selectedLearner.plan}</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div>
                  <p className="font-semibold">Profile Photo:</p>
                  <img
                    src={`${API_BASE_URL}/uploads/${selectedLearner.photo}`}
                    alt="Profile"
                    className="w-full h-48 object-cover rounded cursor-pointer"
                    onClick={() => { setImageIndex(0); setSelectedImage(images[0]); }}
                  />
                </div>
                <div>
                  <p className="font-semibold">National ID Photo:</p>
                  <img
                    src={`${API_BASE_URL}/uploads/${selectedLearner.nationalIdPhoto}`}
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
              >⬇️ Download</button>
              {imageIndex < images.length - 1 && (
                <button
                  onClick={() => {
                    const nextIndex = imageIndex + 1;
                    setImageIndex(nextIndex);
                    setSelectedImage(images[nextIndex]);
                  }}
                  className="bg-white text-black px-2 py-1 rounded"
                >Next ➡️</button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
