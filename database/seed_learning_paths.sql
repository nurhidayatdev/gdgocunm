-- ========================================================================
-- Seed Data: learning_paths and learning_path_modules
-- Auto-generated from learning-path.html
-- Total Tracks: 7
-- ========================================================================

-- Clean up existing track records
TRUNCATE TABLE learning_path_modules CASCADE;
TRUNCATE TABLE learning_paths CASCADE;

-- Insert Learning Paths
INSERT INTO learning_paths (
    id, title, short_title, category, color, image_url, whatsapp_url,
    description, objective, long_description, tech_stack,
    capstone_title, capstone_description, outcomes_learn, outcomes_prereq,
    spec_sessions, spec_level, spec_duration, spec_cohort,
    instructor_name, instructor_role, instructor_division, instructor_image_url, instructor_quote, instructor_socials,
    order_index, is_active
) VALUES (
    'uiux',
    'UI/UX Design',
    'UI/UX Design',
    'Design & Product',
    'blue',
    'assets/images/tracks/Logo - UIUX.jpg',
    'https://chat.whatsapp.com/',
    'Master the Design Thinking framework, user research, wireframing, high-fidelity components, and clickable prototypes in Figma.',
    'Guide students from zero design experience through the Design Thinking framework to create user-centered, clickable website prototypes in Figma.',
    'The UI/UX Design track guides students with zero design experience through the complete human-centered Design Thinking journey. You will learn to construct Empathy Maps, define How Might We (HMW) problem statements, sketch rapid low-fidelity wireframes, engineer reusable UI component systems, and link clickable interactive prototypes in Figma for usability testing.',
    ARRAY['Figma', 'Pen & Paper', 'Usability Testing', 'Design Thinking', 'Wireframing', 'Component Sets']::TEXT[],
    'Interactive Clickable Prototype — A complete, validated prototype covering Login Page and Landing Page in Figma.',
    'Interactive Clickable Prototype — A complete, validated prototype covering Login Page and Landing Page in Figma.',
    'User empathy techniques, HMW problem synthesis, digital wireframing in Figma, visual hierarchy & component variants, and interactive prototyping.',
    'Zero prior design experience needed. Access to a laptop with Figma desktop app or web browser, plus pen and paper.',
    '5 Sessions',
    'Beginner Friendly',
    '5 Weeks',
    'Cohort 2026/2027',
    'Andi Muh. Yusran Haris',
    'UI/UX Tech Lead',
    'Research & Development',
    'assets/images/team/rd-yusran.png',
    'Great design starts with deep user empathy. We guide you through the complete Design Thinking journey to turn real-world problems into clickable Figma prototypes.',
    '{"linkedin":"#","instagram":"https://instagram.com/gdgoc.unm","github":"#"}'::jsonb,
    1,
    true
);

INSERT INTO learning_path_modules (
    track_id, session_num, title, objectives, materials, assignment, order_index
) VALUES (
    'uiux',
    '01',
    'Introduction to UI/UX, Team Formation & Empathy Mapping',
    'Differentiate UI vs. UX using real-world analogies, understand Design Thinking basics, form project teams, and construct an Empathy Map.',
    'UI vs. UX definitions, career opportunities, 5 stages of Design Thinking, user empathy techniques.',
    'Complete an initial Empathy Map and conduct quick user interviews with 1–2 target users.',
    1
);
INSERT INTO learning_path_modules (
    track_id, session_num, title, objectives, materials, assignment, order_index
) VALUES (
    'uiux',
    '02',
    'Problem Statement (HMW) & Figma Workspace Onboarding',
    'Synthesize user feedback into How Might We (HMW) statements, define web page goals, and set up a team project in Figma.',
    'Problem statement templates, website sitemaps (Login & Landing Page), Figma UI walkthrough, frames, shapes, and desktop artboards.',
    'Formulate team HMW problem statements and set up the team Figma project file.',
    2
);
INSERT INTO learning_path_modules (
    track_id, session_num, title, objectives, materials, assignment, order_index
) VALUES (
    'uiux',
    '03',
    'Low-Fidelity Wireframing',
    'Translate abstract ideas into paper sketches and digital low-fidelity wireframes in Figma.',
    'Layout anatomy (header, hero section, features grid, form, footer), information architecture, rapid paper sketching, low-fi wireframing in Figma.',
    'Complete low-fidelity digital wireframes for both Login and Landing pages in Figma.',
    3
);
INSERT INTO learning_path_modules (
    track_id, session_num, title, objectives, materials, assignment, order_index
) VALUES (
    'uiux',
    '04',
    'High-Fidelity UI Design & Reusable Components',
    'Transform wireframes into high-fidelity UI designs utilizing visual design principles, typography, color palettes, and Figma components.',
    'Visual hierarchy, contrast, color theory, font selection, creating reusable UI components (buttons, input fields, cards, navbars).',
    'Convert wireframes into complete High-Fidelity designs in Figma.',
    4
);
INSERT INTO learning_path_modules (
    track_id, session_num, title, objectives, materials, assignment, order_index
) VALUES (
    'uiux',
    '05',
    'Interactive Prototyping, Usability Testing & Showcase',
    'Link static design screens into clickable prototypes, conduct quick usability testing, and pitch design decisions.',
    'Figma prototyping transitions, basic usability testing scripts, 4 UX pillars (Usefulness, Usability, Desirability, Accessibility), design presentation tactics.',
    'Present the final clickable prototype and share design process reflection.',
    5
);

