import React, { useState, useEffect, useCallback } from 'react';
import { PortletBody, Portlet } from '../../partials/content/Portlet';
import { Col, Row, Form } from 'react-bootstrap';
import Pin from '../../../_metronic/layout/assets/layout-svg-icons/pin.svg';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { HttpService } from '../../store/services/http-service';
import { AuthActions } from '../../store/ducks/auth-duck';
import { AddressActions } from '../../store/ducks/address-duck/actions';
import { NotificationActions } from '../../store/ducks/notification-duck';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import Clipboard from '../../../_metronic/layout/assets/layout-svg-icons/copy-to-clipboard.svg';
export default function YourProfile() {
    const dispatch = useDispatch();
    const user = useSelector(store => store?.auth?.user);
    const isErrorProfile = useSelector(store => store?.auth?.isError);
    const isProgressProfile = useSelector(store => store?.auth.isProgress);

    const [isProgress, setProgress] = useState(false);
    const [notValid, setNotValid] = useState({ error: false, type: '', message: '' });
    const [formValues, setFormValues] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phoneNo: '',
        postalCode: '',
        newPassword: '',
        verifyPassword: '',

    });

    const onFocusPhoneNumInput = useCallback(() => {
        if (!formValues.phoneNo) {
            setFormValues({ ...formValues, phoneNo: '+1' });
        }
    }, [formValues]);

    const onBlurPhoneNumInput = useCallback(() => {
        if (formValues.phoneNo.length < 3) {
            setFormValues({ ...formValues, phoneNo: '' });
        }
    }, [formValues]);

    const addresses = useSelector(store => store?.address?.addresses);
    useEffect(() => {
        dispatch(AddressActions.getAddresses());
    }, [dispatch]);

    useEffect(() => {
        let { firstName,
            lastName,
            email,
            phoneNo,
            postalCode

        } = user;
        setFormValues({
            firstName,
            lastName,
            email,
            phoneNo,
            postalCode
        });
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
            setFormValues({
                ...formValues,
                newPassword: '',
                verifyPassword: '',
            });
            window.scrollTo(0, 0);
            dispatch(NotificationActions.showSuccessNotification('Password changed successfully'));

        }, (err) => {
            setProgress(false);
            window.scrollTo(0, 0);
            dispatch(NotificationActions.showErrorNotification(err?.response?.Message || err?.response?.message));
        });

    }, [formValues, notValid, dispatch]);

    const onClickUpdateProfile = useCallback((e) => {
        e.preventDefault();
        if (isErrorProfile) {
            dispatch(AuthActions.clearError());
        }
        if (notValid.error) {
            setNotValid({ error: false, type: '', message: '' });
        }
        if (!formValues.firstName) {
            setNotValid({ error: true, type: 'firstName', message: 'Please provide first name' });
            return;
        }

        if (formValues.firstName.length < 3) {
            setNotValid({ error: true, type: 'firstName', message: 'First name must contain atleast 3 characters' });
            return;
        }

        if (!formValues.lastName) {
            setNotValid({ error: true, type: 'lastName', message: 'Please provide last name' });
            return;
        }

        if (formValues.lastName.length < 3) {
            setNotValid({ error: true, type: 'lastName', message: 'Last name must contain atleast 3 characters' });
            return;
        }

        if (!formValues.phoneNo) {
            setNotValid({ error: true, type: 'phoneNo', message: 'Please provide phone number' });
            return;
        }
        if (!(/[+](1)?[0-9]{11}$/g.test(formValues.phoneNo))) {
            setNotValid({ error: true, type: 'phoneNo', message: 'Please provide a valid phone number matching the format +1XXXXXXXXXX' });
            return;
        }

        if (!formValues.email) {
            setNotValid({ error: true, type: 'email', message: 'Please provide email' });
            return;
        }
        if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formValues.email)) {
            setNotValid({ error: true, type: 'email', message: 'Invalid email' });
            return;
        }
        if (formValues.postalCode.length < 1) {
            setNotValid({ error: true, type: 'postalCode', message: 'Please provide postal code' });
            return;
        }
        let body = {
            firstName: formValues.firstName,
            lastName: formValues.lastName,
            email: formValues.email,
            phoneNo: formValues.phoneNo,
            postalCode: formValues.postalCode,
            socialPlatform: user?.socialPlatform
        };
        dispatch(AuthActions.updateProfile(body));

    }, [formValues, notValid, isErrorProfile, dispatch, user]);

    return (
        <>
            <h4 className="mb-3" >Your Profile</h4>
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
                                <h6 className="m-0" >{user?.phoneNo}</h6>
                            </div>
                            <div className="d-flex border-bottom pb-3 mb-3 justify-content-between align-items-center" >
                                <h6 className="text-secondary m-0" >Email Address</h6>
                                <h6 className="m-0" >{user?.email}</h6>
                            </div>
                            <div className="d-flex border-bottom pb-3 mb-3 justify-content-between align-items-center" >
                                <h6 className="text-secondary m-0" >Postal Code</h6>
                                <h6 className="m-0" >{user?.postalCode}</h6>
                            </div>
                            <div className="d-flex border-bottom pb-3 mb-3 justify-content-between align-items-center" >
                                <h6 className="text-secondary m-0" >Referral Code
                                <CopyToClipboard text={user?.referralCode}
                                        onCopy={() => dispatch(NotificationActions.showSuccessNotification('Copied to clipboard'))}
                                    >
                                        <span>
                                            <img alt={'imag'} className="clipboard-image" src={Clipboard} />
                                        </span>
                                    </CopyToClipboard>
                                </h6>
                                <h6 className="m-0" >{user?.referralCode}</h6>
                            </div>
                            {addresses.map((v, i) => {
                                return (<div key={i} className="d-flex border-bottom pb-3 mb-3 justify-content-between align-items-center" >
                                    <h6 className="text-secondary m-0" >Address {i + 1}</h6>
                                    <h6 className="m-0" >{v?.postalCode} | {v?.street}</h6>
                                </div>);

                            })
                            }
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
                                                {(notValid.error && notValid.type === 'firstName') && <label className="text-danger" > {notValid.message} </label>}
                                            </Form.Group>
                                        </Row>
                                        <Row>
                                            <Form.Group as={Col} controlId="phone">
                                                <Form.Label>Phone Number</Form.Label>
                                                <Form.Control
                                                    type="tel"
                                                    placeholder=""
                                                    value={formValues.phoneNo}
                                                    onChange={(e) => setFormValues({ ...formValues, phoneNo: e.target.value })}
                                                    onFocus={onFocusPhoneNumInput}
                                                    onBlur={onBlurPhoneNumInput}
                                                />
                                                {(notValid.error && notValid.type === 'phoneNo') && <label className="text-danger" > {notValid.message} </label>}
                                            </Form.Group>
                                        </Row>
                                        <Row>
                                            <Form.Group as={Col} controlId="postal">
                                                <Form.Label>Postal Code</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    placeholder=""
                                                    value={formValues.postalCode}
                                                    maxLength={6}
                                                    onChange={(e) => setFormValues({ ...formValues, postalCode: String(e.target.value).toUpperCase() })}
                                                />
                                                {(notValid.error && notValid.type === 'postalCode') && <label className="text-danger" > {notValid.message} </label>}
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
                                                {(notValid.error && notValid.type === 'lastName') && <label className="text-danger" > {notValid.message} </label>}
                                            </Form.Group>
                                        </Row>
                                        <Row>
                                            <Form.Group as={Col} controlId="email">
                                                <Form.Label>Email Address</Form.Label>
                                                <Form.Control
                                                    type="email"
                                                    placeholder=""
                                                    disabled
                                                    value={formValues.email}
                                                    onChange={(e) => setFormValues({ ...formValues, email: e.target.value })}
                                                />
                                                {(notValid.error && notValid.type === 'email') && <label className="text-danger" > {notValid.message} </label>}
                                            </Form.Group>
                                        </Row>
                                        <Row >
                                            <button onClick={onClickUpdateProfile} className={isProgressProfile ? 'btn btn-primary  btn-primary-gradient btn-block pr-0 kt-spinner kt-spinner--right kt-spinner--md kt-spinner--light' : 'btn btn-primary  btn-primary-gradient btn-block'} > Update Profile</button>
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
                                                disabled={user?.socialPlatform ? true : false}
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
                                                disabled={user?.socialPlatform ? true : false}
                                                value={formValues.verifyPassword}
                                                onChange={(e) => setFormValues({ ...formValues, verifyPassword: e.target.value })}
                                            />
                                            {(notValid.error && notValid.type === 'verifyPassword') && <label className="text-danger" > {notValid.message} </label>}
                                        </Form.Group>
                                    </Row>

                                    <Row className="pr-2 pl-3 mt-4" >
                                        <button onClick={onClickChangePassword} disabled={user?.socialPlatform ? true : false} className={isProgress ? 'text-white btn btn-primary  btn-primary-gradient btn-block  pr-0 kt-spinner kt-spinner--right kt-spinner--md kt-spinner--light' : 'btn btn-primary  btn-primary-gradient btn-block'} > Change Password</button>
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