/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ApiService from '../../service/ApiService';
import Pagination from '../common/Pagination';

const ManageBookingsPage = () => {
    const [bookings, setBookings] = useState([]); // Initialize with empty array
    const [filteredBookings, setFilteredBookings] = useState([]); // Initialize with empty array
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [bookingsPerPage] = useState(6);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchBookings = async () => {
            try {
                setLoading(true);
                const response = await ApiService.getAllBookings();
                console.log('API Response:', response); // Debug API response
                const allBookings = Array.isArray(response?.bookingDTOList) ? response.bookingDTOList : []; // Ensure it's an array or use empty array
                console.log('All Bookings:', allBookings); // Debug bookings data
                setBookings(allBookings);
                setFilteredBookings(allBookings);
            } catch (error) {
                console.error('Error fetching bookings:', error.message);
            } finally {
                setLoading(false); // Stop loading after API call
            }
        };

        fetchBookings();
    }, []);

    // Define filterBookings function outside of useEffect
    const filterBookings = (term) => {
        if (term === '') {
            setFilteredBookings(bookings);
        } else {
            const filtered = bookings.filter((booking) =>
                booking.bookingConfirmationCode &&
                booking.bookingConfirmationCode.toLowerCase().includes(term.toLowerCase())
            );
            setFilteredBookings(filtered);
        }
        setCurrentPage(1);
    };

    useEffect(() => {
        filterBookings(searchTerm); // Use filterBookings function
    }, [searchTerm, bookings]); // Only dependencies needed here

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    // Safely handle the slice if filteredBookings is valid and initialized as an array
    const indexOfLastBooking = currentPage * bookingsPerPage;
    const indexOfFirstBooking = indexOfLastBooking - bookingsPerPage;
    const currentBookings = filteredBookings.slice(indexOfFirstBooking, indexOfLastBooking);

    console.log('Current Bookings:', currentBookings); // Debug current bookings

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    if (loading) {
        return <p>Loading...</p>; // Display loading message while fetching
    }

    return (
        <div className='bookings-container'>
            <h2>All Bookings</h2>
            <div className='search-div'>
                <label>Filter by Booking Number:</label>
                <input
                    type="text"
                    value={searchTerm}
                    onChange={handleSearchChange}
                    placeholder="Enter booking number"
                />
            </div>

            <div className="booking-results">
                {currentBookings.length > 0 ? (
                    currentBookings.map((booking) => (
                        booking && (
                            <div key={booking.id} className="booking-result-item">
                                <p><strong>Booking Code:</strong> {booking.bookingConfirmationCode || 'N/A'}</p>
                                <p><strong>Check In Date:</strong> {booking.checkInDate || 'N/A'}</p>
                                <p><strong>Check Out Date:</strong> {booking.checkOutDate || 'N/A'}</p>
                                <p><strong>Total Guests:</strong> {booking.totalNumOfGuest || 'N/A'}</p>
                                <button
                                    className="edit-room-button"
                                    onClick={() => navigate(`/admin/edit-booking/${booking.bookingConfirmationCode}`)}
                                >Manage Booking</button>
                            </div>
                        )
                    ))
                ) : (
                    <p>No bookings found.</p>
                )}
            </div>

            <Pagination
                roomsPerPage={bookingsPerPage}
                totalRooms={filteredBookings.length}
                currentPage={currentPage}
                paginate={paginate}
            />
        </div>
    );
};

export default ManageBookingsPage;
