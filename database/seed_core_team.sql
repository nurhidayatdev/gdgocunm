-- ========================================================================
-- Seed Data: core_team
-- Auto-generated from js/data.js
-- Total Members: 29
-- ========================================================================

-- Clean up existing team records
TRUNCATE TABLE core_team CASCADE;

INSERT INTO core_team (
    name, role, division, sub_role, badge_color, image_url, is_lead, order_index, socials, is_active
) VALUES (
    'Nur Hidayat',
    'Lead',
    'Organizer',
    'Lead Organizer',
    'white',
    'assets/images/team/lead-nur-hidayat.png',
    true,
    1,
    '{"linkedin":"#","github":"#","instagram":"https://instagram.com/gdgoc.unm"}'::jsonb,
    true
);
INSERT INTO core_team (
    name, role, division, sub_role, badge_color, image_url, is_lead, order_index, socials, is_active
) VALUES (
    'Annisa Nur Imani',
    'Co-Lead',
    'Organizer',
    'Co-Lead Organizer',
    'white',
    'assets/images/team/colead-annisa-nur-imani.png',
    true,
    2,
    '{"linkedin":"#","github":"#","instagram":"https://instagram.com/gdgoc.unm"}'::jsonb,
    true
);
INSERT INTO core_team (
    name, role, division, sub_role, badge_color, image_url, is_lead, order_index, socials, is_active
) VALUES (
    'Muhammad Ghazi Saputra',
    'Front End Web Development',
    'Research & Development',
    'Track Lead',
    'green',
    'assets/images/team/rd-ghazi.png',
    false,
    3,
    '{"linkedin":"#","github":"#","instagram":"https://instagram.com/gdgoc.unm"}'::jsonb,
    true
);
INSERT INTO core_team (
    name, role, division, sub_role, badge_color, image_url, is_lead, order_index, socials, is_active
) VALUES (
    'Muh Raihan Nur Taufiq',
    'Back End Web Development',
    'Research & Development',
    'Track Lead',
    'green',
    'assets/images/team/rd-raihan.png',
    false,
    4,
    '{"linkedin":"#","github":"#","instagram":"https://instagram.com/gdgoc.unm"}'::jsonb,
    true
);
INSERT INTO core_team (
    name, role, division, sub_role, badge_color, image_url, is_lead, order_index, socials, is_active
) VALUES (
    'Shaquille Rashaun Sahl Tamrin',
    'Cybersecurity',
    'Research & Development',
    'Track Lead',
    'green',
    'assets/images/team/rd-shaquille.png',
    false,
    5,
    '{"linkedin":"#","github":"#","instagram":"https://instagram.com/gdgoc.unm"}'::jsonb,
    true
);
INSERT INTO core_team (
    name, role, division, sub_role, badge_color, image_url, is_lead, order_index, socials, is_active
) VALUES (
    'Raynato Lienardy',
    'AI/ML',
    'Research & Development',
    'Track Lead',
    'green',
    'assets/images/team/rd-raynato.png',
    false,
    6,
    '{"linkedin":"#","github":"#","instagram":"https://instagram.com/gdgoc.unm"}'::jsonb,
    true
);
INSERT INTO core_team (
    name, role, division, sub_role, badge_color, image_url, is_lead, order_index, socials, is_active
) VALUES (
    'Andi Muh. Yusran Haris',
    'UI/UX',
    'Research & Development',
    'Track Lead',
    'green',
    'assets/images/team/rd-yusran.png',
    false,
    7,
    '{"linkedin":"#","github":"#","instagram":"https://instagram.com/gdgoc.unm"}'::jsonb,
    true
);
INSERT INTO core_team (
    name, role, division, sub_role, badge_color, image_url, is_lead, order_index, socials, is_active
) VALUES (
    'Namira Sarip',
    'Data Science',
    'Research & Development',
    'Track Lead',
    'green',
    'assets/images/team/rd-namira.png',
    false,
    8,
    '{"linkedin":"#","github":"#","instagram":"https://instagram.com/gdgoc.unm"}'::jsonb,
    true
);
INSERT INTO core_team (
    name, role, division, sub_role, badge_color, image_url, is_lead, order_index, socials, is_active
) VALUES (
    'Alfira Resky Pratiwi',
    'Robotics',
    'Research & Development',
    'Track Lead',
    'green',
    'assets/images/team/rd-alfira.png',
    false,
    9,
    '{"linkedin":"#","github":"#","instagram":"https://instagram.com/gdgoc.unm"}'::jsonb,
    true
);
INSERT INTO core_team (
    name, role, division, sub_role, badge_color, image_url, is_lead, order_index, socials, is_active
) VALUES (
    'Azzahra Suci Ramadhani',
    'Public Relation',
    'Relation & Communication',
    'Public Relation',
    'yellow',
    'assets/images/team/rc-azzahra.png',
    false,
    10,
    '{"linkedin":"#","github":"#","instagram":"https://instagram.com/gdgoc.unm"}'::jsonb,
    true
);
INSERT INTO core_team (
    name, role, division, sub_role, badge_color, image_url, is_lead, order_index, socials, is_active
) VALUES (
    'Abdul Malik Bin Asrul',
    'External Affairs',
    'Relation & Communication',
    'External Affairs',
    'yellow',
    'assets/images/team/rc-malik.png',
    false,
    11,
    '{"linkedin":"#","github":"#","instagram":"https://instagram.com/gdgoc.unm"}'::jsonb,
    true
);
INSERT INTO core_team (
    name, role, division, sub_role, badge_color, image_url, is_lead, order_index, socials, is_active
) VALUES (
    'Suci Nuradila Hasbullah',
    'External Affairs',
    'Relation & Communication',
    'External Affairs',
    'yellow',
    'assets/images/team/rc-suci.png',
    false,
    12,
    '{"linkedin":"#","github":"#","instagram":"https://instagram.com/gdgoc.unm"}'::jsonb,
    true
);
INSERT INTO core_team (
    name, role, division, sub_role, badge_color, image_url, is_lead, order_index, socials, is_active
) VALUES (
    'Tasya',
    'Community Development',
    'Relation & Communication',
    'Community Development',
    'yellow',
    'assets/images/team/rc-tasya.png',
    false,
    13,
    '{"linkedin":"#","github":"#","instagram":"https://instagram.com/gdgoc.unm"}'::jsonb,
    true
);
INSERT INTO core_team (
    name, role, division, sub_role, badge_color, image_url, is_lead, order_index, socials, is_active
) VALUES (
    'Naurah Hanijah Azzahrah',
    'Community Development',
    'Relation & Communication',
    'Community Development',
    'yellow',
    'assets/images/team/rc-naurah.png',
    false,
    14,
    '{"linkedin":"#","github":"#","instagram":"https://instagram.com/gdgoc.unm"}'::jsonb,
    true
);
INSERT INTO core_team (
    name, role, division, sub_role, badge_color, image_url, is_lead, order_index, socials, is_active
) VALUES (
    'Annisa Mujadidah Rasul',
    'Human Resources',
    'Relation & Communication',
    'Human Resources',
    'yellow',
    'assets/images/team/rc-annisa.png',
    false,
    15,
    '{"linkedin":"#","github":"#","instagram":"https://instagram.com/gdgoc.unm"}'::jsonb,
    true
);
INSERT INTO core_team (
    name, role, division, sub_role, badge_color, image_url, is_lead, order_index, socials, is_active
) VALUES (
    'Siti Fachriza Aulia',
    'Secretary',
    'Event Management',
    'Secretary',
    'red',
    'assets/images/team/em-fachriza.png',
    false,
    16,
    '{"linkedin":"#","github":"#","instagram":"https://instagram.com/gdgoc.unm"}'::jsonb,
    true
);
INSERT INTO core_team (
    name, role, division, sub_role, badge_color, image_url, is_lead, order_index, socials, is_active
) VALUES (
    'Alif Anugrah Syam',
    'Finance',
    'Event Management',
    'Finance',
    'red',
    'assets/images/team/em-alif.png',
    false,
    17,
    '{"linkedin":"#","github":"#","instagram":"https://instagram.com/gdgoc.unm"}'::jsonb,
    true
);
INSERT INTO core_team (
    name, role, division, sub_role, badge_color, image_url, is_lead, order_index, socials, is_active
) VALUES (
    'Akhtar Naury',
    'Event Planner',
    'Event Management',
    'Event Planner',
    'red',
    'assets/images/team/em-akhtar.png',
    false,
    18,
    '{"linkedin":"#","github":"#","instagram":"https://instagram.com/gdgoc.unm"}'::jsonb,
    true
);
INSERT INTO core_team (
    name, role, division, sub_role, badge_color, image_url, is_lead, order_index, socials, is_active
) VALUES (
    'Salsabilah',
    'Event Planner',
    'Event Management',
    'Event Planner',
    'red',
    'assets/images/team/em-salsabilah.png',
    false,
    19,
    '{"linkedin":"#","github":"#","instagram":"https://instagram.com/gdgoc.unm"}'::jsonb,
    true
);
INSERT INTO core_team (
    name, role, division, sub_role, badge_color, image_url, is_lead, order_index, socials, is_active
) VALUES (
    'Firson Siwan Ta''gan',
    'Event Registration',
    'Event Management',
    'Event Registration',
    'red',
    'assets/images/team/em-firson.png',
    false,
    20,
    '{"linkedin":"#","github":"#","instagram":"https://instagram.com/gdgoc.unm"}'::jsonb,
    true
);
INSERT INTO core_team (
    name, role, division, sub_role, badge_color, image_url, is_lead, order_index, socials, is_active
) VALUES (
    'Mustamin',
    'Event Registration',
    'Event Management',
    'Event Registration',
    'red',
    'assets/images/team/em-mustamin.png',
    false,
    21,
    '{"linkedin":"#","github":"#","instagram":"https://instagram.com/gdgoc.unm"}'::jsonb,
    true
);
INSERT INTO core_team (
    name, role, division, sub_role, badge_color, image_url, is_lead, order_index, socials, is_active
) VALUES (
    'Andhini Pratiwi Djuma',
    'Event Registration',
    'Event Management',
    'Event Registration',
    'red',
    'assets/images/team/em-andhini.png',
    false,
    22,
    '{"linkedin":"#","github":"#","instagram":"https://instagram.com/gdgoc.unm"}'::jsonb,
    true
);
INSERT INTO core_team (
    name, role, division, sub_role, badge_color, image_url, is_lead, order_index, socials, is_active
) VALUES (
    'Muh. Rafli Rafsanjani',
    'Graphic Design',
    'Branding & Design',
    'Graphic Design',
    'blue',
    'assets/images/team/bd-rafli.png',
    false,
    23,
    '{"linkedin":"#","github":"#","instagram":"https://instagram.com/gdgoc.unm"}'::jsonb,
    true
);
INSERT INTO core_team (
    name, role, division, sub_role, badge_color, image_url, is_lead, order_index, socials, is_active
) VALUES (
    'Zakharia Tangke Timbang',
    'Graphic Design',
    'Branding & Design',
    'Graphic Design',
    'blue',
    'assets/images/team/bd-zakharia.png',
    false,
    24,
    '{"linkedin":"#","github":"#","instagram":"https://instagram.com/gdgoc.unm"}'::jsonb,
    true
);
INSERT INTO core_team (
    name, role, division, sub_role, badge_color, image_url, is_lead, order_index, socials, is_active
) VALUES (
    'Muhammad Rahyan Noorfauzan',
    'Graphic Design',
    'Branding & Design',
    'Graphic Design',
    'blue',
    'assets/images/team/bd-rahyan.png',
    false,
    25,
    '{"linkedin":"#","github":"#","instagram":"https://instagram.com/gdgoc.unm"}'::jsonb,
    true
);
INSERT INTO core_team (
    name, role, division, sub_role, badge_color, image_url, is_lead, order_index, socials, is_active
) VALUES (
    'Juhariah Ningrum',
    'Copywriting & Social Media',
    'Branding & Design',
    'Copywriting & Social Media',
    'blue',
    'assets/images/team/bd-juhariah.png',
    false,
    26,
    '{"linkedin":"#","github":"#","instagram":"https://instagram.com/gdgoc.unm"}'::jsonb,
    true
);
INSERT INTO core_team (
    name, role, division, sub_role, badge_color, image_url, is_lead, order_index, socials, is_active
) VALUES (
    'Syahrur Adhe Pratama Putra',
    'Copywriting & Social Media',
    'Branding & Design',
    'Copywriting & Social Media',
    'blue',
    'assets/images/team/bd-syahrur.png',
    false,
    27,
    '{"linkedin":"#","github":"#","instagram":"https://instagram.com/gdgoc.unm"}'::jsonb,
    true
);
INSERT INTO core_team (
    name, role, division, sub_role, badge_color, image_url, is_lead, order_index, socials, is_active
) VALUES (
    'Wulan Zahra',
    'Content Creator',
    'Branding & Design',
    'Content Creator',
    'blue',
    'assets/images/team/bd-wulan.png',
    false,
    28,
    '{"linkedin":"#","github":"#","instagram":"https://instagram.com/gdgoc.unm"}'::jsonb,
    true
);
INSERT INTO core_team (
    name, role, division, sub_role, badge_color, image_url, is_lead, order_index, socials, is_active
) VALUES (
    'Andi Fahril S',
    'Videographer',
    'Branding & Design',
    'Videographer',
    'blue',
    'assets/images/team/bd-fahril.png',
    false,
    29,
    '{"linkedin":"#","github":"#","instagram":"https://instagram.com/gdgoc.unm"}'::jsonb,
    true
);
