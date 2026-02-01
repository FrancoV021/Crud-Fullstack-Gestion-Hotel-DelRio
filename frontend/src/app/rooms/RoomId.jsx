import { Footer } from '@/components/layout/Footer';
import { Navbar } from '@/components/layout/Navbar';
import { RoomDetails } from '@/components/rooms/RoomDetails';
import React from 'react'
import { useParams } from 'react-router-dom';

export const RoomId = () => {
    const { id } = useParams();
    return (
        <>
            <Navbar />
            <main className="pt-20">
                <RoomDetails
                    roomId={id} />
            </main>
            <Footer />
        </>
    )
}