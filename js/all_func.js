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

function removeHtmlExtension(url) {
    return url.endsWith('.html') ? url.slice(0, -5) : url;
}


function locate_change(newURL) {
    newURLe = removeHtmlExtension(newURL);
    if (window.self !== window.top) {
        window.top.history.replaceState(null, null, newURLe);
    } else {
        history.replaceState(null, null, newURLe);
    }
    iframe_change(newURL);
}

