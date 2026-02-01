import { Footer } from '@/components/layout/Footer'
import { Navbar } from '@/components/layout/Navbar'
import { RoomsList } from '@/components/rooms/RoomsList'
import React from 'react'

export const RoomsPage = () => {
  return (
    <>
      <Navbar />
      <main className="pt-20">
        <section className="bg-primary/5 py-16">
          <div className="container mx-auto px-4 text-center">
            <p className="text-sm tracking-[0.3em] uppercase text-primary mb-2">
              accommodation
            </p>
            <h1 className="text-4xl md:text-5xl font-serif font-semibold mb-4">
              Our Rooms
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto text-balance">
              Discover the comfort and elegance of our rooms, 
              designed to offer you a unique experience by the river.
            </p>
          </div>
        </section>
        <RoomsList />
      </main>

      <Footer />
    </>
  )
}
