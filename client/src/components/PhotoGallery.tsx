import { useEffect, useState } from "react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { X, ChevronLeft, ChevronRight, ZoomIn } from "lucide-react";
import backgroundImage from "@/assets/backgrounds/photo-gallery.png";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";

interface GalleryImage {
  src: string;
  alt: string;
  title: string;
  category: "athlete" | "author" | "entrepreneur" | "designer";
  description: string;
}

const galleryImages: GalleryImage[] = [
	{
	  src: "/photos/athletic-pose.jpg",
	  alt: "Basketball action shot",
	  title: "Court Work",
	  category: "athlete",
	  description: "Varsity basketball work built on size, repetition, and team responsibility"
	},
  {
    src: "/photos/author-reading-book.jpg",
	  alt: "Poetry writing session",
	  title: "Writing & Books",
	  category: "author",
	  description: "Writing poems and stories about love, faith, identity, and family"
	},
  {
	  src: "/photos/entrepreneur-style.jpg",
	  alt: "The Tee Shirt Teens brand",
	  title: "Creative Projects",
	  category: "entrepreneur",
	  description: "Developing apparel, content, and community ideas with young people in mind"
	},
  {
	  src: "/photos/creative-designer.jpg",
	  alt: "Creative design work",
	  title: "Photo & Design",
	  category: "designer",
	  description: "Building visual material for books, projects, and community work"
	},
  {
	  src: "/photos/athletic-pose.jpg",
	  alt: "Athletic excellence",
	  title: "Athletic Development",
	  category: "athlete",
	  description: "Training, film, and court reps from the high school basketball journey"
	},
  {
    src: "/photos/author-portrait.jpg",
	  alt: "Book collection",
	  title: "Published Works",
	  category: "author",
	  description: "Books and poems written across several stages of the creative journey"
	}
];

const categories = ["all", "athlete", "author", "entrepreneur", "designer"];

const getCategoryLabel = (category: string) => {
  const labels: Record<string, string> = {
    all: "All",
    athlete: "Athlete", 
    author: "Author",
    entrepreneur: "Projects",
    designer: "Designer"
  };
  return labels[category] || category;
};

