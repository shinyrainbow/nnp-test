"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Search, Info } from "lucide-react"
import { Language } from "@/lib/i18n"
import { useLanguage } from "@/contexts/language-context"

interface Project {
  id: number
  projectName: string
  projectLocation: string[]
}

interface CommaSeparatedSearchProps {
  projects: Project[]
  value: string
  onChange: (value: string) => void
  placeholder: string
  locale: Language
}

export function CommaSeparatedSearch({ projects, value, onChange, placeholder, locale }: CommaSeparatedSearchProps) {
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [inputValue, setInputValue] = useState(value)
  const [currentTermIndex, setCurrentTermIndex] = useState(-1)
  const inputRef = useRef<HTMLInputElement>(null)
  const suggestionsRef = useRef<HTMLDivElement>(null)
  const {t} = useLanguage()
  // Parse comma-separated terms
  const parseTerms = (text: string) => {
    return text
      .split(",")
      .map((term) => term.trim())
      .filter(Boolean)
  }

  // Get the current term being typed (after the last comma)
  const getCurrentTerm = (text: string, cursorPosition: number) => {
    const beforeCursor = text.substring(0, cursorPosition)
    const lastCommaIndex = beforeCursor.lastIndexOf(",")
    return beforeCursor.substring(lastCommaIndex + 1).trim()
  }

  // Get all available suggestions
  const getAllSuggestions = () => {
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
  }

  // Get filtered suggestions based on current term
  const getSuggestions = (currentTerm: string) => {
    if (!currentTerm.trim()) return []

    const existingTerms = parseTerms(inputValue)
    const allSuggestions = getAllSuggestions()

    return allSuggestions
      .filter(
        (suggestion) =>
          suggestion.toLowerCase().includes(currentTerm.toLowerCase()) &&
          !existingTerms.some((term) => term.toLowerCase() === suggestion.toLowerCase()),
      )
      .slice(0, 8)
  }

  // Handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value
    setInputValue(newValue)
    onChange(newValue)

    // Get current cursor position and term
    const cursorPosition = e.target.selectionStart || 0
    const currentTerm = getCurrentTerm(newValue, cursorPosition)

    // Show suggestions if we have a current term
    const suggestions = getSuggestions(currentTerm)
    setShowSuggestions(suggestions.length > 0 && currentTerm.length > 0)
  }

  // Handle suggestion click
  const handleSuggestionClick = (suggestion: string) => {
    const cursorPosition = inputRef.current?.selectionStart || 0
    const beforeCursor = inputValue.substring(0, cursorPosition)
    const afterCursor = inputValue.substring(cursorPosition)

    // Find the start of the current term
    const lastCommaIndex = beforeCursor.lastIndexOf(",")
    const termStart = lastCommaIndex === -1 ? 0 : lastCommaIndex + 1

    // Replace the current term with the suggestion
    const beforeTerm = inputValue.substring(0, termStart)
    const newValue = beforeTerm + (beforeTerm && !beforeTerm.endsWith(",") ? ", " : "") + suggestion + ", "

    setInputValue(newValue)
    onChange(newValue)
    setShowSuggestions(false)

    // Focus back to input and position cursor after the inserted suggestion
    setTimeout(() => {
      inputRef.current?.focus()
      inputRef.current?.setSelectionRange(newValue.length, newValue.length)
    }, 0)
  }

  // Handle key events
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      setShowSuggestions(false)
    }
  }

  // Handle focus
  const handleFocus = () => {
    const cursorPosition = inputRef.current?.selectionStart || 0
    const currentTerm = getCurrentTerm(inputValue, cursorPosition)
    if (currentTerm.trim()) {
      const suggestions = getSuggestions(currentTerm)
      setShowSuggestions(suggestions.length > 0)
    }
  }

  // Handle blur
  const handleBlur = () => {
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

  // Update input value when prop changes (for clear filters)
  useEffect(() => {
    setInputValue(value)
  }, [value])

  // Get current term for suggestions
  const cursorPosition = inputRef.current?.selectionStart || 0
  const currentTerm = getCurrentTerm(inputValue, cursorPosition)
  const currentSuggestions = getSuggestions(currentTerm)

  // Parse terms for display
  const terms = parseTerms(inputValue)

  return (
    <div className="relative">
      <div className="relative">

          {/* Helper text with OR operator explanation */}
          <div className="flex items-center gap-1 mt-1 text-xs text-muted-foreground">
            <Info className="w-3 h-3" />
            <span>
              {locale === "th"
                ? "แยกคำค้นหาด้วยเครื่องหมายจุลภาค (OR) เช่น: Bangkok Central, Asoke จะค้นหา Bangkok Central หรือ Asoke"
                : "Separate search terms with commas (OR operator), e.g: Bangkok Central, Asoke will find Bangkok Central OR Asoke"}
            </span>
          </div>

          {/* Show parsed terms as badges with OR indicator */}
          {terms.length > 1 && (
            <div className="flex flex-wrap items-center gap-1 mt-2">
              <span className="text-xs text-muted-foreground font-medium">
                {locale === "th" ? "กำลังค้นหา:" : "Searching for:"}
              </span>
              {terms.map((term, index) => (
                <div key={index} className="flex items-center gap-1">
                  <Badge variant="secondary" className="text-xs">
                    {term}
                  </Badge>
                  {index < terms.length - 1 && <span className="text-xs text-blue-600 font-semibold">OR</span>}
                </div>
              ))}
            </div>
          )}
        <div className="flex items-center">


     

          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              ref={inputRef}
              value={inputValue}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              onFocus={handleFocus}
              onBlur={handleBlur}
              placeholder={placeholder}
              className="pl-10"
            />
          </div>
        </div>

     
      </div>

      {/* Suggestions Dropdown */}
      {showSuggestions && currentSuggestions.length > 0 && (
        <div
          ref={suggestionsRef}
          className="absolute top-full left-0 right-0 z-50 mt-1 bg-background border border-input rounded-md shadow-lg max-h-60 overflow-y-auto"
        >
          <div className="px-3 py-2 text-xs text-muted-foreground border-b">
            {locale === "th" ? `แนะนำสำหรับ "${currentTerm}"` : `Suggestions for "${currentTerm}"`}
          </div>
          {currentSuggestions.map((suggestion, index) => (
            <button
              key={`suggestion-${index}`}
              type="button"
              className="w-full px-3 py-2 text-left hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none text-sm"
              onMouseDown={(e) => {
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
