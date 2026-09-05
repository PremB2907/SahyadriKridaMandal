const db = require('../config/db');

// Ganeshotsav Event Schedule Data for Sahyadri Krida Mandal
const SCHEDULE_LOCATION_EN = 'Tilak Nagar Samaj Mandir Auditorium, opposite Building 22, Lokmanya Tilak Kridangan, Tilak Nagar, Chembur, Mumbai - 400089';
const SCHEDULE_LOCATION_MR = 'टिळक नगर समाज मंदिर सभागृह, लोकमान्य टिळक क्रीडांगण, इमारत २२ समोर, टिळक नगर, चेंबूर, मुंबई- ४०००८९.';

const scheduleData = [
  { day: 1, dateMr: 'दिवस १ (गणेश चतुर्थी)', dateEn: 'Day 1 (Ganesh Chaturthi)', titleMr: 'प्राणप्रतिष्ठापना व प्रथम महाआरती', titleEn: 'Pratishthapana & First Maha Aarti', locationMr: SCHEDULE_LOCATION_MR, locationEn: SCHEDULE_LOCATION_EN, halt_location: SCHEDULE_LOCATION_EN, facilities: [{ mr: 'सकाळी ८:०० वाजता आरती', en: 'Morning 8:00 AM Aarti' }, { mr: 'सर्वसाधारण दर्शन रांग', en: 'General Darshan Queue' }, { mr: 'संध्याकाळी ८:०० वाजता महाआरती', en: 'Evening 8:00 PM Maha Aarti' }], emergency_contact: '+91 98765 11111' },
  { day: 2, dateMr: 'दिवस २', dateEn: 'Day 2', titleMr: 'शैक्षणिक सत्कार समारंभ', titleEn: 'Academic Felicitation', locationMr: SCHEDULE_LOCATION_MR, locationEn: SCHEDULE_LOCATION_EN, halt_location: SCHEDULE_LOCATION_EN, facilities: [{ mr: 'विद्यार्थी सत्कार', en: 'Student Felicitation' }, { mr: 'बक्षीस वितरण', en: 'Prize Distribution' }, { mr: 'मार्गदर्शन', en: 'Guidance Seminar' }], emergency_contact: '+91 98765 22222' },
  { day: 3, dateMr: 'दिवस ३', dateEn: 'Day 3', titleMr: 'छायाचित्रण स्पर्धा', titleEn: 'Photography Competition', locationMr: SCHEDULE_LOCATION_MR, locationEn: SCHEDULE_LOCATION_EN, halt_location: SCHEDULE_LOCATION_EN, facilities: [{ mr: 'सहभाग नोंदणी', en: 'Participation Registration' }, { mr: 'स्पर्धा प्रदर्शन', en: 'Competition Exhibition' }, { mr: 'बक्षीस वितरण', en: 'Prize Distribution' }], emergency_contact: '+91 98765 33333' },
  { day: 4, dateMr: 'दिवस ४', dateEn: 'Day 4', titleMr: 'अन्नदान महाप्रसाद सेवा', titleEn: 'Annadan Mahaprasad Seva', locationMr: SCHEDULE_LOCATION_MR, locationEn: SCHEDULE_LOCATION_EN, halt_location: SCHEDULE_LOCATION_EN, facilities: [{ mr: 'गरम महाप्रसाद भोजन', en: 'Hot Mahaprasad Meals' }, { mr: 'पिण्याच्या पाण्याची केंद्रे', en: 'Drinking Water Booths' }, { mr: 'वैद्यकीय प्रथमोपचार केंद्र', en: 'Medical First Aid Desk' }], emergency_contact: '+91 98765 44444' },
  { day: 5, dateMr: 'दिवस ५', dateEn: 'Day 5', titleMr: 'सांस्कृतिक व भजन संध्या', titleEn: 'Cultural & Bhajan Sandhya', locationMr: SCHEDULE_LOCATION_MR, locationEn: SCHEDULE_LOCATION_EN, halt_location: SCHEDULE_LOCATION_EN, facilities: [{ mr: 'पारंपरिक लोककला सादरीकरण', en: 'Traditional Folk Performances' }, { mr: 'कार्यकर्ता सहाय्य केंद्र', en: 'Karyakarta Assistance Desk' }, { mr: 'व्हीलचेअर सुविधा', en: 'Wheelchair Support' }], emergency_contact: '+91 98765 55555' },
  { day: 6, dateMr: 'दिवस ६', dateEn: 'Day 6', titleMr: 'विशेष आरोग्य व रक्तदान शिबीर', titleEn: 'Special Health & Blood Donation Camp', locationMr: SCHEDULE_LOCATION_MR, locationEn: SCHEDULE_LOCATION_EN, halt_location: SCHEDULE_LOCATION_EN, facilities: [{ mr: 'मोफत आरोग्य तपासणी', en: 'Free Health Checkup' }, { mr: 'रक्तदान उपक्रम', en: 'Blood Donation Drive' }, { mr: 'भाविक कल्याण केंद्र', en: 'Devotee Welfare Desk' }], emergency_contact: '+91 98765 66666' },
  { day: 7, dateMr: 'दिवस ७', dateEn: 'Day 7', titleMr: 'गौरी गणपती विसर्जन व सायंकाळची आरती', titleEn: 'Gauri Ganpati Visarjan & Evening Aarti', locationMr: SCHEDULE_LOCATION_MR, locationEn: SCHEDULE_LOCATION_EN, halt_location: SCHEDULE_LOCATION_EN, facilities: [{ mr: 'विशेष पुष्पसजावट', en: 'Special Flower Decoration' }, { mr: 'प्रसाद वितरण', en: 'Prasad Distribution' }, { mr: '२४/७ सुरक्षा पाहणी', en: '24/7 Security Patrol' }], emergency_contact: '+91 98765 77777' },
  { day: 8, dateMr: 'दिवस ८', dateEn: 'Day 8', titleMr: 'भव्य दीपोत्सव व छप्पन भोग', titleEn: 'Grand Deepotsav & Chappan Bhog', locationMr: SCHEDULE_LOCATION_MR, locationEn: SCHEDULE_LOCATION_EN, halt_location: SCHEDULE_LOCATION_EN, facilities: [{ mr: '१००८ दिव्यांचा दीपोत्सव', en: '1008 Diya Deepotsav' }, { mr: 'पारंपरिक भोग अर्पण', en: 'Traditional Bhog Offering' }, { mr: 'लाईव्ह कॅमेरा प्रवाह कक्ष', en: 'Live Camera Stream Desk' }], emergency_contact: '+91 98765 88888' },
  { day: 9, dateMr: 'दिवस ९', dateEn: 'Day 9', titleMr: 'ज्येष्ठ नागरिक व बाल भाविक विशेष दर्शन', titleEn: 'Senior Citizen & Child Special Darshan', locationMr: SCHEDULE_LOCATION_MR, locationEn: SCHEDULE_LOCATION_EN, halt_location: SCHEDULE_LOCATION_EN, facilities: [{ mr: 'ज्येष्ठ नागरिक प्राधान्य रांग', en: 'Priority Senior Queue' }, { mr: 'सहाय्यित शटल', en: 'Assisted Shuttle' }, { mr: 'आपत्कालीन रुग्णवाहिका', en: 'Emergency Ambulance' }], emergency_contact: '+91 98765 99999' },
  { day: 10, dateMr: 'दिवस १० (भव्य निरोप)', dateEn: 'Day 10 (Grand Farewell)', titleMr: 'अनंत चतुर्दशी उत्तरपूजा व विसर्जन मिरवणूक', titleEn: 'Anant Chaturdashi Uttarpuja & Visarjan Miravnuk', locationMr: SCHEDULE_LOCATION_MR, locationEn: SCHEDULE_LOCATION_EN, halt_location: SCHEDULE_LOCATION_EN, facilities: [{ mr: 'भव्य मिरवणूक रथ', en: 'Grand Procession Chariot' }, { mr: 'जीवरक्षक पथक', en: 'Lifeguard Team' }, { mr: 'विसर्जन सेवा', en: 'Visarjan Seva' }], emergency_contact: '+91 98765 00000' }
];

