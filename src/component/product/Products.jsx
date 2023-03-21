import React, { useEffect, useState } from 'react'
import "./AllProducts.css"
import { getProduct, clearErrors } from '../../action/productAction'
import { useDispatch, useSelector } from 'react-redux'
import ProductCard from './ProductCard'
import { useSearchParams } from 'react-router-dom'
import Pagination from '@mui/material/Pagination';
import Typography from '@mui/material/Typography';
import Slider from '@mui/material/Slider';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Rating from '@mui/material/Rating';
import StarIcon from '@mui/icons-material/Star';
import MetaData from '../layout/MetaData'
import { CircularProgress } from '@mui/material'
const Products = () => {
  const [category, setCategory] = useState("")
  const [page, setPage] = useState(1);
  const [searchParams] = useSearchParams()
  const keyword = searchParams.get("keyword") ? searchParams.get("keyword") : ""
  const dispatch = useDispatch()
  const { product, loading, error, resultPerPage, filteredProductsCount } = useSelector((state) => state.product)
  const [price, setPrice] = useState([0, 500000]);
  const [ratings, setRatings] = useState(0)
  const [load, setLoad] = useState(true)
  if (!loading) {
    setTimeout(() => {
      setLoad(false)
    }, 1000);
  }
  const handleChange = (e, p) => {
    setPage(p);
    setLoad(true)
  }
  const priceHandler = (e, newPrice) => {
    setLoad(true)
    setPrice(newPrice); setPage(1)
  }
  let pageCount = Math.ceil(filteredProductsCount / resultPerPage)
  useEffect(() => {
    if (error) {
      alert.error(error)
      dispatch(clearErrors)
    }
    setTimeout(() => {
      dispatch(getProduct({ keyword, page, price, category, ratings }))

    }, 1000)
  }, [dispatch, keyword, page, price, error, category, ratings]);
  const marks = [
    {
      value: 0,
      label: 0
    },
    {
      value: 25000,
      label: 25000
    },
    {
      value: 50000,
      label: 50000
    },
    {
      value: 75000,
      label: 75000
    },
    {
      value: 100000,
      label: 100000
    },
    {
      value: 125000,
      label: 125000
    },
    {
      value: 150000,
      label: 150000
    },
    {
      value: 175000,
      label: 175000
    },
    {
      value: 200000,
      label: 200000
    },
  ]

  return (
    <>
      <MetaData title="Products" />
      <div className="productsHeading">
        <h2>Products</h2>
      </div>
      <div className='filterText'>
        <p>Filters:</p>
      </div>
      <div className="filterBox">

        <div className="priceSlider">
          <Typography>Price</Typography>
          <Slider
            aria-label="Restricted values"
            value={price}
            onChange={priceHandler}
            valueLabelDisplay="auto"
            step={null}
            min={0}
            max={200000}
            marks={marks}
            defaultValue={0}
          />

        </div>
        <div className="ranting">
          <Typography component="legend">Ratings:</Typography>
          <Rating
            sx={{
              ".MuiRating-iconEmpty": {
                color: "rgba(239,239,239,.7)"
              }
            }}
            emptyIcon={<StarIcon style={{ opacity: 1 }} fontSize="inherit" />}
            name="simple-controlled"
            value={ratings}
            onChange={(event, newValue) => {
              setRatings(newValue);
              setLoad(true);
              setPage(1)
            }}
          />

        </div>
        <div className="filter">
          <Select
            sx={{
              color: "white",
              width: "100%",
              '.MuiOutlinedInput-notchedOutline': {
                borderColor: 'rgba(228, 219, 233, 0.25)',
              },
              '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                borderColor: 'rgba(228, 219, 233, 0.25)',
              },
              '&:hover .MuiOutlinedInput-notchedOutline': {
                borderColor: 'rgba(228, 219, 233, 0.25)',
              },
              '.MuiSvgIcon-root ': {
                fill: "white !important",
              }
            }}
            value={category}
            onChange={(e) => { setCategory(e.target.value); setLoad(true); setPage(1) }}
            displayEmpty
            inputProps={{ 'aria-label': 'Without label' }}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value="Fashion">Fashion</MenuItem>
            <MenuItem value="Mobiles">Mobiles</MenuItem>
            <MenuItem value="Electronics">Electronics</MenuItem>
            <MenuItem value="Grocery">Grocery</MenuItem>
          </Select>
        </div>
      </div>
      <div className="products" id='container'>
        {load ? <CircularProgress sx={{ color: "#7a08fa" }} /> :
          product && product.length > 0 ? product.map((item, ind) => {
            return <ProductCard key={ind} products={item} />
          }) : <h3 style={{ color: "white" }}>No Products Found</h3>
        }
      </div>

      <div className="paginationBox">
        {
          product && <Pagination count={pageCount} defaultPage={page} color="primary" onChange={handleChange} />
        }

      </div>
    </>
  )
}

export default Products