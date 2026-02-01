import { ArrowRight, Bed, Users } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { Button } from '../ui/button'
import { Link } from 'react-router-dom'
import { Card, CardContent } from '../ui/card'
import { api } from "@/lib/api"

export const FeaturedRooms = () => {
  const [rooms, setRooms] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const response = await api.getAllRooms()
        const data = response?.data || response || []

        if (Array.isArray(data) && data.length > 0) {
          setRooms(data.slice(0, 3)) // solo 3 reales
        } else {
          setRooms([])
        }
      } catch (error) {
        console.log('Error fetching rooms:', error)
        setRooms([])
      } finally {
        setIsLoading(false)
      }
    }

    fetchRooms()
  }, [])

  return (
    <section id='featured-rooms' className='py-24 bg-secondary/30'>
      <div className='container mx-auto px-4'>
        <div className='text-center mb-16'>
          <p className='text-sm tracking-[0.3em] uppercase text-primary mb-2'>
            Accommodation
          </p>
          <h2 className='text-4xl md:text-5xl font-serif font-semibold mb-4'>
            Featured Rooms
          </h2>
          <p className='text-muted-foreground max-w-2xl mx-auto text-balance'>
            Discover our rooms carefully designed to offer you maximum confort and unforgettable experience.
          </p>
        </div>

        {isLoading && (
          <div className="text-center py-16 text-muted-foreground">
            Loading rooms...
          </div>
        )}

        {!isLoading && rooms.length === 0 && (
          <div className="text-center py-16">
            <p className="text-muted-foreground text-lg">
              No rooms available at the moment.
            </p>
          </div>
        )}

        {!isLoading && rooms.length > 0 && (
          <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-8'>
            {rooms.map((room) => (
              <Card
                key={room.id}
                className="overflow-hidden group hover:shadow-xl transition-shadow duration-300"
              >
                <div className='relative h-64 overflow-hidden'>
                  <img
                    src={
                      room.roomPhotoUrl
                        ? `data:image/jpeg;base64,${room.roomPhotoUrl}`
                        : '/images/rooms/room-standard.jpg'
                    }
                    alt={room.roomType}
                    className='w-full h-full object-cover group-hover:scale-105 transition-transform duration-500'
                  />
                  {room.isBooked && (
                    <div className="absolute top-4 right-4 bg-destructive text-destructive-foreground text-xs px-3 py-1 rounded-full">
                      Booked
                    </div>
                  )}
                </div>

                <CardContent className="p-6 space-y-4">
                  <div className='flex items-start justify-between gap-4'>
                    <h3 className="text-xl font-semibold">{room.roomType}</h3>
                    <div className='text-right shrink-0'>
                      <span className='text-2xl font-bold text-primary'>
                        ${room.roomPrice}
                      </span>
                      <span className="text-sm text-muted-foreground"> /night</span>
                    </div>
                  </div>

                  {room.roomDescription && (
                    <p className="text-muted-foreground text-sm line-clamp-2">
                      {room.roomDescription}
                    </p>
                  )}

                  <div className='flex items-center gap-4 text-sm text-muted-foreground'>
                    {room.capacity && (
                      <div className='flex items-center gap-1'>
                        <Users className='h-4 w-4' />
                        <span>{room.capacity} Guests</span>
                      </div>
                    )}
                    {room.bedType && (
                      <div className="flex items-center gap-1">
                        <Bed className="h-4 w-4" />
                        <span>{room.bedType}</span>
                      </div>
                    )}
                  </div>

                  <Button asChild className="w-full group/btn">
                    <Link to={`/rooms/${room.id}`}>
                      View Details
                      <ArrowRight className="ml-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        <div className='text-center mt-12'>
          <Button
            size='lg'
            asChild
            className="bg-transparent border-none text-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
          >
            <Link to="/rooms">
              View All Rooms
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
