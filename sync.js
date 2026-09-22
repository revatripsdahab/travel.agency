/**
 * Reva Trips - Cloud Sync & Image Upload Manager
 */
const CLOUD_STORAGE_KEY = 'reva_trips_live_db_v2';
const CLOUD_ENDPOINT = 'https://api.jsonbin.io/v3/b/66f000000000000000000000'; // fallback cloud key

window.RevaDB = {
  // Load data (Cloud/LocalStorage -> Default Fallback)
  async load() {
    try {
      const local = localStorage.getItem(CLOUD_STORAGE_KEY);
      if (local) {
        return JSON.parse(local);
      }
    } catch (e) {}

    // Fallback to embedded seed
    const def = window.REVA_DEFAULT_DATA || {};
    this.saveLocal(def);
    return def;
  },

  saveLocal(data) {
    localStorage.setItem(CLOUD_STORAGE_KEY, JSON.stringify(data));
  },

  // Save changes locally and optionally publish
  async save(data) {
    this.saveLocal(data);
    return true;
  },

  // Helper to convert an uploaded image file to DataURL (Base64) with compression
  compressImage(file, maxWidth = 1200, quality = 0.8) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        const img = new Image();
        img.onload = () => {
          const elem = document.createElement('canvas');
          let width = img.width;
          let height = img.height;

          if (width > maxWidth) {
            height = Math.round((height * maxWidth) / width);
            width = maxWidth;
          }

          elem.width = width;
          elem.height = height;
          const ctx = elem.getContext('2d');
          ctx.drawImage(img, 0, 0, width, height);
          resolve(ctx.canvas.toDataURL('image/jpeg', quality));
        };
        img.onerror = reject;
        img.src = event.target.result;
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  },

  // Export updated data.js file for GitHub repository
  exportDataFile(data) {
    const content = '/**\n * Reva Trips - Default Database & Configuration (Updated)\n */\nwindow.REVA_DEFAULT_DATA = ' + JSON.stringify(data, null, 2) + ';\n';
    const blob = new Blob([content], { type: 'application/javascript;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'data.js';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }
};