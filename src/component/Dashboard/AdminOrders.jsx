import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import './adminProducts.css'
import { DataGrid } from '@mui/x-data-grid';
import { NavLink } from 'react-router-dom'
import EditIcon from '@mui/icons-material/Edit';
import { Button } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete';
import { makeStyles } from '@mui/styles';
import CircularProgress from '@mui/material/CircularProgress';
import { useAlert } from 'react-alert'
import { deleteOrder, getAdminOrders ,clearErrors} from '../../action/orderAction'
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


const AdminOrders = () => {
  const alert=useAlert()
  const classes = useStyles();
  const dispatch = useDispatch()
  const { loading, orders, error } = useSelector(state => state.adminOrders)
  const {isDeleted,error:deleteError}=useSelector(state=>state.deleteOrder)

  const deleteOrderHandler = (id) => {
    dispatch(deleteOrder(id))
  }

  const column = [
    { field: "id", headerName: "Order Id", minWidth: 300, headerAlign: 'center', align: "center", disableColumnMenu: true, sortable: false },
    { field: "status", headerName: "Status", minWidth: 380, headerAlign: 'center', align: "center", disableColumnMenu: true, sortable: false, cellClassName: (params) => { return params.getValue(params.id, "status") === "Delivered" ? "green" : "red" } },
    { field: "itemsQty", headerName: "Items Qty", minWidth: 180, type: "number", headerAlign: 'center', align: "center", disableColumnMenu: true, sortable: false },
    { field: "amount", headerName: "Amount", minWidth: 200, type: "number", headerAlign: 'center', align: "center", disableColumnMenu: true, sortable: false },
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
            <NavLink to={`/admin/order/${params.getValue(params.id, "id")}/${params.api.getRowIndex(params.row.id)}`} >
              <EditIcon />
            </NavLink>
            <Button disableRipple={true}
              onClick={() => { deleteOrderHandler(params.getValue(params.id, "id")) }}
            >
              <DeleteIcon />
            </Button>
          </>
        )
      }
    },
  ];
  const rows = []
  if (loading === false && orders) {
    orders && orders.forEach((item) => {
      let amount=0;
      item.orderItems.forEach((item)=>{
        amount+=item.price;
      })
      amount=amount+(amount*18/100)
      rows.push({
        id: item._id,
        status: item.orderStatus,
        amount: amount,
        itemsQty: item.orderItems.length
      })
    })
  }
  useEffect(() => {
    dispatch(getAdminOrders())
    if(isDeleted){
      alert.success("order deleted successfully")
      dispatch({type:"DELETE_ORDER_RESET"})
    }
    if(deleteError){
      alert.error(deleteError)
      dispatch(clearErrors)
    }
    if(error){
      alert.error(error)
      dispatch(clearErrors)
    }
  }, [dispatch,alert,error,isDeleted,deleteError])
  return (
    <>
      <div className="adminProducts-1">
        <div className="adminProductsDivHeading">
          <h4>ALL Orders</h4>
        </div>
        <div className="dataGrid">
          {
            loading ? <CircularProgress /> :
              orders && orders.length === 0 ? <div className="emptyProductWarning"> <h1>You Don't Have Any Order</h1> </div> :
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

export default AdminOrders