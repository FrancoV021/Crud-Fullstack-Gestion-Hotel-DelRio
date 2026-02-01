import React, { useState } from "react"
import { Navbar } from '@/components/layout/navbar'
import { Footer } from '@/components/layout/footer'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { Loader2, Search, Calendar, Users, Bed, CheckCircle2, Home, Mail, AlertCircle } from 'lucide-react'
import { toast } from 'sonner'
import { api } from '@/lib/api'
import { Link } from 'react-router-dom'
import { useAuth } from "@/context/AuthContext"

const BookingCard = ({ booking, formatDate }) => (
  <Card className="animate-in fade-in slide-in-from-bottom-4 duration-500">
    <CardHeader className="border-b">
      <div className="flex items-center gap-3">
        <div className="p-2 rounded-full bg-accent/20 text-accent">
          <CheckCircle2 className="h-6 w-6" />
        </div>
        <div>
          <CardTitle>Confirmed Reservation</CardTitle>
          <CardDescription>
            Code:{' '}
            <span className="font-mono font-bold">
              {booking?.bookingConfirmationCode}
            </span>
          </CardDescription>
        </div>
      </div>
    </CardHeader>

    <CardContent className="pt-6 space-y-6">
      <div>
        <h4 className="text-sm font-medium text-muted-foreground mb-2">
          Guest
        </h4>
        <p className="font-semibold">{booking?.guestFullName}</p>
        <p className="text-sm text-muted-foreground">
          {booking?.guestEmail}
        </p>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <h4 className="flex items-center gap-2 text-sm font-medium text-muted-foreground mb-2">
            <Calendar className="h-4 w-4" />
            Check-in
          </h4>
          <p className="font-semibold">
            {booking?.checkInDate && formatDate(booking.checkInDate)}
          </p>
        </div>

        <div>
          <h4 className="flex items-center gap-2 text-sm font-medium text-muted-foreground mb-2">
            <Calendar className="h-4 w-4" />
            Check-out
          </h4>
          <p className="font-semibold">
            {booking?.checkOutDate && formatDate(booking.checkOutDate)}
          </p>
        </div>
      </div>

      <div>
        <h4 className="flex items-center gap-2 text-sm font-medium text-muted-foreground mb-2">
          <Users className="h-4 w-4" />
          Guests
        </h4>
        <p className="font-semibold">
          {booking?.numOfAdults} adulto
          {booking?.numOfAdults > 1 ? 's' : ''}
          {booking?.numOfChildren > 0 &&
            `, ${booking?.numOfChildren} niño${booking?.numOfChildren > 1 ? 's' : ''}`
          }
        </p>
      </div>

      <div className="border-t pt-4">
        <h4 className="flex items-center gap-2 text-sm font-medium text-muted-foreground mb-2">
          <Bed className="h-4 w-4" />
          Room
        </h4>

        <div className="flex items-center justify-between">
          <div>
            <p className="font-semibold">
              {booking?.room?.roomType}
            </p>
            <p className="text-sm text-muted-foreground">
              Room #{booking?.room?.id}
            </p>
          </div>

          <p className="text-xl font-bold text-primary">
            ${booking?.room?.roomPrice}
            <span className="text-sm font-normal text-muted-foreground">
              /night
            </span>
          </p>
        </div>
      </div>
    </CardContent>
  </Card>
)

