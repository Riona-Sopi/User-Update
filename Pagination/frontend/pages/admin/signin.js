import Layout from '/components/Layout';
import { withRouter } from 'next/router';
import SigninComponent from '../../components/auth/SigninComponent';

const Signin = ({router}) => {

    const showRedirectMessage = () => {
        if (router.query.message) {
            return <div className="alert alert-danger">{router.query.message}</div>;
        } else {
            return;
        }
    };


    return (
        <div className="Signupwh">
            <div className="signav">
                <p className="signpar">SIGN-IN</p>
            </div>
       
            <div className="">{showRedirectMessage()}</div>
            <SigninComponent/>
        </div>
    );
};

export default withRouter(Signin);