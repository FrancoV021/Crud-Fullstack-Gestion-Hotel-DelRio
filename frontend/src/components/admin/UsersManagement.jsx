import { useEffect, useState } from 'react'
import { getUsers, deleteUser } from '@/lib/api'
import { Card } from '@/components/ui/card'
import { Loader2, Trash2, Users } from 'lucide-react'
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

export function UsersManagement() {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [deleting, setDeleting] = useState(null)
  const [userToDelete, setUserToDelete] = useState(null)
  const [searchEmail, setSearchEmail] = useState('')

  useEffect(() => {
    fetchUsers()
  }, [])

  const fetchUsers = async () => {
    try {
      setLoading(true)
      const response = await getUsers()
      const usersList = response.data || response
      setUsers(Array.isArray(usersList) ? usersList : [])
    } catch (error) {
      console.error('Error fetching users:', error)
      toast.error('Failed to load users')
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async () => {
    if (!userToDelete) return

    try {
      setDeleting(userToDelete)
      await deleteUser(userToDelete)
      setUsers(users.filter((u) => u.id !== userToDelete))
      toast.success('User deleted successfully')
    } catch (error) {
      console.error('Error deleting user:', error)
      toast.error('Failed to delete user')
    } finally {
      setDeleting(null)
      setUserToDelete(null)
    }
  }

  const filteredUsers = users.filter((user) =>
    user.email.toLowerCase().includes(searchEmail.toLowerCase())
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
        <h2 className="text-2xl font-bold mb-2">Users Management</h2>
        <p className="text-muted-foreground">
          Showing {filteredUsers.length} of {users.length} users
        </p>
      </div>

      <div className="max-w-sm">
        <input
          type="text"
          placeholder="Search by email..."
          value={searchEmail}
          onChange={(e) => setSearchEmail(e.target.value)}
          className="w-full px-3 py-2 border border-border rounded-lg bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>

      {filteredUsers.length === 0 ? (
        <Card className="p-8 text-center">
          <Users className="w-12 h-12 mx-auto text-muted-foreground/50 mb-3" />
          <p className="text-muted-foreground">No users found</p>
        </Card>
      ) : (
        <div className="overflow-x-auto">
          <div className="border border-border rounded-lg">
            <table className="w-full">
              <thead className="bg-muted/50 border-b border-border">
                <tr>
                  <th className="text-left py-4 px-4 font-semibold">ID</th>
                  <th className="text-left py-4 px-4 font-semibold">Name</th>
                  <th className="text-left py-4 px-4 font-semibold">Email</th>
                  <th className="text-left py-4 px-4 font-semibold">Role</th>
                  <th className="text-left py-4 px-4 font-semibold">Joined</th>
                  <th className="text-right py-4 px-4 font-semibold">Actions</th>
                </tr>
              </thead>

              <tbody>
                {filteredUsers.map((user, index) => (
                  <tr
                    key={user.id}
                    className={`border-b border-border hover:bg-muted/30 transition-colors ${
                      index % 2 === 0 ? 'bg-card' : 'bg-background'
                    }`}
                  >
                    <td className="py-4 px-4 font-mono text-sm">#{user.id}</td>

                    <td className="py-4 px-4">
                      <p className="font-semibold">
                        {user.firstName} {user.lastName}
                      </p>
                    </td>

                    <td className="py-4 px-4 text-sm">{user.email}</td>

                    <td className="py-4 px-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold inline-block ${
                          user.role === 'ROLE_ADMIN'
                            ? 'bg-primary/20 text-primary'
                            : 'bg-muted text-muted-foreground'
                        }`}
                      >
                        {user.role === 'ROLE_ADMIN' ? 'Admin' : 'User'}
                      </span>
                    </td>

                    <td className="py-4 px-4 text-sm text-muted-foreground">
                      {user.createdAt
                        ? new Date(user.createdAt).toLocaleDateString()
                        : '-'}
                    </td>

                    <td className="py-4 px-4 text-right">
                      <button
                        onClick={() => setUserToDelete(user.id)}
                        disabled={deleting === user.id}
                        className="p-2 text-destructive hover:bg-destructive/10 rounded-lg transition-all disabled:opacity-50"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      <AlertDialog
        open={!!userToDelete}
        onOpenChange={() => setUserToDelete(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete user?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. The user will be permanently removed.
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
