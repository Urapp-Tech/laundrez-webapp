import React from 'react';
import { Toast } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { NotificationActions } from '../../store/ducks/notification-duck';


export default function SuccessToast() {
    const dispatch = useDispatch();
    const isSuccess = useSelector(store => store?.notification?.isSuccess);
    const message = useSelector(store => store?.notification?.successMessage);

    return (
        <>
            {isSuccess && <div
                className="toast-container"
            >
                <Toast autohide delay={3000} show={isSuccess} onClose={() => dispatch(NotificationActions.hideSuccessNotification()
                )}  >
                    <Toast.Header>
                        <img src="holder.js/20x20?text=%20" className="rounded mr-2" alt="" />
                        <strong className="mr-auto">Success</strong>

                    </Toast.Header>
                    <Toast.Body>{message}</Toast.Body>
                </Toast>

            </div>}
        </>
    );
}