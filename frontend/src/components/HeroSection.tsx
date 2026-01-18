import api from "@/lib/axios";
import { formatDate } from "@/lib/formatDate";
import { useEffect, useState } from "react";
import { toast } from "@/hooks/use-toast";


const HeroSection = () => {
  const [post,setPost] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await api.get('/api/v1/posts/client')
        setPost(res.data[0]);
      } catch (error) {
        toast({
          variant: "destructive",
          title: "Lỗi tải bài viết",
          description:
            error.response?.data?.message || "Có lỗi xảy ra, vui lòng thử lại",
        });
      }
    }

    fetchPosts();
  }, []);

  if (!post) {
    return <div className="pt-20 text-center">Loading...</div>;
  }


  return (
    <section className="relative pt-20 md:pt-24">
      <div className="blog-container">
        <div className="relative aspect-[3/4] md:aspect-[4/3] lg:aspect-[16/9] overflow-hidden">
          <img
            src={post.image}
            alt="Featured story"
            className="w-full h-full object-cover"
          />
          
          {/* Overlay Card */}
          <div className="absolute bottom-6 left-6 right-6 md:bottom-12 md:left-12 md:right-auto md:max-w-md bg-background/95 backdrop-blur-sm p-6 md:p-8">
            <span className="category-label">{post.category}</span>
            <h1 className="article-title text-2xl md:text-3xl lg:text-4xl mt-3 mb-4">
              {post.title}
            </h1>
            <p className="article-meta">
              By Tran / {formatDate(post.createdAt)}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
