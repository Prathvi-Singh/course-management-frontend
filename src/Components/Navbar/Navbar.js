import{ React ,useContext,useEffect } from 'react';
import {Link} from 'react-router-dom'
import {DataContext} from '../../context/DataProvider.js'
import images from '../../images/images.png';
import logo from '../../images/logo_white.png';

const logoutUser=()=>{
  localStorage.clear();
  sessionStorage.clear();
}
const image1="http://iiitk.eabyas.in/pluginfile.php/1/core_admin/logocompact/300x300/1671446873/logo_white.png"

const Navbar=()=>{
  const {account}=useContext(DataContext)
  

    return (
      <>
       <nav className="navbar navbar-expand-lg navbar-light bg-light ">
  <a className="navbar-brand" href="/dashboard"><img src={logo} style={{width:"40px"}}></img><span class="site-name d-none d-md-inline">IIITDM Kurnool</span></a>
  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
  <img src={images} style={{width:"40px"}}/>
  </button> 

  <div className="collapse navbar-collapse" id="navbarSupportedContent">
    <ul className="navbar-nav  ml-auto">
   
      
      {/* <li className="nav-item active">
        <Link className="nav-link" to="/admindashboard">Dashboard</Link>
      </li>
    
      <li className="nav-item active">
        <Link className="nav-link" to="/login" onClick={logoutUser}>logout</Link>
      </li> */}
    
    <li className="nav-item dropdown">
        <a className="nav-link dropdown-toggle" href="#" id="dropdownMenuButton" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
        <img src={images} style={{width:"40px"}}/>
        </a>
        <div className="dropdown-menu" aria-labelledby="navbarDropdown">
        <Link className="nav-link" to="/dashboard">{account.name}</Link>
        <Link className="nav-link" to="/dashboard">Dashboard</Link>
        <Link className="nav-link" to="/login" onClick={logoutUser}>logout</Link>
        </div>
      </li>
    </ul>
 
  </div>
</nav>
      
      
      </>
    )
}

export default Navbar;