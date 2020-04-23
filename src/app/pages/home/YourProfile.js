import React, { useState, useEffect, useCallback } from 'react';
import { PortletBody, Portlet } from '../../partials/content/Portlet';
import { Col, Row, Form, Toast } from 'react-bootstrap';
import Pin from '../../../_metronic/layout/assets/layout-svg-icons/pin.svg';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { HttpService } from '../../store/services/http-service';


export default function YourProfile() {
    const user = useSelector(store => store?.auth?.user);
    const [isSuccess, setSuccess] = useState(false);
    const [error, setError] = useState({ isError: false, message: '' });
    const [isProgress, setProgress] = useState(false);
    const [notValid, setNotValid] = useState({ error: false, type: '', message: '' });
    const [formValues, setFormValues] = useState({
        firstName: '',
        lastName: '',
        username: '',
        phoneNo: '',
        postalCode: '',
        newPassword: '',
        verifyPassword: '',

    });

    useEffect(() => {
        let { firstName,
            lastName,
            username,
        } = user;
        setFormValues({ firstName, lastName, username });
    }, [user]);

    const onClickChangePassword = useCallback(() => {
        if (notValid.error) {
            setNotValid({ error: false, type: '', message: '' });
        }
        if (!formValues.newPassword) {
            setNotValid({ error: true, type: 'newPassword', message: 'Please provide password' });
            return;
        }
        if (formValues.newPassword.length < 8) {
            setNotValid({ error: true, type: 'newPassword', message: 'Password must contain 8 characters' });
            return;
        }
        if (formValues.newPassword !== formValues.verifyPassword) {
            setNotValid({ error: true, type: 'verifyPassword', message: 'Password mismatch' });
            return;
        }
        let body = {
            newPassword: formValues.newPassword
        };
        setProgress(true);
        HttpService.put('/User/changepassword/', body).subscribe(() => {
            setProgress(false);
            setSuccess(true);
            setFormValues({
                ...formValues,
                newPassword: '',
                verifyPassword: '',
            });
            window.scrollTo(0, 0);
            setTimeout(() => {
                setSuccess(false);
            }, 3000);

        }, (err) => {
            setProgress(false);
            window.scrollTo(0, 0);
            setTimeout(() => {
                setError({ isError: false, message: '' });
            }, 3000);
            setError({ isError: true, message: err.response.Message });
        });

    }, [formValues, notValid]);
    return (
        <>
            <h4 className="mb-3" >Your Profile</h4>


            <div
                className="toast-container"
            >
                <Toast show={isSuccess} onClose={() => setSuccess(false)}  >
                    <Toast.Header>
                        <img src="holder.js/20x20?text=%20" className="rounded mr-2" alt="" />
                        <strong className="mr-auto">Success</strong>

                    </Toast.Header>
                    <Toast.Body>Password updated successfully</Toast.Body>
                </Toast>

            </div>
            {error.isError && <div
                className="toast-container"
            >
                <Toast show={error.isError} onClose={() => setError({ isError: false, message: '' })} >
                    <Toast.Header>
                        <img src="holder.js/20x20?text=%20" className="rounded mr-2" alt="" />
                        <strong className="mr-auto">Error</strong>

                    </Toast.Header>
                    <Toast.Body>{error.message}</Toast.Body>
                </Toast>
            </div>}


            <div className="row">
                <div className="col-md-5">
                    <Portlet className="">
                        <PortletBody>
                            <div className="d-flex border-bottom pb-3 mb-3 justify-content-between align-items-center" >
                                <h6 className="text-secondary m-0" >Name</h6>
                                <h6 className="m-0" >{user?.firstName} {user?.lastName}</h6>
                            </div>
                            <div className="d-flex border-bottom pb-3 mb-3 justify-content-between align-items-center" >
                                <h6 className="text-secondary m-0" >Phone Number</h6>
                                <h6 className="m-0" >+1 54 523 5478</h6>
                            </div>
                            <div className="d-flex border-bottom pb-3 mb-3 justify-content-between align-items-center" >
                                <h6 className="text-secondary m-0" >Email Address</h6>
                                <h6 className="m-0" >{user?.username}</h6>
                            </div>
                            <div className="d-flex border-bottom pb-3 mb-3 justify-content-between align-items-center" >
                                <h6 className="text-secondary m-0" >Postal Code</h6>
                                <h6 className="m-0" >M6G 2B4</h6>
                            </div>
                            <div className="d-flex border-bottom pb-3 mb-3 justify-content-between align-items-center" >
                                <h6 className="text-secondary m-0" >Address 1</h6>
                                <h6 className="m-0" >2660 | 590 Bay Street</h6>
                            </div>
                            <div className="d-flex align-items-end" >
                                <img src={Pin} alt={'img'} className="pin-image img-fluid" />
                                <Link to="/deliveryaddress" >
                                    <h6 className="text-primary ml-1 mb-0" >Add Address</h6>
                                </Link>
                            </div>
                        </PortletBody>
                    </Portlet>
                </div>
                <div className="col-md-7">
                    <Portlet className="">
                        <PortletBody>
                            <div className="row" >
                                <div className="col-md-6">
                                    <h5 className="mb-3" >Edit Profile</h5>
                                    <Form>
                                        <Row>
                                            <Form.Group as={Col} controlId="first-name">
                                                <Form.Label>First Name</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    placeholder=""
                                                    value={formValues.firstName}
                                                    onChange={(e) => setFormValues({ ...formValues, firstName: e.target.value })}
                                                />
                                            </Form.Group>
                                        </Row>
                                        <Row>
                                            <Form.Group as={Col} controlId="phone">
                                                <Form.Label>Phone Number</Form.Label>
                                                <Form.Control
                                                    type="number"
                                                    placeholder=""
                                                    value={formValues.phoneNo}
                                                    onChange={(e) => setFormValues({ ...formValues, phoneNo: e.target.value })}
                                                />
                                            </Form.Group>
                                        </Row>
                                        <Row>
                                            <Form.Group as={Col} controlId="postal">
                                                <Form.Label>Postal Code</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    placeholder=""
                                                    value={formValues.postalCode}
                                                    onChange={(e) => setFormValues({ ...formValues, postalCode: e.target.value })}
                                                />
                                            </Form.Group>
                                        </Row>
                                        <Row>
                                            <Form.Group as={Col} controlId="last-name">
                                                <Form.Label>Last Name</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    placeholder=""
                                                    value={formValues.lastName}
                                                    onChange={(e) => setFormValues({ ...formValues, lastName: e.target.value })}
                                                />
                                            </Form.Group>
                                        </Row>
                                        <Row>
                                            <Form.Group as={Col} controlId="email">
                                                <Form.Label>Email Address</Form.Label>
                                                <Form.Control
                                                    type="email"
                                                    placeholder=""
                                                    value={formValues.username}
                                                    onChange={(e) => setFormValues({ ...formValues, username: e.target.value })}
                                                />
                                            </Form.Group>
                                        </Row>
                                        <Row >
                                            <button className="btn btn-primary  btn-primary-gradient btn-block" > Update Profile</button>
                                        </Row>
                                    </Form>
                                </div>
                                <div className="col-md-6">
                                    <h5 className="mb-3" >Change Password</h5>


                                    <Row>
                                        <Form.Group as={Col} controlId="new-pass">
                                            <Form.Label>New Password</Form.Label>
                                            <Form.Control
                                                type="password"
                                                placeholder=""
                                                value={formValues.newPassword}
                                                onChange={(e) => setFormValues({ ...formValues, newPassword: e.target.value })}
                                            />
                                            {(notValid.error && notValid.type === 'newPassword') && <label className="text-danger" > {notValid.message} </label>}
                                        </Form.Group>
                                    </Row>
                                    <Row>
                                        <Form.Group as={Col} controlId="ver-pass">
                                            <Form.Label>Verify Password</Form.Label>
                                            <Form.Control
                                                type="password"
                                                placeholder=""
                                                value={formValues.verifyPassword}
                                                onChange={(e) => setFormValues({ ...formValues, verifyPassword: e.target.value })}
                                            />
                                            {(notValid.error && notValid.type === 'verifyPassword') && <label className="text-danger" > {notValid.message} </label>}
                                        </Form.Group>
                                    </Row>

                                    <Row className="pr-2 pl-3 mt-4" >
                                        <button onClick={onClickChangePassword} className={isProgress ? 'text-white btn btn-primary  btn-primary-gradient btn-block  pr-0 kt-spinner kt-spinner--right kt-spinner--md kt-spinner--light' : 'btn btn-primary  btn-primary-gradient btn-block'} > Change Password</button>
                                    </Row>

                                </div>
                            </div>
                        </PortletBody>
                    </Portlet>
                </div>
            </div>
        </>
    );
}