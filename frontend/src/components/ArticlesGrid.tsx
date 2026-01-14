import { useEffect, useState } from "react";
import ArticleCard from "./ArticleCard";
import { articles } from "@/data/articles";

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

const ArticlesGrid = () => {
  const [posts, setPosts] = useState([]);
  useEffect(()=> {
    const fetchPosts = async () =>{
      try {
        const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/v1/posts/client?topViewed=3`);
        const data = await res.json()
        setPosts(data);

      } catch (error) {
        console.error("Error fetching:", error);
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
              id={article._id}
              image={article.image}
              category={article.categoryId.name}
              title={article.name}
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
