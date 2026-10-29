"use client";

import { useState } from "react";
import Image from "next/image";
import { getYouTubeEmbedUrl } from "@/lib/format";

type Slide =
  | { type: "image"; url: string }
  | { type: "video"; embedUrl: string };

export default function PhotoGallery({
  photoUrls,
  youtubeUrl,
  alt,
}: {
  photoUrls: string[];
  youtubeUrl: string | null;
  alt: string;
}) {
  const slides: Slide[] = photoUrls.map((url) => ({ type: "image", url }));
  const embedUrl = youtubeUrl ? getYouTubeEmbedUrl(youtubeUrl) : null;
  if (embedUrl) slides.push({ type: "video", embedUrl });

  const [selected, setSelected] = useState(0);

  if (slides.length === 0) {
    return (
      <div className="flex aspect-[4/3] w-full items-center justify-center rounded-2xl bg-stone-100 text-sm text-stone-400">
        No photos available
      </div>
    );
  }

  const current = slides[selected];

  return (
    <div className="space-y-3">
      {/* Main image */}
      <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-stone-100 sm:aspect-[16/10]">
        {current.type === "image" ? (
          <Image
            src={current.url}
            alt={alt}
            fill
            sizes="(max-width: 640px) 100vw, 800px"
            className="object-cover"
            priority
          />
        ) : (
          <iframe
            src={current.embedUrl}
            title={`${alt} video tour`}
            className="h-full w-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        )}

        {/* Counter badge */}
        {slides.length > 1 && (
          <div className="absolute top-3 right-3 rounded-full bg-black/50 px-2.5 py-1 text-xs font-medium text-white backdrop-blur-sm">
            {selected + 1} / {slides.length}
          </div>
        )}

        {/* Prev/Next arrows */}
        {slides.length > 1 && (
          <>
            <button
              type="button"
              aria-label="Previous"
              onClick={() => setSelected((s) => (s - 1 + slides.length) % slides.length)}
              className="absolute left-3 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-stone-700 shadow-md backdrop-blur-sm transition-all active:scale-90"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              type="button"
              aria-label="Next"
              onClick={() => setSelected((s) => (s + 1) % slides.length)}
              className="absolute right-3 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-stone-700 shadow-md backdrop-blur-sm transition-all active:scale-90"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </>
        )}
      </div>

      {/* Thumbnail strip */}
      {slides.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-1">
          {slides.map((slide, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setSelected(i)}
              className={`relative h-16 w-20 flex-shrink-0 overflow-hidden rounded-lg transition-all sm:h-20 sm:w-24 ${
                i === selected
                  ? "ring-2 ring-amber-600 ring-offset-2"
                  : "opacity-60 hover:opacity-100"
              }`}
            >
              {slide.type === "image" ? (
                <Image
                  src={slide.url}
                  alt={`${alt} thumbnail ${i + 1}`}
                  fill
                  sizes="96px"
                  className="object-cover"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center bg-stone-200 text-stone-500">
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 010 1.972l-11.54 6.347a1.125 1.125 0 01-1.667-.986V5.653z" />
                  </svg>
                </div>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
