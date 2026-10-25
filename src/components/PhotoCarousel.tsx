"use client";

import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";
import { getYouTubeEmbedUrl } from "@/lib/format";

type Slide =
  | { type: "image"; url: string }
  | { type: "video"; embedUrl: string };

export default function PhotoCarousel({
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

  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: slides.length > 1 });
  const [selectedIndex, setSelectedIndex] = useState(0);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    // eslint-disable-next-line react-hooks/set-state-in-effect -- standard embla-carousel setup; syncs index with the (external) carousel instance once it mounts
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
  }, [emblaApi, onSelect]);

  if (slides.length === 0) {
    return (
      <div className="flex aspect-[4/3] w-full items-center justify-center bg-stone-100 text-sm text-stone-400">
        No photo available
      </div>
    );
  }

  return (
    <div className="group relative aspect-[4/3] w-full overflow-hidden bg-stone-100">
      <div ref={emblaRef} className="h-full w-full overflow-hidden">
        <div className="flex h-full">
          {slides.map((slide, i) => (
            <div key={i} className="relative h-full w-full flex-none">
              {slide.type === "image" ? (
                <Image
                  src={slide.url}
                  alt={alt}
                  fill
                  sizes="(max-width: 640px) 100vw, 400px"
                  className="object-cover"
                />
              ) : (
                <iframe
                  src={slide.embedUrl}
                  title={`${alt} video tour`}
                  className="h-full w-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              )}
            </div>
          ))}
        </div>
      </div>

      {slides.length > 1 && (
        <>
          <button
            type="button"
            aria-label="Previous photo"
            onPointerDown={(e) => e.stopPropagation()}
            onClick={(e) => { e.stopPropagation(); emblaApi?.scrollPrev(); }}
            className="absolute left-2.5 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-stone-700 shadow-md backdrop-blur-sm transition-all active:scale-90 sm:opacity-0 sm:group-hover:opacity-100 sm:focus:opacity-100"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            type="button"
            aria-label="Next photo"
            onPointerDown={(e) => e.stopPropagation()}
            onClick={(e) => { e.stopPropagation(); emblaApi?.scrollNext(); }}
            className="absolute right-2.5 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-stone-700 shadow-md backdrop-blur-sm transition-all active:scale-90 sm:opacity-0 sm:group-hover:opacity-100 sm:focus:opacity-100"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>
          <div className="absolute bottom-2.5 left-1/2 flex -translate-x-1/2 gap-1.5">
            {slides.map((_, i) => (
              <button
                key={i}
                type="button"
                aria-label={`Go to slide ${i + 1}`}
                onPointerDown={(e) => e.stopPropagation()}
                onClick={(e) => { e.stopPropagation(); emblaApi?.scrollTo(i); }}
                className={`h-2.5 w-2.5 rounded-full transition-colors ${
                  i === selectedIndex ? "bg-white" : "bg-white/50"
                }`}
              />
            ))}
          </div>
          <div className="absolute top-2.5 right-3 rounded-full bg-black/50 px-2 py-0.5 text-xs font-medium text-white backdrop-blur-sm">
            {selectedIndex + 1}/{slides.length}
          </div>
        </>
      )}
    </div>
  );
}
