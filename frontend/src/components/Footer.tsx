import { Link } from "react-router-dom";
import { Facebook, Instagram } from "lucide-react";
import { useEffect, useState } from "react";
import api from "@/lib/axios";

const Footer = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await api.get(`/api/v1/users/${import.meta.env.VITE_USER_ID}`);
        setUser(res.data);
      } catch (error) {
        console.error("Fetch user failed", error);
      }
    };

    fetchUser();
  }, []);

  return (
    <footer className="py-12 md:py-16 border-t border-border">
      <div className="blog-container">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo */}
          {user?.blogName && 
            <Link to="/" className="font-serif text-2xl font-medium tracking-tight text-foreground">
              {user.blogName}
            </Link>
          }

          {/* Links */}
          <nav className="flex items-center gap-6 md:gap-8">
            <Link to="/about" className="text-sm text-muted-foreground hover:text-foreground">
              About
            </Link>
            <Link to="/blog" className="text-sm text-muted-foreground hover:text-foreground">
              Blog
            </Link>
            <Link to="/donate" className="text-sm text-muted-foreground hover:text-foreground">
              Support
            </Link>
          </nav>

          {/* Social */}
          <div className="flex items-center gap-4">
            {user?.facebookURL && (
              <a
                href={user.facebookURL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground"
              >
                <Facebook className="w-5 h-5" />
              </a>
            )}

            {user?.instagramURL && (
              <a
                href={user.instagramURL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground"
              >
                <Instagram className="w-5 h-5" />
              </a>
            )}
          </div>
        </div>

        <div className="text-center mt-8 pt-8 border-t border-border">
          <p className="text-sm text-muted-foreground">
            © 2026 Conductor15. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