export default function PhotoGallery() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [lightboxImage, setLightboxImage] = useState<GalleryImage | null>(null);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [carouselApi, setCarouselApi] = useState<CarouselApi>();
  const [currentSlide, setCurrentSlide] = useState(0);
  const galleryRef = useScrollAnimation();

  const filteredImages = selectedCategory === "all" 
    ? galleryImages 
    : galleryImages.filter(img => img.category === selectedCategory);

  useEffect(() => {
    if (!carouselApi) {
      return;
    }

    const updateSlide = () => {
      setCurrentSlide(carouselApi.selectedScrollSnap());
    };

    updateSlide();
    carouselApi.on("select", updateSlide);
    carouselApi.on("reInit", updateSlide);

    return () => {
      carouselApi.off("select", updateSlide);
      carouselApi.off("reInit", updateSlide);
    };
  }, [carouselApi]);

  useEffect(() => {
    if (!carouselApi) {
      return;
    }

    carouselApi.reInit();
    carouselApi.scrollTo(0, true);
    setCurrentSlide(0);
  }, [carouselApi, selectedCategory]);

  const openLightbox = (image: GalleryImage, index: number) => {
    setLightboxImage(image);
    setLightboxIndex(index);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setLightboxImage(null);
    document.body.style.overflow = 'unset';
  };

  const navigateLightbox = (direction: 'prev' | 'next') => {
    const currentIndex = filteredImages.findIndex(img => img === lightboxImage);
    let newIndex;
    
    if (direction === 'prev') {
      newIndex = currentIndex > 0 ? currentIndex - 1 : filteredImages.length - 1;
    } else {
      newIndex = currentIndex < filteredImages.length - 1 ? currentIndex + 1 : 0;
    }
    
    setLightboxImage(filteredImages[newIndex]);
    setLightboxIndex(newIndex);
  };

  return (
    <>
      <section 
        className="py-24 bg-background relative" 
        data-testid="photo-gallery"
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-black/75"></div>
        
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16" ref={galleryRef}>
            <h2 className="font-serif text-4xl md:text-5xl font-bold mb-6" data-testid="gallery-title">
              Photos
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto" data-testid="gallery-subtitle">
              A few moments from books, basketball, and creative projects.
            </p>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-4 mb-12" data-testid="gallery-filters">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
	                className={`rounded-md px-6 py-3 font-medium uppercase tracking-[0.1em] transition-colors ${
                  selectedCategory === category
                    ? 'bg-primary text-primary-foreground shadow-lg'
                    : 'bg-card border border-border hover:bg-accent hover:text-accent-foreground'
                }`}
                data-testid={`filter-${category}`}
              >
                {getCategoryLabel(category)}
              </button>
            ))}
          </div>

          {/* Image Carousel */}
          <Carousel
            setApi={setCarouselApi}
            opts={{ align: "start", loop: filteredImages.length > 3 }}
            className="mx-auto max-w-6xl px-12 md:px-16"
          >
            <CarouselContent className="-ml-0 md:-ml-4">
              {filteredImages.map((image, index) => (
                <CarouselItem
                  key={`${image.title}-${index}`}
                  className="pl-0 md:pl-4 md:basis-1/2 xl:basis-1/3"
                >
                  <div 
                    className="surface-card group relative overflow-hidden rounded-lg cursor-pointer"
                    onClick={() => openLightbox(image, index)}
                    data-testid={`gallery-image-${index}`}
                  >
                    <div className="aspect-w-4 aspect-h-3 relative">
                      <img 
                        src={image.src}
                        alt={image.alt}
                        className="w-full h-80 object-cover transition-transform duration-500 group-hover:scale-110"
                        loading="lazy"
                      />
                      
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300 flex items-center justify-center">
                        <ZoomIn className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      </div>
                      
                      <div className="absolute top-4 left-4">
                        <span className="px-3 py-1 bg-black/70 text-white text-xs uppercase tracking-wide rounded-full">
                          {image.category}
                        </span>
                      </div>
                    </div>
                    
                    <div className="p-6 bg-card">
                      <h3 className="font-bold text-lg mb-2 group-hover:text-primary transition-colors">
                        {image.title}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {image.description}
                      </p>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-0 border-border bg-card/90 hover:bg-card" />
            <CarouselNext className="right-0 border-border bg-card/90 hover:bg-card" />
          </Carousel>

          <div className="mt-8 flex justify-center gap-3" data-testid="gallery-carousel-dots">
            {filteredImages.map((image, index) => (
              <button
                key={`${image.title}-dot-${index}`}
                type="button"
                onClick={() => carouselApi?.scrollTo(index)}
                className={`h-2.5 rounded-full transition-all duration-300 ${
                  index === currentSlide ? "w-8 bg-primary" : "w-2.5 bg-white/30 hover:bg-white/50"
                }`}
                aria-label={`Go to slide ${index + 1}`}
                data-testid={`gallery-dot-${index}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox Modal */}
      {lightboxImage && (
        <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4" data-testid="lightbox">
          <div className="relative max-w-4xl max-h-full">
            {/* Close Button */}
            <button
              onClick={closeLightbox}
              className="absolute top-4 right-4 z-10 w-10 h-10 bg-black/50 hover:bg-black/70 text-white rounded-full flex items-center justify-center transition-colors"
              data-testid="lightbox-close"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Navigation Buttons */}
            <button
              onClick={() => navigateLightbox('prev')}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-black/50 hover:bg-black/70 text-white rounded-full flex items-center justify-center transition-colors"
              data-testid="lightbox-prev"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            <button
              onClick={() => navigateLightbox('next')}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-black/50 hover:bg-black/70 text-white rounded-full flex items-center justify-center transition-colors"
              data-testid="lightbox-next"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Image */}
            <img 
              src={lightboxImage.src}
              alt={lightboxImage.alt}
              className="max-w-full max-h-full object-contain"
              data-testid="lightbox-image"
            />

            {/* Image Info */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 text-white">
              <h3 className="text-xl font-bold mb-2">{lightboxImage.title}</h3>
              <p className="text-sm opacity-90">{lightboxImage.description}</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
