import Link from "next/link";
import { useState, useEffect,useRef } from "react";
import Cursor from "../Cursor";
import { FaBars, FaTimes } from "react-icons/fa";
function Navnav() {
     $(function () {
    $(document).scroll(function () {
      var $nav = $(".Nav2");
      $nav.toggleClass('scrolled', $(this).scrollTop() > $nav.height());
    });
  });

    const navRef = useRef();
  const showNavbar = () => {
    navRef.current.classList.toggle("responsive_nav");
  };

  return (
    <div className="Nav2 fixed-top">
      <Cursor/>
      <header>
        <img
          className="navlogo"
          src="/images/logo-albi-nav-zeze.svg"
          alt=""
        />
        <div>
        <div className="navlist mr-auto">
          <nav ref={navRef}>
            <Link href="/Ballina/Ballina">
              <a className="navCom">BALLINA</a>
            </Link>
            <Link href="/brendet">
              <a className="navCom">BRENDE</a>
            </Link>
            <Link href="/News/News">
              <a className="navCom">NGJARJET</a>
            </Link>
            <Link href="/ofertat">
              <a className="navCom">OFERTAT</a>
            </Link>
            <Link href="/gastronomi">
              <a className="navCom">GASTRONOMI</a>
            </Link>
            <Link href="https://albionline.com/">
              <a className="navCom">BLEJ</a>
            </Link>
            <Link href="/Argetim/Argetim">
              <a className="navCom">ARGËTIM</a>
            </Link>
            <Link href="/sherbimet">
              <a className="navCom">SHËRBIMET</a>
            </Link>
            <Link href="/RrethNesh">
              <div className="navCom">RRETH NESH</div>
            </Link>
           
                <div className="navsearch">
                   <img
                  className="searchic"
                  src="/images/360 ikona-01.svg"
                  alt=""
                />
                <p className="languageS1">SHQ</p>
                </div>
               
             
           
            <button className="nav-btn nav-close-btn" onClick={showNavbar}>
              <FaTimes />
            </button>
          </nav>
        </div>
        </div>
        <button className="nav-btn" onClick={showNavbar}>
          <FaBars className="faBars"/>
        </button>
      </header>
    </div>
    
  );
}

export default Navnav;

