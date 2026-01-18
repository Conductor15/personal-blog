import featuredImage from "@/assets/featured-post.jpg";
import api from "@/lib/axios";
import { ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";

const FeaturedPost = () => {
  const [user, setUser] = useState(null);
  const [featuredPost, setFeaturedPost] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await api.get(
          `/api/v1/users/${import.meta.env.VITE_USER_ID}`
        );
        setUser(res.data);
      } catch (error) {
        console.error("Fetch user failed", error);
      }
    };

    fetchUser();

  }, []);

  // console.log(user)

  useEffect(() => {
    if (!user?.featurePostSlug) return;

    const fetchPost = async () => {
      try {
        const res = await api.get(
          `/api/v1/posts/client/${user.featurePostSlug}`
        );
        setFeaturedPost(res.data);
      } catch (error) {
        console.error("Fetch post failed", error);
      }
    };

    fetchPost();
  }, [user]);


  if (!featuredPost) {
    return <div className="h-[400px] animate-pulse bg-muted rounded-md" />;
  }

  return (
    <section className="py-16 md:py-24">
      <div className="blog-container">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          {/* Image */}
          <div className="image-zoom rounded-sm overflow-hidden">
            <img
              src={featuredPost.image}
              alt="Featured post"
              className="w-full aspect-[4/3] object-cover"
            />
          </div>

          {/* Content */}
          <div className="lg:py-8">
            <span className="category-label">Featured Story</span>
            <h2 className="article-title text-3xl md:text-4xl lg:text-5xl mt-4 mb-6 leading-tight">
              {featuredPost.title}
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-8">
              {featuredPost.description}
            </p>
            <a
              href={`/blog/${featuredPost.slug}`}
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
