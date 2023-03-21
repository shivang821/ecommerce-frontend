import { createReducer } from "@reduxjs/toolkit";


const initialState = {
    cartItems: localStorage.getItem("cartItems") ? JSON.parse(localStorage.getItem("cartItems")) : [],
    shippingInfo: localStorage.getItem("shippingInfo") ? JSON.parse(localStorage.getItem("shippingInfo")) : {}
}

export const cartReducer = createReducer(initialState, {
    ADD_TO_CART: (state, action) => {
        const item = action.payload;
        const isItemExist = state.cartItems.find((i) => i.product === item.product)
        if (isItemExist) {
            state.cartItems = state.cartItems.map((i) => {
                return i.product === isItemExist.product ? item : i;
            })
        } else {
            state.cartItems = [...state.cartItems, item]
        }

    },
    REMOVE_FROM_CART: (state, action) => {
        const id = action.payload;
        state.cartItems = state.cartItems.filter((i) => {
            return i.product !== id;
        })
    },
    SAVE_SHIPPING_INFO: (state, action) => {
        state.shippingInfo = action.payload
    }
})