// 1. Inisialisasi AOS
AOS.init({
    duration: 800,
    once: true
});

// 2. Typing Effect Logic
const textElement = document.getElementById('typing-text');
const phrases = ["Software Engineering Student", "Web Developer", "UI/UX Enthusiast"];
let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;

function type() {
    const currentPhrase = phrases[phraseIndex];
    
    if (isDeleting) {
        textElement.textContent = currentPhrase.substring(0, charIndex - 1);
        charIndex--;
    } else {
        textElement.textContent = currentPhrase.substring(0, charIndex + 1);
        charIndex++;
    }

    let typeSpeed = isDeleting ? 50 : 150;

    if (!isDeleting && charIndex === currentPhrase.length) {
        isDeleting = true;
        typeSpeed = 2000; // Jeda saat teks lengkap
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        typeSpeed = 500;
    }

    setTimeout(type, typeSpeed);
}

// Jalankan fungsi typing saat halaman dimuat
document.addEventListener('DOMContentLoaded', type);
window.onscroll = function() { moveProgressBar() };

function moveProgressBar() {
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    document.getElementById("myBar").style.width = scrolled + "%";
}


// =========================================
// FITUR BARU: Logika Custom Cursor Neon
// =========================================
const cursorDot = document.querySelector(".cursor-dot");
const cursorOutline = document.querySelector(".cursor-outline");

window.addEventListener("mousemove", function(e) {
    const posX = e.clientX;
    const posY = e.clientY;

    // Tampilkan kursor saat mouse bergerak
    cursorDot.style.opacity = "1";
    cursorOutline.style.opacity = "1";

    // Posisi dot (instan)
    cursorDot.style.left = `${posX}px`;
    cursorDot.style.top = `${posY}px`;

    // Posisi outline (sedikit delay buat efek animasi)
    // cursorOutline.style.left = `${posX}px`;
    // cursorOutline.style.top = `${posY}px`;
    
    // Pakai animate biar lebih smooth delay-nya
    cursorOutline.animate({
        left: `${posX}px`,
        top: `${posY}px`
    }, { duration: 500, fill: "forwards" });
});

// Efek Hover pada Link dan Tombol
const interactiveElements = document.querySelectorAll("a, button, .btn");

interactiveElements.forEach(el => {
    el.addEventListener("mouseover", () => {
        cursorOutline.classList.add("cursor-grow");
    });
    el.addEventListener("mouseleave", () => {
        cursorOutline.classList.remove("cursor-grow");
    });
});
// =========================================
// FITUR BARU: Particles Background
// =========================================
particlesJS("particles-js", {
  "particles": {
    "number": { "value": 80, "density": { "enable": true, "value_area": 800 } },
    "color": { "value": "#00ff88" }, // Warna Hijau Neon
    "shape": { "type": "circle" },
    "opacity": { "value": 0.5, "random": false },
    "size": { "value": 3, "random": true },
    "line_linked": {
      "enable": true,
      "distance": 150,
      "color": "#00ff88",
      "opacity": 0.4,
      "width": 1
    },
    "move": {
      "enable": true,
      "speed": 2,
      "direction": "none",
      "random": false,
      "straight": false,
      "out_mode": "out",
      "bounce": false,
    }
  },
  "interactivity": {
    "detect_on": "canvas",
    "events": {
      "onhover": { "enable": true, "mode": "grab" }, // Partikel akan mendekat saat di-hover
      "onclick": { "enable": true, "mode": "push" },
      "resize": true
    },
    "modes": {
      "grab": { "distance": 140, "line_linked": { "opacity": 1 } },
      "push": { "particles_nb": 4 }
    }
  },
  "retina_detect": true
});
// =========================================
// FITUR BARU: Sound Feedback
// =========================================
const clickSound = document.getElementById("click-sound");
const allInteractive = document.querySelectorAll("a, button, .btn, .glass-card");

allInteractive.forEach(item => {
    // Suara saat diklik
    item.addEventListener("click", () => {
        clickSound.currentTime = 0; // Reset suara ke awal
        clickSound.volume = 0.2;    // Volume kecil saja agar tidak kaget
        clickSound.play();
    });

    // Efek kursor makin gede pas hover di card
    item.addEventListener("mouseenter", () => {
        cursorOutline.style.width = "60px";
        cursorOutline.style.height = "60px";
        cursorOutline.style.backgroundColor = "rgba(0, 255, 136, 0.1)";
    });

    item.addEventListener("mouseleave", () => {
        cursorOutline.style.width = "40px";
        cursorOutline.style.height = "40px";
        cursorOutline.style.backgroundColor = "transparent";
    });
});

// Tips: Browser modern biasanya ngeblok auto-play suara. 
// Suara baru akan aktif setelah user klik pertama kali di mana saja di web.
// =========================================
// FITUR BARU: Vanilla Tilt (Efek 3D Card)
// =========================================
VanillaTilt.init(document.querySelectorAll(".glass-card"), {
    max: 10,       // Kemiringan maksimal (derajat)
    speed: 400,    // Kecepatan transisi
    glare: true,   // Efek kilauan kaca
    "max-glare": 0.2,
});

// =========================================
// FITUR BARU: Scroll To Top Logic
// =========================================
const btnTop = document.getElementById("scrollToTop");

window.addEventListener("scroll", () => {
    if (window.scrollY > 500) {
        btnTop.style.display = "flex";
    } else {
        btnTop.style.display = "none";
    }
});

btnTop.addEventListener("click", () => {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});