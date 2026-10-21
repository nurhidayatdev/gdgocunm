/**
 * Google Developer Groups On Campus - Universitas Negeri Makassar
 * Interactive Logic (English Edition matching gdgoc-unm.vercel.app)
 */

document.addEventListener("DOMContentLoaded", () => {
    initNavbar();

    renderActivities();
    initTracksSection();
    renderEvents();
    renderTeam();
    // renderGallery(); // Gallery temporarily hidden
    renderTestimonials();
    initFAQAccordion();
    initTrackModal();
});

/* -------------------------------------------------------------------------
 * Navbar Behavior
 * ------------------------------------------------------------------------- */
function initNavbar() {
    const header = document.querySelector(".site-header");
    const navLinks = document.querySelectorAll(".nav-link");
    const sections = document.querySelectorAll("section[id]");
    const mobileToggle =
        document.getElementById("mobile-toggle-btn") ||
        document.querySelector(".mobile-toggle");
    const mobileNavMenu = document.getElementById("mobile-nav-drawer");
    const mobileBackdrop = document.getElementById("mobile-nav-backdrop");

    const closeMobileMenu = () => {
        if (mobileNavMenu) mobileNavMenu.classList.remove("open");
        if (mobileToggle) {
            mobileToggle.classList.remove("active");
            mobileToggle.setAttribute("aria-expanded", "false");
        }
        if (mobileBackdrop) mobileBackdrop.classList.remove("open");
        document.body.style.overflow = "";
    };

    const openMobileMenu = () => {
        if (mobileNavMenu) mobileNavMenu.classList.add("open");
        if (mobileToggle) {
            mobileToggle.classList.add("active");
            mobileToggle.setAttribute("aria-expanded", "true");
        }
        if (mobileBackdrop) mobileBackdrop.classList.add("open");
        document.body.style.overflow = "hidden";
    };

    // Scroll listener for active link highlight & header shadow
    window.addEventListener("scroll", () => {
        let current = "";
        const scrollPos = window.scrollY + 180;
        sections.forEach((section) => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            if (
                scrollPos >= sectionTop &&
                scrollPos < sectionTop + sectionHeight
            ) {
                current = section.getAttribute("id");
            }
        });

        navLinks.forEach((link) => {
            link.classList.remove("active");
            if (link.getAttribute("href") === `#${current}`) {
                link.classList.add("active");
            }
        });
    });

    // Mobile toggle click
    if (mobileToggle) {
        mobileToggle.addEventListener("click", (e) => {
            e.stopPropagation();
            const isOpen =
                mobileNavMenu && mobileNavMenu.classList.contains("open");
            if (isOpen) {
                closeMobileMenu();
            } else {
                openMobileMenu();
            }
        });
    }

    // Close when clicking on backdrop
    if (mobileBackdrop) {
        mobileBackdrop.addEventListener("click", closeMobileMenu);
    }

    // Close when pressing Escape
    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape") closeMobileMenu();
    });

    // Close when clicking any nav link inside drawer
    document.querySelectorAll(".mobile-nav-drawer a").forEach((link) => {
        link.addEventListener("click", closeMobileMenu);
    });
}

/* -------------------------------------------------------------------------
 * Activities (Aktivitas Kami)
 * ------------------------------------------------------------------------- */
