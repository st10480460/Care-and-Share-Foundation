/* ============================================================
   CARE & SHARE FOUNDATION - EXTERNAL JAVASCRIPT
   ============================================================ */

document.addEventListener('DOMContentLoaded', function () {

    /* --------------------------------------------------------
       1. AUTO-UPDATE FOOTER YEAR
       -------------------------------------------------------- */
    const yearElement = document.getElementById('current-year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }

    /* --------------------------------------------------------
       2. FORM VALIDATION (Enquiry & Contact Forms)
       -------------------------------------------------------- */
    const forms = document.querySelectorAll('form');

    forms.forEach(function (form) {
        form.addEventListener('submit', function (e) {
            e.preventDefault(); // Stop the form from submitting normally

            let isValid = true;
            let firstError = null;

            // Check every required field
            const requiredFields = form.querySelectorAll('[required]');
            requiredFields.forEach(function (field) {
                field.style.borderColor = '#d0d0d0'; // Reset border color

                if (!field.value.trim()) {
                    field.style.borderColor = 'red';
                    isValid = false;
                    if (!firstError) firstError = field;
                }
            });

            // Check email format if an email field exists
            const emailField = form.querySelector('input[type="email"]');
            if (emailField && emailField.value.trim()) {
                const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailPattern.test(emailField.value.trim())) {
                    emailField.style.borderColor = 'red';
                    isValid = false;
                    if (!firstError) firstError = emailField;
                }
            }

            if (!isValid) {
                if (firstError) firstError.focus();
                showMessage(form, 'Please fill in all required fields correctly.', 'error');
                return;
            }

            // If valid, show success message and reset form
            showMessage(form, 'Thank you! Your message has been sent successfully.', 'success');
            form.reset();
        });
    });

    /* --------------------------------------------------------
       3. HELPER: SHOW FORM MESSAGE (Green for success, Red for error)
       -------------------------------------------------------- */
    function showMessage(form, text, type) {
        const existing = form.querySelector('.form-message');
        if (existing) existing.remove();

        const messageDiv = document.createElement('div');
        messageDiv.className = 'form-message ' + type;
        messageDiv.textContent = text;
        
        messageDiv.style.padding = '12px 16px';
        messageDiv.style.marginTop = '15px';
        messageDiv.style.borderRadius = '6px';
        messageDiv.style.fontWeight = '600';
        messageDiv.style.textAlign = 'center';

        if (type === 'success') {
            messageDiv.style.background = '#d4edda';
            messageDiv.style.color = '#155724';
            messageDiv.style.border = '1px solid #c3e6cb';
        } else {
            messageDiv.style.background = '#f8d7da';
            messageDiv.style.color = '#721c24';
            messageDiv.style.border = '1px solid #f5c6cb';
        }

        form.appendChild(messageDiv);

        setTimeout(function () {
            messageDiv.remove();
        }, 5000);
    }

    /* --------------------------------------------------------
       4. HEADER SHADOW ON SCROLL
       -------------------------------------------------------- */
    const header = document.querySelector('header');
    if (header) {
        window.addEventListener('scroll', function () {
            if (window.scrollY > 50) {
                header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.4)';
            } else {
                header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.2)';
            }
        });
    }

    /* --------------------------------------------------------
       5. SCROLL REVEAL ANIMATION (Fades cards in as you scroll)
       -------------------------------------------------------- */
    const revealElements = document.querySelectorAll(
        '.project-card, .stat-box, .value-card, .team-member, .location-card'
    );

    const revealObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    revealElements.forEach(function (el) {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        revealObserver.observe(el);
    });

    console.log('Care & Share Foundation website loaded successfully.');
});