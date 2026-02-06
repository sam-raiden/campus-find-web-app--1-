import { MapPin } from "lucide-react"

export function Footer() {
  return (
    <footer className="border-t bg-muted/30">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-4 py-8 md:flex-row">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-secondary">
            <MapPin className="h-4 w-4 text-secondary-foreground" />
          </div>
          <span className="font-semibold">CampusFind</span>
        </div>
        
        <p className="text-sm text-muted-foreground">
          Helping reunite students with their belongings since 2026
        </p>
        
        <p className="text-sm text-muted-foreground">
          University Campus Services
        </p>
      </div>
    </footer>
  )
}