function renderActivities() {
    const container = document.getElementById("activities-grid");
    if (!container || !GDG_DATA.activities) return;

    container.innerHTML = GDG_DATA.activities
        .map(
            (act) => `
    <div class="activity-card ${act.color}">
      <h3>${act.title}</h3>
      <p>${act.desc}</p>
      <div class="activity-tags">
        ${act.tags.map((t) => `<span class="tag-pill">#${t}</span>`).join("")}
      </div>
    </div>
  `,
        )
        .join("");
}

/* -------------------------------------------------------------------------
 * Learning Path (Tracks) — Seamless Infinite Scroll (rAF)
 * ------------------------------------------------------------------------- */
let trackRafId = null;
let trackScrollPos = 0;
let trackScrollPaused = false;
let trackTouchStartX = 0;
let trackTouchEndX = 0;

// Default SVG icons per track category / id as graceful fallbacks
const TRACK_ICONS = {
    uiux: `
    <svg class="track-icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <path d="M12 19l7-7 3 3-7 7-3-3z"/>
      <path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z"/>
      <path d="M2 2l7.586 7.586"/>
      <circle cx="11" cy="11" r="2"/>
    </svg>`,
    frontend: `
    <svg class="track-icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <polyline points="16 18 22 12 16 6"/>
      <polyline points="8 6 2 12 8 18"/>
      <line x1="14" y1="4" x2="10" y2="20"/>
    </svg>`,
    backend: `
    <svg class="track-icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <ellipse cx="12" cy="5" rx="9" ry="3"/>
      <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/>
      <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/>
    </svg>`,
    mobile: `
    <svg class="track-icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <rect x="5" y="2" width="14" height="20" rx="2" ry="2"/>
      <line x1="12" y1="18" x2="12.01" y2="18"/>
    </svg>`,
    robotics: `
    <svg class="track-icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <rect x="3" y="11" width="18" height="10" rx="2"/>
      <circle cx="12" cy="5" r="2"/>
      <path d="M12 7v4"/>
      <line x1="8" y1="16" x2="8.01" y2="16"/>
      <line x1="16" y1="16" x2="16.01" y2="16"/>
    </svg>`,
    "ai-ml": `
    <svg class="track-icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <path d="M12 2a4 4 0 0 1 4 4c0 1.1-.5 2.1-1.3 2.8L15 13h-6l.3-4.2C8.5 8.1 8 7.1 8 6a4 4 0 0 1 4-4z"/>
      <path d="M9 13v3a3 3 0 0 0 6 0v-3"/>
      <path d="M10 21h4"/>
    </svg>`,
    "data-science": `
    <svg class="track-icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <line x1="18" y1="20" x2="18" y2="10"/>
      <line x1="12" y1="20" x2="12" y2="4"/>
      <line x1="6" y1="20" x2="6" y2="14"/>
    </svg>`,
    "cyber-security": `
    <svg class="track-icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
    </svg>`,
};

function initTracksSection() {
    const trackEl = document.getElementById("tracks-carousel-track");
    const prevBtn = document.getElementById("tracks-prev-btn");
    const nextBtn = document.getElementById("tracks-next-btn");
    const viewport = document.getElementById("tracks-viewport");
    if (!trackEl || !GDG_DATA.tracks) return;

    const tracks = GDG_DATA.tracks;

    // Build card HTML helper
    const makeCardHtml = () =>
        tracks
            .map((track) => {
                const fallbackSvg =
                    TRACK_ICONS[track.id] || TRACK_ICONS["frontend"];
                return `
      <div class="track-card">
        <div class="track-top">
          <span class="track-category">${track.category}</span>
          <span class="track-indicator ${track.color}"></span>
        </div>
        <div class="track-icon-container color-${track.color}">
          <img src="assets/images/tracks/${track.id}.png" alt="${track.title} icon"
               class="track-icon-img" loading="lazy"
               onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';"/>
          <div class="track-icon-fallback" style="display:none;width:100%;height:100%;align-items:center;justify-content:center;">
            ${fallbackSvg}
          </div>
        </div>
        <h3>${track.title}</h3>
        <p>${track.desc}</p>
      </div>`;
            })
            .join("");

    // Duplicate cards: [original][clone] for seamless wrap
    trackEl.innerHTML = makeCardHtml() + makeCardHtml();
    trackEl.style.transition = "none";

    // Kill any existing rAF
    if (trackRafId) {
        cancelAnimationFrame(trackRafId);
        trackRafId = null;
    }
    trackScrollPos = 0;

    // Start after layout settles
    requestAnimationFrame(() =>
        requestAnimationFrame(() => {
            _startTrackRaf(trackEl, tracks.length);
        }),
    );

    // Arrow buttons — smooth manual jump
    if (prevBtn)
        prevBtn.addEventListener("click", () =>
            _trackManualJump(trackEl, tracks.length, -1),
        );
    if (nextBtn)
        nextBtn.addEventListener("click", () =>
            _trackManualJump(trackEl, tracks.length, 1),
        );

    if (viewport) {
        // Pause on hover
        viewport.addEventListener("mouseenter", () => {
            trackScrollPaused = true;
        });
        viewport.addEventListener("mouseleave", () => {
            trackScrollPaused = false;
        });
        // Touch swipe
        viewport.addEventListener(
            "touchstart",
            (e) => {
                trackScrollPaused = true;
                trackTouchStartX = e.changedTouches[0].screenX;
            },
            { passive: true },
        );
        viewport.addEventListener(
            "touchend",
            (e) => {
                trackTouchEndX = e.changedTouches[0].screenX;
                const diff = trackTouchStartX - trackTouchEndX;
                if (Math.abs(diff) > 40)
                    _trackManualJump(trackEl, tracks.length, diff > 0 ? 1 : -1);
                else
                    setTimeout(() => {
                        trackScrollPaused = false;
                    }, 50);
            },
            { passive: true },
        );
    }

    // Resize: reset position
    let resizeTimer;
    window.addEventListener("resize", () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            trackScrollPos = 0;
            trackEl.style.transform = "translateX(0)";
        }, 150);
    });
}

let trackJumpTimeout = null;
function _startTrackRaf(trackEl, originalCount) {
    if (trackRafId) cancelAnimationFrame(trackRafId);
    let last = null;
    function step(ts) {
        if (!last) last = ts;
        const dt = ts - last;
        last = ts;
        if (!trackScrollPaused) {
            const cards = trackEl.querySelectorAll(".track-card");
            if (cards.length) {
                const unitW = cards[0].offsetWidth + 20;
                const halfW = originalCount * unitW;
                trackScrollPos += 0.065 * dt; // Faster, smooth carousel movement
                if (trackScrollPos >= halfW) trackScrollPos -= halfW;
                trackEl.style.transform = `translateX(-${trackScrollPos}px)`;
            }
        }
        trackRafId = requestAnimationFrame(step);
    }
    trackRafId = requestAnimationFrame(step);
}

function _trackManualJump(trackEl, originalCount, direction) {
    const cards = trackEl.querySelectorAll(".track-card");
    if (!cards.length) return;
    const unitW = cards[0].offsetWidth + 20;
    const halfW = originalCount * unitW;

    // Smooth CSS transition for the manual jump
    trackScrollPaused = true;
    if (trackJumpTimeout) clearTimeout(trackJumpTimeout);

    trackScrollPos += direction * unitW;
    if (trackScrollPos >= halfW) trackScrollPos -= halfW;
    if (trackScrollPos < 0) trackScrollPos += halfW;

    trackEl.style.transition = "transform 0.38s cubic-bezier(0.16,1,0.3,1)";
    trackEl.style.transform = `translateX(-${trackScrollPos}px)`;
    trackJumpTimeout = setTimeout(() => {
        trackEl.style.transition = "none";
        trackScrollPaused = false;
    }, 400);
}

/* -------------------------------------------------------------------------
 * Track Detail Modal
 * ------------------------------------------------------------------------- */
function initTrackModal() {
    const modalOverlay = document.getElementById("track-modal-overlay");
    const modalClose = document.getElementById("modal-close-btn");

    if (modalClose && modalOverlay) {
        modalClose.addEventListener("click", () =>
            modalOverlay.classList.remove("open"),
        );
        modalOverlay.addEventListener("click", (e) => {
            if (e.target === modalOverlay)
                modalOverlay.classList.remove("open");
        });
        document.addEventListener("keydown", (e) => {
            if (e.key === "Escape") modalOverlay.classList.remove("open");
        });
    }
}

window.openTrackModal = function (trackId) {
    const track = GDG_DATA.tracks.find((t) => t.id === trackId);
    const modalOverlay = document.getElementById("track-modal-overlay");
    const modalBody = document.getElementById("modal-body-content");
    if (!track || !modalOverlay || !modalBody) return;

    modalBody.innerHTML = `
    <div style="display:flex; align-items:center; gap:10px; margin-bottom:12px;">
      <span class="activity-badge badge-${track.color}">${track.category}</span>
      <span style="font-size:0.8rem; color:var(--text-muted); font-family:var(--font-mono);">Track #${track.id}</span>
    </div>
    <h2 style="font-size:1.8rem; margin-bottom:12px; color:#fff;">${track.title}</h2>
    <p style="font-size:0.98rem; line-height:1.6; margin-bottom:20px; color:var(--text-secondary);">${track.details}</p>

    <h4 style="font-size:0.95rem; text-transform:uppercase; letter-spacing:0.04em; color:var(--blue-light); margin-bottom:10px;">Core Technologies & Tools</h4>
    <div style="display:flex; flex-wrap:wrap; gap:8px; margin-bottom:24px;">
      ${track.techStack.map((t) => `<span class="tech-tag" style="padding:5px 12px; font-size:0.82rem;">${t}</span>`).join("")}
    </div>

    <h4 style="font-size:0.95rem; text-transform:uppercase; letter-spacing:0.04em; color:var(--green-light); margin-bottom:12px;">Weekly Curriculum Modules</h4>
    <div style="display:flex; flex-direction:column; gap:8px; margin-bottom:28px;">
      ${track.syllabus
          .map(
              (item, idx) => `
        <div style="display:flex; align-items:flex-start; gap:12px; font-size:0.9rem; color:var(--text-primary); padding:10px 14px; background:rgba(255,255,255,0.03); border-radius:8px; border:1px solid var(--border-subtle);">
          <span style="font-family:var(--font-mono); font-weight:700; color:var(--blue-light); font-size:0.82rem;">0${idx + 1}.</span>
          <span>${item}</span>
        </div>
      `,
          )
          .join("")}
    </div>

    <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:12px; padding-top:16px; border-top:1px solid var(--border-subtle);">
      <span style="font-size:0.84rem; color:var(--text-muted);">Weekly sessions in UNM Campus labs & online</span>
      <a href="${GDG_DATA.chapter.communityUrl}" target="_blank" rel="noopener noreferrer" class="btn-primary" style="padding:8px 20px;">
        Join This Track
      </a>
    </div>
  `;

    modalOverlay.classList.add("open");
};

/* -------------------------------------------------------------------------
 * Google Events (JuaraGCP, Solution Challenge, DevFest)
 * ------------------------------------------------------------------------- */
function renderEvents() {
    const container = document.getElementById("events-grid");
    if (!container || !GDG_DATA.events) return;

    container.innerHTML = GDG_DATA.events
        .map(
            (ev) => `
    <div class="event-card ${ev.color}">
      <h3>${ev.title}</h3>
      <p>${ev.desc}</p>
      <div class="event-features-list">
        ${ev.highlights
            .map(
                (h) => `
          <div class="event-feature-item">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
              <path d="M20 6L9 17l-5-5"/>
            </svg>
            <span>${h}</span>
          </div>
        `,
            )
            .join("")}
      </div>
      <div style="margin-top:auto; padding-top:14px;">
        <a href="${ev.link}" target="_blank" rel="noopener noreferrer" class="btn-secondary" style="font-size:0.82rem; padding:8px 18px;">
          ${ev.linkLabel}
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3"/>
          </svg>
        </a>
      </div>
    </div>
  `,
        )
        .join("");
}

/* -------------------------------------------------------------------------
 * Team — Division Filter Tabs + Carousel
 * ------------------------------------------------------------------------- */

const DIVISION_COLORS = {
    "All Divisions": "blue",
    Organizer: "white",
    "Research & Development": "green",
    "Relation & Communication": "yellow",
    "Event Management": "red",
    "Branding & Design": "blue",
};

let activeTeamDivision = "All Divisions";
let carouselMembers = [];
let teamRafId = null;
let teamScrollPos = 0;
let teamScrollPaused = false;

function getCarouselVisibleCount() {
    if (window.innerWidth <= 520) return 1;
    if (window.innerWidth <= 768) return 2;
    if (window.innerWidth <= 1024) return 3;
    return 4;
}

function renderTeam() {
    const section = document.getElementById("team");
    if (!section || !GDG_DATA.team) return;
    const container = section.querySelector(".container");

    let teamWrap = document.getElementById("team-carousel-root");
    if (!teamWrap) {
        teamWrap = document.createElement("div");
        teamWrap.id = "team-carousel-root";
        container.appendChild(teamWrap);
    }
    teamWrap.innerHTML = "";

    // Carousel Shell
    teamWrap.insertAdjacentHTML(
        "beforeend",
        `
    <div class="team-carousel-wrapper" id="team-carousel-wrapper">
      <button class="team-carousel-arrow" id="team-prev-btn" aria-label="Previous">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><polyline points="15 18 9 12 15 6"/></svg>
      </button>
      <div class="team-carousel-viewport" id="team-carousel-viewport">
        <div class="team-carousel-track" id="team-carousel-track"></div>
      </div>
      <button class="team-carousel-arrow" id="team-next-btn" aria-label="Next">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><polyline points="9 18 15 12 9 6"/></svg>
      </button>
    </div>
    <div class="team-carousel-dots" id="team-carousel-dots"></div>
  `,
    );

    // Arrow buttons
    document
        .getElementById("team-prev-btn")
        .addEventListener("click", () => _teamManualJump(-1));
    document
        .getElementById("team-next-btn")
        .addEventListener("click", () => _teamManualJump(1));

    // Touch + hover
    let touchStartX = 0;
    const viewport = document.getElementById("team-carousel-viewport");
    if (viewport) {
        viewport.addEventListener("mouseenter", () => {
            teamScrollPaused = true;
        });
        viewport.addEventListener("mouseleave", () => {
            teamScrollPaused = false;
        });
        viewport.addEventListener(
            "touchstart",
            (e) => {
                teamScrollPaused = true;
                touchStartX = e.touches[0].clientX;
            },
            { passive: true },
        );
        viewport.addEventListener(
            "touchend",
            (e) => {
                const diff = touchStartX - e.changedTouches[0].clientX;
                if (Math.abs(diff) > 50) _teamManualJump(diff > 0 ? 1 : -1);
                else
                    setTimeout(() => {
                        teamScrollPaused = false;
                    }, 50);
            },
            { passive: true },
        );
    }

    // Resize
    let resizeTimer;
    window.addEventListener("resize", () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            teamScrollPos = 0;
            const track = document.getElementById("team-carousel-track");
            if (track) track.style.transform = "translateX(0)";
            buildCarousel();
        }, 150);
    });

    buildCarousel();
}

function buildCarousel() {
    carouselMembers =
        activeTeamDivision === "All Divisions"
            ? GDG_DATA.team
            : GDG_DATA.team.filter((m) => m.division === activeTeamDivision);

    teamScrollPos = 0;

    const track = document.getElementById("team-carousel-track");
    if (!track) return;

    // Build a card HTML string
    const makeCardHtml = () =>
        carouselMembers
            .map((member) => {
                const initials = member.name
                    .split(" ")
                    .map((n) => n[0])
                    .slice(0, 2)
                    .join("");
                const isLead = member.division === "Organizer";
                const color = isLead ? "white" : (member.color || "blue");
                const photoContent = member.image
                    ? `<img src="${member.image}" alt="${member.name}" class="team-photo-img"
              onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
         <span class="team-avatar-fallback" style="display:none;">${initials}</span>`
                    : `<span class="team-avatar-fallback">${initials}</span>`;
                return `
      <div class="team-card ${isLead ? "is-lead" : ""}">
        <div class="team-photo-area ${color}">${photoContent}</div>
        <h3 class="team-card-name" title="${member.name}">${member.name}</h3>
        <div class="team-card-role ${color}" title="${member.role}">${member.role}</div>
        ${
            member.division !== "Organizer"
                ? `<span class="team-card-division ${color}" title="${member.division}">${member.division}</span>`
                : `<span class="team-card-division ${color}" title="Organizer">Organizer</span>`
        }
        <div class="team-card-divider"></div>
        <div class="team-socials">
          <a href="${member.socials.linkedin || "#"}" class="social-icon-btn" title="LinkedIn" target="_blank" rel="noopener noreferrer">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z"/><circle cx="4" cy="4" r="2"/></svg>
          </a>
          <a href="${member.socials.instagram || "#"}" class="social-icon-btn" title="Instagram" target="_blank" rel="noopener noreferrer">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
          </a>
        </div>
      </div>`;
            })
            .join("");

    // Duplicate for seamless infinite loop
    track.innerHTML = makeCardHtml() + makeCardHtml();
    track.style.transition = "none";
    track.style.transform = "translateX(0)";

    // Size cards correctly
    _sizeTeamCards(track);

    // Stop previous rAF, start fresh
    if (teamRafId) {
        cancelAnimationFrame(teamRafId);
        teamRafId = null;
    }
    requestAnimationFrame(() =>
        requestAnimationFrame(() => {
            _startTeamRaf(track, carouselMembers.length);
        }),
    );
}

function _sizeTeamCards(track) {
    const viewport = document.getElementById("team-carousel-viewport");
    if (!viewport) return;
    const vpWidth = viewport.clientWidth - 8;
    const gap = 16;
    const visible = getCarouselVisibleCount();
    const cardWidth = Math.floor((vpWidth - gap * (visible - 1)) / visible);
    track.querySelectorAll(".team-card").forEach((card) => {
        card.style.flex = `0 0 ${cardWidth}px`;
        card.style.width = `${cardWidth}px`;
    });
}

let teamJumpTimeout = null;
function _startTeamRaf(track, originalCount) {
    if (teamRafId) cancelAnimationFrame(teamRafId);
    let last = null;
    function step(ts) {
        if (!last) last = ts;
        const dt = ts - last;
        last = ts;
        if (!teamScrollPaused) {
            const cards = track.querySelectorAll(".team-card");
            if (cards.length) {
                const unitW = cards[0].offsetWidth + 16;
                const halfW = originalCount * unitW;
                teamScrollPos += 0.065 * dt; // Faster, smooth carousel movement
                if (teamScrollPos >= halfW) teamScrollPos -= halfW;
                track.style.transform = `translateX(-${teamScrollPos}px)`;
            }
        }
        teamRafId = requestAnimationFrame(step);
    }
    teamRafId = requestAnimationFrame(step);
}

function _teamManualJump(direction) {
    const track = document.getElementById("team-carousel-track");
    if (!track) return;
    const cards = track.querySelectorAll(".team-card");
    if (!cards.length) return;
    const unitW = cards[0].offsetWidth + 16;
    const halfW = carouselMembers.length * unitW;

    teamScrollPaused = true;
    if (teamJumpTimeout) clearTimeout(teamJumpTimeout);

    teamScrollPos += direction * unitW;
    if (teamScrollPos >= halfW) teamScrollPos -= halfW;
    if (teamScrollPos < 0) teamScrollPos += halfW;

    track.style.transition = "transform 0.38s cubic-bezier(0.16,1,0.3,1)";
    track.style.transform = `translateX(-${teamScrollPos}px)`;
    teamJumpTimeout = setTimeout(() => {
        track.style.transition = "none";
        teamScrollPaused = false;
    }, 400);
}

// Legacy stubs kept for compatibility (no-op now)
function buildDots() {}
function updateCarousel() {}
function startTeamAutoScroll() {}
function stopTeamAutoScroll() {}
function restartTeamAutoScroll() {}
function moveTeamCarousel(dir) {
    _teamManualJump(dir);
}

/* -------------------------------------------------------------------------
 * Gallery — Infinite Auto-Scroll Carousel (viewport + track pattern)
 * ------------------------------------------------------------------------- */
let galleryRafId = null;
let galleryScrollPos = 0;
let galleryScrollPaused = false;

function renderGallery() {
    const viewport = document.getElementById("gallery-grid");
    if (!viewport || !GDG_DATA.gallery) return;

    const colorMap = {
        blue: "#4285F4",
        green: "#34A853",
        yellow: "#FBBC04",
        red: "#EA4335",
    };

    const makeCard = (item) => {
        const col = colorMap[item.color] || "#4285F4";
        return `
      <div class="gallery-card">
        <div class="gallery-media">
          ${
              item.image
                  ? `
            <img src="${item.image}" alt="${item.title}" class="gallery-media-img"
                 onerror="this.style.display='none'; this.nextElementSibling.style.display='block';"
                 style="width:100%; height:100%; object-fit:cover;">
          `
                  : ""
          }
          <div class="gallery-fallback-graphic" style="${item.image ? "display:none;" : ""} width:100%; height:100%;">
            <svg class="gallery-media-svg" viewBox="0 0 400 260" fill="none" width="100%" height="100%">
              <rect width="400" height="260" fill="#141722"/>
              <line x1="0" y1="65" x2="400" y2="65" stroke="#1d2232" stroke-width="1"/>
              <line x1="0" y1="130" x2="400" y2="130" stroke="#1d2232" stroke-width="1"/>
              <line x1="0" y1="195" x2="400" y2="195" stroke="#1d2232" stroke-width="1"/>
              <circle cx="200" cy="130" r="65" fill="${col}" fill-opacity="0.12"/>
              <circle cx="200" cy="130" r="46" stroke="${col}" stroke-width="1.5" stroke-dasharray="4 4"/>
              <rect x="165" y="100" width="70" height="60" rx="8" fill="#1a1e2d" stroke="${col}" stroke-width="1.2"/>
              <circle cx="178" cy="112" r="3" fill="#EA4335"/>
              <circle cx="188" cy="112" r="3" fill="#FBBC04"/>
              <circle cx="198" cy="112" r="3" fill="#34A853"/>
              <line x1="176" y1="130" x2="220" y2="130" stroke="#4285F4" stroke-width="2" stroke-linecap="round"/>
              <line x1="176" y1="142" x2="210" y2="142" stroke="#bdc1c6" stroke-width="1.5" stroke-linecap="round"/>
            </svg>
          </div>
        </div>
      </div>
    `;
    };

    // Build track inside viewport
    const allCards = GDG_DATA.gallery.map(makeCard).join("");
    viewport.innerHTML = `<div class="gallery-track" id="gallery-track">${allCards}${allCards}</div>`;

    const track = document.getElementById("gallery-track");

    // Pause on hover / touch
    viewport.addEventListener("mouseenter", () => {
        galleryScrollPaused = true;
    });
    viewport.addEventListener("mouseleave", () => {
        galleryScrollPaused = false;
    });
    let touchStartX = 0;
    viewport.addEventListener(
        "touchstart",
        (e) => {
            galleryScrollPaused = true;
            touchStartX = e.touches[0].clientX;
        },
        { passive: true },
    );
    viewport.addEventListener(
        "touchend",
        (e) => {
            const diff = touchStartX - e.changedTouches[0].clientX;
            if (Math.abs(diff) > 30) galleryScrollPos += diff;
            setTimeout(() => {
                galleryScrollPaused = false;
            }, 50);
        },
        { passive: true },
    );

    // Reset
    galleryScrollPos = 0;
    track.style.transform = "translateX(0)";
    if (galleryRafId) {
        cancelAnimationFrame(galleryRafId);
        galleryRafId = null;
    }

    requestAnimationFrame(() =>
        requestAnimationFrame(() => {
            _startGalleryRaf(track, GDG_DATA.gallery.length);
        }),
    );
}

function _startGalleryRaf(track, originalCount) {
    if (galleryRafId) cancelAnimationFrame(galleryRafId);
    let last = null;
    function step(ts) {
        if (!last) last = ts;
        const dt = ts - last;
        last = ts;
        if (!galleryScrollPaused) {
            const cards = track.querySelectorAll(".gallery-card");
            if (cards.length) {
                const gap = 24;
                const unitW = cards[0].offsetWidth + gap;
                const halfW = originalCount * unitW;
                galleryScrollPos += 0.03 * dt;
                if (galleryScrollPos >= halfW) galleryScrollPos -= halfW;
                track.style.transform = `translateX(-${galleryScrollPos}px)`;
            }
        }
        galleryRafId = requestAnimationFrame(step);
    }
    galleryRafId = requestAnimationFrame(step);
}

/* -------------------------------------------------------------------------
 * Member Testimonials (Citra Nuraiyani, etc.)
 * ------------------------------------------------------------------------- */
function renderTestimonials() {
    const container = document.getElementById("testimonials-grid");
    if (!container || !GDG_DATA.testimonials) return;

    const colorMap = {
        blue: "linear-gradient(135deg, #4285F4, #1a73e8)",
        green: "linear-gradient(135deg, #34A853, #1e8e3e)",
        yellow: "linear-gradient(135deg, #FBBC04, #e37400)",
    };

    container.innerHTML = GDG_DATA.testimonials
        .map((item) => {
            const initials = item.name
                .split(" ")
                .map((n) => n[0])
                .slice(0, 2)
                .join("");
            return `
      <div class="testimonial-card">
        <div class="quote-mark">“</div>
        <p class="testimonial-quote">${item.quote}</p>
        <div class="testimonial-author">
          <div class="author-avatar" style="background: ${colorMap[item.color] || colorMap.blue}">
            ${initials}
          </div>
          <div class="author-info">
            <h4>${item.name}</h4>
            <p>${item.role}</p>
          </div>
        </div>
      </div>
    `;
        })
        .join("");
}

/* -------------------------------------------------------------------------
 * FAQ Accordion
 * ------------------------------------------------------------------------- */
function initFAQAccordion() {
    const container = document.getElementById("faq-container");
    if (!container || !GDG_DATA.faqs) return;

    container.innerHTML = GDG_DATA.faqs
        .map(
            (faq, idx) => `
    <div class="faq-item ${idx === 0 ? "active" : ""}">
      <button class="faq-question-btn" aria-expanded="${idx === 0 ? "true" : "false"}">
        <span>${faq.q}</span>
        <svg class="faq-icon-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <polyline points="6 9 12 15 18 9"></polyline>
        </svg>
      </button>
      <div class="faq-answer-pane">
        <p>${faq.a}</p>
      </div>
    </div>
  `,
        )
        .join("");

    container.querySelectorAll(".faq-question-btn").forEach((btn) => {
        btn.addEventListener("click", () => {
            const parent = btn.closest(".faq-item");
            const wasActive = parent.classList.contains("active");

            container.querySelectorAll(".faq-item").forEach((item) => {
                item.classList.remove("active");
                item.querySelector(".faq-question-btn").setAttribute(
                    "aria-expanded",
                    "false",
                );
            });

            if (!wasActive) {
                parent.classList.add("active");
                btn.setAttribute("aria-expanded", "true");
            }
        });
    });
}
