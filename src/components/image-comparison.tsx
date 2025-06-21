"use client"

import { useState } from "react"
import { Eye, Loader2 } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"
import { useLanguage } from "@/contexts/language-context"
import type { ImageData } from "@/App"

interface ImageComparisonProps {
  originalImage: ImageData | null
  compressedImage: ImageData | null
  isCompressing: boolean
}

export function ImageComparison({
  originalImage,
  compressedImage,
  isCompressing,
}: ImageComparisonProps) {
  const { t } = useLanguage()
  const [sliderValue, setSliderValue] = useState([50])

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes"
    const k = 1024
    const sizes = ["Bytes", "KB", "MB", "GB"]
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return (
      Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
    )
  }

  const getCompressionRatio = () => {
    if (!originalImage || !compressedImage) return 0
    return Math.round(
      ((originalImage.size - compressedImage.size) / originalImage.size) * 100
    )
  }

  return (
    <Card
      className={`backdrop-blur-sm border-0 shadow-lg transition-opacity duration-300 ${
        !originalImage ? "opacity-50" : "opacity-100"
      }`}
    >
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-gray-800 dark:text-gray-200">
          <Eye className="w-5 h-5" />
          {t("comparison.title")}
        </CardTitle>
      </CardHeader>
      <CardContent>
        {!originalImage ? (
          <div className="flex items-center justify-center h-64 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <p className="text-gray-500 dark:text-gray-400 font-medium">
              {t("comparison.uploadFirst")}
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="relative h-64 bg-gray-100 dark:bg-gray-700 rounded-lg overflow-hidden shadow-inner">
              {isCompressing ? (
                <div className="flex items-center justify-center h-full">
                  <div className="text-center">
                    <Loader2 className="w-8 h-8 animate-spin mx-auto mb-2 text-blue-600" />
                    <p className="text-gray-600 dark:text-gray-300 font-medium">
                      {t("comparison.compressingImage")}
                    </p>
                  </div>
                </div>
              ) : (
                <>
                  {/* Original Image */}
                  <div
                    className="absolute inset-0 transition-all duration-300"
                    style={{
                      clipPath: `polygon(0 0, ${sliderValue[0]}% 0, ${sliderValue[0]}% 100%, 0 100%)`,
                    }}
                  >
                    <img
                      src={originalImage.url || "/placeholder.svg"}
                      alt="Original"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-2 left-2 bg-black/75 text-white px-2 py-1 rounded text-xs font-medium">
                      {t("comparison.original")}
                    </div>
                  </div>

                  {/* Compressed Image */}
                  {compressedImage && (
                    <div
                      className="absolute inset-0 transition-all duration-300"
                      style={{
                        clipPath: `polygon(${sliderValue[0]}% 0, 100% 0, 100% 100%, ${sliderValue[0]}% 100%)`,
                      }}
                    >
                      <img
                        src={compressedImage.url || "/placeholder.svg"}
                        alt="Compressed"
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-2 right-2 bg-green-600/90 text-white px-2 py-1 rounded text-xs font-medium">
                        {t("comparison.compressed")}
                      </div>
                    </div>
                  )}

                  {/* Slider Line */}
                  <div
                    className="absolute top-0 bottom-0 w-0.5 bg-white shadow-lg transition-all duration-300"
                    style={{ left: `${sliderValue[0]}%` }}
                  />
                </>
              )}
            </div>

            {compressedImage && (
              <div className="space-y-2">
                <Slider
                  value={sliderValue}
                  onValueChange={setSliderValue}
                  min={0}
                  max={100}
                  step={1}
                  className="w-full"
                />
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="text-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <p className="font-semibold text-gray-800 dark:text-gray-200">
                      {t("comparison.original")}
                    </p>
                    <p className="text-gray-600 dark:text-gray-400">
                      {formatFileSize(originalImage.size)}
                    </p>
                  </div>
                  <div className="text-center p-3 bg-green-50 dark:bg-green-900/30 rounded-lg">
                    <p className="font-semibold text-gray-800 dark:text-gray-200">
                      {t("comparison.compressed")}
                    </p>
                    <p className="text-green-600 dark:text-green-400">
                      {formatFileSize(compressedImage.size)}
                    </p>
                  </div>
                </div>
                <div className="text-center p-3 bg-blue-50 dark:bg-blue-900/30 rounded-lg">
                  <p className="font-semibold text-blue-600 dark:text-blue-400">
                    {getCompressionRatio()}% {t("comparison.sizeReduction")}
                  </p>
                </div>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
