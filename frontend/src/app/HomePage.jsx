import { AmenitiesSection } from '@/components/home/AmenitiesSection'
import { CTASection } from '@/components/home/CTASection'
import { FeaturedRooms } from '@/components/home/FeaturedRooms'
import { HeroSection } from '@/components/home/HeroSection'
import { Footer } from '@/components/layout/Footer'
import { Navbar } from '@/components/layout/Navbar'
import React from 'react'

export const HomePage = () => {
  return (
    <>
    <Navbar/>
    <main>
        <HeroSection/>
        <FeaturedRooms />
        <AmenitiesSection />
        <CTASection />
    </main>
    <Footer/>
    </>
  )
}
