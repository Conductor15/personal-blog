import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Edit, Trash2, Eye } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "@/lib/axios";


export function RecentPosts() {

  const [postList, setPostList] = useState([]);
  const navigate = useNavigate();

  useEffect(()=> {
    const fetchPost = async () => {
      try {
        const res = await api.get("/api/v1/posts/admin");
        setPostList(res.data);
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
