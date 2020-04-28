import { FaqActionTypes } from './actions-types';

export class FaqActions {

    static getFaqs() {
        return {
            type: FaqActionTypes.FAQS_PROG,

        };
    }

}