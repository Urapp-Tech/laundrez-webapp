import React, { useState, useEffect, useCallback } from 'react';
import Logo from '../../../_metronic/layout/assets/layout-svg-icons/Logo.svg';
import { Form, Alert } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';
import { HttpService } from '../../store/services/http-service';



function useQuery() {
    return new URLSearchParams(useLocation().search);
}
export default function CreateNewPassword({ history }) {
    const [error, setError] = useState({ isError: false, message: '' });
    const [isProgress, setProgress] = useState(false);
    const [success, setSuccess] = useState(false);
    const [notValid, setNotValid] = useState({ error: false, type: '', message: '' });
    const [formValues, setFormValues] = useState({ newPassword: '', reNewPassword: '' });
    const query = useQuery();
    const email = query.get('email');
    const expiry = query.get('expiry');

    useEffect(() => {
        HttpService.get(`/User/resetpassword?email=${email}&expiry=${expiry}`).subscribe(() => {
        }, (err) => {
            window.scrollTo(0, 0);
            if (err.status === 403)
                setError({ isError: true, message: 'Your link is expired' });
            else if (err.status === 404)
                setError({ isError: true, message: 'Email not found' });
        });
    }, [expiry, email]);

    const onSubmit = useCallback((e) => {
        e.preventDefault();
        if (notValid.error)
            setNotValid({ error: false, type: '', message: '' });

        if (!formValues.newPassword) {
            setNotValid({ error: true, type: 'newPassword', message: 'Please provide new password' });
            return;
        }
        if (formValues.newPassword.length < 8) {
            setNotValid({ error: true, type: 'newPassword', message: 'New password must contain 8 characters' });
            return;
        }
        if (!formValues.reNewPassword) {
            setNotValid({ error: true, type: 'reNewPassword', message: 'Please re-enter new password' });
            return;
        }
        if (formValues.reNewPassword !== formValues.newPassword) {
            setNotValid({ error: true, type: 'reNewPassword', message: 'Password mismatch' });
            return;
        }
        let body = {
            email: query.get('email'),
            newPassword: formValues.newPassword
        };
        setProgress(true);
        HttpService.put('/User/resetpassword', body).subscribe(() => {
            setProgress(false);
            setSuccess(true);
            window.scrollTo(0, 0);
            setTimeout(() => {
                history.replace('/customer/auth/login');
            }, 3000);

        }, (err) => {
            setProgress(false);
            window.scrollTo(0, 0);
            setError({ isError: true, message: err.response?.Message });
        });

    }, [formValues, notValid, history, query]);



    return (
        <div className="kt-grid__item kt-grid__item--fluid  kt-grid__item--order-tablet-and-mobile-1  kt-login__wrapper">
            <div className="kt-login__body">
                <div className="kt-login__form">
                    <div className="kt-login__title">
                        <img src={Logo} alt={'logo'} />
                        <h3 className="text-primary" >
                            Create Password
                        </h3>
                        {success && <Alert variant={'success'}>
                            Password has been reset. Redirecting to login.
                                </Alert>
                        }
                        {error.isError &&
                            <Alert variant={'danger'}>
                                {error.message}
                            </Alert>
                        }

                    </div>
                    <Form className="kt-form " onSubmit={onSubmit}  >
                        <Form.Group controlId="password">
                            <Form.Control
                                type="password"
                                placeholder="New Password"
                                value={formValues.newPassword}
                                onChange={(e) => setFormValues({ ...formValues, newPassword: e.target.value })}
                            />
                            {(notValid.error && notValid.type === 'newPassword') && <label className="text-danger" > {notValid.message} </label>}
                        </Form.Group>
                        <Form.Group controlId="re-password">
                            <Form.Control
                                type="password"
                                placeholder="Re-enter New Password"
                                value={formValues.reNewPassword}
                                onChange={(e) => setFormValues({ ...formValues, reNewPassword: e.target.value })}
                            />
                            {(notValid.error && notValid.type === 'reNewPassword') && <label className="text-danger" > {notValid.message} </label>}
                        </Form.Group>
                        <button  className={isProgress ? 'text-white btn btn-primary  btn-primary-gradient btn-block mt-4 pr-0 kt-spinner kt-spinner--right kt-spinner--md kt-spinner--light' : 'btn btn-primary  btn-primary-gradient btn-block mt-4'} > Submit </button>

                    </Form>
                </div>
            </div>
        </div>
    );
}