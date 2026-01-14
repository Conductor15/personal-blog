import { 
  LayoutDashboard, 
  FileText, 
  FolderOpen, 
  BarChart3,
  Settings,
  LogOut,
  Menu,
  X,
  Home,
  Youtube,
  Heart,
  User
} from "lucide-react";
import { NavLink } from "@/components/NavLink";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { useLocation } from "react-router-dom";

const menuItems = [
  { title: "Dashboard", url: "/admin", icon: LayoutDashboard },
  { title: "Bài viết", url: "/admin/posts", icon: FileText },
  { title: "Danh mục", url: "/admin/categories", icon: FolderOpen },
  { title: "Thống kê", url: "/admin/analytics", icon: BarChart3 },
];

const pageSettings = [
  { title: "Trang chủ", url: "/admin/settings/home", icon: Home },
  { title: "Trang Blog", url: "/admin/settings/blog", icon: FileText },
  { title: "Trang YouTube", url: "/admin/settings/youtube", icon: Youtube },
  { title: "Trang Donate", url: "/admin/settings/donate", icon: Heart },
  { title: "Trang About", url: "/admin/settings/about", icon: User },
];

interface AdminSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AdminSidebar({ isOpen, onClose }: AdminSidebarProps) {
  const location = useLocation();
  const [showPageSettings, setShowPageSettings] = useState(
    location.pathname.startsWith('/admin/settings/')
  );

  // Close sidebar on route change for mobile
  useEffect(() => {
    onClose();
  }, [location.pathname]);

  return (
    <>
      {/* Overlay for mobile */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-foreground/20 backdrop-blur-sm z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      <aside 
        className={cn(
          "fixed left-0 top-0 z-50 h-screen bg-card border-r border-border transition-transform duration-300 w-64",
          "lg:translate-x-0",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between h-16 px-4 border-b border-border">
          <h1 className="font-heading text-xl font-semibold text-foreground tracking-wide">
            ADMIN
          </h1>
          <Button 
            variant="ghost" 
            size="icon"
            onClick={onClose}
            className="hover:bg-muted lg:hidden"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        {/* Navigation */}
        <nav className="flex flex-col gap-1 p-3 overflow-y-auto max-h-[calc(100vh-8rem)]">
          <p className="px-3 py-2 text-xs font-medium text-muted-foreground uppercase tracking-wider">
            Quản lý
          </p>
          {menuItems.map((item) => (
            <NavLink
              key={item.title}
              to={item.url}
              end={item.url === "/admin"}
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-muted-foreground transition-all duration-200 hover:bg-muted hover:text-foreground"
              activeClassName="bg-primary/10 text-primary font-medium hover:bg-primary/15"
            >
              <item.icon className="h-5 w-5 flex-shrink-0" />
              <span className="font-body text-sm">{item.title}</span>
            </NavLink>
          ))}

          {/* Settings Section */}
          <div className="mt-4">
            <button
              onClick={() => setShowPageSettings(!showPageSettings)}
              className="w-full flex items-center justify-between px-3 py-2 text-xs font-medium text-muted-foreground uppercase tracking-wider hover:text-foreground transition-colors"
            >
              <span>Cài đặt trang</span>
              <span className={cn(
                "transition-transform",
                showPageSettings ? "rotate-180" : ""
              )}>▼</span>
            </button>
            
            {showPageSettings && (
              <div className="mt-1 space-y-1">
                {pageSettings.map((item) => (
                  <NavLink
                    key={item.title}
                    to={item.url}
                    className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-muted-foreground transition-all duration-200 hover:bg-muted hover:text-foreground"
                    activeClassName="bg-primary/10 text-primary font-medium hover:bg-primary/15"
                  >
                    <item.icon className="h-4 w-4 flex-shrink-0" />
                    <span className="font-body text-sm">{item.title}</span>
                  </NavLink>
                ))}
              </div>
            )}
          </div>

          {/* General Settings */}
          <NavLink
            to="/admin/settings"
            end
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-muted-foreground transition-all duration-200 hover:bg-muted hover:text-foreground mt-2"
            activeClassName="bg-primary/10 text-primary font-medium hover:bg-primary/15"
          >
            <Settings className="h-5 w-5 flex-shrink-0" />
            <span className="font-body text-sm">Cài đặt chung</span>
          </NavLink>
        </nav>

        {/* Footer */}
        <div className="absolute bottom-4 left-0 right-0 px-3">
          <Button 
            variant="ghost" 
            className="w-full justify-start gap-3 text-muted-foreground hover:text-destructive hover:bg-destructive/10"
          >
            <LogOut className="h-5 w-5" />
            <span>Đăng xuất</span>
          </Button>
        </div>
      </aside>
    </>
  );
}

export function MobileHeader({ onMenuClick }: { onMenuClick: () => void }) {
  return (
    <header className="fixed top-0 left-0 right-0 z-30 h-14 bg-card border-b border-border flex items-center px-4 lg:hidden">
      <Button 
        variant="ghost" 
        size="icon"
        onClick={onMenuClick}
        className="hover:bg-muted"
      >
        <Menu className="h-5 w-5" />
      </Button>
      <h1 className="ml-3 font-heading text-lg font-semibold text-foreground">
        TRAN Admin
      </h1>
    </header>
  );
}
