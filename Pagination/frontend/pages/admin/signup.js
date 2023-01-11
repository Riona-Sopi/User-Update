import Layout from '../../components/Layout';
import Admin from '../../components/auth/Admin';
import SignupComponent from '../../components/auth/SignupComponent';
import Link from 'next/link';

const Signup = () => {
    return (
        <Layout>
            <SignupComponent/>
        </Layout>
    );
};

export default Signup;