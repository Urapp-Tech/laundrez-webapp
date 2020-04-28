import React from 'react';
import { Toast } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { NotificationActions } from '../../store/ducks/notification-duck';


export default function ErrorToast() {
    const dispatch = useDispatch();
    const isError = useSelector(store => store?.notification?.isError);
    const message = useSelector(store => store?.notification?.errorMessage);

    return (
        <>
            {isError && <div
                className="toast-container"
            >
                <Toast  autohide delay={3000} show={isError} onClose={() => dispatch(NotificationActions.hideErrorNotification()
                )}  >
                    <Toast.Header>
                        <img src="holder.js/20x20?text=%20" className="rounded mr-2" alt="" />
                        <strong className="mr-auto">Error</strong>

                    </Toast.Header>
                    <Toast.Body>{message}</Toast.Body>
                </Toast>

            </div>}
        </>
    );
}