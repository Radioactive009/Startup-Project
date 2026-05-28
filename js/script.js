document.addEventListener('DOMContentLoaded', function () {
    
    // --- Theme Toggler Logic ---
    const themeToggleBtn = document.getElementById('themeToggle');
    const themeIcon = themeToggleBtn?.querySelector('.theme-icon');
    
    // Check local storage or system preference
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
            
            // Re-render chart if it exists to update grid colors
            if (window.revenueChartInstance) {
                updateChartTheme(currentTheme);
            }
        });
    }
    
    function updateThemeIcon(theme) {
        if (!themeIcon) return;
        if (theme === 'dark') {
            themeIcon.classList.remove('bi-moon');
            themeIcon.classList.add('bi-sun');
        } else {
            themeIcon.classList.remove('bi-sun');
            themeIcon.classList.add('bi-moon');
        }
    }

    // --- Chart.js Revenue Chart ---
    const ctx = document.getElementById('revenueChart');
    if (ctx) {
        // Create gradient fill for the chart
        const gradient = ctx.getContext('2d').createLinearGradient(0, 0, 0, 400);
        gradient.addColorStop(0, 'rgba(99, 102, 241, 0.4)'); // Indigo-500 with opacity
        gradient.addColorStop(1, 'rgba(99, 102, 241, 0.0)'); // Transparent

        const getGridColor = () => document.documentElement.getAttribute('data-theme') === 'dark' ? '#1f2937' : '#e2e8f0';
        const getTextColor = () => document.documentElement.getAttribute('data-theme') === 'dark' ? '#94a3b8' : '#64748b';

        window.revenueChartInstance = new Chart(ctx, {
            type: 'line',
            data: {
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                datasets: [{
                    label: 'Revenue',
                    data: [12000, 19000, 15000, 22000, 28000, 24000, 32000, 35000, 30000, 42000, 45000, 50000],
                    borderColor: '#6366f1', // Indigo 500
                    backgroundColor: gradient,
                    borderWidth: 3,
                    pointBackgroundColor: '#ffffff',
                    pointBorderColor: '#6366f1',
                    pointBorderWidth: 2,
                    pointRadius: 4,
                    pointHoverRadius: 6,
                    fill: true,
                    tension: 0.4 // Smooth curves
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false // Hide legend to match clean SaaS look
                    },
                    tooltip: {
                        backgroundColor: '#0f172a',
                        titleFont: { family: 'Inter', size: 13 },
                        bodyFont: { family: 'Inter', size: 14, weight: 'bold' },
                        padding: 12,
                        cornerRadius: 8,
                        displayColors: false,
                        callbacks: {
                            label: function(context) {
                                return '$' + context.parsed.y.toLocaleString();
                            }
                        }
                    }
                },
                scales: {
                    x: {
                        grid: {
                            display: false,
                            drawBorder: false
                        },
                        ticks: {
                            font: { family: 'Inter', size: 12 },
                            color: getTextColor()
                        }
                    },
                    y: {
                        grid: {
                            color: getGridColor(),
                            drawBorder: false,
                            borderDash: [5, 5]
                        },
                        ticks: {
                            font: { family: 'Inter', size: 12 },
                            color: getTextColor(),
                            callback: function(value) {
                                return '$' + (value / 1000) + 'k';
                            }
                        }
                    }
                },
                interaction: {
                    intersect: false,
                    mode: 'index',
                },
            }
        });

        function updateChartTheme(theme) {
            const gridColor = theme === 'dark' ? '#1f2937' : '#e2e8f0';
            const textColor = theme === 'dark' ? '#94a3b8' : '#64748b';
            
            window.revenueChartInstance.options.scales.x.ticks.color = textColor;
            window.revenueChartInstance.options.scales.y.ticks.color = textColor;
            window.revenueChartInstance.options.scales.y.grid.color = gridColor;
            window.revenueChartInstance.update();
        }
    }

    // --- Animated Counters ---
    const counters = document.querySelectorAll('.counter');
    const speed = 100; // lower is faster

    counters.forEach(counter => {
        const target = +counter.getAttribute('data-target');
        const increment = target / speed;
        
        const updateCount = () => {
            const current = +counter.innerText.replace(/,/g, '');
            if (current < target) {
                counter.innerText = Math.ceil(current + increment).toLocaleString();
                setTimeout(updateCount, 20);
            } else {
                counter.innerText = target.toLocaleString();
            }
        };
        
        counter.innerText = '0';
        updateCount();
    });

});
