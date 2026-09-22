/**
 * Reva Trips - Standalone Admin CMS Dashboard
 */

let db = null;
let currentTab = 'settings';

async function initAdmin() {
  db = await window.RevaDB.load();
  checkAuth();
}

function checkAuth() {
  const isAuth = sessionStorage.getItem('reva_admin_auth');
  if (isAuth === 'true') {
    document.getElementById('loginCard').style.display = 'none';
    document.getElementById('adminPanel').style.display = 'block';
    showTab(currentTab);
  } else {
    document.getElementById('loginCard').style.display = 'block';
    document.getElementById('adminPanel').style.display = 'none';
  }
}

function loginAdmin() {
  const pwd = document.getElementById('adminPasswordInput').value;
  if (pwd === 'reva2026') {
    sessionStorage.setItem('reva_admin_auth', 'true');
    checkAuth();
  } else {
    alert('كلمة المرور غير صحيحة!');
  }
}

function logoutAdmin() {
  sessionStorage.removeItem('reva_admin_auth');
  checkAuth();
}

function showTab(tab) {
  currentTab = tab;
  document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
  const targetBtn = document.getElementById('tab-' + tab);
  if (targetBtn) targetBtn.classList.add('active');

  const container = document.getElementById('tabContent');
  if (!container) return;

  if (tab === 'settings') {
    renderSettingsTab(container);
  } else if (tab === 'destinations') {
    renderDestinationsTab(container);
  } else if (tab === 'hotels') {
    renderHotelsTab(container);
  } else if (tab === 'reviews') {
    renderReviewsTab(container);
  }
}

// 1. Settings Tab
function renderSettingsTab(c) {
  const s = db.settings || {};
  c.innerHTML = `
    <div class="glass-card" style="padding: 24px;">
      <h3 style="font-size: 18px; font-weight: 800; color: #fff; margin-bottom: 18px;">⚙️ الإعدادات العامة ونصوص الهيرو</h3>
      
      <div class="form-group">
        <label class="form-label">اسم الموقع:</label>
        <input type="text" id="admSiteName" class="form-input" value="${s.siteName || ''}" />
      </div>

      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px;">
        <div class="form-group">
          <label class="form-label">رقم WhatsApp للحجز (مثال: 201012345678):</label>
          <input type="text" id="admWhatsapp" class="form-input" value="${s.whatsappNumber || ''}" />
        </div>
        <div class="form-group">
          <label class="form-label">رقم الهاتف:</label>
          <input type="text" id="admPhone" class="form-input" value="${s.phoneNumber || ''}" />
        </div>
      </div>

      <div class="form-group">
        <label class="form-label">العنوان الرئيسي للهيرو (Hero Title):</label>
        <input type="text" id="admHeroTitle" class="form-input" value="${s.heroTitleAr || ''}" />
      </div>

      <div class="form-group">
        <label class="form-label">الوصف الترويجي للهيرو (Hero Subtitle):</label>
        <textarea id="admHeroSubtitle" class="form-textarea" rows="2">${s.heroSubtitleAr || ''}</textarea>
      </div>

      <!-- Hero Image with File Upload -->
      <div class="form-group">
        <label class="form-label">صورة الهيرو الرئيسية:</label>
        <div style="display: flex; gap: 12px; align-items: center; margin-bottom: 8px;">
          <input type="text" id="admHeroImg" class="form-input" value="${s.heroImageUrl || ''}" style="flex: 1;" />
          <label class="btn-secondary" style="padding: 8px 16px; font-size: 12px; cursor: pointer; white-space: nowrap;">
            📁 رفع صورة من جهازك
            <input type="file" accept="image/*" style="display: none;" onchange="handleImageUpload(event, 'admHeroImg', 'heroImgPreview')" />
          </label>
        </div>
        <img id="heroImgPreview" src="${s.heroImageUrl || ''}" style="width: 100%; height: 180px; object-fit: cover; border-radius: 12px; border: 1px solid rgba(255,255,255,0.1);" />
      </div>

      <div style="margin-top: 24px;">
        <button class="btn-primary" onclick="saveSettingsForm()" style="padding: 12px 30px;">💾 حفظ الإعدادات</button>
      </div>
    </div>
  `;
}

