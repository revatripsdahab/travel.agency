/**
 * Reva Trips - Main Frontend Application
 */

let db = null;
let currentLang = localStorage.getItem('reva_lang') || 'ar';
let activeHotel = null;

// Initialize
async function initApp() {
  db = await window.RevaDB.load();
  setLanguage(currentLang);
}

// Language Handling
function setLanguage(lang) {
  currentLang = lang;
  localStorage.setItem('reva_lang', lang);
  document.documentElement.lang = lang;
  document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
  const langBtn = document.getElementById('langBtn');
  if (langBtn) langBtn.innerText = lang === 'ar' ? 'English' : 'العربية';
  renderAll();
}

function toggleLanguage() {
  setLanguage(currentLang === 'ar' ? 'en' : 'ar');
}

// Render All Components
function renderAll() {
  if (!db) return;

  // Hero
  const heroSection = document.getElementById('heroSection');
  if (heroSection) {
    heroSection.style.backgroundImage = `url('${db.settings.heroImageUrl}')`;
    document.getElementById('heroTitle').innerText = currentLang === 'ar' ? db.settings.heroTitleAr : db.settings.heroTitleEn;
    document.getElementById('heroSubtitle').innerText = currentLang === 'ar' ? db.settings.heroSubtitleAr : db.settings.heroSubtitleEn;
  }

  // Destinations Grid
  const destContainer = document.getElementById('destinationsGrid');
  if (destContainer) {
    destContainer.innerHTML = (db.destinations || []).map(d => {
      const hotelsCount = (db.hotels || []).filter(h => h.destId === d.id).length;
      return `
        <div class="dest-card" onclick="filterByDest('${d.id}')">
          <img src="${d.coverImage}" alt="${d.nameAr}" />
          <span class="dest-badge">${hotelsCount} أماكن إقامة</span>
          <div class="dest-content">
            <h3 style="font-size: 22px; font-weight: 800; color: #fff;">${currentLang === 'ar' ? d.nameAr : d.nameEn}</h3>
            <p style="font-size: 12px; color: #D1D5DB; margin-top: 4px;">${currentLang === 'ar' ? d.descAr : d.descEn}</p>
          </div>
        </div>
      `;
    }).join('');
  }

  // Populate Destination Filter Dropdown
  const destFilter = document.getElementById('filterDest');
  if (destFilter) {
    const curVal = destFilter.value || 'all';
    destFilter.innerHTML = '<option value="all">كل المدن والوجهات</option>' +
      (db.destinations || []).map(d => `<option value="${d.id}">${d.nameAr}</option>`).join('');
    destFilter.value = curVal;
  }

  // Render Hotels
  renderHotels();

  // Render Reviews
  const reviewsContainer = document.getElementById('reviewsGrid');
  if (reviewsContainer) {
    reviewsContainer.innerHTML = (db.reviews || []).map(r => `
      <div class="glass-card" style="padding: 24px; display: flex; flex-direction: column; justify-content: space-between;">
        <div>
          <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 8px;">
            <span style="font-weight: 800; font-size: 15px; color: #fff;">${r.name}</span>
            <span style="font-size: 10px; font-weight: bold; background: rgba(255,255,255,0.1); padding: 2px 8px; border-radius: 4px;">${r.platform}</span>
          </div>
          <div style="color: #fbbf24; margin-bottom: 8px;">${'★'.repeat(r.rating || 5)}</div>
          <p style="font-size: 12px; color: #D1D5DB; font-style: italic;">"${r.content}"</p>
        </div>
        <span style="font-size: 10px; color: #9CA3AF; margin-top: 14px;">${r.date}</span>
      </div>
    `).join('');
  }
}