// Glimpses over a Decade (10+ Years Historical Retrospective Data)
const glimpsesData = [
  { year: '2025', category: 'idols', titleMr: 'रौप्यवर्णी महादेव अवतार', titleEn: 'Silver Mahadev Avatar', themeMr: 'शिव-गणेश रूप', themeEn: 'Shiva-Ganesha Fusion', height: '—', artistMr: 'मंडळ कारागीर', artistEn: 'Mandal Artisans', image: '/images/sahyadri-decoration-palace.jpg', descMr: 'हातात त्रिशूळ, डमरू आणि शिवलिंगावर विराजमान झालेले चांदीच्या रंगातील श्रीरूप.', descEn: 'A stunning silver-hued Ganesha holding a Trishul and Damaru, resting on a Shiva Linga.' },
  { year: '2024', category: 'idols', titleMr: 'शेषनागाच्या छायेत निळे श्रीरूप', titleEn: 'Blue Ganesha with Sheshnag', themeMr: 'पौराणिक देवत्व', themeEn: 'Divine Mythology', height: '—', artistMr: 'मंडळ सेवा पथक', artistEn: 'Mandal Seva Team', image: '/images/sahyadri-ganpati-01.jpg', descMr: 'विशाल शेषनागाच्या छायेत विराजमान झालेले श्रींचे सुंदर निळे रूप.', descEn: 'A crafted blue-hued Ganesha seated under the massive canopy of Sheshnag.' },
  { year: '2023', category: 'idols', titleMr: 'वीणाधारी सरस्वती अवतार', titleEn: 'Saraswati Avatar with Veena', themeMr: 'संगीत आणि ज्ञानाचे प्रतीक', themeEn: 'Music and Knowledge', height: '—', artistMr: 'मंडळ कारागीर', artistEn: 'Mandal Artisans', image: '/images/sahyadri-decoration-temple.jpg', descMr: 'हातात वीणा आणि सोबत हंस असलेले श्रींचे संगीतमय पांढरे रूप.', descEn: 'A pure white depiction of Ganesha holding a Veena, symbolizing knowledge and music.' },
  { year: '2022', category: 'idols', titleMr: 'देवीच्या पार्श्वभूमीवरील श्री दर्शन', titleEn: 'Ganesha with Goddess Aura', themeMr: 'शक्ती आणि बुद्धीचा संगम', themeEn: 'Shakti and Wisdom', height: '—', artistMr: 'मंडळ कारागीर', artistEn: 'Mandal Artisans', image: '/images/sahyadri-decoration-palace.jpg', descMr: 'मातेच्या रौद्र आणि विशाल चेहऱ्याच्या पार्श्वभूमीवर विराजमान झालेले श्री.', descEn: 'Ganesha positioned against a giant, powerful backdrop of the Mother Goddess.' },
  { year: '2021', category: 'idols', titleMr: 'श्री दर्शन (२०२१)', titleEn: 'Ganesha Darshan (2021)', themeMr: 'पारंपारिक दर्शन', themeEn: 'Traditional Darshan', height: '—', artistMr: 'मंडळ कारागीर', artistEn: 'Mandal Artisans', image: '/images/sahyadri-decoration-lights.jpg', descMr: '२०२१ सालचे सुंदर श्री रूप.', descEn: 'Ganesha idol from 2021.', hideFromReel: true },

  { year: '2018', category: 'idols', titleMr: 'श्री दर्शन - अश्वस्तंभ मखर (२०१८)', titleEn: 'Ganesha Darshan - Horse Pillar Sanctum (2018)', themeMr: 'पारंपारिक दर्शन', themeEn: 'Traditional Darshan', height: '—', artistMr: 'मंडळ कारागीर', artistEn: 'Mandal Artisans', image: '/images/2018_1.jpg', descMr: 'भव्य कोरीव दगडी मखरात, अश्वारूढ स्तंभांच्या आणि फळांच्या नैवेद्यासमोर विराजमान झालेले श्रींचे विलोभनीय रूप.', descEn: 'Lord Ganesha gloriously seated inside an intricately carved sanctum flanked by warrior horse pillars.', hideFromReel: true },
  { year: '2018', category: 'decorations', titleMr: 'प्रभू श्री राम व अयोध्या राम मंदिर देखावा (२०१८)', titleEn: 'Prabhu Shri Ram & Ayodhya Ram Mandir (2018)', themeMr: 'प्रभू श्री राम व राम मंदिर देखावा', themeEn: 'Prabhu Shri Ram & Ram Mandir Theme', height: '—', artistMr: 'मंडळ कारागीर', artistEn: 'Mandal Artisans', image: '/images/2018_2.png', descMr: 'रात्रीच्या सोनेरी रोषणाईत उजळून निघालेले प्रस्तावित भव्य राम मंदिर आणि धनुर्धारी प्रभू श्री रामांची भव्य मूर्ती.', descEn: 'Majestic illuminated Ayodhya Ram Mandir replica at night fronted by the heroic statue of Lord Rama.', hideFromReel: true },
  { year: '2018', category: 'decorations', titleMr: 'राम मंदिर भव्य आतील सभामंडप देखावा (२०१८)', titleEn: 'Ram Mandir Grand Interior Hall (2018)', themeMr: 'राम दरबार सभामंडप सजावट', themeEn: 'Ram Darbar Hall Architecture', height: '—', artistMr: 'मंडळ कारागीर', artistEn: 'Mandal Artisans', image: '/images/2018_3.jpg', descMr: 'श्री राम नामांकित सुवर्ण वेलबुट्टी छत, कोरीव खांब आणि ऐतिहासिक चित्रांनी सजलेला भव्य सभामंडप.', descEn: 'Stunning interior hall featuring gold scroll rafters inscribed with Sri Ram and elephant-carved columns.', hideFromReel: true },
  { year: '2018', category: 'decorations', titleMr: 'भव्य अयोध्या राम मंदिर मंडप देखावा (२०१८)', titleEn: 'Grand Ayodhya Ram Mandir Pandal (2018)', themeMr: 'प्रस्तावित अयोध्या राम मंदिर प्रतिकृती', themeEn: 'Ayodhya Ram Mandir Architecture Theme', height: '—', artistMr: 'मंडळ कारागीर', artistEn: 'Mandal Artisans', image: '/images/2018_4.png', descMr: 'दिवसाच्या प्रकाशात दिसणारी प्रस्तावित अयोध्या राम मंदिराची भव्य आणि देखणी हुबेहूब प्रतिकृती.', descEn: 'Panoramic daytime view of the awe-inspiring Ayodhya Ram Mandir replica with its magnificent shikhars.', hideFromReel: true },
  { year: '2017', category: 'decorations', titleMr: 'जय जवान, जय किसान, जय विज्ञान स्मारक देखावा (२०१७)', titleEn: 'Jai Jawan, Jai Kisan, Jai Vigyan Theme (2017)', themeMr: 'भारतीय सैन्य व हिमालयीन चौकी देखावा', themeEn: 'Indian Armed Forces & Siachen Post Theme', height: '—', artistMr: 'मंडळ कारागीर', artistEn: 'Mandal Artisans', image: '/images/2017_1.jpg', descMr: 'हिमालयीन पर्वताच्या पार्श्वभूमीवर उभारलेले राष्ट्रीय स्मारक व भारतीय जवानांचे शौर्य दर्शन.', descEn: 'Spectacular snow mountain military post setting honoring Indian armed forces, farmers and scientists.', hideFromReel: true },
  { year: '2017', category: 'idols', titleMr: 'तिरंगा रोषणाई व भव्य कमानीत श्री दर्शन (२०१७)', titleEn: 'Tricolor Illumination & Ganesha Darshan (2017)', themeMr: 'पारंपारिक दर्शन व देशभक्ती रोषणाई', themeEn: 'Traditional Darshan & Tricolor Illuminations', height: '—', artistMr: 'मंडळ कारागीर', artistEn: 'Mandal Artisans', image: '/images/2017_2.jpg', descMr: 'भव्य राष्ट्रध्वज तिरंगा रोषणाई आणि फुलांच्या कमानीत विराजमान झालेले श्रींचे विलोभनीय रूप.', descEn: 'Lord Ganesha radiating divine grace inside an enormous tricolor-lit floral sanctum arch.', hideFromReel: true },
  { year: '2017', category: 'decorations', titleMr: 'ब्राह्मोस क्षेपणास्त्र, कृषी व विज्ञान दालन देखावा (२०१७)', titleEn: 'BrahMos Missile, Agriculture & Science Pavilion (2017)', themeMr: 'संरक्षण व विज्ञान गौरव दालन', themeEn: 'Defense & Scientific Achievement Pavilion', height: '—', artistMr: 'मंडळ कारागीर', artistEn: 'Mandal Artisans', image: '/images/2017_3.jpg', descMr: 'ब्राह्मोस क्षेपणास्त्र, भारतीय शेतकरी, जवान आणि थोर विचारवंतांच्या कार्याचा गौरव करणारा भव्य मार्ग.', descEn: 'Exhibition tunnel featuring BrahMos missile model, agricultural heritage and national visionary leaders.', hideFromReel: true },
  { year: '2017', category: 'decorations', titleMr: 'इस्रो GSLV MK III रॉकेट प्रतिकृती (२०१७)', titleEn: 'ISRO GSLV MK III Rocket Model (2017)', themeMr: 'भारतीय अंतराळ संशोधन गौरव', themeEn: 'Indian Space Research Glory', height: '—', artistMr: 'मंडळ कारागीर', artistEn: 'Mandal Artisans', image: '/images/2017_4.png', descMr: 'इस्रोच्या ऐतिहासिक GSLV MK III अंतराळ रॉकेटची भव्य व हुबेहूब प्रतिकृती.', descEn: 'Massive life-size replica of ISRO GSLV MK III heavy-lift rocket with national emblem.', hideFromReel: true },
  { year: '2016', category: 'decorations', titleMr: 'भव्य पॅगोडा मंदिर देखावा (२०१६)', titleEn: 'Grand Chinese Pagoda Pandal (2016)', themeMr: 'प्राच्य पॅगोडा स्थापत्य देखावा', themeEn: 'Oriental Pagoda Architecture Theme', height: '—', artistMr: 'मंडळ कारागीर', artistEn: 'Mandal Artisans', image: '/images/2016_1.jpg', descMr: 'लाल आणि पिवळ्या रंगातील चायनीज पॅगोडाच्या धर्तीवर उभारलेला आकर्षक मंडप देखावा.', descEn: 'Spectacular Chinese pagoda-themed grand entrance facade illuminated with vibrant lanterns.', hideFromReel: true },
  { year: '2016', category: 'decorations', titleMr: 'पारंपरिक तोरण व कंदील प्रवेशद्वार (२०१६)', titleEn: 'Traditional Chinese Arch & Lantern Gate (2016)', themeMr: 'चिनी कंदील व तोरण सजावट', themeEn: 'Chinese Lanterns & Arch Decor', height: '—', artistMr: 'मंडळ कारागीर', artistEn: 'Mandal Artisans', image: '/images/2016_2.jpg', descMr: 'विटांच्या भिंती आणि लाल कंदिलांनी सजलेले पारंपरिक चायनीज तोरण प्रवेशद्वार.', descEn: 'Traditional oriental gateway with curved green tiled roof and glowing red lanterns.', hideFromReel: true },
  { year: '2016', category: 'idols', titleMr: 'श्री दर्शन - पॅगोडा शैली मखर (२०१६)', titleEn: 'Ganesha Darshan - Pagoda Sanctum (2016)', themeMr: 'पारंपारिक दर्शन', themeEn: 'Traditional Darshan', height: '—', artistMr: 'मंडळ कारागीर', artistEn: 'Mandal Artisans', image: '/images/2016_3.jpg', descMr: 'विटांची पार्श्वभूमी, गोलाकार खिडक्या आणि कंदिलांच्या प्रकाशात विराजमान झालेले श्रींचे सुंदर रूप.', descEn: 'Lord Ganesha elegantly seated within the oriental brick sanctum adorned with hanging lanterns.', hideFromReel: true },
  { year: '2016', category: 'decorations', titleMr: 'कुंग फू पांडा व व्हिलेज देखावा (२०१६)', titleEn: 'Kung Fu Panda Village Theme (2016)', themeMr: 'कुंग फू पांडा अॅनिमेशन देखावा', themeEn: 'Kung Fu Panda Animated Theme', height: '—', artistMr: 'मंडळ कारागीर', artistEn: 'Mandal Artisans', image: '/images/2016_4.jpg', descMr: 'लहान मुलांचे खास आकर्षण ठरलेला कुंग फू पांडा आणि चिमुकल्या पांडांचा मनमोहक देखावा.', descEn: 'Exciting Kung Fu Panda martial arts setting featuring Po and baby pandas in an ancient oriental village.', hideFromReel: true },
  { year: '2015', category: 'decorations', titleMr: 'भव्य राजवाडा मंडप देखावा - दिवसाचे दृश्य (२०१५)', titleEn: 'Grand Royal Palace Pandal - Day View (2015)', themeMr: 'ऐतिहासिक राजवाडा देखावा', themeEn: 'Historic Royal Palace Theme', height: '—', artistMr: 'मंडळ कारागीर', artistEn: 'Mandal Artisans', image: '/images/2015_1.png', descMr: 'भव्य ऐतिहासिक राजवाड्याच्या धर्तीवर उभारलेला नयनरम्य मंडप व सजवलेली बैलजोडी.', descEn: 'Magnificent historic palace-themed facade captured in daylight with adorned royal bullock statues.', hideFromReel: true },
  { year: '2015', category: 'idols', titleMr: 'सुवर्णमयी श्री दर्शन (२०१५)', titleEn: 'Golden Ganesha Darshan (2015)', themeMr: 'पारंपारिक दर्शन', themeEn: 'Traditional Darshan', height: '—', artistMr: 'मंडळ कारागीर', artistEn: 'Mandal Artisans', image: '/images/2015_2.png', descMr: 'भव्य सुवर्ण सिंहासनावर आणि फुलांच्या मखरात विराजमान झालेले श्रींचे विलोभनीय रूप.', descEn: 'Lord Ganesha gloriously seated on the grand golden lion throne adorned with flowers.', hideFromReel: true },
  { year: '2015', category: 'decorations', titleMr: 'भव्य राजवाडा मंडप देखावा - रात्रीचे दृश्य (२०१५)', titleEn: 'Grand Royal Palace Pandal - Night View (2015)', themeMr: 'ऐतिहासिक राजवाडा देखावा', themeEn: 'Historic Royal Palace Theme', height: '—', artistMr: 'मंडळ कारागीर', artistEn: 'Mandal Artisans', image: '/images/2015_3.png', descMr: 'रात्रीच्या सोनेरी रोषणाईत झगमगणारा भव्य राजवाडा थीमवरील मंडप.', descEn: 'The magnificent royal palace pandal brilliantly illuminated with golden lights at night.', hideFromReel: true },
  { year: '2015', category: 'decorations', titleMr: 'राजवाडा भव्य आतील दरबार (२०१५)', titleEn: 'Grand Royal Palace Interior Darbar (2015)', themeMr: 'राजेशाही दरबार सजावट', themeEn: 'Royal Darbar Interior Decor', height: '—', artistMr: 'मंडळ कारागीर', artistEn: 'Mandal Artisans', image: '/images/2015_4.jpg', descMr: 'झुंबर, खांब आणि लाल गालिच्यांनी सजलेला अथांग राजेशाही दरबार हॉल देखावा.', descEn: 'Spacious and regal interior palace darbar hall with ornate chandeliers and red carpet.', hideFromReel: true },
  { year: '2014', category: 'decorations', titleMr: 'वाराणसी घाट व शिवभक्ती देखावा कॉरिडॉर (२०१४)', titleEn: 'Varanasi Ghats & Shiva Murals Corridor (2014)', themeMr: 'काशी-वाराणसी घाट देखावा', themeEn: 'Kashi Varanasi Ghats Theme', height: '—', artistMr: 'मंडळ कारागीर', artistEn: 'Mandal Artisans', image: '/images/2014_1.jpg', descMr: 'वाराणसीचे पवित्र घाट आणि भगवान शंकराच्या चित्रांनी सजलेला मनमोहक कॉरिडॉर देखावा.', descEn: 'Magnificent corridor adorned with holy Varanasi ghats and Shiva mural paintings.', hideFromReel: true },
  { year: '2014', category: 'decorations', titleMr: 'काशी विश्वनाथ रेखाटन व कला देखावा (२०१४)', titleEn: 'Kashi Vishwanath Sketch Art & Murals (2014)', themeMr: 'वाराणसी कलाकृती व रेखाटने', themeEn: 'Varanasi Charcoal Artwork Theme', height: '—', artistMr: 'मंडळ कारागीर', artistEn: 'Mandal Artisans', image: '/images/2014_2.png', descMr: 'काशी विश्वनाथ आणि साधूंच्या व्यक्तिमत्त्वाचे अप्रतिम कृष्णधवल रेखाटन प्रदर्शन देखावा.', descEn: 'Stunning charcoal sketch mural depicting Kashi ghats and ascetic spirituality.', hideFromReel: true },
  { year: '2014', category: 'decorations', titleMr: 'भव्य मंदिर प्रवेशद्वार व छत्र देखावा (२०१४)', titleEn: 'Grand Temple Entrance & Royal Canopy (2014)', themeMr: 'मंदिर स्थापत्य व राजेशाही छत्री', themeEn: 'Temple Architecture & Royal Umbrellas', height: '—', artistMr: 'मंडळ कारागीर', artistEn: 'Mandal Artisans', image: '/images/2014_3.jpg', descMr: 'राजेशाही छत्र्या आणि भगव्या ध्वजांनी सजलेले भव्य काशी मंदिर प्रवेशद्वार.', descEn: 'Grand temple entrance facade adorned with ceremonial royal umbrellas and sacred flags.', hideFromReel: true },
  { year: '2014', category: 'idols', titleMr: 'श्री दर्शन - भव्य सिंहासन (२०१४)', titleEn: 'Ganesha Darshan - Royal Throne (2014)', themeMr: 'पारंपारिक दर्शन', themeEn: 'Traditional Darshan', height: '—', artistMr: 'मंडळ कारागीर', artistEn: 'Mandal Artisans', image: '/images/2014_4.png', descMr: 'भव्य सिंहासनावर आणि फळ-नैवेद्याच्या साक्षीने विराजमान झालेले श्रींचे मनमोहक रूप.', descEn: 'Lord Ganesha serenely seated on the majestic lion-carved royal throne.', hideFromReel: true },
  { year: '2013', category: 'decorations', titleMr: 'भारतीय चित्रपटसृष्टीची १०० वर्षे - भव्य देखावा (२०१३)', titleEn: '100 Years of Indian Cinema - Grand Corridor (2013)', themeMr: 'चित्रपटसृष्टी शताब्दी देखावा', themeEn: 'Centenary of Indian Cinema', height: '—', artistMr: 'मंडळ कारागीर', artistEn: 'Mandal Artisans', image: '/images/2013_1.jpg', descMr: 'भारतीय चित्रपटसृष्टीच्या १०० वर्षांच्या प्रवासावर आधारित भव्य कॉरिडॉर देखावा.', descEn: 'Spectacular grand corridor celebration marking 100 years of Indian cinema.', hideFromReel: true },
  { year: '2013', category: 'decorations', titleMr: 'शाहरुख खान व जागतिक प्रतिकृती देखावा (२०१३)', titleEn: 'Shah Rukh Khan & Global Landmarks (2013)', themeMr: 'बॉलिवूड व जागतिक आकर्षण', themeEn: 'Bollywood & World Icons', height: '—', artistMr: 'मंडळ कारागीर', artistEn: 'Mandal Artisans', image: '/images/2013_2.jpg', descMr: 'आयफेल टॉवर आणि बॉलिवूड सिल्व्हर स्क्रीनसह शाहरुख खान यांची प्रसिद्ध मुद्रा देखावा.', descEn: 'Iconic open-arms pose of Shah Rukh Khan flanked by global landmarks and film reels.', hideFromReel: true },
  { year: '2013', category: 'idols', titleMr: 'श्री दर्शन व गानकोकिळा लता मंगेशकर (२०१३)', titleEn: 'Ganesha Darshan & Lata Mangeshkar (2013)', themeMr: 'पारंपारिक दर्शन व संगीतरत्न', themeEn: 'Traditional Darshan & Musical Legend', height: '—', artistMr: 'मंडळ कारागीर', artistEn: 'Mandal Artisans', image: '/images/2013_3.jpg', descMr: 'भव्य सिंहासनावर विराजमान झालेले श्री व भारतरत्न लता मंगेशकर यांची प्रतिकृती.', descEn: 'Lord Ganesha on the ornate golden throne alongside Bharat Ratna Lata Mangeshkar.', hideFromReel: true },
  { year: '2013', category: 'decorations', titleMr: 'शोले देखावा - जय आणि वीरू (२०१३)', titleEn: 'Sholay Theme - Jai & Veeru (2013)', themeMr: 'शोले - अजरामर चित्रपट देखावा', themeEn: 'Iconic Sholay Film Theme', height: '—', artistMr: 'मंडळ कारागीर', artistEn: 'Mandal Artisans', image: '/images/2013_4.jpg', descMr: 'शोले चित्रपटातील प्रसिद्ध मोटारसायकल, पाण्याची टाकी आणि जय-वीरू यांची प्रतिकृती.', descEn: 'Legendary Sholay movie scene recreated with Jai and Veeru on the iconic motorbike.', hideFromReel: true },
  { year: '2012', category: 'decorations', titleMr: 'भव्य राजवाडा मंडप देखावा (२०१२)', titleEn: 'Grand Castle Pandal (2012)', themeMr: 'काल्पनिक राजवाडा', themeEn: 'Fairytale Castle Theme', height: '—', artistMr: 'मंडळ कारागीर', artistEn: 'Mandal Artisans', image: '/images/2012_1.jpg', descMr: 'सह्याद्री क्रीडा मंडळाचा भव्य काल्पनिक राजवाडा थीमवरील आकर्षक देखावा व रोषणाई.', descEn: 'The grand fairytale castle-themed pandal facade with spectacular illuminations.', hideFromReel: true },
  { year: '2012', category: 'decorations', titleMr: 'मशरूम व जंगल देखावा (२०१२)', titleEn: 'Giant Mushroom & Forest Pandal (2012)', themeMr: 'काल्पनिक वन देखावा', themeEn: 'Fantasy Forest Theme', height: '—', artistMr: 'मंडळ कारागीर', artistEn: 'Mandal Artisans', image: '/images/2012_2.jpg', descMr: 'भव्य मशरूम आणि प्राण्यांच्या प्रतिकृतींनी सजलेला मनमोहक आतील देखावा.', descEn: 'Mesmerizing interior tunnel decor featuring giant glowing mushrooms and forest creations.', hideFromReel: true },
  { year: '2012', category: 'idols', titleMr: 'श्री दर्शन (२०१२)', titleEn: 'Ganesha Darshan (2012)', themeMr: 'पारंपारिक दर्शन', themeEn: 'Traditional Darshan', height: '—', artistMr: 'मंडळ कारागीर', artistEn: 'Mandal Artisans', image: '/images/2012_3.png', descMr: 'फुलांच्या कमानीत आणि पारंपरिक पितांबरात विराजमान झालेले श्रींचे विलोभनीय रूप.', descEn: 'Lord Ganesha beautifully adorned with a floral arch and traditional silks.', hideFromReel: true },
  { year: '2012', category: 'decorations', titleMr: 'गुहा मार्ग व देखावा (२०१२)', titleEn: 'Fantasy Cave Walkway (2012)', themeMr: 'काल्पनिक गुहा देखावा', themeEn: 'Fantasy Cave Walkway', height: '—', artistMr: 'मंडळ कारागीर', artistEn: 'Mandal Artisans', image: '/images/2012_4.jpg', descMr: 'रंगीबेरंगी पात्रांनी सजलेली गुहा व श्री दर्शनाकडे जाणारा मनमोहक मार्ग.', descEn: 'Illuminated whimsical tunnel walkthrough leading towards the main sanctum.', hideFromReel: true },
  { year: '2011', category: 'decorations', titleMr: 'प्राचीन मंदिर मंडप (२०११)', titleEn: 'Temple Pandal (2011)', themeMr: 'मंदिर देखावा', themeEn: 'Temple Theme', height: '—', artistMr: 'मंडळ कारागीर', artistEn: 'Mandal Artisans', image: '/images/2011_1.jpg', descMr: 'आकर्षक रंगात रंगवलेली भव्य मंदिर सदृश्य मंडप सजावट.', descEn: 'A beautifully crafted and grand temple-themed pandal.', hideFromReel: true },
  { year: '2011', category: 'idols', titleMr: 'श्री दर्शन (२०११)', titleEn: 'Ganesha Darshan (2011)', themeMr: 'पारंपारिक दर्शन', themeEn: 'Traditional Darshan', height: '—', artistMr: 'मंडळ कारागीर', artistEn: 'Mandal Artisans', image: '/images/2011_2.jpg', descMr: 'आकर्षक लाल फेट्यात आणि पितांबरात विराजमान झालेले श्रींचे सुंदर रूप.', descEn: 'A stunning idol of Lord Ganesha adorned with a red turban and gold dhoti against an illuminated purple backdrop.', hideFromReel: true },
  { year: '2010', category: 'decorations', titleMr: 'प्राचीन मंदिर मंडप (२०१०)', titleEn: 'Ancient Temple Pandal (2010)', themeMr: 'प्राचीन मंदिर', themeEn: 'Ancient Temple Theme', height: '—', artistMr: 'मंडळ कारागीर', artistEn: 'Mandal Artisans', image: '/images/2010_1.png', descMr: 'काळ्या पाषाणात कोरलेले प्राचीन मंदिर दर्शवणारी अप्रतिम मंडप सजावट.', descEn: 'A stunning pandal decoration depicting an intricately carved ancient stone temple.', hideFromReel: true },
  { year: '2010', category: 'idols', titleMr: 'श्री दर्शन (२०१०)', titleEn: 'Ganesha Darshan (2010)', themeMr: 'पारंपारिक दर्शन', themeEn: 'Traditional Darshan', height: '—', artistMr: 'मंडळ कारागीर', artistEn: 'Mandal Artisans', image: '/images/2010_2.jpg', descMr: 'लाल रंगाच्या पितांबरात आणि फेट्यात विराजमान झालेले श्रींचे सुंदर रूप.', descEn: 'A beautiful idol of Lord Ganesha adorned in a red dhoti and traditional turban.', hideFromReel: true },
  { year: '2009', category: 'decorations', titleMr: 'हिमपर्वत मंडप (दिवसाचे दृश्य)', titleEn: 'Snow Mountain Pandal (Day View)', themeMr: 'हिमपर्वत', themeEn: 'Snow Mountain Theme', height: '—', artistMr: 'मंडळ कारागीर', artistEn: 'Mandal Artisans', image: '/images/2009_1.png', descMr: 'हिमालयाच्या पर्वत रांगांवर आधारित भव्य मंडपाचे दिवसाचे दृश्य.', descEn: 'The magnificent snow-capped mountain themed pandal in daylight.', hideFromReel: true },
  { year: '2009', category: 'decorations', titleMr: 'हिमपर्वत मंडप (रात्रीचे दृश्य)', titleEn: 'Snow Mountain Pandal (Night View)', themeMr: 'हिमपर्वत', themeEn: 'Snow Mountain Theme', height: '—', artistMr: 'मंडळ कारागीर', artistEn: 'Mandal Artisans', image: '/images/2009_2.png', descMr: 'रात्रीच्या वेळी निळ्या प्रकाशात झगमगून उठणारा हिमपर्वत मंडप.', descEn: 'The snow mountain pandal beautifully illuminated with blue lights at night.', hideFromReel: true },
  { year: '2008', category: 'decorations', titleMr: 'मंडप सजावट (२००८)', titleEn: 'Interior Decoration (2008)', themeMr: 'कार्टून थीम', themeEn: 'Cartoon Theme', height: '—', artistMr: 'मंडळ कारागीर', artistEn: 'Mandal Artisans', image: '/images/2008_1.jpg', descMr: 'श्रींच्या समोर फुलांची सुंदर रांगोळी आणि आकर्षक मंडप सजावट.', descEn: 'Beautiful interior view featuring a floral rangoli and colorful theme in front of the idol.', hideFromReel: true },
  { year: '2008', category: 'decorations', titleMr: 'राजवाडा मंडप (२००८)', titleEn: 'Castle Theme Pandal (2008)', themeMr: 'कार्टून थीम', themeEn: 'Cartoon Theme', height: '—', artistMr: 'मंडळ कारागीर', artistEn: 'Mandal Artisans', image: '/images/2008_2.jpg', descMr: 'रात्रीच्या दिव्यांच्या रोषणाईत सजवलेला भव्य राजवाडा थीमवरील मंडप आणि कार्टून कॅरेक्टर्स.', descEn: 'The grand castle-themed pandal illuminated at night, featuring famous cartoon characters.', hideFromReel: true },
  { year: '2007', category: 'decorations', titleMr: 'क्रूझ शिप मंडप (रात्रीचे दृश्य)', titleEn: 'Cruise Ship Pandal (Night View)', themeMr: 'क्रूझ शिप', themeEn: 'Cruise Ship Theme', height: '—', artistMr: 'मंडळ कारागीर', artistEn: 'Mandal Artisans', image: '/images/2007_1.png', descMr: 'रात्रीच्या दिव्यांच्या रोषणाईत सजवलेला भव्य क्रूझ शिपच्या आकारातील मंडप.', descEn: 'A spectacular view of the cruise ship-themed pandal brilliantly illuminated at night.', hideFromReel: true },
  { year: '2007', category: 'idols', titleMr: 'श्री दर्शन (२००७)', titleEn: 'Ganesha Darshan (2007)', themeMr: 'काचेच्या घुमटात श्री', themeEn: 'Idol in Glass Dome', height: '—', artistMr: 'मंडळ कारागीर', artistEn: 'Mandal Artisans', image: '/images/2007_2.jpg', descMr: 'काचेच्या घुमटात विराजमान झालेले श्रींचे सुंदर रौप्य रूप.', descEn: 'The beautifully crafted silver idol seated inside a glass dome.', hideFromReel: true },
  { year: '2007', category: 'decorations', titleMr: 'क्रूझ शिप मंडप (दिवसाचे दृश्य)', titleEn: 'Cruise Ship Pandal (Day View)', themeMr: 'क्रूझ शिप', themeEn: 'Cruise Ship Theme', height: '—', artistMr: 'मंडळ कारागीर', artistEn: 'Mandal Artisans', image: '/images/2007_3.png', descMr: 'दिवसाच्या प्रकाशात दिसणारा भव्य क्रूझ शिप मंडप.', descEn: 'The grand cruise ship-themed pandal in daylight.', hideFromReel: true },
  { year: '2006', category: 'decorations', titleMr: 'भव्य मंडप सजावट (२००६)', titleEn: 'Grand Pandal Decoration (2006)', themeMr: 'राजवाडा सजावट', themeEn: 'Palace Decoration', height: '—', artistMr: 'मंडळ कारागीर', artistEn: 'Mandal Artisans', image: '/images/glimpses_2006_1.png', descMr: 'दिव्यांच्या रोषणाईने उजळून निघालेला राजवाड्याच्या थीमवरील भव्य मंडप.', descEn: 'A stunning view of the brilliantly illuminated palace-themed pandal at night.', hideFromReel: true },
  { year: '2006', category: 'events', titleMr: 'भव्य मिरवणूक (२००६)', titleEn: 'Grand Procession (2006)', themeMr: 'ढोल-ताशा आणि उत्साह', themeEn: 'Dhol Tasha & Celebration', height: '—', artistMr: 'मंडळ कारागीर', artistEn: 'Mandal Artisans', image: '/images/glimpses_2006_2.jpg', descMr: 'ढोल-ताशांच्या गजरात आणि उत्साहात साजरी होणारी भव्य मिरवणूक.', descEn: 'Devotees and a dhol tasha pathak celebrating during the grand procession.', hideFromReel: true },
  { year: '2005', category: 'idols', titleMr: 'श्री दर्शन (२००५)', titleEn: 'Ganesha Darshan (2005)', themeMr: 'स्वर्गीय देखावा', themeEn: 'Celestial Theme', height: '—', artistMr: 'मंडळ कारागीर', artistEn: 'Mandal Artisans', image: '/images/2005_1.jpg', descMr: 'तारका आणि ढगांनी सजवलेला भव्य स्वर्गीय देखावा.', descEn: 'A magnificent celestial theme featuring a starry sky and clouds.', hideFromReel: true },
  { year: '2005', category: 'idols', titleMr: 'श्री दर्शन (२००५)', titleEn: 'Ganesha Darshan (2005)', themeMr: 'श्रींचे दिव्य रूप', themeEn: 'Divine Idol', height: '—', artistMr: 'मंडळ कारागीर', artistEn: 'Mandal Artisans', image: '/images/2005_2.jpg', descMr: 'ढगांच्या आसनावर विराजमान झालेले श्रींचे सुंदर रूप.', descEn: 'The beautifully crafted idol seated on a cloud-like structure.', hideFromReel: true },
  { year: '2005', category: 'idols', titleMr: 'श्री दर्शन (२००५)', titleEn: 'Ganesha Darshan (2005)', themeMr: 'पूजा आणि आरती', themeEn: 'Puja & Aarti', height: '—', artistMr: 'मंडळ कारागीर', artistEn: 'Mandal Artisans', image: '/images/2005_3.jpg', descMr: 'श्रींच्या सभोवताली पूजा करताना पुरोहित.', descEn: 'Priests performing traditional puja before the idol.', hideFromReel: true },
  { year: '2004', category: 'idols', titleMr: 'श्री दर्शन (२००४)', titleEn: 'Ganesha Darshan (2004)', themeMr: 'पारंपारिक दर्शन', themeEn: 'Traditional Darshan', height: '—', artistMr: 'मंडळ कारागीर', artistEn: 'Mandal Artisans', image: '/images/sahyadri-decoration-lights.jpg', descMr: '२००४ सालचे सुंदर श्री रूप.', descEn: 'Ganesha idol from 2004.', hideFromReel: true },
  { year: '2003', category: 'idols', titleMr: 'श्री दर्शन (२००३)', titleEn: 'Ganesha Darshan (2003)', themeMr: 'पारंपारिक दर्शन', themeEn: 'Traditional Darshan', height: '—', artistMr: 'मंडळ कारागीर', artistEn: 'Mandal Artisans', image: '/images/sahyadri-decoration-night.jpg', descMr: '२००३ सालचे सुंदर श्री रूप.', descEn: 'Ganesha idol from 2003.', hideFromReel: true },
  { year: '2002', category: 'idols', titleMr: 'श्री दर्शन (२००२)', titleEn: 'Ganesha Darshan (2002)', themeMr: 'पारंपारिक दर्शन', themeEn: 'Traditional Darshan', height: '—', artistMr: 'मंडळ कारागीर', artistEn: 'Mandal Artisans', image: '/images/sahyadri-decoration-palace.jpg', descMr: '२००२ सालचे सुंदर श्री रूप.', descEn: 'Ganesha idol from 2002.', hideFromReel: true },
  { year: '2001', category: 'idols', titleMr: 'श्री दर्शन (२००१)', titleEn: 'Ganesha Darshan (2001)', themeMr: 'पारंपारिक दर्शन', themeEn: 'Traditional Darshan', height: '—', artistMr: 'मंडळ कारागीर', artistEn: 'Mandal Artisans', image: '/images/sahyadri-decoration-lights.jpg', descMr: '२००१ सालचे सुंदर श्री रूप.', descEn: 'Ganesha idol from 2001.', hideFromReel: true },
  { year: '2000', category: 'idols', titleMr: 'श्री दर्शन (२०००)', titleEn: 'Ganesha Darshan (2000)', themeMr: 'पारंपारिक दर्शन', themeEn: 'Traditional Darshan', height: '—', artistMr: 'मंडळ कारागीर', artistEn: 'Mandal Artisans', image: '/images/sahyadri-ganpati-02.jpg', descMr: '२००० सालचे सुंदर श्री रूप.', descEn: 'Ganesha idol from 2000.', hideFromReel: true },
  { year: '1999', category: 'idols', titleMr: 'श्री दर्शन (१९९९)', titleEn: 'Ganesha Darshan (1999)', themeMr: 'पारंपारिक दर्शन', themeEn: 'Traditional Darshan', height: '—', artistMr: 'मंडळ कारागीर', artistEn: 'Mandal Artisans', image: '/images/sahyadri-decoration-cave.jpg', descMr: '१९९९ सालचे सुंदर श्री रूप.', descEn: 'Ganesha idol from 1999.', hideFromReel: true },
  { year: '1998', category: 'idols', titleMr: 'श्री दर्शन (१९९८)', titleEn: 'Ganesha Darshan (1998)', themeMr: 'पारंपारिक दर्शन', themeEn: 'Traditional Darshan', height: '—', artistMr: 'मंडळ कारागीर', artistEn: 'Mandal Artisans', image: '/images/sahyadri-ganpati-02.jpg', descMr: '१९९८ सालचे सुंदर श्री रूप.', descEn: 'Ganesha idol from 1998.', hideFromReel: true },
  { year: '1997', category: 'idols', titleMr: 'श्री दर्शन (१९९७)', titleEn: 'Ganesha Darshan (1997)', themeMr: 'पारंपारिक दर्शन', themeEn: 'Traditional Darshan', height: '—', artistMr: 'मंडळ कारागीर', artistEn: 'Mandal Artisans', image: '/images/sahyadri-ganpati-01.jpg', descMr: '१९९७ सालचे सुंदर श्री रूप.', descEn: 'Ganesha idol from 1997.', hideFromReel: true },
  { year: '1996', category: 'idols', titleMr: 'श्री दर्शन (१९९६)', titleEn: 'Ganesha Darshan (1996)', themeMr: 'पारंपारिक दर्शन', themeEn: 'Traditional Darshan', height: '—', artistMr: 'मंडळ कारागीर', artistEn: 'Mandal Artisans', image: '/images/sahyadri-ganpati-01.jpg', descMr: '१९९६ सालचे सुंदर श्री रूप.', descEn: 'Ganesha idol from 1996.', hideFromReel: true },
  { year: '1995', category: 'idols', titleMr: 'श्री दर्शन (१९९५)', titleEn: 'Ganesha Darshan (1995)', themeMr: 'पारंपारिक दर्शन', themeEn: 'Traditional Darshan', height: '—', artistMr: 'मंडळ कारागीर', artistEn: 'Mandal Artisans', image: '/images/sahyadri-decoration-lights.jpg', descMr: '१९९५ सालचे सुंदर श्री रूप.', descEn: 'Ganesha idol from 1995.', hideFromReel: true },
  { year: '1994', category: 'idols', titleMr: 'श्री दर्शन (१९९४)', titleEn: 'Ganesha Darshan (1994)', themeMr: 'पारंपारिक दर्शन', themeEn: 'Traditional Darshan', height: '—', artistMr: 'मंडळ कारागीर', artistEn: 'Mandal Artisans', image: '/images/sahyadri-decoration-night.jpg', descMr: '१९९४ सालचे सुंदर श्री रूप.', descEn: 'Ganesha idol from 1994.', hideFromReel: true },
  { year: '1993', category: 'idols', titleMr: 'श्री दर्शन (१९९३)', titleEn: 'Ganesha Darshan (1993)', themeMr: 'पारंपारिक दर्शन', themeEn: 'Traditional Darshan', height: '—', artistMr: 'मंडळ कारागीर', artistEn: 'Mandal Artisans', image: '/images/sahyadri-decoration-night.jpg', descMr: '१९९३ सालचे सुंदर श्री रूप.', descEn: 'Ganesha idol from 1993.', hideFromReel: true },
  { year: '1992', category: 'idols', titleMr: 'श्री दर्शन (१९९२)', titleEn: 'Ganesha Darshan (1992)', themeMr: 'पारंपारिक दर्शन', themeEn: 'Traditional Darshan', height: '—', artistMr: 'मंडळ कारागीर', artistEn: 'Mandal Artisans', image: '/images/sahyadri-decoration-cave.jpg', descMr: '१९९२ सालचे सुंदर श्री रूप.', descEn: 'Ganesha idol from 1992.', hideFromReel: true },
  { year: '1991', category: 'idols', titleMr: 'श्री दर्शन (१९९१)', titleEn: 'Ganesha Darshan (1991)', themeMr: 'पारंपारिक दर्शन', themeEn: 'Traditional Darshan', height: '—', artistMr: 'मंडळ कारागीर', artistEn: 'Mandal Artisans', image: '/images/sahyadri-decoration-temple.jpg', descMr: '१९९१ सालचे सुंदर श्री रूप.', descEn: 'Ganesha idol from 1991.', hideFromReel: true },
  { year: '1990', category: 'idols', titleMr: 'श्री दर्शन (१९९०)', titleEn: 'Ganesha Darshan (1990)', themeMr: 'पारंपारिक दर्शन', themeEn: 'Traditional Darshan', height: '—', artistMr: 'मंडळ कारागीर', artistEn: 'Mandal Artisans', image: '/images/sahyadri-decoration-cave.jpg', descMr: '१९९० सालचे सुंदर श्री रूप.', descEn: 'Ganesha idol from 1990.', hideFromReel: true }
];

