document.addEventListener("DOMContentLoaded", () => {
    const toggle = document.getElementById("hamburger");
    const sidebar = document.getElementById("sidebar")
    const back = document.getElementById("back");
    const tabs = document.querySelectorAll(".tab");

    toggle.addEventListener("click", () => {
        toggle.classList.toggle("active");
        sidebar.classList.toggle("hidden");
        back.classList.toggle("hovered");
    });

    tabs.forEach(el => {
        el.addEventListener("click", () => {
            toggle.classList.toggle("active");
            sidebar.classList.toggle("hidden");
            back.classList.toggle("hovered");
        });
    });
});
