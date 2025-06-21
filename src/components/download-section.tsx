"use client"

import { Download } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/contexts/language-context"
import type { ImageData } from "@/App"

interface DownloadSectionProps {
  originalImage: ImageData | null
  compressedImage: ImageData | null
}

export function DownloadSection({
  originalImage,
  compressedImage,
}: DownloadSectionProps) {
  const { t } = useLanguage()

  const downloadImage = (imageData: ImageData, filename: string) => {
    const link = document.createElement("a")
    link.href = imageData.url
    link.download = filename
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes"
    const k = 1024
    const sizes = ["Bytes", "KB", "MB", "GB"]
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return (
      Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
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
          <Download className="w-5 h-5" />
          {t("download.title")}
        </CardTitle>
      </CardHeader>
      <CardContent>
        {!originalImage ? (
          <div className="text-center py-8 text-gray-500 dark:text-gray-400 font-medium">
            {t("download.noImages")}
          </div>
        ) : (
          <div className="space-y-4">
            <div className="space-y-3">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg transition-colors duration-300">
                <div>
                  <p className="font-semibold text-gray-800 dark:text-gray-200">
                    {t("download.originalImage")}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {originalImage.name} • {formatFileSize(originalImage.size)}
                  </p>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() =>
                    downloadImage(originalImage, originalImage.name)
                  }
                  className="hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors duration-300"
                >
                  <Download className="w-4 h-4 mr-2" />
                  {t("download.download")}
                </Button>
              </div>

              {compressedImage && (
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 p-4 bg-green-50 dark:bg-green-900/30 rounded-lg transition-colors duration-300">
                  <div>
                    <p className="font-semibold text-gray-800 dark:text-gray-200">
                      {t("download.compressedImage")}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {compressedImage.name} •{" "}
                      {formatFileSize(compressedImage.size)}
                    </p>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      downloadImage(compressedImage, compressedImage.name)
                    }
                    className="bg-green-600 text-white hover:bg-green-700 border-green-600 hover:border-green-700 transition-colors duration-300"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    {t("download.download")}
                  </Button>
                </div>
              )}
            </div>

            {compressedImage && (
              <div className="pt-2 border-t border-zinc-200 dark:border-zinc-600">
                <p className="text-sm text-center text-zinc-600 dark:text-zinc-300">
                  {t("download.saved")}{" "}
                  <span className="font-semibold text-green-600 dark:text-green-400">
                    {formatFileSize(originalImage.size - compressedImage.size)}
                  </span>{" "}
                  (
                  {Math.round(
                    ((originalImage.size - compressedImage.size) /
                      originalImage.size) *
                      100
                  )}
                  %)
                </p>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
