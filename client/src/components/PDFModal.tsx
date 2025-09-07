import { useEffect, useState } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';

// Set up PDF.js worker
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

type Props = {
  title: string;
  pdfUrl: string;
  open: boolean;
  onClose: () => void;
};

export default function PDFModal({ title, pdfUrl, open, onClose }: Props) {
  const [numPages, setNumPages] = useState<number>(0);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(true);
  const maxPages = 5; // Limit to first 5 pages

  function onDocumentLoadSuccess({ numPages: nextNumPages }: { numPages: number }) {
    setNumPages(Math.min(nextNumPages, maxPages)); // Limit to max 5 pages
    setLoading(false);
  }

  function onDocumentLoadError() {
    setLoading(false);
  }

  const goToPrevPage = () => setPageNumber(page => Math.max(1, page - 1));
  const goToNextPage = () => setPageNumber(page => Math.min(numPages, page + 1));

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") goToPrevPage();
      if (e.key === "ArrowRight") goToNextPage();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose, numPages]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[999] bg-black/80 backdrop-blur-sm p-4 md:p-8">
      <div className="mx-auto h-full w-full max-w-6xl rounded-2xl border border-white/10 bg-neutral-950 shadow-2xl overflow-hidden relative">
        <button
          aria-label="Close"
          onClick={onClose}
          className="absolute right-4 top-4 z-10 inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20"
          data-testid="button-close-pdf-modal"
        >
          <X className="h-6 w-6" />
        </button>
        
        {/* Header with title and controls */}
        <div className="h-16 border-b border-white/10 flex items-center justify-between px-5 text-white/90">
          <div className="flex items-center gap-4">
            <span className="truncate text-sm">{title} Sample (5 Pages Max)</span>
            {!loading && numPages > 0 && (
              <span className="text-xs opacity-70">
                Page {pageNumber} of {numPages}
              </span>
            )}
          </div>
          
          <div className="flex items-center gap-2">
            {/* Navigation Controls */}
            <button
              onClick={goToPrevPage}
              disabled={pageNumber <= 1}
              className="p-2 rounded bg-white/10 hover:bg-white/20 disabled:opacity-30 disabled:cursor-not-allowed"
              aria-label="Previous page"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            
            <button
              onClick={goToNextPage}
              disabled={pageNumber >= numPages}
              className="p-2 rounded bg-white/10 hover:bg-white/20 disabled:opacity-30 disabled:cursor-not-allowed"
              aria-label="Next page"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
            
            <a
              href={pdfUrl}
              target="_blank"
              className="ml-4 text-xs underline hover:opacity-80"
              rel="noreferrer"
              data-testid="link-download-pdf"
            >
              Full PDF
            </a>
          </div>
        </div>
        
        {/* PDF Viewer */}
        <div className="h-[calc(100%-4rem)] overflow-auto bg-gray-100 flex items-center justify-center">
          {loading && (
            <div className="text-black">Loading sample pages...</div>
          )}
          
          <Document
            file={pdfUrl}
            onLoadSuccess={onDocumentLoadSuccess}
            onLoadError={onDocumentLoadError}
            loading=""
            className="flex items-center justify-center"
          >
            <Page
              pageNumber={pageNumber}
              renderTextLayer={false}
              renderAnnotationLayer={false}
              className="shadow-lg"
              width={Math.min(800, window.innerWidth - 100)}
            />
          </Document>
        </div>
      </div>
    </div>
  );
}