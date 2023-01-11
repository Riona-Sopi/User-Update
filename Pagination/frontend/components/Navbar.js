import Link from "next/link";
import { useState, useEffect,useRef } from "react";

import { FaBars, FaTimes } from "react-icons/fa";
function Navbar() {
    const [isSticky, setIsSticky] = useState(false);

    useEffect(() => {
      const handleScroll = () => {
        const scrollHeight = window.pageYOffset;
        setIsSticky(scrollHeight > 80 ? true : false);
      };

      window.addEventListener("scroll", handleScroll);
    }, []);
  const navRef = useRef();

  const showNavbar = () => {
    navRef.current.classList.toggle("responsive_nav");
  };

  return (
    <div className={`Nav1 ${isSticky ? "sticky" : ""}`}>
      <header>
        <img
          className="navlogo"
          src={`${
            isSticky
              ? "/images/logo-albi-nav-zeze.svg"
              : "/images/logo-albi-nav-bardh.svg"
          }`}
          alt=""
        />
        <div>
        <div className="navlist">
          <nav ref={navRef}>
            <Link href="/Ballina/Ballina">
              <a className="navComp1">BALLINA</a>
            </Link>
            <Link href="/brendet">
              <a className="navComp1" >BRENDE</a>
            </Link>
            <Link href="/ngjarjet">
              <a className="navComp1">NGJARJET</a>
            </Link>
            <Link href="/ofertat">
              <a className="navComp1">OFERTAT</a>
            </Link>
            <Link href="/gastronomi">
              <a className="navComp1">GASTRONOMI</a>
            </Link>
            <Link href="https://albionline.com/">
              <a className="navComp1">BLEJ</a>
            </Link>
            <Link href="/argetim">
              <a className="navComp1">ARGËTIM</a>
            </Link>
            <Link href="/Sherbime/Sherbime">
              <a className="navComp1">SHËRBIMET</a>
            </Link>
            <Link href="/RrethNesh">
              <a className="navComp1">RRETH NESH</a>
            </Link>
      
              <div className="navsearch">
                <img
                  className="searchic"
                  src={`${
                    isSticky ? "/images/llupa.svg" : "/images/llupa-bardh.svg"
                  }`}
                  alt=""
                />
                <img
                  className="searchic"
                  src={`${
                    isSticky
                      ? "/images/360 ikona-01.svg"
                      : "/images/360 ikona b-01.svg"
                  }`}
                  alt=""
                />

                <p className="languageS">SHQ</p>
              </div>
          
            <button className="nav-btn nav-close-btn" onClick={showNavbar}>
              <FaTimes />
            </button>
          </nav>
        </div>
        </div>
        <button className="nav-btn" onClick={showNavbar}>
          <FaBars style={{ color: "white" }} />
        </button>
      </header>
    </div>
  );
}

export default Navbar;

