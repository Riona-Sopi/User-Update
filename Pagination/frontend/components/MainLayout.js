import React from 'react';
import Navbar from '../components/Navnav';
import Footer from '../components/Footer';
const MainLayout = ({children}) => {
    return(
        <div className="layout1">
            <Navbar/>
            {children}
            <Footer/>
        </div>
    )
}

export default MainLayout;