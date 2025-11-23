function link_redirect(link) {
    window.open(link, "_blank");
}

document.addEventListener("DOMContentLoaded", () => {
    const elements = document.querySelectorAll(".link");

    elements.forEach(el => {
        el.addEventListener("click", () => {
            link_redirect(el.dataset.href);
        });
    });
});