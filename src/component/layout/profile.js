import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Avatar from '@mui/material/Avatar';
import { useSelector,useDispatch } from 'react-redux';
import ListAltIcon from '@mui/icons-material/ListAlt';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import DashboardCustomizeOutlinedIcon from '@mui/icons-material/DashboardCustomizeOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import ListItemIcon from '@mui/material/ListItemIcon';
import LoginOutlinedIcon from '@mui/icons-material/LoginOutlined';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../action/userAction';
import { Backdrop } from '@mui/material';
import { useAlert } from 'react-alert';

export default function Profile() {
  const alert =useAlert()
  const dispatch=useDispatch()
  const history=useNavigate()
  const { user, isAuthenticate } = useSelector(state => state.User);
  let url;
  if (isAuthenticate) {
    url = user.avatar.url;
  }
  else {
    url = ''
  }
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  let options;
  function login(){
    history('/auth')
  }
  function dashboard(){
    history('/admin/dashboard')
  }
  function logoutUser(){
    dispatch(logout())
    setTimeout(()=>{
      // history('/',{replace:true})
      alert.success("LOG OUT SUCCESSFULLY")
    },500)
  }
  function orders(){
    history('/orders/me')
  }
  function account(){
    history('/account')
  }
  if(!isAuthenticate){
    options=[{icon:<LoginOutlinedIcon/>,name:"Login",func:login}]
  }
 else{
  options=[{icon:<ListAltIcon/>,name:"Orders",func:orders},{icon:<AccountCircleOutlinedIcon/>,name:"Profile",func:account},{icon:<LogoutOutlinedIcon/>,name:"Logout",func:logoutUser}]
  if(user.role==="admin"){
    options.unshift({icon:<DashboardCustomizeOutlinedIcon/>,name:"Dashboard",func:dashboard})
   }
 }
  return (
    <div className='profileicon'>
      <>
      <Backdrop style={{zIndex:"5"}} open={open}/>
        <Button
          id="basic-button"
          aria-controls={open ? 'basic-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
          onClick={handleClick}
          disableRipple
          disableElevation
          sx={{ m1: 1, "MuiButtonBase-root:hover": { bgcolor: "transparent" } }}
        >
          <Avatar src={url} />
        </Button>
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            'aria-labelledby': 'basic-button',
          }}
          className="menu"
        >
          {options.map((item,i)=>{
            return <MenuItem  key={i} onClick={()=>{item.func();handleClose()}} className="profile-links"><ListItemIcon className='profileIcons' >
            {item.icon}
          </ListItemIcon> {item.name}</MenuItem>
          })}

        </Menu>
      </>

    </div>
  );
}