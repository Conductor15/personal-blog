import { Link } from "react-router-dom";
import { Facebook, Instagram, Youtube } from "lucide-react";
import { useContext } from "react";
import { SiteContext } from "@/contexts/SiteContext";

const Footer = () => {
  const { site } = useContext(SiteContext);
  const year = new Date().getFullYear();

  return (
    <footer className="relative mt-24">

      {/* subtle gradient line */}
      <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-primary/40 to-transparent" />

      <div className="bg-secondary/40 backdrop-blur-sm">
        <div className="blog-container py-20">

          {/* Grid */}
          <div className="grid md:grid-cols-3 gap-12">

            {/* Brand */}
            <div>
              {site?.blogName && (
                <Link
                  to="/"
                  className="font-serif text-3xl font-medium tracking-tight"
                >
                  {site.blogName}
                </Link>
              )}

              <p className="mt-4 text-sm text-muted-foreground leading-relaxed max-w-sm">
                {site?.blogDescription || "Thoughts and reflections on intentional living, creativity, and personal growth."}
              </p>

              <p className="mt-6 text-xs italic text-muted-foreground/80">
                “Come for calm focus, stay for steady growth.”
              </p>
            </div>

            {/* Navigation */}
            <div>
              <h4 className="text-xs uppercase tracking-[0.25em] text-muted-foreground mb-6">
                Explore
              </h4>

              <nav className="flex flex-col gap-4 text-sm">
                <Link to="/about" className="hover:text-primary transition-colors">
                  About
                </Link>
                <Link to="/blog" className="hover:text-primary transition-colors">
                  Blog
                </Link>
                <Link to="/donate" className="hover:text-primary transition-colors">
                  Support
                </Link>
              </nav>
            </div>

            {/* Social */}
            <div>
              <h4 className="text-xs uppercase tracking-[0.25em] text-muted-foreground mb-6">
                Connect
              </h4>

              <div className="flex items-center gap-5 mb-6">
                {site?.facebookURL && (
                  <a
                    href={site.facebookURL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-full bg-background/60 hover:bg-primary/10 transition"
                  >
                    <Facebook className="w-4 h-4 text-muted-foreground hover:text-primary transition-colors" />
                  </a>
                )}

                {site?.instagramURL && (
                  <a
                    href={site.instagramURL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-full bg-background/60 hover:bg-primary/10 transition"
                  >
                    <Instagram className="w-4 h-4 text-muted-foreground hover:text-primary transition-colors" />
                  </a>
                )}

                {site?.youtubeURL && (
                  <a
                    href={site.youtubeURL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-full bg-background/60 hover:bg-primary/10 transition"
                  >
                    <Youtube className="w-4 h-4 text-muted-foreground hover:text-primary transition-colors" />
                  </a>
                )}
              </div>

              <p className="text-sm text-muted-foreground">
                Stay in touch for new reflections.
              </p>
            </div>
          </div>

          {/* Bottom */}
          <div className="mt-20 pt-8 border-t border-border text-center text-xs text-muted-foreground">
            © {year} {site?.blogName}. All rights reserved.
          </div>

        </div>
      </div>
    </footer>
  );
};

export default Footer;