import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

export default function TrainerForm({ onClose }) {
  const { t } = useTranslation();
  const [form, setForm] = useState({
    name: '',
    email: '',
    contact: '',
    gender: '',
    age: '',
    experience: '',
    location: '',
    nationalId: '',
    licenseNumber: '',
    selfPhoto: null,
    nationalIdPhoto: null,
    licensePhoto: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setForm({ ...form, [name]: files[0] });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (parseInt(form.age) < 18) {
      alert(t('trainerForm.ageAlert'));
      return;
    }

    const data = new FormData();
    Object.entries(form).forEach(([key, value]) => {
      data.append(key, value);
    });

    try {
      const res = await fetch('http://localhost:5000/api/trainers', {
        method: 'POST',
        body: data,
      });

      const result = await res.json();
      if (res.ok) {
        alert(t('trainerForm.success'));
        if (onClose) onClose();
      } else {
        alert(result.error || t('trainerForm.error'));
      }
    } catch (err) {
      console.error(err);
      alert(t('trainerForm.errorSubmit'));
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-blue-100 dark:bg-gray-900 rounded-lg p-6 w-full max-w-lg shadow-xl relative max-h-[90vh] overflow-hidden">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-700 dark:text-gray-300 hover:text-red-600 text-xl font-bold"
        >
          ×
        </button>

        <h2 className="text-xl font-bold text-center mb-4 text-blue-800 dark:text-white">
          🚗 {t('trainerForm.title')}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4 overflow-y-auto pr-2" style={{ maxHeight: '60vh' }}>
          <input name="name" type="text" placeholder={t('trainerForm.name')} required onChange={handleChange} className="w-full p-2 border rounded" />
          <input name="email" type="email" placeholder={t('trainerForm.email')} required onChange={handleChange} className="w-full p-2 border rounded" />
          <input name="contact" type="text" placeholder={t('trainerForm.contact')} required onChange={handleChange} className="w-full p-2 border rounded" />
          
          <select name="gender" required value={form.gender} onChange={handleChange} className="w-full p-2 border rounded bg-white dark:bg-gray-700">
            <option value="">{t('trainerForm.selectGender')}</option>
            <option value="Male">{t('trainerForm.male')}</option>
            <option value="Female">{t('trainerForm.female')}</option>
            <option value="Other">{t('trainerForm.other')}</option>
          </select>

          <input name="age" type="number" placeholder={t('trainerForm.age')} required onChange={handleChange} className="w-full p-2 border rounded" />
          <input name="experience" type="number" placeholder={t('trainerForm.experience')} required onChange={handleChange} className="w-full p-2 border rounded" />
          <input name="location" type="text" placeholder={t('trainerForm.location')} required onChange={handleChange} className="w-full p-2 border rounded" />
          <input name="nationalId" type="text" placeholder={t('trainerForm.nationalId')} required onChange={handleChange} className="w-full p-2 border rounded" />
          <input name="licenseNumber" type="text" placeholder={t('trainerForm.licenseNumber')} required onChange={handleChange} className="w-full p-2 border rounded" />

          <div>
            <label className="block text-gray-700 dark:text-gray-300">{t('trainerForm.uploadProfile')}</label>
            <input name="selfPhoto" type="file" accept="image/*" required onChange={handleChange} className="w-full" />
          </div>

          <div>
            <label className="block text-gray-700 dark:text-gray-300">{t('trainerForm.uploadNationalId')}</label>
            <input name="nationalIdPhoto" type="file" accept="image/*" required onChange={handleChange} className="w-full" />
          </div>

          <div>
            <label className="block text-gray-700 dark:text-gray-300">{t('trainerForm.uploadLicense')}</label>
            <input name="licensePhoto" type="file" accept="image/*" required onChange={handleChange} className="w-full" />
          </div>
        </form>

        <div className="flex gap-4 mt-4">
          <button type="submit" onClick={handleSubmit} className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded w-full">
            {t('trainerForm.register')}
          </button>
          <button type="button" onClick={onClose} className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded w-full">
            {t('trainerForm.cancel')}
          </button>
        </div>
      </div>
    </div>
  );
}
