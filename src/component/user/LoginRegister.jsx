import React, { useRef, useState, useEffect } from 'react'
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import './loginRegister.css'
import LockOpenIcon from '@mui/icons-material/LockOpen';
import { NavLink, useNavigate, useSearchParams } from 'react-router-dom';
import { Avatar, MenuItem, Select } from '@mui/material';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import { useSelector, useDispatch } from 'react-redux'
import { login, clearErrors, register } from '../../action/userAction';
import { useAlert } from 'react-alert'
import GroupsOutlinedIcon from '@mui/icons-material/GroupsOutlined';
import ManageAccountsOutlinedIcon from '@mui/icons-material/ManageAccountsOutlined';
const LoginRegister = () => {
    const [searchParams] = useSearchParams();
    const redirect = searchParams.get("redirect") ? `/${searchParams.get("redirect")}` : -1;
    const [role, setRole] = useState("user")
    const history = useNavigate();
    const alert = useAlert()
    const { error, isAuthenticate } = useSelector(state => state.User)
    const dispatch = useDispatch()
    const [loginEmail, setLoginEmail] = useState("")
    const [loginPassword, setLoginPassword] = useState("")
    const switcherTab = useRef()
    const loginTab = useRef()
    const registerTab = useRef()
    const [user, setUser] = useState({
        name: "",
        email: "",
        password: "",
        role:role
    })
    const [avatar, setAvatar] = useState()
    const [avatarPreview, setAvatarPreview] = useState("")
    const { name, email, password } = user;
    const switchTab = (e, tab) => {
        if (tab === "login") {
            switcherTab.current.classList.add("shiftToNeutral")
            switcherTab.current.classList.remove("shiftToRight")

            registerTab.current.classList.remove("shiftToNeutralForm")
            loginTab.current.classList.remove("shiftToLeft")
        }
        if (tab === "register") {
            switcherTab.current.classList.add("shiftToRight")
            switcherTab.current.classList.remove("shiftToNeutral")

            registerTab.current.classList.add("shiftToNeutralForm")
            loginTab.current.classList.add("shiftToLeft")
            loginTab.current.classList.remove("shiftToNeutralForm")
        }
    }
    const loginSubmit = (e) => {
        dispatch(login(loginEmail, loginPassword))
    }
    const registerSubmit = (e) => {
        const myForm = new FormData();
        myForm.set("name", name);
        myForm.set("password", password);
        myForm.set("email", email);
        myForm.set("role", role);
        myForm.set("avatar", avatar);
        dispatch(register(myForm))

    }
    const registerDataChange = (e) => {
        if (e.target.name === "avatar") {
            const reader = new FileReader()
            reader.onload = () => {
                if (reader.readyState === 2) {
                    setAvatarPreview(reader.result)
                    setAvatar(reader.result)
                }
            }
            reader.readAsDataURL(e.target.files[0])
        }
        else {
            setUser({ ...user, [e.target.name]: e.target.value })
        }
    }
    useEffect(() => {
        if (error) {
            alert.error(error)
            dispatch(clearErrors)
        }
        if (isAuthenticate) {
            history(redirect, { replace: true })
        }
    }, [dispatch, error, alert, redirect, history, isAuthenticate])
    const Role = ["user", "admin"];
    return (
        <>
            <div className="LoginSignUpContainer">
                <div className="LoginSignUpBox">
                    <div>
                        <div className="login-signup-toggler">
                            <p onClick={(e) => switchTab(e, "login")} >Login</p>
                            <p onClick={(e) => switchTab(e, "register")} >SignUp</p>
                        </div>
                        <button ref={switcherTab} className="toggleBtn" ></button>
                    </div>
                    <form className='loginForm shiftToNeutralForm' ref={loginTab} onSubmit={(e) => { e.preventDefault(); loginSubmit() }}>
                        <div className="loginEmail">
                            <EmailOutlinedIcon />
                            <input autoComplete="off" type="email" placeholder='Email' value={loginEmail} name="email" required onChange={(e) => setLoginEmail(e.target.value)} />
                        </div>
                        <div className="loginPassword">
                            <LockOpenIcon />
                            <input autoComplete="off" type="password" placeholder='Password' value={loginPassword} name="password" required onChange={(e) => setLoginPassword(e.target.value)} />
                        </div>
                        <NavLink to="/password/forgot">Forgot Password ?</NavLink>
                        <input type="submit" value="Login" className='loginBtn ' />
                    </form>
                    <form action="" className="signUpForm shiftToLeft" ref={registerTab} encType="multipart/form-data" onSubmit={(e) => { e.preventDefault(); registerSubmit() }}
                    >
                        <div className="signUpName">
                            <AccountCircleOutlinedIcon />
                            <input type="text" autoComplete='off' name="name" placeholder='Name' required value={name} onChange={registerDataChange} />

                        </div>
                        <div className="signUpEmail">
                            <EmailOutlinedIcon />
                            <input autoComplete="off" type="email" placeholder='Email' value={email} name="email" required onChange={registerDataChange} />
                        </div>
                        <div className="signUpPassword">
                            <LockOpenIcon />
                            <input autoComplete="off" type="password" placeholder='Password' value={password} name="password" required onChange={registerDataChange} />
                        </div>
                        <div className='userRoleDiv'>
                            {/* {role==='User'?<GroupsOutlinedIcon/>:<ManageAccountsOutlinedIcon/>} */}
                            <Select
                            name="role"
                                sx={{
                                    color: "whitesmoke",
                                    width: "80%",
                                    '.MuiOutlinedInput-notchedOutline': {
                                        border: "1px solid rgba(230, 230, 230, .293)",
                                        transition: "all .5s",
                                        
                                    },
                                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                        border: "1px solid whitesmoke"
                                    },
                                    '&:hover .MuiOutlinedInput-notchedOutline': {
                                        border: "1px solid whitesmoke"
                                    },
                                    '.MuiSvgIcon-root ': {
                                        fill: "white !important",
                                    },
                                    '.MuiPaper-root>ul':{
                                        backgroundColor:"red"
                                    }
                                }}
                                displayEmpty
                                inputProps={{ 'aria-label': 'Without label',MenuProps:{MenuListProps:{sx:{}}} }}
                                onChange={(e) => { setRole(e.target.value);registerDataChange(e) }}
                                value={role}
                            >
                                {Role.map((item, ind) => {
                                    return <MenuItem value={item} key={ind} className='menu-item'>
                                        {item === "user" ? <GroupsOutlinedIcon sx={{ marginRight: ".5rem",marginLeft:".2rem"}} /> : <ManageAccountsOutlinedIcon sx={{ marginRight: ".5rem",marginLeft:".2rem" }} />}
                                        {item}</MenuItem>
                                })}
                            </Select>
                        </div>
                        <div id="registerImage">
                            <Avatar src={avatarPreview} />
                            <input type="file" name="avatar" accept='image/*' onChange={registerDataChange} />
                        </div>
                        <input type="submit" value="SignUp" className='signUpBtn ' />
                    </form>
                </div>
            </div>
        </>
    )
}

export default LoginRegister