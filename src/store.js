import { configureStore } from '@reduxjs/toolkit'
import { forgotPasswordReducer } from './reducers/userReducer'
import { productReducer, productDetailsReducer, newReviewreducer, adminProductsreducer, newProductReducer, deleteProductReducer, updateProductReducer } from './reducers/productReducer'
import { userReducer, profileReducer } from './reducers/userReducer'
import { cartReducer } from './reducers/cartReducer'
import { adminOrdersReducer, deleteOrderReducer, myOrdersReducer, orderDetails, orderReducer, updateOrderReducer } from './reducers/orderReducer'
import thunk from 'redux-thunk'

export const Store = configureStore({
    middleware: [thunk],
    reducer: {
        product: productReducer,
        productDetails: productDetailsReducer,
        User: userReducer,
        Profile: profileReducer,
        Forgot: forgotPasswordReducer,
        Cart: cartReducer,
        newOrder: orderReducer,
        myOrders: myOrdersReducer,
        orderDetails: orderDetails,
        review: newReviewreducer,
        adminProducts: adminProductsreducer,
        newProduct: newProductReducer,
        deleteProduct: deleteProductReducer,
        adminOrders: adminOrdersReducer,
        updateProduct: updateProductReducer,
        deleteOrder: deleteOrderReducer,
        updateOrder: updateOrderReducer
    },
})