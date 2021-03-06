import * as ActionType from "./../actionTypes"
import axios from 'axios';
import {errorGlobal, successGlobal} from "./notification_actions";
import {getAuthHeader} from "../../utils/tools";

axios.defaults.headers.post['Content-Type'] = 'application/json'

//axios.defaults.baseURL='http://localhost:3001';


const getArticlesDone = (articles) => {
    return {
        type: ActionType.GET_ARTICLES,
        payload: articles,
    }
}

export const getArticles = (sort) => {
    return async (dispatch, getState) => {
        try {

            const prevArts = getState().articles?.articles?.docs;
            if (prevArts) {
                sort.skip = prevArts.length;
            }
            const arts = await axios.post('/api/articles/load_more', sort);
            let newArts = [...arts.data];

            if (prevArts) {
                newArts = [...prevArts, ...arts.data];
            }
            const nomore = arts.data.length <= 0;

            dispatch(getArticlesDone({docs: newArts, nomore: nomore}))
        } catch (error) {
            dispatch(errorGlobal('Error loading articles'))
            console.log(error)
        }
    }
};


const getArticleDone = (article) => {
    return {
        type: ActionType.GET_ARTICLE,
        payload: article,
    }
}


export const getArticle = (id) => {
    return async (dispatch) => {
        try {
            const article = await axios.get('/api/articles/id/' + id);
            dispatch(getArticleDone(article.data[0]))
        } catch (error) {
            dispatch(errorGlobal('Error loading article'))
            console.log(error)
        }
    }
};

export const clearCurrentArticle = () => {
    return {
        type: ActionType.CLEAR_CURRENT_ARTICLE,
    }
}

export const addArticleSuccess = (article) => ({
    type: ActionType.ADD_ARTICLE,
    payload: article
})


export const addArticle = (article) => {
    return async (dispatch) => {
        try {

            const request = await axios.post(`/api/articles/admin/add_article`, article, getAuthHeader());
            dispatch(addArticleSuccess(request.data));
            dispatch(successGlobal('Good obi one !!'))
        } catch (error) {
            dispatch(errorGlobal(error.response.data.message))
        }
    }
}


export const getPaginateArticlesSuccess = (articles) => ({
    type: ActionType.GET_ADMIN_ARTICLES,
    payload: articles
})

export const getPaginateArticles = (options = {}) => {
    const {page = 1, limit = 5, keywords = ''} = options;

    return async (dispatch) => {
        try {
            const request = await axios.post(`/api/articles/admin/paginate`, {
                page,
                limit,
                keywords
            }, getAuthHeader());

            dispatch(getPaginateArticlesSuccess(request.data))
        } catch (error) {
            dispatch(errorGlobal(error.response.data.message))
        }
    }
}

export const updateArticleStatus = (articles) => ({
    type: ActionType.UPDATE_ARTICLE_STATUS,
    payload: articles
})

export const changeStatusArticle = (status, _id) => {
    return async (dispatch, getState) => {
        try {
            const article = await axios.patch(`/api/articles/admin/${_id}`, {
                status
            }, getAuthHeader());

            let art = article.data;
            let state = getState().articles.adminArticles.docs; /// previous state
            let position = state.findIndex(art => art._id === _id); /// find the position
            state[position] = art;

            dispatch(updateArticleStatus(state));
            dispatch(successGlobal('Cool !!'));
        } catch (error) {
            dispatch(errorGlobal(error.response.data.message));
        }
    }
}

export const removeArticleSuccess = () => ({
    type: ActionType.REMOVE_ARTICLE
})

export const removeArticle = (id) => {
    return async (dispatch) => {
        try {
            await axios.delete(`/api/articles/admin/${id}`, getAuthHeader());
            dispatch(removeArticleSuccess());
            dispatch(successGlobal('Article was removed.'));
        } catch (error) {
            dispatch(errorGlobal(error.response.data.message));
        }
    }
}

export const getAdminArticle = (id) => {
    return async (dispatch) => {
        try {
            const request = await axios.get(`/api/articles/admin/${id}`, getAuthHeader());
            dispatch(getArticleDone(request.data))
        } catch (error) {
            dispatch(getArticle(error.response.data.message))
        }
    }
}

export const updateArticle = (article, id) => {
    return async (dispatch) => {
        try {
            const newArticle = await axios.patch(`/api/articles/admin/${id}`, article, getAuthHeader());
            dispatch(getArticleDone(newArticle.data));
            dispatch(successGlobal('Update done !!'))
        } catch (error) {
            dispatch(errorGlobal('Error, try again !'))
        }
    }
}


const searchArticlesDone = (articles) => {
    return {
        type: ActionType.SEARCH_ARTICLES,
        payload: articles,
    }
}

export const searchArticles = (keywords) => {
    return async (dispatch) => {
        try {
            const articles = await axios.get('/api/articles/search?keywords=' + encodeURIComponent(keywords));
            dispatch(searchArticlesDone(articles.data))
        } catch (error) {
            dispatch(errorGlobal('Error loading articles'))
            console.log(error)
        }
    }
};
