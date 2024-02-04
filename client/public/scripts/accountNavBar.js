

(function() {
    fetch('navBarAccount.html')
    .then((res) => res.text())
    .then(html => {

        const parser = new DOMParser();
        const module = parser.parseFromString(html, 'text/html').body.firstChild;

        const container = document.getElementById('navbarList');
        container.insertBefore(module, container.firstChild)
    })
})()