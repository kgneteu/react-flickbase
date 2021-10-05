import {useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {clearCurrentArticle, getArticle} from "../../store/actions/articles_actions";
import {Loader} from "../../utils/loader";
import {Box} from "@material-ui/core";
import ScoreCard from "../UI/scoreCard";


const Article = () => {
    const params = useParams();
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);
    const article = useSelector(state => state.articles.article)

    useEffect(() => {
        dispatch(getArticle(params.id))
        return ()=>{
            dispatch(clearCurrentArticle())
        }
    }, [dispatch, params.id]);

    useEffect(() => {
        //article clearead by redux
        //if (article && article._id === params.id) setLoading(false)
        if (article) setLoading(false)
    }, [article, params.id])

    if (loading) return <Loader/>

    return (
        <Box>
            <h1>{article.title}</h1>
            <img src={"http://loremflickr.com/1920/1080"} style={{width: '100%', height: 'auto'}}/>
            <p>{article.content}</p>
            <ScoreCard current={article}/>
        </Box>
    );
};

export default Article;
