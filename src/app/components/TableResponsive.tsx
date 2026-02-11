'use client';

import { useEffect } from 'react';

/**
 * Adds data-label attributes to table cells for mobile card layout.
 * Reads header text from <thead> and applies it as data-label on each <td>.
 */
export default function TableResponsive() {
    useEffect(() => {
        const tables = document.querySelectorAll('.article-content table');

        tables.forEach(table => {
            const headers: string[] = [];
            table.querySelectorAll('thead th').forEach(th => {
                headers.push(th.textContent?.trim() || '');
            });

            if (headers.length === 0) return;

            table.querySelectorAll('tbody tr').forEach(row => {
                row.querySelectorAll('td').forEach((td, idx) => {
                    if (headers[idx]) {
                        td.setAttribute('data-label', headers[idx]);
                    }
                });
            });
        });
    }, []);

    return null; // This component only runs the side effect
}
