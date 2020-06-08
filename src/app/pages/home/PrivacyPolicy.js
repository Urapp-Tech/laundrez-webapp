import React, { useEffect } from 'react';
import { Portlet, PortletBody } from '../../partials/content/Portlet';
import { Row, Col } from 'react-bootstrap';
import ScrollTop from '../../partials/layout/ScrollTop';
import { useDispatch, useSelector } from 'react-redux';
import { LovActions } from '../../store/ducks/lov-duck/actions';
export default function PrivacyPolicy() {
    const dispatch = useDispatch();
    const policy = useSelector(store => store?.lov?.policy);
    const policyYear = useSelector(store => store?.lov?.policyYear);
    useEffect(() => {
        window.scrollTo(0, 0);
        dispatch(LovActions.getPrivacyPolicy());

    }, [dispatch]);
    return (
        <div className="container py-5" >
            <ScrollTop />
            <h4 className="mb-3 ml-3" >Privacy Policy</h4>
            <Row >
                <Col md={12} >
                    <Portlet className="">
                        <PortletBody>
                            <h4 className="text-primary mb-3" >Last Update: {policyYear}</h4>
                            <div dangerouslySetInnerHTML={{ __html: policy }} ></div>
                        </PortletBody>
                    </Portlet>
                </Col>
            </Row>
        </div>
    );
}