import React from 'react'
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom'
import Progress from '../layout/MuiLoader/Progress'; 

const AdminRoute = ({ children }) => {
  // if(user.role==="user"){
  //     return <Navigate to='/' />
  // }
  const { loading, user } = useSelector(state => state.User)
  
    return (
      // children
      <>
        {
          loading ? <Progress /> :
            <>
              {user ? user.role === "user" ? <Navigate to='/' /> : children : <Navigate to='/auth' />}
            </>
        }
      </>
    )
  
}

export default AdminRoute