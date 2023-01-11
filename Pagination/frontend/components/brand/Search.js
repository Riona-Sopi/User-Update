import Link from 'next/link';
import { useState, useEffect } from 'react';
import { listSearch } from '../../actions/brand';
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
            setValues({ ...values, results: data, searched: true, message: `Brende të gjetura: ${data.length}` });
        });
    };

    const handleChange = e => {
        // console.log(e.target.value);
        setValues({ ...values, search: e.target.value, searched: false, results: [] });
    };

    const showUpdateButton = brand => {
        if (isAuth()) {
            return (
                <Link href={`/admin/brands/${brand.slug}`}>
                    <button className="Btn1 mr-3">PËRDITËSO</button>
                </Link>
            );
        } else if (isAuth()) {
            return (
                <Link href={`/admin/brands/${brand.slug}`}>
                    <button className="Btn1">PËRDITËSO</button>
                </Link>
            );
        }
    };

    const searchedBrands = (results = []) => {
        return (
            <div className="jumbotron bg-white">
                {message && <p className="pt-4 text-muted font-italic searchmsg">{message}</p>}

                {results.map((brand, i) => {
                    return (


                        <div className="divsearch">
                        <div className="row" key={i}>
                        <div className="col-lg-2">
                        <img className="Img" src={`${TRY}/${brand.logo}`} alt="" />
                        </div>
        
                        <div className="col-lg-10">
                        <p className="firstpar">{brand.name}</p>
                        {/* <p className="secondpar">Publikuar nga {brand.postedBy.name}, {moment(brand.updatedAt).fromNow()}</p> */}
                        <div className="Btns">
                        {showUpdateButton(brand)}
                        <button className="secondbtn" onClick={() => deleteConfirm(brand.slug)}>Fshij Brendin </button>
                        </div>
                        </div>
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
                    <input type="search" className="form-control searchbox" placeholder="Kërko Brende" onChange={handleChange}/>
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
            {searched && <div style={{ marginTop: '-120px', marginBottom: '-80px' }}>{searchedBrands(results)}</div>}
        </div>
    );
};

export default Search;