// Render Hotels with Filters
function renderHotels() {
  if (!db) return;

  const destFilter = document.getElementById('filterDest') ? document.getElementById('filterDest').value : 'all';
  const typeFilter = document.getElementById('filterType') ? document.getElementById('filterType').value : 'all';
  const searchVal = document.getElementById('filterSearch') ? document.getElementById('filterSearch').value.toLowerCase() : '';

  const filtered = (db.hotels || []).filter(h => {
    if (destFilter !== 'all' && h.destId !== destFilter) return false;
    if (typeFilter !== 'all' && h.type !== typeFilter) return false;
    if (searchVal && !h.nameAr.toLowerCase().includes(searchVal) && !h.nameEn.toLowerCase().includes(searchVal)) return false;
    return true;
  });

  const hotelContainer = document.getElementById('hotelsGrid');
  if (!hotelContainer) return;

  if (filtered.length === 0) {
    hotelContainer.innerHTML = `<div style="grid-column: 1/-1; text-align: center; padding: 60px; color: #9CA3AF;">لا توجد أماكن إقامة مطابقة لبحثك.</div>`;
    return;
  }

  hotelContainer.innerHTML = filtered.map(h => {
    const rooms = h.rooms || [];
    const minPrice = rooms.length > 0 ? Math.min(...rooms.map(r => r.price)) : 0;
    const firstRoom = rooms[0] || {};
    const priceLabel = firstRoom.customLabel || 'للفرد / لليلة';

    return `
      <div class="hotel-card">
        <div class="hotel-img-wrapper">
          <img src="${h.coverImage}" alt="${h.nameAr}" />
          <span class="hotel-type-badge">${h.type}</span>
          <span class="hotel-rating-badge">★ ${(h.rating || 4.9).toFixed(1)}</span>
        </div>
        <div class="hotel-body">
          <div>
            <div style="font-size: 11px; color: var(--primary); font-weight: 700; margin-bottom: 4px;">📍 ${h.destNameAr || ''}</div>
            <h3 class="hotel-name">${currentLang === 'ar' ? h.nameAr : h.nameEn}</h3>
            <p class="hotel-desc">${currentLang === 'ar' ? h.descAr : h.descEn}</p>
          </div>
          <div class="hotel-footer">
            <div>
              <span class="hotel-price">${minPrice.toLocaleString()} EGP</span>
              <span class="hotel-price-unit">${priceLabel}</span>
            </div>
            <button class="btn-primary" onclick="openHotelModal('${h.id}')" style="padding: 8px 18px; font-size: 12px;">
              تفاصيل وحجز
            </button>
          </div>
        </div>
      </div>
    `;
  }).join('');
}

function filterByDest(destId) {
  const select = document.getElementById('filterDest');
  if (select) {
    select.value = destId;
    renderHotels();
    document.getElementById('hotels').scrollIntoView({ behavior: 'smooth' });
  }
}

