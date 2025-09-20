"use client"

import { Button } from "@/components/ui/button"
import { createClient } from "@/lib/supabase/client"
import { Play, Square, CheckCircle } from "lucide-react"
import { useRouter } from "next/navigation"
import { useState } from "react"

interface MatchActionsProps {
  match: {
    id: string
    status: string
  }
}

export default function MatchActions({ match }: MatchActionsProps) {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const supabase = createClient()

  const updateMatchStatus = async (status: "scheduled" | "live" | "completed" | "cancelled") => {
    setIsLoading(true)
    try {
      const { error } = await supabase
        .from("matches")
        .update({ status, updated_at: new Date().toISOString() })
        .eq("id", match.id)

      if (error) throw error
      router.refresh()
    } catch (error) {
      console.error("Error updating match status:", error)
    } finally {
      setIsLoading(false)
    }
  }

  if (match.status === "completed") {
    return null
  }

  if (match.status === "live") {
    return (
      <div className="flex space-x-1">
        <Button
          size="sm"
          variant="outline"
          onClick={() => updateMatchStatus("completed")}
          disabled={isLoading}
          className="border-green-500/30 text-green-400 hover:bg-green-900/20"
        >
          <CheckCircle className="w-4 h-4" />
        </Button>
        <Button
          size="sm"
          variant="outline"
          onClick={() => updateMatchStatus("cancelled")}
          disabled={isLoading}
          className="border-red-500/30 text-red-400 hover:bg-red-900/20"
        >
          <Square className="w-4 h-4" />
        </Button>
      </div>
    )
  }

  return (
    <Button
      size="sm"
      variant="outline"
      onClick={() => updateMatchStatus("live")}
      disabled={isLoading}
      className="border-green-500/30 text-green-400 hover:bg-green-900/20"
    >
      <Play className="w-4 h-4" />
    </Button>
  )
}
