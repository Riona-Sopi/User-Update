import Layout from '../../../components/Layout';
import Admin from '../../../components/auth/Admin';
import UserUpdate from '../../../components/auth/UserUpdate';

const User = () => {
    return (
        <Layout>
           <div className="addform">
             <div className="row no-gutters">
                <div className="col-lg-6">
                    <p className="maintitle">USERS / UPDATE USER</p>
                </div>
             </div>
            </div>      
            <UserUpdate/>
        </Layout>
    );
};

export default User;