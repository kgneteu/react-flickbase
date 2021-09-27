import Header from "../header";
import SideNavigation from "../sideNavigation";

const Home = (props) => {
    console.log(props)
    return (
        <>
            <Header/>
            <SideNavigation/>
            <div style={{fontFamily: "Fredoka One"}}>
                Hello
            </div>
        </>
    );
};

export default Home;
