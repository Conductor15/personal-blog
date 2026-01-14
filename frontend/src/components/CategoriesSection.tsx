import CategoryCard from "./CategoryCard";
import lifestyleImg from "@/assets/article-lifestyle.jpg";
import nutritionImg from "@/assets/article-nutrition.jpg";
import fashionImg from "@/assets/article-fashion.jpg";
import interiorImg from "@/assets/article-interior.jpg";
import { useEffect, useState } from "react";


const CategoriesSection = () => {
  const [categories,setCategories] = useState([]);

  useEffect(()=> {
    const fetchCategory = async () =>{
      try {
        const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/v1/categories`);
        const data = await res.json()
        setCategories(data);

      } catch (error) {
        console.error("Error fetching:", error);
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
