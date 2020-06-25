import { OrderActionTypes } from './actions-types';

export class OrderActions {

    static postOrder(body) {
        return {
            type: OrderActionTypes.POST_ORDER_PROG,
            payload: { body }

        };
    }
    static getOrders(page = 1, pageSize = 10, ) {
        return {
            type: OrderActionTypes.GET_ORDERS_PROG,
            payload: { page, pageSize }

        };
    }

    static checkSelectedPickupSlot(body) {
        return {
            type: OrderActionTypes.CHECK_SELECTED_PICKUP_SLOT_PROG,
            payload: { body }

        };
    }

    static checkSelectedDropoffSlot(body) {
        return {
            type: OrderActionTypes.CHECK_SELECTED_DROPOFF_SLOT_PROG,
            payload: { body }
        };
    }

    static clearError() {
        return {
            type: OrderActionTypes.CLEAR_ERROR
        };
    }

    static getOrderDetail(orderId) {
        return {
            type: OrderActionTypes.GET_ORDER_DETAIL_PROG,
            payload: { orderId }

        };
    }
    static clearOrderDetail() {
        return {
            type: OrderActionTypes.CLEAR_ORDER_DETAIL
        };
    }

    static getActiveOrders(page = 1, pageSize = 100, ) {
        return {
            type: OrderActionTypes.GET_ACTIVE_ORDERS_PROG,
            payload: { page, pageSize }

        };
    }

    static updateOrder(body) {
        return {
            type: OrderActionTypes.UPDATE_ORDER_PROG,
            payload: { body }

        };
    }

    static makePayment(body) {
        return {
            type: OrderActionTypes.MAKE_PAYMENT_PROG,
            payload: { body }
        };
    }

    static cancelOrder(id) {
        return {
            type: OrderActionTypes.CANCEL_ORDER_PROG,
            payload: { id }

        };
    }

    static setPickupAndDropoff(body) {
        return {
            type: OrderActionTypes.SET_PICKUP_AND_DROPOFF,
            payload: { ...body }
        };
    }
    static orderStart() {
        return {
            type: OrderActionTypes.ORDER_START
        };
    }

    static clearOrder() {
        return {
            type: OrderActionTypes.CLEAR_ORDER
        };
    }

    static setOrder(order) {
        return {
            type: OrderActionTypes.SET_ORDER,
            payload: { order }
        };
    }

    static setCurrentOrder(currentOrder) {
        return {
            type: OrderActionTypes.SET_CURRENT_ORDER,
            payload: { currentOrder }
        };
    }

}