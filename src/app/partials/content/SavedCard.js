import React from 'react';
import Garbage from '../../../_metronic/layout/assets/layout-svg-icons/garbage.svg';

export default function SavedCard({ cardCount, cardNumber, expiryMonth, expiryYear, deleteCard }) {
    return (
        <>
            <span className="ml-2 mb-2 text-secondary" >Card {cardCount}</span>
            <div className="border-bottom pb-3 mb-3  d-flex justify-content-between align-items-center" >
                <div className=" d-flex flex-column street-container   justify-content-start align-items-center">

                    <h6 className="ml-2 street-text cursor m-0" >XXXX XXXX XXXX {cardNumber}</h6>
                    <span>Expires on {expiryMonth}, {expiryYear} </span>
                </div>
                <span onClick={deleteCard} className="cursor-pointer" >
                    <img alt={'img'} src={Garbage} className="pin-image img-fluid " />
                </span>

            </div>
        </>
    );
}