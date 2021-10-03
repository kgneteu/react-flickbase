import {useFormik} from "formik";
import * as yup from 'yup'
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import * as User from "./../../store/actions/user_actions"
import {useHistory} from "react-router-dom";
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import {
    Avatar,
    Button,
    Checkbox,
    Container,
    CssBaseline,
    FormControlLabel,
    TextField,
    Typography
} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";


const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

const Auth = (props) => {
    const [register, setRegister] = useState(false);
    const dispatch = useDispatch();
    const notification = useSelector(state => state.notifications)
    const history = useHistory();
    const classes = useStyles();

    useEffect(() => {
        if (notification && notification.success) {
            history.push('/')
        }
    }, [notification, history]);


    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema: yup.object({
            email: yup.string().email('This is not a valid email').required(),
            password: yup.string().min(6, 'Password should contain at least 6 characters').required(),
        }),
        onSubmit: (values, {resetForm}) => {
            handleSubmit(values)
        }
    })

    const handleSubmit = (values) => {
        if (register) {
            dispatch(User.registerUser({email: values.email, password: values.password}))
        } else {
            dispatch(User.loginUser({email: values.email, password: values.password}))
        }
    }

    function errorHelper(formik, value) {
        return {
            error: formik.errors[value] && formik.touched[value],
            helperText: formik.errors[value]
        }
    }

    return (
        <Container maxWidth={'xs'}>
            <CssBaseline/>
            <div className={classes.paper}>
            <Avatar className={classes.avatar}>
                <LockOutlinedIcon />
            </Avatar>

            <Typography variant={'h5'} component={'h1'}>Authenticate</Typography>
            <form className={classes.form}
                onSubmit={formik.handleSubmit}>

                <TextField variant={'outlined'}
                           fullWidth
                           autoFocus
                           required
                           margin="normal"
                           autoComplete="email"
                           label='Enter your email'
                           {...errorHelper(formik, 'email')}
                           {...formik.getFieldProps('email')}/>


                <TextField variant={'outlined'}
                           label='Password'
                           fullWidth
                           required
                           margin="normal"
                           type={'password'}
                           autoComplete="current-password"
                           {...errorHelper(formik, 'password')}
                           {...formik.getFieldProps('password')}/>
                <FormControlLabel
                    control={<Checkbox value="remember" color="primary"/>}
                    label="Remember me"
                />

                <Button
                    variant="contained"
                    color={'primary'}
                    size={'large'}
                    type={'submit'}
                    className={classes.submit}
                    fullWidth
                >
                    {register ? 'Register' : 'Login'}
                </Button>
                <Button
                    color={'primary'}
                    size={'large'}
                    fullWidth
                    onClick={() => setRegister(!register)}>
                    {register ? 'Want to login ?' : 'Want to register?'}
                </Button>
            </form>
            </div>
        </Container>
    );
};

export default Auth;
