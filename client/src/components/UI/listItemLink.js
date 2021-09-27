import {ListItem} from "@material-ui/core";
import {Link as RouterLink} from "react-router-dom";
import React from "react";
import * as PropTypes from "prop-types";

export function ListItemLink({to, ...props}) {
    return (
        <ListItem button component={RouterLink} to={to} {...props}>{props.children}</ListItem>
    )
}

ListItemLink.propTypes = {
    to: PropTypes.string,
    children: PropTypes.node
};

