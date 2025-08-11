"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { X, Search } from "lucide-react"
import { Language } from "@/lib/i18n"

interface Project {
  id: number
  projectName: string
  projectLocation: string[]
}

interface SearchInputWithSuggestionsProps {
  projects: Project[]
  value: string
  onChange: (value: string) => void
  onTagsChange: (tags: string[]) => void
  placeholder: string
  locale: Language
  preserveTags?: boolean
}

export function SearchInputWithSuggestions({
  projects,
  value,
  onChange,
  onTagsChange,
  placeholder,
  locale,
  preserveTags = false,
}: SearchInputWithSuggestionsProps) {
  const [tags, setTags] = useState<string[]>([])
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [inputValue, setInputValue] = useState("")
  const inputRef = useRef<HTMLInputElement>(null)
  const suggestionsRef = useRef<HTMLDivElement>(null)

  // Generate suggestions directly when needed
  const getSuggestions = (searchValue: string) => {
    if (!searchValue.trim()) return []

    const allSuggestions: string[] = []
    projects.forEach((project) => {
      allSuggestions.push(project.projectName)
      project.projectLocation.forEach((location) => {
        if (!allSuggestions.includes(location)) {
          allSuggestions.push(location)
        }
      })
    })

    return allSuggestions
      .filter(
        (suggestion) => suggestion.toLowerCase().includes(searchValue.toLowerCase()) && !tags.includes(suggestion),
      )
      .slice(0, 8)
  }

  // Handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value
    setInputValue(newValue)

    // Show/hide suggestions based on input
    const suggestions = getSuggestions(newValue)
    setShowSuggestions(suggestions.length > 0 && newValue.trim() !== "")

    // Update parent with combined tags + input
    const fullValue = [...tags, newValue].filter(Boolean).join(" ")
    onChange(fullValue)
  }

  // Handle suggestion click
  const handleSuggestionClick = (suggestion: string) => {
    const newTags = [...tags, suggestion]
    setTags(newTags)
    setInputValue("")
    setShowSuggestions(false)
    onTagsChange(newTags)

    // Update parent with new tags
    const fullValue = newTags.join(" ")
    onChange(fullValue)

    // Focus back to input
    inputRef.current?.focus()
  }

  // Handle tag removal
  const handleTagRemove = (tagToRemove: string) => {
    const newTags = tags.filter((tag) => tag !== tagToRemove)
    setTags(newTags)
    onTagsChange(newTags)

    // Update parent with remaining tags + input
    const fullValue = [...newTags, inputValue].filter(Boolean).join(" ")
    onChange(fullValue)
  }

  // Handle key press
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && inputValue.trim()) {
      e.preventDefault()
      const newTags = [...tags, inputValue.trim()]
      setTags(newTags)
      setInputValue("")
      setShowSuggestions(false)
      onTagsChange(newTags)

      const fullValue = newTags.join(" ")
      onChange(fullValue)
    } else if (e.key === "Backspace" && !inputValue && tags.length > 0) {
      const newTags = tags.slice(0, -1)
      setTags(newTags)
      onTagsChange(newTags)

      const fullValue = newTags.join(" ")
      onChange(fullValue)
    }
  }

  // Handle focus
  const handleFocus = () => {
    if (inputValue.trim()) {
      const suggestions = getSuggestions(inputValue)
      setShowSuggestions(suggestions.length > 0)
    }
  }

  // Handle click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        suggestionsRef.current &&
        !suggestionsRef.current.contains(event.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(event.target as Node)
      ) {
        setShowSuggestions(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  // Only clear when explicitly told to (clear filters)
  useEffect(() => {
    if (value === "" && !preserveTags) {
      setTags([])
      setInputValue("")
      setShowSuggestions(false)
    }
  }, [value, preserveTags])

  // Get current suggestions for rendering
  const currentSuggestions = getSuggestions(inputValue)

  return (
    <div className="relative">
      <div className="relative">
        <div className="flex flex-wrap items-center gap-1 min-h-[40px] p-2 border border-input rounded-md bg-background focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2">
          <Search className="w-4 h-4 text-muted-foreground mr-1" />

          {/* Tags */}
          {tags.map((tag, index) => (
            <Badge key={`tag-${index}`} variant="secondary" className="flex items-center gap-1 px-2 py-1">
              <span className="text-xs">{tag}</span>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="h-auto p-0 w-4 h-4 hover:bg-transparent"
                onClick={() => handleTagRemove(tag)}
              >
                <X className="w-3 h-3" />
              </Button>
            </Badge>
          ))}

          {/* Input */}
          <Input
            ref={inputRef}
            value={inputValue}
            onChange={handleInputChange}
            onKeyDown={handleKeyPress}
            onFocus={handleFocus}
            placeholder={tags.length === 0 ? placeholder : ""}
            className="flex-1 border-0 p-0 h-auto focus-visible:ring-0 focus-visible:ring-offset-0 bg-transparent"
          />
        </div>
      </div>

      {/* Suggestions Dropdown */}
      {showSuggestions && currentSuggestions.length > 0 && (
        <div
          ref={suggestionsRef}
          className="absolute top-full left-0 right-0 z-50 mt-1 bg-background border border-input rounded-md shadow-lg max-h-60 overflow-y-auto"
        >
          {currentSuggestions.map((suggestion, index) => (
            <button
              key={`suggestion-${index}`}
              type="button"
              className="w-full px-3 py-2 text-left hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none text-sm"
              onClick={() => handleSuggestionClick(suggestion)}
            >
              <div className="flex items-center gap-2">
                {projects.some((p) => p.projectName === suggestion) ? (
                  <>
                    <div className="w-2 h-2 bg-blue-500 rounded-full" />
                    <span className="font-medium">{suggestion}</span>
                    <span className="text-xs text-muted-foreground">({t("projectName")})</span>
                  </>
                ) : (
                  <>
                    <div className="w-2 h-2 bg-green-500 rounded-full" />
                    <span>{suggestion}</span>
                    <span className="text-xs text-muted-foreground">({t("location")})</span>
                  </>
                )}
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
