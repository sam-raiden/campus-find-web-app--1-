import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Search, Package } from "lucide-react"

export function HeroSection() {
  return (
    <section className="relative overflow-hidden py-20 md:py-32">
      <div className="absolute inset-0 -z-10 bg-background" />
      
      <div className="mx-auto max-w-4xl px-4 text-center">
        <h1 className="text-balance text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
          Lost something on campus?
        </h1>
        
        <p className="mx-auto mt-6 max-w-2xl text-pretty text-lg text-muted-foreground md:text-xl">
          Report lost or found items and help reunite them with their owners. 
          Our campus-wide system makes it easy to recover what you&apos;ve lost.
        </p>

        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Button asChild size="lg" className="h-12 px-8 text-base bg-secondary text-secondary-foreground hover:bg-secondary/90">
            <Link href="/report-lost">
              <Search className="mr-2 h-5 w-5" />
              Report Lost Item
            </Link>
          </Button>
          
          <Button asChild size="lg" variant="outline" className="h-12 px-8 text-base bg-transparent border-foreground text-foreground hover:bg-foreground hover:text-background">
            <Link href="/report-found">
              <Package className="mr-2 h-5 w-5" />
              Report Found Item
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
