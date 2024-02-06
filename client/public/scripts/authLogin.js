
// import Cookies from '../../../node_modules/js-cookie';
// import * as Cookies from 'js-cookie/dist';
// import * as Cookies from './jsCookie';
// const jsCookie = require('./jsCookie');

// import setCookie from './jsCookie'

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

        const expirationDate = new Date();
        expirationDate.setDate(expirationDate.getDate() + 1000 * 60 * 60 * 24);

        const cookieString = `jwt=${encodeURIComponent(jwtToken)};max-age=${expirationDate.toUTCString()};path=/`;
        document.cookie = cookieString;

        // window.location.href = '/index.html'
    })

})