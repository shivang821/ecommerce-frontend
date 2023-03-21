import React, { useEffect } from 'react'
import { useAlert } from 'react-alert';
import { useDispatch, useSelector } from 'react-redux';
import { myOrders } from '../../action/orderAction';
import './myOrders.css'
import Progress from '../layout/MuiLoader/Progress';
import MyOrderCard from './MyOrderCard';
const MyOrders = () => {
  const dispatch = useDispatch()
  const { orders, loading, error } = useSelector(state => state.myOrders)
  const alert = useAlert()
  useEffect(() => {
    dispatch(myOrders())
    if (error) {
      alert.error(error)
    }
  }, [dispatch, error, alert])
  return (
    <>
      {loading ? <Progress /> :
        <div className="myOrderContainer">
          <h1 className="myOrdersHeading">Orders</h1>
          {orders.map((item,ind)=>{
            return <MyOrderCard order={item} key={ind} /> 
          })}
          
        </div>
      }
    </>
  )
}

export default MyOrders