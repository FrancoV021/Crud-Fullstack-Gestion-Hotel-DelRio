
import { useState, useEffect, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Users, Bed, ArrowRight, Search, X, Loader2 } from 'lucide-react'
import { api } from '@/lib/api'

const ROOMS_PER_PAGE = 10

const fallbackRooms = [

]

export function RoomsList() {
  const [rooms, setRooms] = useState(fallbackRooms)
  const [roomTypes, setRoomTypes] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [selectedType, setSelectedType] = useState('all')
  const [currentPage, setCurrentPage] = useState(1)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [roomsResp, typesResp] = await Promise.all([
          api.getAllRooms(),
          api.getRoomTypes()
        ])

        const roomsData = roomsResp?.data || roomsResp || []
        const typesData = typesResp?.data || typesResp || []

        if (Array.isArray(roomsData) && roomsData.length > 0) setRooms(roomsData)
        if (Array.isArray(roomsData) && roomsData.length > 0) {
          const normalizedRooms = roomsData.map(room => ({
            ...room,
            isBooked: Boolean(
              room.isBooked ?? room.booked ?? room.reserved ?? false
            ),
          }))
          setRooms(normalizedRooms)
        }
        if (Array.isArray(typesData) && typesData.length > 0) setRoomTypes(typesData)
        else setRoomTypes([...new Set(fallbackRooms.map(r => r.roomType))])
      } catch (error) {
        console.log('Using fallback data, API not available:', error)
        setRoomTypes([...new Set(fallbackRooms.map(r => r.roomType))])
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [])

  const filteredRooms = useMemo(() => {
    if (selectedType === 'all') return rooms
    return rooms.filter(room => room.roomType === selectedType)
  }, [rooms, selectedType])

  const totalPages = Math.ceil(filteredRooms.length / ROOMS_PER_PAGE)

  const paginatedRooms = useMemo(() => {
    const startIndex = (currentPage - 1) * ROOMS_PER_PAGE
    return filteredRooms.slice(startIndex, startIndex + ROOMS_PER_PAGE)
  }, [filteredRooms, currentPage])

  useEffect(() => {
    setCurrentPage(1)
  }, [selectedType])

  const clearFilter = () => setSelectedType('all')

  if (isLoading) {
    return (
      <section className="py-16">
        <div className="container mx-auto px-4 flex justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </section>
    )
  }

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="flex flex-col sm:flex-row gap-4 mb-8 items-start sm:items-center justify-between">
          <div className="flex flex-wrap gap-4 items-center">
            <div className="flex items-center gap-2">
              <Search className="h-4 w-4 text-muted-foreground" />
              <Select value={selectedType} onValueChange={setSelectedType}>
                <SelectTrigger className="w-[200px]">
                  <SelectValue placeholder="type filter" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All types</SelectItem>
                  {roomTypes.map(type => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {selectedType !== 'all' && (
              <Button
                variant="outline"
                size="sm"
                onClick={clearFilter}
                className="gap-2 bg-transparent"
              >
                <X className="h-4 w-4" />
                Clean filters
              </Button>
            )}
          </div>

          <p className="text-sm text-muted-foreground">
            {filteredRooms.length} room{filteredRooms.length !== 1 ? 's' : ''} found
          </p>
        </div>
        {paginatedRooms.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-muted-foreground">
              No rooms were found with the selected filters.
            </p>
            <Button variant="link" onClick={clearFilter} className="mt-2">
              Clean filters
            </Button>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-8">
            {paginatedRooms.map((room) => (
              <Card
                key={room.id}
                className={`overflow-hidden group transition-shadow duration-300 
                ${room.isBooked ? 'opacity-60 cursor-not-allowed' : 'hover:shadow-xl'}
                `}
              >
                <div className="flex flex-col lg:flex-row">
                  <div className="relative h-64 lg:h-auto lg:w-72 shrink-0 overflow-hidden">
                    <img
                      src={room.photo?.startsWith('data:') ? room.photo : room.photo || '/images/rooms/room-standard.jpg'}
                      alt={room.roomType || 'Room'}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 1024px) 100vw, 288px"
                    />
                    {room.isBooked && (
                      <div className="absolute top-4 right-4 bg-destructive text-destructive-foreground text-xs px-3 py-1 rounded-full">
                        Reserved
                      </div>
                    )}
                  </div>
                  <CardContent className="p-6 flex flex-col justify-between flex-1">
                    <div className="space-y-3">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <span className="text-xs uppercase tracking-wider text-primary">
                            {room.roomType}
                          </span>
                          <h3 className="text-xl font-semibold">
                            Room {room.id}
                          </h3>
                        </div>
                        <div className="text-right shrink-0">
                          <span className="text-2xl font-bold text-primary">
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
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        {room.capacity && (
                          <div className="flex items-center gap-1">
                            <Users className="h-4 w-4" />
                            <span>{room.capacity} guests</span>
                          </div>
                        )}
                        {room.bedType && (
                          <div className="flex items-center gap-1">
                            <Bed className="h-4 w-4" />
                            <span>{room.bedType}</span>
                          </div>
                        )}
                      </div>
                    </div>
                    {room.isBooked ? (
                      <Button
                        className="w-full mt-4"
                        variant="outline"
                        disabled
                      >
                        Room Reserved
                      </Button>
                    ) : (
                      <Button asChild className="w-full mt-4 group/btn">
                        <Link to={`/rooms/${room.id}`}>
                          View Details
                          <ArrowRight className="ml-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                        </Link>
                      </Button>
                    )}

                  </CardContent>
                </div>
              </Card>
            ))}
          </div>
        )}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-2 mt-12">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              disabled={currentPage === 1}
            >
              previous
            </Button>
            <div className="flex gap-1">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                <Button
                  key={page}
                  variant={currentPage === page ? "default" : "outline"}
                  size="sm"
                  onClick={() => setCurrentPage(page)}
                  className="w-10"
                >
                  {page}
                </Button>
              ))}
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
            >
              next
            </Button>
          </div>
        )}
      </div>
    </section>
  )
}