if (window.self === window.top) {
    const path = location.pathname.slice(1);
    if (path) {
        location.replace(`${location.origin}?page=${encodeURIComponent(path)}`);
    }
}