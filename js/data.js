/**
 * Google Developer Groups On Campus - Universitas Negeri Makassar (GDGoC UNM)
 * Master Data Configuration - English Edition matching gdgoc-unm.vercel.app
 */

const GDG_DATA = {
  chapter: {
    name: "Google Developer Groups On Campus",
    university: "Universitas Negeri Makassar",
    shortName: "GDGoC UNM",
    tagline: "A community for learners, developers, and innovators at Universitas Negeri Makassar.",
    heroTitle: "A new Journey begins here.",
    heroSub: "A community for learners, developers, and innovators at Universitas Negeri Makassar.",
    slogan: "GET READY TO BUILD, LEARN, AND GROW TOGETHER",
    communityUrl: "https://gdg.community.dev/gdg-on-campus-universitas-negeri-makassar-makassar-indonesia/",
    shortLink: "https://s.id/gdgoc-unm",
    instagram: "https://instagram.com/gdgoc.unm",
    instagramHandle: "@gdgoc.unm",
    linkedin: "https://linkedin.com/company/gdgoc-unm",
    youtube: "https://youtube.com/@gdgoc-unm",
    location: "Makassar, South Sulawesi, Indonesia",
    campus: "Parangtambung & Gunungsari Campus, Universitas Negeri Makassar"
  },


  // About Section directly from gdgoc-unm.vercel.app
  about: {
    title: "About GDGoC UNM",
    lead: "Google Developer Group On Campus (GDSC / GDGoC) Universitas Negeri Makassar is a student community focusing on Google technologies.",
    paragraph1: "We are open to all students across all levels who want to learn, collaborate, and grow as developers. Through peer-to-peer learning, GDSC UNM members have the opportunity to build practical skills, develop real-world projects, and become part of Google's global developer community.",
    paragraph2: "Headquartered across both Parangtambung and Gunungsari campuses, we empower students to bridge the gap between academic theory and real-world tech industry practices.",
    pillars: [
      {
        title: "Learn",
        color: "blue",
        icon: "book",
        desc: "Learn a range of technical topics and gain new skills through hands-on workshops, training sessions, and Weekly Classes."
      },
      {
        title: "Build",
        color: "green",
        icon: "code",
        desc: "Apply your knowledge to build real-world projects, create digital solutions, and collaborate with other student developers."
      },
      {
        title: "Grow",
        color: "yellow",
        icon: "trending-up",
        desc: "Showcase your work in the Google Solution Challenge, expand your professional network, and advance your career."
      }
    ]
  },

  // Activities Section directly from gdgoc-unm.vercel.app
  activitiesIntro: "Regular activities bringing together the core team, Google Developer Academy students, and the community to learn, share, and grow together. Here, we explore the latest innovations and tech trends to always stay one step ahead.",
  activities: [
    {
      id: "workshop",
      title: "Hands-on Workshop",
      color: "blue",
      desc: "Learn directly and build real technological solutions with guidance from experienced mentors and engineers.",
      tags: ["Live Coding", "Mini Projects", "Mentoring"]
    },
    {
      id: "tech-talks",
      title: "Tech Talks",
      color: "red",
      desc: "Gain deep industry insights and inspiration from technology experts and Google Developer Experts (GDE).",
      tags: ["Industry Trends", "Career Roadmap", "GDE Speakers"]
    },
    {
      id: "project-showcase",
      title: "Project Showcase",
      color: "yellow",
      desc: "Display your projects, prototypes, and digital creations to the public and prepare for global hackathons.",
      tags: ["Portfolio", "Demo Day", "Solution Challenge"]
    },
    {
      id: "learning-path",
      title: "Learning Path",
      color: "green",
      desc: "Learn and grow together every single week with structured curricula across 8 specialized learning tracks.",
      tags: ["Curriculum", "Peer-to-Peer", "Study Group"]
    }
  ],

  // Learning Path Section directly from gdgoc-unm.vercel.app
  learningPathIntro: "Explore 7 specialized career learning paths. Gain real-world software engineering, design, hardware, and AI skills guided by GDGoC UNM core tech leads.",
  tracks: [
    {
      id: "uiux",
      title: "UI/UX Design",
      category: "Design",
      color: "blue",
      desc: "Create intuitive and user-friendly digital experiences.",
      details: "From user research, persona creation, wireframing, and interactive prototyping in Figma to building consistent Design Systems with Google Material Design 3.",
      techStack: ["Figma", "Design System", "Material 3", "Wireframing", "User Research"],
      syllabus: [
        "Design Thinking Methodology & User Empathy Mapping",
        "Wireframing & Information Architecture",
        "Advanced Figma Auto-Layout & Design Systems",
        "Interactive Prototyping & Developer Handoff"
      ]
    },
    {
      id: "frontend",
      title: "Front-End",
      category: "Web & Apps",
      color: "green",
      desc: "Bring ideas to life with interactive code.",
      details: "Master modern web development from semantic HTML5 and modern CSS layouts to asynchronous JavaScript, React components, and lightning-fast Vite tooling.",
      techStack: ["React", "JavaScript ES6+", "HTML5 / CSS3", "Vite", "TailwindCSS", "Next.js"],
      syllabus: [
        "Modern CSS Architectures & Responsive Layouts",
        "JavaScript DOM Manipulation & Asynchronous APIs",
        "React Component Lifecycle & Custom Hooks",
        "Production Deployment & Performance Optimization"
      ]
    },
    {
      id: "backend",
      title: "Back-End",
      category: "Cloud & Data",
      color: "yellow",
      desc: "Manage databases, servers, and APIs for seamless systems.",
      details: "Learn server architectures, relational and NoSQL database modeling, JWT authentication, containerization with Docker, and cloud deployment on Google Cloud Run.",
      techStack: ["Node.js", "Express", "PostgreSQL", "Google Cloud", "REST API", "Docker"],
      syllabus: [
        "RESTful API Design & Clean Architecture",
        "Relational Database Modeling with PostgreSQL",
        "Authentication, JWT & API Security Best Practices",
        "Containerization with Docker & Cloud Run Deployment"
      ]
    },

    {
      id: "robotics",
      title: "Robotics",
      category: "Hardware",
      color: "green",
      desc: "Design robots that solve real-world problems.",
      details: "UNM's signature engineering track combining hardware microcontrollers (ESP32/Arduino), smart sensors, telemetry, and Robot Operating System (ROS).",
      techStack: ["ESP32 / Arduino", "C++", "ROS", "Sensors & Actuators", "MQTT IoT"],
      syllabus: [
        "Embedded Electronics & Microcontroller Fundamentals",
        "Sensor Interfacing, IMU & Actuator Telemetry",
        "IoT Wireless Communication via MQTT & WebSockets",
        "Autonomous Mobile Robot Navigation Basics"
      ]
    },
    {
      id: "ai-ml",
      title: "AI / Machine Learning",
      category: "Intelligence",
      color: "blue",
      desc: "Learn how intelligent technologies work and adapt.",
      details: "From Python fundamentals and neural networks to cutting-edge Generative AI using Google AI Studio, Gemini 2.5 API, and Gemma open models.",
      techStack: ["Gemini 2.5 API", "Google AI Studio", "Python", "TensorFlow", "PyTorch", "Gemma"],
      syllabus: [
        "Modern AI Fundamentals & Generative AI Landscape",
        "Prompt Engineering Mastery in Google AI Studio",
        "Building Intelligent Assistants with Gemini API",
        "RAG (Retrieval-Augmented Generation) & Model Evaluation"
      ]
    },
    {
      id: "data-science",
      title: "Data Science",
      category: "Intelligence",
      color: "yellow",
      desc: "Turn data into insights for smart decision-making.",
      details: "Learn data wrangling with Pandas and NumPy, applied statistics, exploratory data analysis, and advanced analytics on Google BigQuery.",
      techStack: ["Python", "Pandas", "NumPy", "Matplotlib", "BigQuery", "Jupyter"],
      syllabus: [
        "Data Cleaning & Feature Engineering with Pandas",
        "Exploratory Data Analysis (EDA) & Data Storytelling",
        "Applied Statistical Modeling & Hypothesis Testing",
        "Cloud Data Analytics with Google BigQuery"
      ]
    },
    {
      id: "cyber-security",
      title: "Cyber Security",
      category: "Security",
      color: "red",
      desc: "Protect systems and build a secure digital world.",
      details: "Explore network security fundamentals, the OWASP Top 10 vulnerabilities, ethical web penetration testing, and practical CTF (Capture The Flag) problem-solving.",
      techStack: ["Linux", "Wireshark", "Burp Suite", "OWASP Top 10", "Cryptography"],
      syllabus: [
        "Linux CLI Essentials & Network Protocols",
        "Web Application Vulnerabilities & OWASP Testing",
        "Applied Cryptography & Access Control",
        "Hands-on Capture The Flag (CTF) Challenges"
      ]
    }
  ],

  // Google Events directly from gdgoc-unm.vercel.app
  googleEventsIntro: "Discover various events and competitions from Google that you can join to hone your skills, gain experience, and continue growing in the tech world.",
  events: [
    {
      id: "juaragcp",
      title: "JuaraGCP",
      color: "blue",
      desc: "JuaraGCP is a cloud computing learning program for Indonesian developers through Qwiklabs / Google Cloud Skills Boost. Take the training, master cloud technology, and get ready to earn GCP certifications to advance your career in the digital world.",
      link: "https://cloud.google.com/innovators/juaragcp",
      linkLabel: "Learn More",
      highlights: ["Free Google Cloud Labs", "Official Digital Badges", "Exclusive Google Swag", "Certification Readiness"]
    },
    {
      id: "solution-challenge",
      title: "Google Solution Challenge",
      color: "green",
      desc: "Annual worldwide competition inviting university students to build solutions for one or more of the 17 United Nations Sustainable Development Goals using Google technologies.",
      link: "https://developers.google.com/community/gdsc-solution-challenge",
      linkLabel: "Explore Challenge",
      highlights: ["Mentorship from Google Engineers", "$10,000+ Prize Pool", "Global Showcase", "Impactful Solutions"]
    },
    {
      id: "build-with-ai",
      title: "Build with AI & Gemini",
      color: "yellow",
      desc: "Hands-on workshops focused on integrating modern Generative AI capabilities—including Gemini 2.5, Gemma open models, and Google AI Studio—into student applications.",
      link: "https://developers.google.com/events",
      linkLabel: "Join Sessions",
      highlights: ["Prompt Engineering", "Gemini API Access", "GenAI Project Demos", "Q&A with Experts"]
    },
    {
      id: "devfest",
      title: "DevFest Makassar",
      color: "red",
      desc: "The largest annual developer conference in Eastern Indonesia hosted by Google Developer Groups, featuring keynote speakers, community showcases, and developer networking.",
      link: "https://gdg.community.dev/events/",
      linkLabel: "View DevFest",
      highlights: ["Keynote Presentations", "Developer Stages", "Tech Exhibition", "Networking Hub"]
    }
  ],

  // Official Core Team Structure GDGoC UNM 2026/2027 from GDGOC FINAL - Divisi.pdf
  teamIntro: "Meet the dedicated 2026/2027 Core Team members of Google Developer Groups On Campus Universitas Negeri Makassar driving collaboration, innovation, and developer community empowerment across 5 divisions.",
  teamDivisions: [
    "All Divisions",
    "Organizer",
    "Research & Development (R&D)",
    "Relation & Communication",
    "Event Management",
    "Branding & Design"
  ],
  team: [
    // 1. Organizer
    {
      name: "Nur Hidayat",
      role: "Lead",
      division: "Organizer",
      subRole: "Lead Organizer",
      color: "blue",
      image: "assets/images/team/lead-nur-hidayat.jpg",
      socials: { linkedin: "#", github: "#", instagram: "https://instagram.com/gdgoc.unm" }
    },
    {
      name: "Annisa Nur Imani",
      role: "Co-Lead",
      division: "Organizer",
      subRole: "Co-Lead Organizer",
      color: "blue",
      image: "assets/images/team/colead-annisa-nur-imani.jpg",
      socials: { linkedin: "#", github: "#", instagram: "https://instagram.com/gdgoc.unm" }
    },

    // 2. Research & Development (R&D)
    {
      name: "Muhammad Ghazi Saputra",
      role: "Front End Web Development",
      division: "Research & Development (R&D)",
      subRole: "Track Lead",
      color: "green",
      image: "assets/images/team/rd-ghazi.jpg",
      socials: { linkedin: "#", github: "#", instagram: "https://instagram.com/gdgoc.unm" }
    },
    {
      name: "Muh Raihan Nur Taufiq",
      role: "Back End Web Development",
      division: "Research & Development (R&D)",
      subRole: "Track Lead",
      color: "green",
      image: "assets/images/team/rd-raihan.jpg",
      socials: { linkedin: "#", github: "#", instagram: "https://instagram.com/gdgoc.unm" }
    },
    {
      name: "Shaquille Rashaun Sahl Tamrin",
      role: "Cybersecurity",
      division: "Research & Development (R&D)",
      subRole: "Track Lead",
      color: "green",
      image: "assets/images/team/rd-shaquille.jpg",
      socials: { linkedin: "#", github: "#", instagram: "https://instagram.com/gdgoc.unm" }
    },
    {
      name: "Raynato Lienardy",
      role: "AI/ML",
      division: "Research & Development (R&D)",
      subRole: "Track Lead",
      color: "green",
      image: "assets/images/team/rd-raynato.jpg",
      socials: { linkedin: "#", github: "#", instagram: "https://instagram.com/gdgoc.unm" }
    },
    {
      name: "Andi Muh. Yusran Haris",
      role: "UI/UX",
      division: "Research & Development (R&D)",
      subRole: "Track Lead",
      color: "green",
      image: "assets/images/team/rd-yusran.jpg",
      socials: { linkedin: "#", github: "#", instagram: "https://instagram.com/gdgoc.unm" }
    },
    {
      name: "Namira Sarip",
      role: "Data Science",
      division: "Research & Development (R&D)",
      subRole: "Track Lead",
      color: "green",
      image: "assets/images/team/rd-namira.jpg",
      socials: { linkedin: "#", github: "#", instagram: "https://instagram.com/gdgoc.unm" }
    },
    {
      name: "Alfira Resky Pratiwi",
      role: "Robotic",
      division: "Research & Development (R&D)",
      subRole: "Track Lead",
      color: "green",
      image: "assets/images/team/rd-alfira.jpg",
      socials: { linkedin: "#", github: "#", instagram: "https://instagram.com/gdgoc.unm" }
    },

    // 3. Relation & Communication
    {
      name: "Azzahra Suci Ramadhani",
      role: "Public Relation",
      division: "Relation & Communication",
      subRole: "Public Relation",
      color: "yellow",
      image: "assets/images/team/rc-azzahra.jpg",
      socials: { linkedin: "#", github: "#", instagram: "https://instagram.com/gdgoc.unm" }
    },
    {
      name: "Abdul Malik Bin Asrul",
      role: "External Affairs",
      division: "Relation & Communication",
      subRole: "External Affairs",
      color: "yellow",
      image: "assets/images/team/rc-malik.jpg",
      socials: { linkedin: "#", github: "#", instagram: "https://instagram.com/gdgoc.unm" }
    },
    {
      name: "Suci Nuradila Hasbullah",
      role: "External Affairs",
      division: "Relation & Communication",
      subRole: "External Affairs",
      color: "yellow",
      image: "assets/images/team/rc-suci.jpg",
      socials: { linkedin: "#", github: "#", instagram: "https://instagram.com/gdgoc.unm" }
    },
    {
      name: "Tasya",
      role: "Community Development",
      division: "Relation & Communication",
      subRole: "Community Development",
      color: "yellow",
      image: "assets/images/team/rc-tasya.jpg",
      socials: { linkedin: "#", github: "#", instagram: "https://instagram.com/gdgoc.unm" }
    },
    {
      name: "Naurah Hanijah Azzahrah",
      role: "Community Development",
      division: "Relation & Communication",
      subRole: "Community Development",
      color: "yellow",
      image: "assets/images/team/rc-naurah.jpg",
      socials: { linkedin: "#", github: "#", instagram: "https://instagram.com/gdgoc.unm" }
    },
    {
      name: "Annisa Mujadidah Rasul",
      role: "Human Resources",
      division: "Relation & Communication",
      subRole: "Human Resources",
      color: "yellow",
      image: "assets/images/team/rc-annisa.jpg",
      socials: { linkedin: "#", github: "#", instagram: "https://instagram.com/gdgoc.unm" }
    },

    // 4. Event Management
    {
      name: "Siti Fachriza Aulia",
      role: "Secretary",
      division: "Event Management",
      subRole: "Secretary",
      color: "red",
      image: "assets/images/team/em-fachriza.jpg",
      socials: { linkedin: "#", github: "#", instagram: "https://instagram.com/gdgoc.unm" }
    },
    {
      name: "Alif Anugrah Syam",
      role: "Finance",
      division: "Event Management",
      subRole: "Finance",
      color: "red",
      image: "assets/images/team/em-alif.jpg",
      socials: { linkedin: "#", github: "#", instagram: "https://instagram.com/gdgoc.unm" }
    },
    {
      name: "Akhtar Naury",
      role: "Event Planner",
      division: "Event Management",
      subRole: "Event Planner",
      color: "red",
      image: "assets/images/team/em-akhtar.jpg",
      socials: { linkedin: "#", github: "#", instagram: "https://instagram.com/gdgoc.unm" }
    },
    {
      name: "Salsabilah",
      role: "Event Planner",
      division: "Event Management",
      subRole: "Event Planner",
      color: "red",
      image: "assets/images/team/em-salsabilah.jpg",
      socials: { linkedin: "#", github: "#", instagram: "https://instagram.com/gdgoc.unm" }
    },
    {
      name: "Firson Siwan Ta'gan",
      role: "Event Registration",
      division: "Event Management",
      subRole: "Event Registration",
      color: "red",
      image: "assets/images/team/em-firson.jpg",
      socials: { linkedin: "#", github: "#", instagram: "https://instagram.com/gdgoc.unm" }
    },
    {
      name: "Mustamin",
      role: "Event Registration",
      division: "Event Management",
      subRole: "Event Registration",
      color: "red",
      image: "assets/images/team/em-mustamin.jpg",
      socials: { linkedin: "#", github: "#", instagram: "https://instagram.com/gdgoc.unm" }
    },
    {
      name: "Andhini Pratiwi Djuma",
      role: "Event Registration",
      division: "Event Management",
      subRole: "Event Registration",
      color: "red",
      image: "assets/images/team/em-andhini.jpg",
      socials: { linkedin: "#", github: "#", instagram: "https://instagram.com/gdgoc.unm" }
    },

    // 5. Branding & Design
    {
      name: "Muh. Rafli Rafsanjani",
      role: "Graphic Design",
      division: "Branding & Design",
      subRole: "Graphic Design",
      color: "blue",
      image: "assets/images/team/bd-rafli.jpg",
      socials: { linkedin: "#", github: "#", instagram: "https://instagram.com/gdgoc.unm" }
    },
    {
      name: "Zakharia Tangke Timbang",
      role: "Graphic Design",
      division: "Branding & Design",
      subRole: "Graphic Design",
      color: "blue",
      image: "assets/images/team/bd-zakharia.jpg",
      socials: { linkedin: "#", github: "#", instagram: "https://instagram.com/gdgoc.unm" }
    },
    {
      name: "Muhammad Rahyan Noorfauzan",
      role: "Graphic Design",
      division: "Branding & Design",
      subRole: "Graphic Design",
      color: "blue",
      image: "assets/images/team/bd-rahyan.jpg",
      socials: { linkedin: "#", github: "#", instagram: "https://instagram.com/gdgoc.unm" }
    },
    {
      name: "Juhariah Ningrum",
      role: "Copywriting & Social Media",
      division: "Branding & Design",
      subRole: "Copywriting & Social Media",
      color: "blue",
      image: "assets/images/team/bd-juhariah.jpg",
      socials: { linkedin: "#", github: "#", instagram: "https://instagram.com/gdgoc.unm" }
    },
    {
      name: "Syahrur Adhe Pratama Putra",
      role: "Copywriting & Social Media",
      division: "Branding & Design",
      subRole: "Copywriting & Social Media",
      color: "blue",
      image: "assets/images/team/bd-syahrur.jpg",
      socials: { linkedin: "#", github: "#", instagram: "https://instagram.com/gdgoc.unm" }
    },
    {
      name: "Wulan Zahra",
      role: "Content Creator",
      division: "Branding & Design",
      subRole: "Content Creator",
      color: "blue",
      image: "assets/images/team/bd-wulan.jpg",
      socials: { linkedin: "#", github: "#", instagram: "https://instagram.com/gdgoc.unm" }
    },
    {
      name: "Andi Fahril S",
      role: "Videographer",
      division: "Branding & Design",
      subRole: "Videographer",
      color: "blue",
      image: "assets/images/team/bd-fahril.jpg",
      socials: { linkedin: "#", github: "#", instagram: "https://instagram.com/gdgoc.unm" }
    }
  ],

  // Gallery Section directly from gdgoc-unm.vercel.app
  galleryIntro: "A glimpse into our journey from team collaboration to inspirational activities. This gallery showcases precious moments of the core team and GDGoC UNM members learning, sharing, and growing together in the spirit of technology and innovation.",
  gallery: [
    {
      title: "Info Session & Grand Onboarding",
      category: "Onboarding",
      image: "assets/images/gallery/gallery-1.jpg",
      desc: "Welcoming hundreds of new members at the Pinisi Tower Theater Room, UNM.",
      color: "blue"
    },
    {
      title: "Hands-on Workshop: Gemini API",
      category: "Workshop",
      image: "assets/images/gallery/gallery-2.jpg",
      desc: "Live coding intelligent assistants with Google AI Studio and Gemini 2.5.",
      color: "yellow"
    },
    {
      title: "Weekly Class: Modern Web Architecture",
      category: "Weekly Class",
      image: "assets/images/gallery/gallery-3.jpg",
      desc: "Intensive component development and responsive styling in JTIK Lab.",
      color: "green"
    },
    {
      title: "Solution Challenge Hackathon Day",
      category: "Hackathon",
      image: "assets/images/gallery/gallery-4.jpg",
      desc: "Brainstorming and prototyping digital solutions addressing the 17 UN SDGs.",
      color: "red"
    },
    {
      title: "Robotics & Telemetry Lab Testing",
      category: "Robotics",
      image: "assets/images/gallery/gallery-5.jpg",
      desc: "Mobile robot navigation and sensor data telemetry using ESP32 & ROS.",
      color: "green"
    },
    {
      title: "Core Team Strategic Sync",
      category: "Community",
      image: "assets/images/gallery/gallery-6.jpg",
      desc: "Annual roadmap alignment and curriculum planning with all division leads.",
      color: "blue"
    }
  ],

  // Member Stories directly from gdgoc-unm.vercel.app
  testimonials: [
    {
      quote: "Being part of GDGoC Universitas Negeri Makassar has been an extraordinary journey full of learning and personal growth. Through every session and collaborative project, I not only gained technical skills, but also the confidence to share ideas and work with people from diverse backgrounds.",
      name: "Citra Nuraiyani",
      role: "GDGoC UNM Member • Student of JTIK UNM",
      color: "blue"
    },
    {
      quote: "The Weekly Class sessions provided clear direction that matched real tech industry practices. The supportive mentors helped me build real-world applications and prepare for Google competitions.",
      name: "Andi Ahmad Fauzan",
      role: "GDGoC UNM Member • Computer Engineering Student",
      color: "green"
    },
    {
      quote: "As someone who initially felt intimidated by programming, GDGoC UNM welcomed me with open arms. The peer-to-peer learning environment gave me the courage to code my very first web project!",
      name: "Salsabila Ramadhani",
      role: "GDGoC UNM Member • Faculty of Mathematics & Natural Sciences",
      color: "yellow"
    }
  ],

  // CTA Section directly from gdgoc-unm.vercel.app
  cta: {
    title: "Come Join GDGoC UNM!",
    desc: "Join GDGoC UNM and grow together with an inspiring tech community. Click 'Join Now' to become part of an endless journey of collaboration and learning, open to all students who want to thrive in the world of technology.",
    buttonLabel: "Join Now",
    buttonUrl: "https://gdg.community.dev/gdg-on-campus-universitas-negeri-makassar-makassar-indonesia/"
  },

  // FAQ Section directly from gdgoc-unm.vercel.app
  faqIntro: "Frequently asked questions about GDGoC UNM. Find the answers to your curiosity here.",
  faqs: [
    {
      q: "What is Google Developer Groups On Campus (GDGoC) UNM?",
      a: "GDGoC UNM (formerly GDSC UNM) is a university-based student developer community supported by Google Developers. Our goal is to bridge the gap between academic theory and real-world tech industry practices through peer-to-peer learning and practical project building."
    },
    {
      q: "Can non-IT / non-computer science students join?",
      a: "Yes, absolutely! GDGoC UNM is open to ALL active students of Universitas Negeri Makassar across all departments, faculties, and academic years. We celebrate interdisciplinary collaboration."
    },
    {
      q: "Is there any membership fee or cost to participate?",
      a: "100% FREE! All activities, workshops, weekly classes, and community access provided by GDGoC UNM are completely free of charge."
    },
    {
      q: "How does the Weekly Class work?",
      a: "Weekly Classes are held on a regular weekly basis, combining in-person sessions in UNM campus computer labs and interactive virtual sessions. Members choose their preferred learning track and work on guided mini-projects with Tech Leads."
    },
    {
      q: "What benefits do I get as a member?",
      a: "Members receive access to official Google curricula, networking with local and global developers, opportunities to join the Google Solution Challenge and JuaraGCP, project portfolio development, and certificates of completion."
    },
    {
      q: "How do I officially register as a member?",
      a: "Simply click the 'Join Now' button on this website to be redirected to the official Google Community Dev chapter page for Universitas Negeri Makassar. Click 'Join Us' and sign in with your Google account!"
    }
  ]
};
