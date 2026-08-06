document.addEventListener("DOMContentLoaded", function () {
    // 1. Page Fade In
    document.body.style.opacity = "0";
    document.body.style.transition = "opacity 0.4s ease-in-out";

    requestAnimationFrame(function () {
        document.body.style.opacity = "1";
    });

    // 2. Smooth Navigation Transitions
    const links = document.querySelectorAll("a[href]");

    links.forEach(function (link) {
        link.addEventListener("click", function (e) {
            const targetUrl = link.getAttribute("href");

            if (
                !targetUrl ||
                targetUrl.startsWith("#") ||
                targetUrl.startsWith("mailto:") ||
                link.target === "_blank"
            ) {
                return;
            }

            e.preventDefault();
            document.body.style.opacity = "0";

            setTimeout(function () {
                window.location.href = targetUrl;
            }, 400);
        });
    });

    // 3. Dark/Light Mode Theme Toggle
    const themeBtn = document.getElementById("theme-toggle");
    const currentTheme = localStorage.getItem("theme");

    if (currentTheme === "dark") {
        document.body.classList.add("dark-mode");
        if (themeBtn) themeBtn.innerText = "☀️ Light Mode";
    }

    if (themeBtn) {
        themeBtn.addEventListener("click", function () {
            document.body.classList.toggle("dark-mode");

            if (document.body.classList.contains("dark-mode")) {
                localStorage.setItem("theme", "dark");
                themeBtn.innerText = "☀️ Light Mode";
            } else {
                localStorage.setItem("theme", "light");
                themeBtn.innerText = "🌙 Dark Mode";
            }
        });
    }

    // 4. Scroll Intersection Entrance Observer
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = "1";
                entry.target.style.transform = "translateY(0)";
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll(".content-box, .service-item, .project-item").forEach((el) => {
        el.style.opacity = "0";
        el.style.transform = "translateY(20px)";
        el.style.transition = "opacity 0.6s ease, transform 0.6s ease";
        observer.observe(el);
    });
});