import { useEffect } from 'react';
import Router from 'next/router';
import React from 'react';
import { isAuth } from '../../actions/auth';

const Admin = ({ children }) => {
    useEffect(() => {
        if (!isAuth()) {
            Router.push(`/admin/signin`);
        } else if (isAuth().role !== 'Admin') {
            Router.push(`/admin`);
        }
    }, []);
    return <React.Fragment>{children}</React.Fragment>;
};

export default Admin;