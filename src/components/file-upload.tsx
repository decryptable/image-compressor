"use client"

import { useCallback, useState } from "react"
import { useDropzone } from "react-dropzone"
import { Upload, ImageIcon, X } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/contexts/language-context"
import type { ImageData } from "@/App"

interface FileUploadProps {
  onImageUpload: (imageData: ImageData) => void
  onImageClear: () => void
}

export function FileUpload({ onImageUpload, onImageClear }: FileUploadProps) {
  const { t } = useLanguage()
  const [preview, setPreview] = useState<string | null>(null)

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const file = acceptedFiles[0]
      if (file && file.type.startsWith("image/")) {
        const url = URL.createObjectURL(file)
        setPreview(url)

        const imageData: ImageData = {
          file,
          url,
          size: file.size,
          name: file.name,
        }

        onImageUpload(imageData)
      }
    },
    [onImageUpload]
  )

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".jpeg", ".jpg", ".png", ".webp", ".gif"],
    },
    multiple: false,
  })

  const clearImage = () => {
    setPreview(null)
    if (preview) {
      URL.revokeObjectURL(preview)
    }
    onImageClear()
  }

  return (
    <Card className="backdrop-blur-sm border-0 shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-gray-800 dark:text-gray-200">
          <Upload className="w-5 h-5" />
          {t("upload.title")}
        </CardTitle>
      </CardHeader>
      <CardContent>
        {!preview ? (
          <div
            {...getRootProps()}
            className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-all duration-300 ${
              isDragActive
                ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20 scale-105"
                : "border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500 hover:bg-gray-50 dark:hover:bg-gray-700/50"
            }`}
          >
            <input {...getInputProps()} />
            <ImageIcon className="w-12 h-12 mx-auto mb-4 text-gray-400 dark:text-gray-500" />
            {isDragActive ? (
              <p className="text-blue-600 dark:text-blue-400 font-medium">
                {t("upload.dropHere")}
              </p>
            ) : (
              <div>
                <p className="text-gray-600 dark:text-gray-300 mb-2 font-medium">
                  {t("upload.dragDrop")}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {t("upload.supports")}
                </p>
              </div>
            )}
          </div>
        ) : (
          <div className="space-y-4">
            <div className="relative group">
              <img
                src={preview || "/placeholder.svg"}
                alt="Preview"
                className="w-full h-48 object-cover rounded-lg shadow-md transition-transform duration-300 group-hover:scale-105"
              />
              <Button
                variant="destructive"
                size="sm"
                className="absolute top-2 right-2 opacity-80 hover:opacity-100 transition-opacity"
                onClick={clearImage}
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-300 text-center">
              <p className="font-medium">{t("upload.readyToCompress")}</p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
