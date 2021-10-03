import {Link as RouterLink} from 'react-router-dom';

import {Drawer, List, ListItem, ListItemText} from '@material-ui/core';
import {useSelector} from "react-redux";

const AdminLayout = (props) => {
    const user = useSelector(state => state.user)
    return (
        <div className="adminLayout">
            <Drawer variant="permanent">
                <List>
                    <ListItem button component={RouterLink} to="/dashboard">
                        <ListItemText primary="Dashboard"/>
                    </ListItem>
                    <ListItem button component={RouterLink} to="/dashboard/profile">
                        <ListItemText primary="Profile"/>
                    </ListItem>
                    {user.data.role == 'admin' &&
                    <ListItem button component={RouterLink} to="/dashboard/articles">
                        <ListItemText primary="Articles"/>
                    </ListItem>}
                </List>

            </Drawer>

            <main role="main" className="col-md-9 ml-sm-auto col-lg-10 pt-3 px-4">
                <div
                    className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pb-2 mb-3 border-bottom">
                    <h1 className="h2">{props.section}</h1>
                </div>
                {props.children}
            </main>
        </div>
    )
}

export default AdminLayout;
