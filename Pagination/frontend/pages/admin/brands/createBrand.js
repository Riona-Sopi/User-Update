import Layout from '../../../components/Layout';
import Admin from '../../../components/auth/Admin';
import BrandCreate from '../../../components/brand/BrandCreate';


const Brand = () => {
    return (
     
        <Layout>
            <div className="addform">
             <div className="row no-gutters">
                <div className="col-lg-6">
                    <p className="maintitle">BRENDET / SHTO NJË BREND</p>
                </div>
                {/* <div className="col-lg-6">
                  <button className="addbtn">Shto nje brend</button>
                </div> */}
             </div>
            </div>      
            <BrandCreate/>
                        
        </Layout>
        
    ); 
};

export default Brand;