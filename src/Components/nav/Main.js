import { NavLink } from "react-router-dom";
import {useAuth} from '../../context/auth.js'
import { useNavigate } from "react-router-dom";
export default function Main(){
  const[auth,setAuth]=useAuth()
  const navigate=useNavigate()

  function logout(){
    setAuth({user:null,token:"",refreshToken:""})
    localStorage.removeItem('auth')
    navigate('/login')
  }
  const loggedIn=auth.user!==null && auth.token!=='' && auth.refreshToken!==''
  const handlePostAdClick=()=>{
    if(loggedIn){
      navigate('/ad/create')
    }else{
      navigate('/login')
    }
  }
    return( 
<ul className="nav d-flex justify-content-between lead">
  <li className="nav-item">
    <NavLink className="nav-link" aria-current="page" to="/">Home</NavLink>
  </li>
  <li className="nav-item">
    <NavLink className="nav-link" aria-current="page" to="/search">Search</NavLink>
  </li>
  <li className="nav-item">
    <NavLink className="nav-link" aria-current="page" to="/buy">Buy</NavLink>
  </li>
  <li className="nav-item">
    <NavLink className="nav-link" aria-current="page" to="/rent">Rent</NavLink>
  </li>
  <li className="nav-item">
    <NavLink className="nav-link" aria-current="page" to="/agents">Agents</NavLink>
  </li>
  <a className='nav-link pointer'onClick={handlePostAdClick}>Post Ad</a>
 {!loggedIn ?
 ( 
 <>
  <li className="nav-item">
    <NavLink className="nav-link" to="/login">Login</NavLink>
  </li>
  <li className="nav-item">
    <NavLink className="nav-link" to="/Register">Register</NavLink>
  </li>
  </>
  ) :(
    ""
    )}
  {loggedIn ? (<div className="dropdown">
    <li>
      <a className="nav-link dropdown-toggle pointer" data-bs-toggle="dropdown">User</a>
      {auth?.user?.name ? auth?.user?.name : auth?.user?.username}
      <ul className="dropdown-menu">
        <li>
          <NavLink className="nav-link" to="/dashboard">Dashboard</NavLink>
        </li>
        <li>
          <NavLink className="nav-link" to="/user/profile">Profile</NavLink>
        </li>
        <li>
          <NavLink className="nav-link" to="/user/setting">Setting</NavLink>
        </li>
        <li>
            <a onClick={logout} className="nav-link">logout</a>
        </li>
      </ul>
    </li>
  </div>)
  :(
    "")}
</ul>
    )
}