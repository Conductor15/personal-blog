import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import YouTube from "./pages/YouTube";
import Donate from "./pages/Donate";
import About from "./pages/About";
import NotFound from "./pages/NotFound";
import AdminLogin from "./pages/admin/AdminLogin";
import Dashboard from "./pages/admin/DashBoard";
import Posts from "./pages/admin/Posts";
import Categories from "./pages/admin/Categories";
import Analytics from "./pages/admin/Analytics";
import Settings from "./pages/admin/Settings";
import AboutPageSettings from "./pages/admin/settings/AboutPageSettings";
import DonatePageSettings from "./pages/admin/settings/DonatePageSettings";
import YoutubePageSettings from "./pages/admin/settings/YoutubePageSettings";
import BlogPageSettings from "./pages/admin/settings/BlogPageSettings";
import HomePageSettings from "./pages/admin/settings/HomePageSettings";
import NewPost from "./pages/admin/NewPost";
import PostDetail from "./pages/admin/PostDetail";
import PostEdit from "./pages/admin/PostEdit";
import ProtectedAdminRoute from "./components/admin/ProtectedRoute";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>

          {/* ================= CLIENT ================= */}
          <Route path="/" element={<Index />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
          <Route path="/youtube" element={<YouTube />} />
          <Route path="/donate" element={<Donate />} />
          <Route path="/about" element={<About />} />

          {/* ================= ADMIN LOGIN ================= */}
          <Route path="/admin/login" element={<AdminLogin />} />

          {/* ================= ADMIN (PROTECTED) ================= */}
          <Route element={<ProtectedAdminRoute />}>
            <Route path="/admin" element={<Dashboard />} />
            <Route path="/admin/posts" element={<Posts />} />
            <Route path="/admin/posts/new" element={<NewPost />} />
            <Route path="/admin/posts/:slug" element={<PostDetail />} />
            <Route path="/admin/posts/:slug/edit" element={<PostEdit />} />
            <Route path="/admin/categories" element={<Categories />} />
            <Route path="/admin/analytics" element={<Analytics />} />
            <Route path="/admin/settings" element={<Settings />} />
            <Route path="/admin/settings/home" element={<HomePageSettings />} />
            <Route path="/admin/settings/blog" element={<BlogPageSettings />} />
            <Route path="/admin/settings/youtube" element={<YoutubePageSettings />} />
            <Route path="/admin/settings/donate" element={<DonatePageSettings />} />
            <Route path="/admin/settings/about" element={<AboutPageSettings />} />
          </Route>
          {/* ================= NOT FOUND ================= */}
          <Route path="*" element={<NotFound />} />


        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
