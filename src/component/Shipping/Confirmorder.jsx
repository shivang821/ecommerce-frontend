import React from 'react'
import StepperComponent from './StepperComponent';
import './confirmOrder.css'
import { useSelector } from 'react-redux';
import ConfirmCard from './ConfirmCard';
import { useNavigate } from 'react-router-dom';
const Confirmorder = () => {
    const history=useNavigate()
    const { cartItems, shippingInfo } = useSelector(state => state.Cart)
    const { user } = useSelector(state => state.User);
    const Address = `${shippingInfo.address}, ${shippingInfo.city}(${shippingInfo.pinCode}), ${shippingInfo.state}, ${shippingInfo.country}`
    const subtotal=cartItems.reduce((total,item)=>total+item.price*item.quantity,0)
    const shippingCharges=subtotal>499?0:200;
    const gst=subtotal*18/100
    const total=shippingCharges+gst+subtotal;
    const proceedToPayment=()=>{
        const data={
            subtotal,shippingCharges,tax:gst,total
        }
        sessionStorage.setItem("orderInfo",JSON.stringify(data))
        history('/process/payment')
    }
    return (
        <>
            <div className="ConfirmOrderContainer">

                <StepperComponent activeState={1} />
                <div className="ConfirmOrder">
                    <div className="orderDetails">
                        <div className="userDetailsBox">
                            <div className="userDetailsHeading">
                                <h2>Shipping Info</h2>
                            </div>
                            <div className='userDetails'>

                                <div className="leftUser">
                                    <h5>Name:</h5>
                                    <h5>Phone:</h5>
                                    <h5>Address:</h5>
                                </div>
                                <div className="rightUser">
                                    <h5>{user.name}</h5>
                                    <h5>{shippingInfo.phoneNo}</h5>
                                    <h5>{Address}</h5>
                                </div>
                            </div>
                            <div className='border-main' ></div>
                        </div>
                        <div className="itemsDetails">
                            <div className='cartItemsHeading' >
                                <h2>Your Cart Items</h2>
                            </div>
                            {/* <div className="confirmCards">
                            </div> */}
                            {
                                cartItems.map((item,ind)=>{
                                    return <ConfirmCard key={ind} product={item} />
                                })
                            }
                            
                        </div>
                    </div>
                    <div className="orderSummary">
                            <div className="summary">
                                <div className="summaryHeading">
                                    <h2>Order Summary</h2>
                                    <div></div>
                                </div>
                                <div className="charges">
                                    <div className="leftCharges">
                                        <h5>Sub Total:</h5>
                                        <h5>Shipping Charges:</h5>
                                        <h5>GST:</h5>
                                    </div>
                                    <div className="rightCharges">
                                        <h5>₹{subtotal}</h5>
                                        <h5>₹{shippingCharges}</h5>
                                        <h5>₹{gst}</h5>
                                    </div>
                                </div>
                                <div className="totalCharge">
                                        <div className="totalLeft">
                                            <h5>Total:</h5>
                                        </div>
                                        <div className="totalRight">
                                            <h5>₹{total}</h5>
                                        </div>
                                </div>
                                <div className="summaryBtnDiv">

                                <button className='summaryBtn' onClick={proceedToPayment} >Proceed To Payment</button>
                                </div>
                            </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Confirmorder