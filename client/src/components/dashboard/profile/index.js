import AdminLayout from "../../../hoc/adminLayout";
import UserProfile from "./userProfile";
import AuthProfile from "./authProfile";

const Profile = (props) => {
    return (
        <AdminLayout section="Profile">
            <AuthProfile/>
            <UserProfile/>
        </AdminLayout>
    );
};

export default Profile;
