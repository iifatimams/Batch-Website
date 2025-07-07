// =============== Intern Data & Renderer ===============
const internOfTheWeekData = {
  en: {
    "IT Department": [
      {
        imgURL: './Images/Personal Picture/Shaima.jpg',
        name: 'Shaima Hameed',
        paragraph: 'Intern of the Week',
      },
      { imgURL: './Images/Personal Picture/Ahmed Gheyas.jpg', name: 'Ahmed Gheyas' },
      { imgURL: './Images/Personal Picture/Shahad.jpg', name: 'Shahd Saleem' },
      { imgURL: './Images/Personal Picture/Omar Amer.jpg', name: 'Omar Amer' }
    ],
    "Accounting Department": [
      {
        imgURL: './Images/Personal Picture/Reem.jpg',
        name: 'Reem Alkaabi',
        paragraph: 'Intern of the Week',
      },
      { imgURL: './Images/Personal Picture/Marwa.jpg', name: 'Marwa Alowais' }
    ],
    "HR Department": [
      {
        imgURL: './Images/girl.jpg',
        name: 'Sara Almazmi',
        paragraph: 'Intern of the Week',
      },
      { imgURL: './Images/boy.jpg', name: 'Ali Almaazmi' },
      { imgURL: './Images/Personal Picture/Omar Alali.jpg', name: 'Omar Alali' }
    ],
    "Media Department": [
      {
        imgURL: './Images/Personal Picture/Aysha.jpg',
        name: 'Aisha Zoarab',
        paragraph: 'Intern of the Week',
      },
      { imgURL: './Images/boy.jpg', name: 'Khaled Bin Touq' },
      { imgURL: './Images/Personal Picture/Nagham.jpg', name: 'Nagham Mhish' },
      { imgURL: './Images/Personal Picture/Oumaima.jpg', name: 'Oumaima El Mahdad' }
    ],
  },
  ar: {
    "إدارة التقنية المتقدمة": [
      {
        imgURL: './Images/Personal Picture/Shaima.jpg',
        name: 'شيماء حميد',
        paragraph: 'متدرب الأسبوع',
      },
      { imgURL: './Images/Personal Picture/Ahmed Gheyas.jpg', name: 'أحمد غياث' },
      { imgURL: './Images/Personal Picture/Shahad.jpg', name: 'شهد سليم' },
      { imgURL: './Images/Personal Picture/Omar Amer.jpg', name: 'عمر عامر' }
    ],
    "إدارة الشؤون المالية": [
      {
        imgURL: './Images/Personal Picture/Reem.jpg',
        name: 'ريم الكعبي',
        paragraph: 'متدرب الأسبوع',
      },
      { imgURL: './Images/Personal Picture/Marwa.jpg', name: 'مروة العويس' }
    ],
    "إدارة الموارد البشرية": [
      {
        imgURL: './Images/girl.jpg',
        name: 'سارة المازمي',
        paragraph: 'متدرب الأسبوع',
      },
      { imgURL: './Images/boy.jpg', name: 'علي المازمي' },
      { imgURL: './Images/Personal Picture/Omar Alali.jpg', name: 'عمر ال علي' }
    ],
    "وحدة الرؤى الإعلامية": [
      {
        imgURL: './Images/Personal Picture/Aysha.jpg',
        name: 'عائشة زعرب',
        paragraph: 'متدرب الأسبوع',
      },
      { imgURL: './Images/boy.jpg', name: 'خالد بن طوق' },
      { imgURL: './Images/Personal Picture/Nagham.jpg', name: 'نغم محيش' },
      { imgURL: './Images/Personal Picture/Oumaima.jpg', name: 'أميمة المحداد' }
    ]
  }
};

