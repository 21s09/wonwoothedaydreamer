window.addEventListener("DOMContentLoaded", () => {

    // ===== HERO =====

    const heroText = "\"that just a daydream!\"";
    const heroTarget = document.getElementById("typing");

    if (heroTarget) {

        let index = 0;

        function heroTyping() {

            if (index < heroText.length) {

                heroTarget.textContent += heroText.charAt(index);

                index++;

                setTimeout(heroTyping, 150);

            }

        }

        heroTyping();

    }


    // ===== ABOUT =====

    const aboutTarget = document.getElementById("aboutTyping");
    const aboutSection = document.getElementById("about");

    if (aboutTarget && aboutSection) {

        const aboutText = "DAYDREAMER";

        let played = false;

        function startAboutTyping() {

            aboutTarget.textContent = "";

            let i = 0;

            function type() {

                if (i < aboutText.length) {

                    aboutTarget.textContent += aboutText.charAt(i);

                    i++;

                    setTimeout(type, 150);

                }

            }

            type();

        }

        const observer = new IntersectionObserver((entries) => {

            entries.forEach(entry => {

                if (entry.isIntersecting && !played) {

                    played = true;

                    startAboutTyping();

                }

            });

        }, {

            threshold: 0.5

        });

        observer.observe(aboutSection);

    }

});