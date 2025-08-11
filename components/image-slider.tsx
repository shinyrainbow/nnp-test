"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface ImageSliderProps {
  images: string[]
  alt: string
  className?: string
}

export function ImageSlider({ images, alt, className = "" }: ImageSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0)

  if (!images || images.length === 0) {
    return (
      <div className={`bg-gray-200 flex items-center justify-center ${className}`}>
        <span className="text-gray-500">No images available</span>
      </div>
    )
  }

  const goToPrevious = (e: React.MouseEvent) => {
    e.stopPropagation()
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1))
  }

  const goToNext = (e: React.MouseEvent) => {
    e.stopPropagation()
    setCurrentIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1))
  }

  const goToSlide = (index: number, e: React.MouseEvent) => {
    e.stopPropagation()
    setCurrentIndex(index)
  }

  return (
    <div className={`relative group ${className}`}>
      {/* Main Image */}
      <img
        src={images[currentIndex] || "/placeholder.svg"}
        alt={`${alt} - Image ${currentIndex + 1}`}
        className="w-full h-full object-cover rounded-lg"
        onError={(e) => {
          const target = e.target as HTMLImageElement
          target.src = "/placeholder.svg?height=300&width=400"
        }}
      />

      {/* Navigation Arrows - Only show if more than 1 image */}
      {images.length > 1 && (
        <>
          <Button
            variant="ghost"
            size="sm"
            className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white opacity-0 group-hover:opacity-100 transition-opacity p-1 h-8 w-8"
            onClick={goToPrevious}
          >
            <ChevronLeft className="w-4 h-4" />
          </Button>

          <Button
            variant="ghost"
            size="sm"
            className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white opacity-0 group-hover:opacity-100 transition-opacity p-1 h-8 w-8"
            onClick={goToNext}
          >
            <ChevronRight className="w-4 h-4" />
          </Button>
        </>
      )}

      {/* Image Counter */}
      {images.length > 1 && (
        <div className="absolute top-2 right-2 bg-black/50 text-white text-xs px-2 py-1 rounded">
          {currentIndex + 1} / {images.length}
        </div>
      )}

      {/* Dot Indicators - Only show if more than 1 image */}
      {images.length > 1 && (
        <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
          {images.map((_, index) => (
            <button
              key={index}
              className={`w-2 h-2 rounded-full transition-colors ${
                index === currentIndex ? "bg-white" : "bg-white/50"
              }`}
              onClick={(e) => goToSlide(index, e)}
            />
          ))}
        </div>
      )}
    </div>
  )
}
