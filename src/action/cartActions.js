import axios from "axios";


export const addItemsToCart = (id, quantity) => async(dispatch, getState) => {
    const { data } = await axios.get(`/products/${id}`)
    dispatch({ type: "ADD_TO_CART", payload: { product: data.product._id, name: data.product.name, price: data.product.price, image: data.product.image[0].url, stock: data.product.stock, quantity, seller: data.product.user } });
    localStorage.setItem("cartItems", JSON.stringify(getState().Cart.cartItems))
}

export const removeFromCart = (id) => async(dispatch, getState) => {
    dispatch({ type: "REMOVE_FROM_CART", payload: id })
    localStorage.setItem("cartItems", JSON.stringify(getState().Cart.cartItems))
}

export const saveShippingInfo = (data) => async(dispatch) => {
    dispatch({ type: "SAVE_SHIPPING_INFO", payload: data })
    localStorage.setItem("shippingInfo", JSON.stringify(data))
}