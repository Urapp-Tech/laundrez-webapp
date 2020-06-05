import { AuthActionTypes } from './actions-types';

export class AuthActions {

    static login(body) {
        return {
            type: AuthActionTypes.LOGIN_PROG,
            payload: { body }
        };
    }
    static getNewAccessToken(body) {
        return {
            type: AuthActionTypes.GET_NEW_ACCESS_TOKEN_PROG,
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
    static clearError() {
        return {
            type: AuthActionTypes.CLEAR_ERROR
        };
    }
    static getProfile() {
        return {
            type: AuthActionTypes.GET_PROFILE_PROG
        };
    }
    static updateProfile(body) {
        return {
            type: AuthActionTypes.UPDATE_PROFILE_PROG,
            payload: { body }
        };
    }
    static clearSuccess() {
        return {
            type: AuthActionTypes.CLEAR_SUCCESS,

        };
    }

}