INSERT INTO learning_paths (
    id, title, short_title, category, color, image_url, whatsapp_url,
    description, objective, long_description, tech_stack,
    capstone_title, capstone_description, outcomes_learn, outcomes_prereq,
    spec_sessions, spec_level, spec_duration, spec_cohort,
    instructor_name, instructor_role, instructor_division, instructor_image_url, instructor_quote, instructor_socials,
    order_index, is_active
) VALUES (
    'frontend',
    'Front-End Web Development',
    'Front-End',
    'Web & Apps',
    'green',
    'assets/images/tracks/Logo - Frontend Development.jpg',
    'https://chat.whatsapp.com/',
    'Build interactive web interfaces from scratch using modern web standards, HTML5, CSS3, JavaScript DOM, and AI-assisted workflows.',
    'Equip members with foundational skills to build interactive web interfaces from scratch using modern standards and AI-assisted workflows.',
    'The Front-End Web Development track equips student developers with foundational skills to build interactive web interfaces from scratch using modern web standards and AI-assisted developer workflows. You will master semantic page structure, responsive layouts with Flexbox and CSS Grid, asynchronous JavaScript DOM manipulation, Product Requirements Document (PRD) creation, and deployment practices.',
    ARRAY['HTML5', 'CSS3', 'JavaScript ES6+', 'VS Code', 'Git & GitHub', 'Tailwind CSS', 'Vercel / Netlify']::TEXT[],
    'Daily Money Tracking Web App — A functional, responsive personal financial logging web application built from scratch.',
    'Daily Money Tracking Web App — A functional, responsive personal financial logging web application built from scratch.',
    'Semantic HTML5 structure, responsive layout design with Flexbox and CSS Grid, asynchronous DOM events, PRD drafting, and deployment.',
    'Zero prior web experience required. A computer with VS Code and Git installed, and basic curiosity for building user interfaces.',
    '5 Sessions',
    'Beginner Friendly',
    '5 Weeks',
    'Cohort 2026/2027',
    'Muhammad Ghazi Saputra',
    'Front-End Tech Lead',
    'Research & Development',
    'assets/images/team/rd-ghazi.png',
    'From semantic structures to dynamic JavaScript interfaces, we empower student developers to build modern, responsive, and accessible web experiences from scratch.',
    '{"linkedin":"#","instagram":"https://instagram.com/gdgoc.unm","github":"#"}'::jsonb,
    2,
    true
);

INSERT INTO learning_path_modules (
    track_id, session_num, title, objectives, materials, assignment, order_index
) VALUES (
    'frontend',
    '01',
    'Introduction to Front-End Web Development',
    'Understand front-end roles, how web browsers render pages, the 3 core pillars (HTML, CSS, JS), and modern developer roadmaps.',
    'Web architecture, DevTools, VS Code, Git & GitHub setup, overview of AI-assisted coding trends.',
    'Install VS Code & Git, create a GitHub account, and summarize the role of a front-end developer in own words.',
    1
);
INSERT INTO learning_path_modules (
    track_id, session_num, title, objectives, materials, assignment, order_index
) VALUES (
    'frontend',
    '02',
    'HTML — Structuring Web Pages',
    'Master basic HTML document structure, content elements, forms, semantic tags, and basic web accessibility.',
    '&lt;!DOCTYPE&gt;, head/body, headings, lists, tables, forms (&lt;input&gt;, &lt;select&gt;, &lt;textarea&gt;), semantic tags vs. &lt;div&gt;, alt attributes.',
    'Create a personal profile page using semantic HTML with lists, images, and a contact form.',
    2
);
INSERT INTO learning_path_modules (
    track_id, session_num, title, objectives, materials, assignment, order_index
) VALUES (
    'frontend',
    '03',
    'CSS — Styling & Page Layouts',
    'Understand selectors, specificity, the Box Model, Flexbox, CSS Grid, and mobile-first responsive design.',
    'CSS link methods, units (px, rem, %), Flexbox alignment, CSS Grid tracks, @media queries, introduction to Tailwind CSS/Bootstrap.',
    'Style the personal profile page from Session 2 into a fully responsive desktop and mobile layout.',
    3
);
INSERT INTO learning_path_modules (
    track_id, session_num, title, objectives, materials, assignment, order_index
) VALUES (
    'frontend',
    '04',
    'JavaScript Basics, PRD & Workflow Integration',
    'Grasp fundamental JavaScript concepts (DOM manipulation, events), write a Product Requirements Document (PRD), and leverage AI tools responsibly.',
    'JS syntax, variables, functions, DOM selectors, event listeners (click, submit), PRD structure (background, goal, scope, priority features), deployment roadmaps (GitHub Pages/Vercel/Netlify).',
    'Add 1 interactive feature (e.g., theme toggle) to the profile page and write a 1-page PRD for the final money tracker app.',
    4
);
INSERT INTO learning_path_modules (
    track_id, session_num, title, objectives, materials, assignment, order_index
) VALUES (
    'frontend',
    '05',
    'Final Capstone Presentation & Code Review',
    'Review sessions 1–4, showcase the final capstone project, and receive structured feedback from mentors.',
    'Live code demonstration, project evaluation rubrics, code optimization tips.',
    'Present the functional Daily Money Tracking Web App and submit the GitHub repository.',
    5
);

