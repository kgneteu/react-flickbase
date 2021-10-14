import React from 'react';
import AdminLayout from '../../../hoc/adminLayout';
import {useFormik} from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import {Button, FormGroup} from "@material-ui/core";
import {useDispatch} from "react-redux";
import {errorGlobal, successGlobal} from "../../../store/actions/notification_actions";


const TestUpload = () => {
    const dispatch = useDispatch()
    const formik = useFormik({
        initialValues: {archivo: ''},
        validationSchema: Yup.object({
            archivo: Yup.mixed().required('A file is required')
        }),
        onSubmit: (values) => {
            let formData = new FormData();
            formData.append("file", values.archivo)
            console.log(values.archivo)
            /// multer
            axios.post('/api/files/multerupload', formData, {
                header: {'content-type': 'multipart/form-data'}
            }).then(response => {
                dispatch(successGlobal('File uploaded'))
            }).catch(error => {
                dispatch(errorGlobal(error.toString()))
            })

            /// cloudinary
            // axios.post('/api/files/testupload', formData, {
            //     header: {'content-type': 'multipart/form-data'}
            // }).then(response => {
            //     console.log(response)
            // }).catch(error => {
            //     console.log(error)
            // })
        }
    })

    const errorHelper = (formik, values) => ({
        error: formik.errors[values] && formik.touched[values] ? true : false,
        helperText: formik.errors[values] && formik.touched[values] ? formik.errors[values] : null
    });

    return (
        <AdminLayout section="Test upload">
            <form onSubmit={formik.handleSubmit}>
                <FormGroup>
                    <Button
                        variant="contained"
                        component="label"
                        name='archivo'
                    >
                        Upload File
                        <input
                            type="file"
                            hidden
                            onChange={(event) => {
                                console.log(event.target.files[0])
                                formik.setFieldValue("archivo", event.target.files[0])
                            }}
                        />
                    </Button>

                    {formik.errors.archivo && formik.touched.archivo ?
                        <>Error</>
                        : null
                    }
                </FormGroup>
                <Button variant="contained" type="submit">
                    Submit
                </Button>
            </form>
        </AdminLayout>
    )
}

export default TestUpload;
