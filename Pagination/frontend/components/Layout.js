
import React from 'react';
import 'react-pro-sidebar/dist/css/styles.css';
import Router from 'next/router';
import Link from 'next/link';
import { signout, isAuth } from '../actions/auth';
import { ProSidebar, Menu, MenuItem} from 'react-pro-sidebar';




const Layout = ({ children }) => {
    
    return (
        
        <div className='Dashboardback'>
            {isAuth() &&(
                <div className='Navbar3'>
                    <nav className="navbar navbar-expand-lg p-0">
                        <p className="navtitle">DASHBOARD</p>
                        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>

                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            <div className='adminacc'>
                                    <p className="adminname">{`${isAuth().name}`}</p>
                                    <p>{isAuth().email}</p>
                            </div>
                        </div>
                    </nav>
                </div>
            )}
        <div className='nav1'>
            <div>
                <ProSidebar
                    width="388px"
                    className=''
                >
                    {isAuth() &&(
                <Menu iconShape="square">
                <MenuItem>
                    {/* <img className='logodashboard1' src="/images/ALBI LOGO BARDH.svg" alt="" /> */}
                </MenuItem>
                    {/* <MenuItem><Link href="/admin/brands/manageBrands"><p className='dashboardlist'>BRENDET</p></Link></MenuItem> */}
                    <MenuItem>
                        {isAuth() && isAuth().role.includes("Super Admin") && (
                            <div className='signout'>
                                <img className='adduseric' src="/images/UserList.svg" alt="" />
                            
                                <Link href="/admin/users/manageUsers">
                                <p className='addusers'>Users List</p>
                                </Link>
                            </div>
                        )} 
                    </MenuItem>
            
                
                    <MenuItem>
                    <div className='signout'>  
                          <img className='signoutic' src="/images/shkyqu.svg" alt="" />
                            <p  onClick={() => signout(() => Router.replace(`/admin/signin`))}>Log out</p>
                    </div> 
                    </MenuItem>
                   
                    </Menu>
                    )} 
                </ProSidebar>

            </div>
            <div className='container-fluid p-0'>
                {children}
            </div>
            </div>
        </div>
    );
};

export default Layout;