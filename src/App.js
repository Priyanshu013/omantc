import React from 'react';
import './index.css';
import { HashRouter, Routes, Route, Link, useNavigate } from 'react-router-dom';
import './i18n';
import { useI18n } from './i18n';
import { ArrowRightIcon } from './icons';

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
      <button className="lang-btn" onClick={() => i18n.changeLanguage('en')}>EN</button>
      <button className="lang-btn" onClick={() => i18n.changeLanguage('ar')}>ع</button>
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
        <p className="hero__subtitle">{t('appSubtitle')}</p>
        <div className="container">
          <div className="grid">
            <div className="card" onClick={() => navigate('/heritage')} role="button" tabIndex={0}>
              <div className="card__body">
                <h3 className="card__title">{t('cardTitle.heritage')}</h3>
                <p className="card__desc">{t('cardDesc.heritage')}</p>
              </div>
              <div className="card__arrow">
                <ArrowRightIcon />
              </div>
            </div>
            <div className="card" onClick={() => navigate('/dates')} role="button" tabIndex={0}>
              <div className="card__body">
                <h3 className="card__title">{t('cardTitle.tradition')}</h3>
                <p className="card__desc">{t('cardDesc.tradition')}</p>
              </div>
              <div className="card__arrow">
                <ArrowRightIcon />
              </div>
            </div>
            <div className="card" onClick={() => navigate('/wellness')} role="button" tabIndex={0}>
              <div className="card__body">
                <h3 className="card__title">{t('cardTitle.wellness')}</h3>
                <p className="card__desc">{t('cardDesc.wellness')}</p>
              </div>
              <div className="card__arrow">
                <ArrowRightIcon />
              </div>
            </div>
            <div className="card" onClick={() => navigate('/culture')} role="button" tabIndex={0}>
              <div className="card__body">
                <h3 className="card__title">{t('cardTitle.culture')}</h3>
                <p className="card__desc">{t('cardDesc.culture')}</p>
              </div>
              <div className="card__arrow">
                <ArrowRightIcon />
              </div>
            </div>
          </div>
          <button className="next-btn" onClick={() => navigate('/heritage')}>{t('cta.next')} →</button>
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
      <LanguageSelector />
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
      <button className="home-btn" onClick={() => navigate('/')}>⌂</button>
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
      image: 'https://images.pexels.com/photos/30833907/pexels-photo-30833907.jpeg?auto=compress&cs=tinysrgb&w=1200',
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
      image: 'https://media.istockphoto.com/id/1136146449/photo/aflaj-falaj-water-system-in-oman.jpg?s=612x612&w=0&k=20&c=2oU8I_lPztGG0QSzj8EM1ZqK_QUt0OMK0Mvy40uMXPQ=',
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
      image: 'https://upload.wikimedia.org/wikipedia/commons/c/cb/Al_Balid_Archeological_Park_5.jpg',
      description: "Al Baleed Archaeological Park was a flourishing port in the frankincense trade. Now part of a UNESCO site, visitors can explore ruins of mosques, walls, and the Frankincense Museum.",
      funFact: "Frankincense traded here was once worth its weight in gold—literally making Salalah one of the wealthiest ports in the ancient world."
    },
    { 
      title: 'Mutrah Corniche & Souq', 
      desc: 'Picturesque waterfront and traditional market', 
      image: 'https://media1.thrillophilia.com/filestore/7do8xa1heiw5c5384iyc0bkybbo3_10-5-20_Oman-banner-scaled.jpeg',
      description: "Mutrah Corniche is a scenic seawall promenade in Muscat, home to one of the oldest souqs in the Arab world. It's alive with merchants, traditional crafts, and port views.",
      funFact: "A few souq shops are still owned by families that have run them for over five centuries—talk about heritage in action!"
    }
  ];
  
  return (
    <div className="page inner heritage" dir={i18n.language === 'ar' ? 'rtl' : 'ltr'}>
      <LanguageSelector />
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
      <button className="home-btn" onClick={() => navigate('/')}>⌂</button>
      
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
      image: 'https://www.shutterstock.com/image-photo/arab-middleeastern-man-wearing-emirati-600nw-2373888367.jpg',
      description: "Omani traditional dress reflects the country's rich cultural heritage. The dishdasha (long white robe) and kumma (embroidered cap) are symbols of elegance and cultural identity, worn with pride by men across the country.",
      funFact: "The dishdasha is so iconic that it's been worn virtually unchanged for over 1,000 years—talk about timeless fashion!"
    },
    { 
      title: 'Trading Heritage', 
      desc: 'Muttrah Souq and maritime commerce', 
      image: 'https://a.travel-assets.com/findyours-php/viewfinder/images/res70/59000/59865-Muttrah-Souq.jpg',
      description: "Oman's trading heritage spans centuries, with Muttrah Souq being one of the oldest markets in the Arab world. The country's strategic location made it a crucial hub for maritime commerce and cultural exchange.",
      funFact: "Some souq merchants can trace their family businesses back over 500 years—making them living links to Oman's trading past!"
    },
    { 
      title: 'Festivals & Arts', 
      desc: 'Music, dance, cultural celebrations', 
      image: 'https://shabiba.eu-central-1.linodeobjects.com/2019/01/8/989238.jpg',
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
      image: 'https://res.cloudinary.com/ddjuftfy2/image/upload/f_webp,c_fill,q_auto/memphis/large/02fb692ff2031a37bfba9f3e7872fce4.jpg',
      description: "Omani cuisine reflects the country's diverse cultural influences and abundant natural resources. From aromatic biryanis to fresh seafood, Omani food is a celebration of flavors, spices, and traditional cooking methods.",
      funFact: "Omani hospitality is so legendary that guests are often treated like family—even strangers receive the warmest welcome!"
    },
    { 
      title: 'Language & Literature', 
      desc: 'Arabic poetry and storytelling traditions', 
      image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?q=80&w=1200&auto=format&fit=crop',
      description: "Oman's literary heritage includes rich traditions of Arabic poetry, storytelling, and oral history. These cultural expressions have been passed down through generations, preserving the country's linguistic and narrative traditions.",
      funFact: "Some Omani poets are so revered that their verses are still recited at weddings and celebrations centuries after their death!"
    }
  ];
  
  return (
    <div className="page inner culture" dir={i18n.language === 'ar' ? 'rtl' : 'ltr'}>
      <LanguageSelector />
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
      <button className="home-btn" onClick={() => navigate('/')}>⌂</button>
      
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
      image: 'https://5.imimg.com/data5/OS/CN/MY-4561887/oman-dates.jpg',
      description: "Khalas dates are Oman's most prized variety, known for their caramel-like sweetness and soft texture. Grown primarily in the Al Batinah region, they're considered the 'king of dates' in Omani culture.",
      funFact: "Khalas dates are so revered that they're often used as gifts during Ramadan and special occasions—Oman's version of luxury chocolate!"
    },
    { 
      title: 'Fard Dates', 
      desc: 'Firm texture, rich sweetness', 
      image: 'https://static.dilligrocery.com/264-large_default/oman-dates.jpg',
      description: "Fard dates are known for their firm texture and rich, concentrated sweetness. These dates are perfect for cooking and are often used in traditional Omani desserts and savory dishes.",
      funFact: "Fard dates are so firm they can be stored for months without refrigeration—nature's perfect snack for desert travelers!"
    },
    { 
      title: 'Naghal Dates', 
      desc: 'Golden and soft', 
      image: 'https://safadryfruitsandspices.com/wp-content/uploads/2023/10/Add-a-subheading-4.jpg',
      description: "Naghal dates are distinguished by their golden color and exceptionally soft texture. These premium dates are often served to guests as a symbol of Omani hospitality and generosity.",
      funFact: "Naghal dates are so soft they practically melt in your mouth—earning them the nickname 'butter dates' among locals!"
    },
    { 
      title: 'Madina Dates', 
      desc: 'Dark and syrupy', 
      image: 'https://m.media-amazon.com/images/I/51P-GfjbuNL.jpg',
      description: "Madina dates are known for their dark color and syrupy sweetness. These dates are rich in natural sugars and are often used in traditional Omani medicine and energy-boosting recipes.",
      funFact: "Madina dates are so sweet they were historically used as natural sweeteners before sugar became widely available—Oman's original candy!"
    },
    { 
      title: 'Khenaizi Dates', 
      desc: 'Reddish-brown, medium sweetness', 
      image: 'https://www.houseofrasda.com/cdn/shop/files/Oman_Dates_Fard_Khajur_Premium_1.png?v=1746272251',
      description: "Khenaizi dates are characterized by their reddish-brown color and balanced sweetness. These versatile dates are popular for both fresh consumption and in traditional Omani cooking.",
      funFact: "Khenaizi dates are often called 'the people's date' because they're affordable yet delicious—democracy in date form!"
    },
    { 
      title: 'Mabroom Dates', 
      desc: 'Elongated, premium quality', 
      image: 'https://images.jdmagicbox.com/quickquotes/images_main/urban-platter-omani-fardh-dates-from-oman-500g-04-08-2021-080-239867177-60k4h.jpg',
      description: "Mabroom dates are prized for their elongated shape and premium quality. These dates are often exported and are considered one of Oman's finest agricultural products.",
      funFact: "Mabroom dates are so premium they're often given as diplomatic gifts—Oman's answer to fine wine!"
    }
  ];
  
  return (
    <div className="page inner tradition" dir={i18n.language === 'ar' ? 'rtl' : 'ltr'}>
      <LanguageSelector />
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
      <button className="home-btn" onClick={() => navigate('/')}>⌂</button>
      
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
      image: 'https://m.media-amazon.com/images/I/81awtFxv+BL._UF1000,1000_QL80_.jpg',
      description: "Frankincense from Dhofar's Boswellia sacra trees has been used for centuries in traditional Omani wellness practices. Its aromatic resin is believed to have healing properties for both body and mind.",
      funFact: "The frankincense trees in Dhofar are so precious that they're protected by law—Oman's version of a natural pharmacy!"
    },
    { 
      title: 'Traditional Healing', 
      desc: 'Ancient remedies and practices', 
      image: 'https://gosalalahtour.com/wp-content/uploads/2021/06/Frankincense-Salalah-Dhofar.png',
      description: "Omani traditional healing combines herbal medicine, spiritual practices, and natural remedies passed down through generations. These holistic approaches focus on treating the whole person, not just symptoms.",
      funFact: "Some traditional healers in Oman can trace their knowledge back over 500 years—making them living medical libraries!"
    },
    { 
      title: 'Wadi Oases & Springs', 
      desc: 'Natural healing waters', 
      image: 'https://images.unsplash.com/photo-1558980664-10ea3f8a2d4b?q=80&w=1200&auto=format&fit=crop',
      description: "Oman's wadis and natural springs are considered sacred healing places. The mineral-rich waters and serene environments provide natural therapy for both physical and mental wellness.",
      funFact: "Some wadi springs are believed to have healing properties—locals say a dip can cure everything from stress to skin conditions!"
    },
    { 
      title: 'Spa Traditions', 
      desc: 'Modern wellness inspired by heritage', 
      image: 'https://images.unsplash.com/photo-1556228453-efd1bff71f6b?q=80&w=1200&auto=format&fit=crop',
      description: "Modern Omani spas blend contemporary wellness techniques with traditional practices. Treatments often include frankincense, rose water, and other natural ingredients from Oman's rich heritage.",
      funFact: "Some luxury spas in Oman offer 'desert therapy' sessions—wellness meets adventure in the most unique way!"
    },
    { 
      title: 'Meditation & Mindfulness', 
      desc: 'Ancient practices for modern life', 
      image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=1200&auto=format&fit=crop',
      description: "Oman's peaceful landscapes and spiritual heritage make it an ideal destination for meditation and mindfulness practices. Many retreats offer traditional and modern approaches to mental wellness.",
      funFact: "The silence in Oman's deserts is so profound it's been measured as one of the quietest places on Earth—perfect for deep meditation!"
    },
    { 
      title: 'Natural Hot Springs', 
      desc: 'Thermal healing waters', 
      image: 'https://images.unsplash.com/photo-1544551763-7ef4203b1cb9?q=80&w=1200&auto=format&fit=crop',
      description: "Oman's natural hot springs are rich in minerals and have been used for therapeutic purposes for centuries. These geothermal waters provide natural healing and relaxation experiences.",
      funFact: "Some hot springs in Oman are so hot they can cook eggs—nature's own wellness spa with built-in kitchen!"
    }
  ];
  
  return (
    <div className="page inner wellness" dir={i18n.language === 'ar' ? 'rtl' : 'ltr'}>
      <LanguageSelector />
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
      <button className="home-btn" onClick={() => navigate('/')}>⌂</button>
      
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

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/heritage" element={<Heritage />} />
        <Route path="/dates" element={<Dates />} />
        <Route path="/wellness" element={<Wellness />} />
        <Route path="/culture" element={<Culture />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
