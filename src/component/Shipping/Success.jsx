import { Typography } from '@mui/material';
import './success.css'
import React from 'react'
import CheckCircleOutlineOutlinedIcon from '@mui/icons-material/CheckCircleOutlineOutlined';
import { NavLink } from 'react-router-dom';
const Success = () => {
  return (
    <>
    <div className="successContainer">
        <CheckCircleOutlineOutlinedIcon/>
        <Typography>Order Placed Successfully</Typography>
        <button className='successBtn' ><NavLink to='/orders/me' >View Orders</NavLink></button>
    </div>
    </>

  )
}

export default Success