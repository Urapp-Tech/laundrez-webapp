import React, { useState, useCallback, useEffect } from 'react';
import { Portlet, PortletBody } from '../../partials/content/Portlet';
import { Col, Row, Form } from 'react-bootstrap';
import SavedAddress from '../../partials/content/SavedAddress';
import GooglePlacesAutocomplete, { geocodeByAddress } from 'react-google-places-autocomplete';
import { useSelector, useDispatch } from 'react-redux';
import { AddressActions } from '../../store/ducks/address-duck/actions';
export default function DeliveryAddress() {
    const dispatch = useDispatch();
    const [formValues, setFormValues] = useState({
        street: '',
        state: '',
        city: '',
        phoneNo: '',
        postalCode: '',
        suiteNumber: '',
        buzzerCode: '',
        propertyType: 'Residential',
        lat: '',
        lng: '',
        mainAddress: '',
        isPrimary: false
    });
    const [notValid, setNotValid] = useState({ error: false, type: '', message: '' });
    const user = useSelector(store => store?.auth?.user);
    const isProgress = useSelector(store => store?.address?.isProgressSave);
    const addresses = useSelector(store => store?.address?.addresses);
    const isSuccess = useSelector(store => store?.notification?.isSuccess);
    useEffect(() => {
        dispatch(AddressActions.getAddresses());
        let autoCompleteInput = document.getElementById('react-google-places-autocomplete-input');
        autoCompleteInput.removeAttribute('autocomplete');
        autoCompleteInput.setAttribute('autocomplete', 'no');
    }, [dispatch]);

    useEffect(() => {
        if (isSuccess) {
            setFormValues({
                street: '',
                state: '',
                city: '',
                phoneNo: '',
                postalCode: '',
                suiteNumber: '',
                buzzerCode: '',
                propertyType: 'Residential',
                lat: '',
                lng: '',
                mainAddress: '',
                isPrimary: false
            });
        }
    }, [isSuccess]);


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
            lng: (formValues.lng).toFixed(5),
            lat: (formValues.lat).toFixed(5),
            mainAddress: formValues.mainAddress,
            buzzerCode: formValues.buzzerCode,
            isPrimary: formValues.isPrimary
        };
        dispatch(AddressActions.saveAddress(body));
    }, [formValues, notValid, user, dispatch]);
    return (
        <>
            <h4 className="mb-3" >Add Delivery Address</h4>
            <div className="row">
                <div className="col-md-8">
                    <Portlet className="">
                        <PortletBody>
                            <div className="row" >
                                <div className="col-md-6">
                                    <Form  >
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
                                </div>
                                <div className="col-md-6">
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
                                        <Form.Group as={Col} controlId="formGridBusser">
                                            <Form.Check value={formValues.isPrimary} checked={formValues.isPrimary} onChange={() => setFormValues({ ...formValues, isPrimary: !formValues.isPrimary })} className="check-primary-addrs" inline style={{ color: '#2c436a' }} label="Use as Primary Address" />
                                        </Form.Group>
                                    </Row>
                                    <Row id="save-address">
                                        <button onClick={onClickSaveAddress} className={isProgress ? 'btn btn-primary  btn-primary-gradient btn-block pr-0 kt-spinner kt-spinner--right kt-spinner--md kt-spinner--light' : 'btn btn-primary  btn-primary-gradient btn-block'} > Save Address</button>
                                    </Row>

                                </div>
                            </div>

                        </PortletBody>
                    </Portlet>
                </div>
                <Col md={4}>
                    <Portlet className="">
                        <PortletBody>
                            <h5 className="mb-3" >Saved Address</h5>
                            <Row >
                                <Col md={12} className="mb-3">
                                    {
                                        addresses.map((v, i) => {
                                            return (<SavedAddress address={v} deleteAddress={() => dispatch(AddressActions.deleteAddress(v.id, i))} key={i} index={i} />);
                                        })
                                    }
                                </Col>
                            </Row>
                        </PortletBody>
                    </Portlet>
                </Col>
            </div>
        </>
    );
}