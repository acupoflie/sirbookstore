
// import Cookies from '../../../node_modules/js-cookie';
// import * as Cookies from 'js-cookie';

import Cookies from '../../server/Cookies';

document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();

    fetch('http://localhost:3355/auth/login', {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: {
            email: document.getElementById('email').value,
            password: document.getElementById('password').value
        }
    })
    .then(res => res.json())
    .then(data => {
        const jwtToken = data.token;

        console.log('JWT token has received', jwtToken);

        Cookies.set('jwtTokens', jwtToken, {expires: 1});

        windows.location.href = '/index.html'
    })

})