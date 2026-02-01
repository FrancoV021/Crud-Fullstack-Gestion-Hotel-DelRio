import { Mail, Phone } from 'lucide-react'
import React from 'react'
import { Link } from 'react-router-dom'
import { Button } from '../ui/button'

export const CTASection = () => {
    return (
        <>
            <section className='py-24 bg-primary text-primary-foreground'>
                <div className='container mx-auto px-4'>
                    <div className='max-w-4xl mx-auto text-center'>
                        <h2 className='text-4xl md:text-5xl font-serif font-semibold mb-6 text-balance'>
                            Book your perfect stay
                        </h2>
                        <p className='text-lg text-primary-foreground/80 mb-8 max-w-2xl mx-auto text-balance'>
                            Let us make your trip an unforgettable experience.
                            Contact us today and find out why we are the favorite destination by the river.
                        </p>
                        <div className='flex flex-col sm:flex-row gap-4 justify-center mb-12'>
                            <Button
                                size="lg"
                                variant="secondary"
                                className="text-base px-8"
                            >
                                <Link to="/rooms">Book Now</Link>
                            </Button>
                            <Button
                                size="lg"
                                variant="outline"
                                className="text-base px-8 border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary bg-transparent"
                                asChild
                            >
                                <Link to="/contact">Check Availability</Link>
                            </Button>
                        </div>
                        <div className='flex flex-col sm:flex-row items-center justify-center gap-8'>
                            <a
                                href="tel:+541112345678"
                                className='flex items-center gap-2 text-primary-foreground/80 hover:text-primary-foreground transition-colors'
                            >
                                <Phone className='h-5 w-5' />
                                <span>+54 11 1234-5678</span>
                            </a>
                            <a
                                href="mailto:reservas@delrioresort.com"
                                className='flex items-center gap-2 text-primary-foreground/80 hover:text-primary-foreground transition-colors'
                            >
                                <Mail className="h-5 w-5" />
                                <span>reservas@delrioresort.com</span>
                            </a>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}
