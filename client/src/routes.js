import {BrowserRouter, Route, Switch} from "react-router-dom";
import Home from "./components/home";
import Auth from "./components/auth/auth";
import Header from "./components/navigation/header";
import Article from "./components/article";
import SideNavigation from "./components/navigation/sideNavigation";
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
import EditArticle from "./components/dashboard/articles/editArticle";
import AddArticle from "./components/dashboard/articles/addArticle";
import ContactForm from "./components/contact/index";
import Verification from './components/auth/verfification'
import Categories from "./components/dashboard/categories";
import TestUpload from "./components/dashboard/testupload";
import SearchPage from "./components/article/searchPage";

const Routes = () => {
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
                    <Route path="/dashboard/articles/edit/:id" component={AuthGuard(EditArticle,'admin')}/>
                    <Route path='/dashboard/articles/add' component={AuthGuard(AddArticle,'admin')}/>
                    <Route path='/dashboard/articles' component={AuthGuard(Articles,'admin')}/>
                    <Route path='/dashboard/categories' component={AuthGuard(Categories,'admin')}/>
                    <Route path='/dashboard/profile' component={AuthGuard(Profile)}/>
                    <Route path="/dashboard/testupload" component={AuthGuard(TestUpload)}/>
                    <Route path='/article/:id' component={Article}/>
                    <Route path='/auth' component={PreventAuthRoute(Auth)}/>
                    <Route path='/contact' component={ContactForm}/>
                    <Route path='/verification' component={Verification}/>
                    <Route path='/search' component={SearchPage}/>
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
