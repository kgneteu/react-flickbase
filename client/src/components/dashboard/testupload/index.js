import React, {useEffect} from 'react';
import AdminLayout from '../../../hoc/adminLayout';
import {useFormik} from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import {Button} from "@material-ui/core";
import {useDispatch, useSelector} from "react-redux";
import {errorGlobal, successGlobal} from "../../../store/actions/notification_actions";
import {siteTest} from "../../../store/actions/site_actions";


const TestUpload = () => {
    const dispatch = useDispatch()
    console.log('render');
    const test = useSelector(state => state.site.test);
    useEffect(() => {
        console.log('init')
        //dispatch(siteTest(1))
    }, [dispatch])

    useEffect(() => {
        console.log('test in', test)
        if (test) {
            console.log('test changed', test)
            dispatch(siteTest(test + 1))
        } else {
            dispatch(siteTest(1))
        }
    }, [dispatch, test]);


    const formik = useFormik({
        initialValues: {archivo: '', archivo_c: ''},
        validationSchema: Yup.object({
            archivo: Yup.mixed(),
            archivo_c: Yup.mixed()
        }),
        onSubmit: (values) => {
            let formData = new FormData();
            if (values.archivo) {
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
            } else {
                formData.append("file", values.archivo_c)
                console.log(values.archivo)
                /// multer
                axios.post('/api/files/cloudinary_upload', formData, {
                    header: {'content-type': 'multipart/form-data'}
                }).then(response => {
                    dispatch(successGlobal('File uploaded'))
                }).catch(error => {
                    dispatch(errorGlobal(error.toString()))
                })
            }
        }
    })

    const errorHelper = (formik, values) => ({
        error: formik.errors[values] && formik.touched[values] ? true : false,
        helperText: formik.errors[values] && formik.touched[values] ? formik.errors[values] : null
    });

    return (
        <AdminLayout section="Test upload">
            <form onSubmit={formik.handleSubmit}>

                <Button
                    variant="contained"
                    component="label"
                    name='archivo'
                >
                    Upload File to server
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


                <Button
                    variant="contained"
                    component="label"
                    name='archivo_c'
                >
                    Upload File to Cloudinary
                    <input
                        type="file"
                        hidden
                        onChange={(event) => {
                            console.log(event.target.files[0])
                            formik.setFieldValue("archivo_c", event.target.files[0])
                        }}
                    />
                </Button>

                {formik.errors.archivo_c && formik.touched.archivo_c ?
                    <>Error</>
                    : null
                }

                <Button variant="contained" type="submit">
                    Submit
                </Button>
            </form>
        </AdminLayout>
    )
}

export default TestUpload;
