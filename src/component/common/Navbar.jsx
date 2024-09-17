/* eslint-disable no-unused-vars */
// /* eslint-disable no-unused-vars */
import React from 'react'
import { NavLink, useLocation, useNavigate } from 'react-router-dom'
import ApiService from '../../service/ApiService'

function Navbar() {

    const isAuthenticated = ApiService.isAuthenticated();
    const isAdmin = ApiService.isAdmin();
    const isUser = ApiService.isUser();
    const navigate = useNavigate();

    console.log("isAuthenticated:", isAuthenticated); // Check if authenticated
    console.log("isAdmin:", isAdmin);                 // Check if admin
    console.log("isUser:", isUser);

    const handlelogout = () => {
        const isLogout = window.confirm("Are sure you want to logout")
        if (isLogout) {
            ApiService.logout();
            navigate("/home")
        }
    }

    return (
        <nav className='navbar'>
            <div className='navbar-brand'>
                <NavLink to="home">Hspace Hotel</NavLink>
            </div>
            <div>
                <ul className='navbar-ul'>
                    <li><NavLink to="/home" activeclassname="active">Home</NavLink></li>
                    <li><NavLink to="/rooms" activeclassname="active">Rooms</NavLink></li>
                    <li><NavLink to="/find_bookings" activeclassname="active">My Bookings</NavLink></li>

                    {isUser && <li><NavLink to="/profile" activeclassname="active">Profile</NavLink></li>}
                    {isAdmin && <li><NavLink to="/admin" activeclassname="active">Admin</NavLink></li>}

                    {!isAuthenticated && <li><NavLink to="/login" activeclassname="active">Login</NavLink></li>}
                    {!isAuthenticated && <li><NavLink to="/register" activeclassname="active">Register</NavLink></li>}
                    {isAuthenticated && <li onClick={handlelogout}>Logout</li>}
                </ul>

            </div>
        </nav>
    )

}

export default Navbar
