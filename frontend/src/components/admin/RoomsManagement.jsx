import { useEffect, useState, useMemo } from 'react'
import { getRooms, deleteRoom, addRoom, updateRoom } from '@/lib/api'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Loader2, Trash2, Plus, Edit2, X } from 'lucide-react'
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

export function RoomsManagement() {
  const [rooms, setRooms] = useState([])
  const [loading, setLoading] = useState(true)
  const [deleting, setDeleting] = useState(null)
  const [roomToDelete, setRoomToDelete] = useState(null)
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState(null)
  const [submitting, setSubmitting] = useState(false)

  const [customRoomType, setCustomRoomType] = useState('')
  const [isCustomType, setIsCustomType] = useState(false)

  const [selectedType, setSelectedType] = useState('all')

  const [formData, setFormData] = useState({
    roomType: '',
    roomPrice: '',
    roomDescription: '',
    numOfAdults: 0,
    numOfChildren: 0,
    isBooked: false,
  })


  useEffect(() => {
    fetchRooms()
  }, [])

  const predefinedRoomTypes = [
    'Single',
    'Double',
    'Family',
    'Suite',
    'Presidencial',
    'King Size',
    'Luxury suite'
  ]

  const fetchRooms = async () => {
    try {
      setLoading(true)
      const response = await getRooms()
      const roomsList = response.data || response
      setRooms(Array.isArray(roomsList) ? roomsList : [])
    } catch (error) {
      console.error('Error fetching rooms:', error)
      toast.error('Failed to load rooms')
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async () => {
    if (!roomToDelete) return

    try {
      setDeleting(roomToDelete)
      await deleteRoom(roomToDelete)
      setRooms(rooms.filter((r) => r.id !== roomToDelete))
      toast.success('Room deleted successfully')
    } catch (error) {
      console.error('Error deleting room:', error)
      toast.error('Failed to delete room')
    } finally {
      setDeleting(null)
      setRoomToDelete(null)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!formData.roomType || !formData.roomPrice || !formData.roomDescription) {
      toast.error('Please fill in all fields')
      return
    }

    setSubmitting(true)

    try {
      const form = new FormData()
      form.append('roomType', formData.roomType)
      form.append('roomPrice', formData.roomPrice)
      form.append('roomDescription', formData.roomDescription)
      form.append('numOfAdults', formData.numOfAdults)
      form.append('numOfChildren', formData.numOfChildren)
      form.append('isBooked', formData.isBooked)

      if (formData.photo) {
        form.append('photo', formData.photo)
      }

      if (editingId) {
        await updateRoom(editingId, form)
        toast.success('Room updated successfully')
        setEditingId(null)
      } else {
        await addRoom(form)
        toast.success('Room added successfully')
      }

      setFormData({
        roomType: '',
        roomPrice: '',
        roomDescription: '',
        numOfAdults: 0,
        numOfChildren: 0,
        isBooked: false,
        photo: null,
      })
      setShowForm(false)
      await fetchRooms()
    } catch (error) {
      console.error('Error saving room:', error)
      toast.error(error.message || 'Failed to save room')
    } finally {
      setSubmitting(false)
    }
  }

  const handleEdit = (room) => {
    setEditingId(room.id)
    setFormData({
      roomType: room.roomType,
      roomPrice: room.roomPrice,
      roomDescription: room.roomDescription,
      numOfAdults: room.numOfAdults,
      numOfChildren: room.numOfChildren,
      isBooked: Boolean(room.isBooked),
      photo: null
    })
    setShowForm(true)
  }

  const handleCancel = () => {
    setShowForm(false)
    setEditingId(null)
    setFormData({
      roomType: '',
      roomPrice: '',
      roomDescription: '',
      numOfAdults: 0,
      numOfChildren: 0,
      isBooked: false,
      photo: null,
    })
  }

  const roomTypes = useMemo(() => {
    return [...new Set(rooms.map((r) => r.roomType))]
  }, [rooms])

  const filteredRooms = useMemo(() => {
    if (selectedType === 'all') return rooms
    return rooms.filter((room) => room.roomType === selectedType)
  }, [rooms, selectedType])

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Rooms Management</h2>
        {!showForm && (
          <Button onClick={() => setShowForm(true)} className="flex items-center gap-2">
            <Plus className="w-4 h-4" />
            Add Room
          </Button>
        )}
      </div>

      <div className="flex items-center gap-4">
        <select
          value={selectedType}
          onChange={(e) => setSelectedType(e.target.value)}
          className="px-3 py-2 border border-border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
        >
          <option value="all">All room types</option>
          {roomTypes.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>

        <p className="text-sm text-muted-foreground">
          Showing {filteredRooms.length} of {rooms.length} rooms
        </p>
      </div>

      {showForm && (
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">
              {editingId ? 'Edit Room' : 'Add New Room'}
            </h3>
            <button onClick={handleCancel} className="p-1 hover:bg-muted rounded">
              <X className="w-5 h-5" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="roomType">Room Type</Label>

                <select
                  id="roomType"
                  value={isCustomType ? 'ADD_CUSTOM' : formData.roomType}
                  onChange={(e) => {
                    const value = e.target.value

                    if (value === 'ADD_CUSTOM') {
                      setIsCustomType(true)
                      setFormData({ ...formData, roomType: '' })
                    } else {
                      setIsCustomType(false)
                      setCustomRoomType('')
                      setFormData({ ...formData, roomType: value })
                    }
                  }}
                  required
                  className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="ToSelect">To select...</option>

                  {predefinedRoomTypes.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}

                  <option value="ADD_CUSTOM"> + Add</option>
                </select>

                {isCustomType && (
                  <Input
                    placeholder="New Room Type"
                    value={customRoomType}
                    onChange={(e) => {
                      const value = e.target.value
                      setCustomRoomType(value)
                      setFormData({ ...formData, roomType: value })
                    }}
                    required
                  />
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="roomPrice">Price per Night $</Label>
                <Input
                  id="roomPrice"
                  type="number"
                  step="0.01"
                  placeholder="99.99"
                  value={formData.roomPrice}
                  onChange={(e) =>
                    setFormData({ ...formData, roomPrice: e.target.value })
                  }
                  required
                />
              </div>

              {/* <div className="space-y-2">
                <Label htmlFor="numOfAdults">Number of Adults</Label>
                <Input
                  id="numOfAdults"
                  type="number"
                  step="0"
                  placeholder="0"
                  value={formData.numOfAdults}
                  onChange={(e) =>
                    setFormData({ ...formData, numOfAdults: e.target.value })
                  }
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="numOfChildren">Number of Children</Label>
                <Input
                  id="numOfChildren"
                  type="number"
                  step="0"
                  placeholder="0"
                  value={formData.numOfChildren}
                  onChange={(e) =>
                    setFormData({ ...formData, numOfChildren: e.target.value })
                  }
                  required
                />
              </div> */}
              {/* <label className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={formData.isBooked}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      isBooked: e.target.checked,
                    })
                  }
                />
                Room is reserved
              </label> */}
            </div>

            <div className="space-y-2">
              <Label htmlFor="roomDescription">Description</Label>
              <textarea
                id="roomDescription"
                placeholder="Room description..."
                value={formData.roomDescription}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    roomDescription: e.target.value,
                  })
                }
                required
                className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary bg-background text-foreground"
                rows="3"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="photo">Photo</Label>
              <Input
                id="photo"
                type="file"
                accept="image/*"
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    photo: e.target.files?.[0] || null,
                  })
                }
              />
            </div>

            <div className="flex gap-2">
              <Button type="submit" disabled={submitting}>
                {submitting
                  ? 'Saving...'
                  : editingId
                    ? 'Update Room'
                    : 'Add Room'}
              </Button>
              <Button type="button" variant="outline" onClick={handleCancel}>
                Cancel
              </Button>
            </div>
          </form>
        </Card>
      )}

      {filteredRooms.length === 0 ? (
        <Card className="p-8 text-center">
          <p className="text-muted-foreground">No rooms found</p>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRooms.map((room) => (
            <Card key={room.id} className="p-6 space-y-4">
              {room.roomPhotoUrl && (
                <img
                  src={`data:image/jpeg;base64,${room.roomPhotoUrl}`}
                  alt={room.roomType}
                  className="w-full h-48 object-cover rounded-lg"
                />
              )}

              <div>
                <h3 className="text-lg font-bold">{room.roomType}</h3>
                <p className="text-sm text-muted-foreground">Room #{room.id}</p>
              </div>

              {/* <p className="text-sm text-muted-foreground">
                Adults: {room.numOfAdults} | Children: {room.numOfChildren}
              </p> */}

              <div className="space-y-2">
                <p className="text-sm">
                  <span className="font-medium">Price:</span> $
                  {room.roomPrice}/night
                </p>
                <p className="text-sm line-clamp-2 text-muted-foreground">
                  {room.roomDescription}
                </p>
              </div>

              {room.isBooked && (
                <span className="inline-block text-xs bg-destructive text-white px-2 py-1 rounded">
                  Reserved
                </span>
              )}

              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(room)}
                  className="flex-1 p-2 text-primary hover:bg-primary/10 rounded-lg transition-all flex items-center justify-center gap-2"
                >
                  <Edit2 className="w-4 h-4" />
                  Edit
                </button>
                <button
                  onClick={() => setRoomToDelete(room.id)}
                  disabled={deleting === room.id}
                  className="flex-1 p-2 text-destructive hover:bg-destructive/10 rounded-lg transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  <Trash2 className="w-4 h-4" />
                  Delete
                </button>
              </div>
            </Card>
          ))}
        </div>
      )}

      <AlertDialog open={!!roomToDelete} onOpenChange={() => setRoomToDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete room?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. The room will be permanently removed.
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
