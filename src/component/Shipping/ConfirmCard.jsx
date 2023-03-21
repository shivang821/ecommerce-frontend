import React from 'react'
import './confirmCard.css'
import {NavLink} from 'react-router-dom'
import CloseIcon from '@mui/icons-material/Close';
const ConfirmCard = ({product}) => {
    const totalPrice=product.quantity*product.price;
  return (
    <>
    <div className="confirmCard">
        <div className="confirmOrderImg">
            <img src={product.image} alt="" />
        </div>
        <div className="confirmProductDetails">
            <div className="name">
            <p><NavLink to={`/products/${product.product}`} >{product.name}</NavLink></p>

            </div>
            <div className="price">

            <p>₹{totalPrice}({product.quantity}<CloseIcon/>{product.price})</p>
            </div>
        </div>
    </div>
    </>
  )
}

export default ConfirmCard