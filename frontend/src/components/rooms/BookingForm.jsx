
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Loader2, Calendar, Users, X } from 'lucide-react'
import { toast } from 'sonner'
import { api } from '@/lib/api'
import { useAuth } from '@/context/AuthContext'
import { Input } from '../ui/input'

export function BookingForm({ room, onSuccess, onCancel }) {
  const { user, isAuthenticated } = useAuth()
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    checkInDate: '',
    checkOutDate: '',
    guestFullName: '',
    guestEmail: user?.email || '',
    numOfAdults: 1,
    numOfChildren: 0,
  })

  const handleChange = (e) => {
    const { name, value, type } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'number' ? Number(value) || 0 : value
    }))
  }

  const validateDates = () => {
    const checkIn = new Date(formData.checkInDate)
    const checkOut = new Date(formData.checkOutDate)
    const today = new Date()
    today.setHours(0, 0, 0, 0)

    if (checkIn < today) {
      toast.error('The entry date cannot be in the past')
      return false
    }

    if (checkOut <= checkIn) {
      toast.error('The departure date must be later than the arrival date')
      return false
    }

    return true
  }

  const calculateNights = () => {
    if (!formData.checkInDate || !formData.checkOutDate) return 0
    const diff =
      new Date(formData.checkOutDate) - new Date(formData.checkInDate)
    return Math.ceil(diff / (1000 * 60 * 60 * 24))
  }

  const nights = calculateNights()
  const totalPrice = nights * room.roomPrice

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!validateDates()) return

    if (!formData.guestFullName.trim()) {
      toast.error('Enter you full name')
      return
    }

    if (!formData.guestEmail.trim()) {
      toast.error('Enter you email')
      return
    }

    const totalGuests = formData.numOfAdults + formData.numOfChildren
    if (room.capacity && totalGuests > room.capacity) {
      toast.error(`Maximum capacity: ${room.capacity} guests`)
      return
    }

    setIsLoading(true)

    try {
      const response = await api.createBooking(room.id, formData)
      console.log('Booking response:', response)
      // Extract confirmation code from response
      const confirmationCode = response.data || response
      toast.success('Confirmed booking')
      onSuccess(confirmationCode)
    } catch (error) {
      console.error('Booking error:', error)
      toast.error('Failed to create booking. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const today = new Date().toISOString().split('T')[0]

  return (
   <form onSubmit={handleSubmit} className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold">Booking Details</h3>
        <Button type="button" variant="ghost" size="sm" onClick={onCancel}>
          <X className="h-4 w-4" />
        </Button>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="checkInDate">Check In</Label>
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              id="checkInDate"
              name="checkInDate"
              type="date"
              value={formData.checkInDate}
              onChange={handleChange}
              min={today}
              required
              className="pl-10"
            />
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="checkOutDate">Check Out</Label>
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              id="checkOutDate"
              name="checkOutDate"
              type="date"
              value={formData.checkOutDate}
              onChange={handleChange}
              min={formData.checkInDate || today}
              required
              className="pl-10"
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="numOfAdults">Adults</Label>
          <div className="relative">
            <Users className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              id="numOfAdults"
              name="numOfAdults"
              type="number"
              min="1"
              max={room.capacity || 10}
              value={formData.numOfAdults}
              onChange={handleChange}
              required
              className="pl-10"
            />
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="numOfChildren">Childrens</Label>
          <div className="relative">
            <Users className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              id="numOfChildren"
              name="numOfChildren"
              type="number"
              min="0"
              value={formData.numOfChildren}
              onChange={handleChange}
              className="pl-10"
            />
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="guestFullName">Full name</Label>
        <Input
          id="guestFullName"
          name="guestFullName"
          type="text"
          placeholder="Juan Perez"
          value={formData.guestFullName}
          onChange={handleChange}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="guestEmail">Email</Label>
        <Input
          id="guestEmail"
          name="guestEmail"
          type="email"
          placeholder="juan@email.com"
          value={formData.guestEmail}
          onChange={handleChange}
          required
        />
      </div>

      {nights > 0 && (
        <div className="border-t pt-4 space-y-2">
          <div className="flex justify-between text-sm">
            <span>${room.roomPrice} x {nights} night{nights > 1 ? 's' : ''}</span>
            <span>${totalPrice}</span>
          </div>
          <div className="flex justify-between font-semibold text-lg">
            <span>Total</span>
            <span className="text-primary">${totalPrice}</span>
          </div>
        </div>
      )}

      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Processing...
          </>
        ) : (
          'Confirm Booking'
        )}
      </Button>

      {!isAuthenticated && (
        <p className="text-xs text-center text-muted-foreground">
          Login to save your bookings to your account.
        </p>
      )}
    </form>
  )
}


// import { useState } from 'react'
// import { Button } from '@/components/ui/button'
// import { Label } from '@/components/ui/label'
// import { Loader2, Calendar, Users, X } from 'lucide-react'
// import { toast } from 'sonner'
// import { api } from '@/lib/api'
// import { useAuth } from '@/context/AuthContext'
// import { Input } from '../ui/input'

// export function BookingForm({ room, onSuccess, onCancel }) {
//   const { user, isAuthenticated } = useAuth()
//   const [isLoading, setIsLoading] = useState(false)
//   const [formData, setFormData] = useState({
//     checkInDate: '',
//     checkOutDate: '',
//     guestFullName: '',
//     guestEmail: user?.email || '',
//     numOfAdults: 1,
//     numOfChildren: 0,
//   })

//   const handleChange = (e) => {
//     const { name, value, type } = e.target
//     setFormData(prev => ({
//       ...prev,
//       [name]: type === 'number' ? Number(value) || 0 : value
//     }))
//   }

