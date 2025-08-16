"use client"

import type React from "react"

import { useState } from "react"
// import { useTranslations } from "next-intl"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Trash2, Users, Plus, CheckCircle2 } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { useLanguage } from "@/contexts/language-context"

interface FacebookGroup {
  id: string
  name: string
  type: "name" | "id"
  addedAt: Date
  selected?: boolean
}

interface FacebookGroupsManagerProps {
  groups: FacebookGroup[]
  onGroupsChange: (groups: FacebookGroup[]) => void
}

export function FacebookGroupsManager({ groups = [], onGroupsChange }: FacebookGroupsManagerProps) {
  const [inputValue, setInputValue] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()
  const {t} = useLanguage()

  const detectInputType = (input: string): "name" | "id" => {
    // Facebook group IDs are typically numeric and 15+ digits long
    const isNumeric = /^\d+$/.test(input)
    return isNumeric && input.length >= 10 ? "id" : "name"
  }

  const addGroup = async () => {
    if (!inputValue.trim()) {
      toast({
        title: "Error",
        description: "Please enter a group name or ID",
        variant: "destructive",
      })
      return
    }

    const exists = (groups || []).some((group) => group.name.toLowerCase() === inputValue.trim().toLowerCase())

    if (exists) {
      toast({
        title: "Error",
        description: "This group is already in your list",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)

    await new Promise((resolve) => setTimeout(resolve, 500))

    const newGroup: FacebookGroup = {
      id: Date.now().toString(),
      name: inputValue.trim(),
      type: detectInputType(inputValue.trim()),
      addedAt: new Date(),
      selected: false,
    }

    onGroupsChange([newGroup, ...(groups || [])])
    setInputValue("")
    setIsLoading(false)

    toast({
      title: t("groups.groupAdded"),
      description: `${t("groups.groupAdded")}: ${newGroup.name}`,
    })
  }

  const removeGroup = (id: string) => {
    onGroupsChange((groups || []).filter((group) => group.id !== id))
    toast({
      title: t("groups.groupRemoved"),
      description: t("groups.groupRemoved"),
    })
  }

  const toggleGroupSelection = (id: string) => {
    onGroupsChange((groups || []).map((group) => (group.id === id ? { ...group, selected: !group.selected } : group)))
  }

  const selectAllGroups = () => {
    onGroupsChange((groups || []).map((group) => ({ ...group, selected: true })))
    toast({
      title: t("groups.allSelected"),
      description: t("groups.allSelected"),
    })
  }

  const deselectAllGroups = () => {
    onGroupsChange((groups || []).map((group) => ({ ...group, selected: false })))
    toast({
      title: t("groups.allDeselected"),
      description: t("groups.allDeselected"),
    })
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      addGroup()
    }
  }

  const selectedCount = (groups || []).filter((group) => group.selected).length
  const groupsLength = (groups || []).length

  return (
    <div className="space-y-6">
      <Card className="bg-blue-50 border-blue-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-blue-800">
            <CheckCircle2 className="h-5 w-5" />
            {t("groups.title")}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-start gap-3">
            <div className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-semibold">
              1
            </div>
            <div>
              <p className="font-medium text-blue-900">{t("groups.step1")}</p>
              <p className="text-sm text-blue-700">{t("groups.step1Description")}</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-semibold">
              2
            </div>
            <div>
              <p className="font-medium text-blue-900">{t("groups.step2")}</p>
              <p className="text-sm text-blue-700">{t("groups.step2Description")}</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-semibold">
              3
            </div>
            <div>
              <p className="font-medium text-blue-900">{t("groups.step3")}</p>
              <p className="text-sm text-blue-700">{t("groups.step3Description")}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Plus className="h-5 w-5" />
            {t("groups.step1")}: {t("groups.addGroup")}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-2">
            <Input
              placeholder={t("groups.groupNameOrId")}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              className="flex-1"
            />
            <Button onClick={addGroup} disabled={isLoading} className="min-w-[100px]">
              {isLoading ? "..." : t("groups.addGroup")}
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              {t("groups.step2")} ({selectedCount} {t("groups.selected")})
            </CardTitle>
            {groupsLength > 0 && (
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={selectAllGroups}>
                  {t("groups.selectAll")}
                </Button>
                <Button variant="outline" size="sm" onClick={deselectAllGroups}>
                  {t("groups.deselectAll")}
                </Button>
              </div>
            )}
          </div>
        </CardHeader>
        <CardContent>
          {groupsLength === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <Users className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p className="font-medium">{t("groups.noGroups")}</p>
              <p className="text-sm">{t("groups.noGroupsDescription")}</p>
            </div>
          ) : (
            <div className="space-y-3">
              <p className="text-sm text-gray-600 mb-4">{t("groups.step2Description")}</p>
              {(groups || []).map((group) => (
                <div
                  key={group.id}
                  className={`flex items-center gap-3 p-4 border rounded-lg transition-colors ${
                    group.selected ? "bg-blue-50 border-blue-200 hover:bg-blue-100" : "hover:bg-gray-50"
                  }`}
                >
                  <Checkbox
                    checked={group.selected || false}
                    onCheckedChange={() => toggleGroupSelection(group.id)}
                    className="data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600"
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className={`font-medium ${group.selected ? "text-blue-900" : "text-gray-900"}`}>
                        {group.name}
                      </h3>
                      <Badge variant={group.type === "id" ? "secondary" : "default"} className="text-xs">
                        {group.type === "id" ? t("groups.groupId") : t("groups.groupName")}
                      </Badge>
                      {group.selected && (
                        <Badge variant="default" className="text-xs bg-blue-600">
                          {t("groups.selected")}
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-gray-500">
                      {t("groups.addedOn")} {group.addedAt.toLocaleDateString()}
                    </p>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeGroup(group.id)}
                    className="text-red-600 hover:text-red-700 hover:bg-red-50"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
