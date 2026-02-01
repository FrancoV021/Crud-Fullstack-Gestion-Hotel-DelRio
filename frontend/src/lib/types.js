// ==============================
// USERS & AUTH
// ==============================

export const User = {
  id: 0,
  firstName: "",
  lastName: "",
  email: "",
  roles: [],
}

export const Role = {
  id: 0,
  name: "",
}

// ==============================
// ROOMS
// ==============================

export const Room = {
  id: 0,
  roomType: "",
  roomPrice: 0,
  isBooked: false,
  photo: "",
  description: "",
  capacity: 0,
  bedType: "",
  amenities: [],
}

// ==============================
// BOOKINGS
// ==============================

export const BookedRoom = {
  id: 0,
  checkInDate: "",
  checkOutDate: "",
  guestFullName: "",
  guestEmail: "",
  numOfAdults: 0,
  numOfChildren: 0,
  totalNumOfGuest: 0,
  bookingConfirmationCode: "",
  room: Room,
}

export const BookingRequest = {
  checkInDate: "",
  checkOutDate: "",
  guestFullName: "",
  guestEmail: "",
  numOfAdults: 0,
  numOfChildren: 0,
}

// ==============================
// AUTH REQUESTS
// ==============================

export const LoginRequest = {
  email: "",
  password: "",
}

export const RegisterRequest = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
}

// ==============================
// RESPONSES & PAGINATION
// ==============================

export const AuthResponse = {
  token: "",
  user: null,
}

export const ApiResponse = {
  data: null,
  message: "",
  error: "",
}

export const PaginatedResponse = {
  content: [],
  totalPages: 0,
  totalElements: 0,
  currentPage: 0,
  pageSize: 0,
}

// ==============================
// ENUMS / CONSTANTS
// ==============================

export const ROOM_TYPES = [
  "Single",
  "Double",
  "Suite",
  "Deluxe",
  "Family",
  "Presidential",
]
