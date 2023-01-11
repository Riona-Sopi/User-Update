import { useState } from 'react';
import Layout from '../../../components/Layout';
import Link from 'next/link';
import { forgotPassword } from '../../../actions/auth';

const ForgotPassword = () => {
    const [values, setValues] = useState({
        email: '',
        message: '',
        error: '',
        showForm: true
    });

    const { email, message, error, showForm } = values;

    const handleChange = name => e => {
        setValues({ ...values, message: '', error: '', [name]: e.target.value });
    };

    const handleSubmit = e => {
        e.preventDefault();
        setValues({ ...values, message: '', error: '' });
        forgotPassword({ email }).then(data => {
            if (data.error) {
                setValues({ ...values, error: data.error });
            } else {
                setValues({ ...values, message: data.message, email: '', showForm: false });
            }
        });
    };

    const showError = () => (error ? <div className="alert alert-danger">{error}</div> : '');
    const showMessage = () => (message ? <div className="alert alert-success">{message}</div> : '');

    const passwordForgotForm = () => (
            <form className="formsignup" onSubmit={handleSubmit}>
            <div>
             <div className="form-group">
                <label htmlFor="" className="EMAIL">Email*</label>
                <input type="email" id="EMAIL" placeholder="name@gmail.com"
                    required 
                    value={email}
                    onChange={handleChange('email')}/>
               </div>
            </div>
            <div className="forgch">
             <div className="row">
                <div className="col-lg-6">
                    <p className="forgp"><button className="forgotps" type="submit">Send reset link</button></p>
                </div>
             </div>
             </div>
        </form>
    );

    return (
        <div className="Signupwh">  
        <div className="signav">
                <p className="signpar">FORGOT PASSWORD</p>
            </div>
            {showError()}
        {showMessage()}
         <div className="Siglogo"><img src="/images/ALBI LOGO ZI.svg" alt="" /></div>
        {showForm && passwordForgotForm()}
                 
    </div>
    );
};

export default ForgotPassword;