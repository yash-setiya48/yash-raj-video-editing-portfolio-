/**
 * ==========================================================================
 * YASHRAJ SETIYA | FREELANCE VIDEO EDITOR PORTFOLIO JAVASCRIPT
 * ==========================================================================
 * 
 * QUICK EDIT GUIDE:
 * 1. Set your showreel video in 'CONFIG.showreelUrl':
 *    - Option A: YouTube Embed URL -> "https://www.youtube.com/embed/YOUR_VIDEO_ID?autoplay=1"
 *    - Option B: Vimeo Embed URL   -> "https://player.vimeo.com/video/YOUR_VIDEO_ID?autoplay=1"
 *    - Option C: Local MP4 video   -> "showreel.mp4"
 * 
 * 2. Set individual project videos in 'PROJECT_VIDEOS' (or keep empty until ready).
 * 3. Set personal intro video in 'CONFIG.introVideoUrl'.
 */

// --------------------------------------------------------------------------
// 1. CONFIGURATION (EDIT HERE WITH YOUR OWN VIDEO LINKS)
// --------------------------------------------------------------------------
const CONFIG = {
  // Main Showreel Video URL:
  // Replace this with your YouTube embed link, Vimeo embed link, or local mp4 file.
  // Example: "https://www.youtube.com/embed/YOUR_ID?autoplay=1" or "showreel.mp4"
  showreelUrl: "showreel.mp4",

  // Set to true if showreelUrl is a direct .mp4 video file, false if YouTube or Vimeo embed
  isShowreelMp4: true,

  // Personal Introduction Video URL (in About section):
  introVideoUrl: "",
  isIntroMp4: true,

  // Your Contact Details:
  emailAddress: "yashsetiya48@gmail.com",
  instagramUrl: "https://www.instagram.com/yashsetiyaedits/"
};

// Optional: Specific video URLs for each portfolio card
// If left empty or "#", clicking the card shows the clean project preview prompt
const PROJECT_VIDEOS = {
  "Talking head video": { url: "talking-head-video.mp4", isMp4: true },
  "Commercial Brand Ad": { url: "commercial-brand-ad.mp4", isMp4: true },
  "SaaS & Documentary Video": { url: "testimonial-ad.mp4", isMp4: true }
};

// --------------------------------------------------------------------------
// 2. INITIALIZATION
// --------------------------------------------------------------------------
document.addEventListener("DOMContentLoaded", () => {
  initMobileNav();
  initShowreelSection();
  initPortfolioFilters();
  initPortfolioCards();
  initIntroVideo();
  initVideoModal();
  initEmailCopy();
  initCurrentYear();
  initScrollSpy();
  initBgParticles();
  initClickSound();
  initCinematicCursor();
});

// --------------------------------------------------------------------------
// 3. MOBILE NAVIGATION TOGGLE
// --------------------------------------------------------------------------
function initMobileNav() {
  const toggleBtn = document.getElementById("nav-toggle");
  const navMenu = document.getElementById("nav-menu");
  const navLinks = document.querySelectorAll(".nav-link");

  if (!toggleBtn || !navMenu) return;

  toggleBtn.addEventListener("click", () => {
    navMenu.classList.toggle("open");
    toggleBtn.classList.toggle("active");
  });

  navLinks.forEach(link => {
    link.addEventListener("click", () => {
      navMenu.classList.remove("open");
      toggleBtn.classList.remove("active");
    });
  });
}

// --------------------------------------------------------------------------
// 4. SHOWREEL SECTION PLAYER
// --------------------------------------------------------------------------
function initShowreelSection() {
  const coverOverlay = document.getElementById("showreel-cover");
  const embedContainer = document.getElementById("showreel-embed-container");

  if (!coverOverlay || !embedContainer) return;

  const playShowreel = () => {
    if (CONFIG.showreelUrl && CONFIG.showreelUrl.trim() !== "") {
      coverOverlay.style.display = "none";
      embedContainer.style.display = "block";

      if (CONFIG.isShowreelMp4) {
        embedContainer.innerHTML = `
          <video controls autoplay playsinline style="width:100%;height:100%;object-fit:cover;background:#000;">
            <source src="${CONFIG.showreelUrl}" type="video/mp4">
            Your browser does not support the video tag.
          </video>
        `;
      } else {
        embedContainer.innerHTML = `
          <iframe 
            src="${CONFIG.showreelUrl}" 
            title="Yashraj Setiya - Showreel" 
            frameborder="0" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
            allowfullscreen>
          </iframe>
        `;
      }
    } else {
      openVideoModal(
        "", 
        "Yashraj Setiya - Showreel", 
        false, 
        "Showreel Video Slot", 
        "To display your showreel here, edit 'CONFIG.showreelUrl' in script.js with your YouTube embed link, Vimeo link, or local mp4 file."
      );
    }
  };

  coverOverlay.addEventListener("click", playShowreel);
  coverOverlay.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      playShowreel();
    }
  });
}

