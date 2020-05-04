import React, { useState } from 'react';
import Pin from '../../../_metronic/layout/assets/layout-svg-icons/pin.svg';
import Garbage from '../../../_metronic/layout/assets/layout-svg-icons/garbage.svg';
import UpdateAddressModal from '../layout/UpdateAddressModal';


export default function SavedAddress({ address, deleteAddress, index }) {
    const [openModal, setOpenModal] = useState(false);
    return (
        <div className="border-bottom pb-3 mb-3 d-flex justify-content-between align-items-center" >
            <div onClick={() => setOpenModal(!openModal)} className="cursor-pointer d-flex street-container   justify-content-start align-items-center">
                <span>
                    <img src={Pin} className="pin-image img-fluid " alt={'pin'} />
                </span>
                <span className="ml-2 street-text cursor " > {address?.postalCode} | {address?.street}</span>
            </div>
            <span className="cursor-pointer" >
                <img onClick={deleteAddress} src={Garbage} className="pin-image img-fluid " alt={'img'} />
            </span>
            <UpdateAddressModal address={address} showModal={openModal} toggleModal={() => setOpenModal(!openModal)} index={index} />
        </div>
    );
}