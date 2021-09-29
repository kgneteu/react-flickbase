import {Button, Divider, List, ListItemIcon, ListItemText, SwipeableDrawer, TextField} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import clsx from 'clsx';
import {Dashboard, Home as HomeIcon, Mail as ContactIcon, VpnKey} from "@material-ui/icons"
import React from "react";
import {ListItemLink} from "./UI/listItemLink";

const useStyles = makeStyles({
    list: {
        width: 250,
    },
    fullList: {
        width: 'auto',
    },
});

const SideNavigation = (props) => {
    const anchor = 'right';
    const classes = useStyles();
    const [state, setState] = React.useState({
        top: false,
        left: false,
        bottom: false,
        right: false,
    });

    const toggleDrawer = (anchor, open) => (event) => {
        if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }

        setState({...state, [anchor]: open});
    };

    const list = (anchor) => (
        <div
            className={clsx(classes.list, {
                [classes.fullList]: anchor === 'top' || anchor === 'bottom',
            })}
            role="presentation"
            onClick={toggleDrawer(anchor, false)}
            onKeyDown={toggleDrawer(anchor, false)}
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
                <ListItemLink to={'/auth'}>
                    <ListItemIcon><VpnKey/></ListItemIcon>
                    <ListItemText>Sign in</ListItemText>
                </ListItemLink>
                <ListItemLink to={'/auth'}>
                    <ListItemIcon><VpnKey/></ListItemIcon>
                    <ListItemText>Sign out</ListItemText>
                </ListItemLink>
            </List>
            <Divider/>
            <List>
                <ListItemLink to={'/dashboard'}>
                    <ListItemIcon><Dashboard/></ListItemIcon>
                    <ListItemText>Dashboard</ListItemText>
                </ListItemLink>
            </List>
        </div>
    );

    return (
        <React.Fragment key={anchor}>

            <Button onClick={toggleDrawer(anchor, true)}>{anchor}</Button>
            <SwipeableDrawer
                anchor={anchor}
                open={state[anchor]}
                onClose={toggleDrawer(anchor, false)}
                onOpen={toggleDrawer(anchor, true)}
            >
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
