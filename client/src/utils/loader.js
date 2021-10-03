import {Grid, LinearProgress, Typography} from "@material-ui/core";

export const Loader = () => (
    <Grid container
          direction={'row'}
          style={{height: '100vh'}}
          justifyContent={'center'}
          alignItems={'center'}>
        <Grid item xs={4}>
            <Typography>Loading...</Typography>
            <LinearProgress/>
        </Grid>
    </Grid>
)