function renderInterns() {
  const pageBody = document.getElementById('pageBody');
  const homeMain = document.querySelector('.home-main');
  const lang = pageBody?.getAttribute('lang') || 'en';
  homeMain.innerHTML = '';

  const heading = document.createElement('h1');
  heading.className = 'section-heading';
  heading.textContent = lang === 'ar' ? 'المتدربون المتميزون' : 'Intern of the Week';
  homeMain.appendChild(heading);

  const data = internOfTheWeekData[lang];
  const defaultProfile = "./Images/insta.jpg";

  Object.keys(data).forEach(dept => {
    const internGroup = data[dept];
    const topIntern = internGroup[0];
    const thankYouInterns = internGroup.slice(1, 4);

    const section = document.createElement('section');
    section.className = 'intern-of-the-week-container';

    section.innerHTML = `
      <h2 class="title">${dept}</h2>
      <div class="intern-of-the-week-card">
        <div class="star-badge">⭐</div>
        <img src="${topIntern.imgURL || defaultProfile}" alt="${topIntern.name}">
        <h3>${topIntern.name}</h3>
        <p class="paragraph">${topIntern.paragraph}</p>
      </div>
      <h4 class="thank-title">${lang === 'ar' ? 'نشكر' : 'Thanking'}:</h4>
      <div class="intern-thankyou-list">
        ${thankYouInterns.map(p => `
          <div class="thankyou-item">
            <img src="${p.imgURL || defaultProfile}" alt="${p.name}">
            <span>${p.name}</span>
          </div>
        `).join('')}
      </div>
      <hr class="department-separator">
    `;
    homeMain.appendChild(section);
  });
}

window.renderInterns = renderInterns;

// =============== Contact.js Behavior ===============
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
    document.querySelectorAll(".lang-en").forEach((el) => (el.style.display = isArabic ? "none" : "inline"));
    document.querySelectorAll(".lang-ar").forEach((el) => (el.style.display = isArabic ? "inline" : "none"));
    document.querySelectorAll("input, textarea, select").forEach((el) => {
      el.style.textAlign = isArabic ? "right" : "left";
    });
    document.querySelectorAll("label").forEach((label) => {
      label.style.textAlign = isArabic ? "right" : "left";
    });
    updatePrayerTimes();
    syncMobileMenu();
    localStorage.setItem("lang", lang);
    renderInterns();
  }

  langBtn.addEventListener("click", () => {
    const newLang = pageBody.getAttribute("lang") === "en" ? "ar" : "en";
    updateLanguage(newLang);
    mobileMenu.classList.remove("show");
  });

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

  menuBtn.addEventListener("click", () => {
    mobileMenu.classList.toggle("show");
  });

  function syncMobileMenu() {
    mobileList.innerHTML = "";
    const desktopMenu = document.querySelector("#mainMenu > ul");
    desktopMenu.querySelectorAll(":scope > li").forEach((li) => {
      if (li.classList.contains("department-dropdown")) {
        const depToggle = document.createElement("li");
        depToggle.classList.add("dropdown-toggle");
        depToggle.textContent = pageBody.getAttribute("lang") === "ar" ? "الإدارات" : "Departments";
        depToggle.addEventListener("click", () => {
          depToggle.classList.toggle("active");
          depMenu.classList.toggle("show");
        });
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
        mobileList.appendChild(depToggle);
        mobileList.appendChild(depMenu);
      } else {
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

  depbtn?.addEventListener("click", (e) => {
    e.stopPropagation();
    depbtn.closest(".department-dropdown")?.classList.toggle("active");
  });

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
      const prayerTimesToday = prayerNames.map(p => {
        const [h, m] = timings[p.key].split(':').map(Number);
        const d = new Date();
        d.setHours(h);
        d.setMinutes(m);
        d.setSeconds(0);
        return { ...p, date: d };
      });
      let nextPrayer = prayerTimesToday.find(p => now < p.date);
      if (!nextPrayer) nextPrayer = prayerTimesToday[0];
      const lang = pageBody.getAttribute('lang');
      const label = lang === 'ar' ? `🕌 ${nextPrayer.ar}: ${timings[nextPrayer.key]}` : `🕌 ${nextPrayer.en}: ${timings[nextPrayer.key]}`;
      prayerBtn.textContent = label;
      mobilePrayerToggle.textContent = label;
      prayerNames.forEach((p, i) => {
        const en = `${p.en}: ${timings[p.key]}`;
        const ar = `${p.ar}: ${timings[p.key]}`;
        const liDesktop = prayerMenu.children[i];
        const liMobile = mobilePrayerMenu.children[i];
        liDesktop.dataset.en = en;
        liDesktop.dataset.ar = ar;
        liDesktop.textContent = lang === 'ar' ? ar : en;
        liMobile.dataset.en = en;
        liMobile.dataset.ar = ar;
        liMobile.textContent = lang === 'ar' ? ar : en;
      });
    } catch (err) {
      console.error('Error fetching prayer times:', err);
    }
  }

  const startingLang = localStorage.getItem("lang") || "ar";
  updateLanguage(startingLang);
  updatePrayerTimes();
  setInterval(updatePrayerTimes, 60 * 60 * 1000);
  syncMobileMenu();
});
