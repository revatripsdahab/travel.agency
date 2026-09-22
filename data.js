/**
 * Reva Trips - Default Database & Configuration (Updated)
 */
window.REVA_DEFAULT_DATA = {
  "settings": {
    "siteName": "Reva Trips",
    "logoText": "REVA.TRIPS",
    "primaryColor": "#FE3A00",
    "whatsappNumber": "201040950571",
    "phoneNumber": "01040950571",
    "email": "info@revatrips.com",
    "heroTitleAr": "إقامتك المثالية في أرقى الفنادق",
    "heroTitleEn": "Your Dream Stay in Sinai & Egypt, Effortlessly Curated",
    "heroSubtitleAr": "نختار لك بعناية أرقى الفنادق وأجمل الكامبات البيئية مع أفضل الأسعار وتأكيد حجز سريع ومباشر",
    "heroSubtitleEn": "Handpicked boutique hotels and serene eco-camps in Dahab, Sharm El Sheikh, and Nuweiba at the best rates with instant assistance.",
    "heroImageUrl": "https://images.unsplash.com/photo-1544551763-46a013bb70d5?q=80&w=2070&auto=format&fit=crop",
    "aboutStoryAr": "شركة Reva Trips هي وجهتك الأولى لحجز وتنظيم الإقامات والرحلات في سيناء ومصر. نتميز بالشفافية والأسعار المباشرة والمتابعة الدائمة مع عملائنا.",
    "aboutStoryEn": "Reva Trips is your premier gateway for authentic Sinai stays and travel experiences across Egypt."
  },
  "destinations": [
    {
      "id": "dest_1",
      "slug": "dahab",
      "nameAr": "دهب",
      "nameEn": "Dahab",
      "coverImage": "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1600&auto=format&fit=crop",
      "descAr": "عاصمة الهدوء والاسترخاء والغطس في سيناء، ومياه البحر الأحمر الصافية.",
      "descEn": "The bohemian jewel of Sinai, famous for world-class diving and serene vibes."
    },
    {
      "id": "dest_2",
      "slug": "sharm",
      "nameAr": "شرم الشيخ",
      "nameEn": "Sharm El Sheikh",
      "coverImage": "https://images.unsplash.com/photo-1571896349842-33c89424de2d?q=80&w=1600&auto=format&fit=crop",
      "descAr": "مدينة السلام والمنتجعات الفاخرة، ومحمية رأس محمد ورياضات الغوص.",
      "descEn": "The cosmopolitan resort capital with luxury beachfront resorts."
    },
    {
      "id": "dest_3",
      "slug": "nuweiba",
      "nameAr": "نويبع",
      "nameEn": "Nuweiba",
      "coverImage": "https://images.unsplash.com/photo-1510312305653-8ed496efae75?q=80&w=1600&auto=format&fit=crop",
      "descAr": "واحة السكينة والكامبات البيئية في رأس شيطان على شاطئ البحر مباشرة.",
      "descEn": "The sanctuary of untouched tranquility and eco-lodges in Ras Shaitan."
    }
  ],
  "hotels": [
    {
      "id": "hotel_1",
      "destId": "dest_1",
      "destNameAr": "دهب",
      "destNameEn": "Dahab",
      "nameAr": "كامب وفندق بيدوين مون دهب",
      "nameEn": "Bedouin Moon Eco Camp & Hotel",
      "type": "Camp",
      "coverImage": "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=1600&auto=format&fit=crop",
      "gallery": [
        "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=1600&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1582719508461-905c673771fd?q=80&w=1600&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1590490360182-c33d57733427?q=80&w=1600&auto=format&fit=crop"
      ],
      "descAr": "إقامة هادئة على شاطئ دهب مباشرة مع حمام سباحة وإطلالة جبلية وبحرية ساحرة ومطعم بدوي أصيل.",
      "descEn": "A tranquil beachfront eco-camp with a pool and an authentic Bedouin restaurant.",
      "rating": 4.9,
      "amenities": [
        "واي فاي سريع",
        "حمام سباحة",
        "شاطئ خاص",
        "تكييف",
        "مطعم بدوي"
      ],
      "rooms": [
        {
          "id": "room_1",
          "nameAr": "غرفة مزدوجة مطلة على المسبح",
          "nameEn": "Pool View Double Room",
          "price": 1350,
          "customLabel": "للفرد في الليلة شامل الإفطار",
          "pricingType": "per_person_per_night"
        },
        {
          "id": "room_2",
          "nameAr": "شاليه عائلي مطل على البحر",
          "nameEn": "Family Sea Chalet",
          "price": 3800,
          "customLabel": "سعر الشاليه بالكامل لليلة",
          "pricingType": "per_room_per_night"
        }
      ]
    },
    {
      "id": "hotel_2",
      "destId": "dest_1",
      "destNameAr": "دهب",
      "destNameEn": "Dahab",
      "nameAr": "منتجع لايتهاوس باي بوتيك دهب",
      "nameEn": "Lighthouse Bay Boutique Resort",
      "type": "Resort",
      "coverImage": "https://images.unsplash.com/photo-1540541338287-41700207dee6?q=80&w=1600&auto=format&fit=crop",
      "gallery": [
        "https://images.unsplash.com/photo-1540541338287-41700207dee6?q=80&w=1600&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?q=80&w=1600&auto=format&fit=crop"
      ],
      "descAr": "بوتيك ريزورت فاخر في قلب منطقة اللايتهاوس والممشى السياحي مع شاطئ خاص وتجربة إقامة راقية.",
      "descEn": "A luxury boutique resort located in the heart of Lighthouse promenade.",
      "rating": 5,
      "amenities": [
        "شاطئ خاص",
        "إفطار بوفيه مفتوح",
        "واي فاي عالي السرعة",
        "سبا وجاكوزي"
      ],
      "rooms": [
        {
          "id": "room_3",
          "nameAr": "جناح تنفيذي بحري فاخر",
          "nameEn": "Executive Sea Suite",
          "price": 5200,
          "customLabel": "للجناح في الليلة شامل الخدمة والضريبة",
          "pricingType": "per_room_per_night"
        }
      ]
    },
    {
      "id": "hotel_3",
      "destId": "dest_3",
      "destNameAr": "نويبع",
      "destNameEn": "Nuweiba",
      "nameAr": "كامب رأس شيطان إيكو لودج نويبع",
      "nameEn": "Ras Shaitan Eco Lodge & Camp",
      "type": "Camp",
      "coverImage": "https://images.unsplash.com/photo-1510312305653-8ed496efae75?q=80&w=1600&auto=format&fit=crop",
      "gallery": [
        "https://images.unsplash.com/photo-1510312305653-8ed496efae75?q=80&w=1600&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1600&auto=format&fit=crop"
      ],
      "descAr": "أكواخ شاطئية بيئية مصنوعة من البامبو على مياه البحر مباشرة مع جلسات بدوية وسهرات نار.",
      "descEn": "Charming bamboo beach huts directly on the shoreline with campfire evenings.",
      "rating": 4.8,
      "amenities": [
        "شاطئ رملي خاص",
        "أكواخ مكيفة",
        "مطعم سيناوي",
        "سهرات نار شاطئية"
      ],
      "rooms": [
        {
          "id": "room_4",
          "nameAr": "كوخ شاطئي بامبو مكيف",
          "nameEn": "Deluxe AC Bamboo Hut",
          "price": 950,
          "customLabel": "للفرد في الليلة شامل وجبتين",
          "pricingType": "per_person_per_night"
        }
      ]
    },
    {
      "id": "hotel_4",
      "destId": "dest_2",
      "destNameAr": "شرم الشيخ",
      "destNameEn": "Sharm El Sheikh",
      "nameAr": "منتجع ريفا كورال بيتش شرم الشيخ",
      "nameEn": "Reva Coral Beach Resort Sharm",
      "type": "Resort",
      "coverImage": "https://images.unsplash.com/photo-1571896349842-33c89424de2d?q=80&w=1600&auto=format&fit=crop",
      "gallery": [
        "https://images.unsplash.com/photo-1571896349842-33c89424de2d?q=80&w=1600&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1582719508461-905c673771fd?q=80&w=1600&auto=format&fit=crop"
      ],
      "descAr": "منتجع 5 نجوم فاخر في خليج القرش مع 3 أحواض سباحة، شاطئ رملي، وأكوا بارك ومطاعم متنوعة.",
      "descEn": "5-star luxury resort in Sharks Bay featuring 3 pools, private coral beach, and international dining.",
      "rating": 4.9,
      "amenities": [
        "3 أحواض سباحة",
        "أكوا بارك",
        "شاطئ خاص بالمرجان",
        "شامل كلياً (All-Inclusive)"
      ],
      "rooms": [
        {
          "id": "room_5",
          "nameAr": "غرفة ديلوكس شاملة كلياً",
          "nameEn": "Deluxe All-Inclusive Room",
          "price": 2600,
          "customLabel": "للفرد في الليلة (All Inclusive)",
          "pricingType": "per_person_per_night"
        }
      ]
    },
    {
      "id": "hotel_1790111361895",
      "destId": "dest_1",
      "destNameAr": "دهب",
      "destNameEn": "Dahab",
      "nameAr": "فندق ديزيرت",
      "nameEn": "فندق ديزيرت",
      "type": "Hotel",
      "coverImage": null,
      "gallery": [
        null
      ],
      "descAr": "إقامة مريحة واستثنائية على شاطئ البحر مباشرة.",
      "descEn": "Exceptional seaside stay.",
      "rating": 4.9,
      "amenities": [
        "واي فاي",
        "شاطئ خاص",
        "تكييف"
      ],
      "rooms": [
        {
          "id": "room_1790111361895",
          "nameAr": "غرفة قياسية",
          "nameEn": "Standard Room",
          "price": 1000,
          "customLabel": null,
          "pricingType": "per_person_per_night"
        }
      ]
    }
  ],
  "reviews": [
    {
      "id": "rev_1",
      "name": "مريم الصاوي",
      "content": "أفضل تجربة حجز لكامب في دهب! فريق Reva ساعدني في اختيار المكان المناسب واهتموا بكل التفاصيل عبر الواتساب.",
      "platform": "WhatsApp",
      "rating": 5,
      "date": "منذ أسبوعين"
    },
    {
      "id": "rev_2",
      "name": "كريم عبد العزيز",
      "content": "حجزنا رحلة لشرم الشيخ مع العائلة من خلال Reva، والأسعار كانت ممتازة وأفضل من أي موقع حجز عالمي.",
      "platform": "Facebook",
      "rating": 5,
      "date": "منذ 3 أسابيع"
    },
    {
      "id": "rev_3",
      "name": "سارة النجار",
      "content": "كامب رأس شيطان في نويبع كان تجربة خيالية واستجمام حقيقي. شكراً لفريق Reva على الدقة والصدق.",
      "platform": "Instagram",
      "rating": 5,
      "date": "منذ شهر"
    }
  ]
};
