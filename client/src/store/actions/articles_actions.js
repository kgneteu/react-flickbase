import * as ActionType from "./../actionTypes"
import axios from 'axios';
import {errorGlobal, successGlobal} from "./notification_actions";
import {getAuthHeader} from "../../utils/tools";
//axios.defaults.headers.post['Content-Type'] = 'application/json'

//axios.defaults.baseURL='http://localhost:3001';

// import * as articles from './index';
// import axios from 'axios';
//
// axios.defaults.headers.post['Content-Type'] = 'application/json'
//
// export const getArticles = (sort) => {
//     return async(dispatch,getState)=>{
//         try{
//             const arts = await axios.post(`/api/articles/loadmore`,sort);
//
//             dispatch(articles.getArticles(arts.data))
//         } catch(error){
//
//         }
//     }
// }

const setArticles = (articles) => {
    return {
        type: ActionType.GET_ARTICLES,
        payload: articles,
    }
}

export const getArticles = (sort) => {
    return async (dispatch, getState) => {
        try {
            const arts = await axios.post('/api/articles/load_more', sort);
            const prevArts = getState().articles.articles;
            let newArts = [...arts.data];

            if (prevArts) {
                newArts = [...prevArts, ...arts.data];
            }
            dispatch(setArticles(newArts))
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
            const article = await axios.get('/api/articles/' + id);
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
