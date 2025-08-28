"use client"

import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useLanguage } from "@/contexts/language-context"
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react"
import { Language } from "@/lib/i18n"

interface PaginationProps {
  currentPage: number
  totalPages: number
  pageSize: number
  totalItems: number
  totalSearchResults: number
  onPageChange: (page: number) => void
  onPageSizeChange: (pageSize: number) => void
  locale?: Language
}

export function Pagination({
  currentPage,
  totalPages,
  pageSize,
  totalItems,
  totalSearchResults,
  onPageChange,
  onPageSizeChange,
  locale = "en",
}: PaginationProps) {
  const startItem = (currentPage - 1) * pageSize + 1
  const endItem = Math.min(currentPage * pageSize, totalSearchResults)
const {t, language} = useLanguage()
  const getVisiblePages = () => {
    const delta = 2
    const range = []
    const rangeWithDots = []

    for (let i = Math.max(2, currentPage - delta); i <= Math.min(totalPages - 1, currentPage + delta); i++) {
      range.push(i)
    }

    if (currentPage - delta > 2) {
      rangeWithDots.push(1, "...")
    } else {
      rangeWithDots.push(1)
    }

    rangeWithDots.push(...range)

    if (currentPage + delta < totalPages - 1) {
      rangeWithDots.push("...", totalPages)
    } else if (totalPages > 1) {
      rangeWithDots.push(totalPages)
    }

    return rangeWithDots
  }

  return (
    <div className="flex items-center justify-between px-2">
      <div className="flex items-center space-x-2">
        <p className="text-sm font-medium">{t("rowsPerPage")}</p>
        <Select value={pageSize.toString()} onValueChange={(value) => onPageSizeChange(Number(value))}>
          <SelectTrigger className="h-8 w-[70px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent side="top">
            {[6, 12, 24, 48].map((size) => (
              <SelectItem key={size} value={size.toString()}>
                {size}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="flex items-center space-x-2">
        <div className="flex w-[100px] items-center justify-center text-sm font-medium">
          {totalItems > 0 ? `${startItem}-${endItem} of ${totalSearchResults}` : "0 of 0"}
        </div>

        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            className="hidden h-8 w-8 p-0 lg:flex bg-transparent"
            onClick={() => onPageChange(1)}
            disabled={currentPage === 1}
          >
            <ChevronsLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            className="h-8 w-8 p-0 bg-transparent"
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>

          <div className="flex items-center space-x-1">
            {getVisiblePages().map((page, index) => (
              <Button
                key={index}
                variant={page === currentPage ? "default" : "outline"}
                className="h-8 w-8 p-0"
                onClick={() => typeof page === "number" && onPageChange(page)}
                disabled={page === "..."}
              >
                {page}
              </Button>
            ))}
          </div>

          <Button
            variant="outline"
            className="h-8 w-8 p-0 bg-transparent"
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            className="hidden h-8 w-8 p-0 lg:flex bg-transparent"
            onClick={() => onPageChange(totalPages)}
            disabled={currentPage === totalPages}
          >
            <ChevronsRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}
