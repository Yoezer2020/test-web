"use client";

import Image from "next/image";
import { useState } from "react";

interface SimpleImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  fallback?: React.ReactNode;
}

export function SimpleImage({
  src,
  alt,
  width,
  height,
  className = "",
  fallback = null,
}: SimpleImageProps) {
  const [error, setError] = useState(false);

  if (error) {
    return fallback ? (
      <>{fallback}</>
    ) : (
      <div
        className={`flex items-center justify-center bg-gray-100 dark:bg-gray-800 ${className}`}
        style={{ width, height }}
      >
        <span className="text-gray-500">Image</span>
      </div>
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={className}
      onError={() => setError(true)}
    />
  );
}
