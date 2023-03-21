import React from 'react'
import './adminOrderCard.css'
import {NavLink} from 'react-router-dom'
import CloseIcon from '@mui/icons-material/Close';
const AdminOrderCard = ({product}) => {
    const totalPrice=product.quantity*product.price;
  return (
    <>
    <div className="adminOrderCard">
        <div className="adminOrderImg">
            <img src={product.image} alt="" />
        </div>
        <div className="adminOrderProductDetails">
            <div className="name">
            <p><NavLink to={`/products/${product.product}`} >{product.name}</NavLink></p>
            </div>
            <div className="price">
            <p>Qty: {product.quantity}</p>
            </div>
            <div className="price">
            <p>₹{totalPrice}({product.quantity}<CloseIcon/>{product.price})</p>
            </div>
        </div>
    </div>
    </>
  )
}

export default AdminOrderCard