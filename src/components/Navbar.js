import {React, useEffect} from 'react'
import {
    Link,useLocation, useNavigate
  } from "react-router-dom";

const Navbar = (props) => {

    let location = useLocation();
    let navigate = useNavigate()

    useEffect(() => {
      // Google Analytics
        console.log(location.pathname)
    }, [location]);

    const handlelogout=()=>{
      localStorage.removeItem('token')
      navigate("/login")
    }
  
  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
  <div className="container-fluid">
    <Link className="navbar-brand" to="/">Navbar</Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <Link className={`nav-link ${location.pathname === "/"?"active": "" }`} aria-current="page" to="/">Home</Link>
        </li>
        <li className="nav-item">
          <Link className={`nav-link ${location.pathname === "/about"?"active": "" }`}aria-current="page" to="/about">about</Link>
        </li>

      </ul>
     {!localStorage.getItem('token') ?<form className="d-flex" role="search">
      <Link className="btn btn-primary mx-1" role="button" to='/login' aria-disabled="true">login</Link>
      <Link className="btn btn-primary mx-1" role="button"to='/signup' aria-disabled="true">signup</Link>
      </form> : <button className='btn btn-primary' onClick={handlelogout}>Logout</button>}
    </div>
  </div>
</nav>
    </div>
  )
}

export default Navbar


