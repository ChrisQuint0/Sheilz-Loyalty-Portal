"use client"

import { useEffect } from "react"
import type { DashboardSnapshot } from "@/lib/dashboard-data"

const STORAGE_KEY = "sheilz-dashboard-cache"

export function DashboardDataCache({ data }: { data: DashboardSnapshot }) {
  useEffect(() => {
    if (typeof window === "undefined") return

    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(data))
  }, [data])

  return null
}
