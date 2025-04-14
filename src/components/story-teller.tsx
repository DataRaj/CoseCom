/** eslint-disable @typescript-eslint/no-explicit-any */
import {
    Dialog,
    DialogContent
} from '@/components/ui/dialog';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';

// Define our story page type
type StoryPage = {
  page: number;
  title?: string;
  description?: string;
};

type StoryModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  pages: StoryPage[];
};

const StoryModal = ({ open, onOpenChange, pages }: StoryModalProps) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [direction, setDirection] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const [startX, setStartX] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  // Reset to first page when modal opens
  useEffect(() => {
    if (open) {
      setCurrentPage(0);
    }
  }, [open]);

  // Handle navigation
  const goToPage = (newPage: number) => {
    if (newPage >= 0 && newPage < pages.length) {
      setDirection(newPage > currentPage ? 1 : -1);
      setCurrentPage(newPage);
    }
  };

  // Touch/mouse handlers for sliding
  const handleTouchStart = (e: React.TouchEvent | React.MouseEvent) => {
    setIsDragging(true);
    if ('touches' in e) {
      setStartX(e.touches[0].clientX);
    } else {
      setStartX(e.clientX);
    }
  };

  const handleTouchMove = (e: React.TouchEvent | React.MouseEvent) => {
    if (!isDragging) return;

    let currentX: number;
    if ('touches' in e) {
      currentX = e.touches[0].clientX;
    } else {
      currentX = e.clientX;
    }

    const diff = startX - currentX;

    // Prevent scrolling the page while swiping
    if (Math.abs(diff) > 5) {
      e.preventDefault();
    }
  };

  const handleTouchEnd = (e: React.TouchEvent | React.MouseEvent) => {
    if (!isDragging) return;

    let endX: number;
    if ('changedTouches' in e) {
      endX = e.changedTouches[0].clientX;
    } else {
      endX = e.clientX;
    }

    const diff = startX - endX;

    // If swipe distance is significant, change page
    if (Math.abs(diff) > 50) {
      if (diff > 0 && currentPage < pages.length - 1) {
        // Swipe left, go to next page
        goToPage(currentPage + 1);
      } else if (diff < 0 && currentPage > 0) {
        // Swipe right, go to previous page
        goToPage(currentPage - 1);
      }
    }

    setIsDragging(false);
  };

  // Animation variants
  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0
    }),
    center: {
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 300 : -300,
      opacity: 0
    })
  };

  // Progress indicator component
  const ProgressIndicator = () => (
    <div className="flex justify-center bg-background mt-4 space-x-2">
      {pages.map((_, index) => (
        <button
          key={index}
          onClick={() => goToPage(index)}
          className={`h-2 rounded-full transition-all duration-300 ${
            index === currentPage
              ? 'w-8 bg-gray-800'
              : 'w-2 bg-gray-600 hover:bg-gray-500'
          }`}
          aria-label={`Go to page ${index + 1}`}
        />
      ))}
    </div>
  );

  return (
  <div className='bg-background'>
    <Dialog open={open} onOpenChange={onOpenChange} className="bg-background">
      <DialogContent
        className="max-w-3xl border-4 border-gray-700 shadow-lg shadow-card text-gray-100 p-0 overflow-hidden"
        onTouchStart={handleTouchStart}
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        onTouchMove={handleTouchMove as any}
        onTouchEnd={handleTouchEnd}
        onMouseDown={handleTouchStart}
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        onMouseMove={handleTouchMove as any}
        onMouseUp={handleTouchEnd}
        onMouseLeave={handleTouchEnd}
        ref={containerRef}
      >
        <div className="absolute top-4 right-4 z-10">
          <button
            onClick={() => onOpenChange(false)}
            className="rounded-full bg-gray-800 p-2 hover:bg-gray-700 transition-colors"
          >
            <X className="h-4 w-4 text-gray-400" />
          </button>
        </div>

        <div className="h-full w-full">
          <AnimatePresence initial={false} custom={direction} mode="wait">
            <motion.div
              key={currentPage}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 }
              }}
              className="w-full"
            >
              <div className="relative min-h-[50vh] flex flex-col p-6 bg-gray-950">
                {/* Page number indicator with animated background */}
                <div className="absolute top-0 left-0 w-20 h-20 flex items-center justify-center">
                  <div className="absolute inset-0 bg-gray-900 opacity-10 rounded-br-3xl" />
                  <motion.span
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.2, duration: 0.3 }}
                    className="text-2xl font-bold text-gray-700"
                  >
                    {pages[currentPage].page}
                  </motion.span>
                </div>

                {/* Content */}
                <div className="mt-12 flex flex-col space-y-6">
                  {pages[currentPage].title && (
                    <motion.h2
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.1, duration: 0.4 }}
                      className="text-3xl font-bold text-white"
                    >
                      {pages[currentPage].title}
                    </motion.h2>
                  )}

                  {pages[currentPage].description && (
                    <motion.div
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.2, duration: 0.4 }}
                      className="text-gray-300 text-lg leading-relaxed"
                    >
                      {pages[currentPage].description}
                    </motion.div>
                  )}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Progress indicators */}
        <div className="border-t border-gray-800 p-4 bg-background">
          <ProgressIndicator />

          <div className="flex justify-between mt-4">
            <button
              onClick={() => goToPage(currentPage - 1)}
              disabled={currentPage === 0}
              className={`flex items-center gap-2 px-4 py-2 rounded-md transition-all duration-200 ${
                currentPage === 0
                  ? 'opacity-50 cursor-not-allowed bg-gray-800 text-gray-500'
                  : 'bg-gray-800 text-gray-200 hover:bg-gray-700'
              }`}
            >
              <ChevronLeft className="h-5 w-5" />
              <span>Previous</span>
            </button>

            <button
              onClick={() => goToPage(currentPage + 1)}
              disabled={currentPage === pages.length - 1}
              className={`flex items-center gap-2 px-4 py-2 rounded-md transition-all duration-200 ${
                currentPage === pages.length - 1
                  ? 'opacity-50 cursor-not-allowed bg-gray-800 text-gray-500'
                  : 'bg-gray-800 text-white hover:bg-gray-700'
              }`}
            >
              <span>Next</span>
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  </div>
  );
};

export default StoryModal;
