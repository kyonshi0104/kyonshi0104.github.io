function iframe_change(newUrl) {
    const iframe = document.querySelector('iframe.content_html');
    if (!iframe) {
        console.error('クラス .content_html を持つiframeが見つかりません');
        return;
    }

    iframe.style.transition = "opacity 0.4s";
    iframe.style.opacity = "0";

    setTimeout(() => {
        iframe.src = newUrl;
        iframe.style.opacity = "1";
    }, 400);
}


function locate_change(newURL) {
    history.replaceState(null, null, newURL);
    iframe_change(newURL);
}
