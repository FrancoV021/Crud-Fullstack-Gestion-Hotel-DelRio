import { useNavigate, Link } from 'react-router-dom'
import { LogOut, BarChart3, Calendar, Bed, Users, ChevronLeft } from 'lucide-react'
import { useAuth } from '@/context/AuthContext'
import { cn } from '@/lib/utils'

export function AdminSidebar({ activeTab, setActiveTab, isSidebarOpen, setIsSidebarOpen }) {
  const { logout, user } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  const tabs = [
    { id: 'overview', label: 'Dashboard', icon: BarChart3 },
    { id: 'rooms', label: 'Rooms', icon: Bed },
    { id: 'bookings', label: 'Bookings', icon: Calendar },
    { id: 'users', label: 'Users', icon: Users },
  ]

  return (
    <aside className={cn(
      'fixed left-0 top-0 h-screen bg-sidebar border-r border-sidebar-border transition-all duration-300 z-40',
      isSidebarOpen ? 'w-64' : 'w-20'
    )}>
      <div className="h-20 border-b border-sidebar-border flex items-center justify-between px-4">
        {isSidebarOpen && (
          <Link to="/admin" className="flex flex-col items-start">
            <span className="text-lg font-serif font-bold text-sidebar-foreground">Del Rio</span>
            <span className="text-xs text-sidebar-foreground/70">Admin</span>
          </Link>
        )}
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="p-2 hover:bg-sidebar-accent rounded-lg transition-colors text-sidebar-foreground"
        >
          <ChevronLeft className={cn(
            'w-5 h-5 transition-transform duration-300',
            !isSidebarOpen && 'rotate-180'
          )} />
        </button>
      </div>

      <nav className="flex-1 px-2 py-6 space-y-2">
        {tabs.map((tab) => {
          const Icon = tab.icon
          const isActive = activeTab === tab.id
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                'w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all',
                isActive
                  ? 'bg-sidebar-primary text-sidebar-primary-foreground'
                  : 'text-sidebar-foreground hover:bg-sidebar-accent'
              )}
              title={!isSidebarOpen ? tab.label : undefined}
            >
              <Icon className="w-5 h-5 flex-shrink-0" />
              {isSidebarOpen && <span className="text-sm font-medium">{tab.label}</span>}
            </button>
          )
        })}
      </nav>

      <div className="border-t border-sidebar-border p-2">
        {isSidebarOpen && (
          <div className="px-4 py-2 mb-4 bg-sidebar-accent/50 rounded-lg">
            <p className="text-xs text-sidebar-foreground/70">Logged in as</p>
            <p className="text-sm font-medium text-sidebar-foreground truncate">{user?.email}</p>
          </div>
        )}
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-3 text-destructive hover:bg-destructive/10 rounded-lg transition-all"
          title={!isSidebarOpen ? 'Logout' : undefined}
        >
          <LogOut className="w-5 h-5 flex-shrink-0" />
          {isSidebarOpen && <span className="text-sm font-medium">Logout</span>}
        </button>
      </div>
    </aside>
  )
}