INSERT INTO learning_paths (
    id, title, short_title, category, color, image_url, whatsapp_url,
    description, objective, long_description, tech_stack,
    capstone_title, capstone_description, outcomes_learn, outcomes_prereq,
    spec_sessions, spec_level, spec_duration, spec_cohort,
    instructor_name, instructor_role, instructor_division, instructor_image_url, instructor_quote, instructor_socials,
    order_index, is_active
) VALUES (
    'backend',
    'Back-End Web Development',
    'Back-End',
    'Cloud & Data',
    'yellow',
    'assets/images/tracks/Logo - Backend Development.jpg',
    'https://chat.whatsapp.com/',
    'Build scalable server-side architectures, RESTful JSON APIs, secure databases with MySQL, and middleware pipelines.',
    'Empower members to build scalable server-side architecture, RESTful JSON APIs, secure databases, and middleware, culminating in full-stack collaboration.',
    'The Back-End Web Development track empowers members to engineer robust server-side systems. You will learn client-server HTTP communication, construct RESTful JSON API endpoints with PHP Native and MySQL, implement middleware pipelines and token authorization, apply MVC design architecture, and partner with the Front-End team for collaborative full-stack integration.',
    ARRAY['PHP Native', 'MySQL', 'XAMPP / Laragon', 'Postman / Thunder Client', 'RESTful API', 'Git & GitHub']::TEXT[],
    'Collaborative Full-Stack Web App — Integrated multi-tier web application built in tandem with the Front-End team.',
    'Collaborative Full-Stack Web App — Integrated multi-tier web application built in tandem with the Front-End team.',
    'Client-server HTTP cycles, database modeling, RESTful CRUD operations, middleware authentication, and full-stack contract integration.',
    'Basic programming logic (variables, loops, conditionals). Local installation of XAMPP or Laragon and Postman.',
    '5 Sessions',
    'Beginner to Intermediate',
    '5 Weeks',
    'Cohort 2026/2027',
    'Muh Raihan Nur Taufiq',
    'Back-End Tech Lead',
    'Research & Development',
    'assets/images/team/rd-raihan.png',
    'A robust server architecture, clean RESTful APIs, and secure databases are the foundation of any scalable application. Together, we build production-ready full-stack systems.',
    '{"linkedin":"#","instagram":"https://instagram.com/gdgoc.unm","github":"#"}'::jsonb,
    3,
    true
);

