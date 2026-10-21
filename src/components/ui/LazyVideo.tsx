"use client";

import React, { useRef, useEffect, useState } from "react";

interface LazyVideoProps {
  src: string;
  poster?: string;
  className?: string;
  playbackRate?: number;
  isActive?: boolean;
}

export default function LazyVideo({
  src,
  poster,
  className = "",
  playbackRate = 1.0,
  isActive = true
}: LazyVideoProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const isIntersectingRef = useRef(false);
  const [shouldLoadVideo, setShouldLoadVideo] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.playbackRate = playbackRate;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        isIntersectingRef.current = entry.isIntersecting;

        if (entry.isIntersecting) {
          setShouldLoadVideo(true);
          if (isActive) {
            video.play().catch(() => {});
          }
        } else {
          video.pause();
        }
      },
      {
        threshold: 0.15,
        rootMargin: "80px"
      }
    );

    observer.observe(video);

    return () => {
      observer.disconnect();
    };
  }, [playbackRate]);

  // React to isActive state changes without recreating observer
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (isActive && isIntersectingRef.current) {
      video.play().catch(() => {});
    } else {
      video.pause();
    }
  }, [isActive]);

  return (
    <video
      ref={videoRef}
      muted
      loop
      playsInline
      preload="metadata"
      poster={poster}
      className={`will-change-transform transform-gpu ${className}`}
    >
      {shouldLoadVideo && <source src={src} type="video/mp4" />}
    </video>
  );
}
