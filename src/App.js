import './App.css';
import Header from './component/layout/header/Header.js'
import webfont from 'webfontloader'
import React, { useEffect, useState,Suspense } from 'react'
import Home from './component/home/Home';
import ProtectedRoute from './component/routes/ProctedRoute';
// import { Provider } from 'react-redux'
// import { Store } from './store';
import { Routes, Route } from 'react-router-dom';
import ProductDetails from './component/product/ProductDetails';
import Products from './component/product/Products.jsx'
import LoginRegister from './component/user/LoginRegister';
import { loadUser } from './action/userAction';
import { useDispatch } from 'react-redux';
import UpdateProfile from './component/user/UpdateProfile';
import UpdatePassword from './component/user/UpdatePassword';
import ForgotPassword from './component/user/ForgotPassword.jsx'
import ResetPassword from './component/user/ResetPassword.jsx'
import Cart from './component/Cart/Cart';
import Shipping from './component/Shipping/Shipping.jsx'
import Confirmorder from './component/Shipping/Confirmorder';
import Success from './component/Shipping/Success.jsx';
import MyOrders from './component/Orders/MyOrders.jsx'
import OrderDetails from './component/Orders/OrderDetails.jsx'
import axios from 'axios';
import Payment from './component/Cart/Payment.jsx'
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import Progress from './component/layout/MuiLoader/Progress';
import AdminRoute from './component/routes/AdminRoute';
import AdminProducts from './component/Dashboard/AdminProducts';
import NewAdminProduct from './component/Dashboard/NewAdminProduct.jsx'
import AdminOrders from './component/Dashboard/AdminOrders.jsx'
import UpdateAdminProduct from './component/Dashboard/UpdateAdminProduct.jsx'
import DashBoardContent from './component/Dashboard/DashBoardContent';
import AdminOrderDetail from './component/Dashboard/AdminOrderDetail.jsx';

const Dashboard=React.lazy(()=>import("./component/Dashboard/Dashboard.jsx"))
const Profile=React.lazy(()=>import("./component/user/Profile"))
function App() {
  
  const [stripeApiKey, setStripeApiKey] = useState("")
  const dispatch = useDispatch()
  async function getStripeApiKey() {
    const {data}  =await axios.get('/stripeapikey');
    setStripeApiKey(data.stripeApiKey);
  }
  // const {user}=useSelector(state=>state.User)
  // const [stripePromise,setStripePromise]=useState("")
  // const getStripe=async()=>{
  //   const stri=await loadStripe(stripePublishableKey)
  //   setStripePromise(stri)
    
  // }
  useEffect(() => {
    webfont.load({
      google: {
        families: ['Roboto', 'Droid sans', 'Chilanka']
      }
    })
    dispatch(loadUser())
    getStripeApiKey()
    // getStripe()
  }, [dispatch])
  return (
    <>
      {/* <Provider store={Store}> */}
      <Header />
      <Suspense fallback={<Progress/>} >
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/products/:id' element={<ProductDetails />} />
        {/* <Route path='/products/products/:id' element={<ProductDetails/>}/> */}
        <Route exact path='/products' element={<Products />} />
        <Route exact path='/products/:keyword' element={<Products />} />

        <Route path='/account' element={<ProtectedRoute><Profile /></ProtectedRoute>} />
        <Route path='/me/update' element={<ProtectedRoute><UpdateProfile /></ProtectedRoute>} />
        <Route path='/password/update' element={<ProtectedRoute><UpdatePassword /></ProtectedRoute>} />
        <Route path='/shipping' element={<ProtectedRoute><Shipping /></ProtectedRoute>} />
        <Route path='/order/confirm' element={<ProtectedRoute><Confirmorder /></ProtectedRoute>} />
        <Route path='/success' element={<ProtectedRoute><Success /></ProtectedRoute>} />
        <Route path='/orders/me' element={<ProtectedRoute><MyOrders /></ProtectedRoute>} />
        <Route path='/orders/:id/:pid' element={<ProtectedRoute><OrderDetails /></ProtectedRoute>} />
        {stripeApiKey &&
          <Route path='/process/payment' element={<Elements stripe={loadStripe(stripeApiKey)} ><ProtectedRoute><Payment /></ProtectedRoute></Elements>} />
        }
        
        <Route path='/admin/' element={<AdminRoute> <Dashboard /> </AdminRoute>} >

          <Route path='dashboard' element={<AdminRoute> <DashBoardContent /> </AdminRoute>}  />
          <Route path='products' element={<AdminRoute> <AdminProducts /> </AdminRoute>}  />
          <Route path='product/new' element={<AdminRoute> <NewAdminProduct/> </AdminRoute>} />
          <Route path='orders' element={<AdminRoute> <AdminOrders/> </AdminRoute>} />
          <Route path='product/:id' element={<AdminRoute> <UpdateAdminProduct/> </AdminRoute>} />
          <Route path='order/:id/:ind' element={<AdminRoute> <AdminOrderDetail/> </AdminRoute>} />
        </Route>

        {/* method second worked well but not choose due to large code */}
        {/* <Route exact path='/account' element={<ProtectedRoute Component={Profile}/>} />
        <Route exact path='/me/update' element={<ProtectedRoute Component={UpdateProfile}/>} />
        <Route exact path='/password/update' element={<ProtectedRoute Component={UpdatePassword}/>} />
         */}
        <Route path='/Cart' element={<Cart />} />
        <Route exact path='/password/forgot' element={<ForgotPassword />} />
        <Route exact path='/password/reset/:token' element={<ResetPassword />} />
        <Route exact path='/auth' element={<LoginRegister />} />
      </Routes>
      </Suspense>
      {/* </Provider> */}
    </>
  );
}

export default App;
