import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { Sun, Moon, Globe } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function Navbar() {
  const { isDarkMode, toggleTheme } = useTheme();
  const { t, i18n } = useTranslation();

  // This hook handles flipping the whole website design when Arabic is selected
  useEffect(() => {
    document.documentElement.dir = i18n.language === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = i18n.language;
  }, [i18n.language]);

  const toggleLanguage = () => {
    const newLang = i18n.language === 'en' ? 'ar' : 'en';
    i18n.changeLanguage(newLang);
  };

  return (
    <nav className="border-b border-slate-200 dark:border-slate-800 bg-brand-lightBg dark:bg-brand-darkBg sticky top-0 z-50 transition-colors duration-300">
      <div className="flex justify-between items-center p-6 max-w-7xl mx-auto">
        <Link to="/" className="text-2xl font-bold font-heading tracking-wider">
          NovaDev<span className="text-brand-blue">.</span>
        </Link>
        
        {/* Navigation Links using translations */}
        <div className="hidden md:flex gap-8 font-medium text-slate-600 dark:text-slate-300">
          <Link to="/" className="hover:text-brand-blue transition-colors">{t('nav_home')}</Link>
          <Link to="/about" className="hover:text-brand-blue transition-colors">{t('nav_about')}</Link>
          <Link to="/services" className="hover:text-brand-blue transition-colors">{t('nav_services')}</Link>
          <Link to="/portfolio" className="hover:text-brand-blue transition-colors">{t('nav_portfolio')}</Link>
          <Link to="/contact" className="hover:text-brand-blue transition-colors">{t('nav_contact')}</Link>
        </div>

        <div className="flex items-center gap-4">
          {/* Language Toggle */}
          <button 
            onClick={toggleLanguage} 
            className="flex items-center gap-2 px-3 py-2 rounded-full bg-slate-200 dark:bg-slate-800 hover:scale-105 transition-transform cursor-pointer font-bold text-sm"
            aria-label="Toggle Language"
          >
            <Globe size={18} className="text-brand-blue" />
            {i18n.language === 'en' ? 'عربي' : 'EN'}
          </button>

          {/* Theme Toggle */}
          <button 
            onClick={toggleTheme} 
            className="p-2 rounded-full bg-slate-200 dark:bg-slate-800 hover:scale-110 transition-transform cursor-pointer"
            aria-label="Toggle Theme"
          >
            {isDarkMode ? <Sun className="text-yellow-400" size={20} /> : <Moon className="text-slate-700" size={20} />}
          </button>

          <Link to="/contact" className="hidden md:block bg-brand-blue hover:bg-blue-600 text-white px-5 py-2 rounded-full font-semibold transition-all">
            {t('nav_quote')}
          </Link>
        </div>
      </div>
    </nav>
  );
}