import BrandRead from '../../../components/brand/BrandRead';
import Layout from '../../../components/Layout';
import Link from 'next/link';
import Search from '../../../components/brand/Search';
import React, { useContext, useEffect } from 'react';
// import Admin from '../../../../components/auth/Admin';

const Brand = () => {

  // const { header = {}, history = {}, reasons = [], clients = [] } = (pageContent ?? []);
//   useEffect(() => {
//     var addScript = document.createElement('script');
//     addScript.setAttribute('src', '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit');
//     document.body.appendChild(addScript);
//     window.googleTranslateElementInit = googleTranslateElementInit;
// }, [])

//     const googleTranslateElementInit = () => {

//     new window.google.translate.TranslateElement({
//         pageLanguage: 'sq',
//         includedLanguages : "en,sq", // include this for selected languages
//         layout: google.translate.TranslateElement.InlineLayout.SIMPLE
//     },
//     'google_translate_element');

// }
    return (
        <Layout>
            <div className="addform">
             <div className="row no-gutters">
                <div className="col-lg-6">
                    <p className="maintitle">BRENDET</p>
                </div>
                <div className="col-lg-6">
                {/* <div id="google_translate_element" > </div>
                <button id=":2.restore">Show Original</button> */}
                  <div className="addbtn">
                  <Link href={`/admin/brands/createBrand`}>
                    <a className="formbtn ms-4 mt-3">Shto Një Brend</a>
                  </Link>
                    </div>
                </div>
             </div>
            </div>  
            <div className="searchcontainer" style={{marginTop:"50px", marginBottom:"50px"}}>
              <div className="">
              <Search/> 
              </div> 
            </div>  
            <BrandRead/>
         </Layout>           
    );
};

export default Brand;