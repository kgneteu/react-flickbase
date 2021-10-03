import {BrowserRouter, Route, Switch, useHistory} from "react-router-dom";
import Home from "./components/home";
import Auth from "./components/auth/auth";
import Header from "./components/header";
import SideNavigation from "./components/sideNavigation";
import Layout from "./hoc/layout";
import {useEffect, useState} from "react";
import GoogleFontLoader from "react-google-font-loader";
import {useDispatch, useSelector} from "react-redux";
import {isAuthUser, signOutUser} from "./store/actions/user_actions";
import {Loader} from "./utils/loader";
import Dashboard from "./components/dashboard";
import Articles from "./components/dashboard/articles";
import Profile from "./components/dashboard/profile";
import AuthGuard from "./hoc/authGuard";
import PreventAuthRoute from "./hoc/preventAuthRoute";


// const theme = {
//     background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
// };

// let theme = createTheme({
//     background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
// });


const Routes = ({props}) => {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);
    const [menuVisisble, setMenuVisisble] = useState(false);
    const auth = useSelector(state => state.user.auth);



    useEffect(() => {
        dispatch(isAuthUser());
    }, [dispatch])

    useEffect(() => {
        if (auth !== null) {
            setLoading(false)
        }
    }, [auth, setLoading])
    if (loading) {
        return <Loader/>
    }


    const toggleMenuHandler = (value = null) => {
        if (!value) value = !menuVisisble;
        setMenuVisisble(value)
    }
    const signOutHandler = () => {
        dispatch(signOutUser())
        //window.location.replace('/');
         //console.log(router )
        //router.``
    }

    return (
        <BrowserRouter>
            <Header toggleMenu={toggleMenuHandler}
                    signOutHandler={signOutHandler}/>
            <SideNavigation menuVisible={menuVisisble}
                            toggleMenu={toggleMenuHandler}
                            signOutHandler={signOutHandler}/>
            <Layout>
                <Switch>
                    <Route path='/dashboard' component={AuthGuard(Dashboard)} exact/>
                    <Route path='/dashboard/articles' component={AuthGuard(Articles,'admin')}/>
                    <Route path='/dashboard/profile' component={AuthGuard(Profile)}/>

                    <Route path='/auth' component={PreventAuthRoute(Auth)}/>
                    <Route path='/' component={Home}/>
                </Switch>
            </Layout>
            <GoogleFontLoader
                fonts={[
                    {font: 'Fredoka One'}
                ]}
            />
        </BrowserRouter>
    )
};

export default Routes;
