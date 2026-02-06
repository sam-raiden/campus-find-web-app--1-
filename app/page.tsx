import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { HeroSection } from "@/components/hero-section"
import { StatsPreview } from "@/components/stats-preview"


export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      
      <main className="flex-1">
        <HeroSection />
        
        <section className="border-t bg-muted/50 py-16">
          <div className="mx-auto max-w-4xl px-4">
            <div className="mb-10 text-center">
              <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
                Campus Stats
              </h2>
              <p className="mt-2 text-muted-foreground">
                Real-time overview of lost and found items on campus
              </p>
            </div>
            
            <StatsPreview />
          </div>
        </section>

        <section className="py-16">
          <div className="mx-auto max-w-4xl px-4">
            <div className="mb-10 text-center">
              <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
                How It Works
              </h2>
            </div>
            
            <div className="grid gap-8 md:grid-cols-3">
              <div className="text-center">
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-secondary text-xl font-bold text-secondary-foreground">
                  1
                </div>
                <h3 className="mb-2 font-semibold">Report</h3>
                <p className="text-sm text-muted-foreground">
                  Submit details about your lost or found item with location and contact info
                </p>
              </div>
              
              <div className="text-center">
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-foreground text-xl font-bold text-background">
                  2
                </div>
                <h3 className="mb-2 font-semibold">Match</h3>
                <p className="text-sm text-muted-foreground">
                  Our admin team reviews reports and matches lost items with found ones
                </p>
              </div>
              
              <div className="text-center">
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-secondary text-xl font-bold text-secondary-foreground">
                  3
                </div>
                <h3 className="mb-2 font-semibold">Reunite</h3>
                <p className="text-sm text-muted-foreground">
                  Get notified and collect your item from the campus lost and found office
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  )
}
