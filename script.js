// ===========================
// SCRIPT.JS - FINAL RISKYDEV
// ===========================

/* 🔹 Toggle menu */
const toggleBtn = document.getElementById('menu-toggle');
const navMenu = document.getElementById('nav-menu');

if (toggleBtn && navMenu) {
  toggleBtn.addEventListener('click', () => {
    navMenu.classList.toggle('show');
  });

  // Auto close menu on link click
  navMenu.addEventListener('click', (e) => {
    if (e.target.tagName === 'A') navMenu.classList.remove('show');
  });

  // Close menu on click outside
  document.addEventListener('click', (e) => {
    if (!navMenu.contains(e.target) && !toggleBtn.contains(e.target)) {
      navMenu.classList.remove('show');
    }
  });
}

/* 🔹 Smooth reveal on scroll */
const revealElements = document.querySelectorAll(
  '.slide-up, .slide-left, .slide-right, .fade-up, .fade-left, .fade-right, .zoom-in'
);

const revealOnScroll = () => {
  const triggerBottom = window.innerHeight * 0.85;
  revealElements.forEach((el) => {
    const rect = el.getBoundingClientRect();
    if (rect.top < triggerBottom) {
      el.classList.remove('hidden');
      el.style.animationDelay = el.dataset.delay || '0s';
      el.style.opacity = 1;
      el.classList.add('fade-up');
    }
  });
};

window.addEventListener('scroll', revealOnScroll);
window.addEventListener('load', () => {
  revealElements.forEach((el) => {
    el.classList.add('hidden');
    el.style.opacity = 0;
  });
  revealOnScroll();
});

/* 🔹 Contact form (demo only, disable alert) */
const contactForm = document.querySelector('.contact form');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    // Gak pake alert biar gak ganggu komentar
    contactForm.reset();
  });
}

/* 🔹 Smooth scroll anchor fix */
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    if (href.length > 1) {
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        const headerOffset = document.querySelector('header.navbar').offsetHeight;
        const elementPosition = target.getBoundingClientRect().top + window.pageYOffset;
        const offsetPosition = elementPosition - headerOffset - 12;
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth',
        });
      }
    }
  });
});

/* ===========================
   KOMENTAR SECTION (FINAL)
=========================== */
/* ===========================
   KOMENTAR SECTION (FINAL FIX)
=========================== */
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("commentForm");
  const list = document.getElementById("commentList");

  loadComments();

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const nama = document.getElementById("nama").value.trim();
    const pesan = document.getElementById("pesan").value.trim();

    if (!nama || !pesan) return;

    const comment = {
      nama,
      pesan,
      waktu: new Date().toLocaleString(),
    };

    saveComment(comment);
    displayComment(comment, true);
    form.reset();
    showNotif("✅ Komentar berhasil dikirim!");
  });

  function saveComment(comment) {
    const comments = JSON.parse(localStorage.getItem("comments")) || [];
    comments.push(comment);
    localStorage.setItem("comments", JSON.stringify(comments));
  }

  function loadComments() {
    const comments = JSON.parse(localStorage.getItem("comments")) || [];
    comments.forEach((c) => displayComment(c));
  }

  function displayComment(comment, isNew = false) {
    const div = document.createElement("div");
    div.classList.add("comment-item");
    div.innerHTML = `
      <strong>${comment.nama}</strong>
      <p>${comment.pesan}</p>
      <small>${comment.waktu}</small>
    `;
    if (isNew) div.style.animation = "fadeUp 0.5s ease forwards";
    list.appendChild(div);
  }

  function showNotif(text) {
    const notif = document.createElement("div");
    notif.textContent = text;
    notif.style.position = "fixed";
    notif.style.bottom = "25px";
    notif.style.right = "25px";
    notif.style.background = "linear-gradient(90deg,#00eaff,#00ff88)";
    notif.style.color = "#001";
    notif.style.padding = "10px 16px";
    notif.style.borderRadius = "8px";
    notif.style.fontWeight = "600";
    notif.style.boxShadow = "0 0 10px rgba(0,255,247,0.4)";
    notif.style.transition = "opacity 0.5s ease";
    document.body.appendChild(notif);

    setTimeout(() => {
      notif.style.opacity = "0";
      setTimeout(() => notif.remove(), 500);
    }, 2000);
  }
});
