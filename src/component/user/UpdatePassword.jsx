import React, { useState, useEffect } from 'react'
import VpnKeyOutlinedIcon from '@mui/icons-material/VpnKeyOutlined';
import './updatePassword.css'
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'
import { clearErrors, updatePassword } from '../../action/userAction';
import { useAlert } from 'react-alert'
import Progress from '../layout/MuiLoader/Progress';
import LockOpenOutlined from '@mui/icons-material/LockOpenOutlined';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
const UpdatePassword = () => {
    const history = useNavigate();
    const alert = useAlert()
    const dispatch = useDispatch()
    const { error, isUpdated, loading } = useSelector(state => state.Profile)

    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");


    const updatePasswordSubmit = (e) => {
        const myForm = new FormData();
        myForm.set("oldPassword", oldPassword);
        myForm.set("newPassword", newPassword);
        myForm.set("confirmPassword", confirmPassword);
        dispatch(updatePassword(myForm))

    }

    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(clearErrors)
        }
        if (isUpdated) {
            history('/account')
            dispatch({ type: "UPDATE_PASSWORD_RESET" })
            alert.success("Password Updated Successfully")
        }
    }, [dispatch, error, alert, history, isUpdated])
    return (
        <>
            {loading ? <Progress /> :
                <div className="updatePasswordContainer">
                    <div className="updatePasswordBox">
                        <h2 className="updatePasswordHeading">Update Password</h2>
                        <form action="" className="updatePasswordForm" onSubmit={(e) => { e.preventDefault(); updatePasswordSubmit() }}
                        >

                            <div className="signUpPassword">
                                <VpnKeyOutlinedIcon />
                                <input autoComplete="off" type="password" placeholder='Old Password' value={oldPassword} name="password" required onChange={(e)=>setOldPassword(e.target.value)} />
                            </div>
                            <div className="signUpPassword">
                                <LockOpenOutlined/>
                                <input autoComplete="off" type="password" placeholder='New Password' value={newPassword} name="password" required onChange={(e)=>setNewPassword(e.target.value)} />
                            </div>
                            <div className="signUpPassword">
                                <LockOutlinedIcon />
                                <input autoComplete="off" type="password" placeholder='Confirm Password' value={confirmPassword} name="password" required onChange={(e)=>setConfirmPassword(e.target.value)} />
                            </div>
                            <input type="submit" value="Update" className='updatePasswordBtn ' />
                        </form>
                    </div>
                </div>
            }
        </>
    )
}

export default UpdatePassword