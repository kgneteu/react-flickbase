import * as ActionType from "./../actionTypes"
import axios from 'axios';
import {errorGlobal} from "./notification_actions";
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
            const arts  = await axios.post('/api/articles/load_more', sort);
            const prevArts = getState().articles.articles;
            let newArts = [...arts.data];

            if(prevArts){
                newArts = [...prevArts,...arts.data];
            }
            dispatch(setArticles(newArts))
        } catch (error) {
            dispatch(errorGlobal('Error loading articles'))
            console.log(error)
        }
    }
};
