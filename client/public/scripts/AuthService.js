

class AuthService {

    constructor() {
        this.tokenKey = 'jwt';
    }

    setToken(token) {
        Cookies.set(this.tokenKey, token, {expires: 1, path: '/'});
    }

    getToken() {
        return Cookies.get(this.tokenKey);
    }

    removeToken() {
        Cookies.remove(this.tokenKey);
    }

    isAuthenticated() {
        return !!this.getToken();
    }
}