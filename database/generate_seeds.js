const fs = require('fs');
const path = require('path');

function escapeSql(str) {
  if (str === null || str === undefined) return 'NULL';
  return "'" + String(str).replace(/'/g, "''") + "'";
}

function escapeArray(arr) {
  if (!arr || !Array.isArray(arr) || arr.length === 0) return "'{}'";
  const escapedElements = arr.map(item => '"' + String(item).replace(/"/g, '\\"') + '"');
  return "ARRAY['" + arr.map(item => String(item).replace(/'/g, "''")).join("', '") + "']::TEXT[]";
}

function escapeJson(obj) {
  if (!obj) return "'{}'::jsonb";
  return "'" + JSON.stringify(obj).replace(/'/g, "''") + "'::jsonb";
}

// 1. Generate seed_learning_paths.sql
const html = fs.readFileSync(path.join(__dirname, '..', 'learning-path.html'), 'utf8');
const start = html.indexOf('let LEARNING_PATHS = [');
const end = html.indexOf('];', start) + 2;
const pathsStr = html.substring(start, end);
const paths = eval(pathsStr + '; LEARNING_PATHS;');

let lpSql = `-- ========================================================================
-- Seed Data: learning_paths and learning_path_modules
-- Auto-generated from learning-path.html
-- Total Tracks: ${paths.length}
-- ========================================================================

-- Clean up existing track records
TRUNCATE TABLE learning_path_modules CASCADE;
TRUNCATE TABLE learning_paths CASCADE;

-- Insert Learning Paths
`;

paths.forEach((p, idx) => {
  const orderIdx = idx + 1;
  const techStackSql = escapeArray(p.techStack);
  const instructorSocialsSql = escapeJson(p.instructor && p.instructor.socials ? p.instructor.socials : { linkedin: '#', instagram: '#', github: '#' });
  
  lpSql += `INSERT INTO learning_paths (
    id, title, short_title, category, color, image_url, whatsapp_url,
    description, objective, long_description, tech_stack,
    capstone_title, capstone_description, outcomes_learn, outcomes_prereq,
    spec_sessions, spec_level, spec_duration, spec_cohort,
    instructor_name, instructor_role, instructor_division, instructor_image_url, instructor_quote, instructor_socials,
    order_index, is_active
) VALUES (
    ${escapeSql(p.id)},
    ${escapeSql(p.title)},
    ${escapeSql(p.shortTitle)},
    ${escapeSql(p.category)},
    ${escapeSql(p.color)},
    ${escapeSql(p.image)},
    ${escapeSql(p.whatsappUrl || 'https://chat.whatsapp.com/')},
    ${escapeSql(p.desc)},
    ${escapeSql(p.objective)},
    ${escapeSql(p.longDesc)},
    ${techStackSql},
    ${escapeSql(p.outcomes ? p.outcomes.capstone : '')},
    ${escapeSql(p.outcomes ? p.outcomes.capstone : '')},
    ${escapeSql(p.outcomes ? p.outcomes.learn : '')},
    ${escapeSql(p.outcomes ? p.outcomes.prereq : '')},
    ${escapeSql(p.specs ? p.specs.sessions : '5 Sessions')},
    ${escapeSql(p.specs ? p.specs.level : 'Beginner Friendly')},
    ${escapeSql(p.specs ? p.specs.duration : '5 Weeks')},
    ${escapeSql(p.specs ? p.specs.cohort : 'Cohort 2026/2027')},
    ${escapeSql(p.instructor ? p.instructor.name : '')},
    ${escapeSql(p.instructor ? p.instructor.role : '')},
    ${escapeSql(p.instructor ? p.instructor.division : '')},
    ${escapeSql(p.instructor ? p.instructor.image : '')},
    ${escapeSql(p.instructor ? p.instructor.quote : '')},
    ${instructorSocialsSql},
    ${orderIdx},
    true
);\n\n`;

  // Insert modules
  if (p.timeline && Array.isArray(p.timeline)) {
    p.timeline.forEach((item, mIdx) => {
      lpSql += `INSERT INTO learning_path_modules (
    track_id, session_num, title, objectives, materials, assignment, order_index
) VALUES (
    ${escapeSql(p.id)},
    ${escapeSql(item.num)},
    ${escapeSql(item.title)},
    ${escapeSql(item.objectives)},
    ${escapeSql(item.materials)},
    ${escapeSql(item.assignment)},
    ${mIdx + 1}
);\n`;
    });
    lpSql += '\n';
  }
});

fs.writeFileSync(path.join(__dirname, 'seed_learning_paths.sql'), lpSql, 'utf8');
console.log('Successfully generated database/seed_learning_paths.sql');

// 2. Generate seed_core_team.sql
const dataContent = fs.readFileSync(path.join(__dirname, '..', 'js', 'data.js'), 'utf8');
const gdgData = eval(dataContent + '; GDG_DATA;');
const team = gdgData.team || [];

let teamSql = `-- ========================================================================
-- Seed Data: core_team
-- Auto-generated from js/data.js
-- Total Members: ${team.length}
-- ========================================================================

-- Clean up existing team records
TRUNCATE TABLE core_team CASCADE;

`;

team.forEach((m, idx) => {
  const isLead = m.role === 'Lead' || m.role === 'Co-Lead' || m.isLead === true || m.subRole === 'Lead Organizer';
  const socialsSql = escapeJson(m.socials || { linkedin: '#', instagram: '#', github: '#' });
  
  teamSql += `INSERT INTO core_team (
    name, role, division, sub_role, badge_color, image_url, is_lead, order_index, socials, is_active
) VALUES (
    ${escapeSql(m.name)},
    ${escapeSql(m.role)},
    ${escapeSql(m.division)},
    ${escapeSql(m.subRole || 'Member')},
    ${escapeSql(m.color || 'blue')},
    ${escapeSql(m.image)},
    ${isLead ? 'true' : 'false'},
    ${idx + 1},
    ${socialsSql},
    true
);\n`;
});

fs.writeFileSync(path.join(__dirname, 'seed_core_team.sql'), teamSql, 'utf8');
console.log('Successfully generated database/seed_core_team.sql');
