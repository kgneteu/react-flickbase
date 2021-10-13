import {useLocation} from "react-router-dom";
import {useEffect, useState} from "react";
import {Loader} from "../../utils/loader";
import {useDispatch, useSelector} from "react-redux";
import {searchArticles} from "../../store/actions/articles_actions";
import {Grid} from "@material-ui/core";
import ArticleCard from "../UI/articleCard";

const SearchPage = () => {
    const location = useLocation();
    const searchQuery = new URLSearchParams(location.search);
    const dispatch = useDispatch();
    const articles = useSelector(state => state.articles?.userSearch)
    console.log(articles)

    const [loading, setLoading] = useState(true);
    const keywords = searchQuery.get('keywords');


    useEffect(() => {
        if (keywords !== '') {
            dispatch(searchArticles(keywords))
        }
    }, [keywords, dispatch])

    useEffect(() => {
        if (articles && articles.docs) {
            setLoading(false)
        }
    }, [articles])

    if (keywords === '') {
        return <h1> No kewords to search</h1>
    }
    if (loading) return <Loader/>

    if (articles && articles.docs && articles.docs.length === 0) {
        return (
            <Grid container spacing={2}><h1>Nothing was found!</h1></Grid>
        )
    }
    return (
        <Grid container spacing={2}>
            {articles && articles.docs &&
            articles.docs.map(article => (
                <Grid key={article._id} item xs={12} sm={6} lg={3}>
                    <ArticleCard article={article}/>
                </Grid>
            ))}
        </Grid>
    );
};

export default SearchPage;
