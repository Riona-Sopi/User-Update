import Layout from '../../../components/Layout';
import Admin from '../../../components/auth/Admin';
import BrandUpdate from '../../../components/brand/BrandUpdate';

const Brand = () => {
    return (
        <Layout>
           <div className="addform">
             <div className="row no-gutters">
                <div className="col-lg-6">
                    <p className="maintitle">BRENDET / PËRDITËSO BRENDIN</p>
                </div>
                {/* <div className="col-lg-6">
                  <button className="addbtn">Shto nje brend</button>
                </div> */}
             </div>
            </div>      
            <BrandUpdate/>
        </Layout>
    );
};

export default Brand;