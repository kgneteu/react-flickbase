import {TextField} from "@material-ui/core";
import React from "react";
import {useFormik} from "formik";
import * as yup from 'yup'
import {useHistory} from "react-router-dom";

const NavSearch = ({onClose}) => {
    const history = useHistory();
    const formik = useFormik({
        initialValues:{
            keywords: '',
        },
        validationSchema: yup.object({
            keywords: yup.string().required('Enter som keywords')
        }),
        onSubmit:  values => {
            onClose();
            history.push('/search?keywords='+encodeURIComponent(values.keywords))
        }
    });

    return (
            <form style={{margin: 20}} onSubmit={formik.handleSubmit}>
                <TextField label={"Search movie"}
                           variant={"outlined"}
                           {...formik.getFieldProps('keywords')}
                />
            </form>
    );
};

export default NavSearch;
