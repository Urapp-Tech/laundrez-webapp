import React, { useState } from 'react';
import Pin from '../../../_metronic/layout/assets/layout-svg-icons/pin.svg';
import Garbage from '../../../_metronic/layout/assets/layout-svg-icons/garbage.svg';
import UpdateAddressModal from '../layout/UpdateAddressModal';


export default function SavedAddress({ address }) {
    const [openModal, setOpenModal] = useState(false);
    return (
        <div className="border-bottom pb-3  d-flex justify-content-between align-items-center" >
            <div onClick={() => setOpenModal(!openModal)} className="cursor-pointer d-flex street-container   justify-content-start align-items-center">
                <span>
                    <img src={Pin} className="pin-image img-fluid " alt={'pin'} />
                </span>
                <span className="ml-2 street-text cursor " > {address?.postalCode} | {address?.streetAddress}</span>
            </div>
            <span className="cursor-pointer" >
                <img src={Garbage} className="pin-image img-fluid " alt={'img'} />
            </span>
            <UpdateAddressModal address={address} showModal={openModal} toggleModal={() => setOpenModal(!openModal)} />
        </div>
    );
}