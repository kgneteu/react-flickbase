import {Button, Grid} from "@material-ui/core";
import ArticleCard from "../UI/articleCard";
import {useEffect, useReducer} from "react";
import {useDispatch, useSelector} from "react-redux";
import {ArticleAction} from "./../../store/actions"


const initialState = {sortBy: "_id", order: "desc", limit: 8, skip: 0};

const Home = (props) => {
    const articles = useSelector(state => state.articles)
    const dispatch = useDispatch();
    //usig reducer to change single value of sort parameters object (skip)
    const [sort, setSort] = useReducer(
        (state, newState) => {
            return {
            ...state, ...newState
            }
        }
        , initialState);

    useEffect(() => {
        if (articles && !articles.articles) {
            dispatch(ArticleAction.getArticles(initialState));
        }
    }, [dispatch, articles])

    const loadMoreHandler = () => {
        let skip = sort.skip + sort.limit;
        dispatch(ArticleAction.getArticles({...sort,skip:skip}));
        setSort({skip: skip})
    }

    return (
        <>

                <Grid container spacing={2}>
                    {articles && articles.articles &&
                    articles.articles.map( article => (
                        <Grid key={article._id} item xs={12} sm={6} lg={3}>
                            <ArticleCard article={article}/>
                        </Grid>
                    ))}
                </Grid>
                <Button onClick={loadMoreHandler}> Load more...</Button>

        </>
    );
};
//
// const Home = (props) => {
//     const [options, setOptions] = useState(initialState);
//     const articles = useSelector(state => state.articles.articles)
//     const dispatch = useDispatch();
//
//     useEffect(() => {
//         dispatch(Article.getArticles(options));
//         console.log(1)
//     }, [dispatch, options])
//
//     const loadMoreHandler = () => {
//         console.log(2)
//         const newOptions = {...options, limit: options.limit+8};
//         setOptions(newOptions);
//     }
//
//     return (
//         <>
//             <Header/>
//             <SideNavigation/>
//             <Layout>
//                 <Grid container spacing={2} className='article_card'>
//                     {articles && articles.map(article => (
//                         <Grid key={article._id} item xs={12} sm={6} lg={3}>
//                             <ArticleCard article={article}/>
//                         </Grid>
//                     ))}
//                 </Grid>
//                 <Button onClick={loadMoreHandler}> Load more...</Button>
//             </Layout>
//         </>
//     );
// };
export default Home;
