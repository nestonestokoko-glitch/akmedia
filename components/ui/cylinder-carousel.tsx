"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { cn } from "@/lib/cn";

export interface CarouselImage {
  src: string;
  alt: string;
  title?: string;
  brand?: string;
}

interface CylinderCarouselProps {
  images: CarouselImage[];
  cardWidth?: number;
  cardHeight?: number;
  autoRotate?: boolean;
  autoRotateSpeed?: number;
  className?: string;
}

export function CylinderCarousel({
  images,
  cardWidth: customWidth,
  cardHeight: customHeight,
  autoRotate = true,
  autoRotateSpeed = 0.18, // Slow, elegant speed
  className,
}: CylinderCarouselProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [dimensions, setDimensions] = useState({
    width: customWidth || 310,
    height: customHeight || 175,
    perspective: 1100,
  });

  // Responsive dimensions: scale smoothly down on mobile devices
  useEffect(() => {
    const updateDimensions = () => {
      const screenWidth = window.innerWidth;
      if (screenWidth < 480) {
        // Compact mobile
        setDimensions({
          width: customWidth ? Math.min(customWidth, 200) : 205,
          height: customHeight ? Math.min(customHeight, 115) : 118,
          perspective: 800,
        });
      } else if (screenWidth < 768) {
        // Tablet / large mobile
        setDimensions({
          width: customWidth ? Math.min(customWidth, 250) : 250,
          height: customHeight ? Math.min(customHeight, 140) : 142,
          perspective: 950,
        });
      } else {
        // Desktop
        setDimensions({
          width: customWidth || 310,
          height: customHeight || 175,
          perspective: 1100,
        });
      }
    };

    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, [customWidth, customHeight]);

  const { width: cardWidth, height: cardHeight, perspective } = dimensions;

  const count = images.length;
  // Calculate cylinder radius so cards form a complete 3D ring
  const angleStep = 360 / Math.max(count, 3);
  const theta = (angleStep * Math.PI) / 180;
  const radius = Math.round((cardWidth / 2) / Math.tan(theta / 2)) + 25;

  // Rotation motion values
  const rotation = useMotionValue(0);
  const smoothRotation = useSpring(rotation, {
    damping: 35,
    stiffness: 110,
    mass: 0.6,
  });

  const lastX = useRef(0);

  // Slow auto-rotation loop
  useEffect(() => {
    if (!autoRotate || isDragging || isHovered) return;

    let animId: number;
    const tick = () => {
      // Gentle, slow glide around the cylinder
      rotation.set(rotation.get() - autoRotateSpeed * 0.4);
      animId = requestAnimationFrame(tick);
    };
    animId = requestAnimationFrame(tick);

    return () => cancelAnimationFrame(animId);
  }, [autoRotate, autoRotateSpeed, isDragging, isHovered, rotation]);

  // Pointer drag controls (works on both mouse and mobile touch)
  const handlePointerDown = (e: React.PointerEvent) => {
    setIsDragging(true);
    lastX.current = e.clientX;
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging) return;
    const deltaX = e.clientX - lastX.current;
    rotation.set(rotation.get() + deltaX * 0.32);
    lastX.current = e.clientX;
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    if (!isDragging) return;
    setIsDragging(false);
    try {
      (e.target as HTMLElement).releasePointerCapture(e.pointerId);
    } catch {
      // ignore
    }
  };

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative flex h-[380px] sm:h-[460px] md:h-[500px] w-full items-center justify-center overflow-visible select-none cursor-grab active:cursor-grabbing touch-pan-y",
        className
      )}
      style={{ perspective: `${perspective}px` }}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setIsDragging(false);
      }}
    >
      {/* Ambient background glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-radial from-blue/15 via-transparent to-transparent opacity-50"
      />

      {/* 3D Rotating Cylinder */}
      <motion.div
        className="relative flex items-center justify-center"
        style={{
          width: cardWidth,
          height: cardHeight,
          transformStyle: "preserve-3d",
          rotateY: smoothRotation,
        }}
      >
        {images.map((img, i) => {
          const itemAngle = i * angleStep;

          return (
            <div
              key={`${img.src}-${i}`}
              className="absolute left-0 top-0"
              style={{
                width: cardWidth,
                height: cardHeight,
                transform: `rotateY(${itemAngle}deg) translateZ(${radius}px)`,
                transformStyle: "preserve-3d",
                // All cards remain visible in 3D when rotating to the back
                backfaceVisibility: "visible",
                WebkitBackfaceVisibility: "visible",
              }}
            >
              {/* Landscape Card Container with 3D Depth */}
              <div className="group relative size-full overflow-hidden rounded-xl border border-line-2 bg-ink/95 shadow-2xl transition-all duration-300 hover:border-blue/70 hover:shadow-[0_0_32px_rgba(82,169,229,0.3)]">
                {/* High-Resolution HD Thumbnail */}
                <img
                  src={img.src}
                  alt={img.alt || `Campaign thumbnail ${i + 1}`}
                  referrerPolicy="no-referrer"
                  crossOrigin="anonymous"
                  loading="eager"
                  className="size-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  onError={(e) => {
                    // If maxresdefault is not available on a specific video, fallback to hqdefault
                    const target = e.currentTarget;
                    if (target.src.includes("maxresdefault.jpg")) {
                      target.src = target.src.replace("maxresdefault.jpg", "hqdefault.jpg");
                    }
                  }}
                />

                {/* Subtle dark gradient overlay at the bottom */}
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent"
                />

                {/* Play Button Badge */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="flex size-9 sm:size-11 items-center justify-center rounded-full border border-white/25 bg-black/60 backdrop-blur-md transition-all duration-300 group-hover:scale-110 group-hover:border-blue group-hover:bg-blue">
                    <svg
                      className="ml-0.5 size-3.5 sm:size-4 text-white transition-colors"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </div>

                {/* Card Title & Brand Label */}
                <div className="absolute inset-x-2.5 sm:inset-x-3 bottom-2 sm:bottom-2.5 flex items-center justify-between z-10 pointer-events-none">
                  <span className="truncate text-[11px] sm:text-xs font-semibold text-white drop-shadow-md max-w-[70%]">
                    {img.title || `Campaign 0${i + 1}`}
                  </span>
                  <span className="rounded-full border border-mint/40 bg-black/60 px-2 py-0.5 text-[9px] sm:text-[10px] font-semibold uppercase tracking-wider text-mint-bright backdrop-blur-md shadow-sm">
                    {img.brand || "Live"}
                  </span>
                </div>
              </div>

              {/* Backside 3D Translucent Plate so cards rotating to the back have real depth */}
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 rounded-xl bg-ink/75 backdrop-blur-[2px] border border-line-2 opacity-50"
                style={{
                  transform: "rotateY(180deg) translateZ(1px)",
                  backfaceVisibility: "hidden",
                  WebkitBackfaceVisibility: "hidden",
                }}
              />
            </div>
          );
        })}
      </motion.div>

      {/* Interactive Drag Hint */}
      <div className="pointer-events-none absolute bottom-2 sm:bottom-4 flex items-center gap-2 text-[10px] sm:text-[11px] font-medium uppercase tracking-[0.2em] text-dust">
        <span>&larr; Drag or swipe to spin &rarr;</span>
      </div>
    </div>
  );
}
