
import { useEffect, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { Footer } from '@/components/layout/Footer'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Loader2, Calendar, Users, Trash2, Plus, DollarSign } from 'lucide-react'
import { toast } from 'sonner'
import { getBookingsByEmail, cancelBooking } from '@/lib/api'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { useAuth } from '@/context/AuthContext'

export default function MyBookingsPage() {
  const navigate = useNavigate()
  const { user, isAuthenticated, isLoading: authLoading } = useAuth()

  const [bookings, setBookings] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [deletingId, setDeletingId] = useState(null)

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      navigate('/login')
      return
    }

    if (user?.email) {
      fetchBookings()
    }
  }, [user, isAuthenticated, authLoading, navigate])

  const fetchBookings = async () => {
    try {
      setIsLoading(true)
      console.log('[Fetching bookings for email:', user.email)
      const response = await getBookingsByEmail(user.email)
      console.log('[Bookings response:', response)
      
      // Handle different response structures
      let bookingsList = []
      if (response && response.data && Array.isArray(response.data)) {
        bookingsList = response.data
      } else if (Array.isArray(response)) {
        bookingsList = response
      }
      
      console.log('Final bookings list:', bookingsList)
      setBookings(bookingsList)
    } catch (error) {
      console.error('Error fetching bookings:', error)
      toast.error('Failed to load bookings')
      setBookings([])
    } finally {
      setIsLoading(false)
    }
  }

  const handleCancelBooking = async (bookingId) => {
    setDeletingId(bookingId)
    try {
      await cancelBooking(bookingId)
      setBookings((prev) => prev.filter((b) => b.id !== bookingId))
      toast.success('Booking cancelled successfully')
    } catch (error) {
      console.error('[Cancel booking error:', error)
      toast.error('Failed to cancel booking')
    } finally {
      setDeletingId(null)
    }
  }

  const formatDate = (dateString) =>
    new Date(dateString).toLocaleDateString('es-AR', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    })

  const calculateNights = (checkIn, checkOut) => {
    const start = new Date(checkIn)
    const end = new Date(checkOut)
    return Math.ceil((end - start) / (1000 * 60 * 60 * 24))
  }

  if (authLoading || isLoading) {
    return (
      <main className="pt-20 min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </main>
    )
  }

  return (
    <>
      <main className="pt-20 min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
            <div>
              <h1 className="text-3xl font-serif font-semibold">My Bookings</h1>
              <p className="text-muted-foreground mt-1">
                Manage your reservations at Del Rio
              </p>
            </div>

            <Button asChild>
              <Link to="/rooms" className="flex items-center">
                <Plus className="mr-2 h-4 w-4" />
                New Booking
              </Link>
            </Button>
          </div>

          {bookings.length === 0 ? (
            <Card className="p-8">
              <div className="flex flex-col items-center justify-center py-16">
                <Calendar className="h-12 w-12 text-muted-foreground/50 mb-4" />
                <h3 className="text-lg font-semibold mb-2">No bookings yet</h3>
                <p className="text-muted-foreground text-center mb-6">
                  You haven't made any reservations yet.
                </p>
                <Button asChild>
                  <Link to="/rooms">Explore Rooms</Link>
                </Button>
              </div>
            </Card>
          ) : (
            <div className="space-y-4">
              {bookings.map((booking) => {
                const nights = calculateNights(
                  booking.checkInDate,
                  booking.checkOutDate
                )
                const totalPrice = nights * (booking.room?.roomPrice || 0)
                const isPast = new Date(booking.checkOutDate) < new Date()
                const isUpcoming = new Date(booking.checkInDate) > new Date()

                return (
                  <Card key={booking.id} className={`p-6 ${isPast ? 'opacity-60' : ''}`}>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                      <div className="space-y-2">
                        <p className="text-xs text-muted-foreground font-medium">ROOM TYPE</p>
                        <p className="font-semibold text-lg">{booking.room?.roomType}</p>
                        <p className="text-sm text-muted-foreground">#{booking.room?.id}</p>
                      </div>

                      <div className="space-y-2">
                        <p className="text-xs text-muted-foreground font-medium">CHECK-IN</p>
                        <p className="font-semibold">{formatDate(booking.checkInDate)}</p>
                        <p className="text-sm text-muted-foreground flex items-center gap-1">
                          <Users className="w-3 h-3" />
                          {booking.totalNumOfGuests} guests
                        </p>
                      </div>

                      <div className="space-y-2">
                        <p className="text-xs text-muted-foreground font-medium">CHECK-OUT</p>
                        <p className="font-semibold">{formatDate(booking.checkOutDate)}</p>
                        <p className="text-sm text-muted-foreground">{nights} night(s)</p>
                      </div>

                      <div className="space-y-2">
                        <p className="text-xs text-muted-foreground font-medium">CONFIRMATION</p>
                        <p className="font-mono font-semibold text-sm">{booking.bookingConfirmationCode}</p>
                        <p className="text-sm font-bold text-primary">
                          <DollarSign className="inline w-4 h-4" />
                          {totalPrice.toFixed(2)}
                        </p>
                      </div>
                    </div>

                    <div className="mt-4 pt-4 border-t border-border flex gap-2">
                      {isPast && (
                        <p className="text-xs text-muted-foreground italic">This booking has passed</p>
                      )}
                      {isUpcoming && (
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button variant="outline" size="sm" className="text-destructive bg-transparent">
                              <Trash2 className="mr-2 h-4 w-4" />
                              Cancel Booking
                            </Button>
                          </AlertDialogTrigger>

                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Cancel Booking</AlertDialogTitle>
                              <AlertDialogDescription>
                                Are you sure? This cannot be undone.
                              </AlertDialogDescription>
                            </AlertDialogHeader>

                            <AlertDialogFooter>
                              <AlertDialogCancel>Keep Booking</AlertDialogCancel>
                              <AlertDialogAction
                                onClick={() => handleCancelBooking(booking.id)}
                                disabled={deletingId === booking.id}
                                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                              >
                                {deletingId === booking.id ? 'Cancelling...' : 'Yes, Cancel'}
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      )}
                    </div>
                  </Card>
                )
              })}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </>
  )
}
