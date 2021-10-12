import {createTheme, ThemeProvider} from "@material-ui/core/styles";
import React from "react";


const theme = createTheme({
    palette: {
        neutral: {
            main: '#64748B',
            contrastText: '#fff',
        },
    },
})

const MuiThemeProvider = (props) => {
    return (
        <ThemeProvider theme={theme}>
            {props.children}
        </ThemeProvider>
    );
};

export default MuiThemeProvider;
