import axios from "axios";


export const createOrder = (order) => async(dispatch, getState) => {
    try {
        dispatch({ type: "CREATE_ORDER_REQUEST" });
        const config = {
            headers: {
                "Content-Type": "application/json"
            }
        }
        const { data } = await axios.post('/order/new', order, config)
        dispatch({ type: "CREATE_ORDER_SUCCESS", payload: data.order })
    } catch (error) {
        dispatch({ type: "CREATE_ORDER_FAIL", payload: error.response.data.message })
    }
}
export const myOrders = () => async(dispatch, getState) => {
    try {
        dispatch({ type: "MY_ORDERS_REQUEST" });

        const { data } = await axios.get('/orders/me')
        dispatch({ type: "MY_ORDERS_SUCCESS", payload: data.orders })
    } catch (error) {
        dispatch({ type: "MY_ORDERS_FAIL", payload: error.response.data.message })
    }
}

export const getOrderDetails = (id, pid) => async(dispatch) => {
    try {
        dispatch({ type: "ORDER_DETAILS_REQUEST" })
        const { data } = await axios.get(`/order/${id}`)
        data.order.orderItems = data.order.orderItems.filter((item) => {
            return item._id === pid
        })
        dispatch({ type: "ORDER_DETAILS_SUCCESS", payload: data.order })
    } catch (error) {
        dispatch({
            type: "ORDER_DETAILS_FAIL",
            payload: error.response.data.message
        })
    }
}

export const clearErrors = (dispatch) => {
    dispatch({ type: "CLEAR_ERROR" })
}

export const getAdminOrders = () => async(dispatch) => {
    try {
        dispatch({ type: "ADMIN_ORDERS_REQUEST" })
        const { data } = await axios.get('/admin/orders')
        dispatch({ type: "ADMIN_ORDERS_SUCCESS", payload: data })

    } catch (error) {
        dispatch({ type: "ADMIN_ORDERS_FAIL", payload: error.response.data.message })
    }
}

export const deleteOrder = (id) => async(dispatch) => {
    try {
        dispatch({ type: "DELETE_ORDER_REQUEST" })
        const { data } = await axios.delete(`/admin/order/${id}`)
        dispatch({ type: "DELETE_ORDER_SUCCESS", payload: data.success })
    } catch (error) {
        dispatch({ type: "DELETE_ORDER_FAIL", payload: error.response.data.message })
    }
}

export const updateOrder = (id, updatedData) => async(dispatch) => {
    try {
        dispatch({ type: "UPDATE_ORDER_REQUEST" })
        const config = {
            headers: {
                "Content-Type": "application/json"
            }
        }
        const { data } = await axios.patch(`/admin/order/${id}`, updatedData, config)
        dispatch({ type: "UPDATE_ORDER_SUCCESS", payload: data.success })
    } catch (error) {
        dispatch({ type: "UPDATE_ORDER_FAIL", payload: error.response.data.message })
    }
}