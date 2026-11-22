/**
 * Google Developer Groups On Campus - Universitas Negeri Makassar (GDGoC UNM)
 * Master Data Configuration - English Edition matching gdgoc-unm.vercel.app
 */

const GDG_DATA = {
    chapter: {
        name: "Google Developer Groups On Campus",
        university: "Universitas Negeri Makassar",
        shortName: "GDGoC UNM",
        tagline:
            "A community for learners, developers, and innovators at Universitas Negeri Makassar.",
        heroTitle: "A new Journey begins here.",
        heroSub:
            "A community for learners, developers, and innovators at Universitas Negeri Makassar.",
        slogan: "GET READY TO BUILD, LEARN, AND GROW TOGETHER",
        communityUrl:
            "https://gdg.community.dev/gdg-on-campus-universitas-negeri-makassar-makassar-indonesia/",
        shortLink: "https://s.id/gdgoc-unm",
        email: "gdgoc.unm@gmail.com",
        instagram: "https://instagram.com/gdgoc.unm",
        instagramHandle: "@gdgoc.unm",
        discord: "https://discord.gg/gdgoc-unm",
        tiktok: "https://tiktok.com/@gdgoc.unm",
        youtube: "https://youtube.com/@gdgoc-unm",
        linkedin: "https://linkedin.com/company/gdgoc-unm",
        location: "Makassar, South Sulawesi, Indonesia",
    },

    // About Section directly from gdgoc-unm.vercel.app
    about: {
        title: "About GDGoC UNM",
        lead: "Google Developer Group On Campus (GDSC / GDGoC) Universitas Negeri Makassar is a student community focusing on Google technologies.",
        paragraph1:
            "We are open to all students across all levels who want to learn, collaborate, and grow as developers. Through peer-to-peer learning, GDSC UNM members have the opportunity to build practical skills, develop real-world projects, and become part of Google's global developer community.",
        paragraph2:
            "Headquartered across both Parangtambung and Gunungsari campuses, we empower students to bridge the gap between academic theory and real-world tech industry practices.",
        pillars: [
            {
                title: "Learn",
                color: "blue",
                icon: "book",
                desc: "Learn a range of technical topics and gain new skills through hands-on workshops, training sessions, and Weekly Classes.",
            },
            {
                title: "Build",
                color: "green",
                icon: "code",
                desc: "Apply your knowledge to build real-world projects, create digital solutions, and collaborate with other student developers.",
            },
            {
                title: "Grow",
                color: "yellow",
                icon: "trending-up",
                desc: "Showcase your work in the Google Solution Challenge, expand your professional network, and advance your career.",
            },
        ],
    },

    // Activities Section directly from gdgoc-unm.vercel.app
    activitiesIntro:
        "Regular activities bringing together the core team, Google Developer Academy students, and the community to learn, share, and grow together. Here, we explore the latest innovations and tech trends to always stay one step ahead.",
    activities: [
        {
            id: "workshop",
            title: "Hands-on Workshop",
            color: "blue",
            desc: "Hands-on coding and building real-world solutions guided by experienced mentors.",
            tags: ["Live Coding", "Mini Projects", "Mentoring"],
        },
        {
            id: "tech-talks",
            title: "Tech Talks",
            color: "red",
            desc: "Deep tech trends, industry insights, and inspiration from Google Developer Experts.",
            tags: ["Industry Trends", "Career Roadmap", "GDE Speakers"],
        },
        {
            id: "project-showcase",
            title: "Project Showcase",
            color: "yellow",
            desc: "Showcase prototypes and digital creations while preparing for global hackathons.",
            tags: ["Portfolio", "Demo Day", "Solution Challenge"],
        },
        {
            id: "learning-path",
            title: "Learning Path",
            color: "green",
            desc: "Weekly structured classes and peer-to-peer learning across specialized career tracks.",
            tags: ["Curriculum", "Peer-to-Peer", "Study Group"],
        },
    ],

    // Learning Path Section directly from gdgoc-unm.vercel.app
    learningPathIntro:
        "Explore 7 specialized career learning paths. Gain real-world software engineering, design, hardware, and AI skills guided by GDGoC UNM core tech leads.",
    tracks: [
        {
            id: "uiux",
            title: "UI/UX Design",
            category: "Design",
            color: "blue",
            image: "assets/images/tracks/Logo - UIUX.jpg",
            desc: "Master the Design Thinking framework, user research, wireframing, high-fidelity components, and clickable prototypes in Figma.",
            details:
                "Guide students from zero design experience through the Design Thinking framework to create user-centered, clickable website prototypes in Figma.",
            techStack: [
                "Figma",
                "Pen & Paper",
                "Usability Testing",
                "Design Thinking",
                "Wireframing",
            ],
            capstone: "Interactive Clickable Prototype (Login + Landing Page)",
            syllabus: [
                "Introduction to UI/UX, Team Formation & Empathy Mapping",
                "Problem Statement (HMW) & Figma Workspace Onboarding",
                "Low-Fidelity Wireframing & Information Architecture",
                "High-Fidelity UI Design, Typography & Reusable Components",
                "Interactive Prototyping, Usability Testing & Project Showcase",
            ],
        },
        {
            id: "frontend",
            title: "Front-End Web Development",
            category: "Web & Apps",
            color: "green",
            image: "assets/images/tracks/Logo - Frontend Development.jpg",
            desc: "Build interactive web interfaces from scratch using modern standards, HTML5, CSS3, JavaScript DOM, and AI-assisted workflows.",
            details:
                "Equip members with foundational skills to build interactive web interfaces from scratch using modern standards, HTML5, CSS3, JavaScript DOM, and AI-assisted workflows.",
            techStack: [
                "HTML5",
                "CSS3",
                "JavaScript",
                "VS Code",
                "Git / GitHub",
                "Tailwind CSS",
            ],
            capstone: "Daily Money Tracking Web App",
            syllabus: [
                "Introduction to Front-End Web Development & AI-Assisted Workflows",
                "HTML — Structuring Web Pages, Forms & Semantic Accessibility",
                "CSS — Styling, Box Model, Flexbox, CSS Grid & Responsive Design",
                "JavaScript DOM Basics, Events & PRD (Product Requirements Document)",
                "Final Capstone Presentation & Code Review (Money Tracking App)",
            ],
        },
        {
            id: "backend",
            title: "Back-End Web Development",
            category: "Cloud & Data",
            color: "yellow",
            image: "assets/images/tracks/Logo - Backend Development.jpg",
            desc: "Build scalable server-side architectures, RESTful JSON APIs, secure databases with MySQL, and middleware pipelines.",
            details:
                "Empower members to build scalable server-side architecture, RESTful JSON APIs, secure databases with MySQL, and middleware pipelines, culminating in full-stack collaboration.",
            techStack: [
                "PHP Native",
                "MySQL",
                "XAMPP / Laragon",
                "Postman",
                "RESTful API",
            ],
            capstone: "Collaborative Full-Stack Web App (with FE Team)",
            syllabus: [
                "Foundations of Back-End Development, Client-Server & HTTP Protocols",
                "Building REST APIs, MySQL Database Integration & CRUD Endpoints",
                "Middleware Implementation, Request Logging & API Token Security",
                "Advanced Back-End Techniques, Input Validation & MVC Architecture",
                "Collaborative Full-Stack Project Onboarding & Contract Mapping",
            ],
        },
        {
            id: "data-science",
            title: "Data Science",
            category: "Intelligence",
            color: "yellow",
            image: "assets/images/tracks/Logo - Data Science.jpg",
            desc: "Guide through complete data analysis workflows—from descriptive statistics and data cleaning to hypothesis testing and data storytelling.",
            details:
                "Guide members through data analysis workflows—from descriptive statistics and data cleaning to hypothesis testing and data storytelling.",
            techStack: [
                "Google Colab",
                "Python",
                "Pandas",
                "Matplotlib",
                "Seaborn",
                "Jupyter",
            ],
            capstone: "Data-Driven Storytelling Showcase & Presentation",
            syllabus: [
                "Getting to Know Data Science Lifecycle & Google Colab Environment",
                "Fundamentals of Data & Descriptive Statistics (Mean, Median, Variance)",
                "Data Cleaning & Preparation (Missing Values, Outliers & Duplicates)",
                "Data-Driven Decision Making & Inferential Hypothesis Testing",
                "Data Visualization, Storytelling Principles & Capstone Onboarding",
                "Final Capstone Project Showcase & Analytical Presentation",
            ],
        },
        {
            id: "ai-ml",
            title: "AI / ML",
            category: "Intelligence",
            color: "blue",
            image: "assets/images/tracks/Logo - AIML.jpg",
            desc: "Develop practical AI/ML solutions through interactive Colab notebooks, computer vision models, and prompt engineering in Google AI Studio.",
            details:
                "Introduce practical, ethical AI/ML development through interactive notebooks, computer vision models, and prompt engineering in Google AI Studio.",
            techStack: [
                "Google Colab",
                "Teachable Machine",
                "Google AI Studio",
                "Python",
                "Scikit-Learn",
            ],
            capstone: "Practical AI/ML Mini Project & Presentation",
            syllabus: [
                "Getting Started with AI & Google Colab Interactive Notebooks",
                "Predictive AI — Regression vs. Classification & Model Evaluation",
                "Computer Vision with Google Teachable Machine",
                "Conversational AI & Prompt Engineering in Google AI Studio",
                "AI Capstone Mini Project Showcase & Group Presentation",
            ],
        },
        {
            id: "cyber-security",
            title: "Cybersecurity",
            category: "Security",
            color: "red",
            image: "assets/images/tracks/Logo - Cybersecurity.jpg",
            desc: "Train in offensive and defensive security fundamentals through hands-on Capture The Flag (CTF) Jeopardy challenges and technical write-ups.",
            details:
                "Train members in offensive and defensive security fundamentals through hands-on Capture The Flag (CTF) Jeopardy challenges and technical write-ups.",
            techStack: [
                "Linux CLI",
                "Burp Suite",
                "CyberChef",
                "Ghidra",
                "CTFd Scoreboard",
                "Wireshark",
            ],
            capstone: "Mini CTF Jeopardy Competition & Technical Write-Up Report",
            syllabus: [
                "CTF Foundations, Linux CLI Fluency & Data Encoding (CyberChef)",
                "Web Exploitation (DevTools, IDOR, SQL Injection, XSS & Burp Suite)",
                "Cryptography & Digital Forensics (Ciphers, Hashes & Wireshark)",
                "Reverse Engineering (Binary Disassembly & Decompilation with Ghidra)",
                "Mini CTF Jeopardy Team Competition & Challenge Write-Up Report",
            ],
        },
        {
            id: "robotics",
            title: "Robotics",
            category: "Hardware",
            color: "green",
            image: "assets/images/tracks/Logo - Robotics.jpg",
            desc: "Build a working Smart Trash Bin (Tempat Sampah Digital) integrating ESP32, ultrasonic sensors, servos, and Blynk IoT Cloud.",
            details:
                "Build a physical, working Smart Trash Bin (Tempat Sampah Digital) integrating ESP32, ultrasonic sensors, servos, status LEDs/buzzers, and Blynk IoT Cloud.",
            techStack: [
                "ESP32",
                "Arduino IDE",
                "HC-SR04 Sensor",
                "Servo Motor",
                "Blynk IoT Cloud",
            ],
            capstone: "Smart Trash Bin Prototype & Blynk Dashboard Integration",
            syllabus: [
                "Introduction to IoT, Smart Trash Bin Concept & ESP32 Setup",
                "Actuators, Automation Logic & Blynk Cloud Telemetry Integration",
                "PRACTICAL LAB — Physical Assembly, Calibration & Live Demo",
            ],
        }
    ],

    // Google Events & Workshops directly managed via Dashboard & Supabase
    eventsIntro:
        "Join our interactive workshops, weekly study jams, and technical classes hosted by GDGoC UNM leads and industry mentors.",
    events: [
        {
            id: "event-wc-2",
            title: "Weekly Class #2 Problem Statement & Figma Project Setup",
            category: "Weekly Class #2 — UI/UX Design",
            poster: "assets/images/events/weekly-class-2.jpg",
            location: "Offline: Telkom AI Connect Makassar (*Limited for 30 Participants)",
            date: "Saturday, November 14, 2026",
            time: "13.00 WITA - Finish",
            raw_date: "2026-11-14",
            raw_time: "13:00",
            speaker: "Andi Muh. Yusran Haris",
            speakerRole: "Research & Development",
            moderator: "Azzahra Suci Ramadhani",
            moderatorRole: "Relation & Communication",
            registrationUrl: "https://s.id/gdgoc-unm",
            status: "Upcoming",
            color: "blue"
        }
    ],

    // Official Core Team Structure GDGoC UNM 2026/2027 from GDGOC FINAL - Divisi.pdf
    teamIntro:
        "Meet the dedicated 2026/2027 Core Team members of Google Developer Groups On Campus Universitas Negeri Makassar driving collaboration, innovation, and developer community empowerment across 5 divisions.",
    teamDivisions: [
        "All Divisions",
        "Organizer",
        "Research & Development",
        "Relation & Communication",
        "Event Management",
        "Branding & Design",
    ],
    team: [
        // 1. Organizer
        {
            name: "Nur Hidayat",
            role: "Lead",
            division: "Organizer",
            subRole: "Lead Organizer",
            color: "white",
            image: "assets/images/team/lead-nur-hidayat.png",
            socials: {
                linkedin: "#",
                github: "#",
                instagram: "https://instagram.com/gdgoc.unm",
            },
        },
        {
            name: "Annisa Nur Imani",
            role: "Co-Lead",
            division: "Organizer",
            subRole: "Co-Lead Organizer",
            color: "white",
            image: "assets/images/team/colead-annisa-nur-imani.png",
            socials: {
                linkedin: "#",
                github: "#",
                instagram: "https://instagram.com/gdgoc.unm",
            },
        },

        // 2. Research & Development
        {
            name: "Muhammad Ghazi Saputra",
            role: "Front End Web Development",
            division: "Research & Development",
            subRole: "Track Lead",
            color: "green",
            image: "assets/images/team/rd-ghazi.png",
            socials: {
                linkedin: "#",
                github: "#",
                instagram: "https://instagram.com/gdgoc.unm",
            },
        },
        {
            name: "Muh Raihan Nur Taufiq",
            role: "Back End Web Development",
            division: "Research & Development",
            subRole: "Track Lead",
            color: "green",
            image: "assets/images/team/rd-raihan.png",
            socials: {
                linkedin: "#",
                github: "#",
                instagram: "https://instagram.com/gdgoc.unm",
            },
        },
        {
            name: "Shaquille Rashaun Sahl Tamrin",
            role: "Cybersecurity",
            division: "Research & Development",
            subRole: "Track Lead",
            color: "green",
            image: "assets/images/team/rd-shaquille.png",
            socials: {
                linkedin: "#",
                github: "#",
                instagram: "https://instagram.com/gdgoc.unm",
            },
        },
        {
            name: "Raynato Lienardy",
            role: "AI/ML",
            division: "Research & Development",
            subRole: "Track Lead",
            color: "green",
            image: "assets/images/team/rd-raynato.png",
            socials: {
                linkedin: "#",
                github: "#",
                instagram: "https://instagram.com/gdgoc.unm",
            },
        },
        {
            name: "Andi Muh. Yusran Haris",
            role: "UI/UX",
            division: "Research & Development",
            subRole: "Track Lead",
            color: "green",
            image: "assets/images/team/rd-yusran.png",
            socials: {
                linkedin: "#",
                github: "#",
                instagram: "https://instagram.com/gdgoc.unm",
            },
        },
        {
            name: "Namira Sarip",
            role: "Data Science",
            division: "Research & Development",
            subRole: "Track Lead",
            color: "green",
            image: "assets/images/team/rd-namira.png",
            socials: {
                linkedin: "#",
                github: "#",
                instagram: "https://instagram.com/gdgoc.unm",
            },
        },
        {
            name: "Alfira Resky Pratiwi",
            role: "Robotics",
            division: "Research & Development",
            subRole: "Track Lead",
            color: "green",
            image: "assets/images/team/rd-alfira.png",
            socials: {
                linkedin: "#",
                github: "#",
                instagram: "https://instagram.com/gdgoc.unm",
            },
        },

        // 3. Relation & Communication
        {
            name: "Azzahra Suci Ramadhani",
            role: "Public Relation",
            division: "Relation & Communication",
            subRole: "Public Relation",
            color: "yellow",
            image: "assets/images/team/rc-azzahra.png",
            socials: {
                linkedin: "#",
                github: "#",
                instagram: "https://instagram.com/gdgoc.unm",
            },
        },
        {
            name: "Abdul Malik Bin Asrul",
            role: "External Affairs",
            division: "Relation & Communication",
            subRole: "External Affairs",
            color: "yellow",
            image: "assets/images/team/rc-malik.png",
            socials: {
                linkedin: "#",
                github: "#",
                instagram: "https://instagram.com/gdgoc.unm",
            },
        },
        {
            name: "Suci Nuradila Hasbullah",
            role: "External Affairs",
            division: "Relation & Communication",
            subRole: "External Affairs",
            color: "yellow",
            image: "assets/images/team/rc-suci.png",
            socials: {
                linkedin: "#",
                github: "#",
                instagram: "https://instagram.com/gdgoc.unm",
            },
        },
        {
            name: "Tasya",
            role: "Community Development",
            division: "Relation & Communication",
            subRole: "Community Development",
            color: "yellow",
            image: "assets/images/team/rc-tasya.png",
            socials: {
                linkedin: "#",
                github: "#",
                instagram: "https://instagram.com/gdgoc.unm",
            },
        },
        {
            name: "Naurah Hanijah Azzahrah",
            role: "Community Development",
            division: "Relation & Communication",
            subRole: "Community Development",
            color: "yellow",
            image: "assets/images/team/rc-naurah.png",
            socials: {
                linkedin: "#",
                github: "#",
                instagram: "https://instagram.com/gdgoc.unm",
            },
        },
        {
            name: "Annisa Mujadidah Rasul",
            role: "Human Resources",
            division: "Relation & Communication",
            subRole: "Human Resources",
            color: "yellow",
            image: "assets/images/team/rc-annisa.png",
            socials: {
                linkedin: "#",
                github: "#",
                instagram: "https://instagram.com/gdgoc.unm",
            },
        },

        // 4. Event Management
        {
            name: "Siti Fachriza Aulia",
            role: "Secretary",
            division: "Event Management",
            subRole: "Secretary",
            color: "red",
            image: "assets/images/team/em-fachriza.png",
            socials: {
                linkedin: "#",
                github: "#",
                instagram: "https://instagram.com/gdgoc.unm",
            },
        },
        {
            name: "Alif Anugrah Syam",
            role: "Finance",
            division: "Event Management",
            subRole: "Finance",
            color: "red",
            image: "assets/images/team/em-alif.png",
            socials: {
                linkedin: "#",
                github: "#",
                instagram: "https://instagram.com/gdgoc.unm",
            },
        },
        {
            name: "Akhtar Naury",
            role: "Event Planner",
            division: "Event Management",
            subRole: "Event Planner",
            color: "red",
            image: "assets/images/team/em-akhtar.png",
            socials: {
                linkedin: "#",
                github: "#",
                instagram: "https://instagram.com/gdgoc.unm",
            },
        },
        {
            name: "Salsabilah",
            role: "Event Planner",
            division: "Event Management",
            subRole: "Event Planner",
            color: "red",
            image: "assets/images/team/em-salsabilah.png",
            socials: {
                linkedin: "#",
                github: "#",
                instagram: "https://instagram.com/gdgoc.unm",
            },
        },
        {
            name: "Firson Siwan Ta'gan",
            role: "Event Registration",
            division: "Event Management",
            subRole: "Event Registration",
            color: "red",
            image: "assets/images/team/em-firson.png",
            socials: {
                linkedin: "#",
                github: "#",
                instagram: "https://instagram.com/gdgoc.unm",
            },
        },
        {
            name: "Mustamin",
            role: "Event Registration",
            division: "Event Management",
            subRole: "Event Registration",
            color: "red",
            image: "assets/images/team/em-mustamin.png",
            socials: {
                linkedin: "#",
                github: "#",
                instagram: "https://instagram.com/gdgoc.unm",
            },
        },
        {
            name: "Andhini Pratiwi Djuma",
            role: "Event Registration",
            division: "Event Management",
            subRole: "Event Registration",
            color: "red",
            image: "assets/images/team/em-andhini.png",
            socials: {
                linkedin: "#",
                github: "#",
                instagram: "https://instagram.com/gdgoc.unm",
            },
        },

        // 5. Branding & Design
        {
            name: "Muh. Rafli Rafsanjani",
            role: "Graphic Design",
            division: "Branding & Design",
            subRole: "Graphic Design",
            color: "blue",
            image: "assets/images/team/bd-rafli.png",
            socials: {
                linkedin: "#",
                github: "#",
                instagram: "https://instagram.com/gdgoc.unm",
            },
        },
        {
            name: "Zakharia Tangke Timbang",
            role: "Graphic Design",
            division: "Branding & Design",
            subRole: "Graphic Design",
            color: "blue",
            image: "assets/images/team/bd-zakharia.png",
            socials: {
                linkedin: "#",
                github: "#",
                instagram: "https://instagram.com/gdgoc.unm",
            },
        },
        {
            name: "Muhammad Rahyan Noorfauzan",
            role: "Graphic Design",
            division: "Branding & Design",
            subRole: "Graphic Design",
            color: "blue",
            image: "assets/images/team/bd-rahyan.png",
            socials: {
                linkedin: "#",
                github: "#",
                instagram: "https://instagram.com/gdgoc.unm",
            },
        },
        {
            name: "Juhariah Ningrum",
            role: "Copywriting & Social Media",
            division: "Branding & Design",
            subRole: "Copywriting & Social Media",
            color: "blue",
            image: "assets/images/team/bd-juhariah.png",
            socials: {
                linkedin: "#",
                github: "#",
                instagram: "https://instagram.com/gdgoc.unm",
            },
        },
        {
            name: "Syahrur Adhe Pratama Putra",
            role: "Copywriting & Social Media",
            division: "Branding & Design",
            subRole: "Copywriting & Social Media",
            color: "blue",
            image: "assets/images/team/bd-syahrur.png",
            socials: {
                linkedin: "#",
                github: "#",
                instagram: "https://instagram.com/gdgoc.unm",
            },
        },
        {
            name: "Wulan Zahra",
            role: "Content Creator",
            division: "Branding & Design",
            subRole: "Content Creator",
            color: "blue",
            image: "assets/images/team/bd-wulan.png",
            socials: {
                linkedin: "#",
                github: "#",
                instagram: "https://instagram.com/gdgoc.unm",
            },
        },
        {
            name: "Andi Fahril S",
            role: "Videographer",
            division: "Branding & Design",
            subRole: "Videographer",
            color: "blue",
            image: "assets/images/team/bd-fahril.png",
            socials: {
                linkedin: "#",
                github: "#",
                instagram: "https://instagram.com/gdgoc.unm",
            },
        },
    ],

    // Gallery Section directly from gdgoc-unm.vercel.app
    galleryIntro:
        "A glimpse into our journey from team collaboration to inspirational activities. This gallery showcases precious moments of the core team and GDGoC UNM members learning, sharing, and growing together in the spirit of technology and innovation.",
    gallery: [
        {
            title: "Info Session & Grand Onboarding",
            category: "Onboarding",
            image: "assets/images/gallery/gallery-1.jpg",
            desc: "Welcoming hundreds of new members at the Pinisi Tower Theater Room, UNM.",
            color: "blue",
        },
        {
            title: "Hands-on Workshop: Gemini API",
            category: "Workshop",
            image: "assets/images/gallery/gallery-2.jpg",
            desc: "Live coding intelligent assistants with Google AI Studio and Gemini 2.5.",
            color: "yellow",
        },
        {
            title: "Weekly Class: Modern Web Architecture",
            category: "Weekly Class",
            image: "assets/images/gallery/gallery-3.jpg",
            desc: "Intensive component development and responsive styling in JTIK Lab.",
            color: "green",
        },
        {
            title: "Solution Challenge Hackathon Day",
            category: "Hackathon",
            image: "assets/images/gallery/gallery-4.jpg",
            desc: "Brainstorming and prototyping digital solutions addressing the 17 UN SDGs.",
            color: "red",
        },
        {
            title: "Robotics & Telemetry Lab Testing",
            category: "Robotics",
            image: "assets/images/gallery/gallery-5.jpg",
            desc: "Mobile robot navigation and sensor data telemetry using ESP32 & ROS.",
            color: "green",
        },
        {
            title: "Core Team Strategic Sync",
            category: "Community",
            image: "assets/images/gallery/gallery-6.jpg",
            desc: "Annual roadmap alignment and curriculum planning with all division leads.",
            color: "blue",
        },
    ],

    // Member Stories directly from gdgoc-unm.vercel.app
    testimonials: [
        {
            quote: "Being part of GDGoC Universitas Negeri Makassar has been an extraordinary journey full of learning and personal growth. Through every session and collaborative project, I not only gained technical skills, but also the confidence to share ideas and work with people from diverse backgrounds.",
            name: "Citra Nuraiyani",
            role: "GDGoC UNM Member • Student of JTIK UNM",
            color: "blue",
        },
        {
            quote: "The Weekly Class sessions provided clear direction that matched real tech industry practices. The supportive mentors helped me build real-world applications and prepare for Google competitions.",
            name: "Andi Ahmad Fauzan",
            role: "GDGoC UNM Member • Computer Engineering Student",
            color: "green",
        },
        {
            quote: "As someone who initially felt intimidated by programming, GDGoC UNM welcomed me with open arms. The peer-to-peer learning environment gave me the courage to code my very first web project!",
            name: "Salsabila Ramadhani",
            role: "GDGoC UNM Member • Faculty of Mathematics & Natural Sciences",
            color: "yellow",
        },
    ],

    // CTA Section directly from gdgoc-unm.vercel.app
    cta: {
        title: "Come Join GDGoC UNM!",
        desc: "Join GDGoC UNM and grow together with an inspiring tech community. Click 'Join Now' to become part of an endless journey of collaboration and learning, open to all students who want to thrive in the world of technology.",
        buttonLabel: "Join Now",
        buttonUrl:
            "https://gdg.community.dev/gdg-on-campus-universitas-negeri-makassar-makassar-indonesia/",
    },

    // FAQ Section directly from gdgoc-unm.vercel.app
    faqIntro:
        "Frequently asked questions about GDGoC UNM. Find the answers to your curiosity here.",
    faqs: [
        {
            q: "What is Google Developer Groups On Campus (GDGoC) UNM?",
            a: "GDGoC UNM (formerly GDSC UNM) is a university-based student developer community supported by Google Developers. Our goal is to bridge the gap between academic theory and real-world tech industry practices through peer-to-peer learning and practical project building.",
        },
        {
            q: "Can non-IT / non-computer science students join?",
            a: "Yes, absolutely! GDGoC UNM is open to ALL active students of Universitas Negeri Makassar across all departments, faculties, and academic years. We celebrate interdisciplinary collaboration.",
        },
        {
            q: "Is there any membership fee or cost to participate?",
            a: "100% FREE! All activities, workshops, weekly classes, and community access provided by GDGoC UNM are completely free of charge.",
        },
        {
            q: "How does the Weekly Class work?",
            a: "Weekly Classes are held on a regular weekly basis, combining in-person sessions in UNM campus computer labs and interactive virtual sessions. Members choose their preferred learning track and work on guided mini-projects with Tech Leads.",
        },
        {
            q: "What benefits do I get as a member?",
            a: "Members receive access to official Google curricula, networking with local and global developers, opportunities to join the Google Solution Challenge and JuaraGCP, project portfolio development, and certificates of completion.",
        },
        {
            q: "How do I officially register as a member?",
            a: "Simply click the 'Join Now' button on this website to be redirected to the official Google Community Dev chapter page for Universitas Negeri Makassar. Click 'Join Us' and sign in with your Google account!",
        },
    ],
};

// Global Browser Export
if (typeof window !== "undefined") {
    window.GDG_DATA = GDG_DATA;
    if (GDG_DATA.tracks) {
        window.LEARNING_PATHS = GDG_DATA.tracks;
    }
}
