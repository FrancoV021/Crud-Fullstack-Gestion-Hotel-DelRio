import { cn } from '@/lib/utils';
import { Car, Clock, Dumbbell, PawPrint, Ship, Sparkles, TreePine, Utensils, UtensilsCrossed, Waves, Wifi, Wind, ChevronRight, MapPin, Users, X } from 'lucide-react'
import React, { useState } from 'react'

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

const serviceCategories = [
    {
        title: "well-being and relaxation",
        icon: <Sparkles className="w-6 h-6  text-white" />,
        color: "bg-amber-700/40",
        borderColor: "border-2 border-solid border-stone-600",
        services: [
            {
                name: "Heated pool",
                info: "Outdoor & Indoor",
                hours: "08:00 - 22:00",
                details: "Enjoy our heated pools with panoramic river views. We also have a covered area for cooler days.",
                location: "Main area of the hotel"
            },
            {
                name: "Spa & Massages",
                info: "Premium Treatments",
                hours: "09:00 - 20:00",
                details: "Relaxing massages, aromatherapy and luxury body treatments performed by certified therapists.",
                location: "Wellness Wing"
            },
            {
                name: "Panoramic Jacuzzi",
                info: "In front of the river",
                hours: "10:00 - 00:00",
                details: "Jacuzzi with hydromassage overlooking the Paraná River. Ideal for relaxing at sunset.",
                location: "River Deck"
            }
        ]
    },
    {
        title: "Water fun",
        icon: <Ship className="w-6 h-6 text-white" />,
        color: "bg-amber-700/40",
        borderColor: "border-2 border-solid border-stone-600",
        services: [
            {
                name: "Jet Skis",
                info: "Training",
                hours: "10:00 - 18:00",
                details: "Adrenaline experience with professional instructors. Available for beginners and experts.",
                location: "Main dock"
            },
            {
                name: "Boat Tours",
                info: "Delta Exploration",
                hours: "Consult",
                details: "Guided tours of the Paraná Delta. Wildlife and native flora observation. Prior reservation at reception.",
                location: "Starting point: Mian dock"
            },
            {
                name: "Jet Sky Level 2",
                info: "Pure adrenaline",
                hours: "10:00 - 18:00",
                details: "Jet ski rental for use without instructors, with full safety equipment. Prior experience or training required.",
                location: "Main dock"
            }
        ]
    },
    {
        title: "Nature & Outdoor",
        icon: <TreePine className="w-6 h-6 text-white" />,
        color: "bg-amber-700/40",
        borderColor: "border-2 border-solid border-stone-600",
        services: [
            {
                name: "Guided Tours",
                info: "Trekking and hiking",
                hours: "09:00 - 17:00",
                details: "Discover the local biodiversity with expert guides. Varied trails for all levels.",
                location: "Exit: Information Center"
            },
            {
                name: "Pro Gym",
                info: "Top of the range equipment",
                hours: "06:00 - 23:00",
                details: "Modern fitness center with state-of-the-art equipment. Classes and personalized training available.",
                location: "Sports wing"
            },
            {
                name: "Yoga at sunrise",
                info: "Deck facing the river",
                hours: "07:00 - 09:00",
                details: "Morning yoga sessions with a privileged view. Find peace and balance in nature.",
                location: "River deck"
            }
        ]
    },
    {
        title: "Gastronomy & Comfort",
        icon: <UtensilsCrossed className="w-6 h-6 text-white" />,
        color: "bg-amber-700/40",
        borderColor: "border-2 border-solid border-stone-600",
        services: [
            {
                name: "Gourmet Cuisine",
                info: "All Inclusive Experience",
                hours: "12:00 - 23:30",
                details: "Executive chef with tasting menu. Seasonal culinary offerings with vegetarian options.",
                location: "Main restaurant"
            },
            {
                name: "Room Service",
                info: "Cleaning & cooking",
                hours: "24 hs",
                details: "24-hour room service. Daily cleaning + room menu with premium options.",
                location: "All suites and all presidential suites"
            },
            {
                name: "Private parking & Exclusive dock",
                info: "24/7 Security",
                hours: "24 hs",
                details: "Covered parking and 24/7 security. Direct access to the main entrance and exclusive private dock for members",
                location: "Hotel basement"
            }
        ]
    }
];


const features = [
    { icon: Car, label: 'Valet Parking' },
    { icon: PawPrint, label: 'Pet Friendly' },
    { icon: Wifi, label: 'Free WiFi' },
    { icon: Wind, label: 'Acclimatization' }
]