// Modal Details & WhatsApp Booking
function openHotelModal(hotelId) {
  activeHotel = (db.hotels || []).find(h => h.id === hotelId);
  if (!activeHotel) return;

  const modal = document.getElementById('hotelModal');
  const body = document.getElementById('hotelModalBody');

  const today = new Date();
  const dIn = new Date(today);
  dIn.setDate(today.getDate() + 2);
  const dOut = new Date(dIn);
  dOut.setDate(dIn.getDate() + 3);

  const fmt = d => d.toISOString().split('T')[0];
  const rooms = activeHotel.rooms || [];

  body.innerHTML = `
    <div>
      <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 6px;">
        <span style="background: rgba(254,58,0,0.15); color: var(--primary); font-weight: bold; font-size: 12px; padding: 2px 10px; border-radius: 9999px;">${activeHotel.type}</span>
        <span style="color: #fbbf24; font-size: 13px; font-weight: bold;">★ ${activeHotel.rating || 5}</span>
        <span style="color: #9CA3AF; font-size: 12px;">📍 ${activeHotel.destNameAr || ''}</span>
      </div>
      <h2 style="font-size: 26px; font-weight: 900; color: #fff; margin-bottom: 12px;">${activeHotel.nameAr}</h2>

      <!-- Main Photo -->
      <div style="height: 320px; border-radius: 18px; overflow: hidden; margin-bottom: 16px;">
        <img id="modalMainImg" src="${activeHotel.coverImage}" style="width: 100%; height: 100%; object-fit: cover;" />
      </div>

      <!-- Gallery Thumbs -->
      <div style="display: flex; gap: 8px; overflow-x: auto; margin-bottom: 20px;">
        ${(activeHotel.gallery || [activeHotel.coverImage]).map(img => `
          <img src="${img}" onclick="document.getElementById('modalMainImg').src='${img}'" style="width: 80px; height: 60px; object-fit: cover; border-radius: 10px; cursor: pointer; border: 1px solid rgba(255,255,255,0.2);" />
        `).join('')}
      </div>

      <p style="font-size: 13px; color: #D1D5DB; line-height: 1.6; margin-bottom: 20px;">${activeHotel.descAr}</p>

      <!-- Amenities -->
      <div style="margin-bottom: 24px;">
        <h4 style="font-size: 14px; font-weight: 800; color: #fff; margin-bottom: 8px;">المميزات والخدمات:</h4>
        <div style="display: flex; flex-wrap: wrap; gap: 8px;">
          ${(activeHotel.amenities || []).map(a => `
            <span style="background: #0D0F14; border: 1px solid rgba(255,255,255,0.1); font-size: 11px; padding: 4px 12px; border-radius: 8px;">✓ ${a}</span>
          `).join('')}
        </div>
      </div>

      <!-- Booking Calculator Box -->
      <div class="booking-box">
        <h3 style="font-size: 16px; font-weight: 900; color: #fff; margin-bottom: 14px;">احسب التكلفة المبدئية واحجز عبر WhatsApp:</h3>

        <div class="form-group">
          <label class="form-label">اختر الغرفة:</label>
          <select id="bookRoomSelect" class="form-select" onchange="calculatePrice()">
            ${rooms.map(r => `
              <option value="${r.id}" data-price="${r.price}" data-label="${r.customLabel || ''}" data-type="${r.pricingType || 'per_person_per_night'}">
                ${r.nameAr} — (${r.price.toLocaleString()} EGP ${r.customLabel || 'للفرد في الليلة'})
              </option>
            `).join('')}
          </select>
        </div>

        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px;">
          <div class="form-group">
            <label class="form-label">تاريخ الوصول:</label>
            <input type="date" id="bookCheckIn" class="form-input" value="${fmt(dIn)}" onchange="calculatePrice()" />
          </div>
          <div class="form-group">
            <label class="form-label">تاريخ المغادرة:</label>
            <input type="date" id="bookCheckOut" class="form-input" value="${fmt(dOut)}" onchange="calculatePrice()" />
          </div>
        </div>

        <!-- Manual Guest Input with +/- -->
        <div class="form-group">
          <label class="form-label">عدد الأفراد (اكتب العدد يدوياً):</label>
          <div class="guest-counter">
            <button type="button" onclick="updateGuests(-1)">-</button>
            <input type="number" id="bookGuests" class="form-input" value="2" min="1" max="500" onchange="calculatePrice()" />
            <button type="button" onclick="updateGuests(1)">+</button>
          </div>
        </div>

        <!-- Calculated Summary -->
        <div class="price-summary">
          <div>
            <span style="font-size: 11px; color: #9CA3AF; display: block;">إجمالي السعر المبدئي المحتسب:</span>
            <span id="calcNightsLabel" style="font-size: 12px; color: #D1D5DB;">3 ليالي</span>
          </div>
          <div style="text-align: left;">
            <span class="total-val" id="calcTotalDisplay">0</span>
            <span style="font-size: 12px; color: var(--primary); font-weight: bold;">EGP</span>
          </div>
        </div>

        <p style="font-size: 11px; color: #fbbf24; margin-bottom: 14px; background: rgba(251,191,36,0.1); padding: 8px 12px; border-radius: 8px;">
          ℹ️ التوافر النهائي يتم تأكيده من فريق Reva بعد إرسال طلب الحجز.
        </p>

        <!-- Customer Info -->
        <div class="form-group">
          <input type="text" id="bookCustName" class="form-input" placeholder="اسمك بالكامل" />
        </div>
        <div class="form-group">
          <input type="tel" id="bookCustPhone" class="form-input" placeholder="رقم الهاتف / واتساب" />
        </div>
        <div class="form-group">
          <textarea id="bookCustNotes" class="form-textarea" rows="2" placeholder="ملاحظات أو طلبات خاصة..."></textarea>
        </div>

        <button type="button" class="btn-whatsapp" onclick="submitWhatsAppBooking()">
          احجز الآن عبر WhatsApp 💬
        </button>
      </div>
    </div>
  `;

  modal.classList.add('active');
  calculatePrice();
}

