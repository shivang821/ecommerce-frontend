import axios from 'axios'


export const getProduct = ({ keyword = "", page = 1, price = [0, 500000], category = "", ratings = 0 }) => async(dispatch) => {
    try {
        if (ratings == null) ratings = 0;
        dispatch({ type: "ALL_PRODUCTS_REQUEST" })
        let link = `/products/?keyword=${keyword}&page=${page}&price[gte]=${price[0]}&price[lte]=${price[1]}&ratings[gte]=${ratings}`
        if (category) {
            link = `/products/?keyword=${keyword}&page=${page}&price[gte]=${price[0]}&price[lte]=${price[1]}&category=${category}&ratings[gte]=${ratings}`
        }
        const { data } = await axios.get(link)

        dispatch({ type: "ALL_PRODUCTS_SUCCESS", payload: data })
    } catch (error) {
        dispatch({
            type: "ALL_PRODUCTS_FAIL",
            payload: error.response.data.message
        })
    }
}

// clearing error

export const clearErrors = (dispatch) => {
    dispatch({ type: "CLEAR_ERROR" })
}

// get product details

export const getProductDetails = (id) => async(dispatch) => {
    try {
        dispatch({ type: "PRODUCT_DETAILS_REQUEST" })
        const { data } = await axios.get(`/products/${id}`)
        dispatch({ type: "PRODUCT_DETAILS_SUCCESS", payload: data })
    } catch (error) {
        dispatch({
            type: "PRODUCT_DETAILS_FAIL",
            payload: error.response.data.message
        })
    }
}

export const newReview = (reviewData) => async(dispatch) => {
    try {

        dispatch({ type: "NEW_REVIEW_REQUEST" })
        const config = {
            headers: {
                "Content-Type": "application/json"
            }
        }
        const { data } = await axios.post('/review', reviewData, config)

        dispatch({ type: "New_REVIEW_SUCCESS", payload: data.success })
    } catch (error) {
        dispatch({ type: "NEW_REVIEW_FAIL", payload: error.response.data.message })
    }
}
export const adminProductsAction = () => async(dispatch) => {
    try {
        dispatch({ type: "ADMIN_PRODUCTS_REQUEST" });
        const { data } = await axios.get('/admin/products');
        dispatch({ type: "ADMIN_PRODUCTS_SUCCESS", payload: data.products })
    } catch (error) {
        dispatch({ type: "ADMIN_PRODUCTS_FAIL", payload: error.response.data.message })
    }
}

export const newProductAction = (productData) => async(dispatch) => {
    try {
        dispatch({ type: "NEW_PRODUCT_REQUEST" })
        const config = { headers: { "Content-Type": "multipart/form-data" } };
        const { data } = await axios.post('/admin/products/new', productData, config)
        dispatch({ type: "NEW_PRODUCT_SUCCESS", payload: data })
    } catch (error) {
        dispatch({ type: "NEW_PRODUCT_FAIL", payload: error.response.data.message })
    }
}

export const deleteProductAction = (id) => async(dispatch) => {
    try {
        dispatch({ type: "DELETE_PRODUCT_REQUEST" })
        const { data } = await axios.delete(`/admin/products/${id}`)
        dispatch({ type: "DELETE_PRODUCT_SUCCESS", payload: data })
    } catch (error) {

        dispatch({ type: "DELETE_PRODUCT_FAIL", payload: error.response.data.message })
    }
}
export const updateProduct = (id, productData) => async(dispatch) => {
    try {

        dispatch({ type: "UPDATE_PRODUCT_REQUEST" })
        const config = { headers: { "Content-Type": "multipart/form-data" } };
        const { data } = await axios.patch(`/admin/products/${id}`, productData, config)
        dispatch({ type: "UPDATE_PRODUCT_SUCCESS", payload: data.success })
    } catch (error) {
        dispatch({ type: "UPDATE_PRODUCT_FAIL", payload: error.response.data.message })
    }
}