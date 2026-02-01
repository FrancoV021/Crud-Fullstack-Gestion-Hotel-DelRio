import { useEffect, useState } from 'react'
import { getBookings, getRooms, getUsers } from '@/lib/api'
import { Card } from '@/components/ui/card'
import { Loader2, DollarSign, Calendar, Bed, Users, TrendingUp } from 'lucide-react'
import { toast } from 'sonner'

export function DashboardStats() {
  const [stats, setStats] = useState({
    totalBookings: 0,
    totalRevenue: 0,
    occupiedRooms: 0,
    totalRooms: 0,
    totalUsers: 0,
    upcomingBookings: 0,
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [bookingsRes, roomsRes, usersRes] = await Promise.all([
          getBookings(),
          getRooms(),
          getUsers(),
        ])

        const bookingsList = bookingsRes.data || bookingsRes || []
        const roomsList = roomsRes.data || roomsRes || []
        const usersList = usersRes.data || usersRes || []

        const now = new Date()

        const totalRevenue = bookingsList.reduce((sum, booking) => {
          const roomPrice = booking.room?.roomPrice || 0
          const checkIn = new Date(booking.checkInDate)
          const checkOut = new Date(booking.checkOutDate)
          const days = Math.ceil((checkOut - checkIn) / (1000 * 60 * 60 * 24))
          return sum + (roomPrice * days)
        }, 0)

        const occupiedRooms = bookingsList.filter(
          (b) =>
            new Date(b.checkInDate) <= now &&
            new Date(b.checkOutDate) >= now
        ).length

        const upcomingBookings = bookingsList.filter(
          (b) => new Date(b.checkInDate) > now
        ).length

        setStats({
          totalBookings: bookingsList.length,
          totalRevenue: totalRevenue,
          occupiedRooms,
          totalRooms: roomsList.length,
          totalUsers: usersList.length,
          upcomingBookings,
        })
      } catch (error) {
        console.error('Error fetching stats:', error)
        toast.error('Failed to load dashboard statistics')
      } finally {
        setLoading(false)
      }
    }

    fetchStats()
  }, [])

  const statCards = [
    {
      label: 'Total Bookings',
      value: stats.totalBookings,
      icon: Calendar,
      bgColor: 'bg-blue-500/10',
      iconColor: 'text-blue-600',
    },
    {
      label: 'Total Revenue',
      value: `$${stats.totalRevenue.toFixed(2)}`,
      icon: DollarSign,
      bgColor: 'bg-green-500/10',
      iconColor: 'text-green-600',
    },
    {
      label: 'Occupied Rooms',
      value: stats.occupiedRooms,
      icon: Bed,
      bgColor: 'bg-orange-500/10',
      iconColor: 'text-orange-600',
    },
    {
      label: 'Total Rooms',
      value: stats.totalRooms,
      icon: TrendingUp,
      bgColor: 'bg-purple-500/10',
      iconColor: 'text-purple-600',
    },
    {
      label: 'Registered Users',
      value: stats.totalUsers,
      icon: Users,
      bgColor: 'bg-pink-500/10',
      iconColor: 'text-pink-600',
    },
    {
      label: 'Upcoming Bookings',
      value: stats.upcomingBookings,
      icon: Calendar,
      bgColor: 'bg-cyan-500/10',
      iconColor: 'text-cyan-600',
    },
  ]

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
        <h2 className="text-2xl font-bold">Welcome to Admin Dashboard</h2>
        <p className="text-muted-foreground mt-1">Overview of your hotel management system</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {statCards.map((stat) => {
          const Icon = stat.icon
          return (
            <Card key={stat.label} className="p-6 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between">
                <div className="space-y-2">
                  <p className="text-muted-foreground text-sm font-medium">
                    {stat.label}
                  </p>
                  <p className="text-2xl font-bold">{stat.value}</p>
                </div>
                <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                  <Icon className={`w-6 h-6 ${stat.iconColor}`} />
                </div>
              </div>
            </Card>
          )
        })}
      </div>
    </div>
  )
}

