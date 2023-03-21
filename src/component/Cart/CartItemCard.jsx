import React,{useState} from 'react'
import { NavLink } from 'react-router-dom'
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import Tooltip from '@mui/material/Tooltip';
import './productCard.css'
import { removeFromCart,addItemsToCart } from '../../action/cartActions';
import { useDispatch } from 'react-redux';
import { useAlert } from 'react-alert';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
const CartItemCard = ({ product }) => {
    const alert = useAlert()
    const dispatch = useDispatch()
    const [quantity, setQuantity] = useState(product.quantity);
    const handleRemove = () => {
        dispatch(removeFromCart(product.product))
    }
    const increaseQuantity=()=>{
        // if(product.stock<=quantity)return
        if(quantity===product.stock){
            alert.error("Stock Unavailable")
            return
        }
        const qty=quantity+1;
        setQuantity(qty)
        dispatch(addItemsToCart(product.product,qty))
    }
    const decreaseQuantity=()=>{
        if(quantity<=1)return;
        const qty=quantity-1;
        setQuantity(qty)
        dispatch(addItemsToCart(product.product,qty))
    }

    return (
        <>
            <div className="itemCard">
                <div className="productDetails">
                    <div className="itemImage">
                        <img src={product.image} alt="" />
                    </div>
                    <div className="itemDetails ">
                        <div className="nameDesc">
                            <NavLink to={`/products/${product.product}`}><p>{product.name} - {product.desc}</p></NavLink>
                        </div>
                        <div className="stock">
                            {product.stock > 0 ? <p className='green' >In Stock</p> : <p className='red' >Out Of Stock</p>}

                        </div>
                    </div>

                </div>
                <div className="quantitySection">
                    {/* <h5>{product.quantity}</h5> */}
                    <button onClick={decreaseQuantity} ><RemoveIcon /></button>
                    <input type="number" value={quantity} readOnly />
                    <button onClick={increaseQuantity} ><AddIcon /></button>
                </div>
                <div className="priceSection">
                    {/* <DeleteOutlinedIcon/> */}
                    <Tooltip placement="top-start" title="Remove">
                        <DeleteOutlinedIcon onClick={handleRemove} />
                    </Tooltip>
                    <h5>₹{product.price}.00</h5>
                </div>
            </div>
        </>
    )
}

export default CartItemCard