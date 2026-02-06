
const API_BASE_URL =
  import.meta.env.VITE_API_URL || "https://crud-fullstack-gestion-hotel-delrio.onrender.com/api"

class ApiClient {
  getHeaders(includeAuth = false) {
    const headers = {
      "Content-Type": "application/json",
    }

    if (includeAuth) {
      const token = localStorage.getItem("token")
      if (token) {
        headers.Authorization = `Bearer ${token}`
      }
    }

    return headers
  }

  async request(endpoint, options = {}, includeAuth = false) {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers: {
        ...this.getHeaders(includeAuth),
        ...options.headers,
      },
    })

    if (!response.ok) {
      const error = await response.json().catch(() => ({}))
      throw new Error(error.message || `Error ${response.status}`)
    }

    const data = await response.json()
    
    // If response is wrapped in ApiResponse structure, return it as-is
    // The caller can access response.data
    return data
  }

  // ================= AUTH =================

  register(data) {
    return this.request("/auth/register", {
      method: "POST",
      body: JSON.stringify(data),
    })
  }

  login(data) {
    return this.request("/auth/login", {
      method: "POST",
      body: JSON.stringify(data),
    })
  }

  // ================= USERS =================

  getUsers() {
    return this.request("/users/all", {}, true)
  }

  getUserByEmail(email) {
    return this.request(`/users/${email}`, {}, true)
  }

  deleteUser(userId) {
    return this.request(`/users/${userId}`, { method: "DELETE" }, true)
  }

  // ================= ROOMS =================

  getAllRooms() {
    return this.request("/rooms/all")
  }

  getRoomById(roomId) {
    return this.request(`/rooms/${roomId}`)
  }

  getRoomTypes() {
    return this.request("/rooms/types")
  }

  getAvailableRooms() {
    return this.request("/rooms/available")
  }

  async addRoom(formData) {
    const response = await fetch(`${API_BASE_URL}/rooms/add`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: formData,
    })

    if (!response.ok) throw new Error("Failed to add room")
    return response.json()
  }

  async updateRoom(roomId, formData) {
    const response = await fetch(
      `${API_BASE_URL}/rooms/update/${roomId}`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: formData,
      }
    )

    if (!response.ok) throw new Error("Failed to update room")
    return response.json()
  }

  deleteRoom(roomId) {
    return this.request(
      `/rooms/delete/${roomId}`,
      { method: "DELETE" },
      true
    )
  }

  // ================= BOOKINGS =================

  createBooking(roomId, bookingData) {
    return this.request(
      `/bookings/room/${roomId}`,
      {
        method: "POST",
        body: JSON.stringify(bookingData),
      },
      true
    )
  }

  bookRoom(roomId, bookingData) {
    return this.createBooking(roomId, bookingData)
  }

  getBookingByConfirmationCode(code) {
    return this.request(`/bookings/confirmation/${code.trim()}`)
  }

  getAllBookings() {
    return this.request("/bookings/all", {}, true)
  }

  getBookingsByEmail(email) {
    return this.request(`/bookings/user/${email}`, {}, true)
  }

  deleteBooking(bookingId) {
    return this.request(
      `/bookings/${bookingId}`,
      { method: "DELETE" },
      true
    )
  }
}

export const api = new ApiClient()

// ================= EXPORTS PARA COMPONENTES =================

// Auth
export const register = (data) => api.register(data)
export const login = (data) => api.login(data)

// Users
export const getUsers = () => api.getUsers()
export const getUserByEmail = (email) => api.getUserByEmail(email)
export const deleteUser = (id) => api.deleteUser(id)

// Rooms
export const getRooms = () => api.getAllRooms()
export const getRoom = (id) => api.getRoomById(id)
export const getRoomTypes = () => api.getRoomTypes()
export const getAvailableRooms = () => api.getAvailableRooms()
export const addRoom = (formData) => api.addRoom(formData)
export const updateRoom = (id, formData) => api.updateRoom(id, formData)
export const deleteRoom = (id) => api.deleteRoom(id)

// Bookings
export const createBooking = (roomId, data) =>
  api.createBooking(roomId, data)

export const bookRoom = (roomId, data) =>
  api.bookRoom(roomId, data)

export const getBookingByConfirmationCode = (code) =>
  api.getBookingByConfirmationCode(code)

export const getBookings = () => api.getAllBookings()
export const getBookingsByEmail = (email) =>
  api.getBookingsByEmail(email)

export const cancelBooking = (id) => api.deleteBooking(id)


