import React from 'react';


const Sidebar = ({ children }) => {
  return (
    <body class="app">
        <div class="sidebar">
        <div class="sidebar-inner">
            <div class="sidebar-logo">
            <div class="d-flex align-items-center flex-nowrap">
                <a class="sidebar-link text-decoration-none" href="#">
                <div class="d-flex align-items-center flex-nowrap">
                    <div class="logo-sm">
                    <div class="logo d-flex align-items-center justify-content-center">
                        {/* <!-- The Minify logo here --> */}
                    </div>
                    </div>
                    <div class="logo-text d-flex align-items-center justify-content-center">
                        {/* <!-- The Full Logo here --> */}
                    </div>
                </div>
                </a>
                <div class="">
                <div class="mobile-toggle sidebar-toggle">
                    <a href="#" class="text-decoration-none">
                    {/* <!-- closing sidebar icon here --> */}
                    </a>
                </div>
                </div>
            </div>
            </div>

            <ul class="sidebar-menu scrollable position-relative">
            <li class="nav-item dropdown">
                <a class="nav-link" href="#">
                    {/* <!-- Navigation icon here  --> */}
                <span class="icon-holder">
                    <i class="fal fa-home"></i>
                </span>
                {/* <!-- Navigation link here --> */}
                <span class="title">Dashboard</span>
                </a>
            </li>
            <li class="nav-item dropdown">
                <a class="nav-link dropdown-toggle" href="#">
                <span class="icon-holder">
                    <i class="fas fa-fingerprint"></i>
                </span>
                <span class="title">Auth</span>
                {/* <!-- Icon for dropdown here --> */}
                <span class="arrow">
                    <i class="fas fa-angle-right"></i>
                </span>
                </a>
                <ul class="dropdown-menu">
                <li>
                    <a class="sidebar-link" href="#">404</a>
                </li>
                </ul>
            </li>
            </ul>
        </div>
        </div>
        <div class="container-wide">
             {children}
        </div>
       
    </body>
  );
};

export default Sidebar;