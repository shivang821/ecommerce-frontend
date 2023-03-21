import React from 'react'
import { Link } from 'react-router-dom'
import ReactStars from "react-rating-stars-component"
import "./product.css"
function Product({products}) {
  const options={
    edit:false,
    color:"whitesmoke",
    activeColor:"tomato",
    value:products.ratings,
    backgroundColor:"white",
    isHalf:true,
    size:window.innerWidth<600?20:25
  }
  return (
    <Link className='productCard' to={`/products/${products._id}`} >
        <img src={products.image[0].url} alt={products.name} />
        <p>{products.name}</p>
        <div>
            <ReactStars {...options} /><span>{`reviews:${products.numOfReviews}`}</span>
        </div>
        <span>{`₹ ${products.price}`}</span>
    </Link>
  )
}

export default Product