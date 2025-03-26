let currentUrl = window.location.href;
if (currentUrl.endsWith("index.html")) {
    const newUrl = currentUrl.replace(/index\.html$/, "");
    history.replaceState(null, null, newUrl);
    currentUrl = newUrl;
}