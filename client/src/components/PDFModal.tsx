import { useEffect } from "react";
import { X } from "lucide-react";

type Props = {
  title: string;
  pdfUrl: string;
  open: boolean;
  onClose: () => void;
};

export default function PDFModal({ title, pdfUrl, open, onClose }: Props) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

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
        <div className="h-12 border-b border-white/10 flex items-center px-5 text-white/90 text-sm">
          <span className="truncate">{title} — Sample</span>
          <a
            href={pdfUrl}
            target="_blank"
            className="ml-auto underline hover:opacity-80"
            rel="noreferrer"
            data-testid="link-download-pdf"
          >
            Open / Download
          </a>
        </div>
        <iframe
          title={`${title} PDF`}
          src={pdfUrl}
          className="h-[calc(100%-3rem)] w-full"
          style={{ border: "none" }}
        />
      </div>
    </div>
  );
}