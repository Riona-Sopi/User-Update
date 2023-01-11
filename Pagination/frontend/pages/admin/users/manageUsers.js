import UsersRead from '../../../components/auth/UsersRead';
import Layout from '../../../components/Layout';
import Link from 'next/link';
import Search from '../../../components/auth/Search';
// import Search from '../../../components/service/Search';
// import Admin from '../../../../components/auth/Admin';

const Users = () => {
    return (
        <Layout>
            <div className="addform">
             <div className="row no-gutters">
                <div className="col-lg-6">
                    <p className="maintitle">USERS LIST</p>
                </div>
                {/* <div className="col-lg-6">
                  <div className="addbtn">
                  <Link href={`/admin/services/createService`}>
                    <a className="formbtn ms-4 mt-3">Shto Një Shërbim</a>
                  </Link>
                    </div>
                </div> */}
             </div>
            </div>  
            <div className="searchcontainer" style={{marginTop:"50px", marginBottom:"50px"}}>
              <div className="">
              <Search/> 
              </div> 
            </div>  
            {/* <div className="searchcontainer" style={{marginTop:"50px", marginBottom:"50px"}}>
              <div className="">
              <Search/> 
              </div> 
            </div>   */}
            <UsersRead/>
         </Layout>           
    );
};

export default Users;