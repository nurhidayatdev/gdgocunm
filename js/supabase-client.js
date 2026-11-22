/**
 * Google Developer Groups On Campus - Universitas Negeri Makassar (GDGoC UNM)
 * Supabase Client Integration Module (with Full CRUD Support)
 * 
 * Provides dynamic data fetching and mutation with automatic fallback for zero downtime.
 */

(function (window) {
    'use strict';

    // ========================================================================
    // Supabase Project Configuration
    // ========================================================================
    let SUPABASE_CONFIG = {
        url: '', // e.g. 'https://xyzcompany.supabase.co'
        anonKey: '' // e.g. 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'
    };

    // Load persisted credentials from localStorage if available
    try {
        const stored = localStorage.getItem('GDG_SUPABASE_CONFIG');
        if (stored) {
            const parsed = JSON.parse(stored);
            if (parsed.url && parsed.anonKey) {
                SUPABASE_CONFIG.url = parsed.url;
                SUPABASE_CONFIG.anonKey = parsed.anonKey;
            }
        }
    } catch (e) {
        // Ignore localStorage error
    }

    let supabaseClient = null;

    /**
     * Initialize Supabase SDK client
     */
    function initSupabase() {
        if (supabaseClient) return supabaseClient;

        const isConfigured = Boolean(
            SUPABASE_CONFIG.url &&
            SUPABASE_CONFIG.anonKey &&
            SUPABASE_CONFIG.url !== 'YOUR_SUPABASE_URL' &&
            SUPABASE_CONFIG.anonKey !== 'YOUR_SUPABASE_ANON_KEY'
        );

        if (!isConfigured) {
            return null;
        }

        if (typeof window.supabase !== 'undefined' && typeof window.supabase.createClient === 'function') {
            try {
                supabaseClient = window.supabase.createClient(SUPABASE_CONFIG.url, SUPABASE_CONFIG.anonKey);
                return supabaseClient;
            } catch (err) {
                console.warn('[GDG Supabase] Initialization error:', err);
                return null;
            }
        }

        return null;
    }

    /**
     * Fallback to static tracks from window.GDG_DATA or window.LEARNING_PATHS
     */
    function getLocalTracks() {
        try {
            const cached = localStorage.getItem('GDG_LOCAL_TRACKS');
            if (cached) {
                return JSON.parse(cached);
            }
        } catch (e) {}

        if (window.LEARNING_PATHS && Array.isArray(window.LEARNING_PATHS)) {
            return JSON.parse(JSON.stringify(window.LEARNING_PATHS));
        }
        if (window.GDG_DATA && Array.isArray(window.GDG_DATA.tracks)) {
            return JSON.parse(JSON.stringify(window.GDG_DATA.tracks));
        }
        return [];
    }

    function saveLocalTracks(tracks) {
        try {
            localStorage.setItem('GDG_LOCAL_TRACKS', JSON.stringify(tracks));
        } catch (e) {}
    }

    /**
     * Fallback to static team from window.GDG_DATA
     */
    function getLocalTeam() {
        try {
            const cached = localStorage.getItem('GDG_LOCAL_TEAM');
            if (cached) {
                return JSON.parse(cached);
            }
        } catch (e) {}

        if (window.GDG_DATA && Array.isArray(window.GDG_DATA.team)) {
            return JSON.parse(JSON.stringify(window.GDG_DATA.team));
        }
        return [];
    }

    function saveLocalTeam(team) {
        try {
            localStorage.setItem('GDG_LOCAL_TEAM', JSON.stringify(team));
        } catch (e) {}
    }

    /**
     * Map Supabase learning_paths row + modules to frontend format
     */
    function mapTrackRow(row, modules = []) {
        const sortedModules = (modules || []).sort((a, b) => (a.order_index || 0) - (b.order_index || 0));
        
        return {
            id: row.id,
            title: row.title,
            shortTitle: row.short_title || row.title,
            category: row.category || 'General',
            color: row.color || 'blue',
            whatsappUrl: row.whatsapp_url || 'https://chat.whatsapp.com/',
            image: row.image_url || `assets/images/tracks/track-${row.id}.png`,
            desc: row.description || '',
            objective: row.objective || '',
            longDesc: row.long_description || '',
            techStack: Array.isArray(row.tech_stack) ? row.tech_stack : [],
            outcomes: {
                capstone: row.capstone_title || '',
                learn: row.outcomes_learn || '',
                prereq: row.outcomes_prereq || ''
            },
            specs: {
                sessions: row.spec_sessions || '5 Sessions',
                level: row.spec_level || 'Beginner Friendly',
                duration: row.spec_duration || '5 Weeks',
                cohort: row.spec_cohort || 'Cohort 2026/2027'
            },
            instructor: {
                name: row.instructor_name || '',
                role: row.instructor_role || '',
                division: row.instructor_division || '',
                image: row.instructor_image_url || '',
                quote: row.instructor_quote || '',
                socials: row.instructor_socials || { linkedin: '#', instagram: '#', github: '#' }
            },
            timeline: sortedModules.map(m => ({
                id: m.id,
                num: m.session_num,
                title: m.title,
                objectives: m.objectives,
                materials: m.materials,
                assignment: m.assignment
            }))
        };
    }

    /**
     * Map Supabase core_team row to frontend format
     */
    function mapTeamRow(row) {
        return {
            id: row.id,
            name: row.name,
            role: row.role,
            division: row.division,
            subRole: row.sub_role || 'Member',
            color: row.badge_color || 'blue',
            image: row.image_url || '',
            isLead: Boolean(row.is_lead),
            socials: row.socials || { linkedin: '#', github: '#', instagram: '#' }
        };
    }

    // ========================================================================
    // Service API
    // ========================================================================
    const SupabaseService = {
        getConfig() {
            return { ...SUPABASE_CONFIG };
        },

        saveConfig(url, anonKey) {
            SUPABASE_CONFIG.url = (url || '').trim();
            SUPABASE_CONFIG.anonKey = (anonKey || '').trim();
            try {
                localStorage.setItem('GDG_SUPABASE_CONFIG', JSON.stringify(SUPABASE_CONFIG));
            } catch (e) {}
            supabaseClient = null;
            return initSupabase();
        },

        isConfigured() {
            return Boolean(
                SUPABASE_CONFIG.url &&
                SUPABASE_CONFIG.anonKey &&
                SUPABASE_CONFIG.url !== 'YOUR_SUPABASE_URL'
            );
        },

        async testConnection() {
            const client = initSupabase();
            if (!client) {
                return { success: false, message: 'Supabase credentials are not configured.' };
            }
            try {
                const { data, error } = await client.from('core_team').select('count', { count: 'exact', head: true });
                if (error) {
                    return { success: false, message: error.message };
                }
                return { success: true, message: 'Connection successful!' };
            } catch (err) {
                return { success: false, message: err.message || 'Unknown network error' };
            }
        },

        // --------------------------------------------------------------------
        // LEARNING PATHS CRUD
        // --------------------------------------------------------------------
        async getLearningPaths() {
            const client = initSupabase();
            if (!client) {
                return getLocalTracks();
            }

            try {
                const [tracksRes, modulesRes] = await Promise.all([
                    client
                        .from('learning_paths')
                        .select('*')
                        .eq('is_active', true)
                        .order('order_index', { ascending: true }),
                    client
                        .from('learning_path_modules')
                        .select('*')
                        .order('order_index', { ascending: true })
                ]);

                if (tracksRes.error || !tracksRes.data || tracksRes.data.length === 0) {
                    console.warn('[GDG Supabase] Fallback to local tracks.');
                    return getLocalTracks();
                }

                const modulesByTrack = {};
                if (modulesRes.data) {
                    modulesRes.data.forEach(mod => {
                        if (!modulesByTrack[mod.track_id]) modulesByTrack[mod.track_id] = [];
                        modulesByTrack[mod.track_id].push(mod);
                    });
                }

                return tracksRes.data.map(row => mapTrackRow(row, modulesByTrack[row.id] || []));
            } catch (err) {
                console.warn('[GDG Supabase] Fallback to local tracks:', err);
                return getLocalTracks();
            }
        },

        async saveLearningPath(trackData) {
            const client = initSupabase();
            const payload = {
                id: trackData.id,
                title: trackData.title,
                short_title: trackData.shortTitle || trackData.title,
                category: trackData.category,
                color: trackData.color || 'blue',
                whatsapp_url: trackData.whatsappUrl,
                image_url: trackData.image,
                description: trackData.desc,
                objective: trackData.objective,
                long_description: trackData.longDesc,
                tech_stack: trackData.techStack || [],
                capstone_title: trackData.outcomes?.capstone || '',
                capstone_description: trackData.outcomes?.capstone || '',
                outcomes_learn: trackData.outcomes?.learn || '',
                outcomes_prereq: trackData.outcomes?.prereq || '',
                spec_sessions: trackData.specs?.sessions || '5 Sessions',
                spec_level: trackData.specs?.level || 'Beginner Friendly',
                spec_duration: trackData.specs?.duration || '5 Weeks',
                spec_cohort: trackData.specs?.cohort || 'Cohort 2026/2027',
                instructor_name: trackData.instructor?.name || '',
                instructor_role: trackData.instructor?.role || '',
                instructor_division: trackData.instructor?.division || '',
                instructor_image_url: trackData.instructor?.image || '',
                instructor_quote: trackData.instructor?.quote || '',
                instructor_socials: trackData.instructor?.socials || { linkedin: '#', instagram: '#', github: '#' },
                order_index: trackData.order_index || 99,
                is_active: true
            };

            if (client) {
                const { error } = await client.from('learning_paths').upsert(payload);
                if (error) throw error;
            }

            // Also update local cache
            const tracks = getLocalTracks();
            const existingIdx = tracks.findIndex(t => t.id === trackData.id);
            if (existingIdx >= 0) {
                tracks[existingIdx] = { ...tracks[existingIdx], ...trackData };
            } else {
                tracks.push(trackData);
            }
            saveLocalTracks(tracks);
            return trackData;
        },

        async deleteLearningPath(trackId) {
            const client = initSupabase();
            if (client) {
                const { error } = await client.from('learning_paths').delete().eq('id', trackId);
                if (error) throw error;
            }
            const tracks = getLocalTracks().filter(t => t.id !== trackId);
            saveLocalTracks(tracks);
            return true;
        },

        // --------------------------------------------------------------------
        // MODULES (SYLLABUS SESSIONS) CRUD
        // --------------------------------------------------------------------
        async saveModule(trackId, moduleData) {
            const client = initSupabase();
            if (client) {
                const payload = {
                    track_id: trackId,
                    session_num: moduleData.num,
                    title: moduleData.title,
                    objectives: moduleData.objectives,
                    materials: moduleData.materials,
                    assignment: moduleData.assignment,
                    order_index: parseInt(moduleData.num, 10) || 1
                };
                if (moduleData.id) payload.id = moduleData.id;
                const { error } = await client.from('learning_path_modules').upsert(payload);
                if (error) throw error;
            }

            // Update local tracks cache
            const tracks = getLocalTracks();
            const track = tracks.find(t => t.id === trackId);
            if (track) {
                if (!track.timeline) track.timeline = [];
                const mIdx = track.timeline.findIndex(m => m.num === moduleData.num);
                if (mIdx >= 0) {
                    track.timeline[mIdx] = { ...track.timeline[mIdx], ...moduleData };
                } else {
                    track.timeline.push(moduleData);
                }
                saveLocalTracks(tracks);
            }
            return moduleData;
        },

        async deleteModule(trackId, sessionNum) {
            const client = initSupabase();
            if (client) {
                const { error } = await client
                    .from('learning_path_modules')
                    .delete()
                    .eq('track_id', trackId)
                    .eq('session_num', sessionNum);
                if (error) throw error;
            }
            const tracks = getLocalTracks();
            const track = tracks.find(t => t.id === trackId);
            if (track && track.timeline) {
                track.timeline = track.timeline.filter(m => m.num !== sessionNum);
                saveLocalTracks(tracks);
            }
            return true;
        },

        // --------------------------------------------------------------------
        // CORE TEAM CRUD
        // --------------------------------------------------------------------
        async getCoreTeam() {
            const client = initSupabase();
            if (!client) {
                return getLocalTeam();
            }

            try {
                const { data, error } = await client
                    .from('core_team')
                    .select('*')
                    .eq('is_active', true)
                    .order('order_index', { ascending: true });

                if (error || !data || data.length === 0) {
                    return getLocalTeam();
                }

                return data.map(mapTeamRow);
            } catch (err) {
                return getLocalTeam();
            }
        },

        async saveTeamMember(memberData) {
            const client = initSupabase();
            const isLead = memberData.role === 'Lead' || memberData.role === 'Co-Lead' || memberData.isLead === true || memberData.subRole === 'Lead Organizer';

            const payload = {
                name: memberData.name,
                role: memberData.role,
                division: memberData.division,
                sub_role: memberData.subRole || 'Member',
                badge_color: memberData.color || 'blue',
                image_url: memberData.image || '',
                is_lead: isLead,
                socials: memberData.socials || { linkedin: '#', github: '#', instagram: '#' },
                is_active: memberData.isActive !== false
            };
            if (memberData.id) payload.id = memberData.id;

            let savedId = memberData.id;
            if (client) {
                const { data, error } = await client.from('core_team').upsert(payload).select().single();
                if (error) throw error;
                if (data && data.id) savedId = data.id;
            }

            // Update local team
            const team = getLocalTeam();
            const newMember = { ...memberData, id: savedId || 'temp-' + Date.now() };
            const mIdx = team.findIndex(m => (m.id && m.id === memberData.id) || (m.name === memberData.name && m.role === memberData.role));
            if (mIdx >= 0) {
                team[mIdx] = { ...team[mIdx], ...newMember };
            } else {
                team.push(newMember);
            }
            saveLocalTeam(team);
            return newMember;
        },

        async deleteTeamMember(memberId, memberName = '') {
            const client = initSupabase();
            if (client && memberId && !String(memberId).startsWith('temp-')) {
                const { error } = await client.from('core_team').delete().eq('id', memberId);
                if (error) throw error;
            }
            const team = getLocalTeam().filter(m => {
                if (memberId && m.id === memberId) return false;
                if (memberName && m.name === memberName) return false;
                return true;
            });
            saveLocalTeam(team);
            return true;
        }
    };

    window.GDG_SUPABASE = SupabaseService;

})(window);
