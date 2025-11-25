const url = new URL(window.location.href);
const page = url.searchParams.get("page")

document.addEventListener("DOMContentLoaded", () => {
    if (page) {
        const iframe = document.getElementById("main_content")
        iframe.src = `${page}`
        history.pushState(null, "", page);
    } else {
        history.pushState(null,"","/")
    }
});
