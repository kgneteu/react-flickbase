import AdminLayout from "../../../hoc/adminLayout";
import {FieldArray, FormikProvider, useFormik} from "formik";
import {
    Button,
    Chip,
    Divider,
    FormControl, FormGroup,
    FormHelperText,
    IconButton,
    InputBase,
    MenuItem,
    Paper,
    Select,
    TextField
} from "@material-ui/core";
import {formValues, validation} from './validationSchema'
import AddIcon from '@material-ui/icons/Add';
import {useEffect, useRef, useState} from "react";
import WYSIWYG from "../../UI/wysiwyg";
import {useDispatch, useSelector} from "react-redux";
import {addArticle} from "../../../store/actions/articles_actions";
import {useHistory} from "react-router-dom";
import {Loader} from "../../../utils/loader";

function SubmitButton({children, ...props}) {
    return <Button
        margin={'normal'}
        variant="contained"
        color="primary"
        type="submit"
        {...props}
    >
        {children}
    </Button>;
}

const AddArticle = (props) => {
    const [editorBlur,setEditorBlur] = useState(false);
    const actorsValue = useRef('');
    const dispatch = useDispatch()
    const notifications = useSelector(state=>state.notifications)
    const history = useHistory();
    const [submitting, setSubmitting] = useState(false);

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: formValues,
        validationSchema: validation,
        onSubmit: (values, {resetForm}) => {
            setSubmitting(true)
            dispatch(addArticle(values))
        }
    })

    useEffect(() => {
        if(notifications && notifications.success){
            history.push('/dashboard/articles');
        }
        if(notifications && notifications.error){
            setSubmitting(false);
        }
    }, [notifications, history]);


    const handleEditorState = (state) =>{
        formik.setFieldValue('content',state, true)
    }

    const handleEditorBlur = (blur) => {
        setEditorBlur(true)
    }

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
        <AdminLayout section="Add Article">
            {submitting ? <Loader/> :
            <form onSubmit={formik.handleSubmit}>

                <TextField
                    label="Enter a title"
                    {...formik.getFieldProps('title')}
                    {...fieldProps(formik, 'title')}
                />

                <div className="form-group">
                    <WYSIWYG
                        setEditorState={(state)=> handleEditorState(state)}
                        setEditorBlur={(blur)=> handleEditorBlur(blur)}
                    />

                    { formik.errors.content && editorBlur ?
                        <FormHelperText error={true}>
                            {formik.errors.content}
                        </FormHelperText>
                        :null}


                    <TextField
                        type="hidden"
                        name="content"
                        {...formik.getFieldProps('content')}
                    />

                </div>

                <TextField
                    label="Enter an excerpt"
                    {...formik.getFieldProps('excerpt')}
                    {...fieldProps(formik, 'excerpt')}
                    multiline
                    rows={4}
                />


                <Divider/>

                <h5>Movie data and score</h5>

                <TextField
                    label="Enter a score"
                    {...formik.getFieldProps('score')}
                    {...fieldProps(formik, 'score')}
                />

                <FormikProvider value={formik}>
                    <h5>Add the actors:</h5>
                    <FieldArray
                        name="actors"
                        render={arrayhelpers => (
                            <div>
                                <Paper>
                                    <InputBase
                                        margin={'dense'}
                                        inputRef={actorsValue}
                                        className="input"
                                        placeholder="Add actor name here"
                                    />
                                    <IconButton
                                        onClick={() =>
                                        {
                                            if (actorsValue.current.value.trim() !=='') {
                                                arrayhelpers.push(actorsValue.current.value)
                                                actorsValue.current.value = ''
                                            }
                                        }}
                                    >
                                        <AddIcon/>
                                    </IconButton>
                                </Paper>
                                {formik.errors.actors && formik.touched.actors ?
                                    <FormHelperText error={true}>
                                        {formik.errors.actors}
                                    </FormHelperText>
                                    : null}

                                <FormGroup row>
                                    {formik.values.actors.map((actor, index) => (
                                        <div key={actor+index}>
                                            <Chip
                                                label={`${actor}`}
                                                color="primary"
                                                onDelete={() => arrayhelpers.remove(index)}
                                            />
                                        </div>
                                    ))}
                                </FormGroup>
                            </div>
                        )}
                    />
                </FormikProvider>

                <TextField
                    label="Enter a director"
                    {...formik.getFieldProps('director')}
                    {...fieldProps(formik, 'director')}
                />


                <FormControl variant="outlined" margin={'normal'}>
                    <h5>Select a status</h5>
                    <Select
                        name="status"
                        {...formik.getFieldProps('status')}
                        error={formik.errors.status && formik.touched.status ? true : false}
                    >
                        <MenuItem value="">
                            <em>None</em>
                        </MenuItem>
                        <MenuItem value="draft">Draft</MenuItem>
                        <MenuItem value="public">Public</MenuItem>
                    </Select>
                    {formik.errors.status && formik.touched.status ?
                        <FormHelperText error={true}>
                            {formik.errors.status}
                        </FormHelperText>
                        : null}
                </FormControl>

                <Divider/>
                <SubmitButton onClick={()=>setEditorBlur(true)}>Add article</SubmitButton>
            </form>}
        </AdminLayout>
    );
};

export default AddArticle;
