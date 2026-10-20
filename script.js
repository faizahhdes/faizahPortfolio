
        document.addEventListener('DOMContentLoaded', () => {
            const text = document.getElementById('welcome-text');
            const bg = document.getElementById('bg-layer');
            const parallaxElements = document.querySelectorAll('.parallax-el');

            // Listen for mouse movement across the whole window
            window.addEventListener('mousemove', (e) => {
                // Calculate mouse position relative to the center of the screen
                const x = (e.clientX / window.innerWidth - 0.5) * 2; // Range: -1 to 1
                const y = (e.clientY / window.innerHeight - 0.5) * 2; // Range: -1 to 1

                // Move text slightly towards the mouse
                const textMoveX = x * 15; // Max 15px movement
                const textMoveY = y * 15;
                text.style.transform = `translate(${textMoveX}px, ${textMoveY}px)`;

                // Move background slightly away from the mouse (creates depth)
                const bgMoveX = x * -10; // Max 10px movement in opposite direction
                const bgMoveY = y * -10;
                // Scale it up slightly so the edges don't show when it moves
                bg.style.transform = `scale(1.05) translate(${bgMoveX}px, ${bgMoveY}px)`;

                // NEW: Move floating elements based on their data-speed attribute
                document.querySelectorAll('.parallax-el').forEach(el => {
                    const speed = el.getAttribute('data-speed');
                    // Reverse the direction to look like they are floating above the background
                    const elX = (x * speed);
                    const elY = (y * speed);
                    el.style.transform = `translate(${elX}px, ${elY}px)`;
                });
            });

            // Reset positions when mouse leaves the window
            window.addEventListener('mouseleave', () => {
                text.style.transform = 'translate(0px, 0px)';
                bg.style.transform = 'scale(1) translate(0px, 0px)';
                
                // NEW: Reset floating elements
                document.querySelectorAll('.parallax-el').forEach(el => {
                    el.style.transform = 'translate(0px, 0px)';
                });
            });
        });
  