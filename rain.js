document.addEventListener("DOMContentLoaded", () => {
    // Ripple effect logic
    const addRippleEffect = (link) => {
        const linkRect = link.getBoundingClientRect();
        const centerX = linkRect.left + linkRect.width / 2;
        const centerY = linkRect.top + linkRect.height / 2;

        // Create ripple container
        const rippleContainer = document.createElement("span");
        rippleContainer.classList.add("ripple-container");

        for (let i = 0; i < 3; i++) {
            setTimeout(() => {
                const rippleRing = document.createElement("div");
                rippleRing.classList.add("ripple-ring");
                rippleRing.style.animationDelay = `${i * 0.633}s`; // Stagger the animation for each ring

                // Append the rings to the ripple container
                rippleContainer.appendChild(rippleRing);
            }, i * 333); // Wait 333ms between each ring
        }

        // Position the ripple container
        rippleContainer.style.position = "absolute";
        rippleContainer.style.left = `${centerX - 25}px`;
        rippleContainer.style.top = `${centerY - 25}px`;
        rippleContainer.style.transform = "translate(-50%, -50%)"; // Center the ripple
        document.body.appendChild(rippleContainer);

        // Remove the ripple container after animation
        setTimeout(() => {
            rippleContainer.remove();
        }, 1000); // Matches the ripple animation duration
    };

    // Add event listener to links
    const links = document.querySelectorAll("a");
    links.forEach(link => {
        // Only trigger ripple effect if the link has the 'ripple' class or any custom attribute
        if (link.classList.contains("ripple")) {
            link.addEventListener("click", (e) => {
                e.preventDefault();

                setTimeout(() => addRippleEffect(link), 0);      // First ripple immediately
                setTimeout(() => addRippleEffect(link), 111);    // Second ripple after 333ms
                setTimeout(() => addRippleEffect(link), 222);    // Third ripple after 666ms

                // Redirect after a short delay
                setTimeout(() => {
                    window.location.href = link.href;
                }, 1000); // Adjust delay as needed
            });
        }
    });

    // Rain animation logic
    const rainContainer = document.createElement("div");
    rainContainer.classList.add("rain-container");
    document.body.appendChild(rainContainer);

    const createRaindrop = (x, y) => {
        const raindrop = document.createElement("div");
        raindrop.classList.add("raindrop");
        raindrop.style.left = `${x}px`;
        raindrop.style.top = `${y}px`;
        rainContainer.appendChild(raindrop);

        setTimeout(() => {
            raindrop.remove();
        }, 1000); // Matches the fall duration
    };

    const generateRain = () => {
        setInterval(() => {
            const x = Math.random() * window.innerWidth;
            const y = -10;
            createRaindrop(x, y);
        }, 3); // Create a raindrop every 50ms
    };

    const shieldRainAroundMouse = (e) => {
        const mouseX = e.clientX;
        const mouseY = e.clientY;

        const raindrops = document.querySelectorAll(".raindrop");
        raindrops.forEach(raindrop => {
            const dropX = raindrop.offsetLeft;
            const dropY = raindrop.offsetTop;

            const distance = Math.sqrt(Math.pow(mouseX - dropX, 2) + Math.pow(mouseY - dropY, 2));
            if (distance < 50) {
                raindrop.style.opacity = "0";
            } else {
                raindrop.style.opacity = "0.7";
            }
        });
    };

    generateRain();
    document.addEventListener("mousemove", shieldRainAroundMouse);
});