// --------------------------------------------------------------------------
// 5. PORTFOLIO FILTER TABS
// --------------------------------------------------------------------------
function initPortfolioFilters() {
  const tabs = document.querySelectorAll(".filter-tab");
  const cards = document.querySelectorAll(".portfolio-card");

  if (!tabs.length || !cards.length) return;

  tabs.forEach(tab => {
    tab.addEventListener("click", () => {
      tabs.forEach(t => t.classList.remove("active"));
      tab.classList.add("active");

      const filterValue = tab.getAttribute("data-filter");

      cards.forEach(card => {
        const category = card.getAttribute("data-category");
        if (filterValue === "all" || category === filterValue) {
          card.style.display = "flex";
          card.style.opacity = "0";
          setTimeout(() => {
            card.style.opacity = "1";
          }, 30);
        } else {
          card.style.display = "none";
        }
      });
    });
  });
}

// --------------------------------------------------------------------------
// 6. PORTFOLIO CARD CLICK & WATCH BUTTONS
// --------------------------------------------------------------------------
// --------------------------------------------------------------------------
// 6. PORTFOLIO CARD INLINE VIDEO SCROLL-INTO-VIEW AUTOPLAY
// --------------------------------------------------------------------------
function initPortfolioCards() {
  const inlineVideos = document.querySelectorAll(".card-inline-video");

  const setBtn = (vid, on) => {
    const btn = vid.closest(".card-media")?.querySelector(".sound-toggle");
    if (!btn) return;
    btn.classList.toggle("is-on", on);
    btn.setAttribute("aria-pressed", String(on));
    btn.setAttribute("aria-label", on ? "Mute video" : "Unmute video");
  };

  const muteVideo = (vid) => { vid.muted = true; setBtn(vid, false); };

  // Sound toggle buttons (default: muted). Only one video has sound at a time.
  inlineVideos.forEach(vid => {
    muteVideo(vid);
    const btn = vid.closest(".card-media")?.querySelector(".sound-toggle");
    if (!btn) return;
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      const turnOn = vid.muted;
      inlineVideos.forEach(muteVideo);
      if (turnOn) {
        vid.muted = false;
        vid.volume = 1;
        setBtn(vid, true);
        vid.play().catch(() => {});
      }
    });
  });

  // Videos start only when scrolled into view, and restart from the beginning
  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        const vid = entry.target;
        if (entry.isIntersecting) {
          vid.play().catch(() => {});
        } else {
          vid.pause();
          vid.currentTime = 0;
          muteVideo(vid); // scrolled away -> back to default muted
        }
      });
    }, { root: null, threshold: 0.35 });

    inlineVideos.forEach(vid => { vid.pause(); observer.observe(vid); });
  } else {
    inlineVideos.forEach(vid => vid.play().catch(() => {}));
  }
}

// --------------------------------------------------------------------------
// 7. PERSONAL INTRO VIDEO TRIGGER (ABOUT SECTION)
// --------------------------------------------------------------------------
function initIntroVideo() {
  const introTrigger = document.getElementById("intro-video-trigger");
  if (!introTrigger) return;

  const playIntro = () => {
    if (CONFIG.introVideoUrl && CONFIG.introVideoUrl.trim() !== "") {
      openVideoModal(CONFIG.introVideoUrl, "Personal Introduction - Yashraj Setiya", CONFIG.isIntroMp4);
    } else {
      openVideoModal(
        "",
        "Personal Introduction",
        false,
        "Personal Introduction Video",
        "This area is reserved for your personal introduction video. You can link your intro video in script.js under 'CONFIG.introVideoUrl'."
      );
    }
  };

  introTrigger.addEventListener("click", playIntro);
  introTrigger.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      playIntro();
    }
  });
}

// --------------------------------------------------------------------------
// 8. VIDEO MODAL LIGHTBOX
// --------------------------------------------------------------------------
const videoModal = document.getElementById("video-modal");
const modalVideoWrapper = document.getElementById("modal-video-wrapper");
const modalCloseBtn = document.getElementById("modal-close-btn");
const modalBackdrop = document.getElementById("modal-backdrop");
const modalTitle = document.getElementById("modal-title");

