import {useFormik} from "formik";
import {Button, Container, TextField} from "@material-ui/core";
import * as yup from 'yup'
import {useEffect, useState} from "react";
import {Loader} from "../../utils/loader";
import {useDispatch, useSelector} from "react-redux";
import {contact} from "../../store/actions/user_actions";
import {fieldProps} from "../../utils/tools";

const ContactForm = () => {
    const [loading, setLoading] = useState(false);
    const notifications = useSelector(state => state.notifications)
    const dispatch = useDispatch();
    const formik = useFormik({
        initialValues: {
            email:'',
            firstname:'',
            lastname:'',
            message:'',
        },
        validationSchema: yup.object({
            email: yup.string().email().required(),
            firstname: yup.string().max(60).required(),
            lastname: yup.string().max(60).required(),
            message: yup.string().max(500).required(),
        }),
        onSubmit: values => {
            setLoading(true)
            dispatch(contact(values))
        }
    })

    useEffect(() => {
        if (notifications && notifications.success) {
            setLoading(false)
            formik.resetForm();
        } else if (notifications && notifications.error) {
            setLoading(false)
        }
    }, [notifications, formik]);


    if (loading) return <Loader/>
    return (
        <Container maxWidth={'xs'}>
            <form onSubmit={formik.handleSubmit}>
                <TextField {...fieldProps(formik, 'email', 'Enter your email')}/>
                <TextField {...fieldProps(formik, 'firstname', 'Enter your first name')}/>
                <TextField {...fieldProps(formik, 'lastname', 'Enter your last name')}/>
                <TextField {...fieldProps(formik, 'message', 'Enter your message')}
                           rows={5} multiline
                />
                <Button variant={'contained'} size={'large'} color={'primary'} type={'submit'}>Send</Button>
            </form>
        </Container>
    );
};

export default ContactForm;
