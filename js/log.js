const webhookUrl = "https://discord.com/api/webhooks/1357983812503736330/kEIzuHZyXQDCqyhE0YA4YCuoDwvbgkk2lFiNwVxH_yLfOqNaMCtP8QD7VNjWAIe0Hz8Z";

const getCurrentTime = () => {
    const date = new Date();
    const yyyy = date.getFullYear();
    const mm = String(date.getMonth() + 1).padStart(2, '0');
    const dd = String(date.getDate()).padStart(2, '0');
    const hh = String(date.getHours()).padStart(2, '0');
    const mi = String(date.getMinutes()).padStart(2, '0');
    const ss = String(date.getSeconds()).padStart(2, '0');
    return `${yyyy}/${mm}/${dd} ${hh}:${mi}:${ss}`;
};

async function getIpAddress() {
    const response = await fetch("https://api.ipify.org?format=json");
    const data = await response.json();
    return data.ip;
}

async function sendEmbedToDiscord() {
    try {
        const ip = await getIpAddress();
        const currentTime = getCurrentTime();

        const embed = {
            embeds: [{
                title: "ACCESSED",
                description: `${currentTime} に ${ip} からアクセスがありました`,
                color: 3447003
            }]
        };

        const response = await fetch(webhookUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(embed)
        });

        if (response.ok) {
            console.log("Webhookに送信成功！");
        } else {
            console.error("送信失敗:", response.statusText);
        }
    } catch (error) {
        console.error("エラーが発生しました:", error);
    }
}

if (window.self === window.top) {
    sendEmbedToDiscord();
}
