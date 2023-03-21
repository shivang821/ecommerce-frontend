import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import "./Cart.css"
import CartItemCard from './CartItemCard'
import RemoveShoppingCartOutlinedIcon from '@mui/icons-material/RemoveShoppingCartOutlined';
import {useAlert} from 'react-alert'
const Cart = () => {
    const alert =useAlert()
    const history = useNavigate()
    const { cartItems } = useSelector(state => state.Cart);

    let totalPrice = 0;
    let totalItems = 0;
    cartItems.map((item) => {
        totalItems += item.quantity;
        return totalPrice += (item.quantity * item.price)
    })
    const handleShipping = () => {
        if(cartItems.length===0)return alert.error("Please Select Atleast One Item")
        history('/auth?redirect=shipping')
    }
    const handleClick=()=>{
        history('/products')
    }
    return (
        <>
            <div className="container">
                <div className="productConatiner">
                    <div className="productHeader">
                        <h4>Product</h4>
                        <h4>Quntity</h4>
                        <h4>Price</h4>
                    </div>
                    <div className={cartItems.length === 0 ? "emptyCart" : "items"}>
                        {
                            cartItems.map((item, i) => {
                                return <CartItemCard key={i} product={item} />
                            })
                        }
                        {cartItems.length === 0 && <>
                            <RemoveShoppingCartOutlinedIcon />
                            <h1 >Your Cart Is Empty</h1>
                            <button onClick={handleClick}>View Products</button>
                        </>
                        }

                    </div>

                </div>
                <div className="subTotalConatiner">
                    <div className="subTotal">
                        <div className="totalNumerOfItems">
                            <div className='left'>
                                <h4 >Items :-</h4>

                            </div>
                            <div className='right' >
                                <h4 >{totalItems}</h4>

                            </div>
                        </div>
                        <div className="totalPrice">
                            <div className='left'>
                                <h4 >Total Price :-</h4>

                            </div>
                            <div className='right'>
                                <h4 >₹{totalPrice}.00</h4>
                            </div>
                        </div>
                        <hr />
                        <button onClick={handleShipping} className='payButton' >Check Out</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Cart