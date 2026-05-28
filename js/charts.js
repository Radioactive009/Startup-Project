/**
 * InsightX - Advanced Analytics Charts
 */

document.addEventListener('DOMContentLoaded', () => {
    
    if (typeof Chart === 'undefined') return;

    const getGridColor = () => document.documentElement.getAttribute('data-theme') === 'dark' ? '#1e253c' : '#e2e8f0';
    const getTextColor = () => document.documentElement.getAttribute('data-theme') === 'dark' ? '#94a3b8' : '#64748b';

    const defaultFont = { family: 'Inter', size: 12 };
    
    const trafficCtx = document.getElementById('trafficAreaChart');
    if (trafficCtx) {
        const gradient = trafficCtx.getContext('2d').createLinearGradient(0, 0, 0, 400);
        gradient.addColorStop(0, 'rgba(16, 185, 129, 0.4)');
        gradient.addColorStop(1, 'rgba(16, 185, 129, 0.0)');

        window.trafficChart = new Chart(trafficCtx, {
            type: 'line',
            data: {
                labels: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14'],
                datasets: [{
                    label: 'Page Views',
                    data: [1200, 1900, 1500, 2200, 2800, 2400, 3200, 3500, 3000, 4200, 4500, 5000, 4800, 5300],
                    borderColor: '#10b981',
                    backgroundColor: gradient,
                    borderWidth: 2,
                    fill: true,
                    tension: 0.4,
                    pointRadius: 0,
                    pointHoverRadius: 6
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: { legend: { display: false } },
                scales: {
                    x: { grid: { display: false }, ticks: { font: defaultFont, color: getTextColor() } },
                    y: { 
                        grid: { color: getGridColor(), borderDash: [5, 5] },
                        ticks: { font: defaultFont, color: getTextColor() }
                    }
                },
                interaction: { intersect: false, mode: 'index' }
            }
        });
    }

    const acqCtx = document.getElementById('acquisitionBarChart');
    if (acqCtx) {
        window.acqChart = new Chart(acqCtx, {
            type: 'bar',
            data: {
                labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                datasets: [
                    {
                        label: 'Organic',
                        data: [65, 59, 80, 81, 56, 55, 40],
                        backgroundColor: '#6366f1',
                        borderRadius: 4
                    },
                    {
                        label: 'Paid',
                        data: [28, 48, 40, 19, 86, 27, 90],
                        backgroundColor: '#0ea5e9',
                        borderRadius: 4
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: { 
                    legend: { 
                        position: 'top',
                        labels: { color: getTextColor(), font: defaultFont, usePointStyle: true, boxWidth: 8 }
                    } 
                },
                scales: {
                    x: { grid: { display: false }, ticks: { color: getTextColor() }, stacked: true },
                    y: { grid: { color: getGridColor() }, ticks: { color: getTextColor() }, stacked: true }
                }
            }
        });
    }

    const donutCtx = document.getElementById('deviceDonutChart');
    if (donutCtx) {
        window.deviceChart = new Chart(donutCtx, {
            type: 'doughnut',
            data: {
                labels: ['Desktop', 'Mobile', 'Tablet'],
                datasets: [{
                    data: [55, 35, 10],
                    backgroundColor: ['#6366f1', '#10b981', '#f59e0b'],
                    borderWidth: 0,
                    hoverOffset: 4
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                cutout: '75%',
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: { color: getTextColor(), font: defaultFont, usePointStyle: true, boxWidth: 8 }
                    }
                }
            }
        });
    }

    // Global theme update hook
    window.updateChartTheme = function(theme) {
        const gridColor = theme === 'dark' ? '#1e253c' : '#e2e8f0';
        const textColor = theme === 'dark' ? '#94a3b8' : '#64748b';
        
        [window.trafficChart, window.acqChart, window.deviceChart].forEach(chart => {
            if (chart) {
                if (chart.options.scales?.x) chart.options.scales.x.ticks.color = textColor;
                if (chart.options.scales?.y) {
                    chart.options.scales.y.ticks.color = textColor;
                    chart.options.scales.y.grid.color = gridColor;
                }
                if (chart.options.plugins?.legend?.labels) {
                    chart.options.plugins.legend.labels.color = textColor;
                }
                chart.update();
            }
        });
    };

});
