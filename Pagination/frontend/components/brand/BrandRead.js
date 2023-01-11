import Link from 'next/link';
import { useState, useEffect } from 'react';
import React from 'react';
import { getCookie, isAuth } from '../../actions/auth';
import { list, removeBrand } from '../../actions/brand';
import { TRY } from '../../config';
import moment from 'moment';
import ReactPaginate from 'react-paginate';
import useLocaleText from '/hooks/useLocaleText';
import LocaleContext from '/context/LocaleContext';
import { languageMap } from '/staticData/dictionary';
import { useContext } from 'react';


const BrandRead = ({ router }) => {
//     const [localeState, localeActions] = useContext(LocaleContext);


    
//   const { header = {} } = (pageContent ?? []);
    // const { pageData } = props;
    // const pageContent = pageData.data[localeState];

    // const pageContent = pageData.data[localeState];

    const [brands, setBrands] = useState([]);
    const [message, setMessage] = useState('');
    const token = getCookie('token');

    const [pageNumber, setPageNumber] = useState(0);

    const usersPerPage = 6;

    const pagesVisited = pageNumber * usersPerPage;

    const pageCount = Math.ceil(brands.length / usersPerPage);

    const changePage = ({ selected }) => {
      setPageNumber(selected);
    };
   

    useEffect(() => {
        loadBrands();
    }, []);

    const loadBrands = () => {
        list().then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                setBrands(data);
            }
        });
    };

    const deleteBrand = slug => {
        removeBrand(slug, token).then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                setMessage(data.message);
                loadBrands();
            }
        });
    };


    const deleteConfirm = slug => {
        let answer = window.confirm('A jeni të sigurtë se doni të fshini këtë brend?');
        if (answer) {
            deleteBrand(slug);
        }
    };

    const showUpdateButton = brand => {
        if (isAuth()) {
            return (
                <Link href={`/admin/brands/${brand.slug}`}>
                    <button className="Btn1">PËRDITËSO</button>
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
    var obj = [...brands];
    const displayUsers = obj

    const showAllBrands = () => {
        return brands.slice(pagesVisited, pagesVisited + usersPerPage).map((brand, i) => {
            return (
                <div className="div2">
                <div className="row" key={i}>
                <div className="col-lg-2">
                <img className="Img" src={`${TRY}/${brand.logo}`} alt="" />
                </div>

                <div className="col-lg-10">
                <p className="firstpar">{brand.name}</p>
                {/* <p className="secondpar">Publikuar nga {brand.postedBy.name}, {moment(brand.updatedAt).fromNow()}</p> */}
                <div className="Btns">
                {showUpdateButton(brand)}
                <button className="secondbtn" onClick={() => deleteConfirm(brand.slug)}> Fshij Brendin </button>
                </div>
                </div>
                </div>
                </div>

            //     <tr key={i}>
            //     <td>{project.title}</td>
            //     <td>{Parser().parse(project.excerpt)}</td>
            //     <td><a href={`${TRY}/${project.image}`} target="_blank" className="viewpic">Shiko Fotografinë</a></td>
            //     <td>
            //         <div className="row ms-3 me-3">
            //             <p className="mark" style={{color:"#97979c"}}>
            //             {/* Shkruar nga {project.postedBy.name} | Publikuar: {moment(project.updatedAt).fromNow()} */}
            //              </p>
            //             <div className="col-lg-6 p-0">
            //                  {showUpdateButton(project)}
            //             </div>
            //             {' '}
            //             <div className="col-lg-6 p-0">
            //                 <button className="formbtn" onClick={() => deleteConfirm(project.slug)}>
            //                      Fshij
            //                 </button>
            //             </div>
            //         </div>
            //     </td>
            // </tr>
            );
        });
    };



    return (
        <React.Fragment>
           
                {showAllBrands()}

                {/* <span
                    className="ml-10 text-sm uppercase hover:text-gjuhet-accent transition-all cursor-pointer p-1 font-black"
                    onClick={
                        () => localeActions.changeLocale(localeState === 0 ? 1 : 0)
                    }
                    >
                    {languageMap[1 - localeState].slice(0, 2)}
                    </span> */}

                <ReactPaginate
                    previousLabel="<"
                    nextLabel=">"
                    pageCount={pageCount}
                    onPageChange={changePage}
                    containerClassName={"paginationBttns"}
                    previousLinkClassName={"previousBttn"}
                    nextLinkClassName={"nextBttn"}
                    disabledClassName={"paginationDisabled"}
                    activeClassName={"paginationActive"}
                 />
                  <hr className="hr1" />
              
        </React.Fragment>
    );
};

export default BrandRead;