import axios from "axios"

export default class ApiService {

    static BASE_URL = "http://localhost:8080"

    static getHeader() {
        const token = localStorage.getItem("token");
        return {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
        };
    }

    static async registerUser(registration) {
        const response = await axios.post(`${this.BASE_URL}/auth/register`, registration)
        return response.data
    }

    static async loginUser(loginDetails) {
        const response = await axios.post(`${this.BASE_URL}/auth/login`, loginDetails)
        return response.data
    }

    static async getAllUsers() {
        const response = await axios.get(`${this.BASE_URL}/users/all`, { header: this.getHeader() })
        return response.data
    }

    static async getUserProfile() {
        const response = await axios.get(`${this.BASE_URL}/users/get-logged-in-profile-info`,
            { header: this.getHeader() })
        return response.data
    }

    static async getUser(userId) {
        const response = await axios.get(`${this.BASE_URL}/users/${userId}`,
            { header: this.getHeader() })
        return response.data
    }

    static async getUserBookings(userId) {
        const response = await axios.get(`${this.BASE_URL}/users/get-user-bookings/${userId}`,
            { header: this.getHeader() })
        return response.data
    }

    static async deleteUser(userId) {
        const response = await axios.delete(`${this.BASE_URL}/users/delete/${userId}`,
            { header: this.getHeader() })
        return response.data
    }

    static async addRoom(formData) {
        const result = await axios.post(`${this.BASE_URL}/rooms/add`, formData,
            { header: { ...this.getHeader(), 'Content-type': 'multipart/form-data' } });
        return result.data
    }

    static async getAllAvailableRooms() {
        const response = await axios.get(`${this.BASE_URL}/rooms/all-available-rooms`,
            { header: this.getHeader() })
        return response.data
    }

    static async getAllAvailableRoomsByDateAndType(checkInDate, checkOutDate, roomType) {
        const response = await axios.get(`${this.BASE_URL}/available-rooms-by-dates-and-types?checkInDate=${checkInDate}&checkOutDate=${checkOutDate}&roomType=${roomType}`,
            { header: this.getHeader() })
        return response.data
    }

    static async getRoomTypes() {
        const response = await axios.get(`${this.BASE_URL}/rooms/types`,
            { header: this.getHeader() })
        return response.data
    }

    static async getAllRooms() {
        const response = await axios.get(`${this.BASE_URL}/rooms/all`,
            { header: this.getHeader() })
        return response.data
    }

    static async getRoomById(roomId) {
        const response = await axios.get(`${this.BASE_URL}/rooms/get-room-by-id/${roomId}`,
            { header: this.getHeader() })
        return response.data
    }

    static async deleteRoom(roomId) {
        const response = await axios.delete(`${this.BASE_URL}/rooms/delete/${roomId}`,
            { header: this.getHeader() })
        return response.data
    }

    static async updateRoom(roomId, formData) {
        const response = await axios.put(`${this.BASE_URL}/rooms/update/${roomId}`, formData,
            {
                header: {
                    ...this.getHeader(),
                    'Content-Type': 'multipart/form-data'
                }
            })
        return response.data
    }

    static async bookRoom(roomId, userId, booking) {
        console.log("USER ID : ", userId)
        const response = await axios.post(`${this.BASE_URL}/bookings/book-room/${roomId}/${userId}`,
            booking,
            { header: this.getHeader() })
        return response.data
    }

    static async getAllBookings() {
        const response = await axios.get(`${this.BASE_URL}/bookings/all`,
            { header: this.getHeader() })
        return response.data
    }

    static async getBookingByConfirmationCode(bookingCode) {
        const response = await axios.get(`${this.BASE_URL}/bookings/get-by-code/${bookingCode}`,
            { header: this.getHeader() })
        return response.data
    }

    static async cancelBooking(bookingId) {
        const response = await axios.delete(`${this.BASE_URL}/bookings/cancel/${bookingId}`,
            { header: this.getHeader() })
        return response.data
    }

    /*Authentication Center*/
    static logout() {
        localStorage.removeItem('token')
        localStorage.removeItem('role')
    }

    static isAuthenticated() {
        const token = localStorage.getItem('token')
        return !!token
    }

    static isAdmin() {
        const role = localStorage.getItem('role')
        return role === 'ADMIN'
    }

    static isUser() {
        const role = localStorage.getItem('role')
        return role === 'USER'
    }
}