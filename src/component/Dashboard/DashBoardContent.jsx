import React from 'react'
import './dashboard.css'
import { NavLink } from 'react-router-dom'
import { Doughnut, Line } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
} from 'chart.js';
import { useSelector,useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { adminProductsAction } from '../../action/productAction'
import { getAdminOrders } from '../../action/orderAction'
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  ArcElement,
  Legend
);

const DashBoardContent = () => {
  const dispatch=useDispatch()
  const {products,error}=useSelector(state=>state.adminProducts );
  const {orders}=useSelector(state=>state.adminOrders)

  let totalAmount=0;
  orders&&orders.forEach((item)=>{
    totalAmount+=item.totalPrice;
  })
  let outOfStock=0;
  products&&products.forEach((item)=>{
    if(item.stock===0){
      outOfStock+=1
    }
  })
  let productsLength=0;
  if(products){
    productsLength=products.length-outOfStock;
  }
  const lineState = {
    labels: ["Initial Amount", "Amount Earned"],
    datasets: [
      {
        label: "TOTAL AMOUT",
        backgroundColor: ["#7a08fa"],
        hoverBackgroundColor: ["#6a08dac2"],
        data: [0, totalAmount],
        borderColor: '#7a08fa',
        color:"whitesmoke"
      }
    ]
  }

  const options = {
    scales: {
      x:{
        border:{
          color:"#7a08fa"
        }, 
        grid: {
          color: '#2c2c2c',
        }
      },
      y:{
        border:{
          color:"#7a08fa"
        },
        grid: {
          color: '#2c2c2c',
        }
      }
    }
  };
  const doughnutState={
    labels:["Out Of Stock","In Stock"],
    datasets:[
      {
        backgroundColor:["#F55050","#7a08fa"],
        hoverBackgroundColor:["#cf3f3f","#6804db"],
        data:[outOfStock,productsLength],
      }
    ]
  }
  const  doughnutOptions= {
    elements: {
        arc: {
            borderWidth: 0
        }
    }
  }
  useEffect(()=>{
    if(error){
      alert.error(error)
    }
    dispatch(adminProductsAction())
    dispatch(getAdminOrders())
  },[dispatch,error])
  return (
    <>
        <div className="dashboardDiv">
          <div className="dashboardDivHeading">
            <h4>DASHBOARD</h4>
          </div>
          <div className="dashboardAmountDiv">
            <div className="dashboardAmountDiv-1">
              <p>Total Ammount:{totalAmount}</p>
            </div>
          </div>
          <div className="dashboardCircles">
            <NavLink to='/admin/products' >
              <h3>Product</h3>
              <h3>{products&&products.length}</h3>
            </NavLink>
            <NavLink to='/admin/orders'>
              <h3>Orders</h3>
              <h3>{orders&&orders.length}</h3>
            </NavLink>
            <NavLink to='/admin/users'>
              <h3>Users</h3>
              <h3>10</h3>
            </NavLink>
          </div>
          <div className="lineChartDiv">
            <div className="lineChart">
            <Line
              data={lineState}
              options={options}
            />
            </div>
          </div>
          <div className="doughnutDiv">
            <div className="doughnutChart">
              <Doughnut options={doughnutOptions} data={doughnutState} />
            </div>
          </div>
        </div>
    </>
  )
}

export default DashBoardContent