function openVideoModal(sourceUrl, titleText = "Video Preview", isMp4 = false, placeholderTitle = "", placeholderDesc = "") {
  if (!videoModal || !modalVideoWrapper) return;

  if (modalTitle) {
    modalTitle.textContent = titleText;
  }

  if (sourceUrl && sourceUrl.trim() !== "") {
    if (isMp4) {
      modalVideoWrapper.innerHTML = `
        <video controls autoplay playsinline style="width:100%;height:100%;object-fit:contain;background:#000;">
          <source src="${sourceUrl}" type="video/mp4">
          Your browser does not support the video tag.
        </video>
      `;
    } else {
      modalVideoWrapper.innerHTML = `
        <iframe 
          src="${sourceUrl}" 
          title="${titleText}" 
          frameborder="0" 
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
          allowfullscreen>
        </iframe>
      `;
    }
  } else {
    modalVideoWrapper.innerHTML = `
      <div class="modal-placeholder-notice">
        <div class="modal-placeholder-icon">
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M8 5v14l11-7z"/>
          </svg>
        </div>
        <h4 class="modal-placeholder-title">${placeholderTitle || titleText}</h4>
        <p class="modal-placeholder-desc">${placeholderDesc || "Video source ready to be linked in script.js."}</p>
        <span class="modal-placeholder-hint">Edit script.js to insert your video URL</span>
      </div>
    `;
  }

  videoModal.classList.add("active");
  videoModal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
}

function closeVideoModal() {
  if (!videoModal) return;

  videoModal.classList.remove("active");
  videoModal.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";

  if (modalVideoWrapper) {
    modalVideoWrapper.innerHTML = "";
  }
}

function initVideoModal() {
  if (modalCloseBtn) {
    modalCloseBtn.addEventListener("click", closeVideoModal);
  }

  if (modalBackdrop) {
    modalBackdrop.addEventListener("click", closeVideoModal);
  }

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && videoModal && videoModal.classList.contains("active")) {
      closeVideoModal();
    }
  });
}

// --------------------------------------------------------------------------
// 9. EMAIL COPY ACTION & TOAST
// --------------------------------------------------------------------------
function initEmailCopy() {
  const copyBtn = document.getElementById("copy-email-btn");
  const emailSpan = document.getElementById("email-address");

  if (copyBtn) {
    copyBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      const emailToCopy = emailSpan ? emailSpan.textContent.trim() : CONFIG.emailAddress;
      navigator.clipboard.writeText(emailToCopy).then(() => {
        showToast("Email address copied to clipboard!");
      }).catch(() => {
        showToast("Copied: " + emailToCopy);
      });
    });
  }
}

function showToast(message) {
  const toast = document.getElementById("toast-notice");
  if (!toast) return;

  toast.textContent = message;
  toast.classList.add("visible");

  setTimeout(() => {
    toast.classList.remove("visible");
  }, 2600);
}

// --------------------------------------------------------------------------
// 10. SCROLLSPY
// --------------------------------------------------------------------------
function initScrollSpy() {
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".nav-link");

  if (!sections.length || !navLinks.length) return;

  window.addEventListener("scroll", () => {
    let current = "";
    const scrollPosition = window.pageYOffset + 120;

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        current = section.getAttribute("id");
      }
    });

    navLinks.forEach(link => {
      link.classList.remove("active");
      const href = link.getAttribute("href");
      if (href === `#${current}`) {
        link.classList.add("active");
      }
    });
  });
}

// --------------------------------------------------------------------------
// 11. CURRENT YEAR AUTO-UPDATE
// --------------------------------------------------------------------------
function initCurrentYear() {
  const yearEl = document.getElementById("current-year");
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
}

// --------------------------------------------------------------------------
// 12. AMBIENT BACKGROUND PARTICLES (subtle "alive" effect, same color palette)
// --------------------------------------------------------------------------
function initBgParticles() {
  const container = document.getElementById("bg-particles");
  if (!container) return;

  // Respect users who prefer reduced motion
  if (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    return;
  }

  const COUNT = 26;
  const tones = ["tone-accent", "tone-blue"];

  for (let i = 0; i < COUNT; i++) {
    const dot = document.createElement("div");
    const size = Math.random() * 5 + 2; // 2px - 7px
    const left = Math.random() * 100; // vw %
    const duration = Math.random() * 14 + 14; // 14s - 28s
    const delay = Math.random() * -28; // negative so they start mid-flight, staggered
    const drift = (Math.random() * 80 - 40).toFixed(0) + "px"; // horizontal sway
    const opacity = (Math.random() * 0.35 + 0.25).toFixed(2);
    const tone = tones[Math.floor(Math.random() * tones.length)];

    dot.className = `bg-particle ${tone}`;
    dot.style.width = `${size}px`;
    dot.style.height = `${size}px`;
    dot.style.left = `${left}%`;
    dot.style.animationDuration = `${duration}s`;
    dot.style.animationDelay = `${delay}s`;
    dot.style.setProperty("--p-drift", drift);
    dot.style.setProperty("--p-opacity", opacity);

    container.appendChild(dot);
  }
}


