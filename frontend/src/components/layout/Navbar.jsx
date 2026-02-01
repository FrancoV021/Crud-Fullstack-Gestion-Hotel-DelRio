
import { cn } from '@/lib/utils';
import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '../ui/dropdown-menu';
import { Calendar, ChevronDown, LogOut, Menu, Settings, User, X } from 'lucide-react';
import { Button } from '../ui/button';
import { useAuth } from '@/context/AuthContext';

const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/rooms', label: 'Rooms' },
    { href: '/services', label: 'Services' },
    { href: '/about', label: 'About Us' },
    { href: '/contact', label: 'Contact' },
    { href: '/find-booking', label: 'My Bookings' },
]

export const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { pathname } = useLocation();
    const { user, isAuthenticated, isAdmin, logout } = useAuth();
    
    console.log('Navbar - isAdmin:', isAdmin, 'user:', user)

    return (
        <>
            <header className='fixed top-0 left-0 right-0 z-50 bg-background/70 backdrop-blur supports-[backdrop-filter]:bg-background/45 border-b border-border'>
                <nav className='container mx-auto px-4 h-20 flex items-center justify-between '>
                    <Link to="/" className="flex flex-col items-start">
                        <span className="text-2xl font-sans font-semibold tracking-wide text-primary  font-serif">
                            Del Rio
                        </span>
                        <span className="text-xs tracking-[0.3em] uppercase text-muted-foreground -mt-1 font-serif">
                            Stay & Resort
                        </span>
                    </Link>
                    <div className="hidden lg:flex items-center gap-8 ">
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                to={link.href}
                                className={cn(
                                    "text-sm font-medium transition-colors hover:text-primary",
                                    pathname === link.href
                                        ? "text-primary"
                                        : "text-muted-foreground"
                                )}
                            >
                                {link.label}
                            </Link>
                        ))}
                    </div>
                    <div className="hidden lg:flex items-center gap-4">
                        {isAuthenticated ? (
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" className="gap-2 bg-gray-600/30">
                                        <User className="h-4 w-4" />
                                        <span className="max-w-[120px] truncate">{user?.email}</span>
                                        <ChevronDown className="h-4 w-4" />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end" className="w-56">
                                    <DropdownMenuItem asChild>
                                        <Link to="/my-bookings" className="cursor-pointer">
                                            <Calendar className="mr-2 h-4 w-4" />
                                            My Bookings
                                        </Link>
                                    </DropdownMenuItem>
                                    {isAdmin && (
                                        <>
                                            <DropdownMenuSeparator />
                                            <DropdownMenuItem asChild>
                                                <Link to="/admin" className="cursor-pointer">
                                                    <Settings className="mr-2 h-4 w-4" />
                                                    Admin Panel
                                                </Link>
                                            </DropdownMenuItem>
                                        </>
                                    )}
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem onSelect={logout} className="cursor-pointer text-destructive">
                                        <LogOut className="mr-2 h-4 w-4" />
                                        Log Out
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        ) : (
                            <>
                                <Button asChild className=" bg-transparent border-none text-foreground hover:bg-accent hover:text-accent-foreground transition-colors ">
                                    <Link to="/login">Sign In</Link>
                                </Button>
                                <Button asChild>
                                    <Link to="/register">Sign Up</Link>
                                </Button>
                            </>
                        )}
                    </div>
                    <button className='lg:hidden p-2' onClick={() => setIsOpen(!isOpen)} aria-label={isOpen ? "Cerrar menu" : "Abrir menu"}>
                        {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                    </button>
                </nav>
                {isOpen && (
                    <div className='lg:hidden bg-background border-b border-border'>
                        <div className='container mx-auto px-4 py-4 flex flex-col gap-4'>
                            {navLinks.map((link) => (
                                <Link
                                    key={link.href}
                                    to={link.href}
                                    onClick={() => setIsOpen(false)}
                                    className={cn(
                                        "text-sm font-medium py-2 transition-colors hover:text-primary",
                                        pathname === link.href
                                            ? "text-primary"
                                            : "text-muted-foreground"
                                    )}
                                >
                                    {link.label}
                                </Link>
                            ))}
                            <div className='border-t border-border pt-4 flex flex-col gap-2'>
                                {isAuthenticated ? (
                                    <>
                                        <p className='text-sm text-muted-foreground truncate'>{user?.email}</p>
                                        <Link
                                            to="/my-bookings"
                                            onClick={() => setIsOpen(false)}
                                            className="text-sm font-medium py-2"
                                        >
                                            My Bookings
                                        </Link>
                                        {isAdmin && (
                                            <Link
                                                to="/admin"
                                                onClick={() => setIsOpen(false)}
                                                className="text-sm font-medium py-2"
                                            >
                                                Admin Panel
                                            </Link>
                                        )}
                                        <Button
                                            variant="outline"
                                            onClick={() => {
                                                logout();
                                                setIsOpen(false);
                                            }}
                                            className="mt-2"
                                        >
                                            Log Out
                                        </Button>
                                    </>
                                ) : (
                                    <>
                                        <Button variant="outline" asChild className="w-full bg-transparent">
                                            <Link to="/login" onClick={() => setIsOpen(false)}>
                                                Sign In
                                            </Link>
                                        </Button>
                                        <Button asChild className="w-full">
                                            <Link to="/register" onClick={() => setIsOpen(false)}>
                                                Sign Up
                                            </Link>
                                        </Button>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                )}
            </header>
        </>
    )
}
