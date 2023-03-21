import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import './adminProducts.css'
import { adminProductsAction, deleteProductAction } from '../../action/productAction'
import { DataGrid } from '@mui/x-data-grid';
import { NavLink } from 'react-router-dom'
import EditIcon from '@mui/icons-material/Edit';
import { Button } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete';
import { makeStyles } from '@mui/styles';
import CircularProgress from '@mui/material/CircularProgress';
import { useAlert } from 'react-alert'
const useStyles = makeStyles({
  root: {
    '&.MuiDataGrid-root .MuiDataGrid-cell:focus,&.MuiDataGrid-root .MuiDataGrid-columnHeader:focus': {
      outline: 'none',
    },
    "& .MuiDataGrid-row:hover": {
      // backgroundColor:"#42424248"
    },
    '&.MuiDataGrid-root': {
      backgroundColor: "#1c1c1c",
      color: "whitesmoke",
      border: "none",
      borderRadius: "10px",
      boxShadow: "0 10px 40px 0px rgba(0,0,0,.5)",

    },
    '&.MuiDataGrid-root>svg': {
      color: "whitesmoke"
    },
    '&.MuiDataGrid-root .MuiDataGrid-row': {
      border: "none",
      outline: "none",
      transition: "background .8s ease-in",
      '&:hover': {
        backgroundColor: "#9139f5ce"
      }
    },
    '&.MuiDataGrid-cell--withRenderer>button': {
      backgroundColor: 'red'
    },
    '&.MuiDataGrid-cell:focus': {
      backgroundColor: "transparent",
      color: "whitesmoke"
    },
    '& .MuiDataGrid-cell': {
      transition: "background .4s ease-in",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      '&:hover': {
        backgroundColor: "#42424246",
        fontSize: "1rem"
      }
    },
  }
});
const AdminProducts = () => {
  const alert = useAlert()
  const { success, error, message } = useSelector(state => state.deleteProduct)
  const classes = useStyles();
  const dispatch = useDispatch()
  const { products, loading } = useSelector(state => state.adminProducts)
  const deleteHandler = (id) => {
    dispatch(deleteProductAction(id))
  }
  const column = [
    { field: "id", headerName: "Product Id", minWidth: 300, headerAlign: 'center', align: "center", disableColumnMenu: true, sortable: false },
    { field: "name", headerName: "Name", minWidth: 380, headerAlign: 'center', align: "center", disableColumnMenu: true, sortable: false },
    { field: "stock", headerName: "Stock", minWidth: 180, type: "number", headerAlign: 'center', align: "center", disableColumnMenu: true, sortable: false },
    { field: "price", headerName: "Price", minWidth: 200, type: "number", headerAlign: 'center', align: "center", disableColumnMenu: true, sortable: false },
    {
      field: "actions",
      headerName: "Actions",
      minWidth: 180,
      type: "number",
      headerAlign: 'center',
      align: "center", disableColumnMenu: true,
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            <NavLink to={`/admin/product/${params.getValue(params.id, "id")}`} >
              <EditIcon />
            </NavLink>
            <Button disableRipple={true} onClick={() => { deleteHandler(params.getValue(params.id, "id")) }} >
              <DeleteIcon />
            </Button>
          </>
        )
      }
    },
  ];
  useEffect(() => {
    if (error) {
      alert.error("error")
      dispatch({ type: "CLEAR_ERROR" })
    }
    if (success) {
      alert.success(message)
      dispatch({ type: "DELETE_PRODUCT_RESET" })
    }
    dispatch(adminProductsAction())
  }, [dispatch, error, alert, success, message])
  const rows = []
  if (loading === false) {

    products.forEach((item) => {
      rows.push({
        id: item._id,
        stock: item.stock,
        name: item.name,
        price: item.price
      })
    })
  }
  return (
    <>
      <div className="adminProducts-1">
        <div className="adminProductsDivHeading">
          <h4>ALL PRODUCTS</h4>
        </div>
        <div className="dataGrid">
          {
            loading ? <CircularProgress /> :
              products.length === 0 ? <div className="emptyProductWarning"> <h1>You Have Not Created Any Product Yet</h1> <button><NavLink to='/admin/product/new'>Create Product</NavLink></button> </div> :
                <DataGrid
                  className={classes.root}
                  rows={rows}
                  columns={column}
                  pageSize={10}
                  rowsPerPageOptions={[10]}
                  disableSelectionOnClick
                  sx={{
                    margin: 5, backgroundColor: "whitesmoke", width: "100%",
                  }}
                />
          }
        </div>
      </div>
    </>

  )
}

export default AdminProducts