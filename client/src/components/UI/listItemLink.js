import {ListItem} from "@material-ui/core";
import React from "react";
import * as PropTypes from "prop-types";
import RouterLink from './../../utils/routerLink'

export function ListItemLink({to, ...props}) {
    return (
        <ListItem button component={RouterLink} to={to} {...props}>{props.children}</ListItem>
    )
}

ListItemLink.propTypes = {
    to: PropTypes.string,
    children: PropTypes.node
};

