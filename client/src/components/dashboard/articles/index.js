import AdminLayout from "../../../hoc/adminLayout";
import PaginationComponent from "./paginationComponent";
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {changeStatusArticle, getPaginateArticles, removeArticle} from "../../../store/actions/articles_actions";
import {
    Button,
    ButtonGroup,
    Dialog,
    DialogActions,
    DialogContent,
    FormControl,
    FormGroup,
    Paper
} from "@material-ui/core";
import {Link as RouterLink, useHistory} from 'react-router-dom';


const Articles = (props) => {
    const articles = useSelector(state => state.articles);
    const dispatch = useDispatch();
    const [removeAlert, setRemoveAlert] = useState(false);
    const [toRemove, setToRemove] = useState(null)
    const notifications = useSelector(state=>state.notifications)
    const history = useHistory();
    let arts = articles.adminArticles;

    useEffect(() => {
        setRemoveAlert(false)
        if (notifications && notifications.removeArticle) {
            dispatch(getPaginateArticles())
        }
    }, [dispatch, notifications, arts])

    useEffect(()=>{
        dispatch(getPaginateArticles())
    },[dispatch])


    const editArtsAction = (id) => {
        console.log(`/dashboard/articles/edit/${id}`)
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
        dispatch(getPaginateArticles(page))
    }

    return (
        <AdminLayout section="Articles">
            <div className="articles_table">
                <div className="mb-3">
                    <ButtonGroup>
                        <Button variant="outlined"
                                color={'secondary'}
                                component={RouterLink}
                                to={'/dashboard/articles/add'}>
                            Add article
                        </Button>
                    </ButtonGroup>
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
                    editArticle = {(id)=> editArtsAction(id)}
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