INSERT INTO learning_path_modules (
    track_id, session_num, title, objectives, materials, assignment, order_index
) VALUES (
    'backend',
    '01',
    'Foundations of Back-End Development',
    'Explain back-end responsibilities, client-server communication, HTTP protocols, request/response cycles, and status codes.',
    'Client-server model, role of APIs & databases, HTTP methods (GET, POST, PUT, DELETE), status codes (200, 201, 400, 401, 404, 500).',
    'Draw a client-server architecture diagram and complete a quiz on HTTP methods/status codes.',
    1
);
INSERT INTO learning_path_modules (
    track_id, session_num, title, objectives, materials, assignment, order_index
) VALUES (
    'backend',
    '02',
    'Building REST APIs & Database Integration',
    'Set up local development server environments, construct JSON API endpoints, and execute CRUD operations with database integration.',
    'PHP Native setup (XAMPP/Laragon), MySQL database connections (PDO/MySQLi), CRUD endpoints, API testing via Postman or Thunder Client.',
    'Build a basic CRUD REST API connected to MySQL and submit code via GitHub repository.',
    2
);
INSERT INTO learning_path_modules (
    track_id, session_num, title, objectives, materials, assignment, order_index
) VALUES (
    'backend',
    '03',
    'Middleware Implementation & API Security',
    'Understand request pipeline middleware, request logging, token authentication, and CORS header configurations.',
    'Middleware pipeline concept, custom logging functions, API key / Bearer Token authorization, CORS configuration, centralized error formatting.',
    'Attach at least 2 middleware functions (Logger & Auth) to existing CRUD endpoints and test 401 unauthorized responses via Postman.',
    3
);
INSERT INTO learning_path_modules (
    track_id, session_num, title, objectives, materials, assignment, order_index
) VALUES (
    'backend',
    '04',
    'Advanced Back-End Techniques & MVC Architecture',
    'Apply input validation, structured exception handling, and clean code principles via Model-View-Controller (MVC) pattern.',
    'Data sanitization/validation, database error handling, MVC file structure separation, standardized JSON error messages, contract agreement preparation.',
    'Refactor existing code into an MVC structure, add strict input validation, and publish API documentation contracts.',
    4
);
INSERT INTO learning_path_modules (
    track_id, session_num, title, objectives, materials, assignment, order_index
) VALUES (
    'backend',
    '05',
    'Collaborative Full-Stack Project Onboarding',
    'Partner with Front-End class members, establish API contracts, define app requirements, and start full-stack integration.',
    'Full-stack architecture integration, API endpoints contract mapping, Git workflow for team collaboration.',
    'Finalize team API documentation and deliver the initial back-end repository for full-stack integration.',
    5
);

INSERT INTO learning_paths (
    id, title, short_title, category, color, image_url, whatsapp_url,
    description, objective, long_description, tech_stack,
    capstone_title, capstone_description, outcomes_learn, outcomes_prereq,
    spec_sessions, spec_level, spec_duration, spec_cohort,
    instructor_name, instructor_role, instructor_division, instructor_image_url, instructor_quote, instructor_socials,
    order_index, is_active
) VALUES (
    'data-science',
    'Data Science',
    'Data Science',
    'Intelligence',
    'yellow',
    'assets/images/tracks/Logo - Data Science.jpg',
    'https://chat.whatsapp.com/',
    'Guide through complete data analysis workflows—from descriptive statistics and data cleaning to hypothesis testing and data storytelling.',
    'Guide members through data analysis workflows—from descriptive statistics and data cleaning to hypothesis testing and data storytelling.',
    'The Data Science track guides student researchers through the end-to-end data lifecycle in Google Colab. You will explore descriptive statistics, clean messy datasets with Pandas, formulate hypothesis tests for business decisions, design clear visualizations with Matplotlib & Seaborn, and deliver an impactful data storytelling presentation.',
    ARRAY['Google Colab', 'Python', 'Pandas', 'Matplotlib', 'Seaborn', 'Jupyter', 'Descriptive Stats']::TEXT[],
    'Data-Driven Storytelling Showcase & Presentation — A polished analytical presentation solving a domain problem backed by clean visual evidence.',
    'Data-Driven Storytelling Showcase & Presentation — A polished analytical presentation solving a domain problem backed by clean visual evidence.',
    'Data science workflow lifecycle, descriptive central tendency/dispersion stats, handling missing data & outliers, inferential hypothesis testing, and narrative data storytelling.',
    'Zero prior statistical expertise needed. A Google account to run Google Colab, and curiosity to ask questions of data.',
    '6 Sessions',
    'Beginner to Intermediate',
    '6 Weeks',
    'Cohort 2026/2027',
    'Namira Sarip',
    'Data Science Tech Lead',
    'Research & Development',
    'assets/images/team/rd-namira.png',
    'Data without insights is just numbers. We teach you how to clean messy real-world datasets, perform inferential testing, and communicate stories that drive impact.',
    '{"linkedin":"#","instagram":"https://instagram.com/gdgoc.unm","github":"#"}'::jsonb,
    4,
    true
);

