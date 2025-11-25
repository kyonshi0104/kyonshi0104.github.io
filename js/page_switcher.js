const development = true

function waitForLoad(iframe) {
    return new Promise(resolve => {
        iframe.onload = () => resolve();
    });
}

document.addEventListener("DOMContentLoaded", () => {

    const elements = document.querySelectorAll(".tab");
    const iframe = document.getElementById("main_content")

    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    async function page_switch(page) {
        iframe.classList.add("disapper");

        await sleep(500)
        iframe.src = `${page}`
        await waitForLoad(iframe);
        history.pushState(null, "", page);
        iframe.classList.remove("disapper");
    }

    elements.forEach(el => {
        el.addEventListener("click", () => {
            page_switch(el.id);
        });
    });
});
