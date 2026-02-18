import {useEffect, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ArticleCard from "@/components/ArticleCard";
import { formatDate } from "@/lib/formatDate";
import api from "@/lib/axios";
import { toast } from "@/hooks/use-toast";
import PageTransition from "@/components/PageTransition";
import PageTitle from "@/components/PageTitle";


const Blog = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const [categories, setCategories] = useState([]);

  const [posts,setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const LIMIT = 6;

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const res = await api.get("/api/v1/categories");
        setCategories(res.data);
      } catch (error) {
        toast({
          variant: "destructive",
          title: "Tải danh mục thất bại",
          description:
            error.response?.data?.message || "Có lỗi xảy ra",
        });
      }
    };

    fetchCategory();
  }, []);

  const fetchPosts = async (pageNumber = 1, categoryId = activeCategory) => {
      try {
        const res = await api.get("/api/v1/posts/client", {
          params: {
            page: pageNumber,
            limit: LIMIT,
            categoryId: categoryId !== "all" ? categoryId : undefined,
          },
        });

        if (pageNumber === 1) {
          setPosts(res.data.data);
        } else {
          setPosts(prev => [...prev, ...res.data.data]);
        }

        setHasMore(res.data.pagination.hasMore);
      } catch (error) {
        toast({
          variant: "destructive",
          title: "Tải bài viết thất bại",
          description:
            error.response?.data?.message || "Có lỗi xảy ra",
        });
      }
    };


  useEffect(()=> {
    setPage(1);
    fetchPosts(1);
  },[activeCategory])


  const handleLoadMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    fetchPosts(nextPage);
  };

  const handleCategoryChange = (categoryId: string) => {
    setActiveCategory(categoryId);
    setPage(1);
  };

  return (
    <>
      <PageTitle title="Blog" />
      <PageTransition>
        <div className="min-h-screen bg-background">
          <Header />
          <main className="pt-24 md:pt-28">
            {/* Page Header */}
            <section className="py-12 md:py-16 border-b border-border">
              <div className="blog-container">
                <div className="text-center max-w-2xl mx-auto">
                  <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-medium text-foreground mb-4">
                    Slow Growth
                  </h1>
                  <p className="text-muted-foreground text-lg">
                    Productivity without burnout. Minimalism without emptiness. Stories on growing quietly.
                  </p>
                </div>
              </div>
            </section>

            {/* Filter Tags */}
            <section className="py-8 border-b border-border">
              <div className="blog-container">
                <div className="flex flex-wrap items-center justify-center gap-3">
                  <button
                    onClick={() => handleCategoryChange("all")}
                    className={`px-4 py-2 text-xs uppercase tracking-[0.15em] font-medium rounded-full transition-colors ${
                      activeCategory === "all"
                        ? "bg-primary text-primary-foreground"
                        : "bg-secondary text-secondary-foreground hover:bg-primary hover:text-primary-foreground"
                    }`}
                  >
                    All
                  </button>
                  {categories.map((category) => (
                    <button
                      key={category.slug}
                      onClick={() => handleCategoryChange(category._id)}
                      className={`px-4 py-2 text-xs uppercase tracking-[0.15em] font-medium rounded-full transition-colors ${
                        category._id === activeCategory
                          ? "bg-primary text-primary-foreground"
                          : "bg-secondary text-secondary-foreground hover:bg-primary hover:text-primary-foreground"
                      }`}
                    >
                      {category.name}
                    </button>
                  ))}
                </div>
              </div>
            </section>

            {/* Articles Grid */}
            <section className="py-12 md:py-16">
              <div className="blog-container">
                {posts.length > 0 ? (
                  <>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
                      {posts.map((post) => (
                        <ArticleCard
                          key={post._id}
                          slug={post.slug}
                          image={post.image}
                          category={post.categoryId?.name}
                          title={post.title}
                          author="Tran"
                          date={formatDate(post.createdAt)}
                        />
                      ))}
                    </div>

                    {/* Load More */}
                    {hasMore && (
                      <div className="text-center mt-12 md:mt-16">
                        <button
                          onClick={handleLoadMore}
                          className="px-8 py-3 text-sm uppercase tracking-[0.15em] font-medium border border-border rounded-full hover:bg-secondary transition-colors"
                        >
                          Load More
                        </button>
                      </div>
                    )}
                  </>
                ) : (
                  <div className="text-center py-12">
                    <p className="text-muted-foreground">No posts found in this category.</p>
                  </div>
                )}
              </div>
            </section>
          </main>
          <Footer />
        </div>

      </PageTransition>
    </>
  );
};

export default Blog;
