import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { DashboardStats } from "@/components/dashboard-stats"

export const metadata = {
  title: "Dashboard - CampusFind",
  description: "Campus lost and found statistics and analytics",
}

export default function DashboardPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      
      <main className="flex-1 py-12">
        <div className="mx-auto max-w-6xl px-4">
          <DashboardStats />
        </div>
      </main>
      
      <Footer />
    </div>
  )
}
