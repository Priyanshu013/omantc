import i18n from 'i18next';
import { initReactI18next, useTranslation } from 'react-i18next';

const resources = {
  en: {
    translation: {
      appTitle: 'Welcome to Oman',
      appSubtitle: "Explore Oman's rich heritage and culture through an interactive journey",
      nav: {
        home: 'Home',
        heritage: 'Heritage of Oman',
        dates: 'Tradition',
        wellness: 'Wellness',
        culture: 'Culture'
      },
      hero: {
        subtitle: 'Explore highlights in 3–4 minutes'
      },
      cta: {
        next: 'Start Exploring',
        back: 'Back',
        home: 'Home'
      },
      cardDesc: {
        heritage: 'Discover the magnificent ancient forts, castles, and historical monuments that tell the story of Oman\'s rich past',
        tradition: 'Explore the time-honored traditional crafts, customs, and cultural practices preserved through generations',
        wellness: 'Experience the healing power of natural hot springs, therapeutic treatments, and serene relaxation',
        culture: 'Dive deep into the vibrant arts, music, literature, and cultural traditions of Oman'
      },
      cardTitle: {
        heritage: '⛩️ Heritage',
        tradition: '⚒️ Tradition',
        wellness: '🌿 Wellness',
        culture: '🎪 Culture'
      }
    }
  },
  ar: {
    translation: {
      appTitle: 'مرحباً بكم في عُمان',
      appSubtitle: 'استكشفوا تراث وثقافة عُمان الغنية من خلال رحلة تفاعلية',
      nav: {
        home: 'الرئيسية',
        heritage: 'تراث عُمان',
        dates: 'التقاليد',
        wellness: 'العافية',
        culture: 'الثقافة'
      },
      hero: {
        subtitle: 'اكتشف أبرز المعالم خلال ٣–٤ دقائق'
      },
      cta: {
        next: 'ابدأ الاستكشاف',
        back: 'السابق',
        home: 'الصفحة الرئيسية'
      },
      cardDesc: {
        heritage: 'اكتشفوا القلاع العظيمة والحصون والآثار التاريخية التي تحكي قصة الماضي العريق لعُمان',
        tradition: 'استكشفوا الحرف التقليدية الأصيلة والعادات والممارسات الثقافية المحفوظة عبر الأجيال',
        wellness: 'اختبروا قوة الشفاء الطبيعية من الينابيع الحارة والعلاجات العلاجية والاسترخاء الهادئ',
        culture: 'اغمروا أنفسكم في الفنون النابضة بالحياة والموسيقى والأدب والتقاليد الثقافية'
      },
      cardTitle: {
        heritage: '⛩️ التراث',
        tradition: '⚒️ التقاليد',
        wellness: '🌿 العافية',
        culture: '🎪 الثقافة'
      }
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en',
    fallbackLng: 'en',
    interpolation: { escapeValue: false },
  });

// Use the framework hook so components re-render on language change
export const useI18n = useTranslation;

export default i18n;


