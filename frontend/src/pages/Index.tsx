import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import FeaturedPost from "@/components/FeaturedPost";
import CategoriesSection from "@/components/CategoriesSection";
import ArticlesGrid from "@/components/ArticlesGrid";
import Footer from "@/components/Footer";
import PageTransition from "@/components/PageTransition";
import PageTitle from "@/components/PageTitle";

const Index = () => {

  return (
    <>
      <PageTitle title="" />
      <PageTransition>
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
      </PageTransition>
    </>
  );
};

export default Index;
