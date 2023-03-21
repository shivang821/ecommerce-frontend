// import { Avatar } from '@mui/material';
import React from 'react'
import { useSelector } from 'react-redux'
import { NavLink} from 'react-router-dom';
import Progress from '../layout/MuiLoader/Progress';
import './Profile.css'
const Profile = () => {
    const { user, isAuthenticate, loading } = useSelector(state => state.User);
    return (
        <>
            {/* <Progress/> */}
            {loading ? <Progress /> :
                <>
                    {isAuthenticate ?
                        <div className="profile-container">
                            <div className="profile-img-container">
                                <h1 className='profileHeading'>My Profile</h1>
                                {/* <Avatar sx={{ width: "15rem", height: "15rem" }} src={user.avatar.url} /> */}
                                <div className="imageDiv">
                                <img src={user.avatar.url} alt="" />
                                </div>

                                <button className='route-link' ><NavLink to="/me/update" >Edit Profile</NavLink></button>
                            </div>
                            <div className="user-detail">
                                <div>
                                    <h4>Name</h4>
                                    <p>{user.name}</p>
                                </div>
                                <div>
                                    <h4>Email</h4>
                                    <p>{user.email}</p>
                                </div>
                                <div>
                                    <h4>joined On</h4>
                                    <p>{String(user.createdAt).substring(0, 10)}</p>
                                </div>
                                <button className='route-link'><NavLink to="/orders/me">My Orders</NavLink> </button>
                                <button className='route-link'><NavLink to="/password/update">  Change Password</NavLink></button>
                            </div>
                        </div> : undefined
                    }
                </>
            }
        </>
    )
}

export default Profile