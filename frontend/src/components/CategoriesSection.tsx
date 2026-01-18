import CategoryCard from "./CategoryCard";
import { useEffect, useState } from "react";
import api from "@/lib/axios";
import { toast } from "@/hooks/use-toast";


const CategoriesSection = () => {
  const [categories,setCategories] = useState([]);

  useEffect(()=> {
    const fetchCategory = async () =>{
      try {
        const res = await api.get("/api/v1/categories");
        setCategories(Array.isArray(res.data.data) ? res.data.data : []);

      } catch (error) {
        toast({
          variant: "destructive",
          title: "Lỗi tải danh mục",
          description:
            error.response?.data?.message || "Có lỗi xảy ra, vui lòng thử lại",
        });
      }
    };

    fetchCategory();
  },[])

  return (
    <section className="py-12 md:py-16 bg-secondary/50">
      <div className="blog-container">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {categories.map((category) => (
            <CategoryCard key={category.slug} image={category.image} title={category.name} count={category.postCount} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoriesSection;