function updateGuests(delta) {
  const inp = document.getElementById('bookGuests');
  if (!inp) return;
  let val = parseInt(inp.value, 10) || 1;
  val = Math.max(1, val + delta);
  inp.value = val;
  calculatePrice();
}

function calculatePrice() {
  if (!activeHotel) return;

  const roomSelect = document.getElementById('bookRoomSelect');
  if (!roomSelect) return;
  const opt = roomSelect.options[roomSelect.selectedIndex];
  if (!opt) return;

  const price = parseFloat(opt.getAttribute('data-price')) || 0;
  const pType = opt.getAttribute('data-type') || 'per_person_per_night';

  const dIn = new Date(document.getElementById('bookCheckIn').value);
  const dOut = new Date(document.getElementById('bookCheckOut').value);
  const diffDays = Math.max(1, Math.ceil((dOut - dIn) / (1000 * 60 * 60 * 24)));

  const guests = parseInt(document.getElementById('bookGuests').value, 10) || 1;

  let total = 0;
  if (pType === 'per_person_per_night') {
    total = price * guests * diffDays;
  } else if (pType === 'per_person_total') {
    total = price * guests;
  } else if (pType === 'per_room_per_night') {
    total = price * diffDays;
  } else {
    total = price;
  }

  document.getElementById('calcNightsLabel').innerText = `${diffDays} ليالٍ • ${guests} أفراد`;
  document.getElementById('calcTotalDisplay').innerText = total.toLocaleString();
}

function submitWhatsAppBooking() {
  if (!activeHotel) return;

  const roomSelect = document.getElementById('bookRoomSelect');
  const opt = roomSelect.options[roomSelect.selectedIndex];
  const roomName = opt ? opt.text.split('—')[0].trim() : '';
  const roomLabel = opt ? opt.getAttribute('data-label') : '';

  const dIn = document.getElementById('bookCheckIn').value;
  const dOut = document.getElementById('bookCheckOut').value;
  const guests = document.getElementById('bookGuests').value;
  const total = document.getElementById('calcTotalDisplay').innerText;
  const name = document.getElementById('bookCustName').value || 'غير محدد';
  const phone = document.getElementById('bookCustPhone').value || 'غير محدد';
  const notes = document.getElementById('bookCustNotes').value;

  const msg = `مرحباً Reva Trips،

أرغب في حجز إقامة:
📍 الوجهة: ${activeHotel.destNameAr || ''}
🏨 الفندق / الكامب: ${activeHotel.nameAr}
🛏️ نوع الغرفة: ${roomName}
💵 وصف السعر: ${roomLabel || 'حسب الاختيار'}
📅 تاريخ الوصول: ${dIn}
📅 تاريخ المغادرة: ${dOut}
👥 عدد الأفراد: ${guests} فرد
💰 السعر المبدئي المحتسب: ${total} EGP

👤 بيانات العميل:
- الاسم: ${name}
- الهاتف: ${phone}
${notes ? `- ملاحظات: ${notes}\n` : ''}
أرجو تأكيد التوافر وإتمام الحجز مع فريق Reva.`;

  const cleanPhone = (db.settings.whatsappNumber || '201012345678').replace(/[^0-9]/g, '');
  window.open(`https://wa.me/${cleanPhone}?text=${encodeURIComponent(msg)}`, '_blank');
}

function closeModal() {
  const m = document.getElementById('hotelModal');
  if (m) m.classList.remove('active');
}

window.addEventListener('DOMContentLoaded', initApp);