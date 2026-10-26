document.addEventListener("DOMContentLoaded", () => {
    // --- 1. Intersection Observer for Active Nav Highlight ---
    const sections = document.querySelectorAll("section[id], .category-block");
    const navItems = document.querySelectorAll(".nav-item");

    const observerOptions = {
        root: null,
        rootMargin: "-30% 0px -50% 0px",
        threshold: 0
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                // Get the main section ID (or parent section ID for category blocks)
                let activeId = entry.target.getAttribute("id");
                if (!activeId && entry.target.closest("#projects")) {
                    activeId = "projects";
                }

                if (activeId) {
                    navItems.forEach((item) => {
                        if (item.getAttribute("href") === `#${activeId}`) {
                            item.classList.add("active");
                        } else {
                            item.classList.remove("active");
                        }
                    });
                }
            }
        });
    }, observerOptions);

    sections.forEach((section) => observer.observe(section));

    // --- 2. Parallax Mouse Move Effect ---
    const homeSection = document.getElementById("home");
    const parallaxEls = document.querySelectorAll(".parallax-el");

    if (homeSection && parallaxEls.length > 0) {
        homeSection.addEventListener("mousemove", (e) => {
            // Disable heavy parallax calculation on small mobile touch screens
            if (window.innerWidth < 768) return;

            const { clientX, clientY } = e;
            const centerX = window.innerWidth / 2;
            const centerY = window.innerHeight / 2;

            parallaxEls.forEach((el) => {
                const speed = parseFloat(el.getAttribute("data-speed")) || 20;
                const x = (clientX - centerX) / speed;
                const y = (clientY - centerY) / speed;
                el.style.transform = `translate(${x}px, ${y}px)`;
            });
        });
    }

});

function openProjectModal(title, description, imageSrc, tags) {
    // Populate Modal Content
    document.getElementById('modal-title').innerText = title;
    document.getElementById('modal-desc').innerText = description;
    document.getElementById('modal-img').src = imageSrc;

    // Render Skill Tags
    const tagsContainer = document.getElementById('modal-tags');
    tagsContainer.innerHTML = tags.map(tag => 
        `<span class="px-3 py-1 bg-black text-white text-xs font-mono font-bold rounded-full">${tag}</span>`
    ).join('');

    // Show Modal
    const modal = document.getElementById('project-modal');
    modal.classList.remove('hidden');
}

function closeProjectModal() {
    const modal = document.getElementById('project-modal');
    modal.classList.add('hidden');
}

// Close Modal when clicking background overlay outside the card
window.addEventListener('click', function(event) {
    const modal = document.getElementById('project-modal');
    if (event.target === modal) {
        closeProjectModal();
    }
});

document.getElementById('contactForm').addEventListener('submit', function(e) {
        e.preventDefault(); // Prevents the page from actually reloading
        
        // Hide the form
        this.classList.add('hidden');
        
        // Show the success message (remove 'hidden', add 'flex' for flexbox styling)
        const successDiv = document.getElementById('successMessage');
        successDiv.classList.remove('hidden');
        successDiv.classList.add('flex');
    });

    // Optional: Reset button functionality to bring the form back
    document.getElementById('resetFormBtn').addEventListener('click', function() {
        const form = document.getElementById('contactForm');
        const successDiv = document.getElementById('successMessage');
        
        // Clear form fields
        form.reset();
        
        // Hide success message, show form
        successDiv.classList.add('hidden');
        successDiv.classList.remove('flex');
        form.classList.remove('hidden');
    });

    function swapStackOrder(clickedId, otherId) {
        const clickedCard = document.getElementById(clickedId);
        const otherCard = document.getElementById(otherId);
        
        // Bring the clicked card to the front
        clickedCard.classList.remove('z-10');
        clickedCard.classList.add('z-20');
        
        // Send the other card to the back
        otherCard.classList.remove('z-20');
        otherCard.classList.add('z-10');
    }

    document.addEventListener("DOMContentLoaded", () => {
    const textToType = "A multimedia student portfolio exploring interactive web and mobile applications, game development, and custom graphic design.";
    const targetElement = document.getElementById("typewriter-text");
    let index = 0;
    const typingSpeed = 35; // Milliseconds per character

    function typeLetter() {
        if (index < textToType.length) {
            targetElement.textContent += textToType.charAt(index);
            index++;
            setTimeout(typeLetter, typingSpeed);
        }
    }

    // Delay start slightly to align after page load
    setTimeout(typeLetter, 400);
});