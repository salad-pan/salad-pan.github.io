"use client"

import React from "react"
import { useState, useRef, useCallback } from "react"
import { cn } from "@/lib/utils"
import Image from "next/image"

interface DatasetImage {
  input: string
  before: string
  after: string
}

interface Dataset {
  name: string
  images: DatasetImage[]
}

interface ImageSliderSectionProps {
  title: string
  datasets: Dataset[]
  beforeLabel?: string
  afterLabel?: string
}

function ImageComparisonSlider({
  before,
  after,
  beforeLabel = "Baseline",
  afterLabel = "Ours",
}: {
  before: string
  after: string
  beforeLabel?: string
  afterLabel?: string
}) {
  const [sliderPosition, setSliderPosition] = useState(50)
  const [isDragging, setIsDragging] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  const handleMove = useCallback((clientX: number) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width))
    const percent = Math.max(0, Math.min((x / rect.width) * 100, 100))
    setSliderPosition(percent)
  }, [])

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
      className="relative aspect-square cursor-ew-resize select-none overflow-hidden rounded border border-border bg-muted"
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onClick={handleClick}
      onTouchMove={handleTouchMove}
    >
      {/* After image (right side) */}
      <div className="absolute inset-0">
        <Image
          src={after || "/placeholder.svg"}
          alt="After"
          fill
          className="object-cover"
          draggable={false}
        />
      </div>

      {/* Before image (left side) with clip */}
      <div
        className="absolute inset-0 overflow-hidden"
        style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
      >
        <Image
          src={before || "/placeholder.svg"}
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
          <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-background bg-foreground shadow-lg">
            <svg
              width="16"
              height="16"
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
      <div className="pointer-events-none absolute top-3 left-3 rounded bg-foreground/80 px-2 py-1 text-xs font-medium text-background backdrop-blur-sm">
        {beforeLabel}
      </div>
      <div className="pointer-events-none absolute top-3 right-3 rounded bg-foreground/80 px-2 py-1 text-xs font-medium text-background backdrop-blur-sm">
        {afterLabel}
      </div>
    </div>
  )
}

export function ImageSliderSection({
  title,
  datasets,
  beforeLabel = "LRMS",
  afterLabel = "SALAD-Pan",
}: ImageSliderSectionProps) {
  const [currentDatasetIndex, setCurrentDatasetIndex] = useState(0)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  const currentDataset = datasets[currentDatasetIndex]
  const currentImage = currentDataset?.images[currentImageIndex]

  const handleDatasetChange = (index: number) => {
    setCurrentDatasetIndex(index)
    setCurrentImageIndex(0)
  }

  const handlePrevImage = () => {
    setCurrentImageIndex((prev) =>
      prev === 0 ? currentDataset.images.length - 1 : prev - 1
    )
  }

  const handleNextImage = () => {
    setCurrentImageIndex((prev) =>
      prev === currentDataset.images.length - 1 ? 0 : prev + 1
    )
  }

  if (!currentImage) return null

  return (
    <section className="mx-auto max-w-5xl py-12">
      <h2 className="mb-6 font-serif text-2xl font-semibold text-foreground">
        {title}
      </h2>

      {/* Dataset Tabs */}
      <div className="mb-6 flex flex-wrap gap-2">
        {datasets.map((dataset, index) => (
          <button
            key={dataset.name}
            onClick={() => handleDatasetChange(index)}
            className={cn(
              "rounded border px-4 py-2 text-sm font-medium transition-all",
              index === currentDatasetIndex
                ? "border-foreground bg-foreground text-background"
                : "border-border bg-background text-muted-foreground hover:border-foreground hover:text-foreground"
            )}
          >
            {dataset.name}
          </button>
        ))}
      </div>

      {/* Main Content: Left PAN↔SALAD + Right LRMS↔SALAD */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {/* Left: PAN vs SALAD-Pan slider */}
        <div className="flex flex-col">
          <ImageComparisonSlider
            before={currentImage.input}
            after={currentImage.after}
            beforeLabel="PAN"
            afterLabel={afterLabel}
          />
        </div>

        {/* Right: LRMS vs SALAD-Pan slider (existing) */}
        <div className="flex flex-col">
          <ImageComparisonSlider
            before={currentImage.before}
            after={currentImage.after}
            beforeLabel={beforeLabel}
            afterLabel={afterLabel}
          />
        </div>
      </div>

      {/* Image Navigation */}
      <div className="mt-6 flex items-center justify-center gap-4">
        <button
          onClick={handlePrevImage}
          className="flex h-10 w-10 items-center justify-center rounded border border-border bg-background text-foreground transition-colors hover:bg-muted"
          aria-label="Previous image"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>

        <span className="min-w-[80px] text-center text-sm text-muted-foreground">
          {currentImageIndex + 1} / {currentDataset.images.length}
        </span>

        <button
          onClick={handleNextImage}
          className="flex h-10 w-10 items-center justify-center rounded border border-border bg-background text-foreground transition-colors hover:bg-muted"
          aria-label="Next image"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M9 18l6-6-6-6" />
          </svg>
        </button>
      </div>

      {/* Thumbnail Strip */}
      <div className="mt-4 flex justify-center gap-2 overflow-x-auto pb-2">
        {currentDataset.images.map((img, index) => (
          <button
            key={index}
            onClick={() => setCurrentImageIndex(index)}
            className={cn(
              "relative h-14 w-14 flex-shrink-0 overflow-hidden rounded border-2 transition-all",
              index === currentImageIndex
                ? "border-foreground"
                : "border-border opacity-60 hover:opacity-100"
            )}
          >
            <Image
              src={img.input || "/placeholder.svg"}
              alt={`Sample ${index + 1}`}
              fill
              className="object-cover"
            />
          </button>
        ))}
      </div>
    </section>
  )
}
