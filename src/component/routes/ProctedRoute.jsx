import React from 'react'
import { useSelector } from 'react-redux'
import Progress from '../layout/MuiLoader/Progress';
import LoginRegister from '../user/LoginRegister';

const ProtectedRoute=({children ,isAdmin })=>{
  const {user,loading}=useSelector(state=>state.User)
  return(
    <>
    {
      loading?<Progress/>:
      <>
      {user===null?<LoginRegister/>:children}
      </>
    }
    </>
  )

}

export default ProtectedRoute