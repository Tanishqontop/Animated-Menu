document.addEventListener("DOMContentLoaded", function () {
    console.log("DOM fully loaded");

    // Split text into spans for animation
    splitTextIntoSpans(".hero-copy h1"); // Splitting "Hello"
    splitTextIntoSpans(".logo p"); // Splitting "Hi"

    // Animate images
    gsap.to(".img-holder img", {
        left: 0,
        stagger: 0.1,
        ease: "power4.out",
        duration: 1.5,
        delay: 4,
    });

    gsap.to(".img-holder img", {
        left: "110%",
        stagger: -0.1,
        ease: "power4.out",
        duration: 1.5,
        delay: 7,
    });

    // Start the loader animation
    startLoader();
});

function splitTextIntoSpans(selector) {
    var element = document.querySelector(selector);
    if (element && element.innerText.trim()) {
        console.log(`Splitting text for selector: ${selector}`);
        var text = element.innerText;
        var splitText = text
            .split("")
            .map((char) => `<span>${char}</span>`)
            .join("");
        element.innerHTML = splitText;
        console.log(`Split text: ${element.innerHTML}`);
    } else {
        console.error(`Element not found or empty for selector: ${selector}`);
    }
}

function startLoader() {
    var counterElement = document.querySelector(".counter p");
    var logoElement = document.querySelector(".logo p"); // "Hi" text container
    var currentValue = 0;

    if (!counterElement || !logoElement) {
        console.error("Counter or Logo element not found!");
        return;
    }

    // Hide "Hi" initially
    gsap.set(".logo p span", { opacity: 0, top: "30px" });

    function updateCounter() {
        if (currentValue >= 100) {
            console.log("Counter reached 100%, starting text animation");
            animateText();
            return;
        }

        currentValue += Math.floor(Math.random() * 10) + 1;
        currentValue = Math.min(currentValue, 100);

        counterElement.innerHTML =
            currentValue
                .toString()
                .split("")
                .map((char) => `<span>${char}</span>`)
                .join("") + "<span>%</span>";

        var delay = Math.floor(Math.random() * 200) + 100;
        setTimeout(updateCounter, delay);
    }

    function animateText() {
        setTimeout(() => {
            console.log("Animating text");

            // Move counter text up (exit)
            gsap.to(".counter p span", {
                top: "-400px",
                stagger: 0.1,
                ease: "power3.inOut",
                duration: 1,
                onComplete: () => {
                    console.log("Counter animation complete, replacing with 'Hi'");

                    // Replace Counter with "Hi" & split into spans
                    counterElement.innerHTML = logoElement.innerHTML; // Preserve spans
                    splitTextIntoSpans(".counter p"); // Reapply span splitting

                    // Animate "Hi" appearing letter by letter
                    gsap.set(".counter p span", { opacity: 0, top: "30px" });
                    gsap.to(".counter p span", {
                        opacity: 1,
                        top: "0px",
                        stagger: 0.1,
                        ease: "power3.inOut",
                        duration: 1.7,
                        onComplete: () => {
                            console.log("Hi animation complete");

                            // 🔥 Now exit "Hi" the same way as counter
                            setTimeout(() => {
                                gsap.to(".counter p span", {
                                    top: "-400px", // Moves up like counter
                                    stagger: 0.1,
                                    ease: "power3.inOut",
                                    duration: 0.4,
                                    onComplete: () => {
                                        console.log("Hi exit animation complete");
                                    },
                                });
                            }, 1000); // Delay before Hi exits
                        },
                    });
                },
            });

            // Fade out overlay
            gsap.to(".overlay", {
                opacity: 0,
                ease: "power3.inOut",
                duration: 1,
                delay: 4,
            });

            // Scale up hero video
            gsap.to(".hero video", {
                scale: 1,
                ease: "power3.inOut",
                duration: 2,
                delay: 3.5,
            });

            // Keep "Hello" animation unchanged
            gsap.to(".hero-copy h1 span", {
                top: "0",
                stagger: 0.1,
                ease: "power3.inOut",
                duration: 2,
                delay: 4,
            });
        }, 500);
    }

    updateCounter();
}
