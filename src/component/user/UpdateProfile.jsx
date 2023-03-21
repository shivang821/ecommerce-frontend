import React, { useState, useEffect } from 'react'
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import './updateProfile.css'
import {useNavigate } from 'react-router-dom';
import { Avatar } from '@mui/material';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import { useSelector, useDispatch } from 'react-redux'
import { clearErrors, loadUser, updateProfile } from '../../action/userAction';
import { useAlert } from 'react-alert'
import Progress from '../layout/MuiLoader/Progress';

const UpdateProfile = () => {
    const history = useNavigate();
    const alert = useAlert()
    const { user } = useSelector(state => state.User)
    const dispatch = useDispatch()
    const [avatar, setAvatar] = useState("")
    const [avatarPreview, setAvatarPreview] = useState()
    const [name, setName] = useState();
    const [email, setEmail] = useState();
    const { error, isUpdated, loading } = useSelector(state => state.Profile)
    // const [newAvatar,setNewAvatar]=useState("");
    const updateProfileSubmit = (e) => {
        const myForm = new FormData();
        myForm.set("name", name);
        myForm.set("email", email);
        myForm.set("avatar", avatar);
        dispatch(updateProfile(myForm))

    }
    const updateProfileDataChange = (e) => {

        const reader = new FileReader()
        reader.onload = () => {
            if (reader.readyState === 2) {
                setAvatarPreview(reader.result)
                setAvatar(reader.result)
            }
        }
        reader.readAsDataURL(e.target.files[0])
    }
    useEffect(() => {
        setTimeout(() => {
            
            if (user) {
                setName(user.name)
                setEmail(user.email)
                const {url}=user.avatar
                setAvatarPreview(url)
            }
        }, 100);
        if (error) {
            alert.error(error);
            dispatch(clearErrors)
        }
        if (isUpdated) {
            dispatch(loadUser());
            history('/account')
            dispatch({ type: "UPDATE_PROFILE_RESET" })
            alert.success("Profile Updated Successfully")
        }
    }, [dispatch, error, alert, history, isUpdated, user])
    return (
        <>
            {loading ? <Progress /> :
                <div className="updateProfileContainer">
                    <div className="updateProfileBox">
                        <h2 className="updateProfileHeading">Update Profile</h2>
                        <form action="" className="updateProfileForm" encType="multipart/form-data" onSubmit={(e) => { e.preventDefault(); updateProfileSubmit() }}
                        >

                            <div className="signUpName">
                                <AccountCircleOutlinedIcon />
                                <input type="text" autoComplete='off' name="name" placeholder='Name' required value={name} onChange={(e)=>{setName(e.target.value)}} />

                            </div>
                            <div className="signUpEmail">
                                <EmailOutlinedIcon />
                                <input autoComplete="off" type="email" placeholder='Email' value={email} name="email" required onChange={(e)=>{setEmail(e.target.value)}} />
                            </div>
                            <div id="updateProfileImage">
                                <Avatar src={avatarPreview} />
                                <input type="file" name="avatar" accept='image/*' onChange={updateProfileDataChange} />
                            </div>
                            <input type="submit" value="Update" className='updateProfileBtn ' />
                        </form>
                    </div>
                </div>
            }
        </>
    )
}

export default UpdateProfile