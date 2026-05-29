document.addEventListener('DOMContentLoaded', () => {
    const navButtons = document.querySelectorAll('.nav-btn');
    const contentArea = document.getElementById('content');
    const printBtn = document.getElementById('print-btn');

    // Configure marked to use custom renderer for code blocks (specifically mermaid)
    const renderer = new marked.Renderer();
    const originalCodeRenderer = renderer.code.bind(renderer);
    
    renderer.code = function({text, lang, escaped}) {
        if (lang === 'mermaid') {
            return `<div class="mermaid">${text}</div>`;
        }
        return originalCodeRenderer({text, lang, escaped});
    };

    marked.setOptions({ renderer });

    async function loadProject(filename) {
        contentArea.innerHTML = '<div class="loader">Loading...</div>';
        try {
            // Add cache busting for local development
            const response = await fetch(`projects/${filename}?t=${new Date().getTime()}`);
            if (!response.ok) throw new Error('File not found');
            const markdown = await response.text();
            
            // Render markdown to HTML
            contentArea.innerHTML = marked.parse(markdown);
            
            // Wait for mermaid script to load before running
            setTimeout(async () => {
                if (window.mermaid) {
                    try {
                        await window.mermaid.run({
                            nodes: document.querySelectorAll('.mermaid'),
                        });
                    } catch (e) {
                        console.error('Mermaid render error:', e);
                    }
                }
            }, 100);

        } catch (error) {
            contentArea.innerHTML = `<div class="error"><h2>Error loading resource</h2><p>${error.message}</p></div>`;
        }
    }

    // Mobile menu toggle logic
    const menuToggle = document.getElementById('menu-toggle');
    const sidebar = document.getElementById('sidebar');
    const sidebarOverlay = document.getElementById('sidebar-overlay');

    function toggleMenu() {
        sidebar.classList.toggle('open');
        sidebarOverlay.classList.toggle('show');
    }

    menuToggle.addEventListener('click', toggleMenu);
    sidebarOverlay.addEventListener('click', toggleMenu);

    navButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            navButtons.forEach(b => b.classList.remove('active'));
            e.target.classList.add('active');
            loadProject(e.target.dataset.file);
            // Close mobile menu if open
            if (sidebar.classList.contains('open')) {
                toggleMenu();
            }
        });
    });

    if (printBtn) {
        printBtn.addEventListener('click', () => {
            window.print();
        });
    }

    // Load initial project
    loadProject('introduction.md');

    // Initial Page Loader Logic
    const initialLoader = document.getElementById('initial-loader');
    if (initialLoader) {
        // Wait 2.5 seconds to show the quote, then fade it out
        setTimeout(() => {
            initialLoader.classList.add('fade-out');
            // Remove from DOM after fade transition completes
            setTimeout(() => {
                initialLoader.remove();
            }, 1000);
        }, 2500);
    }
});
