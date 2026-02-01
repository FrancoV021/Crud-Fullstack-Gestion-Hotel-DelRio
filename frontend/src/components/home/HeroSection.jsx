import React from 'react'
import { Button } from '../ui/button'
import { Link } from 'react-router-dom'
import { ChevronDown } from 'lucide-react'

export const HeroSection = () => {

  const scrollToRooms = () => {
    document
      .getElementById('featured-rooms')
      ?.scrollIntoView({ behavior: 'smooth' })
  }


  return (
    <>
      <section className='relative h-screen min-h-[600px] flex items-center justify-center'>
        <div className='absolute inset-0 z-0'>
          <img
            src="/images/hotel-hero.jpg"
            alt="Del Rio Stay & Resort - home"
            className='w-full h-full object-cover'
          />
          <div className='absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/60' />
        </div>
        <div className='relative z-10 container mx-auto px-4 text-center text-white'>
          <div className='max-w-4xl mx-auto space-y-8'>
            <div className="space-y-4">
              <p className="text-sm md:text-base tracking-[0.4em] uppercase font-light animate-in fade-in slide-in-from-bottom-4 duration-700">
                Welcome To
              </p>
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif font-semibold tracking-wide animate-in fade-in slide-in-from-bottom-6 duration-700 delay-150 text-balance">
                Del Rio Stay & Resort
              </h1>
              <p className="text-lg md:text-xl font-light max-w-2xl mx-auto leading-relaxed animate-in fade-in slide-in-from-bottom-8 duration-700 delay-300 text-balance">
                Where luxury meets nature.
                Enjoy spectacular river views, world-class spa and exceptional service.
              </p>
            </div>
            <div className='flex flex-col sm:flex-row gap-4 justify-center animate-in fade-in slide-in-from-bottom-10 duration-700 delay-500'>
              <Button
                size="lg"
                variant=""
                className="text-base px-12"
                asChild
              >
                <Link to="/rooms">Explore Rooms</Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="text-base px-6 bg-transparent border-white text-white hover:bg-white hover:text-foreground"
                asChild
              >
                <Link to="/contact">Contact Us</Link>
              </Button>
            </div>
          </div>
        </div>
        <Button
          onClick={scrollToRooms}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 text-white/60 hover:text-white backdrop-blur-sm bg-white/0 hover:bg-white/5 rounded-full px-3 py-2 transition-all animate-bounce"
          aria-label="Scroll down"
        >
          <ChevronDown className='h-8 w-8' />
        </Button>
      </section>

    </>
  )
}
