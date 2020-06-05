import { CardActionTypes } from './actions-types';

export class CardActions {

    static saveCard(body) {
        return {
            type: CardActionTypes.SAVE_CARD_PROG,
            payload: { body }

        };
    }
    static getCards() {
        return {
            type: CardActionTypes.GET_CARDS_PROG,

        };
    }

    static deleteCard(id, index) {
        return {
            type: CardActionTypes.DELETE_CARD_PROG,
            payload: { id, index }

        };
    }


}