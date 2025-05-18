"use client"

import type React from "react"
import { useState, useRef } from "react"
import { Upload, X, ImageIcon, Check } from "lucide-react"

interface ImageUploaderProps {
  onImageUploaded: (url: string, filename: string) => void
  className?: string
  maxSizeMB?: number
  acceptedTypes?: string[]
  buttonText?: string
  uploadEndpoint?: string
}

export default function ImageUploader({
  onImageUploaded,
  className = "",
  maxSizeMB = 10,
  acceptedTypes = ["image/jpeg", "image/png", "image/webp"],
  buttonText = "Upload Image",
  uploadEndpoint = "/api/upload",
}: ImageUploaderProps) {
  const [isUploading, setIsUploading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [progress, setProgress] = useState(0)
  const [preview, setPreview] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Validate file type
    if (!acceptedTypes.includes(file.type)) {
      setError(`Invalid file type. Accepted types: ${acceptedTypes.join(", ")}`)
      return
    }

    // Validate file size
    if (file.size > maxSizeMB * 1024 * 1024) {
      setError(`File size exceeds ${maxSizeMB}MB limit`)
      return
    }

    // Reset states
    setError(null)
    setIsUploading(true)
    setProgress(0)

    // Create preview
    const reader = new FileReader()
    reader.onload = (e) => {
      setPreview(e.target?.result as string)
    }
    reader.readAsDataURL(file)

    try {
      // Simulate upload progress
      const progressInterval = setInterval(() => {
        setProgress((prev) => {
          const newProgress = Math.min(prev + 10, 90)
          return newProgress
        })
      }, 200)

      // In a real implementation, you would upload to your server
      // For now, we'll just simulate a successful upload
      setTimeout(() => {
        clearInterval(progressInterval)
        setProgress(100)
        setIsUploading(false)

        // Generate a temporary URL for the uploaded file
        const objectUrl = URL.createObjectURL(file)

        // Call the callback with the URL and filename
        onImageUploaded(objectUrl, file.name)

        // Clear the file input
        if (fileInputRef.current) {
          fileInputRef.current.value = ""
        }
      }, 2000)
    } catch (err) {
      console.error("Upload error:", err)
      setError("Failed to upload image. Please try again.")
      setIsUploading(false)
    }
  }

  const triggerFileInput = () => {
    fileInputRef.current?.click()
  }

  const cancelUpload = () => {
    setIsUploading(false)
    setProgress(0)
    setPreview(null)
    setError(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  return (
    <div className={`flex flex-col items-center ${className}`}>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept={acceptedTypes.join(",")}
        className="hidden"
      />

      {preview ? (
        <div className="relative mb-4 h-40 w-full max-w-xs overflow-hidden rounded-lg">
          <img src={preview || "/placeholder.svg"} alt="Preview" className="h-full w-full object-cover" />
          <button
            onClick={cancelUpload}
            className="absolute right-2 top-2 rounded-full bg-red-500 p-1 text-white hover:bg-red-600"
            aria-label="Cancel upload"
          >
            <X size={16} />
          </button>
        </div>
      ) : (
        <div
          onClick={triggerFileInput}
          className="mb-4 flex h-40 w-full max-w-xs cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100"
        >
          <ImageIcon size={32} className="mb-2 text-gray-400" />
          <p className="text-sm text-gray-500">Click to select an image</p>
          <p className="mt-1 text-xs text-gray-400">Max size: {maxSizeMB}MB</p>
        </div>
      )}

      {isUploading ? (
        <div className="w-full max-w-xs">
          <div className="mb-2 flex justify-between text-xs">
            <span>Uploading...</span>
            <span>{progress}%</span>
          </div>
          <div className="h-2 w-full overflow-hidden rounded-full bg-gray-200">
            <div className="h-full bg-primary-600 transition-all duration-300" style={{ width: `${progress}%` }}></div>
          </div>
        </div>
      ) : (
        <button
          onClick={triggerFileInput}
          disabled={isUploading}
          className="flex items-center rounded-md bg-primary-600 px-4 py-2 text-white hover:bg-primary-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {progress === 100 ? (
            <>
              <Check size={16} className="mr-2" />
              Uploaded
            </>
          ) : (
            <>
              <Upload size={16} className="mr-2" />
              {buttonText}
            </>
          )}
        </button>
      )}

      {error && <p className="mt-2 text-sm text-red-500">{error}</p>}
    </div>
  )
}
