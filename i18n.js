import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
  en: {
    translation: {
      nav_home: "Home",
      nav_about: "About Us",
      nav_services: "Services",
      nav_portfolio: "Portfolio",
      nav_contact: "Contact",
      nav_quote: "Get a Quote",
      hero_badge: "We Build Digital Futures",
      hero_title_1: "Building Digital Experiences",
      hero_title_2: "That Drive Success.",
      hero_desc: "NovaDev Studio helps businesses transform ideas into powerful websites, web applications, mobile apps, and custom software.",
      hero_btn_quote: "Get a Free Quote",
      hero_btn_work: "View Our Work"
    }
  },
  ar: {
    translation: {
      nav_home: "الرئيسية",
      nav_about: "من نحن",
      nav_services: "خدماتنا",
      nav_portfolio: "أعمالنا",
      nav_contact: "اتصل بنا",
      nav_quote: "اطلب تسعيرة",
      hero_badge: "نحن نبني المستقبل الرقمي",
      hero_title_1: "نبني تجارب رقمية",
      hero_title_2: "تقودك للنجاح.",
      hero_desc: "يساعد نوفا ديف ستوديو الشركات على تحويل أفكارها إلى مواقع قوية، تطبيقات ويب، تطبيقات جوال، وبرمجيات مخصصة.",
      hero_btn_quote: "احصل على تسعيرة مجانية",
      hero_btn_work: "شاهد أعمالنا"
    }
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false, 
    }
  });

export default i18n;