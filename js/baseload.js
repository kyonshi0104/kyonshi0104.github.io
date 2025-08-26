if (window.self === window.top) {
    const isMobile = /Mobi|Android|iPhone|iPad|iPod/.test(navigator.userAgent);
    const basePath = isMobile ? '/mobile_base.html' : '/base.html';

    fetch(basePath)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.text();
        })
        .then(baseHtml => {
            const parser = new DOMParser();
            const doc = parser.parseFromString(baseHtml, 'text/html');

            document.documentElement.innerHTML = doc.documentElement.innerHTML;

            const targetIframe = document.querySelector('iframe.content_html');
            if (targetIframe) {
                targetIframe.src = window.location.href;
            } else {
                console.error('Iframe with class .content_html not found');
            }

            const listItems = document.querySelectorAll('.sidebar > * > li');
            listItems.forEach(item => {
                item.addEventListener('click', function () {
                    locate_change(this.dataset.src);
                });
            });

        if (isMobile) {
                document.addEventListener('click', function (event) {
                    const menuToggle = document.getElementById('menu-toggle');
                    const sidebars = document.querySelector('.sidebars');

                    if (menuToggle.contains(event.target)) {
                        sidebars.classList.toggle('hidden');
                    } else if (!sidebars.contains(event.target) || event.target.tagName === 'LI') {
                        sidebars.classList.add('hidden');
                    }
                });
            };

            const url = window.location.href;
            if (
                url.endsWith('.html') &&
                window.self === window.top &&
                !['127.0.0.1', 'localhost'].includes(window.location.hostname)
            ) {
                const newUrl = url.slice(0, -5);
                history.replaceState(null, '', newUrl);
            }
        })
        .catch(error => {
            console.error('An error has occurred:', error);
        });
}