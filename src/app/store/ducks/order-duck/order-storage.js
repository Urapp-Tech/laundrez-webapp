export class OrderStorage {
    static setOrder(order) {
        localStorage.setItem('_order', JSON.stringify(order));
    }
    static getOrder() {
        return JSON.parse(localStorage.getItem('_order'));
    }
    static setCurrentOrder(currentOrder) {
        localStorage.setItem('_currentOrder', JSON.stringify(currentOrder));
    }
    static getCurrentOrder() {
        let currentOrder = JSON.parse(localStorage.getItem('_currentOrder'));
        if (currentOrder) {
            currentOrder['pickupDate'] = new Date(currentOrder['pickupDate']);
            currentOrder['dropoffDate'] = new Date(currentOrder['dropoffDate']);
        }
        return currentOrder;
    }
    static clearOrder() {
        localStorage.removeItem('_order');
        localStorage.removeItem('_currentOrder');
    }
}