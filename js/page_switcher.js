const development = true

document.addEventListener("DOMContentLoaded", () => {

    const elements = document.querySelectorAll(".tab");
    const iframe = document.getElementById("main_content")

    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    async function page_switch(page) {
        iframe.classList.add("disapper");

        await sleep(500)
        iframe.src = `${page}.html`
        //history.pushState(null, "", page);
        iframe.classList.remove("disapper");
    }

    elements.forEach(el => {
        el.addEventListener("click", () => {
            page_switch(el.id);
        });
    });
});
