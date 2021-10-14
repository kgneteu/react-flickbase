import {Grid} from "@material-ui/core";
import ArticleCard from "../UI/articleCard";
import {useCallback, useEffect, useRef} from "react";
import {useDispatch, useSelector} from "react-redux";
import {ArticleAction} from "./../../store/actions"


const sort = {sortBy: "_id", order: "desc", limit: 8, skip: 0};

const Home = () => {
    const articles = useSelector(state => state.articles)

    const dispatch = useDispatch();
    //usig reducer to change single value of sort parameters object (skip)
    const loader = useRef(null);

    useEffect(() => {
        if (articles && !articles.articles) {
            dispatch(ArticleAction.getArticles(sort))
        }
    }, [articles, dispatch])

    const setPage = useCallback(() => {

        if (articles.articles) {
            const nomore = articles.articles.nomore;
            if (!nomore){
                dispatch(ArticleAction.getArticles(sort));
            }
        }
    },[articles, dispatch])

    useEffect(() => {
        const handleObserver = (entities) => {
            const target = entities[0];
            if (target.isIntersecting) {
                setPage();
            }
        }

        const options = {
            root: null,
            rootMargin: "20px",
            threshold: 1.0
        };

        const observer = new IntersectionObserver(handleObserver, options);
        const obs = loader.current
        if (obs) {
            observer.observe(obs)
            return ()=>{
                observer.unobserve(obs)
            }
        }
    }, [setPage])


    return (
        <>

            <Grid container spacing={2}>
                {articles && articles?.articles?.docs &&
                articles.articles.docs.map(article => (
                    <Grid key={article._id} item xs={12} sm={6} lg={3}>
                        <ArticleCard article={article}/>
                    </Grid>
                ))}
            </Grid>
            <div ref={loader}/>

        </>
    );
};

export default Home;
