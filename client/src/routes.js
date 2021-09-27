import {BrowserRouter, Route, Switch} from "react-router-dom";
import Home from "./components/home";
import {ThemeProvider} from '@material-ui/core/styles';
import {createTheme, CssBaseline} from "@material-ui/core";

// const theme = {
//     background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
// };

let theme = createTheme({
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
});



const Routes = () => (
    <ThemeProvider theme={theme}>
        <CssBaseline/>
        <BrowserRouter>
            <Switch>
                <Route path='/' component={Home}/>
            </Switch>
        </BrowserRouter>
    </ThemeProvider>
);

export default Routes;
