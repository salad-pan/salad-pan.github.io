"use client"

import React from "react"

import { useState, useRef, useCallback } from "react"
import { cn } from "@/lib/utils"
import Image from "next/image"

interface ComparisonImage {
  before: string
  after: string
  beforeLabel?: string
  afterLabel?: string
  caption?: string
}

interface ImageSliderSectionProps {
  title: string
  images: ComparisonImage[]
}

function ImageComparisonSlider({ image }: { image: ComparisonImage }) {
  const [sliderPosition, setSliderPosition] = useState(50)
  const [isDragging, setIsDragging] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  const handleMove = useCallback(
    (clientX: number) => {
      if (!containerRef.current) return
      const rect = containerRef.current.getBoundingClientRect()
      const x = Math.max(0, Math.min(clientX - rect.left, rect.width))
      const percent = Math.max(0, Math.min((x / rect.width) * 100, 100))
      setSliderPosition(percent)
    },
    []
  )

  const handleMouseDown = () => setIsDragging(true)
  const handleMouseUp = () => setIsDragging(false)
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return
    handleMove(e.clientX)
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    handleMove(e.touches[0].clientX)
  }

  const handleClick = (e: React.MouseEvent) => {
    handleMove(e.clientX)
  }

  return (
    <div
      ref={containerRef}
      className="relative aspect-video cursor-ew-resize select-none overflow-hidden rounded-lg border border-border bg-muted"
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onClick={handleClick}
      onTouchMove={handleTouchMove}
    >
      {/* After image (right side - clear) */}
      <div className="absolute inset-0">
        <Image
          src={image.after || "/placeholder.svg"}
          alt="After"
          fill
          className="object-cover"
          draggable={false}
        />
      </div>

      {/* Before image (left side - blurry) with clip */}
      <div
        className="absolute inset-0 overflow-hidden"
        style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
      >
        <Image
          src={image.before || "/placeholder.svg"}
          alt="Before"
          fill
          className="object-cover"
          draggable={false}
        />
      </div>

      {/* Slider line */}
      <div
        className="absolute top-0 bottom-0 z-10 w-0.5 bg-background shadow-lg"
        style={{ left: `${sliderPosition}%` }}
      >
        {/* Slider handle */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 cursor-ew-resize"
          onMouseDown={handleMouseDown}
          onTouchStart={() => setIsDragging(true)}
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-background bg-foreground shadow-lg">
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              className="text-background"
            >
              <path
                d="M6 10L3 7M3 7L6 4M3 7H8M14 10L17 7M17 7L14 4M17 7H12"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                transform="rotate(90 10 10)"
              />
            </svg>
          </div>
        </div>
      </div>

      {/* Labels */}
      <div className="pointer-events-none absolute top-4 left-4 rounded bg-foreground/80 px-2 py-1 text-xs font-medium text-background backdrop-blur-sm">
        {image.beforeLabel || "Before"}
      </div>
      <div className="pointer-events-none absolute top-4 right-4 rounded bg-foreground/80 px-2 py-1 text-xs font-medium text-background backdrop-blur-sm">
        {image.afterLabel || "After"}
      </div>
    </div>
  )
}

export function ImageSliderSection({ title, images }: ImageSliderSectionProps) {
  const [currentIndex, setCurrentIndex] = useState(0)

  return (
    <section className="mx-auto max-w-4xl py-12">
      <h2 className="mb-6 font-serif text-2xl font-semibold text-foreground">
        {title}
      </h2>

      <ImageComparisonSlider image={images[currentIndex]} />

      {/* Caption */}
      {images[currentIndex].caption && (
        <p className="mt-3 text-center text-sm text-muted-foreground">
          {images[currentIndex].caption}
        </p>
      )}

      {/* Thumbnails for multiple comparisons */}
      {images.length > 1 && (
        <div className="mt-4 flex justify-center gap-3">
          {images.map((img, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={cn(
                "relative h-16 w-24 overflow-hidden rounded border-2 transition-all",
                index === currentIndex
                  ? "border-foreground"
                  : "border-border opacity-60 hover:opacity-100"
              )}
            >
              <Image
                src={img.after || "/placeholder.svg"}
                alt={`Comparison ${index + 1}`}
                fill
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </section>
  )
}
