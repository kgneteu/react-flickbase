import {Box, Container} from "@material-ui/core";
import {ToastContainer} from "react-toastify";
import {useSelector} from "react-redux";
//import {SnackbarProvider} from "notistack";

const Layout = ({children}) => {
    const site = useSelector(state => state.site)
    return (
        <Box mt={3}>
            <Container component={'main'} className={site.layout}>
                {/*<SnackbarProvider maxSnack={5} preventDuplicate>*/}
                {children}
                {/*</SnackbarProvider>*/}
                <ToastContainer/>
            </Container>
        </Box>
    );
};

export default Layout;
