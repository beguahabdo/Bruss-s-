"use client"

import { Button } from "@/components/ui/button"
import { createClient } from "@/lib/supabase/client"
import { Check, X } from "lucide-react"
import { useRouter } from "next/navigation"
import { useState } from "react"

interface TeamActionsProps {
  team: {
    id: string
    status: string
  }
}

export default function TeamActions({ team }: TeamActionsProps) {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const supabase = createClient()

  const updateTeamStatus = async (status: "approved" | "rejected") => {
    setIsLoading(true)
    try {
      const { error } = await supabase
        .from("teams")
        .update({ status, updated_at: new Date().toISOString() })
        .eq("id", team.id)

      if (error) throw error
      router.refresh()
    } catch (error) {
      console.error("Error updating team status:", error)
    } finally {
      setIsLoading(false)
    }
  }

  if (team.status === "approved") {
    return (
      <Button
        size="sm"
        variant="outline"
        onClick={() => updateTeamStatus("rejected")}
        disabled={isLoading}
        className="border-red-500/30 text-red-400 hover:bg-red-900/20"
      >
        <X className="w-4 h-4" />
      </Button>
    )
  }

  if (team.status === "rejected") {
    return (
      <Button
        size="sm"
        variant="outline"
        onClick={() => updateTeamStatus("approved")}
        disabled={isLoading}
        className="border-green-500/30 text-green-400 hover:bg-green-900/20"
      >
        <Check className="w-4 h-4" />
      </Button>
    )
  }

  return (
    <div className="flex space-x-1">
      <Button
        size="sm"
        variant="outline"
        onClick={() => updateTeamStatus("approved")}
        disabled={isLoading}
        className="border-green-500/30 text-green-400 hover:bg-green-900/20"
      >
        <Check className="w-4 h-4" />
      </Button>
      <Button
        size="sm"
        variant="outline"
        onClick={() => updateTeamStatus("rejected")}
        disabled={isLoading}
        className="border-red-500/30 text-red-400 hover:bg-red-900/20"
      >
        <X className="w-4 h-4" />
      </Button>
    </div>
  )
}
