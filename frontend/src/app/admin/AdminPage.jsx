import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Loader2 } from 'lucide-react'
import { useAuth } from '@/context/AuthContext'
import { AdminSidebar } from '@/components/admin/AdminSidebar'
import { DashboardStats } from '@/components/admin/DashboardStats'
import { BookingsManagement } from '@/components/admin/BookingsManagement'
import { RoomsManagement } from '@/components/admin/RoomsManagement'
import { UsersManagement } from '@/components/admin/UsersManagement'

export default function AdminPage() {
  const { user, isLoading, isAdmin } = useAuth()
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('overview')
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)

  useEffect(() => {
    if (!isLoading && (!user || !isAdmin)) {
      navigate('/login')
    }
  }, [user, isLoading, isAdmin, navigate])

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    )
  }

  if (!user || !isAdmin) {
    return null
  }

  return (
    <div className="min-h-screen bg-background">
      <AdminSidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
      />
      <main className={`transition-all duration-300 ${isSidebarOpen ? 'ml-64' : 'ml-20'} pt-0`}>
        <div className="container mx-auto py-8 px-4">
          {activeTab === 'overview' && <DashboardStats />}
          {activeTab === 'rooms' && <RoomsManagement />}
          {activeTab === 'bookings' && <BookingsManagement />}
          {activeTab === 'users' && <UsersManagement />}
        </div>
      </main>
    </div>
  )
}