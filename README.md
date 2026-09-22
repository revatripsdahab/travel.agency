# 🏖️ Reva Trips - Luxury Tourism Booking Platform & CMS
### منصة وبوابة حجز الرحلات والإقامات السياحية الفاخرة لشركة Reva Trips

منصة سياحية متكاملة وعصرية مبنية باستخدام **Next.js 14 (App Router)**، **TypeScript**، **Tailwind CSS**، و **Prisma ORM مع SQLite**. تدعم اللغتين العربية (RTL) والإنجليزية (LTR)، مع لوحة تحكم إدارية شاملة (Admin CMS) ومحرك حجز وتسعير مباشر عبر **WhatsApp**.

---

## ✨ المميزات الرئيسية (Key Features)

1. **🎨 الهوية البصرية والتصميم (Brand & UI)**:
   - لون الهوية الأساسي: `#FE3A00` بلمسات راقية وعصرية.
   - خلفيات فحمية نقية وبطاقات زجاجية فاخرة (Minimal & Modern).
   - خطوط عصرية عالية الوضوح: **Cairo** للعربية و **Plus Jakarta Sans** للإنجليزية.
   - دعم كامل للتبديل اللحظي بين **العربية (RTL)** و **English (LTR)**.

2. **📲 محرك الحجز والتسعير المباشر عبر WhatsApp**:
   - إدخال عدد الأفراد يدوياً بدون أي قيود (مع أزرار `+` و `-`).
   - حساب تلقائي دقيق لعدد الليالي وإجمالي السعر المبدئي.
   - تنبيه شفاف بأن التوافر النهائي يتم تأكيده يدوياً من فريق Reva.
   - توليد رسالة حجز جاهزة ومنظمة وإرسالها مباشرة لرقم واتساب الإدارة.

3. **🛠️ لوحة تحكم متكاملة لإدارة المحتوى (Admin CMS)**:
   - **الوجهات (Destinations)**: إدارة المدن (دهب، شرم الشيخ، نويبع، إلخ).
   - **الفنادق والكامبات (Hotels & Camps)**: إدارة أماكن الإقامة، الصور، والخدمات.
   - **الغرف والأسعار (Rooms & Pricing)**: تخصيص الأسعار **وكتابة وصف السعر يدوياً**.
   - **التقييمات (Reviews)**: إدارة تجارب العملاء وشارات المنصات.
   - **محتوى الصفحات (Pages CMS)**: تعديل قصة الشركة ورسالتها ورؤيتها.
   - **مكتبة الوسائط (Media Library)**: رفع الصور واستخدام روابطها المباشرة.
   - **إعدادات الموقع (Settings)**: تعديل أرقام WhatsApp، الهاتف، السوشيال ميديا، والهيرو.

---

## 🚀 التشغيل المحلي السريع (Quick Start)

### المتطلبات الأساسية:
- **Node.js**: الإصدار 18 أو أحدث (يوصى بـ LTS v20+ أو v24+).
- **npm** أو **pnpm** أو **yarn**.

### خطوات التثبيت والتشغيل:

```bash
# 1. تثبيت حزم المشروع
npm install

# 2. إنشاء وتحديث قاعدة البيانات
npx prisma db push

# 3. إدخال البيانات التجريبية الأولية
node prisma/seed.js

# 4. تشغيل خادم التطوير
npm run dev
```

افتح المتصفح على:
* الموقع للزوار: `http://localhost:3000`
* لوحة التحكم: `http://localhost:3000/admin`

---

## 🔑 بيانات الدخول للوحة التحكم (Admin Credentials)

* **رابط الدخول**: `http://localhost:3000/admin`
* **اسم المستخدم (Username)**: `admin`
* **كلمة المرور (Password)**: `reva2026`

---

## 📦 كيفية رفع المشروع على GitHub (Push to GitHub)

إذا كان لديك مستودع جديد على GitHub وتريد رفع المشروع عليه، نفذ الأوامر التالية بالترتيب في موجه الأوامر (Terminal):

```bash
# 1. تهيئة مستودع Git محلي
git init

# 2. إضافة جميع الملفات
git add .

# 3. حفظ الـ Commit الأول
git commit -m "feat: initial commit - complete Reva Trips booking platform & admin CMS"

# 4. تسمية الفرع الرئيسي main
git branch -M main

# 5. ربط المستودع برابط مستودعك على GitHub (استبدل الرابط برابط حسابك)
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPOSITORY_NAME.git

# 6. رفع الملفات إلى GitHub
git push -u origin main
```

---

## 📁 هيكلية المشروع (Project Structure)

```
├── app/                  # مسارات صفحات Next.js 14 App Router
│   ├── about/            # صفحة عن Reva
│   ├── admin/            # لوحة التحكم وجميع صفحات الإدارة
│   ├── api/              # واجهات الـ REST API لجميع العمليات
│   ├── contact/          # صفحة تواصل معنا
│   ├── destinations/     # صفحات استعراض وتفاصيل الوجهات
│   ├── hotels/           # صفحات استعراض وتفاصيل الفنادق وحجز الغرف
│   ├── reviews/          # صفحة آراء وتقييمات العملاء
│   ├── globals.css       # التنسيقات العامة و Tailwind
│   ├── layout.tsx        # الـ Root Layout ودعم اللغات
│   └── page.tsx          # الصفحة الرئيسية (Hero, Destinations, Hotels)
├── components/           # المكونات التفاعلية القابلة لإعادة الاستخدام
│   ├── BookingWidget.tsx # محرك الحجز وحساب التكلفة ورسالة WhatsApp
│   ├── DestinationCard.tsx
│   ├── Footer.tsx
│   ├── Hero.tsx
│   ├── HotelCard.tsx
│   ├── HotelGallery.tsx  # معرض الصور والـ Lightbox
│   ├── HotelsFilterView.tsx # فلاتر البحث السريعة
│   ├── Navbar.tsx        # الهيدر وقائمة الموبايل وتبديل اللغة
│   └── ReviewsSection.tsx
├── context/              # موفر سياق اللغة والاتجاه (LanguageProvider)
├── lib/                  # مكتبات المساعدة (Prisma, Auth JWT, i18n)
├── prisma/               # مخطط قاعدة البيانات والـ Seed
│   ├── schema.prisma
│   └── seed.js
└── public/               # الملفات الثابتة والمرفوعات
```

---

## 📄 الترخيص (License)
جميع الحقوق محفوظة لشركة **Reva Trips** © 2026.