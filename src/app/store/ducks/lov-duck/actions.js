import { LovActionTypes } from './actions-types';

export class LovActions {

    static getLov() {
        return {
            type: LovActionTypes.GET_LOV_PROG
        };
    }

    static getPrivacyPolicy() {
        return {
            type: LovActionTypes.GET_PRIVACY_POLICY_PROG
        };
    }

}