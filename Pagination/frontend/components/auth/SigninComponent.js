import { useState, useEffect, useRef } from 'react';
import React from 'react';
import { signin, authenticate, isAuth } from '../../actions/auth';
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import Router from 'next/router';
import Link from 'next/link';
import ReCAPTCHA from "react-google-recaptcha";

const SigninComponent = () => {

    const recaptchaRef = useRef(null)
  
    const [values, setValues] = useState({
        email: '',
        password: '',
        error: '',
        loading: false,
        message: '',
        showForm: true 
    });

    const { email, password, error, loading, message, showForm } = values;

    const { executeRecaptcha } = useGoogleReCaptcha();

    useEffect(() => {
        isAuth() && Router.push(`/admin`);
    }, []);



    const handleSubmit = e => {
        const captchaToken = recaptchaRef.current.executeAsync();
        recaptchaRef.current.reset();

        e.preventDefault();
        // console.table({ name, email, password, error, loading, message, showForm });
        setValues({ ...values, loading: true, error: false });
        const user = { email, password };

        signin(user, captchaToken).then(data => {
            if (data.error) {
                setValues({ ...values, error: data.error, loading: false });
            } else {
                // save user token to cookie
                // save user info to localstorage
                // authenticate user
                authenticate(data, () => {
                    if (isAuth()) {
                        Router.push(`/admin`);
                    } else {
                        console.log("wrong")
                    }
                });
            }
        });
    };

    const handleChange = name => e => {
        setValues({ ...values, error: false, [name]: e.target.value });
    };

    const showLoading = () => (loading ? <div className="alert alert-info">Loading...</div> : '');
    const showError = () => (error ? <div className="alert alert-danger">{error}</div> : '');
    const showMessage = () => (message ? <div className="alert alert-info">{message}</div> : '');

    const signinForm = () => {
        return (
            <>
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

            <div>
                <div className="form-group">
                <label htmlFor="" className="PASSWORD">Password*</label>
                <input type="password" id="PASSWORD" placeholder="at least 8 characters" 
                    required
                    value={password}
                    onChange={handleChange('password')}/>
               </div>
            </div>
 
             
            <div className="forgch">
             <div className="row">
                <div className="col-lg-6">
                    <Link href="/auth/password/forgot">
                    <p className="forgp">Forgot password?</p>
                    </Link>
                </div>
             </div>
             </div>

             <ReCAPTCHA
                ref={recaptchaRef}
                sitekey={"6LdCR04iAAAAAG-Gnf87VHt4qUd1TqtzW7_p2UBF"}
                size="invisible"
              />

            <div className="signbutton"><button type="submit" className="signupbutt">SIGN-IN</button></div> 
          </form>

            <hr className="hrsign"/>
            <div className="psig">
                <p>Don&apos;t  have an account? <span className="spasign"> Contact Admin Support!</span></p>
            </div>
            <p className="cop22">&copy; 2022 ALBIMALL</p>
            </>

            // <div className="container" style={{width:"60%"}}>
            // <form onSubmit={handleSubmit}>
            //     <div className="form-group">
            //         <input
            //             value={email}
            //             onChange={handleChange('email')}
            //             type="email"
            //             className="form-control"
            //             placeholder="Type your email"
            //         />
            //     </div>

            //     <div className="form-group">
            //         <input
            //             value={password}
            //             onChange={handleChange('password')}
            //             type="password"
            //             className="form-control"
            //             placeholder="Type your password"
            //         />
            //     </div>

            //     <div className="row">
            //         <div className="col-lg-6 m-auto">
            //         <Link href="/auth/password/forgot">
            //             <a className="forgot">Forgot password?</a>
            //         </Link>
            //         </div>
            //         <div className="col-lg-6 text-right">
            //             <button className="btn btnsign">Signin</button>
            //         </div>
            //     </div>
            // </form>
            // </div>
        );
    };

    return (
        <React.Fragment>
            {showError()}
            {showLoading()}
            {showMessage()}
            <div className="Siglogo"><img src="/images/ALBI LOGO ZI.svg" alt="" /></div>
            {showForm && signinForm()}
            <br/>
    
        </React.Fragment>
    );
};

export default SigninComponent;