export default function FindBookingPage() {
  const { isAuthenticated } = useAuth()
  const [isLoading, setIsLoading] = useState(false)
  const [searchType, setSearchType] = useState('code')
  const [confirmationCode, setConfirmationCode] = useState('')
  const [searchEmail, setSearchEmail] = useState('')
  const [bookings, setBookings] = useState([])
  const [booking, setBooking] = useState(null)
  const [notFound, setNotFound] = useState(false)

  const handleSearch = async (e) => {
    e.preventDefault()

    if (searchType === 'code') {
      if (!confirmationCode.trim()) {
        toast.error('Please enter you confirmation code')
        return
      }
      searchByCode()
    } else {
      if (!searchEmail.trim()) {
        toast.error('Please enter you email')
        return
      }
      searchByEmail()
    }
  }

  const searchByCode = async () => {
    setIsLoading(true)
    setBooking(null)
    setBookings([])
    setNotFound(false)

    try {
      const response = await api.getBookingByConfirmationCode(confirmationCode)
      console.log('Booking response:', response)

      const bookingData = response?.data || response
      setBooking(bookingData)
      toast.success('Reservation found!')
    } catch (error) {
      console.log('Booking search error:', error)
      setNotFound(true)
      toast.error('Confirmation code not found')
    } finally {
      setIsLoading(false)
    }
  }

  const searchByEmail = async () => {
    setIsLoading(true)
    setBooking(null)
    setBookings([])
    setNotFound(false)

    try {
      const response = await api.getBookingsByEmail(searchEmail)
      console.log('Email bookings response:', response)

      const bookingsData = response?.data || response || []

      if (!bookingsData || bookingsData.length === 0) {
        setNotFound(true)
        toast.error('No bookings were found for this email')
        return
      }

      setBookings(bookingsData)
      toast.success(`Not found ${bookingsData.length} reservation(s)`)
    } catch (error) {
      console.log('Email search error:', error)
      setNotFound(true)
      toast.error('No bookings were found for this email')
    } finally {
      setIsLoading(false)
    }
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('es-AR', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }

  return (
    <>
      <Navbar />

      <main className="pt-20 min-h-screen bg-secondary/30">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-2xl mx-auto">

            <Card className="mb-8">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl">
                  Search my booking
                </CardTitle>
                <CardDescription>
                  Search by confirmation code or email
                </CardDescription>
              </CardHeader>

              <CardContent>
                <div className="flex gap-2 mb-6 border-b border-border">
                  <button
                    type="button"
                    onClick={() => {
                      setSearchType('code')
                      setBooking(null)
                      setBookings([])
                      setNotFound(false)
                    }}
                    className={`pb-3 px-4 font-medium transition-colors ${searchType === 'code'
                        ? 'border-b-2 border-primary text-primary'
                        : 'text-muted-foreground hover:text-foreground'
                      }`}
                  >
                    <Search className="inline mr-2 h-4 w-4" />
                    By Confirmation Code
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setSearchType('email')
                      setBooking(null)
                      setBookings([])
                      setNotFound(false)
                    }}
                    className={`pb-3 px-4 font-medium transition-colors ${searchType === 'email'
                        ? 'border-b-2 border-primary text-primary'
                        : 'text-muted-foreground hover:text-foreground'
                      }`}
                  >
                    <Mail className="inline mr-2 h-4 w-4" />
                    By Email
                  </button>
                </div>

                <form onSubmit={handleSearch} className="flex gap-4">
                  {searchType === 'code' ? (
                    <>
                      <div className="flex-1">
                        <Label htmlFor="confirmationCode" className="sr-only">
                          confirmation code
                        </Label>
                        <Input
                          id="confirmationCode"
                          value={confirmationCode}
                          onChange={(e) =>
                            setConfirmationCode(e.target.value.toUpperCase())
                          }
                          placeholder="Ej: DR1ABC2DEF"
                          className="uppercase"
                        />
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="flex-1">
                        <Label htmlFor="searchEmail" className="sr-only">
                          email
                        </Label>
                        <Input
                          id="searchEmail"
                          type="email"
                          value={searchEmail}
                          onChange={(e) => setSearchEmail(e.target.value)}
                          placeholder="You@email.com"
                        />
                        <p className="mt-6 rounded-lg border bg-gray-300/20 p-4">
                          <AlertCircle className="inline mr-2 h-4 w-4" /> Email search is only available for loggued in users!
                        </p>
                      </div>
                    </>
                  )}

                  <Button type="submit" disabled={isLoading}>
                    {isLoading ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <>
                        <Search className="mr-2 h-4 w-4" />
                        Search
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>

            {notFound && (
              <Card className="animate-in fade-in slide-in-from-bottom-4 duration-500 border-destructive/50 bg-destructive/5">
                <CardContent className="pt-6 flex flex-col items-center justify-center py-12 text-center">
                  <div className="p-3 rounded-full bg-destructive/10 mb-4">
                    <Home className="h-8 w-8 text-destructive" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">Booking not found</h3>
                  <p className="text-muted-foreground mb-6">
                    {searchType === 'code'
                      ? `El código de confirmación "${confirmationCode}" no existe o es incorrecto.`
                      : `No se encontraron reservas para ${searchEmail}`}
                  </p>
                  <div className="flex gap-3 flex-col sm:flex-row">
                    <Button asChild variant="outline" className="bg-transparent">
                      <Link to="/">
                        <Home className="mr-2 h-4 w-4" />
                        Go to home
                      </Link>
                    </Button>
                    <Button asChild>
                      <Link to="/rooms">See rooms</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {booking && (
              <BookingCard booking={booking} formatDate={formatDate} />
            )}

            {bookings.length > 0 && (
              <div className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  {bookings.length} Reservation(s) were found
                </p>
                {bookings.map((book) => (
                  <BookingCard key={book.id} booking={book} formatDate={formatDate} />
                ))}
              </div>
            )}


            {isAuthenticated && (
              <Link to='/my-bookings'>
                <p className="mt-6 rounded-lg border bg-gray-300/20 p-4">
                  <AlertCircle className="inline mr-2 h-4 w-4"/> Look up this information on your profile
                </p>
              </Link>
            )}

          </div>
        </div>
      </main>

      <Footer />
    </>
  )
}