INSERT INTO learning_path_modules (
    track_id, session_num, title, objectives, materials, assignment, order_index
) VALUES (
    'data-science',
    '01',
    'Getting to Know Data Science & Google Colab',
    'Define Data Science, understand its interdisciplinary nature (Statistics, Computer Science, Domain Knowledge), and explore Google Colab.',
    'Data Science workflow lifecycle, real-world industry applications, tour of Google Colab interface, running basic Python code blocks.',
    'Complete an interactive ice-breaker quiz and write a reflection on how data curiosity applies to your field.',
    1
);
INSERT INTO learning_path_modules (
    track_id, session_num, title, objectives, materials, assignment, order_index
) VALUES (
    'data-science',
    '02',
    'Fundamentals of Data & Descriptive Statistics',
    'Differentiate data types (categorical vs. numerical, continuous vs. discrete) and compute core descriptive statistics.',
    'Categorical/numerical variable types, measures of central tendency (Mean, Median, Mode), measures of dispersion (Range, Variance, Standard Deviation), guided calculations in Colab.',
    'Perform descriptive statistical analysis on a provided dataset in Colab and summarize takeaways.',
    2
);
INSERT INTO learning_path_modules (
    track_id, session_num, title, objectives, materials, assignment, order_index
) VALUES (
    'data-science',
    '03',
    'Data Cleaning & Preparation',
    'Identify common data quality issues ("dirty data"), handle missing values and duplicates, and perform structural transformations.',
    'Handling missing data (NaN), removing duplicate rows, correcting data types, handling outliers, data transformation principles.',
    'Complete a hands-on data cleaning exercise on a messy real-world dataset in Google Colab.',
    3
);
INSERT INTO learning_path_modules (
    track_id, session_num, title, objectives, materials, assignment, order_index
) VALUES (
    'data-science',
    '04',
    'Data-Driven Decision Making & Inferential Statistics',
    'Understand basic inferential statistics, sampling vs. population concepts, and hypothesis testing for business decisions.',
    'Population vs. Sample, statistical significance (p-value), hypothesis testing steps (H0 vs. H1), business decision modeling.',
    'Execute a step-by-step hypothesis test in Colab and interpret the results in a business context.',
    4
);
INSERT INTO learning_path_modules (
    track_id, session_num, title, objectives, materials, assignment, order_index
) VALUES (
    'data-science',
    '05',
    'Data Visualization, Storytelling & Capstone Onboarding',
    'Design clean data visualizations, transform statistical insights into narrative stories, and onboard onto final capstone projects.',
    'Chart selection guides (Bar, Line, Scatter, Boxplot), ethical visualization principles, data storytelling frameworks, project dataset distribution.',
    'Draft initial visualization charts and outline the narrative story for your team''s final capstone dataset.',
    5
);
INSERT INTO learning_path_modules (
    track_id, session_num, title, objectives, materials, assignment, order_index
) VALUES (
    'data-science',
    '06',
    'Final Capstone Project Showcase',
    'Present data-driven findings clearly to an audience, defend analytical methods, and reflect on personal skill growth.',
    'Data presentation techniques, Q&A defense strategies, peer evaluation rubrics.',
    'Deliver the final team Data Science presentation and complete the program evaluation form.',
    6
);

INSERT INTO learning_paths (
    id, title, short_title, category, color, image_url, whatsapp_url,
    description, objective, long_description, tech_stack,
    capstone_title, capstone_description, outcomes_learn, outcomes_prereq,
    spec_sessions, spec_level, spec_duration, spec_cohort,
    instructor_name, instructor_role, instructor_division, instructor_image_url, instructor_quote, instructor_socials,
    order_index, is_active
) VALUES (
    'ai-ml',
    'AI / ML',
    'AI / ML',
    'Intelligence',
    'blue',
    'assets/images/tracks/Logo - AIML.jpg',
    'https://chat.whatsapp.com/',
    'Develop practical AI/ML solutions through interactive Colab notebooks, computer vision models, and prompt engineering in Google AI Studio.',
    'Introduce practical, ethical AI/ML development through interactive notebooks, computer vision models, and prompt engineering in Google AI Studio.',
    'The AI & Machine Learning track demystifies modern artificial intelligence through practical, hands-on development. You will execute supervised predictive classification notebooks in Google Colab, train custom computer vision models with Google Teachable Machine, engineer high-precision system prompts in Google AI Studio, and build a collaborative AI mini-project addressing community challenges.',
    ARRAY['Google Colab', 'Teachable Machine', 'Google AI Studio', 'Python', 'Scikit-Learn', 'Gemini Models']::TEXT[],
    'Practical AI/ML Mini Project & Presentation — A working machine learning prototype or AI assistant addressing a real problem.',
    'Practical AI/ML Mini Project & Presentation — A working machine learning prototype or AI assistant addressing a real problem.',
    'AI vs. ML core principles, predictive regression vs classification, training computer vision classifiers, prompt engineering in Google AI Studio, and ethical AI.',
    'No advanced mathematics or deep learning background required. Basic familiarity with Google account and Python syntax is helpful.',
    '5 Sessions',
    'Beginner to Intermediate',
    '5 Weeks',
    'Cohort 2026/2027',
    'Raynato Lienardy',
    'AI/ML Tech Lead',
    'Research & Development',
    'assets/images/team/rd-raynato.png',
    'From interactive Colab notebooks to Teachable Machine and Google AI Studio prompt engineering, we make cutting-edge AI practical, ethical, and solution-ready.',
    '{"linkedin":"#","instagram":"https://instagram.com/gdgoc.unm","github":"#"}'::jsonb,
    5,
    true
);

