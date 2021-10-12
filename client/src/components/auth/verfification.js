import {useHistory, useLocation} from "react-router-dom";
import {useEffect, useState} from "react";
import {Loader} from "../../utils/loader";
import {useDispatch, useSelector} from "react-redux";

import {
    SentimentDissatisfied as SentimentDissatisfiedIcon,
    SentimentSatisfied as SentimentSatisfiedIcon
} from "@material-ui/icons";
import {accountVerify} from "../../store/actions/user_actions";

const Verfification = () => {

    const query = new URLSearchParams(useLocation().search);
    const token = query.get('t');
    const dispatch = useDispatch();
    const notifications = useSelector(state => state.notifications)
    const history = useHistory();

    const [loading, setLoading] = useState(true);
    const [icon, setIcon] = useState(null);

    useEffect(() => {
        console.log(token)
        if (token) {
            dispatch(accountVerify(token))
        } else {
            history.push('/');
        }
    }, [token, dispatch, history]);

    useEffect(() => {

        if (notifications && notifications.error) {
            setIcon(<SentimentDissatisfiedIcon/>)
            setLoading(false)
        } else if (notifications && notifications.success) {
            setIcon(<SentimentSatisfiedIcon/>)
            setLoading(false)
        }
    }, [notifications])

    if (loading) return <Loader/>
    return (
        <div align={'center'}>
            {icon}
        </div>
    );
};

export default Verfification;