//   const validateDates = () => {
//     const checkIn = new Date(formData.checkInDate)
//     const checkOut = new Date(formData.checkOutDate)
//     const today = new Date()
//     today.setHours(0, 0, 0, 0)

//     if (checkIn < today) {
//       toast.error('The entry date cannot be in the past')
//       return false
//     }

//     if (checkOut <= checkIn) {
//       toast.error('The departure date must be later than the arrival date')
//       return false
//     }

//     return true
//   }

//   const calculateNights = () => {
//     if (!formData.checkInDate || !formData.checkOutDate) return 0
//     const diff =
//       new Date(formData.checkOutDate) - new Date(formData.checkInDate)
//     return Math.ceil(diff / (1000 * 60 * 60 * 24))
//   }

//   const nights = calculateNights()
//   const totalPrice = nights * room.roomPrice

//   const handleSubmit = async (e) => {
//     e.preventDefault()

//     if (!validateDates()) return

//     if (!formData.guestFullName.trim()) {
//       toast.error('Enter you full name')
//       return
//     }

//     if (!formData.guestEmail.trim()) {
//       toast.error('Enter you email')
//       return
//     }

//     const totalGuests = formData.numOfAdults + formData.numOfChildren
//     if (room.capacity && totalGuests > room.capacity) {
//       toast.error(`Maximum capacity: ${room.capacity} guests`)
//       return
//     }

//     setIsLoading(true)

//     try {
//       const confirmationCode = await api.bookRoom(room.id, formData)
//       toast.success('Confirmed booking')
//       onSuccess(confirmationCode)
//     } catch {
//       const fakeCode = `DR${Date.now().toString(36).toUpperCase()}`
//       toast.success('Confirmed booking (demo)')
//       onSuccess(fakeCode)
//     } finally {
//       setIsLoading(false)
//     }
//   }

//   const today = new Date().toISOString().split('T')[0]

//   return (
//    <form onSubmit={handleSubmit} className="space-y-4">
//       <div className="flex items-center justify-between">
//         <h3 className="font-semibold">Booking Details</h3>
//         <Button type="button" variant="ghost" size="sm" onClick={onCancel}>
//           <X className="h-4 w-4" />
//         </Button>
//       </div>

//       <div className="grid grid-cols-2 gap-4">
//         <div className="space-y-2">
//           <Label htmlFor="checkInDate">Check In</Label>
//           <div className="relative">
//             <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
//             <Input
//               id="checkInDate"
//               name="checkInDate"
//               type="date"
//               value={formData.checkInDate}
//               onChange={handleChange}
//               min={today}
//               required
//               className="pl-10"
//             />
//           </div>
//         </div>
//         <div className="space-y-2">
//           <Label htmlFor="checkOutDate">Check Out</Label>
//           <div className="relative">
//             <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
//             <Input
//               id="checkOutDate"
//               name="checkOutDate"
//               type="date"
//               value={formData.checkOutDate}
//               onChange={handleChange}
//               min={formData.checkInDate || today}
//               required
//               className="pl-10"
//             />
//           </div>
//         </div>
//       </div>

//       <div className="grid grid-cols-2 gap-4">
//         <div className="space-y-2">
//           <Label htmlFor="numOfAdults">Adults</Label>
//           <div className="relative">
//             <Users className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
//             <Input
//               id="numOfAdults"
//               name="numOfAdults"
//               type="number"
//               min="1"
//               max={room.capacity || 10}
//               value={formData.numOfAdults}
//               onChange={handleChange}
//               required
//               className="pl-10"
//             />
//           </div>
//         </div>
//         <div className="space-y-2">
//           <Label htmlFor="numOfChildren">Childrens</Label>
//           <div className="relative">
//             <Users className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
//             <Input
//               id="numOfChildren"
//               name="numOfChildren"
//               type="number"
//               min="0"
//               value={formData.numOfChildren}
//               onChange={handleChange}
//               className="pl-10"
//             />
//           </div>
//         </div>
//       </div>

//       <div className="space-y-2">
//         <Label htmlFor="guestFullName">Full name</Label>
//         <Input
//           id="guestFullName"
//           name="guestFullName"
//           type="text"
//           placeholder="Juan Perez"
//           value={formData.guestFullName}
//           onChange={handleChange}
//           required
//         />
//       </div>

//       <div className="space-y-2">
//         <Label htmlFor="guestEmail">Email</Label>
//         <Input
//           id="guestEmail"
//           name="guestEmail"
//           type="email"
//           placeholder="juan@email.com"
//           value={formData.guestEmail}
//           onChange={handleChange}
//           required
//         />
//       </div>

//       {nights > 0 && (
//         <div className="border-t pt-4 space-y-2">
//           <div className="flex justify-between text-sm">
//             <span>${room.roomPrice} x {nights} night{nights > 1 ? 's' : ''}</span>
//             <span>${totalPrice}</span>
//           </div>
//           <div className="flex justify-between font-semibold text-lg">
//             <span>Total</span>
//             <span className="text-primary">${totalPrice}</span>
//           </div>
//         </div>
//       )}

//       <Button type="submit" className="w-full" disabled={isLoading}>
//         {isLoading ? (
//           <>
//             <Loader2 className="mr-2 h-4 w-4 animate-spin" />
//             Processing...
//           </>
//         ) : (
//           'Confirm Booking'
//         )}
//       </Button>

//       {!isAuthenticated && (
//         <p className="text-xs text-center text-muted-foreground">
//           Login to save your bookings to your account.
//         </p>
//       )}
//     </form>
//   )
// }
