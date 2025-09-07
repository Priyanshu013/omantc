import React from 'react';
import './index.css';
import { HashRouter, Routes, Route, Link, useNavigate } from 'react-router-dom';
import './i18n';
import { useI18n } from './i18n';
import { ArrowRightIcon, HomeIcon } from './icons';
import QRCode from 'qrcode';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

const FALLBACK_IMG = 'https://images.unsplash.com/photo-1491553895911-0055eca6402d?q=80&w=1200&auto=format&fit=crop';

function ImageWithFallback({ src, alt, className }) {
  const [errSrc, setErrSrc] = React.useState(null);
  return (
    <img className={className} alt={alt || ''} src={errSrc || src || FALLBACK_IMG} onError={() => setErrSrc(FALLBACK_IMG)} />
  );
}

function LanguageSelector() {
  const { i18n } = useI18n();
  
  return (
    <div className="lang-selector">
      <button 
        className={`lang-btn ${i18n.language === 'en' ? 'active' : ''}`} 
        onClick={() => i18n.changeLanguage('en')}
      >
        English
      </button>
      <button 
        className={`lang-btn ${i18n.language === 'ar' ? 'active' : ''}`} 
        onClick={() => i18n.changeLanguage('ar')}
      >
        العربية
      </button>
    </div>
  );
}

function Home() {
  const { t, i18n } = useI18n();
  const navigate = useNavigate();
  const isArabic = i18n.language === 'ar';
  
  return (
    <div className="page home" dir={isArabic ? 'rtl' : 'ltr'}>
      <LanguageSelector />
      <div className="hero">
        <h1 className="hero__title">{t('appTitle')}</h1>
        <p className="hero__subtitle" dangerouslySetInnerHTML={{ __html: t('appSubtitle') }}></p>
        <div className="container">
          <div className="grid">
            <div className="card home-card">
              <div className="card__body">
                <h3 className="card__title">{t('cardTitle.heritage')}</h3>
                <p className="card__desc">{t('cardDesc.heritage')}</p>
              </div>
            </div>
            <div className="card home-card">
              <div className="card__body">
                <h3 className="card__title">{t('cardTitle.tradition')}</h3>
                <p className="card__desc">{t('cardDesc.tradition')}</p>
              </div>
            </div>
            <div className="card home-card">
              <div className="card__body">
                <h3 className="card__title">{t('cardTitle.wellness')}</h3>
                <p className="card__desc">{t('cardDesc.wellness')}</p>
              </div>
            </div>
            <div className="card home-card">
              <div className="card__body">
                <h3 className="card__title">{t('cardTitle.culture')}</h3>
                <p className="card__desc">{t('cardDesc.culture')}</p>
              </div>
            </div>
          </div>
          <button className="next-btn" onClick={() => navigate('/form')}>{t('cta.next')} →</button>
        </div>
      </div>
    </div>
  );
}

