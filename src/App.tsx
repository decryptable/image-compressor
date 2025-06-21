"use client"

import { useState } from "react"
import { FileUpload } from "@/components/file-upload"
import { CompressionOptions } from "@/components/compression-options"
import { ImageComparison } from "@/components/image-comparison"
import { DownloadSection } from "@/components/download-section"
import { HeaderControls } from "@/components/header-controls"
import { Card, CardHeader, CardTitle } from "@/components/ui/card"
import { ThemeProvider } from "@/contexts/theme-context"
import { LanguageProvider } from "@/contexts/language-context"
import { useLanguage } from "@/contexts/language-context"

export interface CompressionSettings {
  quality: number
  width?: number
  height?: number
  maxWidth?: number
  maxHeight?: number
  convertSize?: number
  convertTypes?: string[]
}

export interface ImageData {
  file: File
  url: string
  size: number
  name: string
}

function ImageCompressorContent() {
  const { t } = useLanguage()
  const [originalImage, setOriginalImage] = useState<ImageData | null>(null)
  const [compressedImage, setCompressedImage] = useState<ImageData | null>(null)
  const [isCompressing, setIsCompressing] = useState(false)
  const [compressionSettings, setCompressionSettings] =
    useState<CompressionSettings>({
      quality: 0.8,
      maxWidth: 1920,
      maxHeight: 1080,
      convertSize: 5000000,
      convertTypes: ["image/png"],
    })

  const handleImageUpload = (imageData: ImageData) => {
    setOriginalImage(imageData)
    setCompressedImage(null)
  }

  const handleImageClear = () => {
    setOriginalImage(null)
    setCompressedImage(null)
    setIsCompressing(false)
  }

  const handleCompressionComplete = (imageData: ImageData) => {
    setCompressedImage(imageData)
    setIsCompressing(false)
  }

  const handleCompressionStart = () => {
    setIsCompressing(true)
  }

  return (
    <div className="min-h-screen p-4 transition-colors duration-300">
      <div className="max-w-7xl mx-auto space-y-6">
        <HeaderControls />
        <Card className=" backdrop-blur-sm border-0 shadow-xl">
          <CardHeader className="text-center relative">
            <div className="absolute top-4 right-4"></div>
            <CardTitle className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              {t("app.title")}
            </CardTitle>
            <p className="text-gray-600 dark:text-gray-300 text-lg font-medium">
              {t("app.subtitle")}
            </p>
          </CardHeader>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-6">
            <FileUpload
              onImageUpload={handleImageUpload}
              onImageClear={handleImageClear}
            />

            <CompressionOptions
              settings={compressionSettings}
              onSettingsChange={setCompressionSettings}
              originalImage={originalImage}
              onCompressionStart={handleCompressionStart}
              onCompressionComplete={handleCompressionComplete}
              isCompressing={isCompressing}
            />
          </div>

          <div className="space-y-6">
            <ImageComparison
              originalImage={originalImage}
              compressedImage={compressedImage}
              isCompressing={isCompressing}
            />

            <DownloadSection
              originalImage={originalImage}
              compressedImage={compressedImage}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default function ImageCompressor() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <ImageCompressorContent />
      </LanguageProvider>
    </ThemeProvider>
  )
}
