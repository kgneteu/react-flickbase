import {createTheme, ThemeProvider} from "@material-ui/core/styles";
import React from "react";
import {blue} from "@material-ui/core/colors";


const theme = createTheme({
    palette: {
        type: 'light',
        neutral: {
            main: blue["500"],
        },
        primary: {
            main: blue["600"],
        },
    },
    overrides: {
        MuiAppBar: {
            colorInherit: {
                backgroundColor: '#fff',
                color: '#000',
            },
        },
    },
    props: {
        MuiAppBar: {
            color: 'inherit',
            position: 'static',
        },
        MuiTooltip: {
            arrow: true,
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
