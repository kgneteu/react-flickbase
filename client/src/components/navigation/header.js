import {AppBar, Button, IconButton, Toolbar, Typography} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu"
import {createStyles, makeStyles} from '@material-ui/core/styles';
import RouterLink from '../../utils/routerLink'
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {showToast} from "../../utils/tools";
import {clearNotification} from "../../store/actions/notification_actions";
import 'react-toastify/dist/ReactToastify.css';
import {withRouter} from "react-router-dom";
import {appLayout} from "../../store/actions/site_actions";
import {AccountCircle, ExitToApp} from "@material-ui/icons";
import { withTheme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) =>
    createStyles({
        root: {
            flexGrow: 1,
        },
        menuButton: {
            marginRight: theme.spacing(2),
        },
        title: {
            flexGrow: 1,
        },
        logo: {
            fontFamily: 'Fredoka One',
            color: 'black',
            fontSize: 24,
            textTransform: 'none',
        }
    }),
);

function Header({toggleMenu, signOutHandler, location}) {

    const notifications = useSelector(state => state.notifications)
    const dispatch = useDispatch()
    const loggedIn = useSelector(state => state.user.auth)

    useEffect(() => {
        if (notifications && notifications.error) {
            const msg = notifications.msg ? notifications.msg : 'Error';
            showToast('ERROR', msg);
            dispatch(clearNotification())
        }
        if (notifications && notifications.success) {
            const msg = notifications.msg ? notifications.msg : 'OK!';
            showToast('SUCCESS', msg);
            dispatch(clearNotification())
        }
    }, [notifications, dispatch])

    useEffect(() => {

        let pathArray = location.pathname.split('/')
        if (pathArray[1] === 'dashboard') {
            dispatch(appLayout('dash_layout'))
        } else {
            dispatch(appLayout(''))
        }
    }, [location.pathname, dispatch])



    const classes = useStyles();
    return (
        <AppBar>
            <Toolbar>
                <Typography variant={'h6'} className={classes.title}>
                    <Button component={RouterLink} to={'/'} className={classes.logo}>
                        FlickBase
                    </Button>
                </Typography>
                {loggedIn ?
                    <IconButton color="inherit"
                                title='Sign Out'
                                onClick={signOutHandler}>
                        <ExitToApp/>
                    </IconButton> :
                    <IconButton color="inherit"
                                title='Sign In'
                                component={RouterLink}
                                to={'/auth'}>
                        <AccountCircle/>
                    </IconButton>
                }

                <IconButton edge="end"
                            className={classes.menuButton}
                            title='Menu'
                            color="inherit" aria-label="menu"
                            onClick={toggleMenu}
                >
                    <MenuIcon/>
                </IconButton>
            </Toolbar>
        </AppBar>
    );
}

export default withRouter(withTheme(Header));
