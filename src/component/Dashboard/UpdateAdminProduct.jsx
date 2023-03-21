import React, { useEffect, useState } from 'react'
import './newProduct.css'
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import AttachMoneyOutlinedIcon from '@mui/icons-material/AttachMoneyOutlined';
import DescriptionIcon from '@mui/icons-material/Description';
import CategoryIcon from '@mui/icons-material/Category';
import SpellcheckIcon from '@mui/icons-material/Spellcheck';
import StorageIcon from '@mui/icons-material/Storage';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { Button, CircularProgress } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useAlert } from 'react-alert'
import { clearErrors, getProductDetails, updateProduct } from '../../action/productAction';
import { useNavigate, useParams } from 'react-router-dom';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
const UpdateAdminProduct = () => {
    const history = useNavigate()
    const dispatch = useDispatch()
    const { id } = useParams()
    const { product, success: productSuccess, loading: productLoading } = useSelector(state => state.productDetails)
    const alert = useAlert()
    const { loading, success, error, isUpdated } = useSelector(state => state.updateProduct)
    const [name, setName] = useState("")
    const [stock, setStock] = useState("")
    const [price, setPrice] = useState("")
    const [desc, setDesc] = useState("")
    const [category, setCategory] = useState(" ")
    const [images, setImages] = useState([])
    const [imagesPreview, setImagesPreview] = useState([])
    const [oldImages, setOldImages] = useState([]);
    const categories = ["Fashion", "Mobiles", "Electronics", "Grocery"]
    const [removeImagesId, setRemoveImagesId] = useState([])
    useEffect(() => {
        if (product) {
            if (product._id !== id && !productLoading) {
                dispatch(getProductDetails(id))
            }
            else {
                // if (productSuccess) {
                setName(product.name)
                setDesc(product.desc)
                setPrice(product.price)
                setStock(product.stock)
                setCategory(product.category)
                setOldImages(product.image)
                // }   
            }
        }

        if (error) {
            alert.error(error)
            dispatch(clearErrors)
        }
        if (productSuccess) {
            dispatch({ type: "PRODUCT_DETAILS_RESET" })
        }
        if (isUpdated) {
            setTimeout(() => {
                alert.success("Product Updated Successfully")
            }, 100);
            history("/admin/dashboard")
            dispatch({ type: "UPDATE_PRODUCT_RESET" })
        }
    }, [dispatch, alert, error, success, history, id, product, isUpdated, productSuccess, productLoading, oldImages])

    const createProductImagesChange = (e) => {
        const files = Array.from(e.target.files)
        files.forEach((file) => {
            const reader = new FileReader()
            reader.onload = () => {
                if (reader.readyState === 2) {
                    setImages((old) => [...old, reader.result])
                    setImagesPreview((old) => [...old, reader.result])
                }
            }
            reader.readAsDataURL(file)
        })
    }
    const createProductSubmitHandler = (e) => {
        e.preventDefault()
        const myForm = new FormData()
        myForm.set("name", name)
        myForm.set("stock", stock)
        myForm.set("price", price)
        myForm.set("category", category)
        myForm.set("desc", desc)
        images.forEach((image) => {
            myForm.append("image", image)
        })
        removeImagesId.forEach((image) => {
            myForm.append("oldImages", image)
        })
        dispatch(updateProduct(id, myForm))
    }
    const removeImage = (ind) => {
        const imags = images.filter((item, index) => {
            return index !== ind && item
        })
        setImages(imags)
        setImagesPreview(imags)
    }

    function removeOldImages(id) {
        const oldImg = oldImages.filter((item) => {
            if (item.public_id === id) {
                setRemoveImagesId([...removeImagesId, id])
            }
            return item.public_id !== id;
        })
        setOldImages(oldImg)
    }
    return (

        <div className="newProductDiv">
            <div className="newProductDiv-1">
                {!productLoading ?

                    <form className='createProductForm' onSubmit={createProductSubmitHandler} encType='multipart/form-data'>
                        <h1>Update Product</h1>
                        <div>
                            <SpellcheckIcon />
                            <input type="text" placeholder='Product Name' required value={name} onChange={(e) => { setName(e.target.value) }} />
                        </div>
                        <div>
                            <DescriptionIcon />
                            <input type="text" placeholder='Product Description' required
                                value={desc} onChange={(e) => { setDesc(e.target.value) }} />
                        </div>
                        <div>
                            <CategoryIcon />
                            <Select defaultValue=""
                                sx={{
                                    color: "white",
                                    width: "100%",
                                    '.MuiOutlinedInput-notchedOutline': {
                                        border: "none",
                                    },
                                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                        border: "none"
                                    },
                                    '&:hover .MuiOutlinedInput-notchedOutline': {
                                        border: 'none'
                                    },
                                    '.MuiSvgIcon-root ': {
                                        fill: "white !important",
                                    }
                                }}
                                displayEmpty
                                inputProps={{ 'aria-label': 'Without label' }}
                                onChange={(e) => { setCategory(e.target.value) }}
                                value={category?category:" "}
                            >
                                {categories.map((item, ind) => {
                                    return <MenuItem value={item} key={ind}>{item}</MenuItem>
                                })}
                            </Select>
                        </div>
                        <div>
                            <StorageIcon />
                            <input type="number" placeholder='Stock' required value={stock} onChange={(e) => { setStock(e.target.value) }} />
                        </div>
                        <div>
                            < AttachMoneyOutlinedIcon />
                            <input type="number" placeholder='Price' required value={price} onChange={(e) => { setPrice(e.target.value) }} />
                        </div>

                        <div id='createProductFormFile'>
                            <CloudUploadIcon />
                            <label htmlFor="productImage">Upload Product Images</label>
                            <input type="file" style={{ visibility: "hidden" }} id='productImage' placeholder='Select Images' accept='images/*' multiple
                                onChange={(e) => { createProductImagesChange(e); }} />
                        </div>
                        <Button id='createProductBtn' type='submit' disabled={loading ? true : false}>{loading ? <CircularProgress sx={{ color: "whitesmoke", height: "2rem", width: "2rem" }} /> : "Update"}</Button>
                    </form>
                    : <CircularProgress />
                }
            </div>
            {
                product && imagesPreview.length > 0 && <div className="createProductFromImage">
                    <div className="createProductFromImage-1">

                        {
                            imagesPreview.map((image, ind) => {
                                return <div className="selectProductImage">
                                    <CloseOutlinedIcon onClick={(e) => { removeImage(ind) }} />
                                    <img src={image} key={ind} alt="Avatar preview" />
                                </div>
                            })
                        }


                    </div>
                </div>
            }
            {oldImages && oldImages.length > 0 ? <div className="createProductFromImage">

                <div className="createProductFromImage-1">
                    {
                        oldImages && oldImages.map((image, ind) => {
                            return <div className="selectProductImage">
                                <CloseOutlinedIcon onClick={(e) => { removeOldImages(image.public_id) }} />
                                <img src={image.url} key={ind} alt="Avatar preview" />
                            </div>
                        })
                    }
                </div>
            </div> : undefined}
        </div>
    )
}

export default UpdateAdminProduct