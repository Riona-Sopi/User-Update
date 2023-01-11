import Router from 'next/router';
import Link from 'next/link';
import { signout, isAuth } from '../actions/auth';
import Admin from './auth/Admin';

export default function Nav() {
    return(
      <Admin>
        {isAuth() &&(
      <div className='Navbar3'>
      <nav className="navbar navbar-expand-lg p-0">
  <p className="navtitle">DASHBOARD</p>
  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
  </button>

  <div className="collapse navbar-collapse" id="navbarSupportedContent">
<div>
    <ul className="navbar-nav mr-sm-2">
      <li className="nav-itemM">
          <p className="em">{`${isAuth().name}`}</p>
          <p>{isAuth().email}</p>
      </li>
      <li className="nav-item ">
        <img className="nasa" src="" alt="" />
      </li>
    </ul>
   </div>
  </div>
</nav>
</div>
 )}
</Admin>
    )
}