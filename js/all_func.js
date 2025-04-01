function iframe_change(newUrl) {
    const iframe = (window.self !== window.top)
        ? window.top.document.querySelector('iframe.content_html')
        : document.querySelector('iframe.content_html');

    if (!iframe) {
        console.error('クラス .content_html を持つiframeが見つかりません');
        return;
    }

    const isSameFrame = (window.self === iframe.contentWindow);

    if (isSameFrame) {
        window.location.href = newUrl;
    } else {
        iframe.style.transition = "opacity 0.4s";
        iframe.style.opacity = "0";

        setTimeout(() => {
            iframe.src = newUrl;
            iframe.addEventListener('load', function onLoad() {
                iframe.style.opacity = "1";
                iframe.removeEventListener('load', onLoad);
            });
        }, 400);
    }
}




function locate_change(newURL) {
    if (window.self !== window.top) {
        window.top.history.replaceState(null, null, newURL);
    } else {
        history.replaceState(null, null, newURL);
    }
    iframe_change(newURL);
}

