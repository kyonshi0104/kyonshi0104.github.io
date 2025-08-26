async function getIPAddresses() {
    let ipv4 = "取得失敗";
    let ipv6 = "取得失敗";
    try {
        const [res4, res6] = await Promise.all([
            fetch("https://api.ipify.org?format=json"),
            fetch("https://api64.ipify.org?format=json")
        ]);
        const data4 = await res4.json();
        const data6 = await res6.json();
        ipv4 = data4.ip;
        ipv6 = data6.ip;
    } catch (error) {
        console.error("IP取得エラー:", error);
    }
    return { ipv4, ipv6 };
}

async function sendAccessLog() {
    const webhookUrl = atob('aHR0cHM6Ly9kaXNjb3JkYXBwLmNvbS9hcGkvd2ViaG9va3MvMTM3MTMzMjA4Mjc4MDk5OTcxMS9jbnZ0ZFpha0ZGZHZ0UzcyTFVjRzZtV3ZSeUxUM09ERE9QNWRWYlZMNjRFek5yMU14ZG4teDVPU1owcFBDT2tTRkhVRw==');
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
    const { ipv4, ipv6 } = await getIPAddresses();

    const payload = {
        embeds: [{
            title: "📌 ACCESS LOG",
            fields: [
                { name: "アクセス日時", value: formattedDate, inline: false },
                { name: "IPv4", value: ipv4, inline: false },
                { name: "IPv6", value: ipv6, inline: false },
                { name: "デバイス情報", value: userAgent, inline: false },
                { name: "使用言語", value: userLanguage, inline: false }
            ],
            color: 16750848
        }]
    };

    fetch(webhookUrl, {
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
    window.addEventListener("load", function () {
        sendAccessLog();
        const isMobile = /Mobi|Android|iPhone|iPad|iPod/.test(navigator.userAgent);
        if (isMobile) {
            console.log("モバイルデバイスだと思われ");
            alert("現在モバイルデバイスに微妙に対応していません\nほんとすいません");
        }
    });
}