import { useState, useEffect } from 'react';
import Router from 'next/router';
import Link from 'next/link';
import React from 'react';
import dynamic from 'next/dynamic';
import moment from 'moment';
import { withRouter } from 'next/router';
import { getCookie, isAuth } from '../../actions/auth';
import { singleBrand, updateBrand, list} from '../../actions/brand';
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });
import '../../node_modules/react-quill/dist/quill.snow.css';
import { QuillModules, QuillFormats } from '../../helpers/quill';


const BrandUpdate = ({ router }) => {
    
    const [info, setInfo] = useState('');

    const [brands, setBrands] = useState({
        postedBy:''
    });

    useEffect(() => {
        loadBrands();
    }, []);

    const loadBrands = () => {
        if (router.query.slug) {
        singleBrand(router.query.slug).then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                setBrands(data);
            }
        });
        }
    };

    const [values, setValues] = useState({
        name: '',
        address: '',
        phone:'',
        onlineLink:'',
        email:'',
        error: '',
        success: '',
        formData: new FormData(),
        description: '',
    });

    const { error, success, formData, name, onlineLink, address, phone, email} = values;
    
    const token = getCookie('token');

    useEffect(() => {
        setValues({...values, formData: typeof window !== 'undefined' && new FormData()});
        initBrand();
    }, [router]);

    const initBrand = () => {
        if (router.query.slug) {
            singleBrand(router.query.slug).then(data => {
                if (data.error) {
                    console.log(data.error);
                } else {
                    setValues({ ...values, name: data.name, address: data.address, phone: data.phone, email: data.email, onlineLink:data.onlineLink});
                    setInfo(data.info);
                }
    
            });
        }
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
    };

    const editBrand = e => {
        e.preventDefault();
        updateBrand(formData, token, router.query.slug).then(data => {
            if (data.error) {
                setValues({ ...values, error: data.error });
            } else {
                setValues({ ...values, name: '', address:'', email:'', phone:'', logo: '', onlineLink:'', planimetry:'', success: `Brendi me emrin "${data.name}" është përditësuar me sukses` });
                if (isAuth()) {
                    // Router.replace(`/admin/crud/${router.query.slug}`);
                    Router.replace(`/admin/brands/manageBrands`);
                } else if (isAuth() && isAuth().role === 0) {
                    // Router.replace(`/user/crud/${router.query.slug}`);
                    Router.replace(`/user`);
                }
            }
            window.scrollTo(0, document.body.scrollHeight);
        });
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

    const updateBrandForm = () => {
        return (
            <form onSubmit={editBrand}>
                    <div className="formspacing">
                        <div>
                        <p className="secondpar">Publikuar nga {brands.postedBy.name}, {moment(brands.updatedAt).fromNow()}</p>
                            <p className="Title">Emri i Brendit</p>
                            <input type="text" id="Title" value={name} onChange={handleChange('name')} />
                
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
                            <input type="text" id="Title" value={address} onChange={handleChange('address')} />
                
                            <p className="Title">Tel</p>
                            <input type="text" id="Title" value={phone} onChange={handleChange('phone')} />

                            <p className="Title">Email</p>
                            <input type="text" id="Title" value={email} onChange={handleChange('email')} />

                            <p className="Title">Linku për Albi Online</p>
                            <input type="text" id="Title" value={onlineLink} onChange={handleChange('onlineLink')} />

                            <hr className="hrform" />

                            <p className="Title">Logo</p>
                            <input id="imgg" onChange={handleChange('logo')} type="file" accept="image/*"/>

                            <p className="Title">Planimetria</p>
                            <input id="imgg" onChange={handleChange1('planimetry')} type="file" accept="image/*"/>
                        </div>
                    </div>
                    <div className="TwoBtns ">
                        <button  type="submit" className="Btn1">RUAJ</button>
                        <button type="button" className="cancelbtn"> <Link href="/admin/brands/manageBrands">ANULO / SHKO PAS</Link></button>
                    </div>
            </form>
        );
    };

    return (
        <React.Fragment>
            {updateBrandForm()}
            <div className="messageContainer">
                {showError()}
                {showSuccess()}
            </div>
            <hr className="hr1" />
        </React.Fragment>
    );
};

export default withRouter(BrandUpdate);