document.addEventListener("DOMContentLoaded", function () {
    const sortItems = document.querySelectorAll(".sort_item");

    sortItems.forEach(sortItem => {
        sortItem.addEventListener("click", function () {
            if (!this.classList.contains("focused")) {
                sortItems.forEach(item => item.classList.remove("focused"));

                this.classList.add("focused");

                const items = document.querySelectorAll(".item");
                items.forEach(item => {
                    if (item.id === this.id) {
                        item.style.display = "";
                    } else {
                        item.style.display = "none";
                    }
                });
            }
        });
    });
});
