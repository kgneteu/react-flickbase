import React, {useEffect, useRef, useState} from 'react';
import {FieldArray, FormikProvider, useFormik} from 'formik';
import {useDispatch, useSelector} from 'react-redux';
import {formValues, validation} from './validationSchema';
import {Loader} from "../../../utils/loader";
import {clearCurrentArticle, getAdminArticle, updateArticle} from "../../../store/actions/articles_actions";
import AdminLayout from "../../../hoc/adminLayout";
import {getCategories} from "../../../store/actions/categories_actions";
import {
    Chip, Divider,
    FormControl,
    FormGroup,
    FormHelperText, IconButton,
    InputBase,
    MenuItem,
    Paper,
    Select,
    TextField
} from "@material-ui/core";
import SubmitButton from "../../UI/submitButton";
import WYSIWYG from "../../UI/wysiwyg";
import AddIcon from '@material-ui/icons/Add';

const EditArticle = (props) => {
    const dispatch = useDispatch();
    const notifications = useSelector(state => state.notifications);
    const articles = useSelector(state => state.articles);
    const categories = useSelector(state => state.categories.categories);


    const [isSubmitting, setIsSubmitting] = useState(false);
    const [editorBlur, setEditorBlur] = useState(false);
    const [formData, setFormData] = useState(formValues);
    const actorsValue = useRef('');
    const [editContent, setEditContent] = useState(null);

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: formData,
        validationSchema: validation,
        onSubmit: (values, {resetForm}) => {

            setIsSubmitting(true);
            dispatch(updateArticle(values, props.match.params.id))
        },

    });


    const handleEditorState = (state) => {
        formik.setFieldValue('content', state, true)
    }

    const handleEditorBlur = (blur) => {
        setEditorBlur(true)
    }


    useEffect(() => {
        if (notifications && notifications.success) {
            props.history.push('/dashboard/articles');
        }
        if (notifications && notifications.error) {
            setIsSubmitting(false);
        }
    }, [notifications, props.history])

    //// edit ///
    useEffect(() => {
        dispatch(getAdminArticle(props.match.params.id))
    }, [dispatch, props.match.params])

    useEffect(() => {
        if (articles && articles.article) {
            setFormData(articles.article);
            setEditContent(articles.article.content)
        }
    }, [articles])
    /// edit ///

    useEffect(() => {
        return () => {
            dispatch(clearCurrentArticle());
        }
    }, [dispatch])


    useEffect(() => {
        dispatch(getCategories());
    }, [dispatch])

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

    if (!articles.article) {
        return <Loader/>
    }

    return (
        <AdminLayout section="Edit article">
            {isSubmitting ?
                <Loader/>
                :
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
                            editContent={editContent}
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

                    <Divider className="mt-3 mb-3"/>
                    <FormControl variant="outlined">
                        <h5>Select a category</h5>
                        <Select
                            name="category"
                            {...formik.getFieldProps('category')}
                            error={formik.errors.category && formik.touched.category ? true : false}
                        >
                            <MenuItem value="">
                                <em>None</em>
                            </MenuItem>
                            {categories ?
                                categories.map((item) => (
                                    <MenuItem key={item._id} value={item._id}>
                                        {item.name}
                                    </MenuItem>
                                ))
                                : null}
                        </Select>
                        {formik.errors.category && formik.touched.category ?
                            <FormHelperText error={true}>
                                {formik.errors.category}
                            </FormHelperText>
                            : null}
                    </FormControl>

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
                            render={ arrayhelpers => (
                                <div>
                                    <Paper>
                                        <InputBase
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
                                    { formik.errors.actors && formik.touched.actors ?
                                        <FormHelperText error={true}>
                                            {formik.errors.actors}
                                        </FormHelperText>
                                        :null}

                                    <FormGroup row>
                                        { formik.values.actors.map((actor,index)=>(
                                            <div key={actor+index}>
                                                <Chip
                                                    label={`${actor}`}
                                                    color="primary"
                                                    onDelete={()=> arrayhelpers.remove(index)}
                                                />
                                            </div>
                                        ))}
                                    </FormGroup>
                                </div>
                            )}
                        />
                    </FormikProvider>


                    <div className="form-group">
                        <TextField
                            label="Enter a director"
                            {...formik.getFieldProps('director')}
                            {...fieldProps(formik, 'director')}
                        />
                    </div>

                    <FormControl variant="outlined">
                        <h5>Select a status</h5>
                        <Select
                            name="status"
                            {...formik.getFieldProps('status')}
                            error={formik.errors.status && formik.touched.status ? true:false}
                        >
                            <MenuItem value="">
                                <em>None</em>
                            </MenuItem>
                            <MenuItem value="draft">Draft</MenuItem>
                            <MenuItem value="public">Public</MenuItem>
                        </Select>
                        { formik.errors.status && formik.touched.status ?
                            <FormHelperText error={true}>
                                {formik.errors.status}
                            </FormHelperText>
                            :null}
                    </FormControl>
                    {/*onClick={() => setEditorBlur(true)}*/}
                    <div className="form-group">
                        <SubmitButton onClick={() => setEditorBlur(true)}>Update article</SubmitButton>
                    </div>
                </form>
            }


        </AdminLayout>
    )
}

export default EditArticle;
