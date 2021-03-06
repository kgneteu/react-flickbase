import React from 'react'
import {useSelector} from "react-redux";
import {Redirect} from "react-router-dom";


const PreventAuthRoute = (WrappedComponent) => {

    const PreventAuthCheck = (props) => {
        const isAuth = useSelector(state=>state.user.auth)
        if (isAuth){
            return <Redirect to={'/'}/>
        } else {
            return <WrappedComponent {...props} />
        }
    }
    return PreventAuthCheck;
}

export default PreventAuthRoute;
