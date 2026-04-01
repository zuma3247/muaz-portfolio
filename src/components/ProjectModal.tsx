import { motion, AnimatePresence } from "motion/react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useEffect } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "./ui/carousel";
import { SwipeIndicator } from "./SwipeIndicator";

interface Project {
  title: string;
  description: string;
  imageUrl?: string;
  images?: string[];
  fullDescription?: string;
  technologies?: string[];
  role?: string;
  year?: string;
  technologiesLabel?: string;
  actionButton?: {
    label: string;
    url: string;
  };
}

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export function ProjectModal({ project, onClose }: ProjectModalProps) {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);
  const [fullScreenImage, setFullScreenImage] = useState<number | null>(null);

  const displayImages = project?.images || (project?.imageUrl ? [project.imageUrl] : []);
  const hasMultipleImages = displayImages.length > 1;

  useEffect(() => {
    if (!api) return;

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap());

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  // Body scroll lock
  useEffect(() => {
    if (project) {
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [project]);

  // Keyboard navigation
  useEffect(() => {
    if (!project) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (fullScreenImage !== null) {
          setFullScreenImage(null);
        } else {
          onClose();
        }
      }

      if (fullScreenImage !== null && hasMultipleImages) {
        if (e.key === "ArrowRight") {
          setFullScreenImage((prev) => 
            prev !== null ? (prev + 1) % displayImages.length : null
          );
        } else if (e.key === "ArrowLeft") {
          setFullScreenImage((prev) => 
            prev !== null ? (prev - 1 + displayImages.length) % displayImages.length : null
          );
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [project, fullScreenImage, hasMultipleImages, displayImages.length, onClose]);

  if (!project) return null;

  const openFullScreen = (index: number) => {
    setFullScreenImage(index);
  };

  const closeFullScreen = () => {
    setFullScreenImage(null);
  };

  const navigateFullScreen = (direction: 'next' | 'prev') => {
    if (fullScreenImage === null) return;
    
    if (direction === 'next') {
      setFullScreenImage((fullScreenImage + 1) % displayImages.length);
    } else {
      setFullScreenImage((fullScreenImage - 1 + displayImages.length) % displayImages.length);
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        {/* Backdrop */}
        <motion.div
          className="absolute inset-0 bg-black/80 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        />

        {/* Modal content */}
        <motion.div
          className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto glass rounded-lg"
          role="dialog"
          aria-modal="true"
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          transition={{ type: "spring", damping: 25 }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full glass flex items-center justify-center hover:bg-burnt-orange/20 transition-colors"
          >
            <X className="w-6 h-6 text-white" />
          </button>

          {/* Image or Carousel */}
          <div className="relative h-64 md:h-96 overflow-hidden rounded-t-lg">
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
                      <div 
                        className="relative w-full h-64 md:h-96 cursor-pointer group"
                        onClick={(e) => {
                          e.stopPropagation();
                          openFullScreen(index);
                        }}
                      >
                        <img
                          src={img}
                          alt={`${project.title} - Image ${index + 1}`}
                          className="w-full h-full object-cover transition-transform group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                          <span className="text-white opacity-0 group-hover:opacity-100 transition-opacity px-4 py-2 rounded glass">
                            Click to view full screen
                          </span>
                        </div>
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>

                {/* Custom arrows */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    api?.scrollPrev();
                  }}
                  className="absolute top-1/2 left-4 -translate-y-1/2 z-10 w-12 h-12 rounded-full glass flex items-center justify-center hover:bg-burnt-orange/20 transition-colors"
                >
                  <ChevronLeft className="w-7 h-7 text-white" />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    api?.scrollNext();
                  }}
                  className="absolute top-1/2 right-4 -translate-y-1/2 z-10 w-12 h-12 rounded-full glass flex items-center justify-center hover:bg-burnt-orange/20 transition-colors"
                >
                  <ChevronRight className="w-7 h-7 text-white" />
                </button>

                {/* Image counter and dots indicator */}
                <div className="absolute bottom-6 left-0 right-0 z-10 flex items-center justify-between px-4 md:px-6">
                  {/* Counter */}
                  <div className="glass px-3 py-1.5 rounded-full">
                    <span className="text-white text-sm">
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
                        className={`w-2.5 h-2.5 rounded-full transition-all ${
                          index === current
                            ? "bg-burnt-orange w-4"
                            : "bg-white/50 hover:bg-white/70"
                        }`}
                        aria-label={`Go to image ${index + 1}`}
                      />
                    ))}
                  </div>
                  
                  <div className="w-[70px]" /> {/* Spacer for balance */}
                </div>
              </Carousel>
            ) : (
              <div 
                className="relative w-full h-full cursor-pointer group"
                onClick={(e) => {
                  e.stopPropagation();
                  openFullScreen(0);
                }}
              >
                <img
                  src={displayImages[0]}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                  <span className="text-white opacity-0 group-hover:opacity-100 transition-opacity px-4 py-2 rounded glass">
                    Click to view full screen
                  </span>
                </div>
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-navy/90 to-transparent pointer-events-none" />
          </div>

          {/* Content */}
          <div className="p-6 md:p-8">
            <h2
              className="mb-4 text-white tracking-wide"
              style={{ letterSpacing: "0.1em" }}
            >
              {project.title}
            </h2>

            {/* Metadata */}
            <div className="flex flex-wrap gap-4 mb-6">
              {project.role && (
                <div className="glass px-4 py-2 rounded">
                  <span className="text-burnt-orange/70 mr-2">Role:</span>
                  <span className="text-white">{project.role}</span>
                </div>
              )}
              {project.year && (
                <div className="glass px-4 py-2 rounded">
                  <span className="text-burnt-orange/70 mr-2">Year:</span>
                  <span className="text-white">{project.year}</span>
                </div>
              )}
            </div>

            <div className="text-white/90 mb-6 leading-relaxed space-y-4">
              {(project.fullDescription || project.description)
                .split('\n\n')
                .map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
            </div>

            {/* Technologies */}
            {project.technologies && project.technologies.length > 0 && (
              <div className="mb-6">
                <h3 className="text-burnt-orange mb-3">{project.technologiesLabel || "Technologies"}</h3>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-burnt-orange/10 border border-burnt-orange/30 rounded text-white/90"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Action Button */}
            {project.actionButton && (
              <motion.a
                href={project.actionButton.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-8 py-3 bg-burnt-orange hover:bg-burnt-orange/80 text-white rounded-lg transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {project.actionButton.label}
              </motion.a>
            )}
          </div>
        </motion.div>

        {/* Full Screen Image Viewer */}
        <AnimatePresence>
          {fullScreenImage !== null && (
            <motion.div
              className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeFullScreen}
            >
              {/* Close button */}
              <button
                onClick={closeFullScreen}
                className="absolute top-4 right-4 z-10 w-12 h-12 rounded-full glass flex items-center justify-center hover:bg-burnt-orange/20 transition-colors"
              >
                <X className="w-7 h-7 text-white" />
              </button>

              {/* Image counter */}
              <div className="absolute top-4 left-4 z-10 glass px-4 py-2 rounded">
                <span className="text-white">
                  {fullScreenImage + 1} / {displayImages.length}
                </span>
              </div>

              {/* Image */}
              <motion.img
                key={fullScreenImage}
                src={displayImages[fullScreenImage]}
                alt={`${project.title} - Image ${fullScreenImage + 1}`}
                className="max-w-full max-h-full object-contain"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{ type: "spring", damping: 25 }}
                onClick={(e) => e.stopPropagation()}
              />

              {/* Navigation arrows - only show if multiple images */}
              {displayImages.length > 1 && (
                <>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      navigateFullScreen('prev');
                    }}
                    className="absolute top-1/2 left-4 -translate-y-1/2 z-10 w-14 h-14 rounded-full glass flex items-center justify-center hover:bg-burnt-orange/20 transition-colors"
                  >
                    <ChevronLeft className="w-8 h-8 text-white" />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      navigateFullScreen('next');
                    }}
                    className="absolute top-1/2 right-4 -translate-y-1/2 z-10 w-14 h-14 rounded-full glass flex items-center justify-center hover:bg-burnt-orange/20 transition-colors"
                  >
                    <ChevronRight className="w-8 h-8 text-white" />
                  </button>

                  {/* Thumbnail navigation */}
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 flex gap-2 max-w-full overflow-x-auto px-4">
                    {displayImages.map((img, index) => (
                      <button
                        key={index}
                        onClick={(e) => {
                          e.stopPropagation();
                          setFullScreenImage(index);
                        }}
                        className={`flex-shrink-0 w-16 h-16 rounded overflow-hidden border-2 transition-all ${
                          index === fullScreenImage
                            ? "border-burnt-orange scale-110"
                            : "border-white/30 hover:border-white/60"
                        }`}
                      >
                        <img
                          src={img}
                          alt={`Thumbnail ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </button>
                    ))}
                  </div>
                </>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </AnimatePresence>
  );
}
