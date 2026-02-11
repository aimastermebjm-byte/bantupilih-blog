'use client';

import { useEffect } from 'react';

/**
 * Wraps article tables in a scroll wrapper for mobile UX hint ("Geser →").
 * Also hides the hint once user scrolls the table.
 */
export default function TableResponsive() {
    useEffect(() => {
        const tables = document.querySelectorAll('.article-content table');

        tables.forEach(table => {
            // Skip if already wrapped
            if (table.parentElement?.classList.contains('table-scroll-wrapper')) return;

            // Create wrapper
            const wrapper = document.createElement('div');
            wrapper.className = 'table-scroll-wrapper';
            table.parentNode?.insertBefore(wrapper, table);
            wrapper.appendChild(table);

            // Hide hint after user scrolls the table
            table.addEventListener('scroll', function handler() {
                wrapper.classList.add('scrolled');
                wrapper.style.setProperty('--hint-opacity', '0');
                table.removeEventListener('scroll', handler);
            }, { passive: true });
        });
    }, []);

    return null;
}
