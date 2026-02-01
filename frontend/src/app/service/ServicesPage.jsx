import { Footer } from '@/components/layout/Footer'
import { ServicesList } from '@/components/service/ServicesList';
import React from 'react'


export const ServicesPage = () => {
  return (
    <>
      <main className="pt-20">
        <section className="bg-primary/5 py-16">
          <div className="container mx-auto px-4 text-center">
            <p className="text-sm tracking-[0.3em] uppercase text-primary mb-2">
              Del Rio Stay & Resort
            </p>
            <h1 className="text-4xl md:text-5xl font-serif font-semibold mb-4">
              Our Best Services
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto text-balance">
              Smart facilities with natural environments
            </p>
          </div>
        </section>
        < ServicesList />

      </main>
      <Footer />

    </>
  )
}

