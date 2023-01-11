
import { useState, useEffect} from 'react';
import Link from 'next/link';
import React from 'react';
import { withRouter } from 'next/router';
import { getCookie} from '../../actions/auth';
import { createBrand } from '../../actions/brand';


const BrandCreate = ({ router }) => {

    const [values, setValues] = useState({
        error: '',
        sizeError: '',
        success: '',
        formData: '',
        name: '',
        address: '',
        phone:'',
        email:'',
        hidePublishButton: false
    });

    const { error, success, formData, name, address, phone, email} = values;
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
                setValues({ ...values, name: '', address:'', phone:'', email:'', error: '', success: `Created Successfully` });
            }
        });
    };

    const handleChange = name => e => {
        const value = name === 'image' ? e.target.files[0] : 'logo' ? e.target.files[0] : e.target.value;
        formData.set(name, value);
        setValues({ ...values, [name]: value, formData, error: '' });
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
                            <input type="text" id="Title" value={name} onChange={handleChange('name')} />
                
                            <p className="Title">Address</p>
                            <input type="text" id="Title" value={address} onChange={handleChange('address')} />
                
                            <p className="Title">Phone</p>
                            <input type="text" id="Title" value={phone} onChange={handleChange('phone')} />

                            <p className="Title">Email</p>
                            <input type="text" id="Title" value={email} onChange={handleChange('email')} />

                            <hr className="hrform"/>

                            <p className="Title">Logo</p>
                            <input id="imgg" onChange={handleChange('logo')} type="file" accept="image/*"/>
                            <p className="Title">Planimetria</p>
                            <input id="imgg" onChange={handleChange('planimetry')} type="file" accept="image/*"/>
                            
                    </div>
                    <div className="TwoBtns">
                        <button type="submit" className="Btn1">PUBLISH</button>
                        <button type="button" className="cancelbtn"> <Link href="/admin/brands/manageBrands">Back</Link></button>
                    </div>
            </form>
        );
    };

    return (
        <React.Fragment>
            {createBrandForm()}
            <div className="c" width="100px">
                {showError()}
                {showSuccess()}
            </div>
            <hr className="hr1" />
        </React.Fragment>
    );
};

export default withRouter(BrandCreate);