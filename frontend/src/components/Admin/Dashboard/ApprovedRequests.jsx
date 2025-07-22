import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Eye, X } from 'lucide-react';

export default function ApprovedRequests() {
  const { t } = useTranslation();
  const [learners, setLearners] = useState([]);
  const [filter, setFilter] = useState('approved');
  const [search, setSearch] = useState('');
  const [selectedLearner, setSelectedLearner] = useState(null);

  const fetchApproved = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/learners/approved');
      const data = await res.json();
      setLearners(data);
    } catch (err) {
      console.error('Error fetching approved learners:', err);
    }
  };

  const markAsCompleted = async (id) => {
    try {
      const res = await fetch(`http://localhost:5000/api/learners/${id}/complete`, {
        method: 'PATCH',
      });

      const result = await res.json();
      if (res.ok) {
        alert(t('approvedRequest.markedSuccessfully'));
        setLearners((prev) =>
          prev.map((l) => (l.id === id ? { ...l, completed: true } : l))
        );
      } else {
        alert(result.error || t('approvedRequest.markFailed'));
      }
    } catch (err) {
      console.error('Error marking as completed:', err);
      alert(t('approvedRequest.markFailed'));
    }
  };

  useEffect(() => {
    fetchApproved();
  }, []);

  const filteredLearners = learners.filter((learner) => {
    const matchesFilter =
      (filter === 'approved' && !learner.completed) ||
      (filter === 'completed' && learner.completed) ||
      filter === 'all';

    const matchesSearch =
      learner.name.toLowerCase().includes(search.toLowerCase()) ||
      learner.email.toLowerCase().includes(search.toLowerCase());

    return matchesFilter && matchesSearch;
  });

  return (
    <div className="p-4 relative">
      <h2 className="text-xl font-bold mb-4">{t('approvedRequest.title')}</h2>

      <input
        type="text"
        placeholder={t('approvedRequest.searchPlaceholder')}
        className="w-full mb-4 p-2 rounded border dark:bg-gray-800 dark:text-white"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="flex space-x-4 mb-4 flex-wrap">
        {['approved', 'completed', 'all'].map((type) => (
          <button
            key={type}
            onClick={() => setFilter(type)}
            className={`px-3 py-1 rounded ${
              filter === type
                ? type === 'approved'
                  ? 'bg-blue-600 text-white'
                  : type === 'completed'
                  ? 'bg-green-600 text-white'
                  : 'bg-gray-800 text-white'
                : 'bg-gray-200 dark:bg-gray-700 dark:text-white'
            }`}
          >
            {t(`approvedRequest.filters.${type}`)}
          </button>
        ))}
      </div>

      {filteredLearners.length === 0 ? (
        <p className="text-gray-500">{t('approvedRequest.noLearners')}</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredLearners.map((learner) => (
            <div
              key={learner.id}
              className="bg-white dark:bg-gray-800 p-4 rounded shadow flex justify-between items-center"
            >
              <div className="flex-1 pr-4">
                <h3 className="font-semibold text-lg">{learner.name}</h3>
                <p>{t('approvedRequest.email')}: {learner.email}</p>
                <p>{t('approvedRequest.contact')}: {learner.contact}</p>
                <p>{t('approvedRequest.location')}: {learner.location}</p>
                <p>{t('approvedRequest.age')}: {learner.age}</p>
                <p>
                  {t('approvedRequest.status')}:{' '}
                  <span
                    className={`font-semibold ${
                      learner.completed ? 'text-green-600' : 'text-yellow-600'
                    }`}
                  >
                    {learner.completed
                      ? t('approvedRequest.completed')
                      : t('approvedRequest.ongoing')}
                  </span>
                </p>

                {!learner.completed && (
                  <button
                    onClick={() => markAsCompleted(learner.id)}
                    className="mt-2 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                  >
                    {t('approvedRequest.markButton')}
                  </button>
                )}
              </div>

              <div className="flex flex-col items-center">
                <img
                  src={`http://localhost:5000/uploads/${learner.photo}`}
                  alt="Learner"
                  className="w-24 h-24 object-cover rounded border"
                />
                <button
                  onClick={() => setSelectedLearner(learner)}
                  className="mt-2 flex items-center gap-1 px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  <Eye className="w-4 h-4" />
                  <span>{t('approvedRequest.view')}</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {selectedLearner && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
          <div className="bg-white dark:bg-gray-900 p-6 rounded-lg w-[90%] max-w-lg relative">
            <button
              className="absolute top-2 right-2 text-gray-600 hover:text-red-600"
              onClick={() => setSelectedLearner(null)}
            >
              <X />
            </button>
            <h3 className="text-lg font-semibold mb-4">{t('approvedRequest.details')}</h3>
            <div className="space-y-2 text-sm">
              <img
                src={`http://localhost:5000/uploads/${selectedLearner.photo}`}
                alt="Profile"
                className="w-28 h-28 object-cover rounded mx-auto mb-4"
              />
              <p><strong>{t('approvedRequest.name')}:</strong> {selectedLearner.name}</p>
              <p><strong>{t('approvedRequest.email')}:</strong> {selectedLearner.email}</p>
              <p><strong>{t('approvedRequest.contact')}:</strong> {selectedLearner.contact}</p>
              <p><strong>{t('approvedRequest.location')}:</strong> {selectedLearner.location}</p>
              <p><strong>{t('approvedRequest.age')}:</strong> {selectedLearner.age}</p>
              <p><strong>{t('approvedRequest.nationalId')}:</strong> {selectedLearner.nationalId}</p>
              <p><strong>{t('approvedRequest.plan')}:</strong> {selectedLearner.plan}</p>
              <p>
                <strong>{t('approvedRequest.status')}:</strong>{' '}
                {selectedLearner.completed
                  ? t('approvedRequest.completed')
                  : t('approvedRequest.ongoing')}
              </p>
              <img
                src={`http://localhost:5000/uploads/${selectedLearner.nationalIdPhoto}`}
                alt="National ID"
                className="w-full max-h-52 object-contain rounded border mt-3"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