function saveSettingsForm() {
  db.settings.siteName = document.getElementById('admSiteName').value;
  db.settings.whatsappNumber = document.getElementById('admWhatsapp').value;
  db.settings.phoneNumber = document.getElementById('admPhone').value;
  db.settings.heroTitleAr = document.getElementById('admHeroTitle').value;
  db.settings.heroSubtitleAr = document.getElementById('admHeroSubtitle').value;
  db.settings.heroImageUrl = document.getElementById('admHeroImg').value;
  saveAndNotify('تم حفظ الإعدادات بنجاح!');
}

// 2. Destinations Tab
function renderDestinationsTab(c) {
  const list = db.destinations || [];
  c.innerHTML = `
    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
      <h3 style="font-size: 18px; font-weight: 800; color: #fff;">📍 إدارة الوجهات والمدن (${list.length})</h3>
      <button class="btn-primary" onclick="openAddDestModal()" style="padding: 8px 18px; font-size: 12px;">+ إضافة وجهة جديدة</button>
    </div>

    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 16px;">
      ${list.map(d => `
        <div class="glass-card" style="padding: 16px; position: relative;">
          <img src="${d.coverImage}" style="width: 100%; height: 140px; object-fit: cover; border-radius: 12px; margin-bottom: 12px;" />
          <h4 style="font-size: 16px; font-weight: bold; color: #fff;">${d.nameAr}</h4>
          <p style="font-size: 12px; color: #9CA3AF; margin-top: 4px;">${d.descAr}</p>
          <div style="margin-top: 14px; display: flex; gap: 8px;">
            <button class="btn-secondary" onclick="editDest('${d.id}')" style="padding: 4px 12px; font-size: 11px;">تعديل</button>
            <button onclick="deleteDest('${d.id}')" style="background: rgba(239,68,68,0.2); border: none; color: #ef4444; padding: 4px 12px; border-radius: 9999px; cursor: pointer; font-size: 11px;">حذف</button>
          </div>
        </div>
      `).join('')}
    </div>
  `;
}

