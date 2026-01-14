import featuredImage from "@/assets/featured-post.jpg";
import { ArrowRight } from "lucide-react";

const FeaturedPost = () => {
  return (
    <section className="py-16 md:py-24">
      <div className="blog-container">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          {/* Image */}
          <div className="image-zoom rounded-sm overflow-hidden">
            <img
              src={featuredImage}
              alt="Featured post"
              className="w-full aspect-[4/3] object-cover"
            />
          </div>

          {/* Content */}
          <div className="lg:py-8">
            <span className="category-label">Featured Story</span>
            <h2 className="article-title text-3xl md:text-4xl lg:text-5xl mt-4 mb-6 leading-tight">
              Life is a flower of which love is the honey.
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-8">
              When, while the lovely valley teems with vapour around me, and the meridian sun 
              strikes the upper surface of the impenetrable foliage of my trees.
            </p>
            <a
              href="#"
              className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:gap-3 transition-all uppercase tracking-widest"
            >
              Read More
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedPost;
