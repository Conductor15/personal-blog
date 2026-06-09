import api from "@/lib/axios";
import { formatDate } from "@/lib/formatDate";
import { useEffect, useState } from "react";
import { toast } from "@/hooks/use-toast";
import { Link } from "react-router-dom";
import { ArrowRight, CalendarDays } from "lucide-react";

const HeroSection = () => {
  const [post, setPost] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await api.get("/api/v1/posts/client", {
          params: {
            page: 1,
            limit: 1,
          },
        });

        setPost(res.data.data[0]);
      } catch (error) {
        toast({
          variant: "destructive",
          title: "Load article failed",
          description:
            error.response?.data?.message || "Something went wrong. Please try again.",
        });
      }
    };

    fetchPosts();
  }, []);

  if (!post) {
    return (
      <section className="relative pt-24 md:pt-28">
        <div className="blog-container">
          <div className="grid min-h-[520px] items-center gap-10 lg:grid-cols-[0.9fr_1.1fr]">
            <div className="space-y-5">
              <div className="h-4 w-32 animate-pulse rounded-full bg-muted" />
              <div className="h-12 w-4/5 animate-pulse rounded bg-muted" />
              <div className="h-12 w-3/5 animate-pulse rounded bg-muted" />
              <div className="h-4 w-full max-w-md animate-pulse rounded bg-muted" />
              <div className="h-4 w-5/6 max-w-md animate-pulse rounded bg-muted" />
            </div>
            <div className="aspect-video w-full max-w-2xl animate-pulse rounded-sm bg-muted lg:ml-auto" />
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="relative overflow-hidden pt-24 md:pt-28">
      <div className="blog-container">
        <div className="grid min-h-[520px] items-center gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <div className="animate-fade-in-up">
            <span className="category-label">The Latest</span>
            <h1 className="article-title mt-5 max-w-2xl text-4xl md:text-5xl lg:text-6xl">
              {post.title}
            </h1>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg">
              {post.description}
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
              <span className="inline-flex items-center gap-2">
                <CalendarDays className="h-4 w-4 text-primary" />
                {formatDate(post.createdAt)}
              </span>
              <span className="h-1 w-1 rounded-full bg-border" />
              <span>{post.categoryId?.name}</span>
            </div>

            <Link
              to={`/blog/${post.slug}`}
              className="group mt-9 inline-flex items-center gap-3 rounded-full bg-primary px-6 py-3 text-sm font-medium uppercase tracking-[0.15em] text-primary-foreground transition-all duration-300 hover:bg-primary/90 hover:gap-4"
            >
              Read more
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>

          <Link
            to={`/blog/${post.slug}`}
            className="group relative block animate-fade-in"
            aria-label={`Read ${post.title}`}
          >
            <div className="relative ml-auto w-full max-w-2xl overflow-hidden rounded-sm bg-muted shadow-soft">
              <img
                src={post.image}
                alt={post.title}
                className="aspect-video w-full object-cover transition duration-700 group-hover:scale-105"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-foreground/20 via-transparent to-transparent opacity-70 transition-opacity duration-500 group-hover:opacity-40" />
            </div>
          </Link>
        </div>
        <div className="mt-14 h-px w-full bg-border/70 md:mt-16" />
      </div>
    </section>
  );
};

export default HeroSection;
