import { useEffect, useState } from "react";
import { X, ChevronLeft, ChevronRight, BookOpen } from "lucide-react";

type Poem = {
  title: string;
  content: string;
};

type Props = {
  title: string;
  poems: Poem[];
  open: boolean;
  onClose: () => void;
};

export default function PoemModal({ title, poems, open, onClose }: Props) {
  const [currentPoem, setCurrentPoem] = useState<number>(0);

  const goToPrevPoem = () => setCurrentPoem(poem => Math.max(0, poem - 1));
  const goToNextPoem = () => setCurrentPoem(poem => Math.min(poems.length - 1, poem + 1));

  useEffect(() => {
    if (!open) return;
    setCurrentPoem(0); // Reset to first poem when opening
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") goToPrevPoem();
      if (e.key === "ArrowRight") goToNextPoem();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose, poems.length]);

  if (!open || poems.length === 0) return null;

  const poem = poems[currentPoem];

  return (
    <div className="fixed inset-0 z-[999] bg-black/80 backdrop-blur-sm p-4 md:p-8">
      <div className="mx-auto h-full w-full max-w-4xl rounded-2xl border border-white/10 bg-neutral-950 shadow-2xl overflow-hidden relative">
        <button
          aria-label="Close"
          onClick={onClose}
          className="absolute right-4 top-4 z-10 inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20"
          data-testid="button-close-poem-modal"
        >
          <X className="h-6 w-6" />
        </button>
        
        {/* Header with title and controls */}
        <div className="h-16 border-b border-white/10 flex items-center justify-between px-5 text-white/90">
          <div className="flex items-center gap-4">
            <BookOpen className="h-5 w-5" />
            <span className="truncate text-sm">{title} Sample</span>
            <span className="text-xs opacity-70">
              Poem {currentPoem + 1} of {poems.length}
            </span>
          </div>
          
          <div className="flex items-center gap-2">
            {/* Navigation Controls */}
            <button
              onClick={goToPrevPoem}
              disabled={currentPoem <= 0}
              className="p-2 rounded bg-white/10 hover:bg-white/20 disabled:opacity-30 disabled:cursor-not-allowed"
              aria-label="Previous poem"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            
            <button
              onClick={goToNextPoem}
              disabled={currentPoem >= poems.length - 1}
              className="p-2 rounded bg-white/10 hover:bg-white/20 disabled:opacity-30 disabled:cursor-not-allowed"
              aria-label="Next poem"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
        
        {/* Poem Display */}
        <div className="h-[calc(100%-4rem)] overflow-auto bg-gradient-to-br from-neutral-900 to-neutral-950 flex items-center justify-center p-8">
          <div className="max-w-2xl w-full text-center">
            <h2 className="text-2xl md:text-3xl font-serif text-white mb-8 tracking-wide">
              {poem.title}
            </h2>
            <div className="text-white/90 text-lg leading-relaxed font-light whitespace-pre-line tracking-wide">
              {poem.content}
            </div>
            
            {/* Poem navigation dots */}
            <div className="flex justify-center gap-2 mt-12">
              {poems.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentPoem(index)}
                  className={`w-3 h-3 rounded-full transition-all ${
                    index === currentPoem 
                      ? 'bg-white' 
                      : 'bg-white/30 hover:bg-white/50'
                  }`}
                  aria-label={`Go to poem ${index + 1}`}
                />
              ))}
            </div>
            
            <div className="mt-8 text-white/60 text-sm">
              This is a sample from {title}. Get the full collection to read all poems.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}