"use client"

import { useState } from "react"
import Compressor from "compressorjs"
import { Settings, Zap } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { useLanguage } from "@/contexts/language-context"
import type { CompressionSettings, ImageData } from "@/App"

interface CompressionOptionsProps {
  settings: CompressionSettings
  onSettingsChange: (settings: CompressionSettings) => void
  originalImage: ImageData | null
  onCompressionStart: () => void
  onCompressionComplete: (imageData: ImageData) => void
  isCompressing: boolean
}

export function CompressionOptions({
  settings,
  onSettingsChange,
  originalImage,
  onCompressionStart,
  onCompressionComplete,
  isCompressing,
}: CompressionOptionsProps) {
  const { t } = useLanguage()
  const [useMaxDimensions, setUseMaxDimensions] = useState(true)
  const [useSpecificDimensions, setUseSpecificDimensions] = useState(false)

  const isDisabled = !originalImage || isCompressing

  const handleCompress = () => {
    if (!originalImage || isCompressing) return

    onCompressionStart()

    const options: Compressor.Options = {
      quality: settings.quality,
      convertSize: settings.convertSize,
      convertTypes: settings.convertTypes,
      success: (result: File) => {
        const url = URL.createObjectURL(result)
        const imageData: ImageData = {
          file: result,
          url,
          size: result.size,
          name: `compressed_${originalImage.name}`,
        }
        onCompressionComplete(imageData)
      },
      error: (err: Error) => {
        console.error("Compression failed:", err)
        onCompressionComplete({
          file: originalImage.file,
          url: originalImage.url,
          size: originalImage.size,
          name: originalImage.name,
        })
      },
    }

    if (useMaxDimensions) {
      options.maxWidth = settings.maxWidth
      options.maxHeight = settings.maxHeight
    }

    if (useSpecificDimensions && settings.width && settings.height) {
      options.width = settings.width
      options.height = settings.height
    }

    new Compressor(originalImage.file, options)
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const updateSettings = (key: keyof CompressionSettings, value: any) => {
    onSettingsChange({ ...settings, [key]: value })
  }

  return (
    <Card className="backdrop-blur-sm border-0 shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-gray-800 dark:text-gray-200">
          <Settings className="w-5 h-5" />
          {t("compression.title")}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label className="text-gray-700 dark:text-gray-300">
            {t("compression.quality")}: {Math.round(settings.quality * 100)}%
          </Label>
          <Slider
            value={[settings.quality]}
            onValueChange={([value]) => updateSettings("quality", value)}
            min={0.1}
            max={1}
            step={0.1}
            className="w-full"
            disabled={isDisabled}
          />
          <p className="text-xs text-gray-500 dark:text-gray-400">
            {t("compression.qualityNote")}
          </p>
        </div>

        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <Switch
              id="max-dimensions"
              checked={useMaxDimensions}
              onCheckedChange={setUseMaxDimensions}
              disabled={isDisabled}
            />
            <Label
              htmlFor="max-dimensions"
              className="text-gray-700 dark:text-gray-300"
            >
              {t("compression.limitDimensions")}
            </Label>
          </div>

          {useMaxDimensions && (
            <div className="grid grid-cols-2 gap-4 ml-6">
              <div>
                <Label
                  htmlFor="max-width"
                  className="text-gray-700 dark:text-gray-300"
                >
                  {t("compression.maxWidth")}
                </Label>
                <Input
                  id="max-width"
                  type="number"
                  value={settings.maxWidth || ""}
                  onChange={(e) =>
                    updateSettings(
                      "maxWidth",
                      Number.parseInt(e.target.value) || undefined
                    )
                  }
                  placeholder="1920"
                  disabled={isDisabled}
                  className="dark:bg-gray-700 dark:border-gray-600"
                />
              </div>
              <div>
                <Label
                  htmlFor="max-height"
                  className="text-gray-700 dark:text-gray-300"
                >
                  {t("compression.maxHeight")}
                </Label>
                <Input
                  id="max-height"
                  type="number"
                  value={settings.maxHeight || ""}
                  onChange={(e) =>
                    updateSettings(
                      "maxHeight",
                      Number.parseInt(e.target.value) || undefined
                    )
                  }
                  placeholder="1080"
                  disabled={isDisabled}
                  className="dark:bg-gray-700 dark:border-gray-600"
                />
              </div>
            </div>
          )}
        </div>

        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <Switch
              id="specific-dimensions"
              checked={useSpecificDimensions}
              onCheckedChange={setUseSpecificDimensions}
              disabled={isDisabled}
            />
            <Label
              htmlFor="specific-dimensions"
              className="text-gray-700 dark:text-gray-300"
            >
              {t("compression.specificDimensions")}
            </Label>
          </div>

          {useSpecificDimensions && (
            <div className="grid grid-cols-2 gap-4 ml-6">
              <div>
                <Label
                  htmlFor="width"
                  className="text-gray-700 dark:text-gray-300"
                >
                  {t("compression.width")}
                </Label>
                <Input
                  id="width"
                  type="number"
                  value={settings.width || ""}
                  onChange={(e) =>
                    updateSettings(
                      "width",
                      Number.parseInt(e.target.value) || undefined
                    )
                  }
                  placeholder="800"
                  disabled={isDisabled}
                  className="dark:bg-gray-700 dark:border-gray-600"
                />
              </div>
              <div>
                <Label
                  htmlFor="height"
                  className="text-gray-700 dark:text-gray-300"
                >
                  {t("compression.height")}
                </Label>
                <Input
                  id="height"
                  type="number"
                  value={settings.height || ""}
                  onChange={(e) =>
                    updateSettings(
                      "height",
                      Number.parseInt(e.target.value) || undefined
                    )
                  }
                  placeholder="600"
                  disabled={isDisabled}
                  className="dark:bg-gray-700 dark:border-gray-600"
                />
              </div>
            </div>
          )}
        </div>

        <Button
          onClick={handleCompress}
          disabled={isDisabled}
          className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:from-gray-400 disabled:to-gray-500 transition-all duration-300"
          size="lg"
        >
          <Zap className="w-4 h-4 mr-2" />
          {isCompressing
            ? t("compression.compressing")
            : t("compression.compress")}
        </Button>
      </CardContent>
    </Card>
  )
}
