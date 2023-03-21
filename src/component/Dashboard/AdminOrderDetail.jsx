import { CircularProgress, MenuItem, Select } from '@mui/material'
import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { getAdminOrders, clearErrors, updateOrder } from '../../action/orderAction'
import "./adminOrderDetail.css"
import AdminOrderCard from './AdminOrdersCard'
const AdminOrderDetail = () => {
    const { loading: updateLoading, error: updateError, isUpdated } = useSelector(state => state.updateOrder)
    const history = useNavigate()
    const { ind } = useParams()
    const { loading, orders, error } = useSelector(state => state.adminOrders)
    const dispatch = useDispatch()
    const [orderDetails, setOrderDetails] = useState("")
    const alert = useAlert()
    const [status, setStatus] = useState()

    useEffect(() => {
        if (orders && !orders[ind]) {
            history('/admin/orders', { replace: true })
        }
        if (orders && orders[ind]) {
            setOrderDetails(orders[ind]);

        }
        if(!orders){
            dispatch(getAdminOrders())
        }
        if (error) {
            alert.error(error)
            dispatch(clearErrors)
        }
        if (isUpdated) {
            alert.success("order updated successfully")
            dispatch({ type: "UPDATE_ORDER_RESET" })
        }
        if (updateError) {
            alert.error(updateError)
            dispatch({ type: "CLEAR_ERRORS" })
        }
    }, [alert, dispatch,orders, ind, error, history, isUpdated, updateError])
    const address = orderDetails ? `${orderDetails.shippingInfo.address},${orderDetails.shippingInfo.city}(${orderDetails.shippingInfo.pinCode}),${orderDetails.shippingInfo.state},${orderDetails.shippingInfo.country}` : "";
    let totalAmount = 0;
    if (orderDetails) {
        orderDetails.orderItems.forEach((item) => {
            totalAmount += item.price
        })
    }
    totalAmount = Math.floor(totalAmount + (totalAmount * 18) / 100);

    const orderProcess = ["Shipped", "Delivered"]
    const updateOrderHandler = (e) => {
        const myForm = new FormData()
        myForm.set("status", status)
        dispatch(updateOrder(orderDetails._id, myForm))
    }
    const wrogChange=()=>{
        setTimeout(() => {
            alert.error("product already delivered")    
        }, 100);
    }
    return (
        <>
            <div className="orderDetail-admin">
                {loading ? <CircularProgress /> :
                    <>
                        <div className='mainOrderDetails-admin' >

                            <div className='userShippingDetails' >
                                <div className="userShippingDiv">
                                    <h2>Shipping Details</h2>
                                    <div className="userShippingContent">
                                        <div>
                                            <div className="leftShippingDetails">
                                                <h5>Name:</h5>

                                            </div>
                                            <div className="rightShippingDetails">
                                                <h5>{orderDetails ? orderDetails.shippingInfo.name : ""}</h5>

                                            </div>
                                        </div>
                                        <div>
                                            <div className="leftShippingDetails">
                                                <h5>Phone:</h5>
                                            </div>
                                            <div className="rightShippingDetails">
                                                <h5>{orderDetails && orderDetails.shippingInfo.phoneNo}</h5>
                                            </div>

                                        </div>
                                        <div>
                                            <div className="leftShippingDetails">
                                                <h5>Address:</h5>
                                            </div>
                                            <div className="rightShippingDetails">
                                                <h5>{address}</h5>
                                            </div>

                                        </div>

                                    </div>
                                </div>
                            </div>
                            <div className='userShippingDetails' >
                                <div className="userShippingDiv">
                                    <h2>Payment</h2>
                                    <div className="userShippingContent">
                                        <div>
                                            <div className="leftShippingDetails">
                                                <h5>Status:</h5>
                                            </div>
                                            <div className="rightShippingDetails">
                                                <h5 className={orderDetails && orderDetails.paymentInfo.status === "succeeded" ? "green" : "red"} >{orderDetails ? orderDetails.paymentInfo.status === "succeeded" ? "Paid" : "Not Paid" : ""}</h5>
                                            </div>
                                        </div>
                                        <div>
                                            <div className="leftShippingDetails">
                                                <h5>Amount:</h5>
                                            </div>
                                            <div className="rightShippingDetails">
                                                <h5 >{totalAmount}</h5>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='userShippingDetails' >
                                <div className="userShippingDiv">
                                    <h2>Order Status</h2>
                                    <div className="userShippingContent">
                                        <div>
                                            <div className="leftShippingDetails">
                                                <h5 className={orderDetails && orderDetails.orderStatus === "Delivered" ? "green" : "red"} >{orderDetails && orderDetails.orderStatus}</h5>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="adminOrderItems">
                                <h2 className='itemHeading' >Items</h2>
                                {
                                    orderDetails && orderDetails.orderItems.map((item, i) => {
                                        return <AdminOrderCard product={item} key={i} />
                                    })
                                }
                            </div>

                        </div>
                        <div className="processIngOrder">
                            <div className="processOrderDiv">
                                <h2>Process Order</h2>
                                <Select
                                    defaultValue=""
                                    sx={{
                                        color: "white",
                                        width: "100%",
                                        '.MuiOutlinedInput-notchedOutline': {
                                            borderColor: "rgba(245, 245, 245, 0.651)",
                                            transition: "all .5s"
                                        },
                                        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                            borderColor: "whitesmoke"
                                        },
                                        '&:hover .MuiOutlinedInput-notchedOutline': {
                                            borderColor: "whitesmoke"
                                        },
                                        '.MuiSvgIcon-root ': {
                                            fill: "white !important",
                                        }
                                    }}
                                    displayEmpty
                                    inputProps={{ 'aria-label': 'Without label' }}
                                    onChange={(e) => {orderDetails.orderStatus==="Delivered"?wrogChange(): setStatus(e.target.value) }}
                                    value={status}
                                    
                                >
                                    <MenuItem value="" sx={{ fontFamily: "Roboto" }} className=".menuProcess" >Select  </MenuItem>
                                    {
                                        orderProcess.map((item, ind) => {
                                            return <MenuItem value={item} key={ind} >{item}</MenuItem>
                                        })
                                    }
                                </Select>
                                <button className='processBtn' disabled={orderDetails.orderStatus === "Delivered" || updateLoading} onClick={updateOrderHandler} >Process</button>
                            </div>
                        </div>
                    </>
                }
            </div>
        </>
    )
}

export default AdminOrderDetail