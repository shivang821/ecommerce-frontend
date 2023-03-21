import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import 'bootstrap/dist/css/bootstrap.css';
import SearchBar from '../searchBar';
import "./header.css"
import { NavLink} from 'react-router-dom'
import Profile from '../profile'
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import { useSelector } from 'react-redux';
export default function ButtonAppBar() {
    const {cartItems}=useSelector(state=>state.Cart)
    const cartItemsNumber=cartItems.length
    return (
        <AppBar position="static"
            className="navBar d-grid" sx={{zIndex:"20"}}>


            <div className="row ">


                <Toolbar className='nav-links d-flex justify-content-start col-6 '>


                    <NavLink to > </NavLink>
                    <NavLink to="/" > Home </NavLink>
                    <NavLink to="/products"> Products </NavLink>
                    <NavLink to="#" > Contact </NavLink>
                    <NavLink to="#" > About </NavLink>
                </Toolbar>
                <Toolbar className='navaccount col-6 d-flex justify-content-end' >


                    <SearchBar />

                    <div className='cartIcon' >
                        <NavLink to="/Cart" >
                            <ShoppingCartOutlinedIcon />
                            <div>{cartItemsNumber}</div>

                        </NavLink>

                    </div>

                    <Profile />

                </Toolbar>
            </div>


        </AppBar>
    );
}