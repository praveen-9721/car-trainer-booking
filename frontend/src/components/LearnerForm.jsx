import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

export default function LearnerForm({ onClose }) {
  const { t } = useTranslation();
  const [form, setForm] = useState({
    name: '',
    email: '',
    contact: '',
    gender: '',
    age: '',
    location: '',
    nationalId: '',
    plan: '',
    photo: null,
    nationalIdPhoto: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'photo' || name === 'nationalIdPhoto') {
      setForm({ ...form, [name]: files[0] });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (parseInt(form.age) < 18) {
      alert(t('learner_form.ageAlert'));
      return;
    }

    const formData = new FormData();
    Object.entries(form).forEach(([key, value]) => {
      formData.append(key, value);
    });

    try {
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/learners`, {
        method: 'POST',
        body: formData,
        mode: 'cors',
      });

      const result = await res.json();
      if (res.ok) {
        alert(t('learner_form.success'));
        if (onClose) onClose();
      } else {
        alert(result?.error || t('learner_form.error'));
      }
    } catch (err) {
      console.error('Form submission error:', err);
      alert(t('learner_form.submitError'));
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center px-4">
      <div className="bg-blue-100 dark:bg-gray-900 rounded-lg p-6 w-full max-w-lg shadow-xl relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-700 dark:text-gray-300 hover:text-red-600 text-xl font-bold"
        >
          ×
        </button>

        <h2 className="text-xl font-bold text-center mb-4 text-blue-800 dark:text-white">
          {t('learner_form.title')}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input name="name" type="text" placeholder={t('learner_form.name')} required onChange={handleChange} className="w-full p-2 border rounded" />
          <input name="email" type="email" placeholder={t('learner_form.email')} required onChange={handleChange} className="w-full p-2 border rounded" />
          <input name="contact" type="text" placeholder={t('learner_form.contact')} required onChange={handleChange} className="w-full p-2 border rounded" />

          <select
            name="gender"
            required
            value={form.gender}
            onChange={handleChange}
            className="w-full p-2 border rounded bg-white dark:bg-gray-700"
          >
            <option value="">{t('learner_form.gender')}</option>
            <option value="Male">{t('learner_form.male')}</option>
            <option value="Female">{t('learner_form.female')}</option>
            <option value="Other">{t('learner_form.other')}</option>
          </select>

          <input name="age" type="number" placeholder={t('learner_form.age')} required onChange={handleChange} className="w-full p-2 border rounded" />
          <input name="location" type="text" placeholder={t('learner_form.location')} required onChange={handleChange} className="w-full p-2 border rounded" />
          <input name="nationalId" type="text" placeholder={t('learner_form.nationalId')} required onChange={handleChange} className="w-full p-2 border rounded" />

          <select
            name="plan"
            required
            value={form.plan}
            onChange={handleChange}
            className="w-full p-2 border rounded bg-white dark:bg-gray-700"
          >
            <option value="">{t('learner_form.plan')}</option>
            <option value="VERY BASIC">{t('learner_form.veryBasic')}</option>
            <option value="BASIC">{t('learner_form.basic')}</option>
            <option value="STANDARD I">{t('learner_form.standard1')}</option>
            <option value="STANDARD II">{t('learner_form.standard2')}</option>
            <option value="INTENSIVE">{t('learner_form.intensive')}</option>
          </select>

          <div>
            <label className="block font-medium text-gray-800 dark:text-white mb-1">{t('learner_form.uploadPhoto')}</label>
            <input name="photo" type="file" accept="image/*" required onChange={handleChange} className="w-full" />
          </div>

          <div>
            <label className="block font-medium text-gray-800 dark:text-white mb-1">{t('learner_form.uploadNationalIdPhoto')}</label>
            <input name="nationalIdPhoto" type="file" accept="image/*" required onChange={handleChange} className="w-full" />
          </div>

          <div className="flex gap-4">
            <button type="submit" className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded w-full">
              {t('learner_form.register')}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded w-full"
            >
              {t('learner_form.cancel')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
