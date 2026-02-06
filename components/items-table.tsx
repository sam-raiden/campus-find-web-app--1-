"use client"

import { useState, useEffect } from "react"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { CheckCircle, Loader2 } from "lucide-react"
import { resolveLost, resolveFound } from "@/lib/api"

interface RawItem {
  id?: number
  Id?: number
  lostItemId?: number
  LostItemId?: number
  foundItemId?: number
  FoundItemId?: number
  itemName: string
  category: string
  location: string
  contact: string
  date: string
  status: "Pending" | "Resolved"
}

interface Item extends RawItem {
  __id: number
}

interface ItemsTableProps {
  items: RawItem[]
  type: "lost" | "found"
  onRefresh: () => void
}

export function ItemsTable({ items, type }: ItemsTableProps) {
  const [resolvingId, setResolvingId] = useState<number | null>(null)
  const [localItems, setLocalItems] = useState<Item[]>([])

  // 🔥 SAFELY EXTRACT ID (THIS IS THE FIX)
  useEffect(() => {
    const mapped = items.map((item) => {
      const resolvedId =
        item.id ??
        item.Id ??
        item.lostItemId ??
        item.LostItemId ??
        item.foundItemId ??
        item.FoundItemId

      if (resolvedId === undefined) {
        console.error("❌ ITEM HAS NO ID:", item)
      }

      return {
        ...item,
        __id: resolvedId as number,
      }
    })

    setLocalItems(mapped)
  }, [items])

  async function handleResolve(id: number) {
    if (!id) {
      toast.error("Invalid item ID")
      return
    }

    setResolvingId(id)

    try {
      if (type === "lost") {
        await resolveLost(id)
      } else {
        await resolveFound(id)
      }

      setLocalItems((prev) =>
        prev.map((item) =>
          item.__id === id ? { ...item, status: "Resolved" } : item
        )
      )

      toast.success("Item marked as resolved!", {
        description: "The status has been updated successfully.",
      })
    } catch {
      toast.error("Failed to resolve item", {
        description: "Please try again later.",
      })
    } finally {
      setResolvingId(null)
    }
  }

  if (localItems.length === 0) {
    return (
      <div className="flex h-48 items-center justify-center rounded-lg border border-dashed">
        <p className="text-muted-foreground">
          No {type} items reported yet
        </p>
      </div>
    )
  }

  return (
    <div className="rounded-lg border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Item Name</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Location</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {localItems.map((item) => (
            <TableRow key={item.__id}>
              <TableCell className="font-medium">
                {item.itemName}
              </TableCell>
              <TableCell>{item.category}</TableCell>
              <TableCell className="max-w-50 truncate">
                {item.location}
              </TableCell>
              <TableCell>
                {new Date(item.date).toLocaleDateString()}
              </TableCell>
              <TableCell>
                <Badge
                  variant={item.status === "Resolved" ? "secondary" : "outline"}
                  className={
                    item.status === "Resolved"
                      ? "bg-foreground text-background"
                      : "border-secondary bg-secondary/10 text-secondary"
                  }
                >
                  {item.status}
                </Badge>
              </TableCell>
              <TableCell className="text-right">
                <Button
                  size="sm"
                  variant={item.status === "Resolved" ? "ghost" : "default"}
                  disabled={
                    item.status === "Resolved" ||
                    resolvingId === item.__id
                  }
                  onClick={() => handleResolve(item.__id)}
                >
                  {resolvingId === item.__id ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : item.status === "Resolved" ? (
                    <>
                      <CheckCircle className="mr-1 h-4 w-4" />
                      Resolved
                    </>
                  ) : (
                    "Resolve"
                  )}
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