// --------------------------------------------------------------------------
// 13. CLICK SOUND (synthesized, soft & light) - style set in <html data-click-sound="...">
//     Options: pop | chime | whoosh | thock | drop | off
// --------------------------------------------------------------------------
function initClickSound() {
  const AC = window.AudioContext || window.webkitAudioContext;
  if (!AC) return;
  let ctx = null;

  const tone = (type, f1, f2, dur, vol, t) => {
    const o = ctx.createOscillator(), g = ctx.createGain();
    o.type = type;
    o.frequency.setValueAtTime(f1, t);
    if (f2 !== f1) o.frequency.exponentialRampToValueAtTime(f2, t + dur);
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(vol, t + 0.008);
    g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    o.connect(g).connect(ctx.destination);
    o.start(t); o.stop(t + dur + 0.02);
  };

  const noise = (dur, filterType, f1, f2, vol, t) => {
    const len = Math.floor(ctx.sampleRate * dur);
    const buf = ctx.createBuffer(1, len, ctx.sampleRate);
    const d = buf.getChannelData(0);
    for (let i = 0; i < len; i++) d[i] = Math.random() * 2 - 1;
    const s = ctx.createBufferSource(); s.buffer = buf;
    const f = ctx.createBiquadFilter(); f.type = filterType;
    f.frequency.setValueAtTime(f1, t);
    f.frequency.exponentialRampToValueAtTime(f2, t + dur);
    const g = ctx.createGain();
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(vol, t + dur * 0.35);
    g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    s.connect(f).connect(g).connect(ctx.destination);
    s.start(t);
  };

  const SOUNDS = {
    pop:    (t) => tone("sine", 380, 780, 0.09, 0.16, t),
    chime:  (t) => { tone("sine", 1318, 1318, 0.28, 0.07, t); tone("sine", 1760, 1760, 0.22, 0.045, t + 0.03); },
    whoosh: (t) => noise(0.16, "bandpass", 500, 2600, 0.12, t),
    thock:  (t) => { tone("sine", 170, 70, 0.08, 0.22, t); noise(0.04, "lowpass", 900, 500, 0.06, t); },
    drop:   (t) => { tone("sine", 1150, 520, 0.12, 0.12, t); tone("sine", 2300, 1040, 0.06, 0.03, t); }
  };

  const playClick = () => {
    const style = document.documentElement.getAttribute("data-click-sound") || "pop";
    if (style === "off" || !SOUNDS[style]) return;
    try {
      if (!ctx) ctx = new AC();
      if (ctx.state === "suspended") ctx.resume();
      SOUNDS[style](ctx.currentTime);
    } catch (e) {}
  };

  // Capture phase so it still fires when other handlers stop propagation
  document.addEventListener("click", playClick, true);
}

// --------------------------------------------------------------------------
// 14. LIGHT CINEMATIC CURSOR (style set in <html data-cursor="focus|playhead|play">)
// --------------------------------------------------------------------------
function initCinematicCursor() {
  const dot = document.getElementById("cursor-dot");
  const ring = document.getElementById("cursor-ring");
  if (!dot || !ring) return;

  // Only on devices with a real mouse
  if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

  const root = document.documentElement;
  root.classList.add("has-custom-cursor");

  let mx = -100, my = -100, rx = -100, ry = -100;

  document.addEventListener("mousemove", (e) => {
    mx = e.clientX; my = e.clientY;
    root.classList.add("cursor-visible");
    dot.style.transform = `translate(${mx}px, ${my}px)`;
    const t = e.target.closest ? e.target.closest("a, button, [role='button'], .filter-tab, video, input, textarea, .portfolio-card") : null;
    ring.classList.toggle("is-link", !!t);
  });
  document.addEventListener("mouseleave", () => root.classList.remove("cursor-visible"));
  document.addEventListener("mouseenter", () => root.classList.add("cursor-visible"));

  document.addEventListener("mousedown", (e) => {
    ring.classList.add("is-down");
    const r = document.createElement("div");
    r.className = "cursor-ripple";
    r.style.left = e.clientX + "px";
    r.style.top = e.clientY + "px";
    document.body.appendChild(r);
    setTimeout(() => r.remove(), 520);
  });
  document.addEventListener("mouseup", () => ring.classList.remove("is-down"));

  const loop = () => {
    rx += (mx - rx) * 0.3;
    ry += (my - ry) * 0.3;
    ring.style.transform = `translate(${rx}px, ${ry}px)`;
    requestAnimationFrame(loop);
  };
  loop();
}
