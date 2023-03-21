import React, { useState, useEffect } from 'react'
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import './forgotPassword.css'
import { useSelector, useDispatch } from 'react-redux'
import { clearErrors, forgotPassword} from '../../action/userAction';
import { useAlert } from 'react-alert'
import Progress from '../layout/MuiLoader/Progress';

const ForgotPassword = () => {
    const dispatch = useDispatch()
    const alert=useAlert()
    const { error, message, loading } = useSelector(state => state.Forgot)
    const [email, setEmail] = useState();
    const forgotPasswordSubmit=()=>{
        const myForm = new FormData();
        myForm.set("email", email);
        dispatch(forgotPassword(myForm))
    }
    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(clearErrors)
        }
        if (message) {
            alert.success(<p style={{textTransform:"initial"}} >{message}</p>)
            dispatch({type:"FORGOT_PASSWORD_RESET"})
        }
    }, [dispatch, error, alert, message])
  return (
    <>
    {loading ? <Progress /> :
    <div className="forgotPasswordContainer">
        <div className="forgotPasswordBox">
            <h2 className="forgotPasswordHeading">Forgot Password</h2>
            <form action="" className="forgotPasswordForm" onSubmit={(e) => { e.preventDefault();forgotPasswordSubmit()}}
            >
                <div className="signUpEmail">
                    <EmailOutlinedIcon />
                    <input autoComplete="false" type="email" placeholder='Email' value={email} required onChange={(e)=>{setEmail(e.target.value)}} />
                </div>
                <input type="submit" value="Send" className='forgotPasswordBtn ' />
            </form>
        </div>
    </div>
}
</>
  )
}

export default ForgotPassword