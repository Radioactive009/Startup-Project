/**
 * InsightX - Team Module Logic
 */
document.addEventListener('DOMContentLoaded', () => {
    
    // Member Search Filtering
    const searchInput = document.querySelector('.search-input');
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            const term = e.target.value.toLowerCase();
            const memberCards = document.querySelectorAll('.row.g-4 > .col-xl-3');
            
            memberCards.forEach(col => {
                // Skip the Add Member card
                if (col.querySelector('h5')?.innerText.includes('Add Member')) return;
                
                const name = col.querySelector('h5')?.innerText.toLowerCase() || '';
                const email = col.querySelector('p.text-muted')?.innerText.toLowerCase() || '';
                
                if (name.includes(term) || email.includes(term)) {
                    col.style.display = '';
                } else {
                    col.style.display = 'none';
                }
            });
        });
    }

    // Invite Modal Simulated API Logic
    const inviteBtn = document.querySelector('#inviteModal .btn-primary');
    if (inviteBtn) {
        inviteBtn.addEventListener('click', () => {
            const emailInput = document.querySelector('#inviteModal input[type="email"]');
            
            if (emailInput.value && emailInput.value.includes('@')) {
                // Simulate network request
                inviteBtn.innerHTML = '<span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>Sending...';
                inviteBtn.disabled = true;

                setTimeout(() => {
                    const modal = bootstrap.Modal.getInstance(document.getElementById('inviteModal'));
                    if (modal) modal.hide();
                    
                    if (window.Toast) {
                        window.Toast.show(`Invitation securely sent to ${emailInput.value}`, 'success');
                    }

                    // Reset form
                    emailInput.value = '';
                    inviteBtn.innerHTML = 'Send Invite';
                    inviteBtn.disabled = false;
                }, 1200);
            } else {
                if (window.Toast) {
                    window.Toast.show('Please enter a valid email address.', 'error');
                }
            }
        });
    }
});
