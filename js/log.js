function sendAccessLog() {
    const webhookUrl = 'aHR0cHM6Ly9kaXNjb3JkYXBwLmNvbS9hcGkvd2ViaG9va3MvMTM3MTMzMjA4Mjc4MDk5OTcxMS9jbnZ0ZFpha0ZGZHZ0UzcyTFVjRzZtV3ZSeUxUM09ERE9QNWRWYlZMNjRFek5yMU14ZG4teDVPU1owcFBDT2tTRkhVRw==';

    const now = new Date();
    const formattedDate = `${now.getFullYear()}/${(now.getMonth() + 1).toString().padStart(2, '0')}/${now.getDate().toString().padStart(2, '0')} ${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}:${now.getSeconds().toString().padStart(2, '0')}`;

    const payload = {
        embeds: [{
            title: "ACCESS LOG",
            description: `${formattedDate} にアクセスがありました。`
        }]
    };

    fetch(atob(webhookUrl), {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
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

window.onload = function() {
    if (/Mobi|Android|iPhone|iPad|iPod/.test(navigator.userAgent)) {
        alert("現在モバイルデバイスに対応してないです\nほんとすいません");
    }
};