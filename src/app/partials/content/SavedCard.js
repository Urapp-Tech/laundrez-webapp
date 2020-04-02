import React from 'react';
import Garbage from '../../../_metronic/layout/assets/layout-svg-icons/garbage.svg';

export default function SavedCard({ cardCount }) {
    return (
        <>
            <span className="ml-2 mb-2 text-secondary" >Card {cardCount}</span>
            <div className="border-bottom pb-3 mb-3  d-flex justify-content-between align-items-center" >
                <div className=" d-flex street-container   justify-content-start align-items-center">

                    <h6 className="ml-2 street-text cursor m-0" >4929 5529 6776 1495</h6>
                </div>
                <span className="cursor-pointer" >
                    <img alt={'img'} src={Garbage} className="pin-image img-fluid " />
                </span>

            </div>
        </>
    );
}