// Social Work Data
const socialWorkData = [
  {
    id: 'tulsi-vatap',
    title: 'तुळशी वाटप - आषाढी एकादशी', titleMr: 'तुळशी वाटप - आषाढी एकादशी', titleEn: 'Tulsi Vatap - Ashadhi Ekadashi',
    category: 'Environment', categoryMr: 'पर्यावरण', categoryEn: 'Environment',
    image: '/images/sahyadri-decoration-cave.jpg',
    desc: 'आषाढी एकादशी निमित्त मंडळातर्फे तुळशी वाटप. प्रमुख पाहुणे श्री. अरुण भाई दुधवडकर यांच्या हस्ते भाविकांना तुळशी रोपांचे वाटप.', descMr: 'आषाढी एकादशी निमित्त मंडळातर्फे तुळशी वाटप. प्रमुख पाहुणे श्री. अरुण भाई दुधवडकर यांच्या हस्ते भाविकांना तुळशी रोपांचे वाटप.', descEn: 'Tulsi vatap from mandal on the occasion of Ashadhi Ekadashi. Special guest Mr. Arun Bhai Dudhwadkar distributed tulsi saplings to everyone.'
  },
  {
    id: 'school-kits',
    title: 'शालेय साहित्य वाटप', titleMr: 'शालेय साहित्य वाटप', titleEn: 'School Kits Distribution',
    category: 'Education', categoryMr: 'शैक्षणिक मदत', categoryEn: 'Education',
    image: '/images/sahyadri-ganpati-02.jpg',
    desc: 'परिसरातील सर्व विद्यार्थ्यांसाठी शालेय साहित्याचे वाटप.', descMr: 'परिसरातील सर्व विद्यार्थ्यांसाठी शालेय साहित्याचे वाटप.', descEn: 'School kits drive in our area for all the students.'
  },
  {
    id: '2017-rain-relief',
    title: '२०१७ अतिवृष्टी मदत - अन्न व निवारा', titleMr: '२०१७ अतिवृष्टी मदत - अन्न व निवारा', titleEn: '2017 Heavy Rain Relief - Food & Shelter',
    category: 'Disaster Relief', categoryMr: 'आपत्कालीन मदत', categoryEn: 'Disaster Relief',
    image: '/images/sahyadri-ganpati-01.jpg',
    desc: '२०१७ च्या मुसळधार पावसात गणेशोत्सवादरम्यान रेल्वे स्थानकावर अडकलेल्या नागरिकांसाठी अन्न आणि जवळच्या शाळेत निवाऱ्याची सोय.', descMr: '२०१७ च्या मुसळधार पावसात गणेशोत्सवादरम्यान रेल्वे स्थानकावर अडकलेल्या नागरिकांसाठी अन्न आणि जवळच्या शाळेत निवाऱ्याची सोय.', descEn: 'During the 2017 heavy rains in Mumbai amidst Ganeshotsav, provided meals and arranged shelter in a nearby school for people stranded at the railway station.'
  },
  {
    id: 'food-distribution-nov2025',
    title: 'भाजी गल्ली, गणेश चौक अन्नदान', titleMr: 'भाजी गल्ली, गणेश चौक अन्नदान', titleEn: 'Food Distribution at Bhajji Galli, Ganesh Chowk',
    category: 'Food Security', categoryMr: 'अन्नसुरक्षा', categoryEn: 'Food Security',
    date: 'Nov 2025', dateMr: 'नोव्हेंबर २०२५', dateEn: 'Nov 2025',
    image: '/images/sahyadri-decoration-cave.jpg',
    desc: 'भाजी गल्लीतील गणेश चौकात नागरिकांसाठी अन्न वाटपाचा उपक्रम.', descMr: 'भाजी गल्लीतील गणेश चौकात नागरिकांसाठी अन्न वाटपाचा उपक्रम.', descEn: 'Food distribution drive conducted at Bhajji Galli, near Ganesh Chowk for the local community.'
  },
  {
    id: 'escalator-request-dec2025',
    title: 'ग्रँट रोड स्टेशन एस्केलेटर मागणी', titleMr: 'ग्रँट रोड स्टेशन एस्केलेटर मागणी', titleEn: 'Grant Road Station Escalator Request',
    category: 'Civic Issue', categoryMr: 'नागरी सुविधा', categoryEn: 'Civic Issue',
    date: 'Dec 2025', dateMr: 'डिसेंबर २०२५', dateEn: 'Dec 2025',
    image: '/images/sahyadri-decoration-night.jpg',
    desc: 'स्थानिक रहिवासी आणि प्रवाशांच्या सोयीसाठी ग्रँट रोड स्टेशनवर एस्केलेटर बसवण्याची मागणी करणारे पत्र रेल्वे स्टेशन मास्तर यांना देण्यात आले.', descMr: 'स्थानिक रहिवासी आणि प्रवाशांच्या सोयीसाठी ग्रँट रोड स्टेशनवर एस्केलेटर बसवण्याची मागणी करणारे पत्र रेल्वे स्टेशन मास्तर यांना देण्यात आले.', descEn: 'Submitted a formal request letter to the Railway Station Master on behalf of local residents and commuters to install an escalator at Grant Road Station.'
  },
  {
    id: 'food-distribution-jan2026',
    title: 'किंग जॉर्ज मेमोरियल स्कूल अन्नदान', titleMr: 'किंग जॉर्ज मेमोरियल स्कूल अन्नदान', titleEn: 'Food Distribution at King George Memorial School',
    category: 'Food Security', categoryMr: 'अन्नसुरक्षा', categoryEn: 'Food Security',
    date: 'Jan 2026', dateMr: 'जानेवारी २०२६', dateEn: 'Jan 2026',
    image: '/images/sahyadri-ganpati-02.jpg',
    desc: 'किंग जॉर्ज मेमोरियल स्कूल येथे विद्यार्थी आणि गरजू लोकांसाठी अन्न वाटपाचा उपक्रम राबविण्यात आला.', descMr: 'किंग जॉर्ज मेमोरियल स्कूल येथे विद्यार्थी आणि गरजू लोकांसाठी अन्न वाटपाचा उपक्रम राबविण्यात आला.', descEn: 'Conducted a food distribution drive at King George Memorial School for students and those in need.'
  },
  {
    id: 'khichadi-vatap-feb2026',
    title: 'महाशिवरात्री निमित्त खिचडी वाटप', titleMr: 'महाशिवरात्री निमित्त खिचडी वाटप', titleEn: 'Mahashivratri Khichadi Vatap',
    category: 'Food Security', categoryMr: 'अन्नसुरक्षा', categoryEn: 'Food Security',
    date: 'Feb 2026', dateMr: 'फेब्रुवारी २०२६', dateEn: 'Feb 2026',
    image: '/images/sahyadri-ganpati-02.jpg',
    desc: 'महाशिवरात्रीच्या निमित्ताने विजयदत्त स्वामी समर्थ मठ, करी रोड येथे १००० लोकांसाठी उपवासाची खिचडी वाटप.', descMr: 'महाशिवरात्रीच्या निमित्ताने विजयदत्त स्वामी समर्थ मठ, करी रोड येथे १००० लोकांसाठी उपवासाची खिचडी वाटप.', descEn: 'Distributed Upwas Khichadi to 1000 people on the occasion of Mahashivratri at Vijaydatta Swami Samarth Math, Curry Road.'
  },
  {
    id: 'blind-school-donation-march2026',
    title: 'व्हिक्टोरिया मेमोरियल स्कूल अंधांसाठी मदत', titleMr: 'व्हिक्टोरिया मेमोरियल स्कूल अंधांसाठी मदत', titleEn: 'Donation at Victoria Memorial School for Blind',
    category: 'Education & Essentials', categoryMr: 'शिक्षण आणि आवश्यक वस्तू', categoryEn: 'Education & Essentials',
    date: 'March 2026', dateMr: 'मार्च २०२६', dateEn: 'March 2026',
    image: '/images/sahyadri-decoration-lights.jpg',
    desc: 'व्हिक्टोरिया मेमोरियल स्कूलमधील अंध विद्यार्थ्यांसाठी अन्नधान्य, जीवनावश्यक वस्तू आणि अभ्यास संचांचे वाटप.', descMr: 'व्हिक्टोरिया मेमोरियल स्कूलमधील अंध विद्यार्थ्यांसाठी अन्नधान्य, जीवनावश्यक वस्तू आणि अभ्यास संचांचे वाटप.', descEn: 'Provided food ingredients, various essential items, and study kits to blind students at the Victoria Memorial School for the Blind.'
  },
  {
    id: 'chappan-bhog-april2026',
    title: 'गणेश चौकात ५६ भोग प्रसाद', titleMr: 'गणेश चौकात ५६ भोग प्रसाद', titleEn: '56 Bhog Prasad at Ganesh Chowk',
    category: 'Religious Event', categoryMr: 'धार्मिक कार्यक्रम', categoryEn: 'Religious Event',
    date: 'April 2026', dateMr: 'एप्रिल २०२६', dateEn: 'April 2026',
    image: '/images/sahyadri-decoration-night.jpg',
    desc: 'गणेश चौक येथे गणपती बाप्पाला ५६ भोगाचा प्रसाद अर्पण करण्यात आला.', descMr: 'गणेश चौक येथे गणपती बाप्पाला ५६ भोगाचा प्रसाद अर्पण करण्यात आला.', descEn: 'Offered 56 Bhog Prasad to our Ganpati at Ganesh Chowk.'
  },
  {
    id: 'khichadi-vatap-july2026',
    title: 'आषाढी एकादशी निमित्त खिचडी वाटप', titleMr: 'आषाढी एकादशी निमित्त खिचडी वाटप', titleEn: 'Ashadhi Ekadashi Khichadi Vatap',
    category: 'Food Security', categoryMr: 'अन्नसुरक्षा', categoryEn: 'Food Security',
    date: 'July 2026', dateMr: 'जुलै २०२६', dateEn: 'July 2026',
    image: '/images/sahyadri-ganpati-02.jpg',
    desc: 'आषाढी एकादशीच्या निमित्ताने विजयदत्त स्वामी समर्थ मठ, करी रोड येथे स्वामी समर्थ आणि विठ्ठलाच्या १५०० भक्तांसाठी खिचडी वाटप.', descMr: 'आषाढी एकादशीच्या निमित्ताने विजयदत्त स्वामी समर्थ मठ, करी रोड येथे स्वामी समर्थ आणि विठ्ठलाच्या १५०० भक्तांसाठी खिचडी वाटप.', descEn: 'Distributed Khichadi to 1500 devotees of Swami Samarth and Vitthal on the occasion of Ashadhi Ekadashi at Vijaydatta Swami Samarth Math, Curry Road.'
  }
];

