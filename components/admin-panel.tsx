"use client"

import { useEffect, useState, useCallback } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ItemsTable } from "@/components/items-table"
import { Skeleton } from "@/components/ui/skeleton"
import { Search, Package } from "lucide-react"
import { getLostItems, getFoundItems } from "@/lib/api"

interface Item {
  id: number
  itemName: string
  category: string
  location: string
  contact: string
  date: string
  status: "Pending" | "Resolved"
}

export function AdminPanel() {
  const [lostItems, setLostItems] = useState<Item[]>([])
  const [foundItems, setFoundItems] = useState<Item[]>([])
  const [loadingLost, setLoadingLost] = useState(true)
  const [loadingFound, setLoadingFound] = useState(true)

  const fetchLostItems = useCallback(async () => {
    try {
      const data = await getLostItems()
      setLostItems(data)
    } catch (error) {
      console.error("Failed to fetch lost items:", error)
    } finally {
      setLoadingLost(false)
    }
  }, [])

  const fetchFoundItems = useCallback(async () => {
    try {
      const data = await getFoundItems()
      setFoundItems(data)
    } catch (error) {
      console.error("Failed to fetch found items:", error)
    } finally {
      setLoadingFound(false)
    }
  }, [])

  useEffect(() => {
    fetchLostItems()
    fetchFoundItems()

    const interval = setInterval(() => {
      fetchLostItems()
      fetchFoundItems()
    }, 5000)

    return () => clearInterval(interval)
  }, [fetchLostItems, fetchFoundItems])

  const lostPending = lostItems.filter((i) => i.status === "Pending").length
  const foundPending = foundItems.filter((i) => i.status === "Pending").length

  const handleRefresh = () => {
    fetchLostItems()
    fetchFoundItems()
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Admin Panel</h1>
        <p className="mt-1 text-muted-foreground">
          Manage and resolve lost and found item reports
        </p>
      </div>

      <Tabs defaultValue="lost" className="space-y-4">
        <TabsList className="grid w-full max-w-md grid-cols-2">
          <TabsTrigger value="lost" className="gap-2">
            <Search className="h-4 w-4" />
            Lost Items
            {lostPending > 0 && (
              <span className="ml-1 flex h-5 w-5 items-center justify-center rounded-full bg-secondary text-xs text-secondary-foreground">
                {lostPending}
              </span>
            )}
          </TabsTrigger>
          <TabsTrigger value="found" className="gap-2">
            <Package className="h-4 w-4" />
            Found Items
            {foundPending > 0 && (
              <span className="ml-1 flex h-5 w-5 items-center justify-center rounded-full bg-foreground text-xs text-background">
                {foundPending}
              </span>
            )}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="lost" className="space-y-4">
          {loadingLost ? (
            <TableSkeleton />
          ) : (
            <ItemsTable items={lostItems} type="lost" onRefresh={handleRefresh} />
          )}
        </TabsContent>

        <TabsContent value="found" className="space-y-4">
          {loadingFound ? (
            <TableSkeleton />
          ) : (
            <ItemsTable items={foundItems} type="found" onRefresh={handleRefresh} />
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}

function TableSkeleton() {
  return (
    <div className="space-y-3">
      <Skeleton className="h-10 w-full" />
      <Skeleton className="h-16 w-full" />
      <Skeleton className="h-16 w-full" />
      <Skeleton className="h-16 w-full" />
    </div>
  )
}
