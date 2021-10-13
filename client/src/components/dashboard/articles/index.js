import AdminLayout from "../../../hoc/adminLayout";
import PaginationComponent from "./paginationComponent";
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {changeStatusArticle, getPaginateArticles, removeArticle} from "../../../store/actions/articles_actions";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    FormControl,
    FormGroup,
    Grid,
    InputAdornment,
    Paper,
    TextField
} from "@material-ui/core";
import {Link as RouterLink, useHistory} from 'react-router-dom';
import SearchIcon from '@material-ui/icons/Search';

const Articles = () => {
    const articles = useSelector(state => state.articles);
    const dispatch = useDispatch();
    const [removeAlert, setRemoveAlert] = useState(false);
    const [toRemove, setToRemove] = useState(null)
    const notifications = useSelector(state => state.notifications)
    const history = useHistory();
    const [keywords, setKeywords] = useState('');
    let arts = articles.adminArticles;
    let delayedSearch;

    useEffect(() => {
        setRemoveAlert(false)
        if (notifications && notifications.removeArticle) {
            dispatch(getPaginateArticles(keywords))
        }
    }, [dispatch, notifications, arts, keywords])

    useEffect(() => {
        dispatch(getPaginateArticles())
    }, [dispatch])


    const editArtsAction = (id) => {
        history.push(`/dashboard/articles/edit/${id}`)
    }


    const handleShow = (id = null) => {
        setToRemove(id)
        setRemoveAlert(true)
    }

    const handleDelete = () => {
        dispatch(removeArticle(toRemove))
    }

    const handleStatusChange = (status, _id) => {

        let newStatus = status === 'draft' ? 'public' : 'draft';
        dispatch(changeStatusArticle(newStatus, _id))
    }

    const goToNextPage = (page) => {
        dispatch(getPaginateArticles({page, keywords}))
    }

    const searchChangeHandler = (event) => {
        event.preventDefault();
        clearTimeout(delayedSearch);
        const kw = event.target.value;
        delayedSearch = setTimeout(() => {
            //console.log(kw)
            setKeywords(kw);
            dispatch(getPaginateArticles({keywords: kw}))
        }, 300)
    }
    return (
        <AdminLayout section="Articles">
            <div className="articles_table">
                <div className="mb-3">
                    <Grid container>
                        <Button
                            variant={'outlined'}
                            style={{marginRight: '1rem'}}
                            color={'secondary'}
                            component={RouterLink}
                            to={'/dashboard/articles/add'}>
                            Add article
                        </Button>
                        <TextField
                            variant={'outlined'}
                            size={'small'}
                            placeholder={'search...'}
                            onChange={searchChangeHandler}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <SearchIcon/>
                                    </InputAdornment>
                                ),
                            }}
                        />

                    </Grid>
                    <form onSubmit={() => alert('search')}>
                        <FormGroup>
                            {/*<InputGroup.Prepend>*/}
                            {/*    <InputGroup.Text id="btnGroupAddon2">@</InputGroup.Text>*/}
                            {/*</InputGroup.Prepend>*/}
                            <FormControl
                                type="text"
                                placeholder="Example"

                            />
                        </FormGroup>
                    </form>
                </div>
                <PaginationComponent
                    arts={arts}
                    next={(page) => goToNextPage(page)}
                    handleStatusChange={(status, id) => handleStatusChange(status, id)}
                    editArticle={(id) => editArtsAction(id)}
                    handleShow={id => handleShow(id)}
                />

            </div>
            <Dialog
                open={removeAlert}
                onClose={() => setRemoveAlert(false)}
            >
                <DialogContent>
                    <Paper>
                        <p>Are you really sure ?</p>
                    </Paper>
                </DialogContent>
                <DialogActions>
                    <Button variant={"contained"} size={"large"}
                            onClick={() => handleDelete()}>Yes</Button>
                    <Button variant={"contained"} size={"large"}
                            onClick={() => setRemoveAlert(false)}>No</Button>
                </DialogActions>
            </Dialog>
        </AdminLayout>
    );
};

export default Articles;