const ServiceDetailModal = ({ service, isOpen, onClose }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
            <div className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full animate-in fade-in zoom-in-95 duration-200">
                <div className={`bg-gradient-to-r p-6 rounded-t-2xl bg-emerald-700`}>
                    <h3 className="text-2xl font-bold text-accent-foreground">{service.name}</h3>
                </div>

                <div className="p-6 space-y-6">
                    <p className="text-stone-600 leading-relaxed">{service.details}</p>

                    <div className="space-y-4">
                        <div className={`flex items-start gap-3 p-4 rounded-lg border bg-amber-50`}>
                            <Clock className="w-5 h-5 flex-shrink-0 mt-0.5 text-primary" />
                            <div>
                                <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">schedules</p>
                                <p className="font-semibold text-stone-900">{service.hours}</p>
                            </div>
                        </div>

                        <div className={`flex items-start gap-3 p-4 rounded-lg border bg-amber-50`}>
                            <MapPin className="w-5 h-5 flex-shrink-0 mt-0.5 text-primary" />
                            <div>
                                <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Location</p>
                                <p className="font-semibold text-stone-900">{service.location}</p>
                            </div>
                        </div>
                    </div>

                    <button
                        onClick={onClose}
                        className={`w-full py-3 rounded-lg font-semibold transition-all duration-200 bg-gradient-to-r bg-emerald-700 hover:bg-emerald-600 active:scale-95  `}
                    >
                        <X className='m-auto'></X>
                    </button>
                </div>
            </div>
        </div>
    );
};

export const ServicesList = () => {
    const [selectedService, setSelectedService] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState(null);

    return (
        <>
            <div className='container mx-auto px-4'>
                <div className='grid md:grid-cols-2 gap-6 mb-16'>
                    {amenities.map((amenity) => (
                        <div
                            key={amenity.title}
                            className='group relative h-80 rounded-lg overflow-hidden block'
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
                        </div>
                    ))}
                </div>
            </div>

            <div className='text-center mb-8'>
                <h3 className='text-2xl font-semibold mb-2'>
                    Guest Itineraty
                </h3>
                <p className='text-sm tracking-[0.3em] uppercase '>
                    Everything you need to know to make the most of our facilities and services
                </p>
            </div>

            <section className='relative py-20'>
                <div className='absolute inset-0 z-0'>
                    <img
                        src="/images/service/ServicePage.png"
                        alt="Del Rio Stay & Resort - Services"
                        className='w-full h-full object-cover'
                    />
                    <div className='absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/60' />
                </div>

                <div className="container mx-auto px-4">
                    <div className='grid md:grid-cols-2 gap-6 mb-16'>
                        {serviceCategories.map((cat, idx) => (
                            <div
                                key={idx}
                                className={cn(
                                    "p-8 rounded-2xl border backdrop-blur-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-1 bg-gradient-to-br",
                                    cat.color,
                                    cat.borderColor
                                )}
                            >
                                <div className="flex items-center gap-4 mb-8 p-2 w-70 rounded-full bg-white/20">
                                    <div className="p-2 w-10 rounded-full bg-white/20 backdrop-blur-sm">
                                        {cat.icon}
                                    </div>
                                    <h3 className="font-bold text-xl text-white">{cat.title}</h3>
                                </div>
                                <ul className="space-y-3">
                                    {cat.services.map((service, sIdx) => (
                                        <li
                                            key={sIdx}
                                            onClick={() => {
                                                setSelectedService(service);
                                                setSelectedCategory(cat.color);
                                            }}
                                            className="group cursor-pointer p-4 rounded-xl bg-white/40 hover:bg-white/70 transition-all duration-200 border border-white/30 hover:border-white/60"
                                        >
                                            <div className="flex justify-between items-start gap-3 mb-2">
                                                <span className="font-semibold text-stone-900 group-hover:text-stone-950 transition-colors flex-1">
                                                    {service.name}
                                                </span>
                                                <ChevronRight className="w-5 h-5 text-stone-400 group-hover:text-stone-600 group-hover:translate-x-1 transition-all duration-200 flex-shrink-0" />
                                            </div>
                                            <div className="flex justify-between items-center gap-3">
                                                <p className="text-sm text-stone-600 leading-tight">
                                                    {service.info}
                                                </p>
                                                <div className="flex items-center text-xs bg-white/60 px-3 py-1.5 rounded-full text-stone-600 font-medium whitespace-nowrap group-hover:bg-white/90 transition-colors">
                                                    <Clock className="w-3.5 h-3.5 mr-1.5" /> {service.hours}
                                                </div>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
            <div className='bg-primary p-8 md:p-12'>
                <div className='text-center mb-8 '>
                    <h3 className='text-2xl font-semibold mb-2 text-accent-foreground'>
                        More to enjoy
                    </h3>
                    <p className='text-sm tracking-[0.3em] uppercase text-accent-foreground mb-2'>
                        Additional amenities for your comfort
                    </p>
                </div>
                <div className='grid grid-cols-2 md:grtid-cols-4 gap-6 '>
                    {features.map((feature) => (
                        <div
                            key={feature.label}
                            className="flex flex-col items-center text-center p-4 rounded-lg bg-background hover:bg-background/50 transition-easy"
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
            {selectedService && (
                <ServiceDetailModal
                    service={selectedService}
                    isOpen={!!selectedService}
                    onClose={() => setSelectedService(null)}
                    categoryColor={selectedCategory}
                />
            )}
        </>
    )
}
