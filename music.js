document.addEventListener('DOMContentLoaded', () => {
    const statsSection = document.getElementById('statistics');
    const statNumbers = document.querySelectorAll('.stat-number');
    let animated = false; // Flag to ensure animation runs only once

    // Function to animate a single number
    const animateNumber = (element) => {
        const target = +element.getAttribute('data-target'); // Get target number
        const duration = 2000; // Animation duration in milliseconds (2 seconds)
        const intervalTime = 20; // Update interval in milliseconds
        const step = target / (duration / intervalTime); // Calculate increment step

        let current = 0;

        const timer = setInterval(() => {
            current += step;
            if (current >= target) {
                clearInterval(timer);
                element.innerText = target.toLocaleString(); // Format with commas if needed
            } else {
                element.innerText = Math.ceil(current).toLocaleString();
            }
        }, intervalTime);
    };

    // Intersection Observer setup
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            // Check if the section is intersecting and animation hasn't run yet
            if (entry.isIntersecting && !animated) {
                statNumbers.forEach(num => {
                    animateNumber(num);
                });
                animated = true; // Set flag to true after starting animation
                observer.unobserve(statsSection); // Optional: Stop observing after animation
            }
        });
    }, {
        threshold: 0.3 // Trigger when 30% of the section is visible
    });

    // Start observing the statistics section
    if (statsSection) {
        observer.observe(statsSection);
    }
});