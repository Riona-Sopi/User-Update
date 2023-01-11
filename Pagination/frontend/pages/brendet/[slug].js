
import Link from 'next/link';
import { API, TRY } from '../../config';
import MainLayout from '../../components/MainLayout';
import { Parser } from 'html-to-react';
import { Main } from "next/document";


export default function Brand({brand}){

    const showBrand = () => {
        // return gastronomy.map((g, i) => {
            return (
                    <>
                    <p className="TITLE">BRENDET</p>
         <div className="">
            <div className="row">
                <div className="col-lg-6 col-6 col-md-6">
                <div className="ing">
                    <div className="row">
                        <div className="col-lg-6 col-6 col-md-6">
                            <p className="inf">Info:</p>
                        </div>
                        <div className="col-lg-6 col-6 col-md-6">
                            <p className="infbrend">
                                {Parser().parse(brand.info)}
                            </p>
                            </div>
                        </div>
                    </div>
                    <div className="ing">
                    <div className="row">
                        <div className="col-lg-6 col-6 col-md-6">
                            <p className="adresa">Adresa:</p>
                        </div>
                        <div className="col-lg-6 col-6 col-md-6">
                           <p className="infbrend">
                              {brand.address} 
                          </p> 
                        </div>
                        </div>
                    </div>
                   <div className="ing">
                    <div className="row">
                        <div className="col-lg-6 col-6">
                            <p className="inf">Tel:</p>
                        </div>
                        <div className="col-lg-6 col-6">
                             <p className="infbrend">{brand.phone}</p>
                        </div>
                       </div>  
                    </div>
                <div className="ing">
                    <div className="row">
                        <div className="col-lg-6 col-6">
                            <p className="inf">Email:</p>
                        </div>
                        <div className="col-lg-6 col-6">
                            <p className="infbrend">{brand.email}</p>
                        </div>
                        </div> 
                    </div>
                </div>
                <div className="col-lg-6 ">
                    <img className="imgg" src={`${TRY}/${brand.logo}`} alt=""></img>
                </div>
            </div>
         </div>
          <div>
             <p className="planheading">PLANIMETRIA - KATI 1</p>
              <img className="planimetry" src={`${TRY}/${brand.planimetry}`} alt="" />
         </div>

         
               <div className="brandBtn">     
                    <button className="buyBtn">BLEJ</button>
                     <button className="Btn360">360&#176;</button>
              </div>
                </>
            );
        //  });
    };


  return (
       <MainLayout>
             {showBrand()}
       </MainLayout>
  )}


export async function getServerSideProps({ params }){

    const res = await fetch(`${API}/brand/${params.slug}`)
    const data = await res.json()
  
    return {
        props: { brand: data }
    }

  };