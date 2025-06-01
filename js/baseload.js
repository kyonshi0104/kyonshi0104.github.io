if (window.self === window.top) {

    fetch('/base.html')
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
                item.addEventListener('click', function() {
                    locate_change(this.dataset.src)
                });
            });

            const url = window.location.href;
            if (url.endsWith('.html')) {
                const newUrl = url.slice(0, -5);
                history.replaceState(null, '', newUrl);
    }


        })
        .catch(error => {
            console.error('An error has occurred:', error);
        });
}