INSERT INTO learning_path_modules (
    track_id, session_num, title, objectives, materials, assignment, order_index
) VALUES (
    'ai-ml',
    '01',
    'Getting Started with AI & Google Colab',
    'Understand what AI/ML is, explore real-world use cases, and run your first Python code in Google Colab.',
    'AI vs. ML vs. Deep Learning, everyday AI applications, Google Colab interface walkthrough, running a basic Iris classification notebook.',
    'Execute the Colab notebook and submit 1 original idea for how AI can solve a problem in your field.',
    1
);
INSERT INTO learning_path_modules (
    track_id, session_num, title, objectives, materials, assignment, order_index
) VALUES (
    'ai-ml',
    '02',
    'Predictive AI — Regression vs. Classification',
    'Differentiate regression and classification models, execute pre-built predictive notebooks, and evaluate model accuracy.',
    'Supervised learning concepts, evaluation metrics, interpreting prediction outputs, dataset feature tweaks.',
    'Submit a screenshot of your execution results accompanied by a 2-sentence analytical interpretation.',
    2
);
INSERT INTO learning_path_modules (
    track_id, session_num, title, objectives, materials, assignment, order_index
) VALUES (
    'ai-ml',
    '03',
    'Computer Vision with Teachable Machine',
    'Train custom image classification models using Google Teachable Machine without writing complex code.',
    'Computer vision concepts, dataset collection strategies, class training, testing live webcam inference, exporting trained models.',
    'Train a custom Teachable Machine image classifier and submit a screenshot with a brief explanation of its use case.',
    3
);
INSERT INTO learning_path_modules (
    track_id, session_num, title, objectives, materials, assignment, order_index
) VALUES (
    'ai-ml',
    '04',
    'Conversational AI & Prompt Engineering (Google AI Studio)',
    'Master prompt engineering techniques using Google AI Studio and understand ethical AI usage.',
    'Large Language Models (LLMs), System Instructions, zero-shot/few-shot prompting, temperature & parameters, AI safety & ethics.',
    'Create and submit 1 optimized system prompt engineered in Google AI Studio.',
    4
);
INSERT INTO learning_path_modules (
    track_id, session_num, title, objectives, materials, assignment, order_index
) VALUES (
    'ai-ml',
    '05',
    'AI Capstone Project Showcase',
    'Collaborate in small groups to build and present a functional AI mini-project applying skills from sessions 1–4.',
    'Capstone guidelines, effective presentation strategies, peer feedback framework.',
    'Deliver a 5-minute team presentation of your AI mini-project.',
    5
);

INSERT INTO learning_paths (
    id, title, short_title, category, color, image_url, whatsapp_url,
    description, objective, long_description, tech_stack,
    capstone_title, capstone_description, outcomes_learn, outcomes_prereq,
    spec_sessions, spec_level, spec_duration, spec_cohort,
    instructor_name, instructor_role, instructor_division, instructor_image_url, instructor_quote, instructor_socials,
    order_index, is_active
) VALUES (
    'cyber-security',
    'Cybersecurity',
    'Cybersecurity',
    'Security',
    'red',
    'assets/images/tracks/Logo - Cybersecurity.jpg',
    'https://chat.whatsapp.com/',
    'Train in offensive and defensive security fundamentals through hands-on Capture The Flag (CTF) Jeopardy challenges and technical write-ups.',
    'Train members in offensive and defensive security fundamentals through hands-on Capture The Flag (CTF) Jeopardy challenges.',
    'The Cybersecurity track immerses students into the thrilling world of Capture The Flag (CTF) Jeopardy competitions. You will navigate Linux CLI, analyze data encodings with CyberChef, exploit web vulnerabilities with Burp Suite, solve Cryptography and Digital Forensics puzzles with Wireshark/binwalk, disassemble binaries with Ghidra, and compete in a live CTFd Jeopardy competition.',
    ARRAY['Linux CLI', 'Burp Suite', 'CyberChef', 'Ghidra', 'CTFd Scoreboard', 'Wireshark', 'ExifTool / Binwalk']::TEXT[],
    'Mini CTF Jeopardy Competition & Technical Write-Up Report — Solve competitive flags under time constraints and deliver professional challenge write-ups.',
    'Mini CTF Jeopardy Competition & Technical Write-Up Report — Solve competitive flags under time constraints and deliver professional challenge write-ups.',
    'CTF problem solving, Linux CLI administration, web exploitation (IDOR, SQLi, XSS), cryptography & digital forensics, and binary reverse engineering.',
    'Comfort with terminal navigation and networking basics. A curious mind for understanding how digital systems break and how to patch them.',
    '5 Sessions',
    'Beginner to Intermediate',
    '5 Weeks',
    'Cohort 2026/2027',
    'Shaquille Rashaun Sahl Tamrin',
    'Cybersecurity Tech Lead',
    'Research & Development',
    'assets/images/team/rd-shaquille.png',
    'Understanding how attacks work is the first step to defending systems. Through hands-on CTF Jeopardy challenges, we train ethical defenders for digital frontiers.',
    '{"linkedin":"#","instagram":"https://instagram.com/gdgoc.unm","github":"#"}'::jsonb,
    6,
    true
);

