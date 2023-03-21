import { createReducer } from "@reduxjs/toolkit";

const orderState = {
    order: null,
    loading: false,
    error: null
}
export const orderReducer = createReducer(orderState, {
    CREATE_ORDER_REQUEST: (state, action) => {
        state.loading = true;
    },
    CREATE_ORDER_SUCCESS: (state, action) => {
        state.order = action.payload;
        state.loading = false;
    },
    CREATE_ORDER_FAIL: (state, action) => {
        state.loading = true;
        state.error = action.payload
    },
    CLEAR_ERRORS: (state, action) => {
        state.error = null
    }
})

const myOrdersState = {
    orders: [],
    loading: false,
    error: null
}

export const myOrdersReducer = createReducer(myOrdersState, {
    MY_ORDERS_REQUEST: (state, action) => {
        state.loading = true;
    },
    MY_ORDERS_SUCCESS: (state, action) => {
        state.orders = action.payload;
        state.loading = false;
    },
    MY_ORDERS_FAIL: (state, action) => {
        state.loading = true;
        state.error = action.payload
    },
    CLEAR_ERRORS: (state, action) => {
        state.error = null
    }
})

const orderDetailState = {
    order: null,
    error: null,
    loading: true
}
export const orderDetails = createReducer(orderDetailState, {
    ORDER_DETAILS_REQUEST: (state, action) => {
        state.loading = true;
    },
    ORDER_DETAILS_SUCCESS: (state, action) => {
        state.loading = false;
        state.order = action.payload
    },
    ORDER_DETAILS_FAIL: (state, action) => {
        state.loading = true;
        state.error = action.payload;
    },
    CLEAR_ERRORS: (state) => {
        state.error = null
    }
})

const adminOrderState = {
    loading: false,
    error: null,
    totalAmount: null,
    orders: null
}
export const adminOrdersReducer = createReducer(adminOrderState, {
    ADMIN_ORDERS_REQUEST: (state) => {
        state.loading = true
    },
    ADMIN_ORDERS_SUCCESS: (state, action) => {
        state.orders = action.payload.orders;
        state.totalAmount = action.payload.totalAmount
        state.loading = false;
    },
    ADMIN_ORDERS_FAIL: (state, action) => {
        state.loading = false;
        state.error = action.payload
    },
    CLEAR_ERRORS: (state) => {
        state.error = null
    }
})

const orderDeleteState = {
    loading: false,
    error: null,
    isDeleted: false
}
export const deleteOrderReducer = createReducer(orderDeleteState, {
    DELETE_ORDER_REQUEST: (state) => {
        state.loading = true
    },
    DELETE_ORDER_SUCCESS: (state, action) => {
        state.isDeleted = action.payload
        state.loading = false;
    },
    DELETE_ORDER_FAIL: (state, action) => {
        state.loading = false;
        state.error = action.payload
    },
    DELETE_ORDER_RESET: (state) => {
        state.isDeleted = false
    },
    CLEAR_ERRORS: (state) => {
        state.error = null
    }
})

const updateOrderState = {
    loading: false,
    error: null,
    isUpdated: false,
    success: false
}

export const updateOrderReducer = createReducer(updateOrderState, {
    UPDATE_ORDER_REQUEST: (state) => {
        state.loading = true;
    },
    UPDATE_ORDER_SUCCESS: (state, action) => {
        state.loading = false;
        state.success = action.payload;
        state.isUpdated = true;
    },
    UPDATE_ORDER_FAIL: (state, action) => {
        state.loading = false;
        state.error = action.payload
    },
    UPDATE_ORDER_RESET: (state) => {
        state.isUpdated = false
    },
    CLEAR_ERRORS: (state) => {
        state.error = null
    }
})