import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Search, X } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { articles, searchArticles, Article } from "@/data/articles";
import api from "@/lib/axios";

interface SearchDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const SearchDialog = ({ open, onOpenChange }: SearchDialogProps) => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!open) return;

    const controller = new AbortController();

    const fetchSearch = async () => {
      setLoading(true);
      try {
        let url = "/api/v1/posts/client";

        if (query.trim()) {
          url += `?search=${encodeURIComponent(query)}`;
        } else {
          url += "?limit=10";
        }

        const res = await api.get(url, {
          signal: controller.signal,
        });

        setResults(res.data);
      } catch (err) {
        if (err.name !== "AbortError") {
          console.error(err);
        }
      } finally {
        setLoading(false);
      }
    };

    const timeout = setTimeout(fetchSearch, 300); // debounce 300ms

    return () => {
      clearTimeout(timeout);
      controller.abort();
    };

    }, [query,open]);

  useEffect(() => {
    if (!open) {
      setQuery("");
    }
  }, [open]);

  const handleArticleClick = (slug: string) => {
    onOpenChange(false);
    navigate(`/blog/${slug}`);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl p-0 gap-0 bg-background border-border overflow-hidden [&>button]:hidden">
        {/* Search Input */}
        <div className="flex items-center border-b border-border px-4">
          <Search className="w-5 h-5 text-muted-foreground shrink-0" />
          <input
            type="text"
            placeholder="Search articles..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 h-14 px-4 bg-transparent text-foreground placeholder:text-muted-foreground focus:outline-none font-sans"
            autoFocus
          />
          {query && (
            <button
              onClick={() => setQuery("")}
              className="p-1 text-muted-foreground hover:text-foreground transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Results */}
        <div className="max-h-[400px] overflow-y-auto">
          {loading && (
            <div className="py-8 text-center text-muted-foreground text-sm">
              Searching...
            </div>
          )}

          {!loading && results.length === 0 && query && (
            <div className="py-12 text-center">
              <p className="text-muted-foreground">
                No articles found for "{query}"
              </p>
            </div>
          )}

          {!loading && results.length > 0 && (
            <div className="py-2">
              <p className="px-4 py-2 text-xs uppercase tracking-[0.15em] text-muted-foreground font-medium">
                {query ? `${results.length} result${results.length !== 1 ? 's' : ''}` : 'Recent Articles'}
              </p>
              {results.map((article) => (
                <button
                  key={article._id}
                  onClick={() => handleArticleClick(article.slug)}
                  className="w-full flex items-start gap-4 px-4 py-3 hover:bg-secondary/50 transition-colors text-left"
                >
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-16 h-12 object-cover rounded shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <span className="text-xs uppercase tracking-[0.1em] text-primary font-medium">
                      {article.categoryId?.name}
                    </span>
                    <h4 className="font-serif text-sm md:text-base text-foreground line-clamp-1 mt-0.5">
                      {article.title}
                    </h4>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      By Tran
                    </p>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="border-t border-border px-4 py-3 flex items-center justify-between text-xs text-muted-foreground">
          <span>Press ESC to close</span>
          <span>⌘K to search anytime</span>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SearchDialog;
