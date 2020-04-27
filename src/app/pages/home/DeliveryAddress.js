import React, { useState } from 'react';
import { Portlet, PortletBody } from '../../partials/content/Portlet';
import { Col, Row, Form } from 'react-bootstrap';
import SavedAddress from '../../partials/content/SavedAddress';
import GooglePlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-google-places-autocomplete';
export default function DeliveryAddress() {
    const [formValues, setFormValues] = useState({
        street: '',
        state: '',
        city: '',
        phoneNo: '',
        postalCode: '',
        suiteNumber: '',
        busserCode: '',
        propertyType: '',
        lat: '',
        lng: '',
        formattedAddress: ''


    });

    const handleSelect = obj => {
        geocodeByAddress(obj.description)
            .then(results => {
                let _results = results[0];
                console.log(_results);
                let lat = _results.geometry.location.lat();
                let lng = _results.geometry.location.lng();
                let formattedAddress = _results.formatted_address;
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
                    city,
                    street,
                    state,
                    postalCode,
                    lat,
                    lng,
                    formattedAddress
                });


            });
    };
    return (
        <>
            <h4 className="mb-3" >Delivery Address</h4>
            <div className="row">
                <div className="col-md-8">
                    <Portlet className="">
                        <PortletBody>
                            <h5 className="mb-3" >Add New Address</h5>
                            <div className="row" >
                                <div className="col-md-6">
                                    <Form>
                                        <Row>
                                            <Form.Group as={Col} controlId="formGridStreet">
                                                <Form.Label>Main Address</Form.Label>
                                                <GooglePlacesAutocomplete
                                                    onSelect={handleSelect}
                                                    inputClassName="form-control"
                                                    placeholder=''
                                                    initialValue={formValues.formattedAddress}


                                                />
                                            </Form.Group>
                                        </Row>
                                        <Row>
                                            <Form.Group as={Col} controlId="formGridStreet">
                                                <Form.Label>Street</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    placeholder=""
                                                    readOnly
                                                    value={formValues.street}
                                                />
                                            </Form.Group>

                                        </Row>
                                        <Row>
                                            <Form.Group as={Col} controlId="formGridSuite">
                                                <Form.Label>Suite Number</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    placeholder=""
                                                />
                                            </Form.Group>
                                        </Row>
                                        <Row>
                                            <Form.Group as={Col} controlId="formGridCode">
                                                <Form.Label>Postal Code</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    placeholder=""
                                                    value={formValues.postalCode}
                                                    onChange={(e) => setFormValues({ postalCode: e.target.value })}
                                                />
                                            </Form.Group>
                                        </Row>
                                        <Row>
                                            <Form.Group as={Col} controlId="formGridState">
                                                <Form.Label>State</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    placeholder=""
                                                    readOnly
                                                    value={formValues.state}
                                                />
                                            </Form.Group>
                                        </Row>
                                        <Row>
                                            <Form.Group as={Col} controlId="formGridCity">
                                                <Form.Label>City</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    placeholder=""
                                                    readOnly
                                                    value={formValues.city}
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
                                            />
                                        </Form.Group>
                                    </Row>
                                    <Row>
                                        <Form.Group as={Col} controlId="formGridProperty">
                                            <Form.Label>Property Type</Form.Label>
                                            <Form.Control as="select">
                                                <option>Residential</option>
                                            </Form.Control>
                                        </Form.Group>
                                    </Row>
                                    <Row>
                                        <Form.Group as={Col} controlId="formGridBusser">
                                            <Form.Label>Busser Code</Form.Label>
                                            <Form.Control type="number" placeholder="" />
                                        </Form.Group>
                                    </Row>
                                    <Row>
                                        <Form.Group as={Col} controlId="formGridBusser">
                                            <Form.Check className="check-primary-addrs" inline style={{ color: '#2c436a' }} label="Use as Primary Address" />
                                        </Form.Group>
                                    </Row>
                                    <Row id="save-address">
                                        <button className="btn btn-primary  btn-primary-gradient btn-block" > Save Address</button>
                                    </Row>

                                </div>
                            </div>

                        </PortletBody>
                    </Portlet>
                </div>
                <div className="col-md-4">
                    <Portlet className="">
                        <PortletBody>
                            <h5 className="mb-3" >Saved Address</h5>
                            <div className="row" >
                                <div className="col-md-12">
                                    <SavedAddress />
                                </div>
                            </div>
                        </PortletBody>
                    </Portlet>
                </div>
            </div>
        </>
    );
}