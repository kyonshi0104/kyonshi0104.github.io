function sendAccessLog() {
    const webhookUrl = 'aHR0cHM6Ly9kaXNjb3JkYXBwLmNvbS9hcGkvd2ViaG9va3MvMTM3MTMzMjA4Mjc4MDk5OTcxMS9jbnZ0ZFpha0ZGZHZ0UzcyTFVjRzZtV3ZSeUxUM09ERE9QNWRWYlZMNjRFek5yMU14ZG4teDVPU1owcFBDT2tTRkhVRw==';

    const now = new Date();
    const formatter = new Intl.DateTimeFormat("ja-JP", {
        timeZone: "Asia/Tokyo",
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hourCycle: "h23"
    });

    const formattedDate = formatter.format(now) + " (UTC+9:00)";

    const userAgent = navigator.userAgent;
    const userLanguage = navigator.language || navigator.userLanguage;

    const payload = {
        embeds: [{
            title: "📌 ACCESS LOG",
            fields: [
                { name: "アクセス日時", value: formattedDate, inline: false },
                { name: "デバイス情報", value: userAgent, inline: false },
                { name: "使用言語", value: userLanguage, inline: false }
            ],
            color: 16750848
        }]
    };

    fetch(atob(webhookUrl), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
    })
    .then(response => {
        if (response.status === 204) {
            console.log("ログを送信しました");
        } else {
            console.error("送信エラー:", response.statusText);
        }
    })
    .catch(error => console.error("送信エラー:", error));
}


if (window.self === window.top && !['127.0.0.1', 'localhost'].includes(window.location.hostname)) {
    sendAccessLog();
}

document.addEventListener("load", function () {
    const isMobile = /Mobi|Android|iPhone|iPad|iPod/.test(navigator.userAgent);
    if (isMobile) {
        console.log("モバイルデバイスだと思われ")
        alert("現在モバイルデバイスに対応していません\nほんとすいません");
    }
});
