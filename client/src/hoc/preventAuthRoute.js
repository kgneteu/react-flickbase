import React from 'react'
import {useSelector} from "react-redux";
import {Redirect} from "react-router-dom";


export default (WrappedComponent) => {

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
