/**
 * Google Developer Groups On Campus - Universitas Negeri Makassar (GDGoC UNM)
 * Supabase Client Integration Module (with Full CRUD Support)
 * 
 * Provides dynamic data fetching and mutation with automatic fallback for zero downtime.
 */

(function (window) {
    'use strict';

    // ========================================================================
    // Supabase Project Configuration (Directly Configured)
    // ========================================================================
    const SUPABASE_CONFIG = {
        url: 'https://ryerpuyrfehlfhoqhkxv.supabase.co',
        anonKey: 'sb_publishable_TNQ71Qk98wTM8LOl6UApVg_qSYAytP6'
    };

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
                const parsed = JSON.parse(cached);
                if (Array.isArray(parsed) && parsed.length > 0) {
                    return parsed;
                }
            }
        } catch (e) {}

        const globalData = (typeof GDG_DATA !== 'undefined') ? GDG_DATA : (typeof window !== 'undefined' ? window.GDG_DATA : null);
        let rawTracks = [];

        if (globalData && Array.isArray(globalData.tracks) && globalData.tracks.length > 0) {
            rawTracks = globalData.tracks;
        } else if (typeof window !== 'undefined' && window.LEARNING_PATHS && Array.isArray(window.LEARNING_PATHS) && window.LEARNING_PATHS.length > 0) {
            rawTracks = window.LEARNING_PATHS;
        }

        const normalized = JSON.parse(JSON.stringify(rawTracks));
        normalized.forEach((track, idx) => {
            if (!track.timeline || !Array.isArray(track.timeline) || track.timeline.length === 0) {
                if (track.syllabus && Array.isArray(track.syllabus)) {
                    track.timeline = track.syllabus.map((s, sIdx) => ({
                        num: '0' + (sIdx + 1),
                        title: typeof s === 'string' ? s : (s.title || `Session #${sIdx + 1}`),
                        objectives: typeof s === 'object' && s.objectives ? s.objectives : `Master core competencies in ${track.title}`,
                        materials: typeof s === 'object' && s.materials ? s.materials : 'Hands-on practice & guidelines',
                        assignment: typeof s === 'object' && s.assignment ? s.assignment : 'Mini project milestone'
                    }));
                } else {
                    track.timeline = [
                        { num: '01', title: 'Foundations & Tooling', objectives: 'Introduction & Environment Setup', materials: 'Tooling & core basics', assignment: 'Setup verification' }
                    ];
                }
            }
            const defaultLeads = {
                'uiux': { name: 'Andi Muh. Yusran Haris', role: 'UI/UX Tech Lead', division: 'Research & Development' },
                'frontend': { name: 'Muhammad Ghazi Saputra', role: 'Front-End Tech Lead', division: 'Research & Development' },
                'backend': { name: 'Muh Raihan Nur Taufiq', role: 'Back-End Tech Lead', division: 'Research & Development' },
                'data-science': { name: 'Namira Sarip', role: 'Data Science Tech Lead', division: 'Research & Development' },
                'ai-ml': { name: 'Raynato Lienardy', role: 'AI / ML Tech Lead', division: 'Research & Development' },
                'cyber-security': { name: 'Shaquille Rashaun Sahl Tamrin', role: 'Cybersecurity Tech Lead', division: 'Research & Development' },
                'robotics': { name: 'Alfira Resky Pratiwi', role: 'Robotics Tech Lead', division: 'Research & Development' }
            };
            if (!track.instructor || !track.instructor.name || track.instructor.name === 'GDGoC UNM Tech Lead') {
                track.instructor = defaultLeads[track.id] || {
                    name: 'GDGoC UNM Tech Lead',
                    role: `${track.title} Lead`,
                    division: 'Research & Development',
                    quote: 'Guided peer-to-peer cohorts for real-world tech readiness.'
                };
            }
        });

        return normalized;
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
                const parsed = JSON.parse(cached);
                if (Array.isArray(parsed) && parsed.length > 0) {
                    return parsed;
                }
            }
        } catch (e) {}

        const globalData = (typeof GDG_DATA !== 'undefined') ? GDG_DATA : (typeof window !== 'undefined' ? window.GDG_DATA : null);
        if (globalData && Array.isArray(globalData.team) && globalData.team.length > 0) {
            return JSON.parse(JSON.stringify(globalData.team));
        }

        return [];
    }

    function saveLocalTeam(team) {
        try {
            localStorage.setItem('GDG_LOCAL_TEAM', JSON.stringify(team));
        } catch (e) {}
    }

    /**
     * Fallback to static gallery from window.GDG_DATA.gallery or localStorage
     */
    function getLocalGallery() {
        try {
            const cached = localStorage.getItem('GDG_LOCAL_GALLERY');
            if (cached) {
                const parsed = JSON.parse(cached);
                if (Array.isArray(parsed) && parsed.length > 0) {
                    return parsed;
                }
            }
        } catch (e) {}

        const globalData = (typeof GDG_DATA !== 'undefined') ? GDG_DATA : (typeof window !== 'undefined' ? window.GDG_DATA : null);
        if (globalData && Array.isArray(globalData.gallery) && globalData.gallery.length > 0) {
            return JSON.parse(JSON.stringify(globalData.gallery));
        }

        return [];
    }

    function saveLocalGallery(gallery) {
        try {
            localStorage.setItem('GDG_LOCAL_GALLERY', JSON.stringify(gallery));
        } catch (e) {}
    }

    function mapGalleryRow(row) {
        let images = [];
        let dateVal = row.date || '';
        let descVal = row.description || '';

        // Check if images is provided directly by column
        if (Array.isArray(row.images)) {
            images = row.images;
        } else if (typeof row.images === 'string' && row.images.trim().startsWith('[')) {
            try {
                images = JSON.parse(row.images);
            } catch (e) {}
        }

        // Backward compatibility: check if metadata was encoded in description (if images/date column was missing in DB)
        if (typeof descVal === 'string' && descVal.includes('<!--GDG_ALBUM_META:')) {
            const metaMatch = descVal.match(/<!--GDG_ALBUM_META:(.*?)-->/s);
            if (metaMatch && metaMatch[1]) {
                try {
                    const parsedMeta = JSON.parse(metaMatch[1]);
                    if (Array.isArray(parsedMeta.images) && parsedMeta.images.length > 0 && images.length === 0) {
                        images = parsedMeta.images;
                    }
                    if (parsedMeta.date && !dateVal) {
                        dateVal = parsedMeta.date;
                    }
                } catch (e) {}
                descVal = descVal.replace(/<!--GDG_ALBUM_META:.*?-->/s, '').trim();
            }
        }

        // Fallback if images array is still empty
        if (!images || images.length === 0) {
            if (row.image_url) {
                images = [row.image_url];
            } else if (row.image) {
                images = [row.image];
            }
        }
        const cover = row.image_url || row.image || (images.length > 0 ? images[0] : '');

        return {
            id: row.id,
            title: row.title || 'GDGoC UNM Activity',
            image: cover,
            images: images,
            date: dateVal,
            location: row.location || descVal,
            desc: descVal,
            createdAt: row.created_at
        };
    }

    /**
     * Fallback to static events from window.GDG_DATA.events or localStorage
     */
    function getLocalEvents() {
        try {
            const cached = localStorage.getItem('GDG_LOCAL_EVENTS');
            if (cached) {
                const parsed = JSON.parse(cached);
                if (Array.isArray(parsed) && parsed.length > 0) {
                    return parsed;
                }
            }
        } catch (e) {}

        const globalData = (typeof GDG_DATA !== 'undefined') ? GDG_DATA : (typeof window !== 'undefined' ? window.GDG_DATA : null);
        if (globalData && Array.isArray(globalData.events) && globalData.events.length > 0) {
            return JSON.parse(JSON.stringify(globalData.events));
        }

        return [];
    }

    function saveLocalEvents(events) {
        try {
            localStorage.setItem('GDG_LOCAL_EVENTS', JSON.stringify(events));
        } catch (e) {}
    }

    function getEventAutoStatus(row) {
        if (!row) return 'Upcoming';
        const rawDate = row.raw_date || row.rawDate;
        const rawTime = row.raw_time || row.rawTime;
        if (rawDate) {
            const timeStr = rawTime ? (rawTime.length === 5 ? rawTime + ':00' : rawTime) : '23:59:59';
            const dt = new Date(`${rawDate}T${timeStr}`);
            if (!isNaN(dt.getTime())) {
                return dt >= new Date() ? 'Upcoming' : 'Completed';
            }
        }
        if (row.date) {
            const parsed = new Date(row.date);
            if (!isNaN(parsed.getTime())) {
                parsed.setHours(23, 59, 59, 999);
                return parsed >= new Date() ? 'Upcoming' : 'Completed';
            }
        }
        return row.status || 'Upcoming';
    }

    function mapEventRow(row) {
        const autoStatus = getEventAutoStatus(row);
        let speakers = [];
        if (Array.isArray(row.speakers)) {
            speakers = row.speakers;
        } else if (typeof row.speakers === 'string' && row.speakers.trim().startsWith('[')) {
            try {
                speakers = JSON.parse(row.speakers);
            } catch (e) {}
        }
        if (!speakers || speakers.length === 0) {
            if (row.speaker) {
                speakers = [{ name: row.speaker, role: row.speaker_role || row.speakerRole || 'Speaker' }];
            }
        }

        const primarySpeaker = speakers[0]?.name || row.speaker || '';
        const primarySpeakerRole = speakers[0]?.role || row.speaker_role || row.speakerRole || 'Speaker';

        return {
            id: row.id,
            title: row.title || 'GDGoC UNM Event',
            poster: row.poster_url || 'assets/images/events/weekly-class-2.jpg',
            location: row.location || 'Offline / Online',
            date: row.date || '',
            time: row.time || '',
            rawDate: row.raw_date || '',
            rawTime: row.raw_time || '',
            speaker: primarySpeaker,
            speakerRole: primarySpeakerRole,
            speakers: speakers,
            moderator: row.moderator || '',
            moderatorRole: row.moderator_role || 'Moderator',
            registrationUrl: row.registration_url || '#',
            status: autoStatus,
            color: row.badge_color || 'blue',
            createdAt: row.created_at
        };
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

        async saveLearningPath(trackData, originalId = '') {
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
                try {
                    if (originalId && originalId === trackData.id) {
                        const { error } = await client.from('learning_paths').update(payload).eq('id', originalId);
                        if (error) await client.from('learning_paths').upsert(payload);
                    } else {
                        await client.from('learning_paths').upsert(payload);
                    }
                } catch (err) {
                    console.warn('[Supabase Track Save]', err);
                }
            }

            // Update local cache in-place (NEVER create duplicate)
            const tracks = getLocalTracks();
            const existingIdx = tracks.findIndex(t => (originalId && t.id === originalId) || t.id === trackData.id);
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
            let imagesToDelete = [];

            const tracks = getLocalTracks();
            const existingTrack = tracks.find(t => t.id === trackId);
            if (existingTrack) {
                if (existingTrack.image) imagesToDelete.push(existingTrack.image);
                if (existingTrack.instructor?.image) imagesToDelete.push(existingTrack.instructor.image);
            }

            if (client) {
                try {
                    const { data } = await client.from('learning_paths').select('image_url, instructor_image_url').eq('id', trackId).single();
                    if (data) {
                        if (data.image_url) imagesToDelete.push(data.image_url);
                        if (data.instructor_image_url) imagesToDelete.push(data.instructor_image_url);
                    }
                } catch (e) {}

                const { error } = await client.from('learning_paths').delete().eq('id', trackId);
                if (error) throw error;
            }

            // Cleanup storage images
            for (const img of imagesToDelete) {
                await this.deleteImageFromStorage(img);
            }

            const updatedTracks = tracks.filter(t => t.id !== trackId);
            saveLocalTracks(updatedTracks);
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

        async saveTeamMember(memberData, originalName = '') {
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
            if (memberData.id && !String(memberData.id).startsWith('temp-')) {
                payload.id = memberData.id;
            }

            // Check if replacing an existing Supabase Storage image to delete old file
            let oldImageUrl = '';
            const existingMember = getLocalTeam().find(m =>
                (memberData.id && m.id && m.id === memberData.id) ||
                (originalName && m.name === originalName) ||
                m.name === memberData.name
            );
            if (existingMember && existingMember.image) {
                oldImageUrl = existingMember.image;
            }

            let savedId = memberData.id;
            if (client) {
                try {
                    if (memberData.id && !String(memberData.id).startsWith('temp-')) {
                        const { data } = await client.from('core_team').update(payload).eq('id', memberData.id).select().single();
                        if (data && data.id) savedId = data.id;
                    } else if (originalName) {
                        const { data } = await client.from('core_team').update(payload).eq('name', originalName).select();
                        if (data && data.length > 0) {
                            savedId = data[0].id;
                        } else {
                            const insertRes = await client.from('core_team').insert(payload).select().single();
                            if (insertRes.data) savedId = insertRes.data.id;
                        }
                    } else {
                        const { data } = await client.from('core_team').insert(payload).select().single();
                        if (data) savedId = data.id;
                    }
                } catch (err) {
                    console.warn('[Supabase Team Save]', err);
                }
            }

            // If photo changed and old photo was on Supabase Storage, delete the old file
            if (oldImageUrl && payload.image_url && oldImageUrl !== payload.image_url) {
                await this.deleteImageFromStorage(oldImageUrl);
            }

            // Update local team in-place (NEVER create duplicate)
            const team = getLocalTeam();
            const newMember = { ...memberData, id: savedId || memberData.id || 'temp-' + Date.now() };
            const mIdx = team.findIndex(m => 
                (memberData.id && m.id && m.id === memberData.id) || 
                (originalName && m.name === originalName) || 
                m.name === memberData.name
            );
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
            let imageUrlToDelete = '';

            const localList = getLocalTeam();
            const target = localList.find(m => (memberId && m.id === memberId) || (memberName && m.name === memberName));
            if (target && target.image) {
                imageUrlToDelete = target.image;
            }

            if (client) {
                try {
                    if (!imageUrlToDelete && memberId && !String(memberId).startsWith('temp-')) {
                        const { data } = await client.from('core_team').select('image_url').eq('id', memberId).single();
                        if (data && data.image_url) imageUrlToDelete = data.image_url;
                    }
                } catch (e) {}

                if (memberId && !String(memberId).startsWith('temp-')) {
                    const { error } = await client.from('core_team').delete().eq('id', memberId);
                    if (error) throw error;
                }
            }

            // Delete associated file from Supabase Storage bucket
            if (imageUrlToDelete) {
                await this.deleteImageFromStorage(imageUrlToDelete);
            }

            const team = getLocalTeam().filter(m => {
                if (memberId && m.id === memberId) return false;
                if (memberName && m.name === memberName) return false;
                return true;
            });
            saveLocalTeam(team);
            return true;
        },

        // --------------------------------------------------------------------
        // FILE / IMAGE UPLOAD & CLEANUP (Supabase Storage + Base64 Fallback)
        // --------------------------------------------------------------------
        async deleteImageFromStorage(imageUrl, bucket = 'team-avatars') {
            if (!imageUrl || typeof imageUrl !== 'string') return;
            if (!imageUrl.includes(`/storage/v1/object/public/${bucket}/`)) return;

            const client = initSupabase();
            if (!client || !client.storage) return;

            try {
                const path = imageUrl.split(`/storage/v1/object/public/${bucket}/`)[1];
                if (path) {
                    const decodedPath = decodeURIComponent(path.split('?')[0]);
                    const { error } = await client.storage.from(bucket).remove([decodedPath]);
                    if (error) {
                        console.warn('[Supabase Storage] Delete error:', error.message);
                    } else {
                        console.log('[Supabase Storage] Cleaned up file from bucket:', decodedPath);
                    }
                }
            } catch (err) {
                console.warn('[Supabase Storage] Delete exception:', err);
            }
        },

        async uploadImage(file, folder = 'team') {
            if (!file) return '';

            const client = initSupabase();

            // 1. Attempt upload to Supabase Storage 'team-avatars' bucket
            if (client && client.storage) {
                try {
                    const ext = (file.name.split('.').pop() || 'png').toLowerCase();
                    const cleanBase = file.name.substring(0, file.name.lastIndexOf('.')) || 'image';
                    const safeName = cleanBase.replace(/[^a-zA-Z0-9_-]/g, '_');
                    const randSuffix = Math.random().toString(36).substring(2, 8);
                    const fileName = `${folder}/${Date.now()}_${randSuffix}_${safeName}.${ext}`;

                    const { data, error } = await client.storage
                        .from('team-avatars')
                        .upload(fileName, file, {
                            cacheControl: '3600',
                            upsert: true
                        });

                    if (!error && data) {
                        const { data: publicData } = client.storage
                            .from('team-avatars')
                            .getPublicUrl(fileName);

                        if (publicData && publicData.publicUrl) {
                            return publicData.publicUrl;
                        }
                    } else if (error) {
                        console.warn('[Supabase Storage] Upload to bucket returned warning:', error.message);
                    }
                } catch (storageErr) {
                    console.warn('[Supabase Storage] Upload error, falling back to data URL:', storageErr);
                }
            }

            // 2. Fallback: Base64 Data URL (ensures image is stored directly in database with zero friction)
            return new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.onload = () => resolve(reader.result);
                reader.onerror = (err) => reject(err);
                reader.readAsDataURL(file);
            });
        },

        // --------------------------------------------------------------------
        // ACTIVITY GALLERY CRUD (Batch Multi-Upload & Auto-Cleanup)
        // --------------------------------------------------------------------
        async getGallery() {
            const client = initSupabase();
            if (!client) {
                return getLocalGallery();
            }

            try {
                const { data, error } = await client
                    .from('activity_gallery')
                    .select('*')
                    .order('created_at', { ascending: false });

                if (error || !data || data.length === 0) {
                    return getLocalGallery();
                }

                return data.map(mapGalleryRow);
            } catch (err) {
                console.warn('[GDG Supabase] getGallery error, falling back to local:', err);
                return getLocalGallery();
            }
        },

        async uploadMultipleImages(files, bucket = 'gallery', onProgress = null) {
            if (!files || files.length === 0) return [];
            const urls = [];
            for (let i = 0; i < files.length; i++) {
                const file = files[i];
                if (typeof onProgress === 'function') {
                    onProgress(i + 1, files.length, file.name);
                }
                const url = await this.uploadImage(file, bucket);
                if (url) urls.push(url);
            }
            return urls;
        },

        async saveGalleryItem(itemData) {
            const client = initSupabase();
            const images = Array.isArray(itemData.images) && itemData.images.length > 0
                ? itemData.images
                : (itemData.image ? [itemData.image] : []);
            const coverImage = itemData.image || (images.length > 0 ? images[0] : '');

            const locationVal = itemData.location || itemData.desc || itemData.description || '';
            const payload = {
                title: itemData.title,
                image_url: coverImage,
                images: images,
                date: itemData.date || '',
                location: locationVal,
                description: locationVal
            };
            if (itemData.id && !String(itemData.id).startsWith('temp-')) {
                payload.id = itemData.id;
            }

            let savedId = itemData.id;
            if (client) {
                try {
                    let res;
                    if (itemData.id && !String(itemData.id).startsWith('temp-')) {
                        res = await client.from('activity_gallery').update(payload).eq('id', itemData.id).select().single();
                    } else {
                        res = await client.from('activity_gallery').insert(payload).select().single();
                    }

                    // Fallback without new columns if DB doesn't have them yet:
                    // Losslessly encode images list and date into description metadata so all photos are safely stored!
                    if (res && res.error && (res.error.message?.includes('images') || res.error.message?.includes('date') || res.error.message?.includes('location'))) {
                        console.warn('[Supabase Gallery Save] DB table lacks columns, packing into metadata fallback...');
                        const metaJson = JSON.stringify({
                            images: images,
                            date: itemData.date || '',
                            location: locationVal
                        });
                        const fallbackDesc = locationVal + `\n\n<!--GDG_ALBUM_META:${metaJson}-->`;
                        const fallbackPayload = {
                            title: itemData.title,
                            image_url: coverImage,
                            description: fallbackDesc
                        };
                        if (itemData.id && !String(itemData.id).startsWith('temp-')) {
                            res = await client.from('activity_gallery').update(fallbackPayload).eq('id', itemData.id).select().single();
                        } else {
                            res = await client.from('activity_gallery').insert(fallbackPayload).select().single();
                        }
                    }

                    if (res && res.data) savedId = res.data.id;
                } catch (err) {
                    console.warn('[Supabase Gallery Save]', err);
                }
            }

            const gallery = getLocalGallery();
            const newItem = {
                ...itemData,
                id: savedId || itemData.id || 'temp-' + Date.now(),
                image: coverImage,
                images: images,
                date: payload.date,
                desc: payload.description
            };
            const idx = gallery.findIndex(g => g.id === itemData.id);
            if (idx >= 0) {
                gallery[idx] = { ...gallery[idx], ...newItem };
            } else {
                gallery.unshift(newItem);
            }
            saveLocalGallery(gallery);
            return newItem;
        },

        async deleteGalleryItem(id) {
            const client = initSupabase();
            const imagesToDelete = [];

            const localGallery = getLocalGallery();
            const target = localGallery.find(g => g.id === id);
            if (target) {
                if (Array.isArray(target.images)) {
                    target.images.forEach(img => {
                        if (img && !imagesToDelete.includes(img)) imagesToDelete.push(img);
                    });
                }
                if (target.image && !imagesToDelete.includes(target.image)) {
                    imagesToDelete.push(target.image);
                }
            }

            if (client) {
                try {
                    if (id && !String(id).startsWith('temp-')) {
                        const { error } = await client.from('activity_gallery').delete().eq('id', id);
                        if (error) console.warn('[Supabase Gallery Delete DB]', error.message);
                    }
                } catch (e) {}
            }

            // Cleanup from Supabase Storage
            for (const imgUrl of imagesToDelete) {
                if (imgUrl) await this.deleteImageFromStorage(imgUrl);
            }

            const updatedGallery = localGallery.filter(g => g.id !== id);
            saveLocalGallery(updatedGallery);
            return true;
        },

        // --------------------------------------------------------------------
        // EVENTS CRUD (Posters, Schedule, Speakers & Moderators)
        // --------------------------------------------------------------------
        async getEvents() {
            const client = initSupabase();
            if (!client) {
                return getLocalEvents();
            }

            try {
                const { data, error } = await client
                    .from('events')
                    .select('*')
                    .order('created_at', { ascending: false });

                if (error || !data || data.length === 0) {
                    return getLocalEvents();
                }

                return data.map(mapEventRow);
            } catch (err) {
                console.warn('[GDG Supabase] getEvents error, falling back to local:', err);
                return getLocalEvents();
            }
        },

        getEventAutoStatus(eventObj) {
            return getEventAutoStatus(eventObj);
        },

        async saveEvent(eventData, originalId = '') {
            const client = initSupabase();
            const autoStatus = getEventAutoStatus(eventData);

            const speakers = Array.isArray(eventData.speakers) && eventData.speakers.length > 0
                ? eventData.speakers
                : (eventData.speaker ? [{ name: eventData.speaker, role: eventData.speakerRole || 'Speaker' }] : []);

            const primarySpeaker = speakers[0]?.name || eventData.speaker || '';
            const primarySpeakerRole = speakers[0]?.role || eventData.speakerRole || 'Speaker';

            const payload = {
                title: eventData.title,
                poster_url: eventData.poster || '',
                location: eventData.location,
                date: eventData.date,
                time: eventData.time,
                raw_date: eventData.rawDate || eventData.raw_date || null,
                raw_time: eventData.rawTime || eventData.raw_time || null,
                speaker: primarySpeaker,
                speaker_role: primarySpeakerRole,
                speakers: speakers,
                moderator: eventData.moderator,
                moderator_role: eventData.moderatorRole || 'Moderator',
                registration_url: eventData.registrationUrl || '#',
                status: autoStatus,
                badge_color: eventData.color || 'blue'
            };

            if (eventData.id && !String(eventData.id).startsWith('temp-')) {
                payload.id = eventData.id;
            }

            // Check if replacing an existing Supabase Storage poster to delete old file
            let oldPosterUrl = '';
            const existingEvent = getLocalEvents().find(ev =>
                (eventData.id && ev.id === eventData.id) ||
                (originalId && ev.id === originalId) ||
                ev.title === eventData.title
            );
            if (existingEvent && existingEvent.poster) {
                oldPosterUrl = existingEvent.poster;
            }

            let savedId = eventData.id;
            if (client) {
                try {
                    let res;
                    if (eventData.id && !String(eventData.id).startsWith('temp-')) {
                        res = await client.from('events').update(payload).eq('id', eventData.id).select().single();
                    } else if (originalId && !String(originalId).startsWith('temp-')) {
                        res = await client.from('events').update(payload).eq('id', originalId).select().single();
                    } else {
                        res = await client.from('events').insert(payload).select().single();
                    }

                    // Fallback if 'speakers' column does not exist yet in DB
                    if (res && res.error && (res.error.message?.includes('speakers') || res.error.code === 'PGRST204')) {
                        const fallbackPayload = { ...payload };
                        delete fallbackPayload.speakers;
                        if (eventData.id && !String(eventData.id).startsWith('temp-')) {
                            res = await client.from('events').update(fallbackPayload).eq('id', eventData.id).select().single();
                        } else if (originalId && !String(originalId).startsWith('temp-')) {
                            res = await client.from('events').update(fallbackPayload).eq('id', originalId).select().single();
                        } else {
                            res = await client.from('events').insert(fallbackPayload).select().single();
                        }
                    }

                    if (res && res.data) savedId = res.data.id;
                } catch (err) {
                    console.warn('[Supabase Event Save]', err);
                }
            }

            // Cleanup old poster if changed
            if (oldPosterUrl && payload.poster_url && oldPosterUrl !== payload.poster_url) {
                await this.deleteImageFromStorage(oldPosterUrl);
            }

            const events = getLocalEvents();
            const newEvent = {
                ...eventData,
                id: savedId || eventData.id || 'temp-' + Date.now(),
                status: autoStatus,
                rawDate: payload.raw_date,
                rawTime: payload.raw_time,
                speaker: primarySpeaker,
                speakerRole: primarySpeakerRole,
                speakers: speakers
            };
            const idx = events.findIndex(ev => (eventData.id && ev.id === eventData.id) || (originalId && ev.id === originalId) || ev.title === eventData.title);
            if (idx >= 0) {
                events[idx] = { ...events[idx], ...newEvent };
            } else {
                events.unshift(newEvent);
            }
            saveLocalEvents(events);
            return newEvent;
        },

        async deleteEvent(eventId) {
            const client = initSupabase();
            let posterToDelete = '';

            const localEvents = getLocalEvents();
            const target = localEvents.find(ev => ev.id === eventId);
            if (target && target.poster) {
                posterToDelete = target.poster;
            }

            if (client) {
                try {
                    if (!posterToDelete && eventId && !String(eventId).startsWith('temp-')) {
                        const { data } = await client.from('events').select('poster_url').eq('id', eventId).single();
                        if (data && data.poster_url) posterToDelete = data.poster_url;
                    }
                } catch (e) {}

                if (eventId && !String(eventId).startsWith('temp-')) {
                    const { error } = await client.from('events').delete().eq('id', eventId);
                    if (error) console.warn('[Supabase Event Delete DB]', error.message);
                }
            }

            // Cleanup poster file from Supabase Storage
            if (posterToDelete) {
                await this.deleteImageFromStorage(posterToDelete);
            }

            const updated = localEvents.filter(ev => ev.id !== eventId);
            saveLocalEvents(updated);
            return true;
        },

        // ====================================================================
        // AUTHENTICATION SERVICES
        // ====================================================================
        getAuthClient() {
            return initSupabase();
        },

        async getSession() {
            const client = initSupabase();
            if (!client || !client.auth) return null;
            try {
                const { data, error } = await client.auth.getSession();
                if (error) throw error;
                return data.session;
            } catch (e) {
                console.warn('[Supabase Auth getSession]', e);
                return null;
            }
        },

        async getUser() {
            const client = initSupabase();
            if (!client || !client.auth) return null;
            try {
                const { data, error } = await client.auth.getUser();
                if (error) throw error;
                return data.user;
            } catch (e) {
                console.warn('[Supabase Auth getUser]', e);
                return null;
            }
        },

        async signInWithPassword(email, password) {
            const client = initSupabase();
            if (!client || !client.auth) {
                throw new Error('Supabase client not initialized or offline.');
            }
            return await client.auth.signInWithPassword({ email, password });
        },

        async signUp(email, password) {
            const client = initSupabase();
            if (!client || !client.auth) {
                throw new Error('Supabase client not initialized or offline.');
            }
            return await client.auth.signUp({ email, password });
        },

        async signInWithOtp(email) {
            const client = initSupabase();
            if (!client || !client.auth) {
                throw new Error('Supabase client not initialized or offline.');
            }
            return await client.auth.signInWithOtp({
                email,
                options: {
                    emailRedirectTo: window.location.origin + '/dashboard.html'
                }
            });
        },

        async signInWithOAuth(provider = 'google') {
            const client = initSupabase();
            if (!client || !client.auth) {
                throw new Error('Supabase client not initialized or offline.');
            }
            return await client.auth.signInWithOAuth({
                provider,
                options: {
                    redirectTo: window.location.origin + '/dashboard.html'
                }
            });
        },

        async signOut() {
            const client = initSupabase();
            if (client && client.auth) {
                try {
                    await client.auth.signOut();
                } catch (e) {
                    console.warn('[Supabase Auth signOut]', e);
                }
            }
            localStorage.removeItem('gdgoc_admin_session');
            sessionStorage.removeItem('gdgoc_admin_session');
            return true;
        }
    };

    window.GDG_SUPABASE = SupabaseService;

})(window);
