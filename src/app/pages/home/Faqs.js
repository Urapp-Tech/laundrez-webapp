import React, { useState, useEffect } from 'react';
import { PortletBody, Portlet } from '../../partials/content/Portlet';
import { Accordion, useAccordionToggle } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { FaqActions } from '../../store/ducks/faq-duck';
function CustomToggle({ eventKey, value }) {
    const [isOpen, toggle] = useState(false);
    const decoratedOnClick = useAccordionToggle(eventKey, () =>
        toggle(!isOpen)
    );

    return (
        <div onClick={decoratedOnClick} className="cursor-pointer faq-heading d-flex justify-content-between" >
            {isOpen ? <h6 className="text-primary"> {value}</h6> : <h6> {value}</h6>}
            <div>{isOpen ? <img alt={'img'} className="arrow-icon " src={require('../../../_metronic/layout/assets/layout-svg-icons/arrow-down-primary.svg')} /> : <img alt={'img'} className="arrow-icon" src={require('../../../_metronic/layout/assets/layout-svg-icons/arrow-right.svg')} />}</div>
        </div>
    );
}

export default function Faqs() {
    
    const dispatch = useDispatch();
    const faqs = useSelector(store => store?.faq?.faqs);
    useEffect(() => {
        dispatch(FaqActions.getFaqs());
    }, [dispatch]);
    return (
        <>
            <h4 className="mb-3" >FAQ's</h4>
            <div className="row">
                <div className="col-md-12">
                    <Portlet className="">
                        <PortletBody>
                            {
                                faqs.map((v, i) => {

                                    return <div key={i} className="border-bottom pb-3 mb-3" >
                                        <Accordion defaultActiveKey="0">
                                            <CustomToggle value={v.question} eventKey="1" />

                                            <Accordion.Collapse eventKey="1">
                                                <div className="faq-ans" >
                                                    {v.answer}
                                                </div>
                                            </Accordion.Collapse>
                                        </Accordion>
                                    </div>;
                                })
                            }

                        </PortletBody>
                    </Portlet>
                </div>
            </div>
        </>
    );
}