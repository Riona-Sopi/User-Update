
import { useState, useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import React from 'react';
import { withRouter } from 'next/router';
import { getCookie, isAuth } from '../../actions/auth';
import { createBrand } from '../../actions/brand';
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });
import '../../node_modules/react-quill/dist/quill.snow.css';
import { QuillModules, QuillFormats } from '../../helpers/quill';


const BrandCreate = ({ router }) => {

    const brandFromLS = () => {
        if (typeof window === 'undefined') {
            return false;
        }

        if (localStorage.getItem('brand')) {
            return JSON.parse(localStorage.getItem('brand'));
        } else {
            return false;
        }
    };

    const [info, setInfo] = useState(brandFromLS());
    const [values, setValues] = useState({
        error: '',
        sizeError: '',
        success: '',
        formData: '',
        onlineLink: '',
        name: '',
        address: '',
        phone:'',
        email:'',
        hidePublishButton: false
    });

    const { error, sizeError, success, formData, name, onlineLink, address, phone, email, hidePublishButton } = values;
    const token = getCookie('token');

    useEffect(() => {
        setValues({ ...values, formData: new FormData()});
    }, [router]);


    const publishBrand = e => {
        e.preventDefault();
        createBrand(formData, token).then(data => {
            if (data.error) {
                setValues({ ...values, error: data.error });
            } else {
                setValues({ ...values, name: '', address:'', onlineLink:'', phone:'', email:'', error: '', success: `Brendi me emrin "${data.name}" është krijuar me sukses` });
                setInfo('');
            }
            window.scrollTo(0, document.body.scrollHeight);
        });
    };

    const handleChange = name => e => {
        const value = name === 'logo' ? e.target.files[0] : e.target.value;
        formData.set(name, value);
        setValues({ ...values, [name]: value, formData, error: '' });
    };

    const handleChange1 = name => e => {
        const value = name === 'planimetry' ? e.target.files[0] : e.target.value;
        formData.set(name, value);
        setValues({ ...values, [name]: value, formData, error: '' });
    };



    const handleInfo = e => {
        setInfo(e);
        formData.set('info', e);
        if (typeof window !== 'undefined') {
            localStorage.setItem('info', JSON.stringify(e));
        }
    };



    const showError = () => (
        <div className="alert alert-danger" style={{ display: error ? '' : 'none' }}>
            {error}
        </div>
    );

    const showSuccess = () => (
        <div className="alert alert-success" style={{ display: success ? '' : 'none' }}>
            {success}
        </div>
    );

    const createBrandForm = () => {
        return (
            <form onSubmit={publishBrand}>
                    <div className="formspacing">
                            <p className="Title">Emri i Brendit</p>
                            <input type="text" id="Title" value={name} onChange={handleChange('name')} required/>
                
                            <p className="Title">Info për Brendin</p>
                            <ReactQuill
                                className="descquill"
                                modules={QuillModules}
                                formats={QuillFormats}
                                value={info}
                                placeholder="Shkruani tekstin këtu..."
                                onChange={handleInfo} 
                            />
                
                            <p className="Title">Adresa</p>
                            <input type="text" id="Title" value={address} onChange={handleChange('address')}/>
                
                            <p className="Title">Tel</p>
                            <input type="text" id="Title" value={phone} onChange={handleChange('phone')}/>

                            <p className="Title">Email</p>
                            <input type="text" id="Title" value={email} onChange={handleChange('email')}/>

                            <p className="Title">Linku për Albi Online</p>
                            <input type="text" id="Title" value={onlineLink} onChange={handleChange('onlineLink')} />

                            <hr className="hrform"/>

                            <p className="Title">Logo</p>
                            <input id="imgg" onChange={handleChange('logo')} type="file" accept="image/*"/>
                            <p className="Title">Planimetria</p>
                            <input id="imgg" onChange={handleChange1('planimetry')} type="file" accept="image/*"/>
                            
                    </div>
                    <div className="TwoBtns">
                        <button type="submit" className="Btn1">PUBLIKO</button>
                        <button type="button" className="cancelbtn"> <Link href="/admin/brands/manageBrands">ANULO / SHKO PAS</Link></button>
                    </div>
            </form>
        );
    };

    return (
        <React.Fragment>
            {createBrandForm()}
            <div className="messageContainer">
                {showError()}
                {showSuccess()}
            </div>
            <hr className="hr1" />
        </React.Fragment>
    );
};

export default withRouter(BrandCreate);