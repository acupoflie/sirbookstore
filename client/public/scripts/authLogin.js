


document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    fetch('http://localhost:4455/auth/login', {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify({
            email: email,
            password: password
        })
    })
    .then(res => res.json())
    .then(data => {
        console.log("hello mother fucker")
        const jwtToken = data.token;
        console.log('JWT token has received', jwtToken);

        // const cookieString = `jwt=${encodeURIComponent(jwtToken)};max-age=86400;path=/`;
        // document.cookie = cookieString;

        Cookies.set('jwt', jwtToken, {expires: 1, path: '/'});

        // window.location.href = '/index.html'
    })

})