INSERT INTO learning_path_modules (
    track_id, session_num, title, objectives, materials, assignment, order_index
) VALUES (
    'cyber-security',
    '01',
    'CTF Foundations, Linux CLI & Data Encoding',
    'Understand Jeopardy CTF rules, navigate Linux CLI fluently, setup CTF environments (WSL/VM), and master encoding/decoding methods.',
    'CTF categories (Misc, Web, Crypto, Forensics, Rev), Linux commands (ls, grep, cat, find, permissions), Base64/Hex/ASCII transformations, CyberChef online tool.',
    'Solve warm-up challenges on platforms such as picoCTF or OverTheWire Bandit (Levels 0–5).',
    1
);
INSERT INTO learning_path_modules (
    track_id, session_num, title, objectives, materials, assignment, order_index
) VALUES (
    'cyber-security',
    '02',
    'Web Exploitation',
    'Inspect and manipulate HTTP requests/responses, analyze browser cookies/headers, and exploit basic web vulnerabilities.',
    'HTTP request methods, DevTools inspection, robots.txt, Insecure Direct Object References (IDOR), basic SQL Injection (SQLi), basic Cross-Site Scripting (XSS), Burp Suite proxy setup.',
    'Solve 3 easy Web CTF challenges on a local vulnerable target (DVWA) and log solution steps.',
    2
);
INSERT INTO learning_path_modules (
    track_id, session_num, title, objectives, materials, assignment, order_index
) VALUES (
    'cyber-security',
    '03',
    'Cryptography & Digital Forensics',
    'Decipher classical ciphers, analyze data hashes, inspect file metadata, perform steganography extraction, and analyze network packets.',
    'Caesar/Vigenère ciphers, XOR logic, hashing & cracking concepts, RSA overview, ExifTool metadata, strings, binwalk, Wireshark .pcap packet analysis.',
    'Solve 2 Cryptography challenges + 2 Forensics challenges.',
    3
);
INSERT INTO learning_path_modules (
    track_id, session_num, title, objectives, materials, assignment, order_index
) VALUES (
    'cyber-security',
    '04',
    'Reverse Engineering',
    'Understand binary compilation, perform static analysis using Ghidra, execute dynamic analysis, and extract hardcoded flags.',
    'Compilers, ELF/EXE binary structures, Ghidra disassembly/decompilation walkthrough, dynamic analysis with gdb, identifying string comparison routines.',
    'Solve 2 Reverse Engineering challenges and write step-by-step resolution logs.',
    4
);
INSERT INTO learning_path_modules (
    track_id, session_num, title, objectives, materials, assignment, order_index
) VALUES (
    'cyber-security',
    '05',
    'Mini CTF Jeopardy Competition',
    'Apply skills from sessions 1–4 under time constraints in a team-based mini CTF competition and submit a professional write-up.',
    'CTFd scoreboard platform, team collaboration, flag submission strategy, write-up formatting guides.',
    'Compete in the team CTF Jeopardy event and submit team challenge write-ups.',
    5
);
INSERT INTO learning_path_modules (
    track_id, session_num, title, objectives, materials, assignment, order_index
) VALUES (
    'cyber-security',
    '06',
    'CTF Attack & Defense (Advanced Drills)',
    'Maintain, patch, and defend vulnerable services while simultaneously exploiting competitor infrastructure.',
    'Attack & Defense CTF setup, live service patching, traffic monitoring, scoring mechanics.',
    'Submit an incident response report detailing vulnerabilities found and patches deployed.',
    6
);

