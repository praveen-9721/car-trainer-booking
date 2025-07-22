import React from 'react';
import { useTranslation } from 'react-i18next';
import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube, FaLock } from 'react-icons/fa';

export default function Footer({ setShowAdminLogin }) {
  const { t } = useTranslation();

  return (
    <footer className="bg-gradient-to-br from-emerald-900 to-emerald-800 text-white px-6 py-10 font-sans">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 mb-10">

        {/* About Us */}
        <div>
          <h3 className="text-xl font-semibold mb-3 relative">
            {t('footer.about')}
            <span className="block w-10 h-1 bg-yellow-400 mt-1 rounded-full"></span>
          </h3>
          <p className="text-sm text-gray-200">
            {t('footer.aboutDescription')}
          </p>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-xl font-semibold mb-3 relative">
            {t('footer.contact')}
            <span className="block w-10 h-1 bg-yellow-400 mt-1 rounded-full"></span>
          </h3>
          <p className="text-sm text-gray-200">
            {t('footer.email')}: <a href="mailto:info@drivelearn.com" className="hover:text-yellow-300">info@drivelearn.com</a>
          </p>
          <p className="text-sm text-gray-200">
            {t('footer.phone')}: <a href="tel:+966123456789" className="hover:text-yellow-300">+966-123456789</a>
          </p>
        </div>

        {/* Legal */}
        <div>
          <h3 className="text-xl font-semibold mb-3 relative">
            {t('footer.legal')}
            <span className="block w-10 h-1 bg-yellow-400 mt-1 rounded-full"></span>
          </h3>
          <p className="text-sm"><a href="/terms" className="hover:text-yellow-300">{t('footer.terms')}</a></p>
          <p className="text-sm"><a href="/privacy" className="hover:text-yellow-300">{t('footer.privacy')}</a></p>
        </div>

        {/* Social */}
        <div>
          <h3 className="text-xl font-semibold mb-3 relative">
            {t('footer.follow')}
            <span className="block w-10 h-1 bg-yellow-400 mt-1 rounded-full"></span>
          </h3>
          <div className="flex space-x-4 mt-2">
            <a href="#" className="p-2 rounded-full bg-white/20 hover:bg-yellow-400 hover:text-emerald-800 transition"><FaFacebookF /></a>
            <a href="#" className="p-2 rounded-full bg-white/20 hover:bg-yellow-400 hover:text-emerald-800 transition"><FaTwitter /></a>
            <a href="#" className="p-2 rounded-full bg-white/20 hover:bg-yellow-400 hover:text-emerald-800 transition"><FaInstagram /></a>
            <a href="#" className="p-2 rounded-full bg-white/20 hover:bg-yellow-400 hover:text-emerald-800 transition"><FaYoutube /></a>
          </div>
        </div>

        {/* Admin Login */}
        <div>
          <h3 className="text-xl font-semibold mb-3 relative">
            {t('footer.admin')}
            <span className="block w-10 h-1 bg-yellow-400 mt-1 rounded-full"></span>
          </h3>
          <button
            onClick={() => setShowAdminLogin(true)}
            className="flex items-center gap-2 px-4 py-2 mt-2 rounded bg-yellow-400 text-emerald-900 font-medium shadow-lg transition transform hover:-translate-y-1 hover:scale-105 hover:bg-yellow-300"
          >
            <FaLock /> {t('footer.adminLogin')}
          </button>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="text-center text-sm border-t border-white/20 pt-6 mt-6">
        <p>© 2025 <span className="text-yellow-400 font-bold">DriveLearn</span>. {t('footer.rights')}</p>
        <p className="mt-1 text-gray-200">{t('footer.madeBy')} <span className="text-red-500 animate-pulse">❤️</span> {t('footer.in')}</p>
      </div>
    </footer>
  );
}
