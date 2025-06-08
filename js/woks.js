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
            title.textContent = repo.name.replace(/[-_]/g, " "); // 見やすくするために "-" や "_" をスペースに変換

            const description = document.createElement("p");
            description.textContent = repo.description || "説明なし"; // 説明がない場合のデフォルト

            const language = document.createElement("small");
            language.textContent = repo.language || "言語不明"; // 言語がない場合のデフォルト

            // 要素を `itemDiv` に追加
            itemDiv.appendChild(title);
            itemDiv.appendChild(description);
            itemDiv.appendChild(language);

            return itemDiv;
        });

        return repoElements; // 生成した要素のリストを返す
    } catch (error) {
        console.error("Error fetching repositories:", error);
        return [];
    }
}

fetchRepositories("kyonshi0104").then(repoElements => {
const container = document.getElementById("works_container"); // 表示するコンテナ
repoElements.forEach(element => container.appendChild(element))
};