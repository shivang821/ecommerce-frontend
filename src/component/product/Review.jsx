import React from 'react'
import Avatar from '@mui/material/Avatar';
import ReactStars from 'react-rating-stars-component'

const Review = ({review}) => {
  const options = {
    edit: false,
    color: "rgba(0,0,0,0.5)",
    activeColor: "tomato",
    value: review.rating,
    isHalf: true,
    size: window.innerWidth < 600 ? 20 : 25
}
  return (
    <div className='reviewDiv'>
      <div className="reviewUpper">
        <Avatar src={review.avatar} className='userAvt' style={{height:"5rem",width:"5rem"}}/>
        <div className="nameRating">
          <h1>{review.name}</h1>
          <ReactStars {...options}/>
        </div>
      </div>
      <div className="lowerReview">
          <p>{review.comment}</p>
      </div>
    </div>
  )
}

export default Review