function sendAccessLog() {
    const webhookUrl = 'aHR0cHM6Ly9kaXNjb3JkYXBwLmNvbS9hcGkvd2ViaG9va3MvMTM3MTMzMjA4Mjc4MDk5OTcxMS9jbnZ0ZFpha0ZGZHZ0UzcyTFVjRzZtV3ZSeUxUM09ERE9QNWRWYlZMNjRFek5yMU14ZG4teDVPU1owcFBDT2tTRkhVRw==';

    // 日本時間 (UTC+9:00) に強制
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

    // デバイス情報
    const userAgent = navigator.userAgent;

    // 言語設定
    const userLanguage = navigator.language || navigator.userLanguage;

    const payload = {
        embeds: [{
            title: "ACCESS LOG",
            description: `${formattedDate} にアクセスがありました。\nデバイス情報: ${userAgent}\n使用言語: ${userLanguage}`
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

document.addEventListener("DOMContentLoaded", function () {
    const isMobile = /Mobi|Android|iPhone|iPad|iPod/.test(navigator.userAgent);
    if (isMobile) {
        alert("現在モバイルデバイスに対応していません\nほんとすいません");
    }
});
