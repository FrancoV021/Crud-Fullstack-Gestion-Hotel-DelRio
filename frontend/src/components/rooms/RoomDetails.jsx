
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'

import { Users, Bed, ArrowLeft, Wifi, Wind, Tv, Coffee, Bath, Mountain, Loader2, CheckCircle2 } from 'lucide-react'

import { api } from '@/lib/api'
import { Room as RoomTemplate } from '@/lib/types'
import { BookingForm } from './BookingForm'

// // Fallback room data
// const getFallbackRoom = (id) => ({
//     ...RoomTemplate,
//     id: parseInt(id),
//     roomType: id === '1' ? 'Suite Presidencial' : id === '2' ? 'Suite' : 'Deluxe',
//     roomPrice: id === '1' ? 450 : id === '2' ? 350 : 280,
//     isBooked: false,
//     photo:
//         id === '1' || id === '2'
//             ? '/images/rooms/suite-luxury.jpg'
//             : '/images/rooms/room-deluxe.jpg',
//     description:
//         'Enjoy a unique experience in our elegant room. With spectacular views, first-class amenities, and impeccable service, your stay will be unforgettable..',
//     capacity: id === '1' ? 4 : 2,
//     bedType: id === '1' ? 'King Size' : 'Queen Size',
//     amenities: [
//         'WiFi',
//         'air-conditioning',
//         'TV Smart',
//         'Minibar',
//         'private bathroom',
//         'river view',
//     ],
// })

const amenityIcons = {
    'WiFi': Wifi,
    'air-conditioning': Wind,
    'TV Smart': Tv,
    'Minibar': Coffee,
    'private bathroom': Bath,
    'rivers views': Mountain,
}

export function RoomDetails({ roomId }) {
    const [room, setRoom] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    const [showBookingForm, setShowBookingForm] = useState(false)
    const [bookingSuccess, setBookingSuccess] = useState(null)

    useEffect(() => {
        const fetchRoom = async () => {
            try {
                const response = await api.getRoomById(Number(roomId))
                console.log('Room response:', response)
                // Extract room from ApiResponse structure
                const roomData = response.data || response
                setRoom(roomData)
            } catch (error) {
                console.log('Using fallback room data:', error)
                setRoom(getFallbackRoom(roomId))
            } finally {
                setIsLoading(false)
            }
        }

        fetchRoom()
    }, [roomId])

    const handleBookingSuccess = (confirmationCode) => {
        setBookingSuccess(confirmationCode)
        setShowBookingForm(false)
    }
    if (isLoading) {
        return (
            <div className="min-h-[60vh] flex items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
        )
    }
    if (!room) {
        return (
            <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4">
                <p className="text-muted-foreground">Room Not found</p>
                <Button asChild>
                    <Link to="/rooms">See all rooms</Link>
                </Button>
            </div>
        )
    }
    const amenities =
        room.amenities?.length > 0
            ? room.amenities
            : [
                'WiFi',
                'air-conditioning',
                'TV Smart',
                'Minibar',
                'private bathroom',
                'river views',
            ]

    return (
        <div className="container mx-auto px-4 py-8">
            {/* Back */}
            <Link
                to="/rooms"
                className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6 transition-colors"
            >
                <ArrowLeft className="h-4 w-4" />
                Back to Rooms...
            </Link>

            {/* Success */}
            {bookingSuccess && (
                <div className="mb-8 p-6 bg-accent/20 border border-accent rounded-lg">
                    <div className="flex items-center gap-3 text-accent">
                        <CheckCircle2 className="h-8 w-8" />
                        <div>
                            <h3 className="text-lg font-semibold">confirmed booking</h3>
                            <p className="text-sm">
                                Comfirmation code:{' '}
                                <strong className="text-xl">{bookingSuccess}</strong>
                            </p>
                            <p className="text-sm mt-1">
                                Save this code to check you booking.
                            </p>
                        </div>
                    </div>
                </div>
            )}

            <div className="grid lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-8">
                    <div className="relative h-[400px] md:h-[500px] rounded-xl overflow-hidden">
                        <img
                            src={room.photo || '/images/rooms/room-standard.jpg'}
                            alt={room.roomType}
                            className="w-full h-full object-cover"
                        />
                        {room.isBooked && (
                            <div className="absolute top-4 right-4 bg-destructive text-destructive-foreground px-4 py-2 rounded-full">
                                Currently Reserved
                            </div>
                        )}
                    </div>

                    {/* Info */}
                    <div className="space-y-6">
                        <div>
                            <span className="text-sm uppercase tracking-wider text-primary">
                                {room.roomType}
                            </span>
                            <h1 className="text-3xl md:text-4xl font-serif font-semibold mt-1">
                                Room {room.id}
                            </h1>
                        </div>

                        <p className="text-muted-foreground text-lg">
                            {room.roomDescription}
                        </p>

                        {/* Quick info */}
                        <div className="flex flex-wrap gap-6">
                            <div className="flex items-center gap-2">
                                <Users className="h-5 w-5 text-primary" />
                                Until {room.capacity} guests
                            </div>
                            <div className="flex items-center gap-2">
                                <Bed className="h-5 w-5 text-primary" />
                                Bed {room.bedType}
                            </div>
                        </div>

                        <div>
                            <h2 className="text-xl font-semibold mb-4">Amenities</h2>
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                {amenities.map((amenity) => {
                                    const Icon = amenityIcons[amenity] || CheckCircle2
                                    return (
                                        <div
                                            key={amenity}
                                            className="flex items-center gap-3 p-3 rounded-lg bg-secondary/50"
                                        >
                                            <Icon className="h-5 w-5 text-primary" />
                                            <span className="text-sm">{amenity}</span>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Sidebar */}
                <div>
                    <Card className="sticky top-24">
                        <CardHeader>
                            <div className="flex items-baseline gap-2">
                                <span className="text-3xl font-bold text-primary">
                                    ${room.roomPrice}
                                </span>
                                <span className="text-muted-foreground">/night</span>
                            </div>
                        </CardHeader>

                        <CardContent className="space-y-4">
                            {room.isBooked ? (
                                <div className='text-center py-4'>
                                    <p className='text-muted-foreground mb-4'>
                                        This room is currently reserved.
                                    </p>
                                    <Button variant="outline" asChild className="w-full bg-transparent">
                                      <Link to="/rooms">View more Rooms</Link>
                                    </Button>
                                </div>
                            ) : showBookingForm ? (
                                <BookingForm
                                    room={room}
                                    onSuccess={handleBookingSuccess}
                                    onCancel={() => setShowBookingForm(false)}
                                />
                            ) : (
                                <Button
                                    className="w-full"
                                    size="lg"
                                    onClick={() => setShowBookingForm(true)}
                                >
                                    Booking Now!
                                </Button>
                            )}
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}

