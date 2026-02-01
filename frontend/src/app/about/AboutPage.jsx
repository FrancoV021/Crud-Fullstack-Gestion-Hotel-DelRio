import { CTASection } from '@/components/home/CTASection'
import { Footer } from '@/components/layout/Footer'
import { Anchor, Car, MapPin, Wifi, Utensils, Dumbbell } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function AboutPage() {
  return (
    <>
      <div className="pt-32 pb-20 bg-gradient-to-b from-primary/5 to-background">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h1 className="text-4xl md:text-5xl font-serif font-bold">
              About Del Rio
            </h1>
            <p className="text-lg text-muted-foreground">
              Where luxury meets nature. A riverside retreat offering world-class
              amenities and unforgettable experiences in the heart of Tigre.
            </p>
          </div>
        </div>
      </div>

      <div className="bg-sidebar text-sidebar-foreground py-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-3xl md:text-4xl font-serif leading-tight">
                A destination,
                <br />
                <span className="text-emerald-600/70 font-light italic">
                  Two ways to get there.
                </span>
              </h2>
              <p className="text-sidebar-foreground/70 font-light text-lg">
                Del Rio Stay & Resort encompasses a unique territory where asphalt
                meets water. We've designed exclusive access points so your journey
                becomes part of the experience.
              </p>
            </div>

            <Link
              className="grid grid-cols-1 gap-4"
              to='/contact'
            >
              <div
                className="
                 flex gap-4 p-6 rounded-2xl border border-sidebar-border
                 bg-cover bg-center bg-no-repeat
                 transition-transform duration-500
                 hover:scale-[1.02]
                 "
                style={{
                  backgroundImage: "url('/bg-target-cards/bg-card-3.jpg')",
                }}>
                <Car className="w-8 h-8 text-gray-500" />
                <div>
                  <h3 className="font-bold mb-1 ">Street Access</h3>
                  <p className="text-lg font-bold">
                    Route 27, Km 4.5, Tigre. Private parking with valet service.
                  </p>
                </div>

              </div>
              <div className="
                 flex gap-4 p-6 rounded-2xl border border-sidebar-border
                 bg-cover bg-center bg-no-repeat
                 transition-transform duration-500
                 hover:scale-[1.02]
                 "
                style={{
                  backgroundImage: "url('/bg-target-cards/bg-card-3.jpg')",
                }}>
                <Anchor className="w-8 h-8 text-gray-500 shrink-0" />
                <div>
                  <h3 className="font-bold mb-1">River Access</h3>
                  <p className="text-lg font-bold">
                    Luján River Canal, Private Dock 42. Exclusive mooring for guests.
                  </p>
                </div>

              </div>
            </Link>
          </div>
        </div>
      </div>

      <div className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-12 text-center">
              Our Story
            </h2>
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <p className="text-muted-foreground leading-relaxed">
                  Founded in 2015, Del Rio was born from a vision to create a sanctuary
                  where modern luxury meets natural beauty. Located on the banks of the
                  Luján River in Tigre, Argentina, our resort has become a premier
                  destination for travelers seeking respite from urban life.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  We believe in providing more than just accommodation. Every detail,
                  from the architecture to the service, is designed to create memorable
                  moments. Our commitment to excellence has made us a trusted choice for
                  families, couples, and executives alike.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  Today, Del Rio continues to set the standard for luxury hospitality in
                  the region, combining traditional Argentine warmth with contemporary
                  sophistication.
                </p>
              </div>
              <Link
                className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-2xl p-12 h-96 flex items-center justify-center border border-primary/20"
                to="/contact">
                <div className="text-center space-y-4">
                  <MapPin className="w-16 h-16 text-primary mx-auto" />
                  <h3 className="text-2xl font-serif font-bold">Del Rio Stay & Resort</h3>
                  <p className="text-muted-foreground">Tigre, Buenos Aires, Argentina</p>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="py-20 bg-card">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-12 text-center">
            World-Class Amenities
          </h2>
          <Link
            to='/services'
            className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 rounded-2xl bg-background border border-border hover:border-primary/50 transition-colors">
              <Dumbbell className="w-8 h-8 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-3">Fitness Center</h3>
              <p className="text-muted-foreground">
                Equipped with state-of-the-art equipment and professional trainers
                available for personalized sessions.
              </p>
            </div>
            <div className="p-8 rounded-2xl bg-background border border-border hover:border-primary/50 transition-colors">
              <Utensils className="w-8 h-8 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-3">Fine Dining</h3>
              <p className="text-muted-foreground">
                Michelin-trained chefs crafting contemporary cuisine with local
                ingredients and international flavors.
              </p>
            </div>
            <div className="p-8 rounded-2xl bg-background border border-border hover:border-primary/50 transition-colors">
              <Wifi className="w-8 h-8 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-3">Connectivity</h3>
              <p className="text-muted-foreground">
                High-speed WiFi throughout the resort, business centers, and meeting
                facilities for corporate guests.
              </p>
            </div>
          </Link>
        </div>
      </div>

      <div className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-12 text-center">
            Our Values
          </h2>
          <div className="max-w-3xl mx-auto grid md:grid-cols-2 gap-8">
            <div className="space-y-3">
              <h3 className="text-xl font-semibold text-primary">Excellence</h3>
              <p className="text-muted-foreground">
                We pursue perfection in every aspect of our service, from cuisine to
                guest care.
              </p>
            </div>
            <div className="space-y-3">
              <h3 className="text-xl font-semibold text-primary">Sustainability</h3>
              <p className="text-muted-foreground">
                Committed to environmental stewardship and protecting the river
                ecosystem we call home.
              </p>
            </div>
            <div className="space-y-3">
              <h3 className="text-xl font-semibold text-primary">Hospitality</h3>
              <p className="text-muted-foreground">
                Genuine warmth and personalized attention define how we treat every
                guest.
              </p>
            </div>
            <div className="space-y-3">
              <h3 className="text-xl font-semibold text-primary">Innovation</h3>
              <p className="text-muted-foreground">
                Continuously improving our facilities and services to exceed
                expectations.
              </p>
            </div>
          </div>
        </div>
      </div>
      <CTASection />
      <Footer />
    </>
  )
}