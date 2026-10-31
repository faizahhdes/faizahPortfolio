document.addEventListener("DOMContentLoaded", () => {
    
    // --- 1. Intersection Observer for Active Nav Highlight ---
    const sections = document.querySelectorAll("section[id], .category-block");
    const navItems = document.querySelectorAll(".nav-item, .nav-link");

    const observerOptions = {
        root: null,
        rootMargin: "-30% 0px -50% 0px",
        threshold: 0
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
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

    // --- 3. Dynamic Typewriter Subheading ---
    const textToType = "A multimedia student portfolio exploring interactive web and mobile applications, game development, and custom graphic design.";
    const targetElement = document.getElementById("typewriter-text");
    let index = 0;
    const typingSpeed = 35;

    if (targetElement) {
        function typeLetter() {
            if (index < textToType.length) {
                targetElement.textContent += textToType.charAt(index);
                index++;
                setTimeout(typeLetter, typingSpeed);
            }
        }
        setTimeout(typeLetter, 400);
    }

    // --- 4. Mobile Hamburger Menu Toggle ---
    const menuToggle = document.getElementById("menu-toggle");
    const mobileMenu = document.getElementById("mobile-menu");
    const mobileLinks = document.querySelectorAll(".mobile-link");

    if (menuToggle && mobileMenu) {
        menuToggle.addEventListener("click", () => {
            mobileMenu.classList.toggle("hidden");
            menuToggle.classList.toggle("open");
        });

        mobileLinks.forEach(link => {
            link.addEventListener("click", () => {
                mobileMenu.classList.add("hidden");
                menuToggle.classList.remove("open");
            });
        });
    }

    // --- 5. Contact Form Validation & Feedback ---
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            this.classList.add('hidden');
            const successDiv = document.getElementById('successMessage');
            if (successDiv) {
                successDiv.classList.remove('hidden');
                successDiv.classList.add('flex');
            }
        });
    }

    const resetBtn = document.getElementById('resetFormBtn');
    if (resetBtn) {
        resetBtn.addEventListener('click', function() {
            const form = document.getElementById('contactForm');
            const successDiv = document.getElementById('successMessage');
            if (form && successDiv) {
                form.reset();
                successDiv.classList.add('hidden');
                successDiv.classList.remove('flex');
                form.classList.remove('hidden');
            }
        });
    }

    // --- 6. Back-to-Top Floating Button ---
    const backToTopBtn = document.createElement("button");
    backToTopBtn.id = "backToTop";
    backToTopBtn.innerHTML = "↑";
    backToTopBtn.className = "fixed bottom-6 left-6 hidden bg-[#4D2A00] text-white w-10 h-10 rounded-full border-2 border-black font-bold shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] z-40 transition-all hover:scale-110";
    document.body.appendChild(backToTopBtn);

    window.addEventListener("scroll", () => {
        if (window.scrollY > 400) {
            backToTopBtn.classList.remove("hidden");
        } else {
            backToTopBtn.classList.add("hidden");
        }
    });

    backToTopBtn.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    });

    // --- 7. Image Lightbox Zoom ---
    document.querySelectorAll(".zoomable-img").forEach(img => {
        img.addEventListener("click", () => {
            const lightbox = document.createElement("div");
            lightbox.className = "fixed inset-0 bg-black/80 flex items-center justify-center z-50 cursor-pointer p-4";
            lightbox.innerHTML = `<img src="${img.src}" class="max-w-full max-h-full rounded-2xl border-4 border-white shadow-2xl">`;
            lightbox.addEventListener("click", () => lightbox.remove());
            document.body.appendChild(lightbox);
        });
    });

});

// --- 8. Project Modal Manager ---
function openProjectModal(title, description, imageSrc, tags) {
    document.getElementById('modal-title').innerText = title;
    document.getElementById('modal-desc').innerText = description;
    document.getElementById('modal-img').src = imageSrc;

    const tagsContainer = document.getElementById('modal-tags');
    tagsContainer.innerHTML = tags.map(tag => 
        `<span class="px-3 py-1 bg-black text-white text-xs font-mono font-bold rounded-full">${tag}</span>`
    ).join('');

    const modal = document.getElementById('project-modal');
    modal.classList.remove('hidden');
}

function closeProjectModal() {
    const modal = document.getElementById('project-modal');
    modal.classList.add('hidden');
}

window.addEventListener('click', function(event) {
    const modal = document.getElementById('project-modal');
    if (event.target === modal) {
        closeProjectModal();
    }
});

// --- 9. Interactive Stack Order Swapper ---
function swapStackOrder(clickedId, otherId) {
    const clickedCard = document.getElementById(clickedId);
    const otherCard = document.getElementById(otherId);
    if (clickedCard && otherCard) {
        clickedCard.classList.remove('z-10');
        clickedCard.classList.add('z-20');
        otherCard.classList.remove('z-20');
        otherCard.classList.add('z-10');
    }
}

// --- 10. Copy-to-Clipboard Function ---
function copyEmailToClipboard(emailText = "student@example.com") {
    navigator.clipboard.writeText(emailText).then(() => {
        const toast = document.createElement("div");
        toast.className = "fixed bottom-6 right-6 bg-black text-white px-4 py-2 rounded-xl text-xs font-mono shadow-lg z-50 transition-opacity duration-300";
        toast.innerText = "Email copied to clipboard!";
        document.body.appendChild(toast);
        
        setTimeout(() => {
            toast.style.opacity = "0";
            setTimeout(() => toast.remove(), 300);
        }, 2000);
    });
}