// Committee Members Data - 2025-26
const committeeData = [
  { number: 1, nameMr: 'सह्याद्री क्रीडा मंडळ कार्यकारिणी सदस्य 1', nameEn: 'Sahyadri Krida Mandal Committee Member 1', designationMr: 'कार्याध्यक्ष', designationEn: 'Working President', image: '/images/sahyadri-decoration-palace.jpg' },
  { number: 2, nameMr: 'सह्याद्री क्रीडा मंडळ कार्यकारिणी सदस्य 2', nameEn: 'Sahyadri Krida Mandal Committee Member 2', designationMr: 'अध्यक्ष', designationEn: 'President', image: '/images/sahyadri-ganpati-02.jpg' },
  { number: 3, nameMr: 'सह्याद्री क्रीडा मंडळ कार्यकारिणी सदस्य 3', nameEn: 'Sahyadri Krida Mandal Committee Member 3', designationMr: 'उपाध्यक्ष', designationEn: 'Vice President', image: '/images/sahyadri-ganpati-02.jpg' },
  { number: 4, nameMr: 'सह्याद्री क्रीडा मंडळ कार्यकारिणी सदस्य 4', nameEn: 'Sahyadri Krida Mandal Committee Member 4', designationMr: 'उपाध्यक्ष', designationEn: 'Vice President', image: '/images/sahyadri-ganpati-01.jpg' },
  { number: 5, nameMr: 'सह्याद्री क्रीडा मंडळ कार्यकारिणी सदस्य 5', nameEn: 'Sahyadri Krida Mandal Committee Member 5', designationMr: 'उपाध्यक्ष', designationEn: 'Vice President', image: '/images/sahyadri-ganpati-01.jpg' },
  { number: 6, nameMr: 'सह्याद्री क्रीडा मंडळ कार्यकारिणी सदस्य 6', nameEn: 'Sahyadri Krida Mandal Committee Member 6', designationMr: 'सचिव', designationEn: 'Secretary', image: '/images/sahyadri-decoration-temple.jpg' },
  { number: 7, nameMr: 'सह्याद्री क्रीडा मंडळ कार्यकारिणी सदस्य 7', nameEn: 'Sahyadri Krida Mandal Committee Member 7', designationMr: 'सहसचिव', designationEn: 'Joint Secretary', image: '/images/sahyadri-decoration-temple.jpg' },
  { number: 8, nameMr: 'सह्याद्री क्रीडा मंडळ कार्यकारिणी सदस्य 8', nameEn: 'Sahyadri Krida Mandal Committee Member 8', designationMr: 'सहसचिव', designationEn: 'Joint Secretary', image: '/images/sahyadri-decoration-palace.jpg' },
  { number: 9, nameMr: 'सह्याद्री क्रीडा मंडळ कार्यकारिणी सदस्य 9', nameEn: 'Sahyadri Krida Mandal Committee Member 9', designationMr: 'सहसचिव', designationEn: 'Joint Secretary', image: '/images/sahyadri-ganpati-01.jpg' },
  { number: 10, nameMr: 'सह्याद्री क्रीडा मंडळ कार्यकारिणी सदस्य 10', nameEn: 'Sahyadri Krida Mandal Committee Member 10', designationMr: 'सहसचिव', designationEn: 'Joint Secretary', image: '/images/sahyadri-ganpati-01.jpg' },
  { number: 11, nameMr: 'सह्याद्री क्रीडा मंडळ कार्यकारिणी सदस्य 11', nameEn: 'Sahyadri Krida Mandal Committee Member 11', designationMr: 'खजिनदार', designationEn: 'Treasurer', image: '/images/sahyadri-decoration-cave.jpg' },
  { number: 12, nameMr: 'सह्याद्री क्रीडा मंडळ कार्यकारिणी सदस्य 12', nameEn: 'Sahyadri Krida Mandal Committee Member 12', designationMr: 'खजिनदार', designationEn: 'Treasurer', image: '/images/sahyadri-decoration-lights.jpg' },
  { number: 13, nameMr: 'सह्याद्री क्रीडा मंडळ कार्यकारिणी सदस्य 13', nameEn: 'Sahyadri Krida Mandal Committee Member 13', designationMr: 'खजिनदार', designationEn: 'Treasurer', image: '/images/sahyadri-ganpati-02.jpg' },
  { number: 14, nameMr: 'सह्याद्री क्रीडा मंडळ कार्यकारिणी सदस्य 14', nameEn: 'Sahyadri Krida Mandal Committee Member 14', designationMr: 'सह खजिनदार', designationEn: 'Joint Treasurer', image: '/images/sahyadri-ganpati-02.jpg' },
  { number: 15, nameMr: 'सह्याद्री क्रीडा मंडळ कार्यकारिणी सदस्य 15', nameEn: 'Sahyadri Krida Mandal Committee Member 15', designationMr: 'सह खजिनदार', designationEn: 'Joint Treasurer', image: '/images/sahyadri-ganpati-01.jpg' },
  { number: 16, nameMr: 'सह्याद्री क्रीडा मंडळ कार्यकारिणी सदस्य 16', nameEn: 'Sahyadri Krida Mandal Committee Member 16', designationMr: 'सह खजिनदार', designationEn: 'Joint Treasurer', image: '/images/sahyadri-decoration-lights.jpg' },
  { number: 17, nameMr: 'सह्याद्री क्रीडा मंडळ कार्यकारिणी सदस्य 17', nameEn: 'Sahyadri Krida Mandal Committee Member 17', designationMr: 'संयोजक', designationEn: 'Coordinator', image: '/images/sahyadri-decoration-temple.jpg' },
  { number: 18, nameMr: 'सह्याद्री क्रीडा मंडळ कार्यकारिणी सदस्य 18', nameEn: 'Sahyadri Krida Mandal Committee Member 18', designationMr: 'संयोजक', designationEn: 'Coordinator', image: '/images/sahyadri-decoration-night.jpg' },
  { number: 19, nameMr: 'सह्याद्री क्रीडा मंडळ कार्यकारिणी सदस्य 19', nameEn: 'Sahyadri Krida Mandal Committee Member 19', designationMr: 'संयोजक', designationEn: 'Coordinator', image: '/images/sahyadri-decoration-night.jpg' },
  { number: 20, nameMr: 'सह्याद्री क्रीडा मंडळ कार्यकारिणी सदस्य 20', nameEn: 'Sahyadri Krida Mandal Committee Member 20', designationMr: 'स्मरणिका प्रमुख', designationEn: 'Souvenir Head', image: '/images/sahyadri-decoration-temple.jpg', objectPosition: 'left center' },
  { number: 21, nameMr: 'सह्याद्री क्रीडा मंडळ कार्यकारिणी सदस्य 21', nameEn: 'Sahyadri Krida Mandal Committee Member 21', designationMr: 'स्मरणिका प्रमुख', designationEn: 'Souvenir Head', image: '/images/sahyadri-decoration-lights.jpg' },
  { number: 22, nameMr: 'सह्याद्री क्रीडा मंडळ कार्यकारिणी सदस्य 22', nameEn: 'Sahyadri Krida Mandal Committee Member 22', designationMr: 'स्मरणिका प्रमुख', designationEn: 'Souvenir Head', image: '/images/sahyadri-ganpati-01.jpg' },
  { number: 23, nameMr: 'सह्याद्री क्रीडा मंडळ कार्यकारिणी सदस्य 23', nameEn: 'Sahyadri Krida Mandal Committee Member 23', designationMr: 'स्मरणिका प्रमुख', designationEn: 'Souvenir Head', image: '/images/sahyadri-decoration-palace.jpg' },
  { number: 24, nameMr: 'सह्याद्री क्रीडा मंडळ कार्यकारिणी सदस्य 24', nameEn: 'Sahyadri Krida Mandal Committee Member 24', designationMr: 'संयोजक', designationEn: 'Coordinator', image: '/images/sahyadri-decoration-night.jpg' }
];

