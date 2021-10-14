import {Link as RouterLink} from 'react-router-dom';

import {Box, Container, Grid, List, ListItem, ListItemText} from '@material-ui/core';
import {useSelector} from "react-redux";

const AdminLayout = (props) => {
    const user = useSelector(state => state.user)
    return (
        <Grid container direction={'column'} className="adminLayout" style={{minHeight: 'calc(100vh - 112px)'}}>
            <Grid container item style={{flexGrow: 1, flexWrap: 'nowrap'}} spacing={0} >
                <Grid item>
                    <Box sx={{p: 3, height: '100%', bgcolor: '#cccccc'}}>
                        <List>
                            <ListItem button component={RouterLink} to="/dashboard">
                                <ListItemText primary="Dashboard"/>
                            </ListItem>
                            <ListItem button component={RouterLink} to="/dashboard/profile">
                                <ListItemText primary="Profile"/>
                            </ListItem>
                            {user.data.role === 'admin' &&
                            <ListItem button component={RouterLink} to="/dashboard/articles">
                                <ListItemText primary="Articles"/>
                            </ListItem>}
                            {user.data.role === 'admin' &&
                            <ListItem button component={RouterLink} to="/dashboard/categories">
                                <ListItemText primary="Categories"/>
                            </ListItem>}
                            {user.data.role === 'admin' &&
                            <ListItem button component={RouterLink} to="/dashboard/testupload">
                                <ListItemText primary="File Upload"/>
                            </ListItem>}
                        </List>
                    </Box>
                </Grid>
                <Grid item style={{flexGrow: 1}}>
                    <Container component={'section'} maxWidth={'lg'}>

                        <h1 className="h2">{props.section}</h1>

                        {props.children}
                    </Container>
                </Grid>
            </Grid>
        </Grid>
    )
}

export default AdminLayout;
