

(function() {

    if(!(Cookies.get('jwt'))) {
        fetch('navBarAccount.html')
        .then((res) => res.text())
        .then(html => {
    
            const parser = new DOMParser();
            const module = parser.parseFromString(html, 'text/html').body.firstChild;
    
            const container = document.getElementById('navbarList');
            container.insertBefore(module, container.firstChild)
        })
    } else if (Cookies.get('jwt')) {
        fetch('navBarAccount.html')
        .then((res) => res.text())
        .then(html => {
    
            const parser = new DOMParser();
            const module = parser.parseFromString(html, 'text/html').body.children[1];
    
            const container = document.getElementById('navbarList');
            container.insertBefore(module, container.firstChild)
        })
    }

})()