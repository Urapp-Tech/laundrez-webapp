export class AuthStorage {
    static setToken(token) {
        try {
            localStorage.setItem('_token', token);
        } catch (e) {
            console.error(
                'setToken: Error setting key [ token ] in localStorage: ' +
                JSON.stringify(e)
            );
        }
    }
    static getToken() {
        try {
            return localStorage.getItem('_token');
        } catch (e) {
            console.error(
                'getToken: Error setting key [ token ] in localStorage: ' +
                JSON.stringify(e)
            );
        }
    }
    static setUser(user) {
        try {
            localStorage.setItem('_user', JSON.stringify(user));
        } catch (e) {
            console.error(
                'setToken: Error setting key [ user ] in localStorage: ' +
                JSON.stringify(e)
            );
        }

    }
    static getUser() {
        try {
            return JSON.parse(localStorage.getItem('_user'));
        } catch (e) {
            console.error(
                'getToken: Error setting key [ user ] in localStorage: ' +
                JSON.stringify(e)
            );
        }

    }
    static clearStorage() {
        try {

            localStorage.clear();
        }
        catch (e) {
            console.error(
                'fail to clear storage' +
                JSON.stringify(e)
            );
        }
    }
}