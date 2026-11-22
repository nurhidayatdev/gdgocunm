/**
 * Google Developer Groups On Campus - Universitas Negeri Makassar (GDGoC UNM)
 * Supabase Client Integration Module
 * 
 * Provides dynamic data fetching with automatic local fallback for zero downtime.
 */

(function (window) {
    'use strict';

    // ========================================================================
    // Supabase Project Configuration
    // Paste your Supabase Project URL and Public Anon Key below
    // ========================================================================
    const SUPABASE_CONFIG = {
        url: '', // e.g. 'https://xyzcompany.supabase.co'
        anonKey: '' // e.g. 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'
    };

    let supabaseClient = null;

    /**
     * Initialize Supabase SDK client if credentials are configured
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
        if (window.LEARNING_PATHS && Array.isArray(window.LEARNING_PATHS)) {
            return window.LEARNING_PATHS;
        }
        if (window.GDG_DATA && Array.isArray(window.GDG_DATA.tracks)) {
            return window.GDG_DATA.tracks;
        }
        return [];
    }

    /**
     * Fallback to static team from window.GDG_DATA
     */
    function getLocalTeam() {
        if (window.GDG_DATA && Array.isArray(window.GDG_DATA.team)) {
            return window.GDG_DATA.team;
        }
        return [];
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
    // Public API Methods
    // ========================================================================
    const SupabaseService = {
        /**
         * Fetch all active learning paths with their timeline modules
         * @returns {Promise<Array>} List of learning path objects
         */
        async getLearningPaths() {
            const client = initSupabase();
            if (!client) {
                return getLocalTracks();
            }

            try {
                // Fetch tracks and modules
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
                    console.warn('[GDG Supabase] Tracks fetch failed or empty, using local data fallback.');
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
                console.warn('[GDG Supabase] Query error, falling back to local tracks:', err);
                return getLocalTracks();
            }
        },

        /**
         * Fetch detail of a single track by ID
         * @param {string} trackId 
         * @returns {Promise<Object|null>}
         */
        async getLearningPathDetail(trackId) {
            const allTracks = await this.getLearningPaths();
            return allTracks.find(t => t.id.toLowerCase() === trackId.toLowerCase()) || null;
        },

        /**
         * Fetch all active core team members ordered by order_index
         * @returns {Promise<Array>} List of team member objects
         */
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
                    console.warn('[GDG Supabase] Core Team fetch failed or empty, using local data fallback.');
                    return getLocalTeam();
                }

                return data.map(mapTeamRow);
            } catch (err) {
                console.warn('[GDG Supabase] Query error, falling back to local team:', err);
                return getLocalTeam();
            }
        },

        /**
         * Check if Supabase connection is currently active
         */
        isConfigured() {
            return Boolean(
                SUPABASE_CONFIG.url &&
                SUPABASE_CONFIG.anonKey &&
                SUPABASE_CONFIG.url !== 'YOUR_SUPABASE_URL'
            );
        },

        /**
         * Configure credentials dynamically
         */
        configure(url, anonKey) {
            SUPABASE_CONFIG.url = url;
            SUPABASE_CONFIG.anonKey = anonKey;
            supabaseClient = null;
            return initSupabase();
        }
    };

    // Expose to global window
    window.GDG_SUPABASE = SupabaseService;

})(window);
