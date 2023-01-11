import Link from 'next/link';
import { API, TRY } from '../../config';
import MainLayout from '../../components/MainLayout';
import { Parser } from 'html-to-react';
import Footer from '../../components/Footer';
import Navnav from '../../components/Navnav';



export default function Brendet({brands}){

     const showBrands = () => {
          return brands.map((brand, i) => {
              return (
                    <div className='col-lg-4 col-md-4 col-6' key={i}>
                         <Link href={`/brendet/${brand.slug}`}><img className="BrandImg" src={`${TRY}/${brand.logo}`}/></Link>
                    </div>
              );
           });
      };


  return (
     <MainLayout>
             <div>
               <p className="TITLE">BRENDET</p>
               </div>
               <div className='BrandsSpace'>
               <div className='row g-0'>
                     {showBrands()}
               </div>
               </div>
     </MainLayout> 
  )}


  export async function getServerSideProps(){

     const res = await fetch(`${API}/brands`)
     const data = await res.json()
   
     return {
         props: { brands: data }
     }
 
   };

