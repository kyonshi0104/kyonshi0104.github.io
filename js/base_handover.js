const url = new URL(window.location.href);


document.addEventListener("DOMContentLoaded", () => {
    const page = url.searchParams.get("page");
    if (page) {
        const iframe = document.getElementById("main_content")
        iframe.src = `${page}`
        history.pushState(null, "", page);
    } else {
        history.pushState(null,"","/")
    }
});
