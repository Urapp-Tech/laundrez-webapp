import { AuthActionTypes } from './actions-types';

export class AuthActions {

    static login(body) {
        return {
            type: AuthActionTypes.LOGIN_PROG,
            payload: { body }
        };
    }
    static setUser(user) {
        return {
            type: AuthActionTypes.SET_USER,
            payload: { user }
        };
    }
    static logout() {
        return {
            type: AuthActionTypes.LOGOUT
        };
    }

}