async function fetchRepositories(username) {
    const url = `https://api.github.com/users/${username}/repos`;
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
            language.textContent = repo.language || "言語不明";

            itemDiv.appendChild(title);
            itemDiv.appendChild(description);
            itemDiv.appendChild(language);

            return itemDiv;
        });

        return repoElements;
    } catch (error) {
        console.error("Error fetching repositories:", error);
        return [];
    }
}

fetchRepositories("kyonshi0104").then(repoElements => {
const container = document.getElementById("works_container");
repoElements.forEach(element => container.appendChild(element))
});