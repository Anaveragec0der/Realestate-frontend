import { NavLink } from "react-router-dom"
export default function Sidebar(){
    return(
        <>
<ul className="nav nav-tabs">
  <li className="nav-item">
    <NavLink className="nav-link" to='/dashboard'>Dashboard</NavLink>
  </li>
  <li className="nav-item">
    <NavLink className="nav-link" to='/user/wishlist'>WishList</NavLink>
  </li>
  <li className="nav-item">
    <NavLink className="nav-link" to='/user/enquiries'>Enquiries</NavLink>
  </li>
  <li className="nav-item">
    <NavLink className="nav-link" to='/ad/create'>Create Ad</NavLink>
  </li>
  <li className="nav-item">
    <NavLink className="nav-link" to='/user/profile'>Profile</NavLink>
  </li>
  <li className="nav-item">
    <NavLink className="nav-link" to='/user/setting'>Settings</NavLink>
  </li>
</ul>
        </>
    )
}