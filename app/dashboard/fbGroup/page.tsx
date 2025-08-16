"use client"

import { useState } from "react"
import { FacebookGroupsManager } from "@/components/facebook-groups-manager"
import { PostComposer } from "@/components/post-composer"
import { ScheduledPostsList } from "@/components/scheduled-posts-list"

interface FacebookGroup {
  id: string
  name: string
  type: "name" | "id"
  addedAt: Date
  selected?: boolean
}

export default function FgGroup() {
  const [groups, setGroups] = useState<FacebookGroup[]>([])

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Facebook Groups Manager</h1>
          <p className="text-gray-600">Manage your Facebook groups and schedule posts</p>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          {/* Updated layout to accommodate three columns */}
          <div className="xl:col-span-1">
            <FacebookGroupsManager groups={groups} onGroupsChange={setGroups} />
          </div>
          <div className="xl:col-span-1">
            <PostComposer groups={groups} />
          </div>
          <div className="xl:col-span-1">
            <ScheduledPostsList />
          </div>
        </div>
      </div>
    </main>
  )
}
