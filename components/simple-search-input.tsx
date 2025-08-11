"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { X, Search } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"
import { Language } from "@/lib/i18n"

interface Project {
  id: number
  projectName: string
  projectLocation: string[]
}

interface SimpleSearchInputProps {
  projects: Project[]
  value: string
  onChange: (value: string) => void
  placeholder: string
  locale: Language
}

export function SimpleSearchInput({ projects, value, onChange, placeholder, locale }: SimpleSearchInputProps) {
  const [tags, setTags] = useState<string[]>([])
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [inputValue, setInputValue] = useState("")
  const [justSelected, setJustSelected] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const suggestionsRef = useRef<HTMLDivElement>(null)
const {t} = useLanguage()
  // Generate suggestions directly when needed
  const getSuggestions = (searchValue: string) => {
    if (!searchValue.trim() || justSelected) return []

    const allSuggestions: string[] = []
    projects.forEach((project) => {
      // Add project name
      allSuggestions.push(project.projectName)
      // Add project locations
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

  // Update parent with combined tags and input
  const updateParent = (newTags: string[], newInputValue = "") => {
    const allTerms = [...newTags]
    if (newInputValue.trim()) {
      allTerms.push(newInputValue.trim())
    }
    onChange(allTerms.join(" "))
  }

  // Handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value
    setInputValue(newValue)

    // Reset the justSelected flag when user starts typing
    if (justSelected) {
      setJustSelected(false)
    }

    // Update parent with current state
    updateParent(tags, newValue)

    // Show/hide suggestions based on input
    const suggestions = getSuggestions(newValue)
    setShowSuggestions(suggestions.length > 0 && newValue.trim() !== "" && !justSelected)
  }

  // Handle suggestion click
  const handleSuggestionClick = (suggestion: string) => {
    setJustSelected(true)
    const newTags = [...tags, suggestion]
    setTags(newTags)
    setInputValue("")
    setShowSuggestions(false)

    // Update parent
    updateParent(newTags, "")

    // Clear the justSelected flag after a short delay
    setTimeout(() => {
      setJustSelected(false)
      inputRef.current?.focus()
    }, 100)
  }

  // Handle tag removal
  const handleTagRemove = (tagToRemove: string) => {
    const newTags = tags.filter((tag) => tag !== tagToRemove)
    setTags(newTags)
    updateParent(newTags, inputValue)
  }

  // Handle key press
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && inputValue.trim()) {
      e.preventDefault()
      const newTags = [...tags, inputValue.trim()]
      setTags(newTags)
      setInputValue("")
      setShowSuggestions(false)
      updateParent(newTags, "")
    } else if (e.key === "Backspace" && !inputValue && tags.length > 0) {
      const newTags = tags.slice(0, -1)
      setTags(newTags)
      updateParent(newTags, "")
    }
  }

  // Handle focus
  const handleFocus = () => {
    if (inputValue.trim() && !justSelected) {
      const suggestions = getSuggestions(inputValue)
      setShowSuggestions(suggestions.length > 0)
    }
  }

  // Handle blur
  const handleBlur = () => {
    // Small delay to allow click events on suggestions to fire
    setTimeout(() => {
      setShowSuggestions(false)
    }, 150)
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

  // Clear all when value is empty (from clear filters)
  useEffect(() => {
    if (value === "") {
      setTags([])
      setInputValue("")
      setShowSuggestions(false)
    }
  }, [value])

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
            onBlur={handleBlur}
            placeholder={tags.length === 0 ? placeholder : ""}
            className="flex-1 border-0 p-0 h-auto focus-visible:ring-0 focus-visible:ring-offset-0 bg-transparent"
          />
        </div>
      </div>

      {/* Suggestions Dropdown */}
      {showSuggestions && currentSuggestions.length > 0 && !justSelected && (
        <div
          ref={suggestionsRef}
          className="absolute top-full left-0 right-0 z-50 mt-1 bg-background border border-input rounded-md shadow-lg max-h-60 overflow-y-auto"
        >
          {currentSuggestions.map((suggestion, index) => (
            <button
              key={`suggestion-${index}`}
              type="button"
              className="w-full px-3 py-2 text-left hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none text-sm"
              onMouseDown={(e) => {
                // Prevent the input blur event from firing before click
                e.preventDefault()
              }}
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
