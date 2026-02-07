"use client"

import { useEffect, useState } from "react"
import { Package, Search, CheckCircle } from "lucide-react"
import { getDashboard } from "@/lib/api"

interface Stats {
  totalLost: number
  totalFound: number
  resolved: number
  pending: number
}

function AnimatedNumber({ value, duration = 1000 }: { value: number; duration?: number }) {
  const [displayValue, setDisplayValue] = useState(0)

  useEffect(() => {
    let startTime: number | null = null
    const startValue = displayValue

    function animate(currentTime: number) {
      if (!startTime) startTime = currentTime
      const progress = Math.min((currentTime - startTime) / duration, 1)
      const easeOutQuart = 1 - Math.pow(1 - progress, 4)
      setDisplayValue(Math.floor(startValue + (value - startValue) * easeOutQuart))

      if (progress < 1) {
        requestAnimationFrame(animate)
      }
    }

    requestAnimationFrame(animate)
  }, [value, duration, displayValue])

  return <span>{displayValue}</span>
}

const statsConfig = [
  {
    key: "totalLost" as const,
    label: "Items Lost",
    icon: Search,
    color: "text-secondary",
    bgColor: "bg-secondary/10",
  },
  {
    key: "totalFound" as const,
    label: "Items Found",
    icon: Package,
    color: "text-foreground",
    bgColor: "bg-muted",
  },
  {
    key: "resolved" as const,
    label: "Resolved",
    icon: CheckCircle,
    color: "text-foreground",
    bgColor: "bg-muted",
  },
]

export function StatsPreview() {
  const [stats, setStats] = useState<Stats | null>(null)

  useEffect(() => {
    async function fetchStats() {
      try {
        const data = await getDashboard()
        setStats(data)
      } catch (error) {
        console.error("Failed to fetch stats:", error)
      }
    }

    fetchStats()
    const interval = setInterval(fetchStats, 5000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="grid gap-4 sm:grid-cols-3">
      {statsConfig.map((stat) => {
        const Icon = stat.icon
        return (
          <div
            key={stat.key}
            className="group relative overflow-hidden rounded-2xl border bg-card p-6 shadow-sm transition-all hover:shadow-md"
          >
            <div className="flex items-center gap-4">
              <div className={`rounded-xl ${stat.bgColor} p-3`}>
                <Icon className={`h-6 w-6 ${stat.color}`} />
              </div>
              <div>
                <p className="text-3xl font-bold tracking-tight">
                  <AnimatedNumber value={stats?.[stat.key] ?? 0} />
                </p>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}