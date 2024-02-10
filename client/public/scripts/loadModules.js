
(function(){
    fetch('nav-bar.html')
        .then((res) => res.text())
        .then(data => {

            const parser = new DOMParser();
            const module = parser.parseFromString(data, 'text/html').body.firstChild;

            const container = document.querySelector('#header');
            container.append(module)

        })
})()