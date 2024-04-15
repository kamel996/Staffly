"use client"

import { DropdownMenuItem } from "@/components/ui/dropdown-menu"
import { useTransition } from "react"
import {
  deleteEmployee,
  toggleEmployeeAvailability,
} from "@/app/actions/employees"
import { useRouter } from "next/navigation"

export function ActiveToggleDropdownItem({
  id,
                                           isActive,
}: {
  id: string
  isActive: boolean
}) {
  const [isPending, startTransition] = useTransition()
  const router = useRouter()
  return (
    <DropdownMenuItem
      disabled={isPending}
      onClick={() => {
        startTransition(async () => {
          await toggleEmployeeAvailability(id, !isActive)
          router.refresh()
        })
      }}
    >
      {isActive ? "Deactivate" : "Activate"}
    </DropdownMenuItem>
  )
}

export function DeleteDropdownItem({
  id,
}: {
  id: string
}) {
  const [isPending, startTransition] = useTransition()
  const router = useRouter()
  return (
    <DropdownMenuItem
      variant={"destructive"}
      disabled={isPending}
      onClick={() => {
        startTransition(async () => {
          await deleteEmployee(id)
          router.refresh()
        })
      }}
    >
      Delete
    </DropdownMenuItem>
  )
}