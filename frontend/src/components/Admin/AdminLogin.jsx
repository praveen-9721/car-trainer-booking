import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

export default function AdminLogin({ onClose, onLoginSuccess }) {
  const { t } = useTranslation();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    if (username === 'admin' && password === 'admin123') {
      onLoginSuccess();
    } else {
      alert(t('adminLogin.invalidCredentials'));
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md w-11/12 max-w-sm space-y-4 mx-auto">
      <h2 className="text-xl font-bold text-center dark:text-white">
        {t('adminLogin.title')}
      </h2>

      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder={t('adminLogin.username')}
        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder={t('adminLogin.password')}
        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <button
        onClick={handleLogin}
        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
      >
        {t('adminLogin.login')}
      </button>

      <button
        onClick={onClose}
        className="w-full text-sm text-gray-500 hover:text-red-500 transition"
      >
        {t('adminLogin.cancel')}
      </button>
    </div>
  );
}
