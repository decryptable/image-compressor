"use client"

import { createContext, useContext, useState, type ReactNode } from "react"

type Language = "en" | "id"

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

const translations = {
  en: {
    // Header
    "app.title": "Image Compressor",
    "app.subtitle": "Compress your images while maintaining quality using advanced compression algorithms",

    // File Upload
    "upload.title": "Upload Image",
    "upload.dragDrop": "Drag & drop an image here, or click to select",
    "upload.supports": "Supports: JPEG, PNG, WebP, GIF",
    "upload.dropHere": "Drop the image here...",
    "upload.readyToCompress": "Ready to compress",

    // Compression Options
    "compression.title": "Compression Options",
    "compression.quality": "Quality",
    "compression.qualityNote": "Lower quality = smaller file size",
    "compression.limitDimensions": "Limit maximum dimensions",
    "compression.maxWidth": "Max Width",
    "compression.maxHeight": "Max Height",
    "compression.specificDimensions": "Set specific dimensions",
    "compression.width": "Width",
    "compression.height": "Height",
    "compression.compress": "Compress Image",
    "compression.compressing": "Compressing...",

    // Image Comparison
    "comparison.title": "Image Comparison",
    "comparison.uploadFirst": "Upload an image to see comparison",
    "comparison.compressingImage": "Compressing image...",
    "comparison.original": "Original",
    "comparison.compressed": "Compressed",
    "comparison.sizeReduction": "size reduction",

    // Download Section
    "download.title": "Download Images",
    "download.noImages": "No images available for download",
    "download.originalImage": "Original Image",
    "download.compressedImage": "Compressed Image",
    "download.download": "Download",
    "download.saved": "Saved",

    // Theme & Language
    "theme.light": "Light",
    "theme.dark": "Dark",
    "theme.system": "System",
    "language.english": "English",
    "language.indonesian": "Indonesian",
  },
  id: {
    // Header
    "app.title": "Kompresor Gambar",
    "app.subtitle": "Kompres gambar Anda sambil mempertahankan kualitas menggunakan algoritma kompresi canggih",

    // File Upload
    "upload.title": "Unggah Gambar",
    "upload.dragDrop": "Seret & lepas gambar di sini, atau klik untuk memilih",
    "upload.supports": "Mendukung: JPEG, PNG, WebP, GIF",
    "upload.dropHere": "Lepas gambar di sini...",
    "upload.readyToCompress": "Siap untuk dikompres",

    // Compression Options
    "compression.title": "Opsi Kompresi",
    "compression.quality": "Kualitas",
    "compression.qualityNote": "Kualitas rendah = ukuran file lebih kecil",
    "compression.limitDimensions": "Batasi dimensi maksimum",
    "compression.maxWidth": "Lebar Maks",
    "compression.maxHeight": "Tinggi Maks",
    "compression.specificDimensions": "Atur dimensi spesifik",
    "compression.width": "Lebar",
    "compression.height": "Tinggi",
    "compression.compress": "Kompres Gambar",
    "compression.compressing": "Mengompres...",

    // Image Comparison
    "comparison.title": "Perbandingan Gambar",
    "comparison.uploadFirst": "Unggah gambar untuk melihat perbandingan",
    "comparison.compressingImage": "Mengompres gambar...",
    "comparison.original": "Asli",
    "comparison.compressed": "Terkompres",
    "comparison.sizeReduction": "pengurangan ukuran",

    // Download Section
    "download.title": "Unduh Gambar",
    "download.noImages": "Tidak ada gambar yang tersedia untuk diunduh",
    "download.originalImage": "Gambar Asli",
    "download.compressedImage": "Gambar Terkompres",
    "download.download": "Unduh",
    "download.saved": "Disimpan",

    // Theme & Language
    "theme.light": "Terang",
    "theme.dark": "Gelap",
    "theme.system": "Sistem",
    "language.english": "Inggris",
    "language.indonesian": "Indonesia",
  },
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("en")

  const t = (key: string): string => {
    return translations[language][key as keyof (typeof translations)[typeof language]] || key
  }

  return <LanguageContext.Provider value={{ language, setLanguage, t }}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}
