import { useState } from "react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { Play, Pause, ChevronLeft, ChevronRight, Shirt, Users, Heart, Target } from "lucide-react";

interface StoryChapter {
  id: string;
  title: string;
  year: string;
  description: string;
  image: string;
  icon: React.ReactNode;
  quote: string;
  details: string[];
}

const storyChapters: StoryChapter[] = [
  {
    id: "inception",
    title: "The Vision",
    year: "2023",
    description: "From balancing athletics and academics emerged an idea: clothing that speaks to the authentic youth experience.",
    image: "/photos/athlete-action.jpg",
    icon: <Target className="w-6 h-6" />,
    quote: "Fashion should empower, not just dress. It should give young people a voice.",
    details: [
      "Founded while maintaining varsity athletics",
      "Focus on authentic youth expression",
      "Mission-driven from day one",
      "Community-first approach"
    ]
  },
  {
    id: "foundation",
    title: "Building Community",
    year: "2023",
    description: "The Tee Shirt Teens became more than a brand—it became a platform for young voices and genuine connection.",
    image: "/photos/youth-leader-portrait.jpg",
    icon: <Users className="w-6 h-6" />,
    quote: "We're not just selling shirts. We're building a movement of young people who refuse to be silent.",
    details: [
      "Established authentic brand voice",
      "Connected with youth nationwide",
      "Created inclusive community spaces",
      "Emphasized quality and sustainability"
    ]
  },
  {
    id: "growth",
    title: "Expanding Impact",
    year: "2024",
    description: "Growth through purpose—each design telling a story, each purchase supporting youth empowerment initiatives.",
    image: "/photos/athlete-action.jpg",
    icon: <Heart className="w-6 h-6" />,
    quote: "Every design has meaning. Every purchase has purpose. Every customer has a voice.",
    details: [
      "Launched signature design collections",
      "Partnered with youth organizations",
      "Maintained founder's personal involvement", 
      "Built loyal customer community"
    ]
  },
  {
    id: "future",
    title: "The Next Chapter",
    year: "2025",
    description: "Expanding beyond clothing to create comprehensive platforms for youth expression, creativity, and empowerment.",
    image: "/photos/athlete-action.jpg",
    icon: <Shirt className="w-6 h-6" />,
    quote: "This is just the beginning. The Tee Shirt Teens will be the voice of a generation.",
    details: [
      "Expanding product lines and collections",
      "Developing youth mentorship programs",
      "Creating scholarship opportunities",
      "Building nationwide community presence"
    ]
  }
];

export default function BrandStory() {
  const [currentChapter, setCurrentChapter] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const storyRef = useScrollAnimation();

  const nextChapter = () => {
    setCurrentChapter((prev) => (prev + 1) % storyChapters.length);
    setIsAutoPlaying(false);
  };

  const prevChapter = () => {
    setCurrentChapter((prev) => (prev - 1 + storyChapters.length) % storyChapters.length);
    setIsAutoPlaying(false);
  };

  const chapter = storyChapters[currentChapter];

  return (
    <section className="py-24 bg-background" data-testid="brand-story-section">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16" ref={storyRef}>
          <h2 className="font-serif text-4xl md:text-5xl font-bold mb-6" data-testid="brand-story-title">
            The Tee Shirt Teens Story
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto" data-testid="brand-story-subtitle">
            From Bay Area athlete to fashion entrepreneur building a brand that empowers youth voices
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-12">
          {/* Story Image */}
          <div className="relative">
            <div className="luxury-card overflow-hidden rounded-2xl">
              <img 
                src={chapter.image}
                alt={chapter.title}
                className="w-full h-96 lg:h-[500px] object-cover transition-transform duration-500 hover:scale-105"
              />
              
              {/* Chapter Badge */}
              <div className="absolute top-6 left-6">
                <div className="flex items-center gap-3 bg-black/80 text-white px-4 py-2 rounded-full">
                  {chapter.icon}
                  <span className="font-medium">{chapter.year}</span>
                </div>
              </div>

              {/* Navigation Overlay */}
              <div className="absolute inset-0 flex items-center justify-between p-6 opacity-0 hover:opacity-100 transition-opacity duration-300">
                <button
                  onClick={prevChapter}
                  className="w-12 h-12 bg-black/50 hover:bg-black/70 text-white rounded-full flex items-center justify-center transition-colors"
                  data-testid="story-prev"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                
                <button
                  onClick={() => setIsAutoPlaying(!isAutoPlaying)}
                  className="w-12 h-12 bg-black/50 hover:bg-black/70 text-white rounded-full flex items-center justify-center transition-colors"
                  data-testid="story-play-pause"
                >
                  {isAutoPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
                </button>

                <button
                  onClick={nextChapter}
                  className="w-12 h-12 bg-black/50 hover:bg-black/70 text-white rounded-full flex items-center justify-center transition-colors"
                  data-testid="story-next"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </div>
            </div>
          </div>

          {/* Story Content */}
          <div className="space-y-8">
            {/* Chapter Header */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="flex items-center gap-2 text-primary">
                  {chapter.icon}
                  <span className="text-sm font-medium uppercase tracking-wide">
                    Chapter {currentChapter + 1}
                  </span>
                </div>
                <span className="text-sm text-muted-foreground">
                  {chapter.year}
                </span>
              </div>
              
              <h3 className="font-serif text-3xl font-bold mb-4" data-testid="story-chapter-title">
                {chapter.title}
              </h3>
              
              <p className="text-lg text-muted-foreground leading-relaxed" data-testid="story-chapter-description">
                {chapter.description}
              </p>
            </div>

            {/* Featured Quote */}
            <blockquote className="border-l-4 border-primary pl-6 py-4 bg-muted/30 rounded-r-lg">
              <p className="text-lg italic font-medium" data-testid="story-chapter-quote">
                "{chapter.quote}"
              </p>
            </blockquote>

            {/* Chapter Details */}
            <div>
              <h4 className="font-semibold mb-4">Key Milestones</h4>
              <ul className="space-y-3">
                {chapter.details.map((detail, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-muted-foreground">{detail}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Call to Action */}
            <div className="pt-6">
              <a 
                href="https://thett.shop" 
                target="_blank" 
                rel="noopener noreferrer"
                className="luxury-button inline-flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground font-medium uppercase tracking-[0.1em] hover:bg-primary/90 transition-all duration-300 hover:scale-105"
                data-testid="story-visit-store"
              >
                <Shirt className="w-5 h-5" />
                Visit The Store
              </a>
            </div>
          </div>
        </div>

        {/* Chapter Navigation */}
        <div className="flex justify-center gap-4 mt-12">
          {storyChapters.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentChapter(index)}
              className={`w-12 h-12 rounded-full border-2 transition-all duration-300 ${
                index === currentChapter
                  ? 'border-primary bg-primary text-primary-foreground'
                  : 'border-border hover:border-primary/50'
              }`}
              data-testid={`story-chapter-${index}`}
            >
              <span className="font-medium">{index + 1}</span>
            </button>
          ))}
        </div>

        {/* Auto-play Status */}
        <div className="text-center mt-8">
          <p className="text-sm text-muted-foreground">
            {isAutoPlaying ? "Auto-advancing chapters" : "Manual navigation mode"}
          </p>
        </div>
      </div>
    </section>
  );
}