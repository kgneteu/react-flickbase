import {Link as RouterLink} from 'react-router-dom';

import {Box, Container, Grid, List, ListItem, ListItemText} from '@material-ui/core';
import {useSelector} from "react-redux";

const AdminLayout = (props) => {
    const user = useSelector(state => state.user)
    return (
        <div className="adminLayout">
            <Grid container spacing={0} alignItems={'stretch'}>
                <Grid item>
                    <Box sx={{bgcolor: 'palevioletred', p: 3, height: '100%'}}>
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
        </div>
    )
}

export default AdminLayout;