INSERT INTO learning_paths (
    id, title, short_title, category, color, image_url, whatsapp_url,
    description, objective, long_description, tech_stack,
    capstone_title, capstone_description, outcomes_learn, outcomes_prereq,
    spec_sessions, spec_level, spec_duration, spec_cohort,
    instructor_name, instructor_role, instructor_division, instructor_image_url, instructor_quote, instructor_socials,
    order_index, is_active
) VALUES (
    'robotics',
    'Robotics',
    'Robotics',
    'Hardware',
    'green',
    'assets/images/tracks/Logo - Robotics.jpg',
    'https://chat.whatsapp.com/',
    'Build a working Smart Trash Bin (Tempat Sampah Digital) integrating ESP32, ultrasonic sensors, servos, and Blynk IoT Cloud.',
    'Build a physical, working Smart Trash Bin (Tempat Sampah Digital) integrating ESP32, ultrasonic sensors, servos, status LEDs/buzzers, and Blynk IoT Cloud.',
    'The Robotics track combines physical microcontroller circuits with cloud connectivity. You will configure Arduino IDE for ESP32, interface HC-SR04 ultrasonic distance sensors, program servo motor lid actuation, write conditional alert algorithms, and broadcast telemetry over Wi-Fi to a live Blynk IoT Cloud dashboard.',
    ARRAY['ESP32 Microcontroller', 'Arduino IDE', 'HC-SR04 Sensor', 'Servo Motors', 'Blynk IoT Cloud', 'C++ / Embedded']::TEXT[],
    'Smart Trash Bin Physical Prototype & Blynk Dashboard Integration — A fully assembled automated trash bin with cloud capacity alerts.',
    'Smart Trash Bin Physical Prototype & Blynk Dashboard Integration — A fully assembled automated trash bin with cloud capacity alerts.',
    'IoT hardware architecture, ultrasonic distance measurement, servo motor automation, Wi-Fi provisioning on ESP32, and Blynk Cloud telemetry.',
    'Enthusiasm for physical computing and electronics. Basic logic or C++ familiarity is helpful; hardware is guided in person in campus labs.',
    '3 Sessions',
    'Beginner to Intermediate',
    '3 Weeks',
    'Cohort 2026/2027',
    'Alfira Resky Pratiwi',
    'Robotics Tech Lead',
    'Research & Development',
    'assets/images/team/rd-alfira.png',
    'Hardware comes alive when code meets circuitry. In this track, we build functional IoT devices like the Smart Trash Bin integrated with ESP32 and Blynk Cloud.',
    '{"linkedin":"#","instagram":"https://instagram.com/gdgoc.unm","github":"#"}'::jsonb,
    7,
    true
);

INSERT INTO learning_path_modules (
    track_id, session_num, title, objectives, materials, assignment, order_index
) VALUES (
    'robotics',
    '01',
    'Introduction to IoT, Smart Trash Bin Concept & ESP32 Setup',
    'Grasp IoT basics, understand smart trash bin mechanics, configure Arduino IDE for ESP32, and read ultrasonic sensor data via Serial Monitor.',
    'IoT architecture (Sensors -> Microcontroller -> Cloud -> Actuators), ESP32 board manager setup, Arduino C++ structure (setup(), loop()), HC-SR04 ultrasonic sensor mechanics (Trig/Echo, pulseIn()).',
    'Run the basic Blink LED program and print ultrasonic distance values to the Serial Monitor. Sketch a team system flowchart.',
    1
);
INSERT INTO learning_path_modules (
    track_id, session_num, title, objectives, materials, assignment, order_index
) VALUES (
    'robotics',
    '02',
    'Actuators, Automation Logic & Blynk Cloud Integration',
    'Control servo motors based on sensor inputs, construct conditional automation logic (if-else), implement LED/buzzer alerts, and push data to Blynk Cloud.',
    'Servo control using ESP32Servo library, distance thresholds (< 20 cm opens lid, < 10 cm internal signals bin full), Wi-Fi connection setup, Blynk Cloud Virtual Pins & Dashboard Gauge widgets, voltage divider safety notes.',
    'Construct an automated system: lid opens on detection, alert triggers when full, and live fill capacity displays on Blynk.',
    2
);
INSERT INTO learning_path_modules (
    track_id, session_num, title, objectives, materials, assignment, order_index
) VALUES (
    'robotics',
    '03',
    'PRACTICAL LAB — Assembly, Calibration, Debugging & Showcase',
    'Assemble hardware components into a physical container prototype, merge code routines, calibrate detection thresholds, and present live demos.',
    'Final wiring schematics, physical housing assembly, code merging, distance calibration, power management, Wi-Fi reconnection logic, troubleshooting checklist.',
    'Complete, debug, and demonstrate a fully functional Smart Trash Bin prototype in the physical lab.',
    3
);

