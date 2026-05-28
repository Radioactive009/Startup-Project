/**
 * InsightX - Settings Module Logic
 */
document.addEventListener('DOMContentLoaded', () => {

    // Password Strength Checker
    const newPasswordInput = document.getElementById('newPassword');
    const strengthBar = document.getElementById('passwordStrengthBar');
    const strengthText = document.getElementById('passwordStrengthText');

    if (newPasswordInput && strengthBar && strengthText) {
        newPasswordInput.addEventListener('input', (e) => {
            const val = e.target.value;
            let strength = 0;
            
            if (val.length >= 8) strength += 25;
            if (val.match(/[A-Z]/)) strength += 25;
            if (val.match(/[0-9]/)) strength += 25;
            if (val.match(/[^a-zA-Z0-9]/)) strength += 25;

            strengthBar.style.width = `${strength}%`;

            if (val.length === 0) {
                strengthBar.style.width = '0%';
                strengthBar.style.backgroundColor = 'transparent';
                strengthText.innerText = 'Minimum 8 characters';
                strengthText.className = 'text-muted mt-1 d-block small';
            } else if (strength <= 25) {
                strengthBar.style.backgroundColor = '#ef4444'; // Red
                strengthText.innerText = 'Weak - Add uppercase, numbers, or symbols';
                strengthText.className = 'text-danger mt-1 d-block small fw-semibold';
            } else if (strength <= 50) {
                strengthBar.style.backgroundColor = '#f59e0b'; // Yellow
                strengthText.innerText = 'Fair - Almost there';
                strengthText.className = 'text-warning mt-1 d-block small fw-semibold';
            } else if (strength <= 75) {
                strengthBar.style.backgroundColor = '#3b82f6'; // Blue
                strengthText.innerText = 'Good - Add a symbol for strong';
                strengthText.className = 'text-primary mt-1 d-block small fw-semibold';
            } else {
                strengthBar.style.backgroundColor = '#10b981'; // Green
                strengthText.innerText = 'Strong password';
                strengthText.className = 'text-success mt-1 d-block small fw-semibold';
            }
        });
    }

});
