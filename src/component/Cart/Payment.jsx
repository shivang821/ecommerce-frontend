import React, { useEffect, useRef } from 'react'
import StepperComponent from '../Shipping/StepperComponent'
import { useDispatch, useSelector } from 'react-redux'
import { useAlert } from 'react-alert'
import MetaData from '../layout/MetaData'
import { CardNumberElement, CardCvcElement, CardExpiryElement, useStripe, useElements } from '@stripe/react-stripe-js'
import CreditCardOutlinedIcon from '@mui/icons-material/CreditCardOutlined';
import VpnKeyOutlinedIcon from '@mui/icons-material/VpnKeyOutlined';
import EventOutlinedIcon from '@mui/icons-material/EventOutlined';
import './payment.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { clearErrors, createOrder } from '../../action/orderAction'
const Payment = () => {
    const history = useNavigate()
    const payBtn = useRef(null)
    const orderInfo = JSON.parse(sessionStorage.getItem('orderInfo'))
    const elements = useElements()
    const stripe = useStripe()
    const alert = useAlert()
    const dispatch = useDispatch()
    const { user } = useSelector(state => state.User);
    let { shippingInfo, cartItems } = useSelector(state => state.Cart)
    const { error } = useSelector(state => state.newOrder)
    const paymentData = {
        amount: Math.round(orderInfo.total * 100)
    }
    let {name,...rest}=shippingInfo
    name=user.name;
    shippingInfo={name,...rest}
    const order = {
        shippingInfo,
        orderItems: cartItems,
        itemsPrice: orderInfo.subtotal, taxPrice: orderInfo.tax,
        shippingPrice: orderInfo.shippingCharges,
        totalPrice: orderInfo.total
    }
    const submitHandler = async (e) => {
        e.preventDefault();
        payBtn.current.disabled = true;
        try {
            const config = {
                headers: {
                    "Content-Type": "application/json"
                },
            }
            const { data } = await axios.post('/payment/process', paymentData, config)
            const client_secret = data.client_secret;
            if (!stripe || !elements) return;
            const result =await stripe.confirmCardPayment(client_secret, {
                payment_method: {
                    card: elements.getElement(CardNumberElement),
                    billing_details: {
                        name: user.name,
                        email: user.email,
                        address: {
                            line1: shippingInfo.address,
                            city: shippingInfo.city,
                            state: shippingInfo.state,
                            postal_code: shippingInfo.pinCode,
                            country: shippingInfo.country
                        }
                    }

                }
            })
            if (result.error) {
                payBtn.current.disabled = false
                alert.error(result.error.message)
            }
            else {
                if ((await result).paymentIntent.status === "succeeded") {
                    order.paymentInfo={
                        id:result.paymentIntent.id,
                        status:result.paymentIntent.status
                    }
                    dispatch(createOrder(order))
                    history('/success', { replace: true })
                }
                else {
                    alert.error("There is Some issue while processing payment")
                }
            }
        } catch (error) {
            payBtn.current.disabled = false;
            alert.error(error.response.data.message)
        }
    }
    useEffect(() => {
        if (error) {
            alert.error(error)
            dispatch(clearErrors())
        }
    }, [dispatch, error, alert])
    return (

        <>
            <div className="paymentContainer">
                <MetaData title="Payment" />
                <StepperComponent activeState={2} />
                <div className="payment">
                    <div className="paymentFormDiv" >

                        <form onSubmit={submitHandler} className='paymentForm' >
                            <div className="paymentDetailsHeading">
                                <h2>Payment details</h2>
                            </div>
                            <div>
                                <CreditCardOutlinedIcon />
                                <CardNumberElement className='paymentInput' />
                            </div>
                            <div>
                                <EventOutlinedIcon />
                                <CardExpiryElement className='paymentInput' />
                            </div>
                            <div>
                                <VpnKeyOutlinedIcon />
                                <CardCvcElement className='paymentInput' />
                            </div>
                            <div className='btnDiv'>
                                <button ref={payBtn} type='submit' >Pay {orderInfo && orderInfo.total.toFixed(2)}</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Payment