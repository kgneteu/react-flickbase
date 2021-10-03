import {Button, Card, CardActions, CardContent, CardMedia, IconButton, Typography} from "@material-ui/core";
import {Favorite} from "@material-ui/icons";
import RouterLink from '../../utils/routerLink';

//56.25%'-> 16:9
const ArticleCard = ({article}) => {
    return (
        <Card variant={'outlined'}>
            <CardMedia
                style={{height: 0, paddingTop: '56.25%'}}
                image={"https://picsum.photos/200"}
                title={"Some title"}>

            </CardMedia>
            <CardContent>
                <Typography gutterBottom variant={'h5'}>
                    {article.title}
                </Typography>
                <Typography>
                    {article.excerpt}
                </Typography>
            </CardContent>
            <CardActions>
                <IconButton>
                    <Favorite/>
                </IconButton>
                <Button size={'small'} color={'primary'} component={RouterLink} to={`/article/${article._id}`}>View Article</Button>
            </CardActions>
        </Card>
    );
};

export default ArticleCard;
