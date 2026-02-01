import React from 'react'
import { Clock, Mail, MapPin, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <>
            <footer className="bg-sidebar text-sidebar-foreground">
                <div className="container mx-auto px-4 py-16">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
                        <div className="space-y-4">
                            <div>
                                <h3 className="text-2xl font-serif font-semibold tracking-wide">
                                    Del Rio
                                </h3>
                                <p className="text-xs tracking-[0.3em] uppercase text-sidebar-foreground/70">
                                    Stay & Resort
                                </p>
                            </div>
                            <p className="text-sm text-sidebar-foreground/80 leading-relaxed">
                                Experience luxury by the river.
                                Where nature meets comfort and every moment becomes an unforgettable memory.
                            </p>
                        </div>
                        <div className="space-y-4">
                            <h4 className="text-lg font-semibold">Quick Links</h4>
                            <nav className="flex flex-col gap-2">
                                <Link to="/rooms" className="text-sm text-sidebar-foreground/80 hover:text-sidebar-primary transition-colors">
                                    Rooms
                                </Link>
                                <Link to="/services" className="text-sm text-sidebar-foreground/80 hover:text-sidebar-primary transition-colors">
                                    Services
                                </Link>
                                <Link to="/about" className="text-sm text-sidebar-foreground/80 hover:text-sidebar-primary transition-colors">
                                    About Us
                                </Link>
                                <Link to="/contact" className="text-sm text-sidebar-foreground/80 hover:text-sidebar-primary transition-colors">
                                    Contact
                                </Link>
                                <Link to="/find-booking" className="text-sm text-sidebar-foreground/80 hover:text-sidebar-primary transition-colors">
                                    Search Booking
                                </Link>
                            </nav>
                        </div>
                        <div className="space-y-4">
                            <h4 className="text-lg font-semibold">Contact</h4>
                            <div className="space-y-3">
                                <div className="flex items-start gap-3">
                                    <MapPin className="h-5 w-5 text-sidebar-primary shrink-0 mt-0.5" />
                                    <p className="text-sm text-sidebar-foreground/80">
                                        Av. del Rio 1234, Riverside<br />
                                        Buenos Aires, Argentina
                                    </p>
                                </div>
                                <div className="flex items-center gap-3">
                                    <Phone className="h-5 w-5 text-sidebar-primary shrink-0" />
                                    <p className="text-sm text-sidebar-foreground/80">
                                        +54 11 1234-5678
                                    </p>
                                </div>
                                <div className="flex items-center gap-3">
                                    <Mail className="h-5 w-5 text-sidebar-primary shrink-0" />
                                    <p className="text-sm text-sidebar-foreground/80">
                                        info@delrioresort.com
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="space-y-4">
                            <h4 className="text-lg font-semibold">Time</h4>
                            <div className="space-y-3">
                                <div className="flex items-start gap-3">
                                    <Clock className="h-5 w-5 text-sidebar-primary shrink-0 mt-0.5" />
                                    <div className="text-sm text-sidebar-foreground/80">
                                        <p className="font-medium">Reception</p>
                                        <p>24 hours</p>
                                    </div>
                                </div>
                                <div className="text-sm text-sidebar-foreground/80 pl-8">
                                    <p className="font-medium">Check-in</p>
                                    <p>15:00 - 22:00</p>
                                </div>
                                <div className="text-sm text-sidebar-foreground/80 pl-8">
                                    <p className="font-medium">Check-out</p>
                                    <p>Until 11:00</p>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
                <div className="border-t border-sidebar-border">
                    <div className="container mx-auto px-4 py-6">
                        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                            <p className="text-sm text-sidebar-foreground/60">
                                {currentYear} Del Rio Stay & Resort. All rigths reserved.
                            </p>
                            <div className="flex gap-6">
                                <Link to="/privacy" className="text-sm text-sidebar-foreground/60 hover:text-sidebar-primary transition-colors">
                                    Privacity
                                </Link>
                                <Link to="/terms" className="text-sm text-sidebar-foreground/60 hover:text-sidebar-primary transition-colors">
                                    Terms of Service
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        </>
    )
}
