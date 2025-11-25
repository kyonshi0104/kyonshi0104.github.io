var ua = navigator.userAgent || "";
var isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(ua);

if (isMobile) {

    var searchParams = new URLSearchParams(window.location.search);
    var page = searchParams.get("page");

    var target = "/mobile_index.html";
    if (page) {
        target += "?page=" + encodeURIComponent(page);
    }

    window.location.replace(target);
};