import React from 'react'
import { Outlet,Navigate } from 'react-router-dom'
import { isLoggedIn } from '../Auth/indix';

const PrivateRoute=()=> {

    
    if(isLoggedIn()){
        return <Outlet/>
    }
    else{
        return <Navigate to ={"/login"}/>
    }

}

export default PrivateRoute