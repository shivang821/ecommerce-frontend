import { createReducer } from "@reduxjs/toolkit";

let producstState = {
    loading: true,
    error: null,
    product: [],
    productsCount: 0,
    filteredProductsCount: 0,
    resultPerPage: ""
}
export const productReducer = createReducer(producstState, {
    ALL_PRODUCTS_REQUEST: (state, action) => {
        state.loading = true;
        state.product = []
    },
    ALL_PRODUCTS_SUCCESS: (state, action) => {
        state.product = action.payload.products;
        state.loading = false
        state.productsCount = action.payload.productCounts
        state.resultPerPage = action.payload.resultPerPage
        state.filteredProductsCount = action.payload.filteredProductsCount
    },
    ALL_PRODUCTS_FAIL: (state, action) => {
        state.loading = false;
        state.error = action.payload;
    },
    CLEAR_ERROR: (state, action) => {
        state.product = [...state.product]
        state.error = null
    }
})

let singleProductState = {
    loading: false,
    error: null,
    product: {},
    success: false
}

export const productDetailsReducer = createReducer(singleProductState, {
    PRODUCT_DETAILS_REQUEST: (state, action) => {
        state.loading = true;
        state.product = {}
    },
    PRODUCT_DETAILS_SUCCESS: (state, action) => {
        state.product = action.payload.product;
        state.loading = false;
        state.success = true
    },
    PRODUCT_DETAILS_FAIL: (state, action) => {
        state.loading = false;
        state.error = action.payload;
    },
    PRODUCT_DETAILS_RESET: (state) => {
        state.success = false;
    },
    CLEAR_ERROR: (state, action) => {
        state.product = {...state.product }
        state.error = null
    }
})

const reviewState = {
    loading: false,
    success: null,
    error: null
}

export const newReviewreducer = createReducer(reviewState, {
    NEW_REVIEW_REQUEST: (state, action) => {
        state.loading = true;
    },
    NEW_REVIEW_SUCCESS: (state, action) => {
        state.success = action.payload;
        state.loading = false
    },
    NEW_REVIEW_FAIL: (state, action) => {
        state.loading = false;
        state.error = action.payload;
    },
    NEW_REVIEW_RESET: (state) => {
        state.success = false;
        state.loading = false
    },
    CLEAR_ERROR: (state, action) => {
        state.error = null
    }
})
const adminProductsState = {
    products: null,
    loading: true,
    error: null
}
export const adminProductsreducer = createReducer(adminProductsState, {
    ADMIN_PRODUCTS_REQUEST: (state) => {
        state.loading = true;
    },
    ADMIN_PRODUCTS_SUCCESS: (state, action) => {
        state.products = action.payload;
        state.loading = false;
    },
    ADMIN_PRODUCTS_FAIL: (state, action) => {
        state.error = action.payload;
        state.loading = false
    }
})

const newProductReducerState = {
    loading: false,
    error: null,
    newProduct: null,
    success: null
}

export const newProductReducer = createReducer(newProductReducerState, {
    NEW_PRODUCT_REQUEST: (state, action) => {
        state.loading = true
    },
    NEW_PRODUCT_SUCCESS: (state, action) => {
        state.newProduct = action.payload.product
        state.loading = false
        state.success = action.payload.success
    },
    NEW_PRODUCT_FAIL: (state, action) => {
        state.loading = false
        state.error = action.payload
    },
    NEW_PRODUCT_RESET: (state, action) => {
        state.success = false
    },
    CLEAR_ERROR: (state) => {
        state.error = null
    }
})

const deleteProductState = {
    loading: false,
    error: null,
    message: null,
    success: false
}
export const deleteProductReducer = createReducer(deleteProductState, {
    DELETE_PRODUCT_REQUEST: (state, action) => {
        state.loading = true
    },
    DELETE_PRODUCT_SUCCESS: (state, action) => {
        state.loading = false;
        state.message = action.payload.message;
        state.success = action.payload.success
    },
    DELETE_PRODUCT_FAIL: (state, action) => {
        state.error = action.payload
    },
    DELETE_PRODUCT_RESET: (state, action) => {
        state.success = false
    },
    CLEAR_ERROR: (state) => {
        state.error = null
    }
})

const updateProductState = {
    loading: false,
    error: null,
    success: false,
    isUpdated: false
}

export const updateProductReducer = createReducer(updateProductState, {
    UPDATE_PRODUCT_REQUEST: (state, action) => {
        state.loading = true
    },
    UPDATE_PRODUCT_SUCCESS: (state, action) => {
        state.loading = false;
        state.success = action.payload;
        state.isUpdated = true
    },
    UPDATE_PRODUCT_FAIL: (state, action) => {
        state.error = action.payload
    },
    UPDATE_PRODUCT_RESET: (state, action) => {
        state.isUpdated = false
    },
    CLEAR_ERROR: (state) => {
        state.error = null
    }
})