import Link from 'next/link';
import { useState, useEffect } from 'react';
import React from 'react';
import { getCookie, isAuth } from '../../actions/auth';
import { list, removeUser } from '../../actions/user';
import { TRY } from '../../config';
import { Parser } from 'html-to-react';
import moment from 'moment';
import ReactPaginate from 'react-paginate';


const UsersRead = ({ router }) => {
    const [users, setUsers] = useState([]);
    const [message, setMessage] = useState('');
    const token = getCookie('token');

    const [pageNumber, setPageNumber] = useState(0);

    const usersPerPage = 6;

    const pagesVisited = pageNumber * usersPerPage;

    const pageCount = Math.ceil(users.length / usersPerPage);

    const changePage = ({ selected }) => {
      setPageNumber(selected);
    };
   

    useEffect(() => {
        loadUsers();
    }, []);

    const loadUsers = () => {
        list().then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                setUsers(data);
            }
        });
    };

    const deleteUser = _id => {
        removeUser(_id, token).then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                setMessage(data.message);
                loadUsers();
            }
        });
    };


    const deleteConfirm = _id => {
        let answer = window.confirm('A jeni të sigurtë se doni të fshini këtë përdorues?');
        if (answer) {
            deleteUser(_id);
        }
    };

    const showUpdateButton = user => {
        if (isAuth()) {
            return (
                <Link href={`/admin/users/${user._id}`}>
                    <button className="Btn1">UPDATE</button>
                </Link>
            );
        } else if (isAuth()) {
            return (
                <Link href={`/admin/users/${user._id}`}>
                    <button className="Btn1">UPDATE</button>
                </Link>
            );
        }
    };
    var obj = [...users];
    const displayUsers = obj

    const showAllUsers = () => {
        return users.slice(pagesVisited, pagesVisited + usersPerPage).map((user, i) => {
            return (
                <div className="div2">
                <div className="row" key={i}>
                <div className="col-lg-4 ml-5">
                <label className="text-muted">name: <span className="firstpar">{user.name}</span></label><br/>
                <label className="text-muted">email: <span className="firstpar">{user.email}</span></label><br/>
                <label className="text-muted">role: <span className="firstpar">{user.role}</span></label>
                <div className="Btns mt-3">
                {showUpdateButton(user)}
                <button className="secondbtn" onClick={() => deleteConfirm(user._id)}> Delete User </button>
                </div>
                </div>
                </div>
                </div>
            );
        });
    };



    return (
        <React.Fragment>
           
                {showAllUsers()}
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

export default UsersRead;