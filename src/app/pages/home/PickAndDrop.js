import React, { useEffect, useCallback, useState } from 'react';
import { Portlet, PortletBody } from '../../partials/content/Portlet';
import { Form, Row, Col } from 'react-bootstrap';
import Map from '../../partials/layout/Map';
import { useDispatch, useSelector } from 'react-redux';
import { AddressActions } from '../../store/ducks/address-duck/actions';
import { OrderActions } from '../../store/ducks/order-duck/actions';
import ReactDatePicker from 'react-datepicker';
import moment from 'moment';

export default function PickAndDrop({ history }) {

    const dispatch = useDispatch();
    const addresses = useSelector(store => store?.address?.addresses);
    const timeSlots = useSelector(store => store?.lov?.config?.timeSlots);
    const isProgressPickupSlot = useSelector(store => store?.order?.isProgressPickupSlot);
    const isProgressDropoffSlot = useSelector(store => store?.order?.isProgressDropoffSlot);
    const isDropoffSlotAvailable = useSelector(store => store?.order?.isDropoffSlotAvailable);
    const isPickupSlotAvailable = useSelector(store => store?.order?.isPickupSlotAvailable);
    const isErrorPickupSlot = useSelector(store => store?.order?.isErrorPickupSlot);
    const isErrorDropoffSlot = useSelector(store => store?.order?.isErrorDropoffSlot);
    const errorMessage = useSelector(store => store?.order?.errorMsg);
    const [pickupTime, setPickupTime] = useState([]);
    const [dropoffTime, setDropoffTime] = useState([]);
    const dropOfThreshold = useSelector(store => store?.lov?.config?.system.DropOfThreshold);
    const currentOrder = useSelector(store => store?.order?.currentOrder);
    const [formValues, setFormValues] = useState({
        pickupDate: '',
        pickupTime: '',
        dropoffDate: '',
        dropoffTime: '',
        driverInstruction: ''
    });

    const [notValid, setNotValid] = useState({ error: false, type: '', message: '' });

    const [selectedAddress, setSelectedAddress] = useState(undefined);

    useEffect(() => {
        if (timeSlots.length) {
            setPickupTime(timeSlots);
            setDropoffTime(timeSlots);
        }
    }, [timeSlots]);

    useEffect(() => {
        if (!currentOrder.start) {
            history.replace('/mybasket');
        }
    }, [currentOrder, history]);

    useEffect(() => {
        if (formValues.pickupTime && formValues.pickupDate) {
            let body = {
                date: moment(formValues.pickupDate).format('YYYY-MM-DD'),
                time: formValues.pickupTime,
                status: 'PickUp'// PickUp, DropOff
            };
            dispatch(OrderActions.checkSelectedPickupSlot(body));
        }

        return () => {
            dispatch(OrderActions.clearError());
        };

    }, [formValues.pickupTime, formValues.pickupDate, dispatch]);


    useEffect(() => {
        if (formValues.dropoffTime && formValues.dropoffDate) {
            let body = {
                date: moment(formValues.dropoffDate).format('YYYY-MM-DD'),
                time: formValues.dropoffTime,
                status: 'DropOff'// PickUp, DropOff
            };
            dispatch(OrderActions.checkSelectedDropoffSlot(body));
        }


    }, [formValues.dropoffTime, formValues.dropoffDate, dispatch]);



    useEffect(() => {
        dispatch(AddressActions.getAddresses());
        let { pickupDate,
            pickupTime,
            dropoffDate,
            dropoffTime,
            driverInstruction, address } = currentOrder;
        setSelectedAddress(address);
        setFormValues({
            pickupDate,
            pickupTime,
            dropoffDate,
            dropoffTime,
            driverInstruction
        });
    }, [dispatch, currentOrder]);

    const availableDropOffTime = useCallback((selectedPickupTimeIndex) => {
        let _dropoffTime = [...timeSlots];
        _dropoffTime = _dropoffTime.slice(selectedPickupTimeIndex - 1);
        setDropoffTime(_dropoffTime);

    }, [timeSlots]);
    const getPrimaryAddressLatLng = useCallback(() => {
        if (addresses.length && currentOrder.address === undefined) {
            let selectedAddress = addresses.find((v) => v.isPrimary);
            setSelectedAddress(selectedAddress);
        }
    }, [addresses, currentOrder]);
    useEffect(() => {
        getPrimaryAddressLatLng();
    }, [addresses, getPrimaryAddressLatLng]);

    const PlaceOrder = useCallback(() => {

        if (notValid.error) {
            setNotValid({ error: false, type: '', message: '' });
        }
        if (!formValues.pickupDate) {
            setNotValid({ error: true, type: 'pickupDate', message: 'Pick Up Date Not Selected' });
            return;
        }
        if (!formValues.pickupTime) {
            setNotValid({ error: true, type: 'pickupTime', message: 'Pick Up Time Not Selected' });
            return;
        }
        if (!formValues.dropoffDate) {
            setNotValid({ error: true, type: 'dropoffDate', message: 'Drop Off Date Not Selected' });
            return;
        }
        if (!formValues.dropoffTime) {
            setNotValid({ error: true, type: 'dropoffTime', message: 'Drop Off Time Not Selected' });
            return;
        }
        if (!selectedAddress) {
            let message = addresses.length ? 'Please select one address' : 'Please add address';
            setNotValid({ error: true, type: 'selectedAddress', message });
            return;
        }
        let body = { ...formValues, address: selectedAddress };
        dispatch(OrderActions.setPickupAndDropoff({ ...body }));
        history.push('/orderreview');
    }, [formValues, history, selectedAddress, dispatch, notValid, addresses]);

    const isSunday = useCallback(date => {
        const day = new Date(date).getDay();
        return day !== 0;
    }, []);
    const isSaturdaySelected = useCallback((date) => {
        const day = new Date(date).getDay();
        return day === 6;
    }, []);
    const today = 24;
    const dropoffStartHours = Number(dropOfThreshold);
    const dropoffStartDays = Math.ceil(dropoffStartHours / 24);
    const allowedDaysThreshold = 7;
    const pickupMinDate = moment(new Date()).add(today, 'hours').toDate();
    const pickupMaxDate = moment(new Date(), 'DD-MM-YYYY').add(allowedDaysThreshold, 'days').toDate();
    let dropOffMinDate = '';
    if (isSaturdaySelected(formValues.pickupDate)) {
        dropOffMinDate = moment(formValues.pickupDate, 'DD-MM-YYYY').add(dropoffStartHours + today, 'hours').toDate();
    } else {
        dropOffMinDate = moment(formValues.pickupDate, 'DD-MM-YYYY').add(dropoffStartHours, 'hours').toDate();
    }
    const dropOffMaxDate = moment(formValues.pickupDate, 'DD-MM-YYYY').add(allowedDaysThreshold + dropoffStartDays, 'days').toDate();
    return (
        <>
            <h4 className="mb-3" >Pick And Drop</h4>
            <div className="row">
                <div className="col-xl-6 col-md-6">
                    <div className="row row-full-height ">
                        <div className="col-md-12 ">
                            <Portlet className="">
                                <PortletBody>
                                    <Form className="d-flex flex-column border-bottom" >
                                        <Row className="" >
                                            <Form.Group as={Col} controlId="formGridStreet1">
                                                <Form.Label>Pickup Date
                                                {isProgressPickupSlot && <div className=" d-inline ml-3 kt-spinner kt-spinner--center kt-spinner--primary " ></div>}
                                                </Form.Label>
                                                <Form.Row>
                                                    <ReactDatePicker
                                                        selected={formValues.pickupDate}
                                                        onChange={(e) => {
                                                            setFormValues({ ...formValues, pickupDate: e, dropoffDate: '' });

                                                        }}
                                                        className="form-control react-date-picker-custom"
                                                        placeholderText={'mm/dd/yyyy'}
                                                        minDate={pickupMinDate}
                                                        maxDate={pickupMaxDate}
                                                        filterDate={isSunday}
                                                    />
                                                    {(notValid.error && notValid.type === 'pickupDate') && <label className="text-danger" > {notValid.message} </label>}
                                                </Form.Row>
                                            </Form.Group>
                                            <Form.Group as={Col} controlId="formGridStreet2">
                                                <Form.Label>Pickup Time</Form.Label>
                                                <Form.Control as="select" className="pickup-slots"
                                                    value={formValues.pickupTime}
                                                    onChange={(e) => {
                                                        setFormValues({ ...formValues, pickupTime: e.target.value, dropoffTime: '' });
                                                        availableDropOffTime(e.target.selectedIndex);
                                                    }
                                                    }>
                                                    <option value={''} >Please Select Pick Up Time</option>
                                                    {
                                                        pickupTime.map((v, i) => {
                                                            return (<option key={i} value={v.value} >{v.value}</option>);
                                                        })
                                                    }
                                                </Form.Control>
                                                {(notValid.error && notValid.type === 'pickupTime') && <label className="text-danger" > {notValid.message} </label>}
                                            </Form.Group>

                                        </Row>
                                        {isErrorPickupSlot && <span className="text-danger" >{errorMessage}</span>}
                                    </Form>
                                    <Form className="d-flex flex-column border-bottom  mt-3" >
                                        <Row className="" >
                                            <Form.Group as={Col} controlId="formGridStreet3">
                                                <Form.Label>Dropoff Date
                                                {isProgressDropoffSlot && <div className=" d-inline ml-3 kt-spinner kt-spinner--center kt-spinner--primary " ></div>}
                                                </Form.Label>
                                                <Form.Row>
                                                    <ReactDatePicker
                                                        disabled={!isPickupSlotAvailable}
                                                        selected={formValues.dropoffDate}
                                                        onChange={(e) => {
                                                            setFormValues({ ...formValues, dropoffDate: e });

                                                        }}
                                                        className="form-control react-date-picker-custom"
                                                        placeholderText={'mm/dd/yyyy'}
                                                        minDate={dropOffMinDate}
                                                        maxDate={dropOffMaxDate}
                                                        filterDate={isSunday}
                                                    />
                                                    {(notValid.error && notValid.type === 'dropoffDate') && <label className="text-danger" > {notValid.message} </label>}
                                                </Form.Row>
                                            </Form.Group>
                                            <Form.Group as={Col} controlId="formGridStreet4">
                                                <Form.Label>Dropoff Time</Form.Label>
                                                <Form.Control as="select" className="pickup-slots"
                                                    value={formValues.dropoffTime}
                                                    onChange={(e) => {
                                                        setFormValues({ ...formValues, dropoffTime: e.target.value });

                                                    }
                                                    }
                                                    disabled={!isPickupSlotAvailable}
                                                >
                                                    <option value={''} >Please Select Drop Off Time</option>
                                                    {
                                                        dropoffTime.map((v, i) => {
                                                            return (<option key={i} value={v.value} >{v.value}</option>);
                                                        })
                                                    }
                                                </Form.Control>
                                                {(notValid.error && notValid.type === 'dropoffTime') && <label className="text-danger" > {notValid.message} </label>}
                                            </Form.Group>
                                        </Row>
                                        {isErrorDropoffSlot && <span className="text-danger" >{errorMessage}</span>}
                                    </Form>
                                    <Form>
                                        <div className="border-bottom mt-3 d-block"  >
                                            {
                                                addresses.map((v, i) => {
                                                    return (
                                                        <Row key={i}>
                                                            <Form.Group as={Col} controlId={`addresses${i}`} >
                                                                <Form.Check inline placeholder="" type="radio" checked={v?.id === selectedAddress?.id} onChange={() => setSelectedAddress(v)} />
                                                                <Form.Label className="address-label" >
                                                                    <img alt={'img'} src={require('../../../_metronic/layout/assets/layout-svg-icons/pin.svg')} />
                                                                    <span className="ml-1" >{v?.postalCode} | {v?.street}</span></Form.Label>
                                                            </Form.Group>
                                                        </Row>
                                                    );
                                                })

                                            }
                                            {(notValid.error && notValid.type === 'selectedAddress') && <label className="text-danger" > {notValid.message} </label>}
                                            <Row>
                                                <button onClick={() => history.push('/deliveryaddress')} className="btn mb-3 ml-3 btn-primary-gradient btn-primary ">Add Address</button>
                                            </Row>
                                        </div>
                                    </Form>

                                    <Row className=" mt-3" >
                                        <Form.Group as={Col} controlId="formGridPhone">
                                            <Form.Label>Driver Instruction</Form.Label>
                                            <Form.Control as="textarea" rows="3" value={formValues.driverInstruction} placeholder="" onChange={(e) => setFormValues({ ...formValues, driverInstruction: e.target.value })} />
                                        </Form.Group>
                                    </Row>
                                    <Row className="justify-content-end pb-5 " >
                                        <button onClick={() => PlaceOrder()} disabled={!isDropoffSlotAvailable || !isPickupSlotAvailable} id="pickdrop-placeorder" className="btn btn-lg btn-primary-gradient btn-primary ">Place Order</button>
                                    </Row>
                                </PortletBody>
                            </Portlet>
                        </div>
                    </div>
                </div>
                <div className="col-xl-6 col-md-6">
                    <div className="row row-full-height">
                        <div className="col-md-12 ">

                            {<Map height={'600px'} lat={Number(selectedAddress?.lat)} lng={Number(selectedAddress?.lng)} showMarker={true} />}

                        </div>
                    </div>
                </div>

            </div>
        </>
    );
}