const github_username = "kyonshi0104"
const note_username = "kyonshi0104"

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

            const github_signature = document.createElement("small");
            github_signature.textContent = "GitHub"
            github_signature.style.position = "absolute";
            github_signature.style.bottom = "11px";
            github_signature.style.right = "11px";
            github_signature.style.color = "gray";

            itemDiv.appendChild(title);
            itemDiv.appendChild(description);
            itemDiv.appendChild(language);
            itemDiv.appendChild(github_signature)

            itemDiv.style.position = "relative";

            itemDiv.id = "GitHub";

            itemDiv.onclick = function() {window.open(repo.html_url,"_blank");};

            return itemDiv;
        });

        return repoElements;
    } catch (error) {
        console.error("Error fetching repositories:", error);
        return [];
    }
}

async function fetchNoteArticles(username) {
    let url = `https://note.com/${username}/rss`;
    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
        const text = await response.text();

        const parser = new DOMParser();
        const xml = parser.parseFromString(text, "application/xml");

        const items = Array.from(xml.querySelectorAll("item"));

        const articleElements = items.map(item => {
            const itemDiv = document.createElement("div");
            itemDiv.className = "item";

            const title = document.createElement("h3");
            title.textContent = item.querySelector("title")?.textContent || "タイトルなし";

            const description = document.createElement("p");
            description.textContent = item.querySelector("description")?.textContent || "説明なし";

            const pubDate = document.createElement("small");
            pubDate.textContent = item.querySelector("pubDate")?.textContent || "";

            const note_signature = document.createElement("small");
            note_signature.textContent = "note";
            note_signature.style.position = "absolute";
            note_signature.style.bottom = "11px";
            note_signature.style.right = "11px";
            note_signature.style.color = "gray";

            itemDiv.appendChild(title);
            itemDiv.appendChild(description);
            itemDiv.appendChild(pubDate);
            itemDiv.appendChild(note_signature);

            itemDiv.style.position = "relative";

            itemDiv.id = "Note";

            const link = item.querySelector("link")?.textContent;
            if (link) {
                itemDiv.onclick = function() { window.open(link, "_blank"); };
            }

            return itemDiv;
        });

        return articleElements;
    } catch (error) {
        console.error("Error fetching note articles:", error);
        return [];
    }
}

async function fetchNoteArticlesFromJson() {
    try {
        const response = await fetch("/res/data/notes.json");
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
        const articles = await response.json();

        const articleElements = articles.map(article => {
            const itemDiv = document.createElement("div");
            itemDiv.className = "item";

            const title = document.createElement("h3");
            title.textContent = article.title || "タイトルなし";

            const description = document.createElement("p");
            description.textContent = article.description || "説明なし";

            const pubDate = document.createElement("small");
            pubDate.textContent = article.pubDate || "";

            const note_signature = document.createElement("small");
            note_signature.textContent = "note";
            note_signature.style.position = "absolute";
            note_signature.style.bottom = "11px";
            note_signature.style.right = "11px";
            note_signature.style.color = "gray";

            itemDiv.appendChild(title);
            itemDiv.appendChild(description);
            itemDiv.appendChild(pubDate);
            itemDiv.appendChild(note_signature);

            itemDiv.style.position = "relative";
            itemDiv.id = "Note";

            itemDiv.style.display = "None";

            if (article.link) {
                itemDiv.onclick = function() { window.open(article.link, "_blank"); };
            }

            return itemDiv;
        });

        return articleElements;
    } catch (error) {
        console.error("Error fetching note articles:", error);
        return [];
    }
}



document.addEventListener("DOMContentLoaded", function () {
    const container = document.getElementById("works_container");

    // GitHub リポジトリ一覧
    fetchRepositories(github_username).then(repoElements => {
        repoElements.forEach(element => container.appendChild(element));
    });

    // note 記事一覧（手動更新）
    fetchNoteArticlesFromJson().then(articleElements => {
        articleElements.forEach(element => container.appendChild(element));
    });
});
