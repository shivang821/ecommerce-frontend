import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useParams } from 'react-router-dom'
import { getOrderDetails } from '../../action/orderAction';
import Progress from '../layout/MuiLoader/Progress'
import './orderDetails.css'
const OrderDetails = () => {
    const dispatch = useDispatch()
    const { id, pid } = useParams()
    const { order, loading } = useSelector(state => state.orderDetails)
    let shippingInfo, orderItems;
    let product;
    const months = ["January", "February", "March", "April", "rsMay", "June", "July", "August", "September", "October", "November", "December"]
    let localDate, month, date, deliveryDate;
    if (order) {
        shippingInfo = order.shippingInfo;
        orderItems = order.orderItems
        product = orderItems[0]
        localDate = order.createdAt.substring(0, 10)
        month = localDate.substring(5, 7)
        date = Number(localDate.substring(8))
        deliveryDate = `${months[month - 1]},${date + 7}`
    }
    useEffect(() => {
        dispatch(getOrderDetails(id, pid))
    }, [dispatch, id, pid])

    return (
        <>
            {loading ? <Progress /> :
                <div className="orderDetails">
                    <div className="shippingDetails">
                        <div className="shippingDiv">
                            <h1 className='shippingDetailsHeading' >Shipping Details</h1>
                            <div className='shippingDiv-1' >
                                <div className="key">
                                    <div>
                                        <h4>Address</h4>
                                    </div>
                                </div>
                                <div className="space">
                                    <h4>:</h4>
                                </div>
                                <div className="value">
                                    <h4>{shippingInfo.address}</h4>
                                </div>
                            </div>
                            <div className='shippingDiv-1' >
                                <div className="key">
                                    <div>
                                        <h4>City</h4>
                                    </div>
                                </div>
                                <div className="space">
                                    <h4>:</h4>
                                </div>
                                <div className="value">
                                    <h4>{shippingInfo.city}</h4>
                                </div>
                            </div>
                            <div className='shippingDiv-1' >
                                <div className="key">
                                    <div>
                                        <h4>State</h4>
                                    </div>
                                </div>
                                <div className="space">
                                    <h4>:</h4>
                                </div>
                                <div className="value">
                                    <h4>{shippingInfo.state}</h4>
                                </div>
                            </div>
                            <div className='shippingDiv-1' >
                                <div className="key">
                                    <div>
                                        <h4>Country</h4>
                                    </div>
                                </div>
                                <div className="space">
                                    <h4>:</h4>
                                </div>
                                <div className="value">
                                    <h4>{shippingInfo.country}</h4>
                                </div>
                            </div>
                            <div className='shippingDiv-1' >
                                <div className="key">
                                    <div>
                                        <h4>Pin Code</h4>
                                    </div>
                                </div>
                                <div className="space">
                                    <h4>:</h4>
                                </div>
                                <div className="value">
                                    <h4>{shippingInfo.pinCode}</h4>
                                </div>
                            </div>
                            <div className='shippingDiv-1' >
                                <div className="key">
                                    <div>
                                        <h4>phoneNo</h4>
                                    </div>
                                </div>
                                <div className="space">
                                    <h4>:</h4>
                                </div>
                                <div className="value">
                                    <h4>{shippingInfo.phoneNo}</h4>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="orderProduct">
                        <div className="orderProductDetail">
                            <div className='orderDetailsHeading'>
                                <h1 className='shippingDetailsHeading' >Order Details</h1>
                            </div>
                            <div className="orderProductDetail-1">
                                <div className="orderProductDetail-1-1">
                                    <NavLink to={`/products/${product.product}`} ><img className='orderProductImg' src={product.image} alt="" /></NavLink>
                                </div>
                                <div className="orderProductDetail-1-2">
                                    <div className="productName">
                                        <NavLink to={`/products/${product.product}`} ><p>{product.name}</p></NavLink>
                                    </div>
                                    {/* <br /> */}
                                    <hr />
                                    <div className="status">
                                        {/* <span><h5>Status:</h5><h5 className={order.orderStatus==="Processing"?"green":"red"} >{order.orderStatus}</h5></span> */}
                                        <h5>Status: <span className={order.orderStatus === "Processing" ? "green" : "red"}>{order.orderStatus}</span></h5>
                                    </div>
                                    {
                                        order.orderStatus === "Processing" ? <h5 >Delivered By {deliveryDate}</h5> : undefined
                                    }
                                    <hr />
                                    <div style={{ margin: "2rem 0" }}>
                                        <h5>Order id:{order._id}</h5>
                                    </div>
                                    <div style={{ margin: "2rem 0" }}>
                                        <h5>Quantity:{product.quantity}</h5>
                                    </div>
                                    <div style={{ margin: "2rem 0" }}>
                                        <h3>Price:{product.price}</h3>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </>
    )
}

export default OrderDetails