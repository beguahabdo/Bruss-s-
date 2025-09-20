"use client"

import { Button } from "@/components/ui/button"
import { createClient } from "@/lib/supabase/client"
import { Check, X, AlertTriangle } from "lucide-react"
import { useRouter } from "next/navigation"
import { useState } from "react"

interface TeamStatusActionsProps {
  team: {
    id: string
    status: string
    name: string
  }
}

export default function TeamStatusActions({ team }: TeamStatusActionsProps) {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const supabase = createClient()

  const updateTeamStatus = async (status: "approved" | "rejected" | "pending") => {
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

  return (
    <div className="space-y-3">
      {team.status !== "approved" && (
        <Button
          onClick={() => updateTeamStatus("approved")}
          disabled={isLoading}
          className="w-full bg-green-600 hover:bg-green-700 text-white"
        >
          <Check className="w-4 h-4 mr-2" />
          Approve Team
        </Button>
      )}

      {team.status !== "rejected" && (
        <Button
          onClick={() => updateTeamStatus("rejected")}
          disabled={isLoading}
          variant="outline"
          className="w-full border-red-500/30 text-red-400 hover:bg-red-900/20"
        >
          <X className="w-4 h-4 mr-2" />
          Reject Team
        </Button>
      )}

      {team.status !== "pending" && (
        <Button
          onClick={() => updateTeamStatus("pending")}
          disabled={isLoading}
          variant="outline"
          className="w-full border-yellow-500/30 text-yellow-400 hover:bg-yellow-900/20"
        >
          <AlertTriangle className="w-4 h-4 mr-2" />
          Set Pending
        </Button>
      )}
    </div>
  )
}
