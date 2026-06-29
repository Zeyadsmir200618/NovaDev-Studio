import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import Services from '../components/Services';
import Portfolio from '../components/Portfolio';

export default function Home() {
  const { t, i18n } = useTranslation();
  const isRtl = i18n.language === 'ar';

  return (
    <div>
      <main className="max-w-4xl mx-auto text-center mt-20 px-4 min-h-[60vh] flex flex-col justify-center">
        <span className="text-xs font-bold uppercase tracking-widest text-brand-blue dark:text-brand-purple">
          {t('hero_badge')}
        </span>
        <h1 className="text-4xl md:text-6xl font-heading font-extrabold mt-4 mb-6 leading-tight">
          {t('hero_title_1')} <br />
          <span className="bg-gradient-to-r from-brand-blue to-brand-purple bg-clip-text text-transparent">
            {t('hero_title_2')}
          </span>
        </h1>
        <p className="text-slate-600 dark:text-slate-400 max-w-xl mx-auto text-lg mb-8">
          {t('hero_desc')}
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link to="/contact" className="flex items-center justify-center gap-2 bg-brand-blue hover:bg-blue-600 text-white px-8 py-3 rounded-full font-semibold shadow-lg transition-all cursor-pointer">
            {t('hero_btn_quote')} {isRtl ? <ArrowLeft size={18} /> : <ArrowRight size={18} />}
          </Link>
          <Link to="/portfolio" className="px-8 py-3 rounded-full font-semibold border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all cursor-pointer">
            {t('hero_btn_work')}
          </Link>
        </div>
      </main>

      <Services /> 
      <Portfolio />
    </div>
  );
}