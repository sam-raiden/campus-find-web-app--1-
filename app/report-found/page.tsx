import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { FoundItemForm } from "@/components/found-item-form"

export const metadata = {
  title: "Report Found Item - CampusFind",
  description: "Report an item you've found on campus",
}

export default function ReportFoundPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      
      <main className="flex-1 py-12">
        <div className="mx-auto max-w-6xl px-4">
          <FoundItemForm />
        </div>
      </main>
      
      <Footer />
    </div>
  )
}
