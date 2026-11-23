/**
 * ========================================================================
 * GDGoC UNM - Shared Components Loader (Navbar & Footer)
 * Canonical Header, Mobile Drawer, and Footer derived from index.html
 * ========================================================================
 */
(function () {
    'use strict';

    // Canonical Navbar HTML Template (matching index.html)
    const NAVBAR_TEMPLATE = `
<header class="site-header" id="main-header">
    <div class="container">
        <nav class="nav-inner" aria-label="Main Navigation">
            <!-- Logo Branding -->
            <a href="index.html#hero" class="nav-brand">
                <div class="nav-logo-icon">
                    <img
                        src="assets/logo/GDGoC-Logo.png"
                        alt="GDGoC Logo"
                        width="32"
                        height="22"
                    />
                </div>
                <div class="nav-brand-text">
                    <span class="nav-brand-title">
                        GDGoC <span class="campus-tag">UNM</span>
                    </span>
                    <span class="nav-brand-sub"
                        >Universitas Negeri Makassar</span
                    >
                </div>
            </a>

            <!-- Desktop Navigation Links -->
            <ul class="nav-links">
                <li><a href="index.html#about" class="nav-link" data-nav="about">About</a></li>
                <li><a href="index.html#events" class="nav-link" data-nav="events">Events</a></li>
                <li><a href="learning-path.html" class="nav-link" data-nav="learning-path">Learning Path</a></li>
                <li><a href="index.html#team" class="nav-link" data-nav="team">Team</a></li>
                <li><a href="gallery.html" class="nav-link" data-nav="gallery">Gallery</a></li>
                <li><a href="index.html#faq" class="nav-link" data-nav="faq">FAQ</a></li>
            </ul>

            <!-- Action Buttons -->
            <div class="nav-actions">
                <a
                    href="https://gdg.community.dev/gdg-on-campus-universitas-negeri-makassar-makassar-indonesia/"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="btn-primary"
                    id="btn-nav-join"
                >
                    <span>Register Member</span>
                    <svg
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2.5"
                    >
                        <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                </a>

                <!-- Animated Mobile Hamburger Toggle Button -->
                <button
                    class="mobile-toggle"
                    id="mobile-toggle-btn"
                    aria-label="Toggle navigation menu"
                    aria-expanded="false"
                >
                    <span class="hamburger-line"></span>
                    <span class="hamburger-line"></span>
                    <span class="hamburger-line"></span>
                </button>
            </div>
        </nav>
    </div>
</header>

<!-- Mobile Nav Backdrop Overlay -->
<div
    class="mobile-nav-backdrop"
    id="mobile-nav-backdrop"
    aria-hidden="true"
></div>

<!-- Mobile Drawer Menu -->
<div
    class="mobile-nav-drawer"
    id="mobile-nav-drawer"
    role="dialog"
    aria-modal="true"
    aria-label="Mobile Navigation"
>
    <div class="mobile-nav-menu-list">
        <a href="index.html#about" class="nav-link" data-nav="about">
            <span>About</span>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 18l6-6-6-6" /></svg>
        </a>
        <a href="index.html#events" class="nav-link" data-nav="events">
            <span>Events</span>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 18l6-6-6-6" /></svg>
        </a>
        <a href="learning-path.html" class="nav-link" data-nav="learning-path">
            <span>Learning Path</span>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 18l6-6-6-6" /></svg>
        </a>
        <a href="index.html#team" class="nav-link" data-nav="team">
            <span>Team</span>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 18l6-6-6-6" /></svg>
        </a>
        <a href="gallery.html" class="nav-link" data-nav="gallery">
            <span>Gallery</span>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 18l6-6-6-6" /></svg>
        </a>
        <a href="index.html#faq" class="nav-link" data-nav="faq">
            <span>FAQ</span>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 18l6-6-6-6" /></svg>
        </a>
        <a href="dashboard.html" class="nav-link" data-nav="dashboard">
            <span>Dashboard</span>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 18l6-6-6-6" /></svg>
        </a>
    </div>

    <div class="mobile-drawer-cta-box">
        <a
            href="https://gdg.community.dev/gdg-on-campus-universitas-negeri-makassar-makassar-indonesia/"
            target="_blank"
            rel="noopener noreferrer"
            class="btn-primary"
            style="text-align: center; justify-content: center; padding: 12px 20px;"
        >
            <span>Register Member</span>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
        </a>
    </div>
</div>
`;

    // Canonical Footer HTML Template (matching index.html)
    const FOOTER_TEMPLATE = `
<footer class="site-footer">
    <div class="container">
        <!-- Links Grid -->
        <div class="footer-top">
            <div class="footer-brand">
                <div class="footer-brand-header">
                    <img
                        src="assets/logo/logo-gdgoc-full.png"
                        alt="GDGoC UNM"
                        class="footer-logo-full"
                    />
                </div>
                <p>
                    Google Developer Group On Campus Universitas Negeri
                    Makassar. An independent student community fostering
                    tech innovation, peer learning, and collaborative
                    digital solutions.
                </p>
            </div>

            <div class="footer-nav-wrapper">
                <div class="footer-col">
                    <h4>Navigation</h4>
                    <ul class="footer-links">
                        <li><a href="index.html#about">About</a></li>
                        <li><a href="index.html#events">Events</a></li>
                        <li><a href="learning-path.html">Learning Path</a></li>
                        <li><a href="index.html#team">Core Team</a></li>
                        <li><a href="gallery.html">Activities Gallery</a></li>
                        <li><a href="index.html#faq">FAQ</a></li>
                    </ul>
                </div>

                <div class="footer-col">
                    <h4>Contact</h4>
                    <ul class="footer-links footer-contact-links">
                        <li>
                            <a href="mailto:gdgoc.unm@gmail.com" target="_blank" rel="noopener noreferrer">
                                <svg class="contact-icon email" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                                <span>Email</span>
                            </a>
                        </li>
                        <li>
                            <a href="https://instagram.com/gdgoc.unm" target="_blank" rel="noopener noreferrer">
                                <svg class="contact-icon instagram" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
                                <span>Instagram</span>
                            </a>
                        </li>
                        <li>
                            <a href="https://discord.gg/gdgoc-unm" target="_blank" rel="noopener noreferrer">
                                <svg class="contact-icon discord" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994.021-.041.001-.09-.041-.106a13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.929 1.793 8.18 1.793 12.061 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.894.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.028zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/></svg>
                                <span>Discord</span>
                            </a>
                        </li>
                        <li>
                            <a href="https://tiktok.com/@gdgoc.unm" target="_blank" rel="noopener noreferrer">
                                <svg class="contact-icon tiktok" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1.04-.1z"/></svg>
                                <span>TikTok</span>
                            </a>
                        </li>
                        <li>
                            <a href="https://youtube.com/@gdgoc-unm" target="_blank" rel="noopener noreferrer">
                                <svg class="contact-icon youtube" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.5 12 3.5 12 3.5s-7.505 0-9.377.55a3.016 3.016 0 0 0-2.122 2.136C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.55 9.376.55 9.376.55s7.505 0 9.377-.55a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
                                <span>YouTube</span>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>

        <!-- Copyright Bottom Bar -->
        <div class="footer-bottom">
            <div>
                © 2026 <strong>GDGoC UNM</strong>. All Rights Reserved
            </div>
        </div>
    </div>
</footer>
`;

    // Initialize Components
    async function loadComponent(placeholderId, externalPath, fallbackHtml) {
        const placeholder = document.getElementById(placeholderId);
        if (!placeholder) return null;

        let content = fallbackHtml;
        // Try fetching external file if served over HTTP/HTTPS
        if (window.location.protocol.startsWith('http')) {
            try {
                const response = await fetch(externalPath);
                if (response.ok) {
                    content = await response.text();
                }
            } catch (e) {
                // Silently fallback to embedded template
            }
        }

        placeholder.outerHTML = content;
        return true;
    }

    function initNavbarInteractive() {
        const mobileToggle = document.getElementById('mobile-toggle-btn');
        const mobileNavMenu = document.getElementById('mobile-nav-drawer');
        const mobileBackdrop = document.getElementById('mobile-nav-backdrop');

        const closeMobileMenu = () => {
            if (mobileNavMenu) mobileNavMenu.classList.remove('open');
            if (mobileToggle) {
                mobileToggle.classList.remove('active');
                mobileToggle.setAttribute('aria-expanded', 'false');
            }
            if (mobileBackdrop) mobileBackdrop.classList.remove('open');
            document.body.style.overflow = '';
        };

        const openMobileMenu = () => {
            if (mobileNavMenu) mobileNavMenu.classList.add('open');
            if (mobileToggle) {
                mobileToggle.classList.add('active');
                mobileToggle.setAttribute('aria-expanded', 'true');
            }
            if (mobileBackdrop) mobileBackdrop.classList.add('open');
            document.body.style.overflow = 'hidden';
        };

        if (mobileToggle) {
            mobileToggle.onclick = function (e) {
                e.stopPropagation();
                const isOpen = mobileNavMenu && mobileNavMenu.classList.contains('open');
                if (isOpen) {
                    closeMobileMenu();
                } else {
                    openMobileMenu();
                }
            };
        }

        if (mobileBackdrop) {
            mobileBackdrop.onclick = closeMobileMenu;
        }

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') closeMobileMenu();
        });

        document.querySelectorAll('.mobile-nav-drawer a').forEach((link) => {
            link.addEventListener('click', closeMobileMenu);
        });

        // Determine active link based on current page
        const path = window.location.pathname.toLowerCase();
        let activeNav = '';
        if (path.endsWith('gallery.html')) {
            activeNav = 'gallery';
        } else if (path.endsWith('learning-path.html')) {
            activeNav = 'learning-path';
        } else if (path.endsWith('team.html')) {
            activeNav = 'team';
        } else if (path.endsWith('dashboard.html')) {
            activeNav = 'dashboard';
        }

        if (activeNav) {
            document.querySelectorAll(`.nav-link[data-nav="${activeNav}"]`).forEach((el) => {
                el.classList.add('active');
            });
        }

        // Smooth scroll for in-page anchors on index.html
        const isIndex = path.endsWith('index.html') || path === '/' || path.endsWith('/') || document.getElementById('about');
        if (isIndex) {
            document.querySelectorAll('a[href*="index.html#"]').forEach((a) => {
                a.addEventListener('click', (e) => {
                    const hash = a.getAttribute('href').split('#')[1];
                    if (hash) {
                        const target = document.getElementById(hash);
                        if (target) {
                            e.preventDefault();
                            target.scrollIntoView({ behavior: 'smooth' });
                            if (window.history && window.history.pushState) {
                                window.history.pushState(null, '', `#${hash}`);
                            }
                        }
                    }
                });
            });

            // Scroll spy for index.html sections
            const sections = document.querySelectorAll('section[id]');
            if (sections.length > 0) {
                window.addEventListener('scroll', () => {
                    let current = '';
                    const scrollPos = window.scrollY + 180;
                    sections.forEach((section) => {
                        const sectionTop = section.offsetTop;
                        const sectionHeight = section.offsetHeight;
                        if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                            current = section.getAttribute('id');
                        }
                    });

                    if (current) {
                        document.querySelectorAll('.nav-link').forEach((link) => {
                            const href = link.getAttribute('href') || '';
                            const navKey = link.getAttribute('data-nav') || '';
                            if (href === `#${current}` || href.endsWith(`#${current}`) || navKey === current) {
                                link.classList.add('active');
                            } else {
                                link.classList.remove('active');
                            }
                        });
                    }
                });
            }
        }
    }

    async function init() {
        await Promise.all([
            loadComponent('navbar-placeholder', 'components/navbar.html', NAVBAR_TEMPLATE),
            loadComponent('footer-placeholder', 'components/footer.html', FOOTER_TEMPLATE)
        ]);

        initNavbarInteractive();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    // Expose helpers globally if needed
    window.GDG_COMPONENTS = {
        NAVBAR_TEMPLATE,
        FOOTER_TEMPLATE,
        initNavbarInteractive
    };
})();
