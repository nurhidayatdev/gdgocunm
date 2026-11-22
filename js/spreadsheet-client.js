/**
 * Google Developer Groups On Campus - Universitas Negeri Makassar (GDGoC UNM)
 * Google Spreadsheet Certificate Client Module
 * 
 * Fetches certificate records and computes analytics for dashboard visualization.
 */

(function (window) {
    'use strict';

    const SPREADSHEET_CONFIG = {
        sheetId: '1wxe4WThXlGSj2iocQ4NPnqmZRcJvYl3sMDLJLwQRTM8',
        sheetName: 'Database_Sertifikat'
    };

    let cachedCertificates = null;
    let lastFetchedAt = null;
    const CACHE_DURATION_MS = 60 * 1000; // 1 minute client cache

    /**
     * Fetch all certificate records directly from Google Sheets via GViz Query API
     * @param {boolean} forceRefresh 
     * @returns {Promise<Array>}
     */
    async function fetchAllCertificates(forceRefresh = false) {
        const now = Date.now();
        if (!forceRefresh && cachedCertificates && lastFetchedAt && (now - lastFetchedAt < CACHE_DURATION_MS)) {
            return cachedCertificates;
        }

        const gvizUrl = `https://docs.google.com/spreadsheets/d/${SPREADSHEET_CONFIG.sheetId}/gviz/tq?tqx=out:json&sheet=${encodeURIComponent(SPREADSHEET_CONFIG.sheetName)}`;

        const response = await fetch(gvizUrl);
        if (!response.ok) {
            throw new Error(`HTTP error ${response.status} accessing Google Spreadsheet.`);
        }

        const rawText = await response.text();
        const jsonStart = rawText.indexOf('{');
        const jsonEnd = rawText.lastIndexOf('}');
        if (jsonStart === -1 || jsonEnd === -1) {
            throw new Error('Invalid format received from Google Sheets.');
        }

        const parsed = JSON.parse(rawText.substring(jsonStart, jsonEnd + 1));
        if (!parsed.table || !parsed.table.rows) {
            return [];
        }

        const records = [];
        const rows = parsed.table.rows;

        for (let i = 0; i < rows.length; i++) {
            const c = rows[i].c;
            if (!c) continue;

            const idVal = c[0] && c[0].v != null ? String(c[0].v).trim() : '';
            if (!idVal) continue;

            records.push({
                id: idVal,
                id_sertifikat: idVal,
                recipient_name: c[1] && c[1].v != null ? String(c[1].v).trim() : '-',
                nama_penerima: c[1] && c[1].v != null ? String(c[1].v).trim() : '-',
                role: c[2] && c[2].v != null ? String(c[2].v).trim().toUpperCase() : 'PARTICIPANT',
                peran: c[2] && c[2].v != null ? String(c[2].v).trim().toUpperCase() : 'PARTICIPANT',
                event_name: c[3] && c[3].v != null ? String(c[3].v).trim() : '-',
                nama_event: c[3] && c[3].v != null ? String(c[3].v).trim() : '-',
                issue_date: c[4] ? (c[4].f ? String(c[4].f).trim() : (c[4].v != null ? String(c[4].v).trim() : '-')) : '-',
                tanggal_terbit: c[4] ? (c[4].f ? String(c[4].f).trim() : (c[4].v != null ? String(c[4].v).trim() : '-')) : '-',
                status: c[5] && c[5].v != null ? String(c[5].v).trim().toUpperCase() : 'VALID'
            });
        }

        cachedCertificates = records;
        lastFetchedAt = Date.now();
        return records;
    }

    /**
     * Search certificates by query (ID, recipient name, or event)
     */
    async function searchCertificates(query) {
        const list = await fetchAllCertificates();
        if (!query || !query.trim()) return list;

        const q = query.trim().toLowerCase();
        return list.filter(item =>
            (item.id_sertifikat && item.id_sertifikat.toLowerCase().includes(q)) ||
            (item.nama_penerima && item.nama_penerima.toLowerCase().includes(q)) ||
            (item.nama_event && item.nama_event.toLowerCase().includes(q))
        );
    }

    /**
     * Compute statistics for Dashboard cards
     */
    async function getCertificateStats() {
        const list = await fetchAllCertificates();

        let validCount = 0;
        let revokedCount = 0;
        const eventsMap = {};
        const rolesMap = {};

        list.forEach(c => {
            if (c.status === 'VALID') validCount++;
            else revokedCount++;

            if (c.nama_event) {
                eventsMap[c.nama_event] = (eventsMap[c.nama_event] || 0) + 1;
            }

            if (c.peran) {
                rolesMap[c.peran] = (rolesMap[c.peran] || 0) + 1;
            }
        });

        return {
            totalCertificates: list.length,
            validCertificates: validCount,
            revokedCertificates: revokedCount,
            totalEvents: Object.keys(eventsMap).length,
            eventsBreakdown: eventsMap,
            rolesBreakdown: rolesMap,
            lastUpdated: lastFetchedAt ? new Date(lastFetchedAt).toLocaleString() : '-'
        };
    }

    // Expose to window
    window.GDG_CERTIFICATES = {
        getAll: fetchAllCertificates,
        search: searchCertificates,
        getStats: getCertificateStats,
        config: SPREADSHEET_CONFIG
    };

})(window);
