document.addEventListener("DOMContentLoaded", () => {
  const pageBody = document.getElementById("pageBody");
  const langBtn = document.getElementById("langButton");
  const darkBtn = document.getElementById("darkButton");
  const menuBtn = document.getElementById("menuButton");
  const mobileMenu = document.getElementById("mobileMenu");
  const mobileList = document.getElementById("mobileMenuList");
  const logoAr = document.getElementById("logoAr");
  const logoEn = document.getElementById("logoEn");
  const depbtn = document.getElementById("depbtn");
  const departmentDropdown = document.querySelector(".department-dropdown .dropdown-menu");
  const prayerBtn = document.getElementById("prayerBtn");
  const prayerMenu = document.getElementById("prayerMenu");
  const mobilePrayerToggle = document.getElementById("mobilePrayerToggle");
  const mobilePrayerMenu = document.getElementById("mobilePrayerMenu");

  // === LANGUAGE SWITCH ===
  function updateLanguage(lang) {
    const isArabic = lang === "ar";
    pageBody.setAttribute("lang", lang);
    pageBody.setAttribute("dir", isArabic ? "rtl" : "ltr");

    langBtn.textContent = isArabic ? "English" : "عربي";
    logoAr.hidden = !isArabic;
    logoEn.hidden = isArabic;

    document.querySelectorAll("[data-en][data-ar]").forEach((el) => {
      if (el.placeholder !== undefined) {
        el.placeholder = isArabic ? el.dataset.ar : el.dataset.en;
      } else if (el.tagName === "OPTION") {
        el.textContent = isArabic ? el.dataset.ar : el.dataset.en;
      } else {
        el.textContent = isArabic ? el.dataset.ar : el.dataset.en;
      }
    });

    // Show/hide based on lang class
    document.querySelectorAll(".lang-en").forEach((el) => (el.style.display = isArabic ? "none" : "inline"));
    document.querySelectorAll(".lang-ar").forEach((el) => (el.style.display = isArabic ? "inline" : "none"));

    // Input alignment
    document.querySelectorAll("input, textarea, select").forEach((el) => {
      el.style.textAlign = isArabic ? "right" : "left";
    });

    // Align labels
    document.querySelectorAll("label").forEach((label) => {
      label.style.textAlign = isArabic ? "right" : "left";
    });

    updatePrayerTimes();
    syncMobileMenu();
    localStorage.setItem("lang", lang);
  }

  langBtn.addEventListener("click", () => {
    const newLang = pageBody.getAttribute("lang") === "en" ? "ar" : "en";
    updateLanguage(newLang);
    mobileMenu.classList.remove("show");
  });

  // === DARK MODE TOGGLE ===
  const savedTheme = localStorage.getItem("theme") || "light";
  pageBody.classList.add(savedTheme === "dark" ? "dark-mode" : "light-mode");
  darkBtn.textContent = savedTheme === "dark" ? "Light" : "Dark";

  darkBtn.addEventListener("click", () => {
    const isDark = pageBody.classList.contains("dark-mode");
    pageBody.classList.toggle("dark-mode", !isDark);
    pageBody.classList.toggle("light-mode", isDark);
    darkBtn.textContent = isDark ? "Dark" : "Light";
    localStorage.setItem("theme", isDark ? "light" : "dark");
    mobileMenu.classList.remove("show");
  });

  // === MOBILE MENU ===
  menuBtn.addEventListener("click", () => {
    mobileMenu.classList.toggle("show");
  });

  // === SYNC MOBILE MENU ===
  function syncMobileMenu() {
    const mobileList = document.getElementById("mobileMenuList");
    mobileList.innerHTML = "";
  
    const desktopMenu = document.querySelector("#mainMenu > ul");
  
    desktopMenu.querySelectorAll(":scope > li").forEach((li) => {
      if (li.classList.contains("department-dropdown")) {
        // Create Departments dropdown toggle
        const depToggle = document.createElement("li");
        depToggle.classList.add("dropdown-toggle");
        depToggle.textContent = pageBody.getAttribute("lang") === "ar" ? "الإدارات" : "Departments";
        depToggle.addEventListener("click", () => {
          depToggle.classList.toggle("active");
          depMenu.classList.toggle("show");
        });
  
        // Create submenu
        const depMenu = document.createElement("ul");
        depMenu.classList.add("dropdown-menu");
        li.querySelectorAll("ul > li > a").forEach((a) => {
          const subLi = document.createElement("li");
          const subA = document.createElement("a");
          subA.href = a.href;
          subA.textContent = a.textContent;
          subLi.appendChild(subA);
          depMenu.appendChild(subLi);
        });
  
        // Append to mobile
        mobileList.appendChild(depToggle);
        mobileList.appendChild(depMenu);
      } else {
        // Regular links
        const link = li.querySelector("a");
        if (link) {
          const liEl = document.createElement("li");
          const aEl = document.createElement("a");
          aEl.href = link.href;
          aEl.textContent = link.textContent;
          liEl.appendChild(aEl);
          mobileList.appendChild(liEl);
        }
      }
    });
  }
  
  

  prayerBtn?.addEventListener("click", (e) => {
    e.stopPropagation();
    prayerMenu?.classList.toggle("show");
  });

  prayerMenu?.querySelectorAll("li").forEach((item) => {
    item.addEventListener("click", () => {
      prayerBtn.textContent = `🕌 ${item.textContent}`;
      prayerMenu.classList.remove("show");
    });
  });

  mobilePrayerToggle?.addEventListener("click", (e) => {
    e.preventDefault();
    mobilePrayerToggle.classList.toggle("active");
    mobilePrayerMenu?.classList.toggle("show");
  });

  mobilePrayerMenu?.querySelectorAll("li").forEach((item) => {
    item.addEventListener("click", () => {
      mobilePrayerToggle.textContent = `🕌 ${item.textContent}`;
      mobilePrayerMenu.classList.remove("show");
      mobilePrayerToggle.classList.remove("active");
    });
  });

  // === DEPARTMENT DROPDOWN ===
  depbtn?.addEventListener("click", (e) => {
    e.stopPropagation();
    const wrapper = depbtn.closest(".department-dropdown");
    wrapper?.classList.toggle("active");
  });

  // === GLOBAL CLICK HANDLER TO CLOSE DROPDOWNS ===
  document.addEventListener("click", (e) => {
    if (!menuBtn.contains(e.target) && !mobileMenu.contains(e.target)) {
      mobileMenu.classList.remove("show");
    }

    if (!prayerMenu.contains(e.target) && e.target !== prayerBtn) {
      prayerMenu.classList.remove("show");
    }

    if (!mobilePrayerMenu.contains(e.target) && e.target !== mobilePrayerToggle) {
      mobilePrayerMenu.classList.remove("show");
      mobilePrayerToggle.classList.remove("active");
    }

    if (!depbtn.contains(e.target) && !depbtn.closest(".department-dropdown")?.contains(e.target)) {
      depbtn.closest(".department-dropdown")?.classList.remove("active");
    }
  });

  // === FETCH & UPDATE PRAYER TIMES ===
  async function updatePrayerTimes() {
    try {
      const res = await fetch('https://api.aladhan.com/v1/timingsByCity?city=Sharjah&country=AE&method=8');
      const data = await res.json();
      const timings = data.data.timings;

      const prayerNames = [
        { key: 'Fajr', en: 'Fajr', ar: 'صلاة الفجر' },
        { key: 'Dhuhr', en: 'Dhuhr', ar: 'صلاة الظهر' },
        { key: 'Asr', en: 'Asr', ar: 'صلاة العصر' },
        { key: 'Maghrib', en: 'Maghrib', ar: 'صلاة المغرب' },
        { key: 'Isha', en: 'Isha', ar: 'صلاة العشاء' }
      ];

      const now = new Date();
      const todayDate = now.toISOString().split('T')[0];

      // Parse times into Date objects
      const prayerTimesToday = prayerNames.map(p => {
        const [hours, minutes] = timings[p.key].split(':').map(Number);
        const date = new Date();
        date.setHours(hours);
        date.setMinutes(minutes);
        date.setSeconds(0);
        return { ...p, date };
      });

      // Find next prayer
      let nextPrayer = prayerTimesToday.find(p => now < p.date);
      if (!nextPrayer) nextPrayer = prayerTimesToday[0]; // If after Isha, next Fajr

      // Update the labels dynamically
      const currentLang = pageBody.getAttribute('lang');
      const nextLabel = currentLang === 'ar'
        ? `🕌 ${nextPrayer.ar}: ${timings[nextPrayer.key]}`
        : `🕌 ${nextPrayer.en}: ${timings[nextPrayer.key]}`;

      prayerBtn.textContent = nextLabel;
      mobilePrayerToggle.textContent = nextLabel;

      // Update dropdowns
      prayerNames.forEach((p, i) => {
        const textEn = `${p.en}: ${timings[p.key]}`;
        const textAr = `${p.ar}: ${timings[p.key]}`;
        // Desktop
        const liDesktop = prayerMenu.children[i];
        liDesktop.dataset.en = textEn;
        liDesktop.dataset.ar = textAr;
        liDesktop.textContent = currentLang === 'ar' ? textAr : textEn;
        // Mobile
        const liMobile = mobilePrayerMenu.children[i];
        liMobile.dataset.en = textEn;
        liMobile.dataset.ar = textAr;
        liMobile.textContent = currentLang === 'ar' ? textAr : textEn;
      });

    } catch (err) {
      console.error('Error fetching prayer times:', err);
    }
  }


  // === INITIAL LOAD ===
  const startingLang = localStorage.getItem("lang") || "ar";
  updateLanguage(startingLang);
  // Load prayers on page load
  updatePrayerTimes();

  // Refresh every hour
  setInterval(updatePrayerTimes, 60 * 60 * 1000);

  syncMobileMenu();

  // === MESSAGE CHARACTER COUNTER ===
  const messageBox = document.getElementById("message");
  const charCounter = document.getElementById("charCounter");
  if (messageBox && charCounter) {
    messageBox.addEventListener("input", () => {
      charCounter.textContent = `${messageBox.value.length}/500`;
    });
  }
});