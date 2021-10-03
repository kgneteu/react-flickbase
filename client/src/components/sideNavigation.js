import {Divider, List, ListItem, ListItemIcon, ListItemText, SwipeableDrawer, TextField} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import clsx from 'clsx';
import {Dashboard as DashboardIcon, Home as HomeIcon, Mail as ContactIcon, VpnKey} from "@material-ui/icons"
import React from "react";
import {ListItemLink} from "./UI/listItemLink";
import {useDispatch, useSelector} from "react-redux";

const useStyles = makeStyles({
    list: {
        width: 250,
    },
    fullList: {
        width: 'auto',
    },
});

const SideNavigation = ({menuVisible, toggleMenu, signOutHandler}) => {
    const anchor = 'right';
    const classes = useStyles();
    const dispatch = useDispatch();
    const isAuth = useSelector(state => state.user.auth);
    const list = (anchor) => (
        <div
            className={clsx(classes.list, {
                [classes.fullList]: anchor === 'top' || anchor === 'bottom',
            })}
            role="presentation"
            onClick={() => toggleMenu(false)}
            onKeyDown={() => toggleMenu(false)}
        >
            <List>
                <ListItemLink to={'/'}>
                    <ListItemIcon><HomeIcon/></ListItemIcon>
                    <ListItemText>Home</ListItemText>
                </ListItemLink>
                <ListItemLink to={'/contact'}>
                    <ListItemIcon><ContactIcon/></ListItemIcon>
                    <ListItemText>Contact</ListItemText>
                </ListItemLink>
                {!isAuth &&
                <ListItemLink to={'/auth'}>
                    <ListItemIcon><VpnKey/></ListItemIcon>
                    <ListItemText>Sign in</ListItemText>
                </ListItemLink>}
                {isAuth &&
                <ListItem button onClick={signOutHandler}>
                    <ListItemIcon><VpnKey/></ListItemIcon>
                    <ListItemText>Sign out</ListItemText>
                </ListItem>}

            </List>
            {isAuth && <>
                <Divider/>
                <List>
                    <ListItemLink to={'/dashboard'}>
                        <ListItemIcon><DashboardIcon/></ListItemIcon>
                        <ListItemText>Dashboard</ListItemText>
                    </ListItemLink>
                </List></>}
        </div>
    );

    return (
        <React.Fragment key={anchor}>

            {/*<Button onClick={toggleDrawer(anchor, true)}>{anchor}</Button>*/}
            <SwipeableDrawer
                anchor={anchor}
                open={menuVisible}
                onClose={() => toggleMenu(false)}
                onOpen={() => toggleMenu(true)}>
                <form style={{margin: 20}}>
                    <TextField id={"outlined-basic"} label={"Search movie"} variant={"outlined"}/>
                </form>
                <Divider/>
                {list(anchor)}
            </SwipeableDrawer>
        </React.Fragment>
    );
};

export default SideNavigation;
