/* eslint-disable no-unused-vars */
import React from 'react'
import { NavLink, useLocation, useNavigate } from 'react-router-dom'
import ApiService from '../../service/ApiService'

function Navbar() {

    const isAuthenticated = ApiService.isAuthenticated();
    const isAdmin = ApiService.isAdmin();
    const isUser = ApiService.isUser();
    const navigate = useNavigate();

    const handlelogout = () => {
        const isLogout = window.confirm("Are sure you want to logout")
        if (isLogout) {
            ApiService.logout();
            navigate("/home")
        }
    }

    return (
        <nav>
            <div className='navbar-brand'>
                <NavLink to="home">Hspace Hotel</NavLink>

            </div>
            <ul className='navbar-ul'>
                <li><NavLink to="/home" activeClass="active">Home</NavLink></li>
                <li><NavLink to="/rooms" activeClass="active">Rooms</NavLink></li>
                <li><NavLink to="/find_bookings" activeClass="active">My Bookings</NavLink></li>

                {isUser && <li><NavLink to="/profile" activeClass="active">Progile</NavLink></li>}
                {isAdmin && <li><NavLink to="/admin" activeClass="active">Admin</NavLink></li>}

                {isAuthenticated && <li><NavLink to="/login" activeClass="active">Login</NavLink></li>}
                {isAuthenticated && <li><NavLink to="/register" activeClass="active">Register</NavLink></li>}
                {isAuthenticated && <li onClick={handlelogout}>Logout</li>}
            </ul>
        </nav>
    )

}

export default Navbar
