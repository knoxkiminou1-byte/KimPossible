import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { Download, FileText, Image, Video, Mail, ExternalLink } from "lucide-react";

interface MediaAsset {
  name: string;
  type: "press-release" | "bio" | "photos" | "stats" | "contact";
  description: string;
  fileSize?: string;
  icon: React.ReactNode;
  downloadUrl: string;
}

const mediaAssets: MediaAsset[] = [
  {
    name: "Official Biography",
    type: "bio",
    description: "Comprehensive bio covering athletic career, literary works, and entrepreneurial ventures",
    fileSize: "2.4 MB",
    icon: <FileText className="w-6 h-6" />,
    downloadUrl: "#"
  },
  {
    name: "High-Resolution Photos",
    type: "photos", 
    description: "Professional headshots, action shots, and brand photography",
    fileSize: "15.7 MB",
    icon: <Image className="w-6 h-6" />,
    downloadUrl: "#"
  },
  {
    name: "Athletic Statistics",
    type: "stats",
    description: "Basketball and football career stats, achievements, and records",
    fileSize: "890 KB",
    icon: <FileText className="w-6 h-6" />,
    downloadUrl: "#"
  },
  {
    name: "Book Press Kit",
    type: "press-release",
    description: "Poetry collection summaries, excerpts, and publication details",
    fileSize: "3.2 MB", 
    icon: <FileText className="w-6 h-6" />,
    downloadUrl: "#"
  },
  {
    name: "Brand Assets",
    type: "photos",
    description: "The Tee Shirt Teens logos, brand guidelines, and product photos",
    fileSize: "8.1 MB",
    icon: <Image className="w-6 h-6" />,
    downloadUrl: "#"
  },
  {
    name: "Media Contact Sheet",
    type: "contact",
    description: "Direct contact information and interview scheduling",
    fileSize: "125 KB",
    icon: <Mail className="w-6 h-6" />,
    downloadUrl: "#"
  }
];

const getTypeColor = (type: string) => {
  switch (type) {
    case "bio": return "text-blue-400 bg-blue-400/10 border-blue-400/20";
    case "photos": return "text-green-400 bg-green-400/10 border-green-400/20";
    case "stats": return "text-red-400 bg-red-400/10 border-red-400/20";
    case "press-release": return "text-purple-400 bg-purple-400/10 border-purple-400/20";
    case "contact": return "text-orange-400 bg-orange-400/10 border-orange-400/20";
    default: return "text-gray-400 bg-gray-400/10 border-gray-400/20";
  }
};

const getTypeLabel = (type: string) => {
  const labels: Record<string, string> = {
    "bio": "Biography",
    "photos": "Photography", 
    "stats": "Statistics",
    "press-release": "Press Materials",
    "contact": "Contact Info"
  };
  return labels[type] || type;
};

export default function MediaKit() {
  const mediaKitRef = useScrollAnimation();

  return (
    <section className="py-24 bg-muted/30" data-testid="media-kit-section">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16" ref={mediaKitRef}>
          <h2 className="font-serif text-4xl md:text-5xl font-bold mb-6" data-testid="media-kit-title">
            Media Kit
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto" data-testid="media-kit-subtitle">
            Professional assets for media, press, and collaboration opportunities
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {mediaAssets.map((asset, index) => (
            <div 
              key={asset.name}
              className="luxury-card group relative bg-card border border-border rounded-lg p-6 hover:shadow-2xl transition-all duration-500"
              data-testid={`media-asset-${index}`}
            >
              {/* Type Badge */}
              <div className="flex items-center justify-between mb-4">
                <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium border ${getTypeColor(asset.type)}`}>
                  {asset.icon}
                  {getTypeLabel(asset.type)}
                </div>
                {asset.fileSize && (
                  <span className="text-xs text-muted-foreground">
                    {asset.fileSize}
                  </span>
                )}
              </div>

              {/* Asset Info */}
              <div className="mb-6">
                <h3 className="text-lg font-bold mb-2 group-hover:text-primary transition-colors">
                  {asset.name}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {asset.description}
                </p>
              </div>

              {/* Download Button */}
              <button className="luxury-button w-full inline-flex items-center justify-center gap-2 px-4 py-3 bg-primary text-primary-foreground font-medium rounded-lg hover:bg-primary/90 transition-all duration-300 hover:scale-105">
                <Download className="w-4 h-4" />
                Download
              </button>

              {/* Hover Line */}
              <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
            </div>
          ))}
        </div>

        {/* Contact Information */}
        <div className="text-center" data-testid="media-kit-contact">
          <div className="luxury-card inline-block bg-card border border-border rounded-xl p-8">
            <div className="flex items-center justify-center w-16 h-16 bg-primary/10 text-primary rounded-full mx-auto mb-6">
              <Mail className="w-8 h-8" />
            </div>
            
            <h3 className="text-xl font-bold mb-2">Media Inquiries</h3>
            <p className="text-muted-foreground mb-6 max-w-sm">
              For interviews, speaking engagements, or collaboration opportunities
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="mailto:media@kiminouknox.com"
                className="luxury-button inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground font-medium rounded-lg hover:bg-primary/90 transition-all duration-300 hover:scale-105"
              >
                <Mail className="w-4 h-4" />
                Contact Media Team
              </a>
              <a 
                href="#contact"
                className="inline-flex items-center gap-2 px-6 py-3 border border-border font-medium rounded-lg hover:bg-accent hover:text-accent-foreground transition-colors"
              >
                <ExternalLink className="w-4 h-4" />
                View Full Contact
              </a>
            </div>
          </div>
        </div>

        {/* Usage Guidelines */}
        <div className="mt-16 text-center text-sm text-muted-foreground">
          <p>
            All media assets are provided for editorial use. 
            Commercial use requires written permission. 
            Please credit "Kiminou Knox" in all publications.
          </p>
        </div>
      </div>
    </section>
  );
}