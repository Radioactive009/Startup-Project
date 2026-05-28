/**
 * InsightX - Toast Notification System
 */

class NotificationSystem {
    constructor() {
        this.container = document.getElementById('toast-container');
        if (!this.container) {
            this.container = document.createElement('div');
            this.container.id = 'toast-container';
            document.body.appendChild(this.container);
        }
    }

    show(message, type = 'info', duration = 4000) {
        const toast = document.createElement('div');
        toast.className = `custom-toast ${type}`;
        
        let iconClass = 'bi-info-circle-fill';
        if (type === 'success') iconClass = 'bi-check-circle-fill';
        if (type === 'error') iconClass = 'bi-x-circle-fill';

        toast.innerHTML = `
            <div class="icon">
                <i class="bi ${iconClass}"></i>
            </div>
            <div>
                <h6 class="mb-0 text-main fw-bold" style="font-size: 14px;">${type.charAt(0).toUpperCase() + type.slice(1)}</h6>
                <p class="mb-0 text-muted small">${message}</p>
            </div>
        `;

        this.container.appendChild(toast);

        // Animate in
        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                toast.classList.add('show');
            });
        });

        // Auto dismiss
        setTimeout(() => {
            this.dismiss(toast);
        }, duration);
    }

    dismiss(toast) {
        toast.classList.remove('show');
        toast.classList.add('hide');
        setTimeout(() => {
            if (toast.parentNode === this.container) {
                this.container.removeChild(toast);
            }
        }, 400); // Wait for transition
    }
}

window.Toast = new NotificationSystem();
