import React, { useState, useEffect } from 'react'
import './resetPassword.css'
import { useNavigate,useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'
import { clearErrors, resetPassword } from '../../action/userAction';
import { useAlert } from 'react-alert'
import Progress from '../layout/MuiLoader/Progress';
import LockOpenOutlined from '@mui/icons-material/LockOpenOutlined';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

const ResetPassword = () => {
    const {token}=useParams()
    const history = useNavigate();
    const alert = useAlert()
    const dispatch = useDispatch()
    const { error, success, loading } = useSelector(state => state.Forgot)

    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");


    const resetPasswordSubmit = (e) => {
        const myForm = new FormData();
        myForm.set("password", password);
        myForm.set("confirmPassword", confirmPassword);
        dispatch(resetPassword(token,myForm))

    }

    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(clearErrors)
        }
        if (success) {
            alert.success("Password Updated Successfully")
            dispatch({type:"RESET_PASSWORD_RESET"})
            history('/auth',{replace:true})
            
        }
    }, [dispatch, error, alert, history, success])
  return (
    <>
    {loading ? <Progress /> :
        <div className="resetPasswordContainer">
            <div className="resetPasswordBox">
                <h2 className="resetPasswordHeading">Reset Password</h2>
                <form action="" className="resetPasswordForm" onSubmit={(e) => { e.preventDefault(); resetPasswordSubmit() }}
                >
                    <div className="signUpPassword">
                        <LockOpenOutlined/>
                        <input autoComplete="off" type="password" placeholder='New Password' value={password} name="password" required onChange={(e)=>setPassword(e.target.value)} />
                    </div>
                    <div className="signUpPassword">
                        <LockOutlinedIcon />
                        <input autoComplete="off" type="password" placeholder='Confirm Password' value={confirmPassword} name="password" required onChange={(e)=>setConfirmPassword(e.target.value)} />
                    </div>
                    <input type="submit" value="Update" className='resetPasswordBtn ' />
                </form>
            </div>
        </div>
    }
</>
  )
}

export default ResetPassword