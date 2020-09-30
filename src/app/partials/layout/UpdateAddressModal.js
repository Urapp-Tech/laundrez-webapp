import React, { useState, useCallback, useEffect } from 'react';
import { Modal, Container, Row, Col, Form } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import GooglePlacesAutocomplete, { geocodeByAddress } from 'react-google-places-autocomplete';
import { AddressActions } from '../../store/ducks/address-duck/actions';

export default function UpdateAddressModal({ showModal, toggleModal, address, index }) {

    const dispatch = useDispatch();
    const [formValues, setFormValues] = useState({
        street: '',
        state: '',
        city: '',
        phoneNo: '',
        postalCode: '',
        suiteNumber: '',
        propertyType: '',
        buzzerCode: '',
        lat: '',
        lng: '',
        mainAddress: '',
        isPrimary: false,
        id: 0
    });
    useEffect(() => {
        let { street,
            state,
            city,
            phone,
            postalCode,
            suite,
            type,
            lat,
            lng,
            isPrimary,
            mainAddress,
            buzzerCode,
            id } = address;
        setFormValues({
            street,
            state,
            city,
            phoneNo: phone,
            postalCode,
            suiteNumber: suite,
            propertyType: type,
            lat,
            lng,
            isPrimary,
            mainAddress,
            buzzerCode: buzzerCode,
            id
        });
    }, [address]);
    const [notValid, setNotValid] = useState({ error: false, type: '', message: '' });
    const user = useSelector(store => store?.auth?.user);
    const isProgress = useSelector(store => store?.address?.isProgressUpdate);

    const onFocusPhoneNumInput = useCallback(() => {
        if (formValues.phoneNo.length === 0) {
            setFormValues({ ...formValues, phoneNo: '+1' });
        }
    }, [formValues]);

    const onBlurPhoneNumInput = useCallback(() => {
        if (formValues.phoneNo.length < 3) {
            setFormValues({ ...formValues, phoneNo: '' });
        }
    }, [formValues]);
    const handleSelect = useCallback(obj => {
        geocodeByAddress(obj.description)
            .then(results => {
                let _results = results[0];
                let lat = _results.geometry.location.lat();
                let lng = _results.geometry.location.lng();
                let mainAddress = _results.formatted_address;
                let addressComponents = _results.address_components;
                let state = '';
                let city = '';
                let street = '';
                let postalCode = '';
                // let country = '';
                for (let i = 0; i < addressComponents.length; i++) {
                    let addressComponent = addressComponents[i];

                    let types = addressComponent.types;
                    if (types.indexOf('postal_code') > -1) {
                        postalCode = addressComponent.long_name;
                    }
                    else if (types.indexOf('political') > -1 && types.indexOf('sublocality') > -1 && types.indexOf('sublocality_level_1') > -1) {
                        street = addressComponent.long_name;
                    }
                    else if (types.indexOf('locality') > -1 && types.indexOf('political') > -1) {
                        city = addressComponent.long_name;
                    }
                    else if (types.indexOf('administrative_area_level_1') > -1 && types.indexOf('political') > -1) {
                        state = addressComponent.long_name;
                    }
                    // else if (types.indexOf('country') > -1 && types.indexOf('political') > -1) {

                    //     country = addressComponent.long_name;

                    // }
                }
                setFormValues({
                    ...formValues,
                    city,
                    street,
                    state,
                    postalCode,
                    lat,
                    lng,
                    mainAddress
                });

            });
    }, [formValues]);
    const onClickSaveAddress = useCallback(() => {
        // if (error.isError) {
        //     setError({ isError: false, message: '' });
        //   }
        if (notValid.error) {
            setNotValid({ error: false, type: '', message: '' });
        }
        if (!formValues.mainAddress) {
            setNotValid({ error: true, type: 'mainAddress', message: 'Please provide address' });
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
        if (!formValues.postalCode) {
            setNotValid({ error: true, type: 'postalCode', message: 'Please provide postal code' });
            return;
        }

        let body = {
            userId: user.id,
            type: formValues.propertyType,
            street: formValues.street,
            city: formValues.city,
            state: formValues.state,
            postalCode: formValues.postalCode,
            phone: formValues.phoneNo,
            suite: formValues.suiteNumber,
            lng: String(Math.abs(formValues.lng).toFixed(5)),
            lat: String(Math.abs(formValues.lat).toFixed(5)),
            mainAddress: formValues.mainAddress,
            isPrimary: formValues.isPrimary,
            buzzerCode: formValues.buzzerCode,
            id: formValues.id
        };
        dispatch(AddressActions.updateAddress(body, index));
    }, [formValues, notValid, user, dispatch, index]);
    return (
        <Modal
            size="lg"
            show={showModal}
            onHide={toggleModal}
            aria-labelledby="example-modal-sizes-title-lg"
            centered
            scrollable

        >

            <Modal.Body  >
                <Container>
                    <div className="d-flex justify-content-end mb-3" >
                        <div onClick={toggleModal} className="fas fa-times cursor-pointer"></div>
                    </div>
                    <Row className="show-grid">
                        <Col md={6}>
                            <Form>
                                <Row>
                                    <Form.Group as={Col} controlId="formGridStreet">
                                        <Form.Label>Address</Form.Label>
                                        <GooglePlacesAutocomplete
                                            onSelect={handleSelect}
                                            inputClassName="form-control"
                                            placeholder=''
                                            initialValue={formValues.mainAddress}


                                        />
                                        {(notValid.error && notValid.type === 'mainAddress') && <label className="text-danger" > {notValid.message} </label>}
                                    </Form.Group>
                                </Row>
                                <Row>
                                    <Form.Group as={Col} controlId="formGridStreet">
                                        <Form.Label>Street</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder=""
                                            value={formValues.street}
                                            autoComplete={'no'}
                                            onChange={(e) => setFormValues({ ...formValues, street: e.target.value })}
                                        />
                                    </Form.Group>

                                </Row>
                                <Row>
                                    <Form.Group as={Col} controlId="formGridSuite">
                                        <Form.Label>Suite Number</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder=""
                                            value={formValues.suiteNumber}
                                            onChange={(e) => setFormValues({ ...formValues, suiteNumber: e.target.value })}
                                        />
                                        {(notValid.error && notValid.type === 'suiteNumber') && <label className="text-danger" > {notValid.message} </label>}
                                    </Form.Group>
                                </Row>
                                <Row>
                                    <Form.Group as={Col} controlId="formGridCode">
                                        <Form.Label>Postal Code</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder=""
                                            value={formValues.postalCode}
                                            autoComplete={'no'}
                                            onChange={(e) => setFormValues({ ...formValues, postalCode: String(e.target.value).toUpperCase() })}
                                        />
                                        {(notValid.error && notValid.type === 'postalCode') && <label className="text-danger" > {notValid.message} </label>}
                                    </Form.Group>
                                </Row>
                                <Row>
                                    <Form.Group as={Col} controlId="formGridState">
                                        <Form.Label>Province</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder=""
                                            value={formValues.state}
                                            autoComplete={'no'}
                                            onChange={(e) => setFormValues({ ...formValues, state: e.target.value })}
                                        />
                                    </Form.Group>
                                </Row>
                                <Row>
                                    <Form.Group as={Col} controlId="formGridCity">
                                        <Form.Label>City</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder=""
                                            value={formValues.city}
                                            autoComplete={'no'}
                                            onChange={(e) => setFormValues({ ...formValues, city: e.target.value })}
                                        />
                                    </Form.Group>
                                </Row>
                            </Form>
                        </Col>
                        <Col md={6}>
                            <Row>
                                <Form.Group as={Col} controlId="formGridPhone">
                                    <Form.Label>Phone Number</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder=""
                                        value={formValues.phoneNo}
                                        onFocus={onFocusPhoneNumInput}
                                        onBlur={onBlurPhoneNumInput}
                                        onChange={(e) => setFormValues({ ...formValues, phoneNo: e.target.value })}
                                    />
                                    {(notValid.error && notValid.type === 'phoneNo') && <label className="text-danger" > {notValid.message} </label>}
                                </Form.Group>
                            </Row>
                            <Row>
                                <Form.Group as={Col} controlId="formGridProperty">
                                    <Form.Label>Property Type</Form.Label>
                                    <Form.Control as="select"
                                        value={formValues.propertyType}
                                        onChange={(e) => setFormValues({ ...formValues, propertyType: e.target.value })}
                                    >
                                        <option value={'Residential'} >Residential</option>
                                        <option value={'Commercial'} >Commercial</option>
                                        <option value={'Industry'} >Industry</option>
                                    </Form.Control>
                                    {(notValid.error && notValid.type === 'propertyType') && <label className="text-danger" > {notValid.message} </label>}
                                </Form.Group>
                            </Row>
                            <Row>
                                <Form.Group as={Col} controlId="formGridBusser">
                                    <Form.Label>Buzzer Code</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder=""
                                        value={formValues.buzzerCode}
                                        onChange={(e) => setFormValues({ ...formValues, buzzerCode: e.target.value })}
                                    />
                                    {(notValid.error && notValid.type === 'buzzerCode') && <label className="text-danger" > {notValid.message} </label>}
                                </Form.Group>
                            </Row>
                            <Row>
                                <Form.Group as={Col} controlId="formGridPrimAdd">
                                    <Form.Check className="check-primary-addrs" inline style={{ color: '#2c436a' }} label="Use as Primary Address" checked={formValues.isPrimary} onChange={(e) => setFormValues({ ...formValues, isPrimary: e.target.checked })} />
                                </Form.Group>
                            </Row>
                            <Row id="save-address">
                                <button onClick={onClickSaveAddress} className={isProgress ? 'btn btn-primary  btn-primary-gradient btn-block pr-0 kt-spinner kt-spinner--right kt-spinner--md kt-spinner--light' : 'btn btn-primary  btn-primary-gradient btn-block'} > Update Address</button>
                            </Row>
                        </Col>

                    </Row>


                </Container>
            </Modal.Body>
        </Modal>
    );
}