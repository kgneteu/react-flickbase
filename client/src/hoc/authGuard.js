import React, {useEffect, useState} from 'react'
import {useSelector} from "react-redux";
import {Loader} from "../utils/loader";

export default function AuthGuard(ComposedComponent, roleCheck = false) {
    const AuthenticationCheck = (props) => {
        const [isAuth, setIsAuth] = useState(false);
        const user = useSelector(state => state.user);

        useEffect(() => {
            if (!user.auth) {
                props.history.push('/')
            } else {
                if (roleCheck && user.data.role !== roleCheck) {
                    props.history.push('/dashboard')
                } else {
                    setIsAuth(true);
                }
            }

        }, [props, user]);

        if (!isAuth) {
            return <Loader/>
        } else {
            return <ComposedComponent {...props}/>
        }
    }

    return AuthenticationCheck;
}
