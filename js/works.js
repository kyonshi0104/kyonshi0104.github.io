async function fetchRepositories(username) {
    let url = `https://api.github.com/users/${username}/repos`;
    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
        const repos = await response.json();

        const repoElements = repos.map(repo => {
            const itemDiv = document.createElement("div");
            itemDiv.className = "item";

            const title = document.createElement("h3");
            title.textContent = repo.name.replace(/[-_]/g, " ");

            const description = document.createElement("p");
            description.textContent = repo.description || "説明なし";

            const language = document.createElement("small");
            language.textContent = repo.language || "";

            itemDiv.appendChild(title);
            itemDiv.appendChild(description);
            itemDiv.appendChild(language);

            itemDiv.onclick = function() {window.open(repo.html_url,"_blank");};

            return itemDiv;
        });

        return repoElements;
    } catch (error) {
        console.error("Error fetching repositories:", error);
        return [];
    }
}

document.addEventListener("DOMContentLoaded", function () {
    fetchRepositories("kyonshi0104").then(repoElements => {
        const container = document.getElementById("works_container");
        repoElements.forEach(element => container.appendChild(element))
});
})