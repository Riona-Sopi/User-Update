import { useState, useEffect } from 'react';
import React from 'react';
// import { ToastContainer, toast } from 'react-toastify';
import { signup, isAuth } from '../../actions/auth';
// import 'react-toastify/dist/ReactToastify.css';

import Router from 'next/router';

const SignupComponent = () => {
    const [values, setValues] = useState({
        name: '',
        email: '',
        password: '',
        role: '',
        error: '',
        loading: false,
        message: '',
        showForm: true
    });

    const { name, email, password, role, error, loading, message, showForm } = values;

    useEffect(() => {
        isAuth() && Router.push(`/admin/signup`);
    }, []);



    const handleSubmit = e => {
        e.preventDefault();
        setValues({ ...values, loading: true, error: false });
        const user = { name, email, password, role};

        signup(user).then(data => {
            if (data.error) {
                setValues({ ...values, error: data.error, loading: false });
            } else {
                setValues({
                    ...values,
                    name: '',
                    email: '',
                    password: '',
                    role: '',
                    error: '',
                    loading: false,
                    message: data.message,
                    // showForm: false
                });
            }
        });
    };

    const handleChange = name => e => {
        setValues({ ...values, error: false, [name]: e.target.value });
    };

    const showLoading = () => (loading ? <div className="alert alert-info">Loading...</div> : '');
    const showError = () => (error ? <div className="alert alert-danger" style={{marginLeft:"0"}}>{error}</div> : '');
    const showMessage = () => (message ? 
        <div className="alert alert-info" width="100px" style={{marginLeft:"0"}}>{message}</div>
     : '');

    const signupForm = () => {
        return (
            <div className="Signupwh">
         <form className="formsignup" onSubmit={handleSubmit}>
            <div>
            <div>
                <label htmlFor="" className="USERROLE">User Role*</label>
                <select id=""
                    value={role} 
                    onChange={handleChange('role')}
                    type="text"
                    className="roleselect"
                    placeholder="Select Role">
                    <option>Super Admin</option>
                    <option>Admin</option>
                    <option>Content Creator</option>
                </select>
                {/* <input type="password" id="PASSWORD" placeholder="at least 8 characters" required/> */}
               </div>
            </div>
            <div>
               <div className="form-group">
                <label htmlFor="" className="NAME">Full Name*</label>
                <input type="text" id="NAME" placeholder="John Doe" 
                    value={name}
                    onChange={handleChange('name')}
                    required/>
               </div>
            </div>
            <div>
               <div className="form-group">
                <label htmlFor="" className="EMAIL">Email*</label>
                <input type="text" id="EMAIL" placeholder="name@gmail.com" 
                    value={email}
                    onChange={handleChange('email')}
                    required/>
               </div>
            </div>

            <div>
               <div className="form-group">
                <label htmlFor="" className="PASSWORD">Password*</label>
                <input type="password" id="PASSWORD" placeholder="at least 8 characters" 
                    value={password}
                    onChange={handleChange('password')}
                    required/>
               </div>
            </div>

    
             <div className="signupbutton"><button type="submit" className="signupbutt">SIGN-UP</button></div>   
          </form>

         

            {/* <div className="psig">
                <p>Does this account already exist? <span className="spasign"> Sign-In</span></p>
            </div> */}
            <p className="cop22">&copy; 2022 ALBIMALL</p>
        </div>
           
        );
    };

    return (
        <React.Fragment>
             <div className="GS">
                <p className="signpar">SHTO PËRDORUES</p>
            </div>
            <div className="messageContainer">
            {showError()}
            {showLoading()}
            {showMessage()}
            </div>
            <div className="Siglogo" id="signuplogo"><img src="/images/ALBI LOGO ZI.svg" alt=""/></div>


            {showForm && signupForm()}
        </React.Fragment>
    );
};

export default SignupComponent;