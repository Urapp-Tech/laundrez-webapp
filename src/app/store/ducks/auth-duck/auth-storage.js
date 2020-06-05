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
    static setRefreshToken(token) {
        try {
            localStorage.setItem('_refresh-token', token);
        } catch (e) {
            console.error(
                'setRefreshToken: Error setting key [ token ] in localStorage: ' +
                JSON.stringify(e)
            );
        }
    }
    static getRefreshToken() {
        try {
            return localStorage.getItem('_refresh-token');
        } catch (e) {
            console.error(
                'getRefreshToken: Error setting key [ token ] in localStorage: ' +
                JSON.stringify(e)
            );
        }
    }
    static setUser(user) {
        try {
            localStorage.setItem('_user', JSON.stringify(user));
        } catch (e) {
            console.error(
                'setRefreshToken: Error setting key [ user ] in localStorage: ' +
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
    static setIsProfileCompleted(value) {
        try {
            localStorage.setItem('_isprofilecompleted', JSON.stringify(value));
        } catch (e) {
            console.error(
                'setIsProfileCompleted: Error setting key [ _isprofilecompleted ] in localStorage: ' +
                JSON.stringify(e)
            );
        }

    }
    static getIsProfileCompleted() {
        try {
            return JSON.parse(localStorage.getItem('_isprofilecompleted'));
        } catch (e) {
            console.error(
                'getIsProfileCompleted: Error setting key [ _isprofilecompleted ] in localStorage: ' +
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