function SectionScaffold({ title, items }) {
  const navigate = useNavigate();
  const { i18n } = useI18n();
  const isArabic = i18n.language === 'ar';
  
  return (
    <div className={`page inner ${title === 'Heritage of Oman' ? 'heritage' : ''}`} dir={isArabic ? 'rtl' : 'ltr'}>
      <div className="container section">
        <h1 className="section__title">{title}</h1>
        <div className="grid">
          {items.map((item, idx) => (
            <div key={idx} className="card">
              <ImageWithFallback className="card__img" alt="" src={item.image} />
              <div className="card__overlay">
                <h3 className="card__title">{item.title}</h3>
                <button className="card__btn">Know more</button>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Home Button */}
      <button className="home-btn" onClick={() => navigate('/')}><HomeIcon /></button>
    </div>
  );
}

function Heritage() {
  const { t, i18n } = useI18n();
  const navigate = useNavigate();
  const [selectedItem, setSelectedItem] = React.useState(null);
  
  const items = [
    { 
      title: 'Nizwa Fort', 
      desc: '17th century fortress and UNESCO World Heritage site', 
      image: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0f/8a/1a/3e/nizwa-fort.jpg?w=1200&h=1200&s=1',
      description: "Nizwa Fort, completed in the 1650s under Imam Sultan Bin Saif Al Ya'rubi, stands over an underground spring. With a massive drum tower, deep foundations, and 360° cannon placements, it's Oman's most visited national monument.",
      funFact: "Despite its robust structure, the fort stands atop an underground stream, making the interior surprisingly cool—nature's air-conditioning!"
    },
    { 
      title: 'Bahla Fort', 
      desc: 'Ancient mud-brick fortress, UNESCO World Heritage', 
      image: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/16/c7/8a/72/festung-hisn-tamah.jpg?w=1200&h=1200&s=1',
      description: "Bahla Fort is a UNESCO World Heritage Site, built by the Banu Nebhan tribe between the 12th–15th centuries. Enclosed by a perimeter wall of 13 km, it exemplifies defensive oasis architecture.",
      funFact: "Locals say ghostly silhouettes are occasionally seen at night—so it tops the charts for 'spooky forts' in Oman!"
    },
    { 
      title: 'Aflaj Irrigation Systems', 
      desc: 'UNESCO ancient water management system', 
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/Aflaj_irrigation_systems_of_Oman_%28UNESCO_World_Heritage%29.jpg/1200px-Aflaj_irrigation_systems_of_Oman_%28UNESCO_World_Heritage%29.jpg',
      description: "The Aflaj are ancient underground water channels that have irrigated Oman's deserts for centuries. Recognized by UNESCO, many still supply water to villages even today.",
      funFact: "Some of these systems have been running for over 1,000 years—making them the world's longest continuously used irrigation networks!"
    },
    { 
      title: 'Jabrin Castle', 
      desc: 'Beautiful castle with intricate interiors', 
      image: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/05/ae/5f/e8/jibreen-castle.jpg?w=900&h=500&s=1',
      description: "Built in 1670 by Imam Bil'arab bin Sultan, Jabrin Castle is famed for its ornate interiors—wood-carved ceilings, painted stucco, and scholarly halls for medicine, theology, and astrology.",
      funFact: "Legend says one room is haunted by a scholar's restless spirit—who needs a nighttime visit to solve the mysteries within."
    },
    { 
      title: 'Al Baleed Archaeological Park', 
      desc: 'UNESCO World Heritage Site in Salalah', 
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Al_Balid_Archaeological_Park%2C_Salalah%2C_Oman.jpg/1200px-Al_Balid_Archaeological_Park%2C_Salalah%2C_Oman.jpg',
      description: "Al Baleed Archaeological Park was a flourishing port in the frankincense trade. Now part of a UNESCO site, visitors can explore ruins of mosques, walls, and the Frankincense Museum.",
      funFact: "Frankincense traded here was once worth its weight in gold—literally making Salalah one of the wealthiest ports in the ancient world."
    },
    { 
      title: 'Mutrah Corniche & Souq', 
      desc: 'Picturesque waterfront and traditional market', 
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8b/Mutrah_Corniche%2C_Muscat%2C_Oman.jpg/1200px-Mutrah_Corniche%2C_Muscat%2C_Oman.jpg',
      description: "Mutrah Corniche is a scenic seawall promenade in Muscat, home to one of the oldest souqs in the Arab world. It's alive with merchants, traditional crafts, and port views.",
      funFact: "A few souq shops are still owned by families that have run them for over five centuries—talk about heritage in action!"
    }
  ];
  
  return (
    <div className="page inner heritage" dir={i18n.language === 'ar' ? 'rtl' : 'ltr'}>
      <div className="container section">
        <h1 className="section__title">{t('nav.heritage')}</h1>
        <div className="grid">
          {items.map((item, idx) => (
            <div key={idx} className="card">
              <ImageWithFallback className="card__img" alt="" src={item.image} />
              <div className="card__overlay">
                <h3 className="card__title">{item.title}</h3>
                <button className="card__btn" onClick={() => setSelectedItem(item)}>Know more</button>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Home Button */}
      <button className="home-btn" onClick={() => navigate('/')}><HomeIcon /></button>
      
      {/* Modal */}
      {selectedItem && (
        <div className="modal-overlay" onClick={() => setSelectedItem(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setSelectedItem(null)}>×</button>
            <img className="modal-image" src={selectedItem.image} alt={selectedItem.title} />
            <h2 className="modal-title">{selectedItem.title}</h2>
            <div className="modal-description">
              <p className="modal-text">{selectedItem.description}</p>
            </div>
            <div className="modal-funfact">
              <h3 className="funfact-title">💡 Did you know?</h3>
              <p className="funfact-text">{selectedItem.funFact}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function Culture() {
  const { t, i18n } = useI18n();
  const navigate = useNavigate();
  const [selectedItem, setSelectedItem] = React.useState(null);
  
  const items = [
    { 
      title: 'Traditional Dress', 
      desc: 'Dishdasha, kumma and attire', 
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7a/Omani_men_in_traditional_dress%2C_Muscat%2C_Oman.jpg/1200px-Omani_men_in_traditional_dress%2C_Muscat%2C_Oman.jpg',
      description: "Omani traditional dress reflects the country's rich cultural heritage. The dishdasha (long white robe) and kumma (embroidered cap) are symbols of elegance and cultural identity, worn with pride by men across the country.",
      funFact: "The dishdasha is so iconic that it's been worn virtually unchanged for over 1,000 years—talk about timeless fashion!"
    },
    { 
      title: 'Trading Heritage', 
      desc: 'Muttrah Souq and maritime commerce', 
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/Muttrah_Souq%2C_Muscat%2C_Oman.jpg/1200px-Muttrah_Souq%2C_Muscat%2C_Oman.jpg',
      description: "Oman's trading heritage spans centuries, with Muttrah Souq being one of the oldest markets in the Arab world. The country's strategic location made it a crucial hub for maritime commerce and cultural exchange.",
      funFact: "Some souq merchants can trace their family businesses back over 500 years—making them living links to Oman's trading past!"
    },
    { 
      title: 'Festivals & Arts', 
      desc: 'Music, dance, cultural celebrations', 
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4a/Omani_traditional_dance_performance.jpg/1200px-Omani_traditional_dance_performance.jpg',
      description: "Omani festivals and arts showcase the country's vibrant cultural traditions. From traditional music and dance to contemporary celebrations, these events bring communities together and preserve cultural heritage.",
      funFact: "The Muscat Festival is so popular it attracts over 2 million visitors annually—Oman's version of a cultural supernova!"
    },
    { 
      title: 'Vision 2040', 
      desc: "Oman's future while honoring heritage", 
      image: 'https://www.omanobserver.om/omanobserver/uploads/images/2022/07/20/2058409.jpg',
      description: "Oman Vision 2040 represents the country's ambitious plan for sustainable development while preserving its rich cultural heritage. It balances modernization with traditional values and environmental conservation.",
      funFact: "Vision 2040 aims to make Oman one of the world's most sustainable countries—proving that progress and heritage can go hand in hand!"
    },
    { 
      title: 'Cuisine & Hospitality', 
      desc: 'Traditional flavors and warm welcome', 
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9b/Omani_traditional_food_spread.jpg/1200px-Omani_traditional_food_spread.jpg',
      description: "Omani cuisine reflects the country's diverse cultural influences and abundant natural resources. From aromatic biryanis to fresh seafood, Omani food is a celebration of flavors, spices, and traditional cooking methods.",
      funFact: "Omani hospitality is so legendary that guests are often treated like family—even strangers receive the warmest welcome!"
    },
    { 
      title: 'Language & Literature', 
      desc: 'Arabic poetry and storytelling traditions', 
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8c/Arabic_calligraphy_and_poetry%2C_Oman.jpg/1200px-Arabic_calligraphy_and_poetry%2C_Oman.jpg',
      description: "Oman's literary heritage includes rich traditions of Arabic poetry, storytelling, and oral history. These cultural expressions have been passed down through generations, preserving the country's linguistic and narrative traditions.",
      funFact: "Some Omani poets are so revered that their verses are still recited at weddings and celebrations centuries after their death!"
    }
  ];
  
  return (
    <div className="page inner culture" dir={i18n.language === 'ar' ? 'rtl' : 'ltr'}>
      <div className="container section">
        <h1 className="section__title">{t('nav.culture')}</h1>
        <div className="grid">
          {items.map((item, idx) => (
            <div key={idx} className="card">
              <ImageWithFallback className="card__img" alt="" src={item.image} />
              <div className="card__overlay">
                <h3 className="card__title">{item.title}</h3>
                <button className="card__btn" onClick={() => setSelectedItem(item)}>Know more</button>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Home Button */}
      <button className="home-btn" onClick={() => navigate('/')}><HomeIcon /></button>
      
      {/* Modal */}
      {selectedItem && (
        <div className="modal-overlay" onClick={() => setSelectedItem(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setSelectedItem(null)}>×</button>
            <img className="modal-image" src={selectedItem.image} alt={selectedItem.title} />
            <h2 className="modal-title">{selectedItem.title}</h2>
            <div className="modal-description">
              <p className="modal-text">{selectedItem.description}</p>
            </div>
            <div className="modal-funfact">
              <h3 className="funfact-title">💡 Did you know?</h3>
              <p className="funfact-text">{selectedItem.funFact}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function Dates() {
  const { t, i18n } = useI18n();
  const navigate = useNavigate();
  const [selectedItem, setSelectedItem] = React.useState(null);
  
  const items = [
    { 
      title: 'Khalas Dates', 
      desc: 'Caramel-like, prized in Oman', 
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8d/Khalas_dates_Oman_premium_variety.jpg/1200px-Khalas_dates_Oman_premium_variety.jpg',
      description: "Khalas dates are Oman's most prized variety, known for their caramel-like sweetness and soft texture. Grown primarily in the Al Batinah region, they're considered the 'king of dates' in Omani culture.",
      funFact: "Khalas dates are so revered that they're often used as gifts during Ramadan and special occasions—Oman's version of luxury chocolate!"
    },
    { 
      title: 'Fard Dates', 
      desc: 'Firm texture, rich sweetness', 
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9c/Fard_dates_Oman_firm_texture.jpg/1200px-Fard_dates_Oman_firm_texture.jpg',
      description: "Fard dates are known for their firm texture and rich, concentrated sweetness. These dates are perfect for cooking and are often used in traditional Omani desserts and savory dishes.",
      funFact: "Fard dates are so firm they can be stored for months without refrigeration—nature's perfect snack for desert travelers!"
    },
    { 
      title: 'Naghal Dates', 
      desc: 'Golden and soft', 
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a1/Naghal_dates_Oman_golden_soft.jpg/1200px-Naghal_dates_Oman_golden_soft.jpg',
      description: "Naghal dates are distinguished by their golden color and exceptionally soft texture. These premium dates are often served to guests as a symbol of Omani hospitality and generosity.",
      funFact: "Naghal dates are so soft they practically melt in your mouth—earning them the nickname 'butter dates' among locals!"
    },
    { 
      title: 'Madina Dates', 
      desc: 'Dark and syrupy', 
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/Madina_dates_Oman_dark_syrupy.jpg/1200px-Madina_dates_Oman_dark_syrupy.jpg',
      description: "Madina dates are known for their dark color and syrupy sweetness. These dates are rich in natural sugars and are often used in traditional Omani medicine and energy-boosting recipes.",
      funFact: "Madina dates are so sweet they were historically used as natural sweeteners before sugar became widely available—Oman's original candy!"
    },
    { 
      title: 'Khenaizi Dates', 
      desc: 'Reddish-brown, medium sweetness', 
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Khenaizi_dates_Oman_reddish_brown.jpg/1200px-Khenaizi_dates_Oman_reddish_brown.jpg',
      description: "Khenaizi dates are characterized by their reddish-brown color and balanced sweetness. These versatile dates are popular for both fresh consumption and in traditional Omani cooking.",
      funFact: "Khenaizi dates are often called 'the people's date' because they're affordable yet delicious—democracy in date form!"
    },
    { 
      title: 'Mabroom Dates', 
      desc: 'Elongated, premium quality', 
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d4/Mabroom_dates_Oman_elongated_premium.jpg/1200px-Mabroom_dates_Oman_elongated_premium.jpg',
      description: "Mabroom dates are prized for their elongated shape and premium quality. These dates are often exported and are considered one of Oman's finest agricultural products.",
      funFact: "Mabroom dates are so premium they're often given as diplomatic gifts—Oman's answer to fine wine!"
    }
  ];
  
  return (
    <div className="page inner tradition" dir={i18n.language === 'ar' ? 'rtl' : 'ltr'}>
      <div className="container section">
        <h1 className="section__title">{t('nav.dates')}</h1>
        <div className="grid">
          {items.map((item, idx) => (
            <div key={idx} className="card">
              <ImageWithFallback className="card__img" alt="" src={item.image} />
              <div className="card__overlay">
                <h3 className="card__title">{item.title}</h3>
                <button className="card__btn" onClick={() => setSelectedItem(item)}>Know more</button>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Home Button */}
      <button className="home-btn" onClick={() => navigate('/')}><HomeIcon /></button>
      
      {/* Modal */}
      {selectedItem && (
        <div className="modal-overlay" onClick={() => setSelectedItem(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setSelectedItem(null)}>×</button>
            <img className="modal-image" src={selectedItem.image} alt={selectedItem.title} />
            <h2 className="modal-title">{selectedItem.title}</h2>
            <div className="modal-description">
              <p className="modal-text">{selectedItem.description}</p>
            </div>
            <div className="modal-funfact">
              <h3 className="funfact-title">💡 Did you know?</h3>
              <p className="funfact-text">{selectedItem.funFact}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function Wellness() {
  const { t, i18n } = useI18n();
  const navigate = useNavigate();
  const [selectedItem, setSelectedItem] = React.useState(null);
  
  const items = [
    { 
      title: 'Frankincense Therapy', 
      desc: 'Boswellia sacra from Dhofar', 
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5b/Frankincense_trees_Dhofar_Oman.jpg/1200px-Frankincense_trees_Dhofar_Oman.jpg',
      description: "Frankincense from Dhofar's Boswellia sacra trees has been used for centuries in traditional Omani wellness practices. Its aromatic resin is believed to have healing properties for both body and mind.",
      funFact: "The frankincense trees in Dhofar are so precious that they're protected by law—Oman's version of a natural pharmacy!"
    },
    { 
      title: 'Traditional Healing', 
      desc: 'Ancient remedies and practices', 
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Traditional_healing_herbs_Oman.jpg/1200px-Traditional_healing_herbs_Oman.jpg',
      description: "Omani traditional healing combines herbal medicine, spiritual practices, and natural remedies passed down through generations. These holistic approaches focus on treating the whole person, not just symptoms.",
      funFact: "Some traditional healers in Oman can trace their knowledge back over 500 years—making them living medical libraries!"
    },
    { 
      title: 'Wadi Oases & Springs', 
      desc: 'Natural healing waters', 
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Wadi_Tiwi_Oman_natural_springs.jpg/1200px-Wadi_Tiwi_Oman_natural_springs.jpg',
      description: "Oman's wadis and natural springs are considered sacred healing places. The mineral-rich waters and serene environments provide natural therapy for both physical and mental wellness.",
      funFact: "Some wadi springs are believed to have healing properties—locals say a dip can cure everything from stress to skin conditions!"
    },
    { 
      title: 'Spa Traditions', 
      desc: 'Modern wellness inspired by heritage', 
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7b/Luxury_spa_Oman_traditional_treatments.jpg/1200px-Luxury_spa_Oman_traditional_treatments.jpg',
      description: "Modern Omani spas blend contemporary wellness techniques with traditional practices. Treatments often include frankincense, rose water, and other natural ingredients from Oman's rich heritage.",
      funFact: "Some luxury spas in Oman offer 'desert therapy' sessions—wellness meets adventure in the most unique way!"
    },
    { 
      title: 'Meditation & Mindfulness', 
      desc: 'Ancient practices for modern life', 
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6c/Desert_meditation_Oman_peaceful_landscape.jpg/1200px-Desert_meditation_Oman_peaceful_landscape.jpg',
      description: "Oman's peaceful landscapes and spiritual heritage make it an ideal destination for meditation and mindfulness practices. Many retreats offer traditional and modern approaches to mental wellness.",
      funFact: "The silence in Oman's deserts is so profound it's been measured as one of the quietest places on Earth—perfect for deep meditation!"
    },
    { 
      title: 'Natural Hot Springs', 
      desc: 'Thermal healing waters', 
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/Natural_hot_springs_Oman_therapeutic_waters.jpg/1200px-Natural_hot_springs_Oman_therapeutic_waters.jpg',
      description: "Oman's natural hot springs are rich in minerals and have been used for therapeutic purposes for centuries. These geothermal waters provide natural healing and relaxation experiences.",
      funFact: "Some hot springs in Oman are so hot they can cook eggs—nature's own wellness spa with built-in kitchen!"
    }
  ];
  
  return (
    <div className="page inner wellness" dir={i18n.language === 'ar' ? 'rtl' : 'ltr'}>
      <div className="container section">
        <h1 className="section__title">{t('nav.wellness')}</h1>
        <div className="grid">
          {items.map((item, idx) => (
            <div key={idx} className="card">
              <ImageWithFallback className="card__img" alt="" src={item.image} />
              <div className="card__overlay">
                <h3 className="card__title">{item.title}</h3>
                <button className="card__btn" onClick={() => setSelectedItem(item)}>Know more</button>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Home Button */}
      <button className="home-btn" onClick={() => navigate('/')}><HomeIcon /></button>
      
      {/* Modal */}
      {selectedItem && (
        <div className="modal-overlay" onClick={() => setSelectedItem(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setSelectedItem(null)}>×</button>
            <img className="modal-image" src={selectedItem.image} alt={selectedItem.title} />
            <h2 className="modal-title">{selectedItem.title}</h2>
            <div className="modal-description">
              <p className="modal-text">{selectedItem.description}</p>
            </div>
            <div className="modal-funfact">
              <h3 className="funfact-title">💡 Did you know?</h3>
              <p className="funfact-text">{selectedItem.funFact}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Progress Bar Component
function ProgressBar({ currentStep, totalSteps }) {
  const { t } = useI18n();
  // More intuitive progress: shows completion of previous steps
  const progress = ((currentStep - 1) / (totalSteps - 1)) * 100;
  
  return (
    <div className="progress-bar">
      <div className="progress-bar__container">
        <div className="progress-bar__fill" style={{ width: `${progress}%` }}></div>
      </div>
      <div className="progress-bar__steps">
        <span className={`progress-step ${currentStep > 1 ? 'completed' : currentStep === 1 ? 'active' : ''}`}>
          1. {t('progress.step1')}
        </span>
        <span className={`progress-step ${currentStep > 2 ? 'completed' : currentStep === 2 ? 'active' : ''}`}>
          2. {t('progress.step2')}
        </span>
        <span className={`progress-step ${currentStep > 3 ? 'completed' : currentStep === 3 ? 'active' : ''}`}>
          3. {t('progress.step3')}
        </span>
      </div>
    </div>
  );
}

// Form Component
function JourneyForm() {
  const { t, i18n } = useI18n();
  const navigate = useNavigate();
  const isArabic = i18n.language === 'ar';
  
  const [formData, setFormData] = React.useState({
    name: '',
    placesToVisit: [],
    traditionInterests: [],
    wellnessInterest: '',
    cultureInterests: [],
    daysToExplore: ''
  });
  
  const [isLoading, setIsLoading] = React.useState(false);
  const [showResults, setShowResults] = React.useState(false);
  const [toast, setToast] = React.useState(null);
  
  const placesOptions = [
    t('form.placesOptions.historicalSites'), t('form.placesOptions.touristAttractions'), t('form.placesOptions.natureLandscapes'), 
    t('form.placesOptions.pilgrimageSites'), t('form.placesOptions.beaches'), t('form.placesOptions.mountains'), t('form.placesOptions.culturalSites'), t('form.placesOptions.deserts')
  ];
  
  const traditionOptions = [
    t('form.traditionOptions.camelRacing'), t('form.traditionOptions.daggerCrafting'), t('form.traditionOptions.falajSystem'),
    t('form.traditionOptions.frankincenseProduction'), t('form.traditionOptions.qaranqasho'), t('form.traditionOptions.musicDance'),
    t('form.traditionOptions.hospitality'), t('form.traditionOptions.architecture')
  ];
  
  const cultureOptions = [
    t('form.cultureOptions.musicDance'), t('form.cultureOptions.souqsHandicrafts'), t('form.cultureOptions.cuisine'),
    t('form.cultureOptions.dhowHeritage'), t('form.cultureOptions.islamicFestivals'), t('form.cultureOptions.attire'),
    t('form.cultureOptions.muscatFestival'), t('form.cultureOptions.traditionalSports')
  ];
  
  const daysOptions = [
    t('form.daysOptions.short'),
    t('form.daysOptions.medium'),
    t('form.daysOptions.long'),
    t('form.daysOptions.comprehensive'),
    t('form.daysOptions.deep')
  ];
  
  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };
  
  const handleMultiSelect = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].includes(value) 
        ? prev[field].filter(item => item !== value)
        : [...prev[field], value]
    }));
  };
  
  const showToast = (message, type = 'error') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 5000);
  };

  const validateForm = () => {
    const errors = [];
    
    if (!formData.name.trim()) {
      errors.push(t('form.validation.nameRequired'));
    }
    
    if (formData.placesToVisit.length === 0) {
      errors.push(t('form.validation.placesRequired'));
    }
    
    if (formData.traditionInterests.length !== 4) {
      errors.push(t('form.validation.traditionRequired'));
    }
    
    if (!formData.wellnessInterest) {
      errors.push(t('form.validation.wellnessRequired'));
    }
    
    if (formData.cultureInterests.length !== 3) {
      errors.push(t('form.validation.cultureRequired'));
    }
    
    if (!formData.daysToExplore) {
      errors.push(t('form.validation.daysRequired'));
    }
    
    return errors;
  };

  const handleSubmit = async () => {
    const errors = validateForm();
    
    if (errors.length > 0) {
      showToast(errors.join('\n'), 'error');
      return;
    }
    
    setIsLoading(true);
    
    // Simulate AI processing
    setTimeout(() => {
      setIsLoading(false);
      setShowResults(true);
      
      // Update URL with form data for QR code sharing
      const formDataString = encodeURIComponent(JSON.stringify(formData));
      const resultsURL = `#/results?data=${formDataString}`;
      window.history.replaceState(null, '', resultsURL);
    }, 5500);
  };
  
  if (isLoading) {
    return (
      <div className="page form-page" dir={isArabic ? 'rtl' : 'ltr'}>
        <ProgressBar currentStep={2} totalSteps={3} />
        <div className="loading-container">
          <div className="loading-animation">
            <div className="loading-spinner"></div>
            <h2 className="loading-text">{t('form.loading')}</h2>
            <div className="loading-dots">
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  if (showResults) {
    return <JourneyGuide formData={formData} />;
  }
  
  return (
    <div className="page form-page" dir={isArabic ? 'rtl' : 'ltr'}>
      <ProgressBar currentStep={1} totalSteps={3} />
      
      {/* Form Header with Home Button */}
      <div className="form-header">
        <div className="back-to-home-container">
          <button className="back-to-home-btn" onClick={() => navigate('/')}>
            <HomeIcon />
          </button>
        </div>
      </div>
      
      <div className="form-container">
        <h1 className="form-title">{t('form.title')}</h1>
        
        <form className="journey-form">
          {/* Name Field */}
          <div className="form-group">
            <label className="form-label">{t('form.name')}</label>
            <input
              type="text"
              className="form-input"
              placeholder={t('form.namePlaceholder')}
              value={formData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
            />
          </div>
          
          {/* Places to Visit */}
          <div className="form-group">
            <label className="form-label">{t('form.placesToVisit')}</label>
            <div className="checkbox-group">
              {placesOptions.map((option, index) => (
                <label key={index} className="checkbox-label">
                  <input
                    type="checkbox"
                    checked={formData.placesToVisit.includes(option)}
                    onChange={() => handleMultiSelect('placesToVisit', option)}
                  />
                  <span className="checkbox-text">{option}</span>
                </label>
              ))}
            </div>
          </div>
          
          {/* Tradition Interests */}
          <div className="form-group">
            <label className="form-label">{t('form.traditionInterests')}</label>
            <div className="checkbox-group">
              {traditionOptions.map((option, index) => (
                <label key={index} className="checkbox-label">
                  <input
                    type="checkbox"
                    checked={formData.traditionInterests.includes(option)}
                    onChange={() => handleMultiSelect('traditionInterests', option)}
                    disabled={!formData.traditionInterests.includes(option) && formData.traditionInterests.length >= 4}
                  />
                  <span className="checkbox-text">{option}</span>
                </label>
              ))}
            </div>
            <p className="form-hint">Selected: {formData.traditionInterests.length}/4</p>
          </div>
          
          {/* Wellness Interest */}
          <div className="form-group">
            <label className="form-label">{t('form.wellnessInterest')}</label>
            <div className="radio-group">
              <label className="radio-label">
                <input
                  type="radio"
                  name="wellness"
                  value="yes"
                  checked={formData.wellnessInterest === 'yes'}
                  onChange={(e) => handleInputChange('wellnessInterest', e.target.value)}
                />
                <span className="radio-text">{t('form.yes')}</span>
              </label>
              <label className="radio-label">
                <input
                  type="radio"
                  name="wellness"
                  value="no"
                  checked={formData.wellnessInterest === 'no'}
                  onChange={(e) => handleInputChange('wellnessInterest', e.target.value)}
                />
                <span className="radio-text">{t('form.no')}</span>
              </label>
            </div>
          </div>
          
          {/* Culture Interests */}
          <div className="form-group">
            <label className="form-label">{t('form.cultureInterests')}</label>
            <div className="checkbox-group">
              {cultureOptions.map((option, index) => (
                <label key={index} className="checkbox-label">
                  <input
                    type="checkbox"
                    checked={formData.cultureInterests.includes(option)}
                    onChange={() => handleMultiSelect('cultureInterests', option)}
                    disabled={!formData.cultureInterests.includes(option) && formData.cultureInterests.length >= 3}
                  />
                  <span className="checkbox-text">{option}</span>
                </label>
              ))}
            </div>
            <p className="form-hint">Selected: {formData.cultureInterests.length}/3</p>
          </div>
          
          {/* Days to Explore */}
          <div className="form-group">
            <label className="form-label">{t('form.daysToExplore')}</label>
            <div className="radio-group">
              {daysOptions.map((option, index) => (
                <label key={index} className="radio-label">
                  <input
                    type="radio"
                    name="daysToExplore"
                    value={option}
                    checked={formData.daysToExplore === option}
                    onChange={(e) => handleInputChange('daysToExplore', e.target.value)}
                  />
                  <span className="radio-text">{option}</span>
                </label>
              ))}
            </div>
          </div>
          
          <button
            type="button"
            className="submit-btn"
            onClick={handleSubmit}
          >
            {t('form.askAI')}
          </button>
        </form>
      </div>
      
      {/* Toast Notification */}
      {toast && (
        <div className={`toast toast-${toast.type}`}>
          <div className="toast-content">
            <span className="toast-icon">
              {toast.type === 'error' ? '⚠️' : '✅'}
            </span>
            <span className="toast-message">{toast.message}</span>
            <button className="toast-close" onClick={() => setToast(null)}>×</button>
          </div>
        </div>
      )}
    </div>
  );
}

// Comprehensive Journey Guide Component
function JourneyGuide({ formData: propFormData }) {
  const { t, i18n } = useI18n();
  const navigate = useNavigate();
  const isArabic = i18n.language === 'ar';
  const [activeDay, setActiveDay] = React.useState(1);
  const [showQRCode, setShowQRCode] = React.useState(false);
  const [qrCodeDataURL, setQrCodeDataURL] = React.useState('');
  const [isMobile, setIsMobile] = React.useState(false);
  const [formData, setFormData] = React.useState(propFormData);
  const [isLoadingFromURL, setIsLoadingFromURL] = React.useState(true); // Start as true to prevent immediate redirect
  const [isGeneratingPDF, setIsGeneratingPDF] = React.useState(false);

  // Extract form data from URL parameters if available
  React.useEffect(() => {
    // For HashRouter, we need to parse the hash part of the URL
    const hash = window.location.hash;
    console.log('Current hash:', hash);
    
    // More robust parsing for mobile browsers
    const hashParts = hash.split('?');
    
    if (hashParts.length > 1) {
      const queryString = hashParts[1];
      const urlParams = new URLSearchParams(queryString);
      const dataParam = urlParams.get('data');
      
      console.log('Data param found:', !!dataParam);
      console.log('Mobile parameter:', urlParams.get('mobile'));
      
      if (dataParam && !propFormData) {
        try {
          const decodedData = JSON.parse(decodeURIComponent(dataParam));
          console.log('Successfully parsed form data:', decodedData);
          setFormData(decodedData);
          
          // Add a small delay for mobile browsers to ensure proper loading
          if (urlParams.get('mobile') === 'true') {
            setTimeout(() => {
              // Force a re-render for mobile browsers
              window.scrollTo(0, 0);
              setIsLoadingFromURL(false);
            }, 500);
          } else {
            setIsLoadingFromURL(false);
          }
        } catch (error) {
          console.error('Error parsing form data from URL:', error);
          setIsLoadingFromURL(false);
          // If there's an error, redirect to home
          navigate('/');
        }
      } else {
        // No data param found, stop loading
        setIsLoadingFromURL(false);
      }
    } else {
      // No query string found, stop loading
      setIsLoadingFromURL(false);
    }
  }, [propFormData, navigate]);

  // If no form data is available, redirect to home
  React.useEffect(() => {
    // Only check for redirect after we've finished loading from URL
    if (!isLoadingFromURL && (!formData || !formData.name)) {
      // Only redirect if we're not in the middle of loading data from URL
      if (!window.location.hash.includes('data=')) {
        navigate('/');
      }
    }
  }, [formData, navigate, isLoadingFromURL]);

  // Check if device is mobile
  React.useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Generate QR Code
  const generateQRCode = async () => {
    try {
      // Use the GitHub Pages URL with the current hash (which includes results data)
      const githubPagesURL = 'https://Priyanshu013.github.io/omantc/';
      const currentHash = window.location.hash; // This will be #/results?data=...
      
      // Ensure the URL is properly formatted for mobile browsers
      let fullURL = githubPagesURL + currentHash;
      
      // Add a fallback parameter to help with mobile loading
      if (fullURL.includes('?')) {
        fullURL += '&mobile=true';
      } else {
        fullURL += '?mobile=true';
      }
      
      console.log('Generating QR code for URL:', fullURL);
      
      const qrCodeURL = await QRCode.toDataURL(fullURL, {
        width: 300,
        margin: 2,
        color: {
          dark: '#8b4513',
          light: '#FFFFFF'
        },
        errorCorrectionLevel: 'M' // Medium error correction for better mobile scanning
      });
      setQrCodeDataURL(qrCodeURL);
      setShowQRCode(true);
    } catch (error) {
      console.error('Error generating QR code:', error);
    }
  };

  // Download as PDF
  const downloadPDF = async () => {
    setIsGeneratingPDF(true);
    
    try {
      const element = document.getElementById('journey-content');
      
      // Add PDF-specific styling temporarily
      const originalOverflow = element.style.overflow;
      const originalBackground = element.style.background;
      element.style.overflow = 'visible';
      element.style.background = '#ffffff';
      
      // Temporarily hide elements that don't work well in PDF
      const elementsToHide = element.querySelectorAll('.day-selector, .cta-buttons, .back-to-home-container, .lang-selector');
      elementsToHide.forEach(el => {
        el.style.display = 'none';
      });
      
      // Force all day details to be visible for PDF
      const dayDetails = element.querySelectorAll('.day-details');
      dayDetails.forEach(detail => {
        detail.style.display = 'block';
      });
      
      const canvas = await html2canvas(element, {
        scale: 3, // Increased scale for better quality
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#ffffff',
        logging: false,
        width: element.scrollWidth,
        height: element.scrollHeight,
        scrollX: 0,
        scrollY: 0,
        windowWidth: element.scrollWidth,
        windowHeight: element.scrollHeight,
        // Better font rendering
        foreignObjectRendering: true,
        // Remove shadows and effects that don't render well
        ignoreElements: (element) => {
          return element.classList.contains('day-selector') || 
                 element.classList.contains('cta-buttons') ||
                 element.classList.contains('back-to-home-container') ||
                 element.classList.contains('lang-selector');
        }
      });
      
      // Restore original styling
      element.style.overflow = originalOverflow;
      element.style.background = originalBackground;
      elementsToHide.forEach(el => {
        el.style.display = '';
      });
      
      const imgData = canvas.toDataURL('image/png', 1.0); // Maximum quality
      const pdf = new jsPDF('p', 'mm', 'a4');
      
      // Better page dimensions and margins
      const pageWidth = 210;
      const pageHeight = 297;
      const margin = 10;
      const contentWidth = pageWidth - (margin * 2);
      const contentHeight = pageHeight - (margin * 2);
      
      const imgWidth = contentWidth;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      
      let position = margin;
      let heightLeft = imgHeight;
      
      // Add first page
      pdf.addImage(imgData, 'PNG', margin, position, imgWidth, imgHeight);
      heightLeft -= contentHeight;
      
      // Add additional pages if needed
      while (heightLeft >= 0) {
        pdf.addPage();
        position = margin - (imgHeight - heightLeft);
        pdf.addImage(imgData, 'PNG', margin, position, imgWidth, imgHeight);
        heightLeft -= contentHeight;
      }
      
      // Add metadata
      pdf.setProperties({
        title: `Oman Journey Guide - ${formData.name || 'Your Journey'}`,
        subject: 'Personalized Oman Travel Guide',
        author: 'Oman Tourism Companion',
        creator: 'Oman Tourism Companion App'
      });
      
      pdf.save(`Oman-Journey-Guide-${formData.name || 'Your'}.pdf`);
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('There was an error generating the PDF. Please try again.');
    } finally {
      setIsGeneratingPDF(false);
    }
  };
  
  // Get itinerary based on selected days
  const getItinerary = () => {
    if (!formData || !formData.daysToExplore) {
      return getFullItinerary(); // Default fallback
    }
    
    const selectedDays = formData.daysToExplore;
    
    if (selectedDays.includes('3-4 Days')) {
      return getShortItinerary();
    } else if (selectedDays.includes('5-6 Days')) {
      return getMediumItinerary();
    } else if (selectedDays.includes('7-8 Days')) {
      return getFullItinerary();
    } else if (selectedDays.includes('10-12 Days')) {
      return getExtendedItinerary();
    } else if (selectedDays.includes('14+ Days')) {
      return getComprehensiveItinerary();
    }
    
    // Default to 7-day itinerary
    return getFullItinerary();
  };
  
  // 3-4 Day Weekend Getaway Itinerary
  const getShortItinerary = () => [
    {
      day: 1,
      title: "Arrival in Muscat - Gateway to Oman",
      location: "Muscat",
      duration: "Full Day",
      highlights: [
        "Arrive at Muscat International Airport",
        "Check into hotel in Muscat",
        "Visit Sultan Qaboos Grand Mosque",
        "Explore Mutrah Corniche and Souq",
        "Sunset at Al Alam Palace"
      ],
      activities: [
        {
          time: "Morning",
          activity: "Airport Arrival & Hotel Check-in",
          description: "Arrive at Muscat International Airport. Complete immigration and customs. Transfer to your hotel in Muscat city center.",
          tips: "Book airport transfer in advance. Most hotels offer this service.",
          image: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9d/Muscat_International_Airport_Oman.jpg/1200px-Muscat_International_Airport_Oman.jpg"
        },
        {
          time: "Afternoon",
          activity: "Sultan Qaboos Grand Mosque",
          description: "Visit one of the most beautiful mosques in the world. Marvel at the intricate Islamic architecture and the world's second-largest hand-woven carpet.",
          tips: "Dress modestly. Women need to cover hair. Open 8 AM - 11 AM (except Fridays).",
          image: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/Sultan_Qaboos_Grand_Mosque_Muscat_Oman.jpg/1200px-Sultan_Qaboos_Grand_Mosque_Muscat_Oman.jpg"
        },
        {
          time: "Evening",
          activity: "Mutrah Corniche & Souq",
          description: "Stroll along the picturesque waterfront and explore the traditional souq. Experience local culture and shop for souvenirs.",
          tips: "Best time to visit is late afternoon. Bargain for prices in the souq.",
          image: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8b/Mutrah_Corniche%2C_Muscat%2C_Oman.jpg/1200px-Mutrah_Corniche%2C_Muscat%2C_Oman.jpg"
        }
      ],
      accommodation: "Luxury: The Chedi Muscat | Mid-range: Grand Hyatt Muscat | Budget: City Seasons Hotel",
      transportation: "Private car with driver or taxi",
      meals: "Traditional Omani dinner at Bait Al Luban restaurant"
    },
    {
      day: 2,
      title: "Nizwa Heritage & Fort",
      location: "Nizwa",
      duration: "Full Day",
      highlights: [
        "Explore Nizwa Fort",
        "Visit Nizwa Souq",
        "Traditional Omani lunch",
        "Return to Muscat"
      ],
      activities: [
        {
          time: "Morning",
          activity: "Nizwa Fort & Souq",
          description: "Visit the 17th-century Nizwa Fort, Oman's most visited national monument. Explore the traditional souq famous for silver jewelry and pottery.",
          tips: "Arrive early to avoid crowds. The fort offers panoramic views from the top.",
          image: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0f/8a/1a/3e/nizwa-fort.jpg?w=1200&h=1200&s=1"
        },
        {
          time: "Afternoon",
          activity: "Traditional Lunch & Return",
          description: "Enjoy a traditional Omani lunch at a local restaurant before returning to Muscat.",
          tips: "Try the local biryani and fresh dates. Book return transport in advance.",
          image: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/Sultan_Qaboos_Grand_Mosque_Muscat_Oman.jpg/1200px-Sultan_Qaboos_Grand_Mosque_Muscat_Oman.jpg"
        }
      ],
      accommodation: "Return to Muscat hotel",
      transportation: "Private car (2-hour drive each way)",
      meals: "Traditional Omani lunch at Nizwa Heritage Inn"
    },
    {
      day: 3,
      title: "Wahiba Sands Desert Experience",
      location: "Wahiba Sands",
      duration: "Full Day",
      highlights: [
        "Desert safari experience",
        "Camel riding",
        "Traditional dinner under stars",
        "Return to Muscat"
      ],
      activities: [
        {
          time: "Morning",
          activity: "Desert Safari to Wahiba Sands",
          description: "Drive to the golden dunes of Wahiba Sands. Experience the vast desert landscape and traditional Bedouin lifestyle.",
          tips: "Bring sunscreen and sunglasses. The desert can be very hot during the day.",
          image: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/Wahiba_Sands_Oman_desert_dunes.jpg/1200px-Wahiba_Sands_Oman_desert_dunes.jpg"
        },
        {
          time: "Afternoon",
          activity: "Camel Riding & Desert Activities",
          description: "Enjoy camel riding across the dunes. Try sandboarding and experience traditional Bedouin hospitality.",
          tips: "Wear comfortable clothes and closed shoes. Bring a camera for amazing photos.",
          image: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/Sultan_Qaboos_Grand_Mosque_Muscat_Oman.jpg/1200px-Sultan_Qaboos_Grand_Mosque_Muscat_Oman.jpg"
        },
        {
          time: "Evening",
          activity: "Traditional Dinner & Return",
          description: "Enjoy a traditional dinner under the stars before returning to Muscat.",
          tips: "Evenings can be cool, bring a light jacket. The stars are incredible in the desert.",
          image: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/Wahiba_Sands_Oman_desert_dunes.jpg/1200px-Wahiba_Sands_Oman_desert_dunes.jpg"
        }
      ],
      accommodation: "Return to Muscat hotel",
      transportation: "4WD vehicle for desert safari",
      meals: "Traditional Bedouin dinner with live music"
    },
    {
      day: 4,
      title: "Departure from Muscat",
      location: "Muscat",
      duration: "Half Day",
      highlights: [
        "Last-minute shopping",
        "Airport departure",
        "Farewell to Oman"
      ],
      activities: [
        {
          time: "Morning",
          activity: "Final Shopping & Departure",
          description: "Use the morning for last-minute shopping and sightseeing before your departure flight.",
          tips: "Check flight times and allow extra time for airport procedures.",
          image: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9d/Muscat_International_Airport_Oman.jpg/1200px-Muscat_International_Airport_Oman.jpg"
        }
      ],
      accommodation: "N/A - Departure day",
      transportation: "Airport transfer",
      meals: "Airport lounge or in-flight meal"
    }
  ];
  
  // 5-6 Day Extended Weekend Itinerary
  const getMediumItinerary = () => [
    {
      day: 1,
      title: "Arrival in Muscat - Gateway to Oman",
      location: "Muscat",
      duration: "Full Day",
      highlights: [
        "Arrive at Muscat International Airport",
        "Check into hotel in Muscat",
        "Visit Sultan Qaboos Grand Mosque",
        "Explore Mutrah Corniche and Souq",
        "Sunset at Al Alam Palace"
      ],
      activities: [
        {
          time: "Morning",
          activity: "Airport Arrival & Hotel Check-in",
          description: "Arrive at Muscat International Airport. Complete immigration and customs. Transfer to your hotel in Muscat city center.",
          tips: "Book airport transfer in advance. Most hotels offer this service.",
          image: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9d/Muscat_International_Airport_Oman.jpg/1200px-Muscat_International_Airport_Oman.jpg"
        },
        {
          time: "Afternoon",
          activity: "Sultan Qaboos Grand Mosque",
          description: "Visit one of the most beautiful mosques in the world. Marvel at the intricate Islamic architecture and the world's second-largest hand-woven carpet.",
          tips: "Dress modestly. Women need to cover hair. Open 8 AM - 11 AM (except Fridays).",
          image: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/Sultan_Qaboos_Grand_Mosque_Muscat_Oman.jpg/1200px-Sultan_Qaboos_Grand_Mosque_Muscat_Oman.jpg"
        },
        {
          time: "Evening",
          activity: "Mutrah Corniche & Souq",
          description: "Stroll along the picturesque waterfront and explore the traditional souq. Experience local culture and shop for souvenirs.",
          tips: "Best time to visit is late afternoon. Bargain for prices in the souq.",
          image: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8b/Mutrah_Corniche%2C_Muscat%2C_Oman.jpg/1200px-Mutrah_Corniche%2C_Muscat%2C_Oman.jpg"
        }
      ],
      accommodation: "Luxury: The Chedi Muscat | Mid-range: Grand Hyatt Muscat | Budget: City Seasons Hotel",
      transportation: "Private car with driver or taxi",
      meals: "Traditional Omani dinner at Bait Al Luban restaurant"
    },
    {
      day: 2,
      title: "Nizwa Heritage & Fort",
      location: "Nizwa",
      duration: "Full Day",
      highlights: [
        "Explore Nizwa Fort",
        "Visit Nizwa Souq",
        "Traditional Omani lunch",
        "Jabrin Castle tour",
        "Return to Muscat"
      ],
      activities: [
        {
          time: "Morning",
          activity: "Nizwa Fort & Souq",
          description: "Visit the 17th-century Nizwa Fort, Oman's most visited national monument. Explore the traditional souq famous for silver jewelry and pottery.",
          tips: "Arrive early to avoid crowds. The fort offers panoramic views from the top.",
          image: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0f/8a/1a/3e/nizwa-fort.jpg?w=1200&h=1200&s=1"
        },
        {
          time: "Afternoon",
          activity: "Jabrin Castle",
          description: "Explore the beautiful Jabrin Castle with its ornate interiors, wood-carved ceilings, and scholarly halls.",
          tips: "Guided tours available. Photography allowed in most areas.",
          image: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/Sultan_Qaboos_Grand_Mosque_Muscat_Oman.jpg/1200px-Sultan_Qaboos_Grand_Mosque_Muscat_Oman.jpg"
        }
      ],
      accommodation: "Return to Muscat hotel",
      transportation: "Private car (2-hour drive each way)",
      meals: "Traditional Omani lunch at Nizwa Heritage Inn"
    },
    {
      day: 3,
      title: "Wahiba Sands Desert Adventure",
      location: "Wahiba Sands",
      duration: "Full Day",
      highlights: [
        "Desert safari experience",
        "Camel riding",
        "Bedouin camp stay",
        "Traditional dinner under stars",
        "Sunrise in the desert"
      ],
      activities: [
        {
          time: "Morning",
          activity: "Desert Safari to Wahiba Sands",
          description: "Drive to the golden dunes of Wahiba Sands. Experience the vast desert landscape and traditional Bedouin lifestyle.",
          tips: "Bring sunscreen and sunglasses. The desert can be very hot during the day.",
          image: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/Wahiba_Sands_Oman_desert_dunes.jpg/1200px-Wahiba_Sands_Oman_desert_dunes.jpg"
        },
        {
          time: "Afternoon",
          activity: "Camel Riding & Desert Activities",
          description: "Enjoy camel riding across the dunes. Try sandboarding and experience traditional Bedouin hospitality.",
          tips: "Wear comfortable clothes and closed shoes. Bring a camera for amazing photos.",
          image: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/Sultan_Qaboos_Grand_Mosque_Muscat_Oman.jpg/1200px-Sultan_Qaboos_Grand_Mosque_Muscat_Oman.jpg"
        },
        {
          time: "Evening",
          activity: "Bedouin Camp & Stargazing",
          description: "Stay overnight in a traditional Bedouin camp. Enjoy a traditional dinner and stargazing in the clear desert sky.",
          tips: "Evenings can be cool, bring a light jacket. The stars are incredible in the desert.",
          image: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/Wahiba_Sands_Oman_desert_dunes.jpg/1200px-Wahiba_Sands_Oman_desert_dunes.jpg"
        }
      ],
      accommodation: "Desert Nights Camp or similar Bedouin camp",
      transportation: "4WD vehicle for desert safari",
      meals: "Traditional Bedouin dinner with live music"
    },
    {
      day: 4,
      title: "Sur & Wadi Shab - Coastal Beauty",
      location: "Sur & Wadi Shab",
      duration: "Full Day",
      highlights: [
        "Traditional dhow building",
        "Wadi Shab exploration",
        "Swimming in natural pools",
        "Coastal drive",
        "Return to Muscat"
      ],
      activities: [
        {
          time: "Morning",
          activity: "Sur Dhow Building Yard",
          description: "Visit the traditional dhow building yard in Sur. See craftsmen building these traditional boats using age-old techniques.",
          tips: "Best visited in the morning when craftsmen are most active. Photography is usually allowed.",
          image: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/Sultan_Qaboos_Grand_Mosque_Muscat_Oman.jpg/1200px-Sultan_Qaboos_Grand_Mosque_Muscat_Oman.jpg"
        },
        {
          time: "Afternoon",
          activity: "Wadi Shab Adventure",
          description: "Hike through the stunning Wadi Shab canyon to reach hidden waterfalls and natural swimming pools.",
          tips: "Bring swimwear and water shoes. The hike takes about 45 minutes each way.",
          image: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/Wahiba_Sands_Oman_desert_dunes.jpg/1200px-Wahiba_Sands_Oman_desert_dunes.jpg"
        }
      ],
      accommodation: "Return to Muscat hotel",
      transportation: "Private car (3-hour drive each way)",
      meals: "Fresh seafood lunch in Sur"
    },
    {
      day: 5,
      title: "Muscat City Tour & Departure",
      location: "Muscat",
      duration: "Half Day",
      highlights: [
        "Al Alam Palace",
        "Royal Opera House",
        "Last-minute shopping",
        "Airport departure"
      ],
      activities: [
        {
          time: "Morning",
          activity: "City Tour & Final Shopping",
          description: "Visit Al Alam Palace and Royal Opera House. Use remaining time for last-minute shopping before departure.",
          tips: "Check flight times and allow extra time for airport procedures.",
          image: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9d/Muscat_International_Airport_Oman.jpg/1200px-Muscat_International_Airport_Oman.jpg"
        }
      ],
      accommodation: "N/A - Departure day",
      transportation: "Airport transfer",
      meals: "Airport lounge or in-flight meal"
    }
  ];
  
  // 7-8 Day Full Week Itinerary (Original comprehensive itinerary)
  const getFullItinerary = () => [
    {
      day: 1,
      title: "Arrival in Muscat - Gateway to Oman",
      location: "Muscat",
      duration: "Full Day",
      highlights: [
        "Arrive at Muscat International Airport",
        "Check into hotel in Muscat",
        "Visit Sultan Qaboos Grand Mosque",
        "Explore Mutrah Corniche and Souq",
        "Sunset at Al Alam Palace"
      ],
      activities: [
        {
          time: "Morning",
          activity: "Airport Arrival & Hotel Check-in",
          description: "Arrive at Muscat International Airport. Complete immigration and customs. Transfer to your hotel in Muscat city center.",
          tips: "Book airport transfer in advance. Most hotels offer this service.",
          image: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9d/Muscat_International_Airport_Oman.jpg/1200px-Muscat_International_Airport_Oman.jpg"
        },
        {
          time: "Afternoon",
          activity: "Sultan Qaboos Grand Mosque",
          description: "Visit one of the most beautiful mosques in the world. Marvel at the intricate Islamic architecture and the world's second-largest hand-woven carpet.",
          tips: "Dress modestly. Women need to cover hair. Open 8 AM - 11 AM (except Fridays).",
          image: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/Sultan_Qaboos_Grand_Mosque_Muscat_Oman.jpg/1200px-Sultan_Qaboos_Grand_Mosque_Muscat_Oman.jpg"
        },
        {
          time: "Evening",
          activity: "Mutrah Corniche & Souq",
          description: "Stroll along the picturesque waterfront and explore the traditional souq. Experience local culture and shop for souvenirs.",
          tips: "Best time to visit is late afternoon. Bargain for prices in the souq.",
          image: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8b/Mutrah_Corniche%2C_Muscat%2C_Oman.jpg/1200px-Mutrah_Corniche%2C_Muscat%2C_Oman.jpg"
        }
      ],
      accommodation: "Luxury: The Chedi Muscat | Mid-range: Grand Hyatt Muscat | Budget: City Seasons Hotel",
      transportation: "Private car with driver or taxi",
      meals: "Traditional Omani dinner at Bait Al Luban restaurant"
    },
    {
      day: 2,
      title: "Nizwa - Heart of Heritage",
      location: "Nizwa",
      duration: "Full Day",
      highlights: [
        "Explore Nizwa Fort",
        "Visit Nizwa Souq",
        "Traditional Omani lunch",
        "Jabrin Castle tour",
        "Return to Muscat"
      ],
      activities: [
        {
          time: "Morning",
          activity: "Nizwa Fort & Souq",
          description: "Visit the 17th-century Nizwa Fort, Oman's most visited national monument. Explore the traditional souq famous for silver jewelry and pottery.",
          tips: "Arrive early to avoid crowds. The fort offers panoramic views from the top.",
          image: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0f/8a/1a/3e/nizwa-fort.jpg?w=1200&h=1200&s=1"
        },
        {
          time: "Afternoon",
          activity: "Jabrin Castle",
          description: "Explore the beautiful Jabrin Castle with its ornate interiors, wood-carved ceilings, and scholarly halls.",
          tips: "Guided tours available. Photography allowed in most areas.",
          image: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/Sultan_Qaboos_Grand_Mosque_Muscat_Oman.jpg/1200px-Sultan_Qaboos_Grand_Mosque_Muscat_Oman.jpg"
        }
      ],
      accommodation: "Return to Muscat hotel",
      transportation: "Private car (2-hour drive each way)",
      meals: "Traditional Omani lunch at Nizwa Heritage Inn"
    },
    {
      day: 3,
      title: "Wahiba Sands - Desert Adventure",
      location: "Wahiba Sands",
      duration: "Full Day",
      highlights: [
        "Desert safari experience",
        "Camel riding",
        "Bedouin camp stay",
        "Traditional dinner under stars",
        "Sunrise in the desert"
      ],
      activities: [
        {
          time: "Morning",
          activity: "Desert Safari to Wahiba Sands",
          description: "Drive to the golden dunes of Wahiba Sands. Experience the vast desert landscape and traditional Bedouin lifestyle.",
          tips: "Bring sunscreen and sunglasses. The desert can be very hot during the day.",
          image: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/Wahiba_Sands_Oman_desert_dunes.jpg/1200px-Wahiba_Sands_Oman_desert_dunes.jpg"
        },
        {
          time: "Afternoon",
          activity: "Camel Riding & Desert Activities",
          description: "Enjoy camel riding across the dunes. Try sandboarding and experience traditional Bedouin hospitality.",
          tips: "Wear comfortable clothes and closed shoes. Bring a camera for amazing photos.",
          image: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/Sultan_Qaboos_Grand_Mosque_Muscat_Oman.jpg/1200px-Sultan_Qaboos_Grand_Mosque_Muscat_Oman.jpg"
        },
        {
          time: "Evening",
          activity: "Bedouin Camp & Stargazing",
          description: "Stay overnight in a traditional Bedouin camp. Enjoy a traditional dinner and stargazing in the clear desert sky.",
          tips: "Evenings can be cool, bring a light jacket. The stars are incredible in the desert.",
          image: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/Wahiba_Sands_Oman_desert_dunes.jpg/1200px-Wahiba_Sands_Oman_desert_dunes.jpg"
        }
      ],
      accommodation: "Desert Nights Camp or similar Bedouin camp",
      transportation: "4WD vehicle for desert safari",
      meals: "Traditional Bedouin dinner with live music"
    },
    {
      day: 4,
      title: "Sur & Wadi Shab - Coastal Beauty",
      location: "Sur & Wadi Shab",
      duration: "Full Day",
      highlights: [
        "Traditional dhow building",
        "Wadi Shab exploration",
        "Swimming in natural pools",
        "Coastal drive",
        "Return to Muscat"
      ],
      activities: [
        {
          time: "Morning",
          activity: "Sur Dhow Building Yard",
          description: "Visit the traditional dhow building yard in Sur. See craftsmen building these traditional boats using age-old techniques.",
          tips: "Best visited in the morning when craftsmen are most active. Photography is usually allowed.",
          image: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/Sultan_Qaboos_Grand_Mosque_Muscat_Oman.jpg/1200px-Sultan_Qaboos_Grand_Mosque_Muscat_Oman.jpg"
        },
        {
          time: "Afternoon",
          activity: "Wadi Shab Adventure",
          description: "Hike through the stunning Wadi Shab canyon to reach hidden waterfalls and natural swimming pools.",
          tips: "Bring swimwear and water shoes. The hike takes about 45 minutes each way.",
          image: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/Wahiba_Sands_Oman_desert_dunes.jpg/1200px-Wahiba_Sands_Oman_desert_dunes.jpg"
        }
      ],
      accommodation: "Return to Muscat hotel",
      transportation: "Private car (3-hour drive each way)",
      meals: "Fresh seafood lunch in Sur"
    },
    {
      day: 5,
      title: "Salalah - Frankincense Capital",
      location: "Salalah",
      duration: "Full Day",
      highlights: [
        "Flight to Salalah",
        "Frankincense Museum",
        "Al Baleed Archaeological Park",
        "Traditional souq",
        "Beach relaxation"
      ],
      activities: [
        {
          time: "Morning",
          activity: "Flight to Salalah",
          description: "Take a domestic flight to Salalah, the capital of Dhofar region. Known for its unique climate and frankincense heritage.",
          tips: "Book flights in advance. Salalah has a different climate - cooler and more humid.",
          image: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9d/Muscat_International_Airport_Oman.jpg/1200px-Muscat_International_Airport_Oman.jpg"
        },
        {
          time: "Afternoon",
          activity: "Frankincense Heritage Tour",
          description: "Visit the Frankincense Museum and Al Baleed Archaeological Park. Learn about the ancient frankincense trade routes.",
          tips: "The museum has excellent English explanations. The archaeological park is a UNESCO World Heritage site.",
          image: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/Sultan_Qaboos_Grand_Mosque_Muscat_Oman.jpg/1200px-Sultan_Qaboos_Grand_Mosque_Muscat_Oman.jpg"
        }
      ],
      accommodation: "Luxury: Al Baleed Resort | Mid-range: Crowne Plaza Salalah | Budget: Salalah Gardens Hotel",
      transportation: "Domestic flight + local taxi",
      meals: "Traditional Dhofari cuisine at Al Mina restaurant"
    },
    {
      day: 6,
      title: "Dhofar Mountains & Springs",
      location: "Dhofar Region",
      duration: "Full Day",
      highlights: [
        "Mountain drive",
        "Natural springs",
        "Traditional villages",
        "Scenic viewpoints",
        "Cultural experiences"
      ],
      activities: [
        {
          time: "Morning",
          activity: "Dhofar Mountains Tour",
          description: "Explore the scenic Dhofar mountains. Visit traditional villages and natural springs. Experience the unique 'khareef' climate.",
          tips: "The mountains can be misty and cool. Bring a light jacket and camera.",
          image: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/Wahiba_Sands_Oman_desert_dunes.jpg/1200px-Wahiba_Sands_Oman_desert_dunes.jpg"
        },
        {
          time: "Afternoon",
          activity: "Natural Springs & Waterfalls",
          description: "Visit Ain Razat and other natural springs. Enjoy the lush greenery and cool mountain air.",
          tips: "Perfect for relaxation and photography. Some areas may require light hiking.",
          image: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/Sultan_Qaboos_Grand_Mosque_Muscat_Oman.jpg/1200px-Sultan_Qaboos_Grand_Mosque_Muscat_Oman.jpg"
        }
      ],
      accommodation: "Same hotel in Salalah",
      transportation: "4WD vehicle for mountain roads",
      meals: "Mountain picnic lunch with local specialties"
    },
    {
      day: 7,
      title: "Return to Muscat - Departure",
      location: "Muscat",
      duration: "Half Day",
      highlights: [
        "Flight back to Muscat",
        "Last-minute shopping",
        "Airport departure",
        "Farewell to Oman"
      ],
      activities: [
        {
          time: "Morning",
          activity: "Return Flight to Muscat",
          description: "Take the morning flight back to Muscat. Use the time for last-minute shopping and sightseeing.",
          tips: "Check flight times and allow extra time for airport procedures.",
          image: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9d/Muscat_International_Airport_Oman.jpg/1200px-Muscat_International_Airport_Oman.jpg"
        },
        {
          time: "Afternoon",
          activity: "Departure",
          description: "Transfer to Muscat International Airport for your departure flight. Take with you unforgettable memories of Oman.",
          tips: "Arrive at airport 3 hours before international flights. Keep your souvenirs and memories safe.",
          image: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/Sultan_Qaboos_Grand_Mosque_Muscat_Oman.jpg/1200px-Sultan_Qaboos_Grand_Mosque_Muscat_Oman.jpg"
        }
      ],
      accommodation: "N/A - Departure day",
      transportation: "Airport transfer",
      meals: "Airport lounge or in-flight meal"
    }
  ];
  
  // 10-12 Day Comprehensive Tour Itinerary
  const getExtendedItinerary = () => [
    ...getFullItinerary(),
    {
      day: 8,
      title: "Musandam Peninsula - Fjords of Arabia",
      location: "Musandam",
      duration: "Full Day",
      highlights: [
        "Dhow cruise in fjords",
        "Dolphin watching",
        "Snorkeling",
        "Traditional fishing villages"
      ],
      activities: [
        {
          time: "Morning",
          activity: "Dhow Cruise in Fjords",
          description: "Take a traditional dhow cruise through the stunning fjords of Musandam, often called the 'Norway of Arabia'.",
          tips: "Bring swimwear and camera. The fjords offer incredible photo opportunities.",
          image: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/Wahiba_Sands_Oman_desert_dunes.jpg/1200px-Wahiba_Sands_Oman_desert_dunes.jpg"
        }
      ],
      accommodation: "Luxury: Six Senses Zighy Bay | Mid-range: Atana Musandam | Budget: Local guesthouse",
      transportation: "Flight to Khasab + dhow cruise",
      meals: "Fresh seafood lunch on dhow"
    }
  ];
  
  // 14+ Day Deep Exploration Itinerary
  const getComprehensiveItinerary = () => [
    ...getExtendedItinerary(),
    {
      day: 9,
      title: "Jebel Akhdar - Green Mountain",
      location: "Jebel Akhdar",
      duration: "Full Day",
      highlights: [
        "Mountain hiking",
        "Rose gardens",
        "Traditional villages",
        "Cooler climate"
      ],
      activities: [
        {
          time: "Morning",
          activity: "Mountain Hiking",
          description: "Explore the cool mountains of Jebel Akhdar, known for its rose gardens and traditional villages.",
          tips: "Bring warm clothing. The mountains are much cooler than the coast.",
          image: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/Wahiba_Sands_Oman_desert_dunes.jpg/1200px-Wahiba_Sands_Oman_desert_dunes.jpg"
        }
      ],
      accommodation: "Luxury: Anantara Al Jabal Al Akhdar | Mid-range: Sahab Hotel | Budget: Local mountain lodge",
      transportation: "4WD vehicle (mountain roads)",
      meals: "Traditional mountain cuisine"
    }
  ];
  
  // Get the appropriate itinerary (will be called in render)
  
  // Get regions covered based on selected days
  const getRegionsCovered = () => {
    if (!formData || !formData.daysToExplore) {
      return "Muscat, Nizwa, Wahiba Sands, Sur, Salalah"; // Default fallback
    }
    
    const selectedDays = formData.daysToExplore;
    
    if (selectedDays.includes('3-4 Days')) {
      return "Muscat, Nizwa, Wahiba Sands";
    } else if (selectedDays.includes('5-6 Days')) {
      return "Muscat, Nizwa, Wahiba Sands, Sur";
    } else if (selectedDays.includes('7-8 Days')) {
      return "Muscat, Nizwa, Wahiba Sands, Sur, Salalah";
    } else if (selectedDays.includes('10-12 Days')) {
      return "Muscat, Nizwa, Wahiba Sands, Sur, Salalah, Musandam";
    } else if (selectedDays.includes('14+ Days')) {
      return "Muscat, Nizwa, Wahiba Sands, Sur, Salalah, Musandam, Jebel Akhdar";
    }
    
    return "Muscat, Nizwa, Wahiba Sands, Sur, Salalah";
  };
  
  // Get budget estimate based on selected days
  const getBudgetEstimate = () => {
    if (!formData || !formData.daysToExplore) {
      return "Luxury: $2,500-4,000 | Mid-range: $1,500-2,500 | Budget: $800-1,500"; // Default fallback
    }
    
    const selectedDays = formData.daysToExplore;
    
    if (selectedDays.includes('3-4 Days')) {
      return "Luxury: $1,200-2,000 | Mid-range: $800-1,200 | Budget: $400-800";
    } else if (selectedDays.includes('5-6 Days')) {
      return "Luxury: $1,800-3,000 | Mid-range: $1,200-1,800 | Budget: $600-1,200";
    } else if (selectedDays.includes('7-8 Days')) {
      return "Luxury: $2,500-4,000 | Mid-range: $1,500-2,500 | Budget: $800-1,500";
    } else if (selectedDays.includes('10-12 Days')) {
      return "Luxury: $3,500-5,500 | Mid-range: $2,200-3,500 | Budget: $1,200-2,200";
    } else if (selectedDays.includes('14+ Days')) {
      return "Luxury: $4,500-7,000 | Mid-range: $2,800-4,500 | Budget: $1,500-2,800";
    }
    
    return "Luxury: $2,500-4,000 | Mid-range: $1,500-2,500 | Budget: $800-1,500";
  };

  const travelTips = [
    {
      category: "Best Time to Visit",
      tips: [
        "October to April: Best weather (20-30°C)",
        "Avoid summer months (May-September) - very hot (40°C+)",
        "Salalah: June-September for khareef season (monsoon-like weather)"
      ]
    },
    {
      category: "Transportation",
      tips: [
        "Rent a 4WD for desert and mountain areas",
        "Domestic flights connect Muscat-Salalah efficiently",
        "Taxis are readily available in cities",
        "Consider hiring a driver-guide for remote areas"
      ]
    },
    {
      category: "Cultural Etiquette",
      tips: [
        "Dress modestly, especially at religious sites",
        "Remove shoes before entering mosques",
        "Ask permission before photographing people",
        "Respect local customs and traditions"
      ]
    },
    {
      category: "Packing Essentials",
      tips: [
        "Lightweight, breathable clothing",
        "Sunscreen and sunglasses (essential!)",
        "Comfortable walking shoes",
        "Light jacket for evenings and mountains",
        "Swimwear for wadis and beaches"
      ]
    },
    {
      category: "Health & Safety",
      tips: [
        "Drink plenty of water (desert climate)",
        "Travel insurance recommended",
        "Oman is very safe for tourists",
        "Emergency number: 9999"
      ]
    }
  ];

  // Show loading state when loading from URL
  if (isLoadingFromURL) {
    return (
      <div className="page journey-guide" dir={isArabic ? 'rtl' : 'ltr'}>
        <ProgressBar currentStep={3} totalSteps={3} />
        <div className="loading-container">
          <div className="loading-animation">
            <div className="loading-spinner"></div>
            <h2 className="loading-text">Loading your journey guide...</h2>
            <div className="loading-dots">
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // If no form data and not loading, show error or redirect
  if (!formData || !formData.name) {
    return (
      <div className="page journey-guide" dir={isArabic ? 'rtl' : 'ltr'}>
        <ProgressBar currentStep={3} totalSteps={3} />
        <div className="loading-container">
          <div className="loading-animation">
            <h2 className="loading-text">No journey data found</h2>
            <p>Redirecting to home page...</p>
            <button 
              className="cta-btn secondary" 
              onClick={() => navigate('/')}
              style={{ marginTop: '20px' }}
            >
              Go to Home
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="page journey-guide" dir={isArabic ? 'rtl' : 'ltr'}>
      <ProgressBar currentStep={3} totalSteps={3} />
      
      {/* Journey Header with Home Button Only */}
      <div className="form-header">
        <div className="back-to-home-container">
          <button className="back-to-home-btn" onClick={() => navigate('/')}>
            <HomeIcon />
          </button>
        </div>
      </div>
      
      <div className="journey-container" id="journey-content">
        <div className="journey-header">
          <h1 className="journey-title">Your Complete Oman Journey Guide</h1>
          <p className="journey-subtitle">Hello {formData?.name || 'Traveler'}! Here's your personalized {(formData?.daysToExplore || '7-8 Days').toLowerCase()} exploration of Oman</p>
        </div>

        {/* Journey Overview */}
        <div className="journey-overview">
          <h2>🗺️ Journey Overview</h2>
          <div className="overview-grid">
            <div className="overview-card">
              <h3>Duration</h3>
              <p>{formData?.daysToExplore || '7-8 Days'}</p>
            </div>
            <div className="overview-card">
              <h3>Regions Covered</h3>
              <p>{getRegionsCovered()}</p>
            </div>
            <div className="overview-card">
              <h3>Best For</h3>
              <p>Culture, Heritage, Adventure, Nature</p>
            </div>
            <div className="overview-card">
              <h3>Difficulty</h3>
              <p>Moderate (some hiking involved)</p>
            </div>
          </div>
        </div>

        {/* Day-by-Day Itinerary */}
        <div className="itinerary-section">
          <h2>📅 Day-by-Day Itinerary</h2>
          <div className="day-selector">
            {getItinerary().map((day) => (
              <button
                key={day.day}
                className={`day-btn ${activeDay === day.day ? 'active' : ''}`}
                onClick={() => setActiveDay(day.day)}
              >
                Day {day.day}
              </button>
            ))}
          </div>

          {getItinerary().map((day) => (
            activeDay === day.day && (
              <div key={day.day} className="day-details">
                <div className="day-header">
                  <h3>Day {day.day}: {day.title}</h3>
                  <div className="day-meta">
                    <span className="location">📍 {day.location}</span>
                    <span className="duration">⏱️ {day.duration}</span>
                  </div>
                </div>

                <div className="day-highlights">
                  <h4>Today's Highlights:</h4>
                  <ul>
                    {day.highlights.map((highlight, index) => (
                      <li key={index}>{highlight}</li>
                    ))}
                  </ul>
                </div>

                <div className="activities-timeline">
                  {day.activities.map((activity, index) => (
                    <div key={index} className="activity-item">
                      <div className="activity-time">{activity.time}</div>
                      <div className="activity-content">
                        <h4>{activity.activity}</h4>
                        <p>{activity.description}</p>
                        <div className="activity-tip">
                          <strong>💡 Tip:</strong> {activity.tips}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="day-info">
                  <div className="info-card">
                    <h4>🏨 Accommodation</h4>
                    <p>{day.accommodation}</p>
                  </div>
                  <div className="info-card">
                    <h4>🚗 Transportation</h4>
                    <p>{day.transportation}</p>
                  </div>
                  <div className="info-card">
                    <h4>🍽️ Meals</h4>
                    <p>{day.meals}</p>
                  </div>
                </div>
              </div>
            )
          ))}
        </div>

        {/* Travel Tips */}
        <div className="travel-tips-section">
          <h2>💡 Essential Travel Tips</h2>
          <div className="tips-grid">
            {travelTips.map((category, index) => (
              <div key={index} className="tip-category">
                <h3>{category.category}</h3>
                <ul>
                  {category.tips.map((tip, tipIndex) => (
                    <li key={tipIndex}>{tip}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Budget Estimate */}
        <div className="budget-section">
          <h2>💰 Budget Estimate (Per Person)</h2>
          <div className="budget-grid">
            <div className="budget-item">
              <h4>Accommodation</h4>
              <p>Luxury: $200-400/night</p>
              <p>Mid-range: $80-150/night</p>
              <p>Budget: $40-80/night</p>
            </div>
            <div className="budget-item">
              <h4>Transportation</h4>
              <p>Car rental: $50-100/day</p>
              <p>Domestic flights: $150-250</p>
              <p>Taxis: $20-50/day</p>
            </div>
            <div className="budget-item">
              <h4>Food & Activities</h4>
              <p>Meals: $30-80/day</p>
              <p>Activities: $50-150/day</p>
              <p>Entrance fees: $10-30/day</p>
            </div>
            <div className="budget-item">
              <h4>Total Estimate</h4>
              <p>{getBudgetEstimate()}</p>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="journey-cta">
          <h2>Ready to Explore Oman?</h2>
          <p>This journey will take you through the heart of Omani culture, heritage, and natural beauty. Each day is carefully planned to give you the most authentic and memorable experience.</p>
          <div className="cta-buttons">
            {isMobile ? (
              <button 
                className="cta-btn secondary" 
                onClick={downloadPDF}
                disabled={isGeneratingPDF}
              >
                {isGeneratingPDF ? 'Generating PDF...' : 'Download as PDF'}
              </button>
            ) : (
              <button className="cta-btn secondary" onClick={generateQRCode}>
                Generate QR Code
              </button>
            )}
            <button className="cta-btn secondary" onClick={() => navigate('/')}>
              Back to Home
            </button>
          </div>
        </div>
      </div>


      {/* QR Code Modal */}
      {showQRCode && (
        <div className="qr-modal-overlay" onClick={() => setShowQRCode(false)}>
          <div className="qr-modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="qr-modal-close" onClick={() => setShowQRCode(false)}>×</button>
            <div className="qr-modal-header">
              <h3>Scan QR Code</h3>
              <p>Scan this QR code with your phone to view your journey guide</p>
            </div>
            <div className="qr-code-container">
              <img src={qrCodeDataURL} alt="QR Code" className="qr-code-image" />
            </div>
            <div className="qr-modal-footer">
              <p className="qr-instructions">
                📱 Open your phone's camera and point it at the QR code above
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/form" element={<JourneyForm />} />
        <Route path="/results" element={<JourneyGuide />} />
        <Route path="/heritage" element={<Heritage />} />
        <Route path="/dates" element={<Dates />} />
        <Route path="/wellness" element={<Wellness />} />
        <Route path="/culture" element={<Culture />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
