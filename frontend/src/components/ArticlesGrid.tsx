import { useEffect, useState } from "react";
import ArticleCard from "./ArticleCard";
import { formatDate } from "@/lib/formatDate";
import api from "@/lib/axios";
import { toast } from "@/hooks/use-toast";


const ArticlesGrid = () => {
  const [posts, setPosts] = useState([]);
  useEffect(()=> {
    const fetchPosts = async () =>{
      try {
        const res = await api.get("/api/v1/posts/client?topViewed=3")
        setPosts(res.data);

      } catch (error) {
        toast({
          variant: "destructive",
          title: "Lỗi tải bài viết",
          description:
            error.response?.data?.message || "Có lỗi xảy ra, vui lòng thử lại",
        });
      }
    };

    fetchPosts();
  },[])


  return (
    <section className="py-16 md:py-24">
      <div className="blog-container">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <span className="inline-block px-4 py-2 text-xs uppercase tracking-[0.2em] font-medium text-foreground border border-border rounded-full">
            Popular Stories
          </span>
        </div>

        {/* Articles Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
          {posts.map((article) => (
            <ArticleCard 
              key={article._id}
              slug={article.slug}
              image={article.image}
              category={article.categoryId?.name}
              title={article.title}
              author="Tran"
              date={formatDate(article.createdAt)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ArticlesGrid;
