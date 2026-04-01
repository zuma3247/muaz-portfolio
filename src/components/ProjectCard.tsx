import { motion } from "motion/react";
import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "./ui/carousel";
import { SwipeIndicator } from "./SwipeIndicator";
import { ImageWithLoader } from "./ImageWithLoader";

interface ProjectCardProps {
  title: string;
  description: string;
  imageUrl?: string;
  images?: string[];
  onClick: () => void;
  isLarge?: boolean;
}

export function ProjectCard({
  title,
  description,
  imageUrl,
  images,
  onClick,
  isLarge = false,
}: ProjectCardProps) {
  const [isHovering, setIsHovering] = useState(false);
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  const displayImages = images || (imageUrl ? [imageUrl] : []);
  const hasMultipleImages = displayImages.length > 1;

  useEffect(() => {
    if (!api) return;

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap());

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  return (
    <motion.div
      className={`relative overflow-hidden rounded-lg cursor-pointer group ${
        isLarge ? "col-span-full" : ""
      }`}
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3 }}
      onClick={onClick}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <div className="glass relative overflow-hidden">
        {/* Image or Carousel */}
        <div className={`relative overflow-hidden ${isLarge ? "h-96" : "h-64"}`}>
          {hasMultipleImages ? (
            <Carousel
              setApi={setApi}
              className="w-full h-full"
              opts={{
                loop: true,
              }}
            >
              <SwipeIndicator />
              <CarouselContent className="h-full m-0">
                {displayImages.map((img, index) => (
                  <CarouselItem key={index} className="p-0">
                    <div className={`relative w-full ${isLarge ? "h-96" : "h-64"}`}>
                      <ImageWithLoader
                        src={img}
                        alt={`${title} - Image ${index + 1}`}
                        className="w-full h-full object-cover"
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.6 }}
                      />
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>

              {/* Custom arrows - Always visible on mobile, hover on desktop */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  api?.scrollPrev();
                }}
                className="absolute top-1/2 left-4 -translate-y-1/2 z-10 w-10 h-10 rounded-full glass flex items-center justify-center hover:bg-burnt-orange/20 transition-all md:opacity-0 md:group-hover:opacity-100"
                aria-label="Previous image"
              >
                <ChevronLeft className="w-6 h-6 text-white" />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  api?.scrollNext();
                }}
                className="absolute top-1/2 right-4 -translate-y-1/2 z-10 w-10 h-10 rounded-full glass flex items-center justify-center hover:bg-burnt-orange/20 transition-all md:opacity-0 md:group-hover:opacity-100"
                aria-label="Next image"
              >
                <ChevronRight className="w-6 h-6 text-white" />
              </button>

              {/* Image counter and dots indicator */}
              <div className="absolute bottom-4 left-0 right-0 z-10 flex items-center justify-between px-4">
                {/* Counter */}
                <div className="glass px-3 py-1 rounded-full">
                  <span className="text-white text-xs">
                    {current + 1} / {count}
                  </span>
                </div>
                
                {/* Dots */}
                <div className="flex gap-2">
                  {displayImages.map((_, index) => (
                    <button
                      key={index}
                      onClick={(e) => {
                        e.stopPropagation();
                        api?.scrollTo(index);
                      }}
                      className={`w-2 h-2 md:w-2.5 md:h-2.5 rounded-full transition-all ${
                        index === current
                          ? "bg-burnt-orange w-3 md:w-4"
                          : "bg-white/50 hover:bg-white/70"
                      }`}
                      aria-label={`Go to image ${index + 1}`}
                    />
                  ))}
                </div>
                
                <div className="w-[60px]" /> {/* Spacer for balance */}
              </div>
            </Carousel>
          ) : (
            <ImageWithLoader
              src={displayImages[0]}
              alt={title}
              className="w-full h-full object-cover"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.6 }}
            />
          )}

          {/* Overlay on hover */}
          <motion.div
            className="absolute inset-0 bg-burnt-orange/20 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovering ? 1 : 0 }}
            transition={{ duration: 0.3 }}
          />
        </div>

        {/* Content */}
        <div className="p-6">
          <motion.h3
            className="mb-2 text-white tracking-wide"
            animate={{ color: isHovering ? "#E36B3D" : "#FFFFFF" }}
            transition={{ duration: 0.2 }}
            style={{ letterSpacing: "0.05em" }}
          >
            {title}
          </motion.h3>
          <p className="text-white/85 line-clamp-2">{description}</p>
        </div>

        {/* Hover glow border */}
        <motion.div
          className="absolute inset-0 rounded-lg pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovering ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          style={{
            boxShadow: "0 0 30px rgba(227, 107, 61, 0.4)",
            border: "1px solid rgba(227, 107, 61, 0.6)",
          }}
        />
      </div>
    </motion.div>
  );
}
