"use client"

import React from "react"
import { useState } from "react"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Loader2 } from "lucide-react"
import { createFoundItem } from "@/lib/api"

const categories = [
  "Electronics",
  "Documents",
  "Personal Items",
  "Clothing",
  "Books",
  "Keys",
  "Bags",
  "Other",
]

interface FormData {
  itemName: string
  category: string
  location: string
  contact: string
  date: string
}

const initialFormData: FormData = {
  itemName: "",
  category: "",
  location: "",
  contact: "",
  date: new Date().toISOString().split("T")[0],
}

export function FoundItemForm() {
  const [formData, setFormData] = useState<FormData>(initialFormData)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const isValid =
    formData.itemName.trim() &&
    formData.category &&
    formData.location.trim() &&
    formData.contact.trim() &&
    formData.date

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!isValid) return

    setIsSubmitting(true)

    try {
      await createFoundItem(formData)

      toast.success("Found item reported successfully!", {
        description: "Thank you for helping reunite this item with its owner.",
      })

      setFormData(initialFormData)
    } catch {
      toast.error("Failed to submit report", {
        description: "Please try again later.",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Card className="mx-auto max-w-xl">
      <CardHeader>
        <CardTitle className="text-2xl">Report Found Item</CardTitle>
        <CardDescription>
          Help reunite someone with their lost belongings
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-2">
            <Label htmlFor="itemName">Item Name</Label>
            <Input
              id="itemName"
              placeholder="e.g., Student ID Card, Umbrella"
              value={formData.itemName}
              onChange={(e) =>
                setFormData({ ...formData, itemName: e.target.value })
              }
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="category">Category</Label>
            <Select
              value={formData.category}
              onValueChange={(value) =>
                setFormData({ ...formData, category: value })
              }
            >
              <SelectTrigger id="category" className="w-full">
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((cat) => (
                  <SelectItem key={cat} value={cat}>
                    {cat}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="location">Where Found</Label>
            <Input
              id="location"
              placeholder="e.g., Cafeteria, Parking Lot B"
              value={formData.location}
              onChange={(e) =>
                setFormData({ ...formData, location: e.target.value })
              }
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="contact">Your Contact Information</Label>
            <Input
              id="contact"
              type="phonenumber"
              placeholder="Your Mobile Number"
              value={formData.contact}
              onChange={(e) =>
                setFormData({ ...formData, contact: e.target.value })
              }
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="date">Date Found</Label>
            <Input
              id="date"
              type="date"
              value={formData.date}
              onChange={(e) =>
                setFormData({ ...formData, date: e.target.value })
              }
              required
            />
          </div>

          <Button
            type="submit"
            className="w-full"
            size="lg"
            disabled={!isValid || isSubmitting}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Submitting...
              </>
            ) : (
              "Submit Report"
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
