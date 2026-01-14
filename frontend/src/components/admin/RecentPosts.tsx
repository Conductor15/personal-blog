import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Edit, Trash2, Eye } from "lucide-react";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface Post {
  id: number;
  title: string;
  category: string;
  status: "published" | "draft";
  date: string;
  views: number;
}

const posts: Post[] = [
  { id: 1, title: "Every strike brings me closer to the next", category: "Lifestyle", status: "published", date: "2024-01-05", views: 1234 },
  { id: 2, title: "Life is a flower of which love is the honey", category: "Wellness", status: "published", date: "2024-01-04", views: 856 },
  { id: 3, title: "Sheets containing Ipsum passages & more", category: "Travel", status: "draft", date: "2024-01-03", views: 0 },
  { id: 4, title: "Finding beauty in everyday moments", category: "Fashion", status: "published", date: "2024-01-02", views: 2341 },
  { id: 5, title: "The art of mindful living", category: "Nutrition", status: "published", date: "2024-01-01", views: 567 },
];

const categoryColors: Record<string, string> = {
  Lifestyle: "badge-lifestyle",
  Wellness: "badge-wellness",
  Travel: "badge-travel",
  Fashion: "badge-fashion",
  Nutrition: "badge-nutrition",
  Interior: "badge-interior",
};

export function RecentPosts() {

  const [postList, setPostList] = useState([]);
  const navigate = useNavigate();

  useEffect(()=> {
    const fetchPost = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/v1/posts/admin`);
        const data = await res.json();
        setPostList(data);
      } catch (error) {
         console.error("Error fetching:", error);
      }
    }

    fetchPost();
  }, [])

  

  return (
    <div className="table-container">
      <div className="p-6 border-b border-border">
        <h2 className="font-heading text-xl font-semibold">Bài viết gần đây</h2>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border bg-muted/30">
              <th className="text-left py-4 px-6 text-sm font-medium text-muted-foreground">Tiêu đề</th>
              <th className="text-left py-4 px-6 text-sm font-medium text-muted-foreground">Danh mục</th>
              <th className="text-left py-4 px-6 text-sm font-medium text-muted-foreground">Trạng thái</th>
              <th className="text-left py-4 px-6 text-sm font-medium text-muted-foreground">Lượt xem</th>
              <th className="text-left py-4 px-6 text-sm font-medium text-muted-foreground">Ngày</th>
              <th className="text-right py-4 px-6 text-sm font-medium text-muted-foreground">Hành động</th>
            </tr>
          </thead>
          <tbody>
            {postList.map((post) => (
              <tr key={post._id} className="border-b border-border last:border-0 hover:bg-muted/20 transition-colors">
                <td className="py-4 px-6">
                  <p className="font-medium text-foreground line-clamp-1">{post.title}</p>
                </td>
                <td className="py-4 px-6">
                  <span className="badge-category badge-lifestyle">
                    {post.categoryId?.name}
                  </span>
                </td>
                <td className="py-4 px-6">
                  <Badge variant={post.status === "published" ? "default" : "secondary"}>
                    {post.status === "published" ? "Đã xuất bản" : "Bản nháp"}
                  </Badge>
                </td>
                <td className="py-4 px-6 text-muted-foreground">
                  {post.views.toLocaleString()}
                </td>
                <td className="py-4 px-6 text-muted-foreground text-sm">
                  {new Date(post.createdAt).toLocaleDateString('vi-VN')}
                </td>
                <td className="py-4 px-6">
                  <div className="flex items-center justify-end gap-1">
                    <Button variant="ghost" size="icon" className="h-8 w-8 hover:text-primary"
                      onClick={() => navigate(`/admin/posts/${post.slug}`)}
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8 hover:text-primary"
                      onClick={() => navigate(`/admin/posts/${post.slug}/edit`)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>

                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