module.exports = {
  // Render Home Page
  renderHomePage(req, res) {
    const status = db.getYatraStatus();
    res.render('index', {
      title: 'Sahyadri Krida Mandal',
      activeTab: 'home',
      yatraStatus: status,
      scheduleData: scheduleData.slice(0, 4),
      glimpsesData,
      socialWorkData
    });
  },

  // Render About Us Page
  renderAboutPage(req, res) {
    res.render('about', {
      title: 'आमच्याबद्दल | Sahyadri Krida Mandal Official',
      activeTab: 'about'
    });
  },

  // Render Schedule Page
  renderSchedulePage(req, res) {
    const status = db.getYatraStatus();
    res.render('schedule', {
      title: 'गणेशोत्सव कार्यसूची व आरती वेळ | Sahyadri Krida Mandal',
      activeTab: 'schedule',
      yatraStatus: status,
      scheduleData
    });
  },

  // Render Glimpses Page
  renderGlimpsesPage(req, res) {
    res.render('glimpses', {
      title: 'वर्षभरातील क्षणचित्रे | Sahyadri Krida Mandal',
      activeTab: 'glimpses',
      glimpsesData
    });
  },

  // Render Decade Gallery (Renamed from Photo Booth)
  renderPhotoBoothPage(req, res) {
    res.render('photo-booth', {
      title: 'दशकातील क्षणचित्रे (२०१५-२०२५) | Sahyadri Krida Mandal',
      activeTab: 'photobooth',
      glimpsesData
    });
  },

  // Render Social Work Page
  renderSocialWorkPage(req, res) {
    res.render('social-work', {
      title: 'सामाजिक कार्य व सेवा | Sahyadri Krida Mandal',
      activeTab: 'socialwork',
      socialWorkData
    });
  },

  renderCommitteePage(req, res) {
    res.render('committee', {
      title: 'कार्यकारिणी समिती | Sahyadri Krida Mandal',
      activeTab: 'committee',
      committeeData
    });
  },

  // Live Status API
  getLiveStatusApi(req, res) {
    const status = db.getYatraStatus();
    res.json({ success: true, status });
  }
};
