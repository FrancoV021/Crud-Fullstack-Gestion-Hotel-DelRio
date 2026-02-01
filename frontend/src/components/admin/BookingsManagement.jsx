import { useEffect, useState } from 'react'
import { getBookings, cancelBooking } from '@/lib/api'
import { Card } from '@/components/ui/card'
import { Loader2, Trash2, Calendar, Users } from 'lucide-react'
import { toast } from 'sonner'
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from '@/components/ui/alert-dialog'

export function BookingsManagement() {
  const [bookings, setBookings] = useState([])
  const [loading, setLoading] = useState(true)
  const [deleting, setDeleting] = useState(null)
  const [bookingToDelete, setBookingToDelete] = useState(null)
  const [searchEmail, setSearchEmail] = useState('')

  useEffect(() => {
    fetchBookings()
  }, [])

  const fetchBookings = async () => {
    try {
      setLoading(true)
      const response = await getBookings()
      const bookingsList = response.data || response
      setBookings(Array.isArray(bookingsList) ? bookingsList : [])
    } catch (error) {
      console.error('Error fetching bookings:', error)
      toast.error('Failed to load bookings')
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async () => {
    if (!bookingToDelete) return

    try {
      setDeleting(bookingToDelete)
      await cancelBooking(bookingToDelete)
      setBookings(bookings.filter((b) => b.id !== bookingToDelete))
      toast.success('Booking cancelled successfully')
    } catch (error) {
      console.error('Error deleting booking:', error)
      toast.error('Failed to cancel booking')
    } finally {
      setDeleting(null)
      setBookingToDelete(null)
    }
  }

  const calculateDays = (checkIn, checkOut) => {
    const start = new Date(checkIn)
    const end = new Date(checkOut)
    return Math.ceil((end - start) / (1000 * 60 * 60 * 24))
  }

  const filteredBookings = bookings.filter((booking) =>
    booking.guestEmail
      ?.toLowerCase()
      .includes(searchEmail.toLowerCase())
  )

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">Bookings Management</h2>
        <p className="text-muted-foreground">
          Showing {filteredBookings.length} of {bookings.length} bookings
        </p>
      </div>

      <div className="max-w-sm">
        <input
          type="text"
          placeholder="Search by guest email..."
          value={searchEmail}
          onChange={(e) => setSearchEmail(e.target.value)}
          className="w-full px-3 py-2 border border-border rounded-lg bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>

      {filteredBookings.length === 0 ? (
        <Card className="p-8 text-center">
          <Calendar className="w-12 h-12 mx-auto text-muted-foreground/50 mb-3" />
          <p className="text-muted-foreground">No bookings found</p>
        </Card>
      ) : (
        <div className="grid gap-4">
          {filteredBookings.map((booking) => {
            const days = calculateDays(
              booking.checkInDate,
              booking.checkOutDate
            )

            return (
              <Card key={booking.id} className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">
                      CONFIRMATION
                    </p>
                    <p className="font-mono font-semibold text-sm">
                      {booking.bookingConfirmationCode}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs text-muted-foreground mb-1">GUEST</p>
                    <p className="font-semibold">
                      {booking.guestFullName}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {booking.guestEmail}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs text-muted-foreground mb-1">ROOM</p>
                    <p className="font-semibold">
                      {booking.room?.roomType}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      #{booking.room?.id}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs text-muted-foreground mb-1">
                      CHECK-IN
                    </p>
                    <p className="font-semibold">
                      {new Date(
                        booking.checkInDate
                      ).toLocaleDateString()}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      <Users className="inline w-3 h-3 mr-1" />
                      {booking.totalNumOfGuests} guests (
                      {booking.numOfAdults} adults,{' '}
                      {booking.numOfChildren} children)
                    </p>
                  </div>

                  <div>
                    <p className="text-xs text-muted-foreground mb-1">
                      CHECK-OUT
                    </p>
                    <p className="font-semibold">
                      {new Date(
                        booking.checkOutDate
                      ).toLocaleDateString()}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {days} night(s)
                    </p>
                  </div>

                  <div>
                    <p className="text-xs text-muted-foreground mb-1">
                      TOTAL
                    </p>
                    <p className="font-bold text-lg text-primary">
                      $
                      {(
                        booking.room?.roomPrice * days
                      ).toFixed(2)}
                    </p>
                  </div>

                  <div className="md:col-span-2 lg:col-span-2">
                    <p className="text-xs text-muted-foreground mb-2">
                      ACTIONS
                    </p>
                    <button
                      onClick={() => setBookingToDelete(booking.id)}
                      disabled={deleting === booking.id}
                      className="p-2 px-4 text-destructive hover:bg-destructive/10 rounded-lg transition-all disabled:opacity-50 flex items-center gap-2 text-sm"
                    >
                      <Trash2 className="w-4 h-4" />
                      {deleting === booking.id
                        ? 'Cancelling...'
                        : 'Cancel Booking'}
                    </button>
                  </div>
                </div>
              </Card>
            )
          })}
        </div>
      )}

      <AlertDialog
        open={!!bookingToDelete}
        onOpenChange={() => setBookingToDelete(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete booking?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. The booking will be permanently
              removed.
            </AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
