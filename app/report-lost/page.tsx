import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { LostItemForm } from "@/components/lost-item-form"

export const metadata = {
  title: "Report Lost Item - CampusFind",
  description: "Report an item you've lost on campus",
}

export default function ReportLostPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      
      <main className="flex-1 py-12">
        <div className="mx-auto max-w-6xl px-4">
          <LostItemForm />
        </div>
      </main>
      
      <Footer />
    </div>
  )
}
