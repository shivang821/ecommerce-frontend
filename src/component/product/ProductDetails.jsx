import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { clearErrors, getProductDetails, newReview } from '../../action/productAction'
import "./productDetails.css"
import { useParams } from 'react-router-dom'
import Carousel from 'react-material-ui-carousel'
import ReactStars from 'react-rating-stars-component'
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import Review from './Review'
import { useAlert } from 'react-alert'
import MetaData from '../layout/MetaData'
import { addItemsToCart } from '../../action/cartActions'
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import { CircularProgress, Rating } from '@mui/material'
import StarIcon from '@mui/icons-material/Star';

const ProductDetails = () => {
    const { id } = useParams()
    const [quantity, setQuantity] = useState(1);
    const dispatch = useDispatch()
    const { product, loading, error } = useSelector((state) => state.productDetails)
    const alert = useAlert();
    const [open, setOpen] = useState(false)
    const [value, setValue] = useState(0);
    const [review, setReview] = useState("")
    const handleReview = () => {
        const myForm = new FormData();
        myForm.set("comment", review);
        myForm.set("rating", value);
        myForm.set("productId", id)
        dispatch(newReview(myForm))
        handleClose()
    }
    const handleClose = () => {
        setOpen(!open)
    }
    const [load, setLoad] = useState(true)
    useEffect(() => {
        if (error) {
            alert.error(error)
            dispatch(clearErrors)
        }
        dispatch(getProductDetails(id))
    }, [dispatch, id, alert, error])
    if (!loading) {
        setTimeout(() => {
            setLoad(false)
        }, 1000);
    }
    const options = {
        edit: false,
        activeColor: "tomato",
        value: product.ratings,
        color: "rgba(0,0,0,0.5)",
        isHalf: true,
        size: window.innerWidth < 600 ? 20 : 25
    }
    const increaseQuantity = () => {
        if (quantity === product.stock) {
            alert.error("Stock Unavailable")
            return
        }
        const qty = quantity + 1;
        setQuantity(qty)
    }
    const decreaseQuantity = () => {
        if (quantity <= 1) return;
        const qty = quantity - 1;
        setQuantity(qty)
    }
    const addToCartHandler = () => {
        dispatch(addItemsToCart(id, quantity));
        alert.success("Item Added To Cart")
    }
    return (
        <>
            <MetaData title={`${product.name}`} />
            <div className="ProductDetails">
                {
                    load ? <CircularProgress sx={{color:"#7a08fa"}}/> :
                        <>
                            <div className='carousel'>
                                <Carousel sx={{ width: "100%", height: "100%", position: "absolute", top: "0", left: '0' }}>
                                    {
                                        product.image && product.image.map((item, i) => {
                                            return <img key={i} src={item.url} alt={`${i} slide`} className='carouselImage' />
                                        })
                                    }
                                </Carousel>
                            </div>
                            <div>
                                <div className="detailsBlock-1">
                                    <div className="detailsBlock-11">
                                        <h2>{product.name}</h2>
                                        <p>Product # {product._id}</p>

                                    </div>
                                    <div className="detailsBlock-12">
                                        <ReactStars {...options} />
                                        <span>({product.numOfReviews} Reviews)</span>
                                    </div>
                                </div>
                                <hr style={{ borderBottom: "2px solid gray", width: "100%", marginBottom: "2rem" }} />
                                <div className="detailsBlock-3">
                                    <p>
                                        <b className={product.stock < 1 ? "redColor" : "greenColor"}>
                                            {product.stock < 1 ? "Out of Stock" : "In Stock"}
                                        </b>
                                    </p>
                                    <hr style={{ borderBottom: "2px solid gray", width: "100%" }} />
                                    <h1>₹{product.price}</h1>
                                    <div className="detailsBlock-31">
                                        <div className="detailsBlock-311">
                                            <span>Quantity:-</span><br />
                                            <button onClick={decreaseQuantity} ><RemoveIcon /></button>
                                            <input type="number" value={quantity} readOnly />
                                            <button onClick={increaseQuantity} ><AddIcon /></button>
                                        </div>
                                        <div className='detailsBlock-312'>
                                            <button onClick={handleClose} >Submit Review</button>
                                            <button onClick={addToCartHandler}>Add to Cart</button>
                                            <Dialog open={open} onClose={handleClose}>
                                                <DialogTitle>Review</DialogTitle>
                                                <DialogContent>
                                                    <div className='ratingDiv' >
                                                        <span>
                                                            <h5 style={{ fontFamily: "Gill" }} >Ratings:</h5>
                                                            <Rating value={value}
                                                                emptyIcon={<StarIcon style={{ opacity: 1 }} fontSize="inherit" />}
                                                                name="simple-controlled"
                                                                sx={{
                                                                    ".MuiRating-iconEmpty": {
                                                                        color: "rgba(239,239,239,.7)"
                                                                    }
                                                                }} onChange={(e, val) => { setValue(val) }} />
                                                        </span>
                                                    </div>
                                                    <textarea onChange={(e) => { setReview(e.target.value) }} autoFocus placeholder='Write Your Review' className='textArea' style={{ backgroundColor: "#2c2c2c", border: "none", color: "whitesmoke" }} cols="40" rows="10"></textarea>
                                                </DialogContent>
                                                <DialogActions>
                                                    <Button sx={{ color: "#7a09fa" }} onClick={handleClose}>Cancel</Button>
                                                    <Button sx={{ color: "#7a09fa" }} onClick={handleReview}>Submit</Button>
                                                </DialogActions>
                                            </Dialog>
                                        </div>
                                    </div>
                                </div>
                                <div className="detailsBlock-4">
                                    <span>
                                        Descriprion: <p style={{color:"#1c1c1c",fontFamily:"Roboto",fontSize:"1rem"}} >{product.desc}</p>
                                    </span>
                                </div>
                            </div>
                        </>
                }
            </div>
            <div className={product.reviews && product.reviews[0] ? "reviewContainer" : "notReview"}>
                <h1>Reviews</h1>
                {product.reviews && product.reviews[0] ?
                    <div className={product.reviews && product.reviews[0] ? "reviews" : ""}>
                        {product.reviews && product.reviews.map((item, i) => {
                            return <Review key={i} review={item} />
                        })}
                    </div>
                    : <p>No Reviews Yet</p>
                }
            </div>
        </>
    )
}

export default ProductDetails