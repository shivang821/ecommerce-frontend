import React from 'react'
import { NavLink } from 'react-router-dom';
import './MyOrderCard.css'
const MyOrderCard = ({ order }) => {
    const { orderItems } = order;
    return (
        <>
            {
                orderItems.map((item) => {

                    return (<div className="myOrderCard">
                        <div className="myOrderImg">
                            <NavLink to={`/products/${item.product}`}>
                                <img src={item.image} alt={item.name} />
                            </NavLink>
                        </div>
                        <div className="myOrderDetails">
                            <NavLink to={`/products/${item.product}`} ><p>{item.name} (#{order._id})</p></NavLink>
                            <div className="myOrderDetails-2">

                                <p>Price:{item.price}</p>
                                <NavLink className='orderLink' to={`/orders/${order._id}/${item._id}`} >View Details</NavLink>
                            </div>
                        </div>
                    </div>
                    )
                })
            }
        </>
    )
}

export default MyOrderCard