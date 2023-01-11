import { useState } from 'react';
import Layout from '../../../../components/Layout';
import { withRouter } from 'next/router';
import { resetPassword } from '../../../../actions/auth';
import jwt_decode from "jwt-decode";


const ResetPassword = ({ router, props }) => {

    const [values, setValues] = useState({
        name: '',
        newPassword: '',
        error: '',
        message: '',
        showForm: true
    });



    const { showForm, name, newPassword, error, message } = values;

    const handleSubmit = e => {
        e.preventDefault();
        resetPassword({
            newPassword,
            resetPasswordLink: router.query.id
        }).then(data => {
            if (data.error) {
                setValues({ ...values, name:name, error: data.error, showForm: false, newPassword: '' });
            } else {
                setValues({ ...values, name:name, message: data.message, showForm: false, newPassword: '', error: false });
            }
        });
    };

    const passwordResetForm = () => (

        <form className="formsignup" onSubmit={handleSubmit}>
          <div>
             <div className="form-group">
                <label htmlFor="" className="EMAIL">Password*</label>
                <input type="password" id="EMAIL"
                     placeholder="New Password"
                    required 
                    value={newPassword}
                    onChange={e => setValues({ ...values, newPassword: e.target.value })}/>
               </div>
            </div>
            <div className="forgch">
             <div className="row">
                <div className="col-lg-6">
                    <p className="forgpt"><button className="forgotps" type="submit">Change password</button></p>
                </div>
             </div>
             </div>
        </form>
    );

    const showError = () => (error ? <div className="alert alert-danger">{error}</div> : '');
    const showMessage = () => (message ? <div className="alert alert-success">{message}</div> : '');

    return (
        <div className="Signupwh">  
        <div className="signav">
                <p className="signpar">RESET PASSWORD</p>
            </div>
                {showError()}
                {showMessage()}
                <div className="Siglogo"><img src="/images/ALBI LOGO ZI.svg" alt="" /></div>
                {passwordResetForm()}
            </div>  
    );
};

export default withRouter(ResetPassword);