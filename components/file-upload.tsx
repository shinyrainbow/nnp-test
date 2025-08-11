"use client"

import type React from "react"
import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Upload, X, FileImage } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"
// import { useTranslations } from "next-intl"

interface FileUploadProps {
  onFileUpload: (file: File | null) => void
}

export function FileUpload({ onFileUpload }: FileUploadProps) {
  const {t, language: locale} = useLanguage()
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)
  const [dragActive, setDragActive] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    const files = e.dataTransfer.files
    if (files && files[0]) {
      handleFileUpload(files[0])
    }
  }

  const handleFileUpload = (file: File) => {
    if (file.type.startsWith("image/")) {
      setUploadedFile(file)
      onFileUpload(file)
    }
  }

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files && files[0]) {
      handleFileUpload(files[0])
    }
  }

  const removeFile = () => {
    setUploadedFile(null)
    onFileUpload(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  return (
    <div className="w-full">
      <input ref={fileInputRef} type="file" accept="image/*" onChange={handleFileInput} className="hidden" />

      {uploadedFile ? (
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <FileImage className="w-8 h-8 text-blue-500" />
              <div>
                <p className="font-medium text-sm">{uploadedFile.name}</p>
                <p className="text-xs text-gray-500">{(uploadedFile.size / 1024 / 1024).toFixed(2)} MB</p>
              </div>
            </div>
            <Button variant="ghost" size="sm" onClick={removeFile} className="text-red-500 hover:text-red-700">
              <X className="w-4 h-4" />
            </Button>
          </div>
        </Card>
      ) : (
        <Card
          className={`border-2 border-dashed p-6 text-center cursor-pointer transition-colors ${
            dragActive ? "border-blue-500 bg-blue-50" : "border-gray-300 hover:border-gray-400"
          }`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
        >
          <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
          <p className="text-sm font-medium text-gray-700 mb-1">{t("clickToUpload")}</p>
          <p className="text-xs text-gray-500">{t("fileTypes")}</p>
        </Card>
      )}
    </div>
  )
}
