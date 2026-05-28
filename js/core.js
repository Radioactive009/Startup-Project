/**
 * InsightX - Core Engine
 */

document.addEventListener('DOMContentLoaded', () => {

    // 1. Page Transition Interceptor
    // Fades out the page when clicking a navigation link, simulating SPA behavior
    const transitionLayer = document.getElementById('page-transition-layer');
    if (!transitionLayer) {
        const layer = document.createElement('div');
        layer.id = 'page-transition-layer';
        document.body.appendChild(layer);
    }

    // Fade in on load
    requestAnimationFrame(() => {
        document.body.classList.add('page-loaded');
    });

    document.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            // Only intercept internal links that are not fragments
            if (href && !href.startsWith('#') && !link.hasAttribute('data-bs-toggle')) {
                e.preventDefault();
                document.body.classList.remove('page-loaded');
                setTimeout(() => {
                    window.location.href = href;
                }, 400); // Wait for fade out animation
            }
        });
    });

    // 2. Theme Engine
    const themeToggleBtn = document.getElementById('themeToggle');
    const themeIcon = themeToggleBtn?.querySelector('.theme-icon');
    
    const storedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    let currentTheme = storedTheme || (prefersDark ? 'dark' : 'light');
    
    document.documentElement.setAttribute('data-theme', currentTheme);
    updateThemeIcon(currentTheme);
    
    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            currentTheme = currentTheme === 'light' ? 'dark' : 'light';
            document.documentElement.setAttribute('data-theme', currentTheme);
            localStorage.setItem('theme', currentTheme);
            updateThemeIcon(currentTheme);
            
            // Re-render chart if it exists
            if (typeof updateChartTheme === 'function') {
                updateChartTheme(currentTheme);
            }

            if (window.Toast) {
                window.Toast.show(`${currentTheme.charAt(0).toUpperCase() + currentTheme.slice(1)} mode enabled`, 'info');
            }
        });
    }
    
    function updateThemeIcon(theme) {
        if (!themeIcon) return;
        if (theme === 'dark') {
            themeIcon.classList.replace('bi-moon', 'bi-sun');
        } else {
            themeIcon.classList.replace('bi-sun', 'bi-moon');
        }
    }

    // 3. Shimmer Loaders Simulator
    // Automatically removes .loading class from cards after 800ms
    const loadingCards = document.querySelectorAll('.stats-card.loading');
    if (loadingCards.length > 0) {
        setTimeout(() => {
            loadingCards.forEach(card => card.classList.remove('loading'));
            if (window.Toast && document.title.includes('Dashboard')) {
                window.Toast.show('Dashboard data synchronized', 'success');
            }
        }, 800);
    }

    // 4. Global Search Hotkey (Cmd/Ctrl + K)
    document.addEventListener('keydown', (e) => {
        if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
            e.preventDefault();
            const searchModalElement = document.getElementById('searchModal');
            if (searchModalElement && window.bootstrap) {
                const searchModal = window.bootstrap.Modal.getOrCreateInstance(searchModalElement);
                searchModal.toggle();
            }
        }
    });

});
