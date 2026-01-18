import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import FeaturedPost from "@/components/FeaturedPost";
import CategoriesSection from "@/components/CategoriesSection";
import ArticlesGrid from "@/components/ArticlesGrid";
import Footer from "@/components/Footer";


const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        <FeaturedPost />
        <CategoriesSection />
        <ArticlesGrid />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
