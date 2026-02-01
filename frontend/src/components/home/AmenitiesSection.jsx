import React from 'react'
import {
    Car,
    Dumbbell,
    PawPrint,
    Sparkles,
    Utensils,
    Waves,
    Wifi,
    Wind
} from 'lucide-react'
import { Link } from 'react-router-dom'

const amenities = [
    {
        icon: Waves,
        title: 'Infinity pool',
        description: 'Heated pool with rivers views',
        image: '/images/amenities/pool.jpg'
    },
    {
        icon: Sparkles,
        title: 'Spa & Wellness',
        description: 'Relaxing treatments and massages',
        image: '/images/amenities/spa.jpg'
    },
    {
        icon: Dumbbell,
        title: 'Gym',
        description: 'State-of-the-art fitness center',
        image: '/images/amenities/gym.jpg'
    },
    {
        icon: Utensils,
        title: 'Gourmet Restaurant',
        description: 'Exquisite dining experience',
        image: '/images/amenities/restaurant.jpg'
    }
]

const features = [
    { icon: Car, label: 'Valet Parking' },
    { icon: PawPrint, label: 'Pet Friendly' },
    { icon: Wifi, label: 'Free WiFi' },
    { icon: Wind, label: 'Acclimatization' }
]

export const AmenitiesSection = () => {
    return (
        <>
            <section className='py-24'>
                <div className='container mx-auto px-4'>
                    <div className='text-center mb-16'>
                        <p className='text-sm tracking-[0.3em] uppercase text-primary mb-2'>
                            Experiences
                        </p>
                        <h2 className=' text-4xl md:text-5xl font-serif font-semibold mb-4'>
                            Services & Amenities
                        </h2>
                        <p className='text-muted-foreground max-w-2xl mx-auto text-balance'>
                            Everything you ned for a perfect stay from relaxation to adventure.
                            We have something for everyone.
                        </p>
                    </div>
                    <div className='grid md:grid-cols-2 gap-6 mb-16'>
                        {amenities.map((amenity) => (
                            <Link
                                key={amenity.title}
                                className='group relative h-80 rounded-lg overflow-hidden block'
                                to='/services'
                            >
                                <img
                                    src={amenity.image || '/placeholder.svg'}
                                    alt={amenity.description}
                                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                />
                                <div className='absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent'>
                                    <div className='absolute bottom-0 left-0 right-0 p-6 text-white'>
                                        <div className="flex items-center gap-3 mb-2">
                                            <div className='p-2 w-9 rounded-full bg-white/20 backdrop-blur-sm'>
                                                <amenity.icon className='w-5 h-5' />
                                            </div>
                                            <h3 className='text-xl font-semibold'>
                                                {amenity.title}
                                            </h3>
                                        </div>
                                        <p className='text-white/80 text-sm'>
                                            {amenity.description}
                                        </p>
                                    </div>
                                </div>

                            </Link>
                        ))}
                    </div>
                    <div className='bg-primary/5 rounded-2xl p-8 md:p-12'>
                        <div className='text-center mb-8'>
                            <h3 className='text-2xl font-semibold mb-2'>
                                More to enjoy
                            </h3>
                            <p className='text-muted-foreground'>
                                Additional amenities for your comfort
                            </p>
                        </div>
                        <div className='grid grid-cols-2 md:grtid-cols-4 gap-6'>
                            {features.map((feature) => (
                                <div
                                    key={feature.label}
                                    className="flex flex-col items-center text-center p-4 rounded-lg bg-background hover:shadow-lg transition-shadow"
                                >
                                    <div className="p-3 rounded-full bg-primary/10 text-primary mb-3">
                                        <feature.icon className="h-6 w-6" />
                                    </div>
                                    <span className='text-sm font-medium'>
                                        {feature.label}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}
