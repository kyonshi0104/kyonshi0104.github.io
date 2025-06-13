const currentUrl = window.location.href;

if (currentUrl.endsWith("base.html")) {
    window.location.href = "/";
}

window.onload = function() {
    if (/Mobi|Android|iPhone|iPad|iPod/.test(navigator.userAgent)) {
        alert("現在モバイルデバイスに対応してないです\nほんとすいません");
    }
};