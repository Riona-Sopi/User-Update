import Link from 'next/link';
import { useState, useEffect } from 'react';
import { listSearch } from '../../actions/user';
import { getCookie, isAuth } from '../../actions/auth';
import { TRY } from '../../config';
import moment from 'moment';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faSearch
  } from "@fortawesome/free-solid-svg-icons";

const Search = () => {
    const [values, setValues] = useState({
        search: undefined,
        results: [],
        searched: false,
        message: ''
    });

    const { search, results, searched, message } = values;

    const searchSubmit = e => {
        e.preventDefault();
        listSearch({ search }).then(data => {
            setValues({ ...values, results: data, searched: true, message: `Përdorues të gjetur: ${data.length}` });
        });
    };

    const handleChange = e => {
        // console.log(e.target.value);
        setValues({ ...values, search: e.target.value, searched: false, results: [] });
    };

    const showUpdateButton = user => {
        if (isAuth()) {
            return (
                <Link href={`/admin/users/${user._id}`}>
                    <button className="Btn1 mr-3">PËRDITËSO</button>
                </Link>
            );
        } else if (isAuth()) {
            return (
                <Link href={`/admin/users/${user._id}`}>
                    <button className="Btn1">PËRDITËSO</button>
                </Link>
            );
        }
    };

    const searchedUsers = (results = []) => {
        return (
            <div className="jumbotron bg-white">
                {message && <p className="pt-4 text-muted font-italic searchmsg">{message}</p>}

                {results.map((user, i) => {
                    return (
                        <div className="divsearch">
                        <div className="row mb-5 mt-5" key={i}>
                        <div className="col-lg-4 ml-5">
                        <label className="text-muted">Emri: <span className="firstpar">{user.name}</span></label><br/>
                        <label className="text-muted">Email: <span className="firstpar">{user.email}</span></label><br/>
                        <label className="text-muted">Roli: <span className="firstpar">{user.role}</span></label>
                        <div className="Btns mt-3">
                        {showUpdateButton(user)}
                        <button className="secondbtn" onClick={() => deleteConfirm(user._id)}> Fshij Përdoruesin </button>
                        </div>
                        </div>
                        </div>
                        <div className="col-lg-10">
                        </div>
                        </div>
                        // <div key={i}>
                        //     <Link href={`/admin/brand/${brand.slug}`}>
                        //         <a className="text-primary">{brand.name}</a>
                        //     </Link>
                        // </div>
                    );
                })}
            </div>
        );
    };

    const searchForm = () => (
        <form onSubmit={searchSubmit}>
            {/* <div class="search-box">
                <button class="btn-search"><FontAwesomeIcon icon={faSearch} className="icons" style={{ fontSize: 20, color: "black"}}/></button>
                <input type="search" className="form-control input-search" placeholder="Kërkoni Brende..." onChange={handleChange}/>
            </div> */}
            <div className="row">
                <div className="col-md-3">
                    <input type="search" className="form-control searchbox" placeholder="Kërko Përdorues" onChange={handleChange}/>
                </div>

                <div className="col-md-4 ps-0">
                    <button className="btn btnicon" type="submit">
                            <FontAwesomeIcon icon={faSearch} className="icons" style={{ fontSize: 20, color: "#515151"}}/>
                    </button>
                </div>
            </div>
        </form>
    );

    return (
        <div className="container-fluid ps-0">
            <div className="pt-3 pb-5">{searchForm()}</div>
            {searched && <div style={{ marginTop: '-120px', marginBottom: '-80px' }}>{searchedUsers(results)}</div>}
        </div>
    );
};

export default Search;