function openAddDestModal() {
  const nameAr = prompt('اسم الوجهة / المدينة:', 'رأس سدر');
  if (!nameAr) return;
  const slug = prompt('الرابط (Slug):', 'ras-sudr') || 'city';
  const img = prompt('رابط الصورة:', 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1600&auto=format&fit=crop');

  db.destinations.push({
    id: 'dest_' + Date.now(),
    slug,
    nameAr,
    nameEn: nameAr,
    coverImage: img,
    descAr: 'استمتع بأجمل الأوقات في ' + nameAr,
    descEn: 'Enjoy your stay in ' + nameAr
  });

  saveAndNotify('تمت إضافة الوجهة بنجاح!');
  showTab('destinations');
}

function deleteDest(id) {
  if (!confirm('هل أنت متأكد من حذف هذه الوجهة؟')) return;
  db.destinations = db.destinations.filter(d => d.id !== id);
  saveAndNotify('تم حذف الوجهة');
  showTab('destinations');
}

// 3. Hotels & Rooms Tab
function renderHotelsTab(c) {
  const list = db.hotels || [];
  c.innerHTML = `
    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
      <h3 style="font-size: 18px; font-weight: 800; color: #fff;">🏨 إدارة الفنادق والكامبات والأسعار (${list.length})</h3>
      <button class="btn-primary" onclick="openAddHotelModal()" style="padding: 8px 18px; font-size: 12px;">+ إضافة فندق / كامب جديد</button>
    </div>

    <div style="display: flex; flex-direction: column; gap: 16px;">
      ${list.map(h => `
        <div class="glass-card" style="padding: 20px;">
          <div style="display: flex; flex-wrap: wrap; gap: 16px; align-items: flex-start; justify-content: space-between;">
            <div style="display: flex; gap: 16px; align-items: center;">
              <img src="${h.coverImage}" style="width: 100px; height: 80px; object-fit: cover; border-radius: 12px;" />
              <div>
                <span style="font-size: 11px; background: rgba(254,58,0,0.15); color: var(--primary); padding: 2px 8px; border-radius: 9999px; font-weight: bold;">${h.type}</span>
                <span style="font-size: 11px; color: #9CA3AF; margin-right: 6px;">📍 ${h.destNameAr}</span>
                <h4 style="font-size: 18px; font-weight: 800; color: #fff; margin-top: 4px;">${h.nameAr}</h4>
                <div style="color: #fbbf24; font-size: 12px;">★ ${h.rating || 5}</div>
              </div>
            </div>

            <div style="display: flex; gap: 8px;">
              <button class="btn-secondary" onclick="addRoomToHotel('${h.id}')" style="padding: 6px 14px; font-size: 11px;">+ إضافة غرفة وتسعير</button>
              <button onclick="deleteHotel('${h.id}')" style="background: rgba(239,68,68,0.2); border: none; color: #ef4444; padding: 6px 14px; border-radius: 9999px; cursor: pointer; font-size: 11px;">حذف الفندق</button>
            </div>
          </div>

          <!-- Rooms Table -->
          <div style="margin-top: 16px; background: #0D0F14; padding: 14px; border-radius: 14px; border: 1px solid rgba(255,255,255,0.06);">
            <div style="font-size: 12px; font-weight: bold; color: #D1D5DB; margin-bottom: 8px;">الغرف المتاحة والأسعار المخصصة:</div>
            ${(h.rooms || []).map((r, rIdx) => `
              <div style="display: flex; justify-content: space-between; align-items: center; padding: 8px 0; border-bottom: 1px solid rgba(255,255,255,0.05); font-size: 12px;">
                <div>
                  <span style="font-weight: bold; color: #fff;">🛏️ ${r.nameAr}</span>
                  <span style="color: var(--primary); font-weight: 600; margin-right: 8px;">(${r.customLabel || 'للفرد في الليلة'})</span>
                </div>
                <div style="display: flex; align-items: center; gap: 12px;">
                  <span style="font-weight: 800; color: #fff;">${r.price.toLocaleString()} EGP</span>
                  <button onclick="deleteRoom('${h.id}', ${rIdx})" style="color: #ef4444; background: none; border: none; cursor: pointer; font-size: 11px;">حذف</button>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      `).join('')}
    </div>
  `;
}

function openAddHotelModal() {
  const nameAr = prompt('اسم الفندق أو الكامب:');
  if (!nameAr) return;
  const type = prompt('نوع الإقامة (Camp / Hotel / Resort):', 'Camp') || 'Camp';
  const img = prompt('رابط الصورة الرئيسية:', 'https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=1600&auto=format&fit=crop');
  const price = parseFloat(prompt('سعر الغرفة المبدئي (EGP):', '1200')) || 1000;
  const label = prompt('✍️ اكتب وصف السعر يدوياً (مثال: للفرد في الليلة شامل الإفطار / للغرفة شامل وجبتين):', 'للفرد في الليلة شامل الإفطار');
  const dest = db.destinations[0] || { id: 'dest_1', nameAr: 'دهب' };

  db.hotels.push({
    id: 'hotel_' + Date.now(),
    destId: dest.id,
    destNameAr: dest.nameAr,
    destNameEn: dest.nameEn,
    nameAr,
    nameEn: nameAr,
    type,
    coverImage: img,
    gallery: [img],
    descAr: 'إقامة مريحة واستثنائية على شاطئ البحر مباشرة.',
    descEn: 'Exceptional seaside stay.',
    rating: 4.9,
    amenities: ['واي فاي', 'شاطئ خاص', 'تكييف'],
    rooms: [
      {
        id: 'room_' + Date.now(),
        nameAr: 'غرفة قياسية',
        nameEn: 'Standard Room',
        price,
        customLabel: label,
        pricingType: 'per_person_per_night'
      }
    ]
  });

  saveAndNotify('تمت إضافة المكان بنجاح!');
  showTab('hotels');
}

function addRoomToHotel(hotelId) {
  const h = db.hotels.find(x => x.id === hotelId);
  if (!h) return;

  const nameAr = prompt('اسم نوع الغرفة الجديد:', 'غرفة مزدوجة مطلة على البحر');
  if (!nameAr) return;
  const price = parseFloat(prompt('السعر (EGP):', '1800')) || 1500;
  const label = prompt('✍️ اكتب وصف السعر يدوياً (مثال: للفرد في الليلة شامل وجبتين / للغرفة لليلة):', 'للفرد في الليلة شامل الإفطار');

  if (!h.rooms) h.rooms = [];
  h.rooms.push({
    id: 'room_' + Date.now(),
    nameAr,
    nameEn: nameAr,
    price,
    customLabel: label,
    pricingType: 'per_person_per_night'
  });

  saveAndNotify('تمت إضافة الغرفة والتسعير بنجاح!');
  showTab('hotels');
}

function deleteRoom(hotelId, rIdx) {
  const h = db.hotels.find(x => x.id === hotelId);
  if (!h || !h.rooms) return;
  h.rooms.splice(rIdx, 1);
  saveAndNotify('تم حذف الغرفة');
  showTab('hotels');
}

function deleteHotel(id) {
  if (!confirm('هل تريد حذف هذا الفندق؟')) return;
  db.hotels = db.hotels.filter(h => h.id !== id);
  saveAndNotify('تم حذف الفندق');
  showTab('hotels');
}

// 4. Reviews Tab
function renderReviewsTab(c) {
  const list = db.reviews || [];
  c.innerHTML = `
    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
      <h3 style="font-size: 18px; font-weight: 800; color: #fff;">⭐ آراء وتقييمات العملاء (${list.length})</h3>
      <button class="btn-primary" onclick="openAddReviewModal()" style="padding: 8px 18px; font-size: 12px;">+ إضافة تقييم جديد</button>
    </div>

    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 16px;">
      ${list.map((r, idx) => `
        <div class="glass-card" style="padding: 18px; display: flex; flex-direction: column; justify-content: space-between;">
          <div>
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
              <span style="font-weight: bold; color: #fff;">${r.name}</span>
              <span style="font-size: 10px; background: rgba(255,255,255,0.1); padding: 2px 8px; border-radius: 4px;">${r.platform}</span>
            </div>
            <div style="color: #fbbf24; margin-bottom: 6px;">${'★'.repeat(r.rating || 5)}</div>
            <p style="font-size: 12px; color: #D1D5DB; font-style: italic;">"${r.content}"</p>
          </div>
          <button onclick="deleteReview(${idx})" style="color: #ef4444; background: none; border: none; cursor: pointer; font-size: 11px; margin-top: 12px; text-align: left;">حذف التقييم</button>
        </div>
      `).join('')}
    </div>
  `;
}

function openAddReviewModal() {
  const name = prompt('اسم العميل:', 'محمد خالد');
  if (!name) return;
  const content = prompt('نص التقييم:', 'خدمة ممتازة وفريق رائع وأسعار مباشرة.');
  if (!content) return;
  const platform = prompt('المنصة (WhatsApp / Google / Facebook / Instagram):', 'WhatsApp') || 'WhatsApp';

  if (!db.reviews) db.reviews = [];
  db.reviews.push({
    id: 'rev_' + Date.now(),
    name,
    content,
    platform,
    rating: 5,
    date: 'مؤخراً'
  });

  saveAndNotify('تمت إضافة التقييم بنجاح!');
  showTab('reviews');
}

function deleteReview(idx) {
  db.reviews.splice(idx, 1);
  saveAndNotify('تم حذف التقييم');
  showTab('reviews');
}

// Helpers
async function handleImageUpload(e, inputId, previewId) {
  const file = e.target.files[0];
  if (!file) return;
  try {
    const dataUrl = await window.RevaDB.compressImage(file);
    document.getElementById(inputId).value = dataUrl;
    if (previewId) document.getElementById(previewId).src = dataUrl;
  } catch (err) {
    alert('تعذر قراءة الصورة');
  }
}

function saveAndNotify(msg) {
  window.RevaDB.save(db);
  const toast = document.getElementById('adminToast');
  if (toast) {
    toast.innerText = msg;
    toast.style.display = 'block';
    setTimeout(() => { toast.style.display = 'none'; }, 3000);
  }
}

function exportUpdatedDataFile() {
  window.RevaDB.exportDataFile(db);
}

window.addEventListener('DOMContentLoaded', initAdmin);