import i18n from 'i18next';
import { initReactI18next, useTranslation } from 'react-i18next';

const resources = {
  en: {
    translation: {
      appTitle: 'Welcome to Oman',
      appSubtitle: "I'm your AI Tourism & Culture Guide. Just tell me your preferences, and I will define a curated journey for you!",
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
      },
      form: {
        title: 'Tell us about your preferences',
        name: 'Name',
        namePlaceholder: 'Enter your name',
        placesToVisit: 'What kind of places would you like to visit?',
        traditionInterests: 'What interests you the most about Oman\'s tradition? (Pick 4 options)',
        wellnessInterest: 'Would you like to know about Omani Wellness?',
        cultureInterests: 'What interests you the most about Oman\'s culture? (Pick 3 options)',
        askAI: 'Start the journey',
        yes: 'Yes',
        no: 'No',
        loading: 'AI is curating the best results for you...',
        results: 'Your Curated Journey',
        placesOptions: {
          historicalSites: 'Historical Sites',
          touristAttractions: 'Tourist Attractions',
          natureLandscapes: 'Nature & Landscapes',
          pilgrimageSites: 'Pilgrimage Sites',
          beaches: 'Beaches',
          mountains: 'Mountains',
          culturalSites: 'Cultural Sites',
          deserts: 'Deserts'
        },
        traditionOptions: {
          camelRacing: 'Asayel Camel Racing',
          daggerCrafting: 'Khanjar Dagger Crafting',
          falajSystem: 'Falaj Irrigation System',
          frankincenseProduction: 'Frankincense Production',
          qaranqasho: 'Qaranqasho Celebration',
          musicDance: 'Traditional Music and Dance',
          hospitality: 'Omani Hospitality Traditions',
          architecture: 'Traditional Architecture'
        },
        cultureOptions: {
          musicDance: 'Traditional Music and Dance',
          souqsHandicrafts: 'Souqs and Handicrafts',
          cuisine: 'Omani Cuisine',
          dhowHeritage: 'Dhow Maritime Heritage',
          islamicFestivals: 'Islamic Festivals',
          attire: 'Omani Attire',
          muscatFestival: 'Muscat Festival',
          traditionalSports: 'Traditional Sports'
        }
      },
      progress: {
        step1: 'Preferences',
        step2: 'Processing',
        step3: 'Results'
      }
    }
  },
  ar: {
    translation: {
      appTitle: 'مرحباً بكم في عُمان',
      appSubtitle: 'أنا دليلك الذكي للسياحة والثقافة. فقط أخبرني باهتماماتك وسأقوم بتصميم رحلة مخصصة لك!',
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
      },
      form: {
        title: 'أخبرنا عن تفضيلاتك',
        name: 'الاسم',
        namePlaceholder: 'أدخل اسمك',
        placesToVisit: 'ما نوع الأماكن التي تود زيارتها؟',
        traditionInterests: 'ما الذي يثير اهتمامك أكثر في تقاليد عُمان؟ (اختر 4 خيارات)',
        wellnessInterest: 'هل تود معرفة عن العافية العُمانية؟',
        cultureInterests: 'ما الذي يثير اهتمامك أكثر في ثقافة عُمان؟ (اختر 3 خيارات)',
        askAI: 'ابدأ الرحلة',
        yes: 'نعم',
        no: 'لا',
        loading: 'الذكاء الاصطناعي يعد أفضل النتائج لك...',
        results: 'رحلتك المخصصة',
        placesOptions: {
          historicalSites: 'المواقع التاريخية',
          touristAttractions: 'المعالم السياحية',
          natureLandscapes: 'الطبيعة والمناظر الطبيعية',
          pilgrimageSites: 'الأماكن المقدسة',
          beaches: 'الشواطئ',
          mountains: 'الجبال',
          culturalSites: 'المواقع الثقافية',
          deserts: 'الصحاري'
        },
        traditionOptions: {
          camelRacing: 'سباق الإبل العسيل',
          daggerCrafting: 'صناعة الخنجر',
          falajSystem: 'نظام الفلج للري',
          frankincenseProduction: 'إنتاج اللبان',
          qaranqasho: 'احتفال قرقاشو',
          musicDance: 'الموسيقى والرقص التقليدي',
          hospitality: 'تقاليد الضيافة العُمانية',
          architecture: 'العمارة التقليدية'
        },
        cultureOptions: {
          musicDance: 'الموسيقى والرقص التقليدي',
          souqsHandicrafts: 'الأسواق والحرف اليدوية',
          cuisine: 'المطبخ العُماني',
          dhowHeritage: 'تراث الداو البحري',
          islamicFestivals: 'المهرجانات الإسلامية',
          attire: 'الزي العُماني',
          muscatFestival: 'مهرجان مسقط',
          traditionalSports: 'الرياضات التقليدية'
        }
      },
      progress: {
        step1: 'التفضيلات',
        step2: 'المعالجة',
        step3: 'النتائج'
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


