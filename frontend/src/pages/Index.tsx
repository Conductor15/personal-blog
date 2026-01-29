import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import FeaturedPost from "@/components/FeaturedPost";
import CategoriesSection from "@/components/CategoriesSection";
import ArticlesGrid from "@/components/ArticlesGrid";
import Footer from "@/components/Footer";
import PageTransition from "@/components/PageTransition";
import { Helmet } from 'react-helmet-async';

const Index = () => {

  return (
    <>
      <Helmet>
        <title>{`Home - Tran's Space`}</title>
      </Helmet>
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
