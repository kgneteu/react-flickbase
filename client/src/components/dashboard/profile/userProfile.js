import React from 'react';
import {useFormik} from 'formik';
import {useDispatch, useSelector} from 'react-redux';


import {Button, Container, TextField} from '@material-ui/core'
import {updateUserProfile} from "../../../store/actions/user_actions";


const UserProfile = () => {
    const {firstname, lastname, age} = useSelector(state => state.user.data)
    const dispatch = useDispatch();

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {firstname, lastname, age},
        onSubmit: (values, {resetForm}) => {
            dispatch(updateUserProfile(values))
        }
    });

    function fieldProps(formik, title) {
        return {
            variant: 'outlined',
            fullWidth: true,
            error: Boolean(formik.errors[title] && formik.touched[title]),
            helperText: formik.errors[title] && formik.touched[title] && formik.errors[title],
            name: title,
            margin: 'normal'
        }
    }

    return (
        <Container maxWidth={'xs'} style={{marginLeft: 0}}>
            <form onSubmit={formik.handleSubmit}>

                    <TextField
                        label="Enter your firstname"
                        {...formik.getFieldProps('firstname')}
                        {...fieldProps(formik, 'firstname')}
                    />


                    <TextField
                        label="Enter your lastname"
                        {...formik.getFieldProps('lastname')}
                        {...fieldProps(formik, 'lastname')}
                    />


                    <TextField
                        label="Enter your age"
                        {...formik.getFieldProps('age')}
                        {...fieldProps(formik, 'age')}
                    />

                    <Button
                        className="mb-3"
                        variant="contained"
                        color="primary"
                        type="submit"
                    >
                        Update profile
                    </Button>

            </form>
        </Container>
    )
}

export default UserProfile;
