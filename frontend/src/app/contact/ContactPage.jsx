import { useState } from 'react'
import { Footer } from '@/components/layout/Footer'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card } from '@/components/ui/card'
import { Phone, Mail, MapPin, Clock, Send, Loader2 } from 'lucide-react'
import { toast } from 'sonner'

export default function ContactPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (
      !formData.firstName ||
      !formData.lastName ||
      !formData.email ||
      !formData.subject ||
      !formData.message
    ) {
      toast.error('Please fill in all required fields')
      return
    }

    setIsLoading(true)

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000))
      toast.success('Message sent successfully! We will contact you soon.')
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
      })
    } catch {
      toast.error('Failed to send message. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <section className="relative">
        <div className="absolute inset-0 bg-cover bg-center bg-no-repeat  "
          style={{
            backgroundImage: "url('/bg-target-cards/bg-card-2.jpg')",
          }}>
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/60" />
        </div>

        <div className="relative z-10">
          <div className="pt-32 pb-20">
            <div className="container mx-auto px-4">
              <div className="max-w-3xl mx-auto text-center space-y-6 text-white">
                <h1 className="text-4xl md:text-5xl font-serif font-bold">
                  Get in Touch
                </h1>
                <p className="text-lg text-white/80">
                  Have a question or ready to book your stay? We're here to help
                  and would love to hear from you.
                </p>
              </div>
            </div>
          </div>

          <div className="py-20">
            <div className="container mx-auto px-4">
              <div className="grid lg:grid-cols-3 gap-8 mb-16">
                <div className="lg:col-span-1 space-y-8">
                  <Card className="p-6 bg-background/70 backdrop-blur-md">
                    <div className="flex gap-4">
                      <div className="p-3 bg-primary/10 rounded-lg h-fit">
                        <Phone className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold">Phone</h3>
                        <p className="text-muted-foreground text-sm">+54 11 4512-3456</p>
                        <p className="text-muted-foreground text-sm">+54 11 4512-3457</p>
                      </div>
                    </div>
                  </Card>

                  <Card className="p-6 bg-background/70 backdrop-blur-md">
                    <div className="flex gap-4">
                      <div className="p-3 bg-primary/10 rounded-lg h-fit">
                        <Mail className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold">Email</h3>
                        <p className="text-muted-foreground text-sm">info@delrioresort.com</p>
                        <p className="text-muted-foreground text-sm">reservations@delrioresort.com</p>
                      </div>
                    </div>
                  </Card>

                  <Card className="p-6 bg-background/70 backdrop-blur-md">
                    <div className="flex gap-4">
                      <div className="p-3 bg-primary/10 rounded-lg h-fit">
                        <MapPin className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold">Address</h3>
                        <p className="text-muted-foreground text-sm">Route 27, Km 4.5</p>
                        <p className="text-muted-foreground text-sm">Tigre, Buenos Aires</p>
                      </div>
                    </div>
                  </Card>

                  <Card className="p-6 bg-background/70 backdrop-blur-md">
                    <div className="flex gap-4">
                      <div className="p-3 bg-primary/10 rounded-lg h-fit">
                        <Clock className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold">Hours</h3>
                        <p className="text-muted-foreground text-sm">Mon - Sun: 24/7</p>
                      </div>
                    </div>
                  </Card>
                </div>

                <div className="lg:col-span-2">
                  <Card className="p-8 md:p-12 bg-background/70 backdrop-blur-md">
                    <h2 className="text-2xl font-serif font-bold mb-8">
                      Send us a Message
                    </h2>

                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <Label>First Name *</Label>
                          <Input name="firstName" value={formData.firstName} onChange={handleChange} />
                        </div>
                        <div>
                          <Label>Last Name *</Label>
                          <Input name="lastName" value={formData.lastName} onChange={handleChange} />
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <Label>Email *</Label>
                          <Input type="email" name="email" value={formData.email} onChange={handleChange} />
                        </div>
                        <div>
                          <Label>Phone</Label>
                          <Input name="phone" value={formData.phone} onChange={handleChange} />
                        </div>
                      </div>

                      <div>
                        <Label>Subject *</Label>
                        <Input name="subject" value={formData.subject} onChange={handleChange} />
                      </div>

                      <div>
                        <Label>Message *</Label>
                        <textarea
                          rows="6"
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                          className="w-full px-4 py-3 border rounded-lg resize-none"
                        />
                      </div>

                      <Button type="submit" disabled={isLoading}>
                        {isLoading ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Sending...
                          </>
                        ) : (
                          <>
                            <Send className="mr-2 h-4 w-4" />
                            Send Message
                          </>
                        )}
                      </Button>
                    </form>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="py-20 bg-background">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-3xl font-serif font-bold mb-12 text-center">
            Frequently Asked Questions
          </h2>

          <div className="space-y-6">
            <Card className="p-6">
              <h3 className="font-semibold mb-2">When is the best time to visit?</h3>
              <p className="text-muted-foreground text-sm">
                Del Rio is beautiful year-round, but spring (September-November) and
                fall (March-May) offer perfect weather. Summer is ideal for water
                activities.
              </p>
            </Card>

            <Card className="p-6">
              <h3 className="font-semibold mb-2">Do you offer airport transfers?</h3>
              <p className="text-muted-foreground text-sm">
                Yes! We arrange airport transfers from both Ezeiza and Aeroparque
                airports. Contact us for rates and booking.
              </p>
            </Card>

            <Card className="p-6">
              <h3 className="font-semibold mb-2">What activities are available?</h3>
              <p className="text-muted-foreground text-sm">
                We offer water sports, spa treatments, fine dining, guided tours,
                and more. Check our activities page for complete details.
              </p>
            </Card>

            <Card className="p-6">
              <h3 className="font-semibold mb-2">Can you accommodate large groups?</h3>
              <p className="text-muted-foreground text-sm">
                We specialize in corporate events and group bookings.
                Contact our group coordinator for customized packages.
              </p>
            </Card>

            <Card className="p-6">
              <h3 className="font-semibold mb-2">Is WiFi available throughout the resort?</h3>
              <p className="text-muted-foreground text-sm">
                Yes, high-speed complimentary WiFi is available in all rooms and
                common areas.
              </p>
            </Card>

            <Card className="p-6">
              <h3 className="font-semibold mb-2">What is your cancellation policy?</h3>
              <p className="text-muted-foreground text-sm">
                Cancellations made 7+ days before arrival receive full refund. For
                specific details, please contact our reservations team.
              </p>
            </Card>
          </div>
        </div>
      </div>

      <div className="py-20 bg-card">
        <div className="container mx-auto px-4">
          <div className="w-full h-96 rounded-2xl overflow-hidden border">
            <iframe
              src="https://www.google.com/maps?q=Tigre,Buenos+Aires&output=embed"
              className="w-full h-full"
              loading="lazy"
            />
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}
