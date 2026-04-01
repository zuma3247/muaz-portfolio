import { useState } from "react";
import { motion } from "motion/react";
import { ImageOff } from "lucide-react";

interface ImageWithLoaderProps {
  src: string;
  alt: string;
  className?: string;
  whileHover?: any;
  transition?: any;
}

export function ImageWithLoader({ src, alt, className = "", whileHover, transition }: ImageWithLoaderProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  return (
    <div className={`relative ${className}`}>
      {/* Loading skeleton */}
      {isLoading && !hasError && (
        <div className="absolute inset-0 bg-navy/60 animate-pulse flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-burnt-orange/30 border-t-burnt-orange rounded-full animate-spin" />
        </div>
      )}

      {/* Error state */}
      {hasError && (
        <div className="absolute inset-0 bg-navy/80 flex items-center justify-center">
          <div className="text-center p-4">
            <ImageOff className="w-12 h-12 text-white/40 mx-auto mb-2" />
            <p className="text-white/60 text-sm">Failed to load image</p>
          </div>
        </div>
      )}

      {/* Actual image */}
      <motion.img
        src={src}
        alt={alt}
        className={className}
        whileHover={whileHover}
        transition={transition}
        onLoad={() => setIsLoading(false)}
        onError={() => {
          setIsLoading(false);
          setHasError(true);
        }}
        style={{ opacity: isLoading ? 0 : 1 }}
      />
    </div>
  );
}
