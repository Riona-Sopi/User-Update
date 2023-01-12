import React from "react";
import Layout from "../components/Layout";
import UserUpdate from "../components/auth/UserUpdate";

const Profile = () => {
  return (
    <Layout>
      <div className="addform">
        <div className="row no-gutters">
          <div className="col-lg-6">
            <p className="maintitle">PROFILE</p>
          </div>
        </div>
      </div>
      <UserUpdate  />
    </Layout>
  );
};

export default Profile;
