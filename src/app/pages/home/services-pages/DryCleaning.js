import React, { useState } from "react";
import { Portlet, PortletBody } from "../../../partials/content/Portlet";
import ServiceModal from "../../../partials/layout/ServiceModal";

export default function DryCleaning() {
    const orders = [
        {
            serviceTitle: 'Blazers',
            serviceDesc:
                'Praesent eu dolor eu orci vehicula euismod. Vivamus sed sollicitudin libero, vel malesuada velit. Nullam et maximus lorem. Suspendisse maximus dolor quis consequat volutpat. Donec vehicula elit eu erat pulvinar, vel congue ex egestas. Praesent egestas purus dolor, a porta arcu pharetra quis. Sed vestibulum semper ligula, id accumsan orci ornare ut. Donec id pharetra nunc, ut sollicitudin mi. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Aliquam dapibus nisl at diam scelerisque luctus. Nam mattis, velit in malesuada maximus, erat ligula eleifend eros, et lacinia nunc ante vel odio.',
            serviceImage: 'https://i.ya-webdesign.com/images/clothes-model-png-2.png',
            serviceCharges: '$15.00',
        },
        {
            serviceTitle: 'Pants',
            serviceDesc:
                'Praesent eu dolor eu orci vehicula euismod. Vivamus sed sollicitudin libero, vel malesuada velit. Nullam et maximus lorem. Suspendisse maximus dolor quis consequat volutpat. Donec vehicula elit eu erat pulvinar, vel congue ex egestas. Praesent egestas purus dolor, a porta arcu pharetra quis. Sed vestibulum semper ligula, id accumsan orci ornare ut. Donec id pharetra nunc, ut sollicitudin mi. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Aliquam dapibus nisl at diam scelerisque luctus. Nam mattis, velit in malesuada maximus, erat ligula eleifend eros, et lacinia nunc ante vel odio.',
            serviceImage:
                'https://pluspng.com/img-png/men-clothes-png-mens-fashion-png-file-564.png',
            serviceCharges: '$12.00',
        },
        {
            serviceTitle: 'Scarf',
            serviceDesc:
                'Praesent eu dolor eu orci vehicula euismod. Vivamus sed sollicitudin libero, vel malesuada velit. Nullam et maximus lorem. Suspendisse maximus dolor quis consequat volutpat. Donec vehicula elit eu erat pulvinar, vel congue ex egestas. Praesent egestas purus dolor, a porta arcu pharetra quis. Sed vestibulum semper ligula, id accumsan orci ornare ut. Donec id pharetra nunc, ut sollicitudin mi. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Aliquam dapibus nisl at diam scelerisque luctus. Nam mattis, velit in malesuada maximus, erat ligula eleifend eros, et lacinia nunc ante vel odio.',
            serviceImage: 'https://pngimg.com/uploads/scarf/scarf_PNG25.png',
            serviceCharges: '$7.00',
        },
        {
            serviceTitle: 'Shirts',
            serviceDesc:
                'Praesent eu dolor eu orci vehicula euismod. Vivamus sed sollicitudin libero, vel malesuada velit. Nullam et maximus lorem. Suspendisse maximus dolor quis consequat volutpat. Donec vehicula elit eu erat pulvinar, vel congue ex egestas. Praesent egestas purus dolor, a porta arcu pharetra quis. Sed vestibulum semper ligula, id accumsan orci ornare ut. Donec id pharetra nunc, ut sollicitudin mi. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Aliquam dapibus nisl at diam scelerisque luctus. Nam mattis, velit in malesuada maximus, erat ligula eleifend eros, et lacinia nunc ante vel odio.',
            serviceImage:
                'https://pngimg.com/uploads/dress_shirt/dress_shirt_PNG8068.png',
            serviceCharges: '$10.00',
        },
        {
            serviceTitle: 'Shirts',
            serviceDesc:
                'Praesent eu dolor eu orci vehicula euismod. Vivamus sed sollicitudin libero, vel malesuada velit. Nullam et maximus lorem. Suspendisse maximus dolor quis consequat volutpat. Donec vehicula elit eu erat pulvinar, vel congue ex egestas. Praesent egestas purus dolor, a porta arcu pharetra quis. Sed vestibulum semper ligula, id accumsan orci ornare ut. Donec id pharetra nunc, ut sollicitudin mi. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Aliquam dapibus nisl at diam scelerisque luctus. Nam mattis, velit in malesuada maximus, erat ligula eleifend eros, et lacinia nunc ante vel odio.',
            serviceImage:
                'https://pngimg.com/uploads/dress_shirt/dress_shirt_PNG8068.png',
            serviceCharges: '$10.00',
        },
        {
            serviceTitle: 'Blazers',
            serviceDesc:
                'Praesent eu dolor eu orci vehicula euismod. Vivamus sed sollicitudin libero, vel malesuada velit. Nullam et maximus lorem. Suspendisse maximus dolor quis consequat volutpat. Donec vehicula elit eu erat pulvinar, vel congue ex egestas. Praesent egestas purus dolor, a porta arcu pharetra quis. Sed vestibulum semper ligula, id accumsan orci ornare ut. Donec id pharetra nunc, ut sollicitudin mi. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Aliquam dapibus nisl at diam scelerisque luctus. Nam mattis, velit in malesuada maximus, erat ligula eleifend eros, et lacinia nunc ante vel odio.',
            serviceImage: 'https://i.ya-webdesign.com/images/clothes-model-png-2.png',
            serviceCharges: '$15.00',
        },
        {
            serviceTitle: 'Pants',
            serviceDesc:
                'Praesent eu dolor eu orci vehicula euismod. Vivamus sed sollicitudin libero, vel malesuada velit. Nullam et maximus lorem. Suspendisse maximus dolor quis consequat volutpat. Donec vehicula elit eu erat pulvinar, vel congue ex egestas. Praesent egestas purus dolor, a porta arcu pharetra quis. Sed vestibulum semper ligula, id accumsan orci ornare ut. Donec id pharetra nunc, ut sollicitudin mi. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Aliquam dapibus nisl at diam scelerisque luctus. Nam mattis, velit in malesuada maximus, erat ligula eleifend eros, et lacinia nunc ante vel odio.',
            serviceImage:
                'https://pluspng.com/img-png/men-clothes-png-mens-fashion-png-file-564.png',
            serviceCharges: '$12.00',
        },
        {
            serviceTitle: 'Scarf',
            serviceDesc:
                'Praesent eu dolor eu orci vehicula euismod. Vivamus sed sollicitudin libero, vel malesuada velit. Nullam et maximus lorem. Suspendisse maximus dolor quis consequat volutpat. Donec vehicula elit eu erat pulvinar, vel congue ex egestas. Praesent egestas purus dolor, a porta arcu pharetra quis. Sed vestibulum semper ligula, id accumsan orci ornare ut. Donec id pharetra nunc, ut sollicitudin mi. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Aliquam dapibus nisl at diam scelerisque luctus. Nam mattis, velit in malesuada maximus, erat ligula eleifend eros, et lacinia nunc ante vel odio.',
            serviceImage: 'https://pngimg.com/uploads/scarf/scarf_PNG25.png',
            serviceCharges: '$7.00',
        },
        {
            serviceTitle: 'Shirts',
            serviceDesc:
                'Praesent eu dolor eu orci vehicula euismod. Vivamus sed sollicitudin libero, vel malesuada velit. Nullam et maximus lorem. Suspendisse maximus dolor quis consequat volutpat. Donec vehicula elit eu erat pulvinar, vel congue ex egestas. Praesent egestas purus dolor, a porta arcu pharetra quis. Sed vestibulum semper ligula, id accumsan orci ornare ut. Donec id pharetra nunc, ut sollicitudin mi. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Aliquam dapibus nisl at diam scelerisque luctus. Nam mattis, velit in malesuada maximus, erat ligula eleifend eros, et lacinia nunc ante vel odio.',
            serviceImage:
                'https://pngimg.com/uploads/dress_shirt/dress_shirt_PNG8068.png',
            serviceCharges: '$10.00',
        },
        {
            serviceTitle: 'Shirts',
            serviceDesc:
                'Praesent eu dolor eu orci vehicula euismod. Vivamus sed sollicitudin libero, vel malesuada velit. Nullam et maximus lorem. Suspendisse maximus dolor quis consequat volutpat. Donec vehicula elit eu erat pulvinar, vel congue ex egestas. Praesent egestas purus dolor, a porta arcu pharetra quis. Sed vestibulum semper ligula, id accumsan orci ornare ut. Donec id pharetra nunc, ut sollicitudin mi. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Aliquam dapibus nisl at diam scelerisque luctus. Nam mattis, velit in malesuada maximus, erat ligula eleifend eros, et lacinia nunc ante vel odio.',
            serviceImage:
                'https://pngimg.com/uploads/dress_shirt/dress_shirt_PNG8068.png',
            serviceCharges: '$10.00',
        },
    ];
    const [showModal, toggleModal] = useState(false);
    return (
        <div>
            <h2 className="mb-5" >Dry Cleaning</h2>
            <div className="d-flex flex-wrap  ">
                {orders.map((data, i) => {
                    return (
                        <div key={i} className="margin-card " onClick={() => toggleModal(!showModal)} >
                            <Portlet className="justify-content-center category-card kt-portlet--border-bottom-brand">
                                <PortletBody className="justify-content-center align-items-center" >
                                    <h5>{data.serviceTitle}</h5>
                                    <img className="category-image" alt="img" src={data.serviceImage} />
                                    <div className="text-truncate card-description" >{data.serviceDesc}</div>
                                    <h2 className="font-weight-bold price" >{data.serviceCharges}</h2>
                                </PortletBody>
                            </Portlet>
                        </div>
                    )
                })
                }
            </div>
            <ServiceModal data={orders[0]} showModal={showModal} toggleModal={() => toggleModal(!showModal)} />
        </div>
    )
}