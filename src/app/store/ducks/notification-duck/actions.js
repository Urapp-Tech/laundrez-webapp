import { NotificationActionTypes } from './actions-types';

export class NotificationActions {

    static showSuccessNotification(message) {
        return {
            type: NotificationActionTypes.SHOW_SUCCESS_NOTIFICATION,
            payload: { message }
        };
    }
    static hideSuccessNotification() {
        return {
            type: NotificationActionTypes.HIDE_SUCCESS_NOTIFICATION,
        };
    }
    static showErrorNotification(message) {
        return {
            type: NotificationActionTypes.SHOW_ERROR_NOTIFICATION,
            payload: { message }
        };
    }
    static hideErrorNotification() {
        return {
            type: NotificationActionTypes.HIDE_ERROR_NOTIFICATION,
        };
    }

}