/**
 * Google Developer Groups On Campus - Universitas Negeri Makassar
 * Interactive Logic (English Edition matching gdgoc-unm.vercel.app)
 */

document.addEventListener("DOMContentLoaded", async () => {
    initNavbar();

    // Hydrate dynamically from Supabase if configured, with instant fallback to GDG_DATA
    if (window.GDG_SUPABASE && window.GDG_SUPABASE.isConfigured()) {
        try {
            const [dynamicTracks, dynamicTeam] = await Promise.all([
                window.GDG_SUPABASE.getLearningPaths(),
                window.GDG_SUPABASE.getCoreTeam()
            ]);
            if (dynamicTracks && dynamicTracks.length > 0) GDG_DATA.tracks = dynamicTracks;
            if (dynamicTeam && dynamicTeam.length > 0) GDG_DATA.team = dynamicTeam;
        } catch (err) {
            console.warn('[Landing Page] Dynamic data fallback to local configuration:', err);
        }
    }

    renderActivities();
    initTracksSection();
    renderEvents();
    renderTeam();
    renderGallery();
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
                const imgSrc =
                    track.image || `assets/images/tracks/${track.id}.png`;
                return `
      <a href="learning-path.html?track=${track.id}" class="track-card">
        <div class="track-icon-container color-${track.color}">
          <img src="${imgSrc}" alt="${track.title} icon"
               class="track-icon-img" loading="lazy"
               onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';"/>
          <div class="track-icon-fallback" style="display:none;width:100%;height:100%;align-items:center;justify-content:center;">
            ${fallbackSvg}
          </div>
        </div>
        <h3>${track.title}</h3>
        <p>${track.desc}</p>
      </a>`;
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
 * Track Detail Navigation (No Modal, redirects to learning-path.html)
 * ------------------------------------------------------------------------- */
function initTrackModal() {
    // Modal removed: Navigation handled directly via links to learning-path.html
}

window.openTrackModal = function (trackId) {
    if (trackId) {
        window.location.href = `learning-path.html?track=${encodeURIComponent(trackId)}`;
    }
};

/* -------------------------------------------------------------------------
 * GDGoC UNM Events & Workshops (Posters, Schedule, Speakers & Moderators)
 * ------------------------------------------------------------------------- */
async function renderEvents() {
    const container = document.getElementById("events-container");
    if (!container) return;

    let eventsList = [];
    if (window.GDG_SUPABASE && typeof window.GDG_SUPABASE.getEvents === 'function') {
        try {
            eventsList = await window.GDG_SUPABASE.getEvents();
        } catch (e) {}
    }
    if (!eventsList || eventsList.length === 0) {
        eventsList = (window.GDG_DATA && window.GDG_DATA.events) || [];
    }

    if (eventsList.length === 0) {
        container.innerHTML = `
            <div style="text-align: center; padding: 48px 20px; background: rgba(255,255,255,0.02); border: 1px dashed rgba(255,255,255,0.1); border-radius: 12px; color: var(--text-muted);">
                Stay tuned! Upcoming GDGoC UNM events will be posted here soon.
            </div>
        `;
        return;
    }

    container.innerHTML = eventsList.map(ev => {
        let currentStatus = ev.status || 'Upcoming';
        if (window.GDG_SUPABASE && typeof window.GDG_SUPABASE.getEventAutoStatus === 'function') {
            currentStatus = window.GDG_SUPABASE.getEventAutoStatus(ev);
        } else if (ev.raw_date || ev.rawDate) {
            const rawD = ev.raw_date || ev.rawDate;
            const rawT = ev.raw_time || ev.rawTime || '23:59:59';
            const dt = new Date(`${rawD}T${rawT.length === 5 ? rawT + ':00' : rawT}`);
            if (!isNaN(dt.getTime())) {
                currentStatus = dt >= new Date() ? 'Upcoming' : 'Completed';
            }
        }
        const isUpcoming = currentStatus.toLowerCase() === 'upcoming';
        const posterSrc = ev.poster || 'assets/images/events/weekly-class-2.jpg';
        const speakers = (ev.speakers && Array.isArray(ev.speakers) && ev.speakers.length > 0)
            ? ev.speakers
            : (ev.speaker ? [{ name: ev.speaker, role: ev.speakerRole || 'Speaker' }] : []);

        return `
            <article class="event-showcase-card">
                <div class="event-poster-wrapper">
                    <img src="${posterSrc}" alt="${ev.title}" class="event-poster-img" onerror="this.src='assets/images/events/weekly-class-2.jpg'" />
                    <a href="${posterSrc}" target="_blank" rel="noopener" class="event-poster-zoom-btn">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                            <polyline points="15 3 21 3 21 9"></polyline>
                            <polyline points="9 21 3 21 3 15"></polyline>
                            <line x1="21" y1="3" x2="14" y2="10"></line>
                            <line x1="3" y1="21" x2="10" y2="14"></line>
                        </svg>
                        <span>View Poster</span>
                    </a>
                </div>
                <div class="event-details-wrapper">
                    <div>
                        <div class="event-header-row">
                            <span class="event-category-pill">${ev.category || 'Weekly Class'}</span>
                            <span class="event-status-pill ${isUpcoming ? 'upcoming' : 'completed'}">${currentStatus}</span>
                        </div>
                        <h3 class="event-title" style="margin-top: 14px;">${ev.title}</h3>
                    </div>

                    <!-- Date, Time, Venue -->
                    <div class="event-meta-grid">
                        <div class="event-meta-item">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                                <line x1="16" y1="2" x2="16" y2="6"></line>
                                <line x1="8" y1="2" x2="8" y2="6"></line>
                                <line x1="3" y1="10" x2="21" y2="10"></line>
                            </svg>
                            <span>${ev.date}</span>
                        </div>
                        <div class="event-meta-item">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <circle cx="12" cy="12" r="10"></circle>
                                <polyline points="12 6 12 12 16 14"></polyline>
                            </svg>
                            <span>${ev.time}</span>
                        </div>
                        <div class="event-meta-item">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                                <circle cx="12" cy="10" r="3"></circle>
                            </svg>
                            <span>${ev.location}</span>
                        </div>
                    </div>

                    <!-- Speaker & Moderator -->
                    <div class="event-speakers-grid">
                        ${speakers.map((spk, idx) => `
                            <div class="event-person-card">
                                <span class="event-person-badge">${speakers.length > 1 ? `Speaker #${idx + 1}` : 'Speaker'}</span>
                                <div class="event-person-name">${spk.name}</div>
                                ${spk.role ? `<div class="event-person-role">${spk.role}</div>` : ''}
                            </div>
                        `).join('')}
                        ${ev.moderator ? `
                            <div class="event-person-card">
                                <span class="event-person-badge">Moderator</span>
                                <div class="event-person-name">${ev.moderator}</div>
                                ${ev.moderatorRole ? `<div class="event-person-role">${ev.moderatorRole}</div>` : ''}
                            </div>
                        ` : ''}
                    </div>

                    <!-- Actions -->
                    <div class="event-footer-actions">
                        ${ev.registrationUrl && ev.registrationUrl !== '#' ? `
                            <a href="${ev.registrationUrl}" target="_blank" rel="noopener noreferrer" class="btn-primary">
                                <span>Register / Location</span>
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                                    <path d="M5 12h14M12 5l7 7-7 7"/>
                                </svg>
                            </a>
                        ` : ''}
                        <a href="${posterSrc}" target="_blank" rel="noopener" class="btn-secondary">
                            <span>Open Full Poster</span>
                        </a>
                    </div>
                </div>
            </article>
        `;
    }).join('');
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
    <div style="text-align: center; margin-top: 28px;">
      <a href="team.html" class="btn-primary" style="display: inline-flex; align-items: center; gap: 8px; padding: 11px 24px; font-size: 0.88rem;">
        <span>View All 29 Core Team Members</span>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
      </a>
    </div>
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
                const color = isLead ? "white" : member.color || "blue";
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

async function renderGallery() {
    const viewport = document.getElementById("gallery-grid");
    if (!viewport) return;

    let galleryItems = [];
    if (window.GDG_SUPABASE && typeof window.GDG_SUPABASE.getGallery === 'function') {
        try {
            galleryItems = await window.GDG_SUPABASE.getGallery();
        } catch (e) {}
    }
    if (!galleryItems || galleryItems.length === 0) {
        galleryItems = (window.GDG_DATA && window.GDG_DATA.gallery) || [];
    }
    if (galleryItems.length === 0) return;

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
          <span class="gallery-tag-pill" style="border-left: 3px solid ${col};">${item.category || "Activity"}</span>
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
        <div class="gallery-body">
          <h4>${item.title || "GDGoC UNM Activity"}</h4>
          ${item.desc ? `<p>${item.desc}</p>` : ""}
        </div>
      </div>
    `;
    };

    // Build track with duplicate cards for infinite auto-scroll
    let renderList = [...galleryItems];
    while (renderList.length < 6) {
        renderList = renderList.concat(galleryItems);
    }
    const allCards = renderList.map(makeCard).join("");
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
            _startGalleryRaf(track, renderList.length);
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
