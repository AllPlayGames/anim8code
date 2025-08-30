document.addEventListener('DOMContentLoaded', () => {
    const heroTitle = document.querySelector('.hero-title');
    const animatedTexts = document.querySelectorAll('.animated-text');
    const ctaButton = document.getElementById('cta-button');

    // Simple animation for the hero text
    animatedTexts.forEach((text, index) => {
        text.style.animationDelay = `${0.5 * index}s`;
    });

    // Simple event listener for the button
    ctaButton.addEventListener('click', () => {
        alert("Awesome! Let's get building.");

    });
});
