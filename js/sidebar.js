document.addEventListener("DOMContentLoaded", () => {
    const sidebar = document.getElementById("sidebar");
    const hover_background = document.getElementById("back");

    if (sidebar && hover_background) {
        sidebar.addEventListener("mouseenter", () => {
            console.log("sidebar: hover");
            hover_background.classList.add("hovered");
        });

        sidebar.addEventListener("mouseleave", () => {
            console.log("sidebar: leave");
            hover_background.classList.remove("hovered");
        });
    }
});
