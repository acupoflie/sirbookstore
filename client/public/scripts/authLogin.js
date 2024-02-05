
// import Cookies from '../../../node_modules/js-cookie';
// import * as Cookies from 'js-cookie/dist';
// import * as Cookies from './jsCookie';
// const jsCookie = require('./jsCookie');

// import setCookie from './jsCookie'


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

})