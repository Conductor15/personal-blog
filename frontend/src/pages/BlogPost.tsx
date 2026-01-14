import { useParams, Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Clock, Calendar, User, Share2, Facebook, Twitter } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ArticleCard from "@/components/ArticleCard";
import { getArticleById, articles } from "@/data/articles";
import { useEffect, useState } from "react";


function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState(null);
  useEffect(()=> {
    const fetchPost = async () =>{
      try {
        const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/v1/posts/client/${slug}`);
        const data = await res.json()
        setPost(data);

      } catch (error) {
        console.error("Error fetching:", error);
      }
    };
    fetchPost();
  },[])
  const navigate = useNavigate();

  if (!post) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-24 md:pt-28">
          <div className="blog-container py-24 text-center">
            <h1 className="font-serif text-4xl text-foreground mb-4">Article Not Found</h1>
            <p className="text-muted-foreground mb-8">The article you're looking for doesn't exist.</p>
            <Link
              to="/blog"
              className="inline-flex items-center gap-2 text-primary hover:underline"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Blog
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // Get related articles (same category, excluding current)
  // const relatedArticles = articles
  //   .filter(a => a.category === article.category && a.id !== article.id)
  //   .slice(0, 3);
  const relatedArticles = post;

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-24 md:pt-28">
        {/* Back Button */}
        <div className="blog-container py-6">
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors text-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </button>
        </div>

        {/* Article Header */}
        <article className="blog-container">
          <header className="max-w-3xl mx-auto text-center mb-8 md:mb-12">
            <span className="category-label">{post.categoryId?.name}</span>
            <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl font-medium text-foreground mt-4 mb-6 leading-tight">
              {post.title}
            </h1>
            <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6 text-sm text-muted-foreground">
              <span className="flex items-center gap-2">
                <User className="w-4 h-4" />
                Tran
              </span>
              <span className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                {formatDate(post.createdAt)}
              </span>
              {/* <span className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                {post.readTime}
              </span> */}
            </div>
          </header>

          {/* Featured Image */}
          <div className="max-w-4xl mx-auto mb-10 md:mb-16">
            <img
              src={post.image}
              alt={post.title}
              className="w-full aspect-[16/9] object-cover rounded-sm"
            />
          </div>

          {/* Article Content */}
          <div className="max-w-2xl mx-auto">
            <div 
                className="max-w-none 
                  [&_h1]:text-3xl [&_h1]:font-bold [&_h1]:mb-4 [&_h1]:mt-6
                  [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:mb-3 [&_h2]:mt-5
                  [&_h3]:text-xl [&_h3]:font-semibold [&_h3]:mb-2 [&_h3]:mt-4
                  [&_p]:mb-3 [&_p]:leading-relaxed
                  [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:mb-3
                  [&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:mb-3
                  [&_li]:mb-1
                  [&_blockquote]:border-l-4 [&_blockquote]:border-muted-foreground/30 [&_blockquote]:pl-4 [&_blockquote]:italic [&_blockquote]:my-4
                  [&_code]:bg-muted [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:rounded [&_code]:text-sm [&_code]:font-mono
                  [&_hr]:border-border [&_hr]:my-6"
                dangerouslySetInnerHTML={{ __html: post.content }}
              />

            {/* Share Section */}
            <div className="border-t border-b border-border py-8 mt-12 mb-12">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground uppercase tracking-[0.1em]">Share this article</span>
                <div className="flex items-center gap-4">
                  <button className="p-2 text-muted-foreground hover:text-foreground transition-colors">
                    <Facebook className="w-5 h-5" />
                  </button>
                  <button className="p-2 text-muted-foreground hover:text-foreground transition-colors">
                    <Twitter className="w-5 h-5" />
                  </button>
                  <button className="p-2 text-muted-foreground hover:text-foreground transition-colors">
                    <Share2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Author Box */}
            <div className="bg-secondary/30 rounded-sm p-6 md:p-8 mb-12">
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                  <span className="font-serif text-2xl text-primary">Tran</span>
                </div>
                <div>
                  <h4 className="font-serif text-lg text-foreground mb-2">Written by Tran</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    A passionate writer exploring life's beautiful moments through words. Follow along for more stories about lifestyle, travel, and finding joy in everyday life.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </article>

        {/* Related Articles */}
        {relatedArticles.length > 0 && (
          <section className="py-12 md:py-16 border-t border-border">
            <div className="blog-container">
              <h2 className="font-serif text-2xl md:text-3xl text-foreground text-center mb-10">
                Related Articles
              </h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {relatedArticles.map((article) => (
                  <ArticleCard
                    key={article._id}
                    slug={article.slug}
                    image={article.image}
                    category={article.categoryId?.name}
                    title={article.title}
                    author="Tran"
                    date={article.createdAt}
                  />
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default BlogPost;
