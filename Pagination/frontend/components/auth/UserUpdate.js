import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import React from "react";
import Link from "next/link";
// import { ToastContainer, toast } from 'react-toastify';
import { getProfile, signup, isAuth, getCookie } from "../../actions/auth";
import { updateUser, singleUser } from "../../actions/user";
// import 'react-toastify/dist/ReactToastify.css';

// import Router from 'next/router';

const UserUpdate = () => {
  const router = useRouter();
  const { _id: id } = router.query;

  const userData = JSON.parse(localStorage.getItem("user"));

  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
    username: "",
    error: "",
    loading: false,
    message: "",
    showForm: true,
  });

  const token = getCookie("token");

  const {
    name,
    email,
    password,
    role,
    id: userId,
    username,
    error,
    loading,
    message,
    showForm,
  } = values;

  useEffect(() => {
    setValues({
      ...values,
      formData: typeof window !== "undefined" && new FormData(),
    });
    initUser();
  }, [router]);

  const initUser = () => {
    if (id) {
      singleUser(id).then((data) => {
        if (data.error) {
          console.log(data.error);
        } else {
          setValues({
            ...values,
            name: data.name,
            email: data.email,
            role: data.role,
            password: data.password,
            id: data._id,
          });
        }
      });
    } else {
      setValues({
        ...values,
        name: userData.name,
        email: userData.email,
        username: userData.username,
        role: userData.role,
        password: userData.password,
        id: userData._id,
      });
    }
  };

  const editUser = (e) => {
    e.preventDefault();
    setValues({ ...values, error: false });

    const user = id
      ? { name, email, password, role, _id: userId }
      : { name, email, password, role, username, _id: userId };

    updateUser(user, token, id || userData._id).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        localStorage.setItem("user", JSON.stringify(data.user));
        // router.reload();
        setValues({
          ...values,
          name: "",
          email: "",
          password: "",
          role: "",
          success: `Përdoruesi me emrin "${data.name}" është përditësuar me sukses`,
        });
        if (isAuth()) {
          // Router.replace(`/admin/crud/${router.query.slug}`);
          if (id) router.replace(`/admin/users/manageUsers`);
          else router.replace(`/profile`);
        } else if (isAuth() && isAuth().role === 0) {
          // Router.replace(`/user/crud/${router.query.slug}`);
          router.replace(`/user`);
        }
      }
    });
  };

  const handleChange = (name) => (e) => {
    setValues({ ...values, error: false, [name]: e.target.value });
  };

  const showError = () => (
    <div
      className="alert alert-danger"
      style={{ display: error ? "" : "none" }}
    >
      {error}
    </div>
  );

  // const showSuccess = () => (
  //     <div className="alert alert-success" style={{ display: success ? '' : 'none' }}>
  //         {success}
  //     </div>
  // );

  const updateUserForm = () => {
    return (
      <div className="Signupwh">
        <form className="formsignup" onSubmit={editUser}>
          {id ? (
            <div>
              <label htmlFor="" className="USERROLE">
                User Role*
              </label>
              <select
                id=""
                value={role}
                onChange={handleChange("role")}
                type="text"
                className="roleselect"
                placeholder="Select Role"
              >
                <option>Super Admin</option>
                <option>Admin</option>
                <option>Content Creator</option>
              </select>
              {/* <input type="password" id="PASSWORD" placeholder="at least 8 characters" required/> */}
            </div>
          ) : (
            <div className="form-group">
              <label htmlFor="" className="NAME">
                Username*
              </label>
              <input
                type="text"
                id="NAME"
                placeholder="username..."
                value={username}
                onChange={handleChange("username")}
                required
              />
            </div>
          )}

          <div>
            <div className="form-group">
              <label htmlFor="" className="NAME">
                Full Name*
              </label>
              <input
                type="text"
                id="NAME"
                placeholder="John Doe"
                value={name}
                onChange={handleChange("name")}
                required
              />
            </div>
          </div>
          <div>
            <div className="form-group">
              <label htmlFor="" className="EMAIL">
                Email*
              </label>
              <input
                type="text"
                id="EMAIL"
                placeholder="name@gmail.com"
                value={email}
                onChange={handleChange("email")}
                required
              />
            </div>
          </div>

          <div>
            <div className="form-group">
              <label htmlFor="" className="PASSWORD">
                Password*
              </label>
              <input
                type="password"
                id="PASSWORD"
                placeholder="at least 8 characters"
                value={password}
                onChange={handleChange("password")}
              />
            </div>
          </div>

          <div className="TwoBtns ms-0">
            <button type="submit" className="Btn1">
              SAVE
            </button>
            <button type="button" className="cancelbtn">
              {" "}
              <Link href="/admin/users/manageUsers">GO BACK</Link>
            </button>
          </div>
          {/* <div className="signupbutton"><button type="submit" className="signupbutt">RUAJ</button></div>   
             <button type="button" className="cancelbtn"> <Link href="/admin/users/manageUsers">ANULO / SHKO PAS</Link></button> */}
        </form>

        {/* <div className="psig">
                <p>Does this account already exist? <span className="spasign"> Sign-In</span></p>
            </div> */}
        <p className="cop22">&copy; 2022 ALBIMALL</p>
      </div>
    );
  };

  return (
    <React.Fragment>
      <div className="c" width="100px">
        {showError()}
        {/* {showSuccess()} */}
      </div>
      <div className="Siglogo" id="signuplogo">
        <img src="/images/ALBI LOGO ZI.svg" alt="" />
      </div>

      {showForm && updateUserForm()}
    </React.Fragment>
  );
};

export default UserUpdate;
