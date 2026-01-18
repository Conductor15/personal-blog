import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Play, ExternalLink } from "lucide-react";

const videos = [
  {
    id: 1,
    title: "Morning Routine for a Peaceful Day",
    description: "Start your day with intention and mindfulness. A complete guide to creating morning rituals.",
    thumbnail: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800&h=450&fit=crop",
    duration: "12:34",
    views: "45K",
  },
  {
    id: 2,
    title: "Minimalist Home Tour 2024",
    description: "Take a tour of my newly designed minimalist living space with sustainable furniture choices.",
    thumbnail: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=450&fit=crop",
    duration: "18:22",
    views: "128K",
  },
  {
    id: 3,
    title: "Travel Vlog: Hidden Gems of Portugal",
    description: "Exploring the beautiful coastal villages and authentic local cuisine of Portugal.",
    thumbnail: "https://images.unsplash.com/photo-1555881400-74d7acaacd8b?w=800&h=450&fit=crop",
    duration: "24:15",
    views: "89K",
  },
  {
    id: 4,
    title: "Plant-Based Recipes for Beginners",
    description: "Easy and delicious plant-based meals that anyone can make at home.",
    thumbnail: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&h=450&fit=crop",
    duration: "15:48",
    views: "67K",
  },
  {
    id: 5,
    title: "Capsule Wardrobe Essentials",
    description: "Building a timeless wardrobe with quality pieces that last for years.",
    thumbnail: "https://images.unsplash.com/photo-1558171813-4c088753af8f?w=800&h=450&fit=crop",
    duration: "20:11",
    views: "156K",
  },
  {
    id: 6,
    title: "Self-Care Sunday Rituals",
    description: "Weekly self-care practices for mental health and overall wellbeing.",
    thumbnail: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=800&h=450&fit=crop",
    duration: "16:30",
    views: "92K",
  },
];

const YouTube = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-24 md:pt-28">
        {/* Page Header */}
        <section className="py-12 md:py-16 border-b border-border">
          <div className="blog-container">
            <div className="text-center max-w-2xl mx-auto">
              <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-medium text-foreground mb-4">
                YouTube
              </h1>
              <p className="text-muted-foreground text-lg mb-6">
                Video content about lifestyle, study, travel, and mindful living.
              </p>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground text-sm uppercase tracking-[0.15em] font-medium rounded-full hover:opacity-90 transition-opacity"
              >
                Subscribe
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>
        </section>

        {/* Featured Video */}
        {/* <section className="py-12 md:py-16 bg-secondary/30">
          <div className="blog-container">
            <div className="grid lg:grid-cols-2 gap-8 items-center">
              <div className="relative group cursor-pointer image-zoom rounded-sm overflow-hidden">
                <img
                  src={videos[0].thumbnail}
                  alt={videos[0].title}
                  className="w-full aspect-video object-cover"
                />
                <div className="absolute inset-0 bg-foreground/20 flex items-center justify-center group-hover:bg-foreground/30 transition-colors">
                  <div className="w-16 h-16 md:w-20 md:h-20 bg-background/90 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Play className="w-6 h-6 md:w-8 md:h-8 text-foreground ml-1" fill="currentColor" />
                  </div>
                </div>
                <span className="absolute bottom-4 right-4 px-2 py-1 bg-foreground/80 text-background text-xs font-medium rounded">
                  {videos[0].duration}
                </span>
              </div>
              <div className="lg:py-4">
                <span className="category-label">Latest Video</span>
                <h2 className="font-serif text-2xl md:text-3xl lg:text-4xl font-medium text-foreground mt-3 mb-4">
                  {videos[0].title}
                </h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  {videos[0].description}
                </p>
                <span className="text-sm text-muted-foreground">{videos[0].views} views</span>
              </div>
            </div>
          </div>
        </section> */}

        {/* Video Grid */}
        {/* <section className="py-12 md:py-16">
          <div className="blog-container">
            <h2 className="font-serif text-2xl md:text-3xl font-medium text-foreground mb-8 md:mb-12">
              All Videos
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {videos.slice(1).map((video) => (
                <article key={video.id} className="group cursor-pointer">
                  <div className="relative image-zoom rounded-sm overflow-hidden mb-4">
                    <img
                      src={video.thumbnail}
                      alt={video.title}
                      className="w-full aspect-video object-cover"
                    />
                    <div className="absolute inset-0 bg-foreground/0 flex items-center justify-center group-hover:bg-foreground/20 transition-colors">
                      <div className="w-12 h-12 bg-background/90 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <Play className="w-5 h-5 text-foreground ml-0.5" fill="currentColor" />
                      </div>
                    </div>
                    <span className="absolute bottom-3 right-3 px-2 py-1 bg-foreground/80 text-background text-xs font-medium rounded">
                      {video.duration}
                    </span>
                  </div>
                  <h3 className="font-serif text-lg md:text-xl font-medium text-foreground group-hover:text-primary transition-colors mb-2">
                    {video.title}
                  </h3>
                  <p className="text-sm text-muted-foreground line-clamp-2 mb-2">
                    {video.description}
                  </p>
                  <span className="text-xs text-muted-foreground">{video.views} views</span>
                </article>
              ))}
            </div>
          </div>
        </section> */}
      </main>
      <Footer />
    </div>
  );
};

export default YouTube;
