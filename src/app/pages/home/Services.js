import React, { useState, useEffect, useCallback } from 'react';
import ServiceModal from '../../partials/layout/ServiceModal';
import { Portlet, PortletBody } from '../../partials/content/Portlet';
import { useParams, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { ServiceActions } from '../../store/ducks/service-duck';
import { API_URL } from '../../store/services/config';
import defaultImage from '../../../_metronic/layout/assets/layout-svg-icons/no-image.png';

export default function Services() {
    const [showModal, setShowModal] = useState(false);
    const dispatch = useDispatch();
    const { categoryId } = useParams();
    const { location } = useHistory();
    const { state } = location;
    const services = useSelector(store => store?.service?.services);

    const [selectedService, setSelectedService] = useState(null);

    useEffect(() => {
        dispatch(ServiceActions.getServices(categoryId));
    }, [dispatch, categoryId]);

    const onCardClick = useCallback((index) => {
        setShowModal(true);
        setSelectedService(services[index]);
    }, [services]);

    const closeModal = useCallback(() => {
        setShowModal(false);
        setSelectedService(null);
    },[]);

    return (
        <div>
            <h2 className="mb-5" >{state?.category?.title}</h2>
            <div className="d-flex flex-wrap  w-100">
                {services.map((data, i) => {
                    return (
                        <div key={i} className="margin-card " onClick={() => onCardClick(i)} >
                            <Portlet className="justify-content-center category-card kt-portlet--border-bottom-brand">
                                <PortletBody className="justify-content-center align-items-center" >
                                    <h5>{data.title}</h5>
                                    <img className="category-image mb-1" alt="img" src={data.image ? `${API_URL}/${data.image}` : defaultImage} />
                                    <div className="text-truncate card-description" >{data.shortDescription}</div>
                                    <h2 className="font-weight-bold price" >${data.price}</h2>
                                </PortletBody>
                            </Portlet>
                        </div>
                    );
                })
                }
            </div>
            {selectedService && <ServiceModal data={selectedService} showModal={showModal} closeModal={closeModal} />}
        </div>
    );
}   
