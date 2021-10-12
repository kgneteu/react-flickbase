import * as PropTypes from "prop-types";
import {Button, ButtonGroup, Dialog, DialogActions, DialogContent, DialogTitle, TextField} from "@material-ui/core";
import {useFormik} from "formik";
import * as yup from 'yup'
import {fieldProps} from "../../../utils/tools";
import {addCategory} from "../../../store/actions/categories_actions";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";

function AddCategoryDialog({open, setVisible}) {
    const dispatch = useDispatch();

    const notifications = useSelector(state => state.notifications)
    const formik = useFormik({
        initialValues: {
            name: ''
        },
        validationSchema: yup.object({
            name: yup.string().required(),
        }),
        onSubmit: values => {
            dispatch(addCategory(values))
        }
    })

    useEffect(() => {
        if (notifications) {
            if (notifications.success) {
                formik.resetForm()
                setVisible(false);
            }
        }
    }, [notifications, formik, setVisible])

    const closeDialogHandler = (event) => {
        event.preventDefault()
        formik.resetForm()
        setVisible(false);
    }
    return (
        <Dialog open={open} onClose={closeDialogHandler}>
            <DialogTitle>Add category</DialogTitle>
            <form onSubmit={formik.handleSubmit}>
                <DialogContent>
                    <TextField {...fieldProps(formik, 'name', 'Category name')}/>
                </DialogContent>
                <DialogActions>
                    <ButtonGroup variant={'contained'} fullWidth>
                        <Button type="submit" size={'large'} color={'primary'}>Save</Button>
                        <Button type="reset" onClick={closeDialogHandler} size={'large'}
                                color={'secondary'}>Cancel</Button>
                    </ButtonGroup>
                </DialogActions>
            </form>
        </Dialog>)
}

AddCategoryDialog.propTypes = {
    setVisible: PropTypes.func,
    open: PropTypes.bool
};

export default AddCategoryDialog;
