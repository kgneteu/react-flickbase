import * as ActionType from "./../actionTypes"
import axios from "axios";

import {errorGlobal, successGlobal} from "./notification_actions";
import {getAuthHeader} from "../../utils/tools";

const getCategoriesDone = (categories) => {
    return {
        type: ActionType.GET_CATEGORIES,
        payload: categories,
    }
}

export const getCategories = () => {
    return async(dispatch)=>{
        try{
            const categories =  await axios.get('/api/articles/categories');
            dispatch(getCategoriesDone(categories.data))
        } catch(error) {
            dispatch(errorGlobal('Error, try again !'))
        }
    }
}

const addCategoryDone = (categories) => {
    return {
        type: ActionType.GET_CATEGORIES,
        payload: categories,
    }
}


export const addCategory = (values) => {
    return async(dispatch, getState)=>{
        try{
            const category = await axios.post(`/api/articles/categories`, values,getAuthHeader());
            let newState = [
                ...getState().categories.categories,
                category.data
            ]
            dispatch(addCategoryDone(newState))
            dispatch(successGlobal('Category added !!'))
        } catch(error) {
            dispatch(errorGlobal('Error, try again !'))
        }
    }
}
