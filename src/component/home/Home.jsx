import React, { useEffect, useState } from 'react'
import { clearErrors, getProduct } from '../../action/productAction';
import { CgMouse } from "react-icons/cg";
import ProductCard from '../product/ProductCard';
import MetaData from '../layout/MetaData';
import { useDispatch, useSelector } from 'react-redux'
import "./Home.css"
import { useAlert } from 'react-alert';
import { CircularProgress } from '@mui/material';
function Home() {
    const [load,setLoad]=useState(true)
    const alert = useAlert();
    const { product, loading, error } = useSelector((state) => state.product)
    const dispatch = useDispatch()
    useEffect(() => {
        if (error) {
            alert.error(error)
            dispatch(clearErrors)
        }
        dispatch(getProduct(""))
    }, [dispatch, error, alert])
    if(!loading){
        setTimeout(() => {
            setLoad(false)
        }, 2000);
    }
    return (
        <>
            <>
                <MetaData title="Ecommerce" />
                <div className='banner '>
                    <p>Welcome to Ecommerce</p>
                    <h1 className='home-heading'>FIND AMAZING PRODUCTS BELOW</h1>
                    <a href="#container">
                        <button>scroll <CgMouse /></button>
                    </a>
                </div>
                <div className="homeHeading">
                    <h2>Featured Product</h2>
                </div>
                <div className="main-container" id='container'> 
                    {
                        load ? <CircularProgress sx={{color:"#7a08fa"}} /> :
                            product && product.map((item, ind) => {
                                return <ProductCard key={ind} products={item} />
                            })
                    }
                </div>
            </>
        </>

    )
}

export default Home