import { AdminLayout } from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Edit, Trash2, Eye, Calendar, BarChart3 } from "lucide-react";
import { Link, useParams, useNavigate } from "react-router-dom";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useToast } from "@/hooks/use-toast";
import { useEffect, useState } from "react";
import { formatDate } from "@/lib/formatDate";
import api from "@/lib/axios";



export default function PostDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [post, setPost] = useState(null);

  useEffect(()=>{
    const postFetch = async () => {
      try {
        const res = await api.get(`/api/v1/posts/${slug}`)
        setPost(res.data);
      } catch (error) {
        console.error("Error fetching:", error);
      }
    };
    postFetch();

  },[])

  if (!post) {
    return (
      <AdminLayout>
        <div className="flex flex-col items-center justify-center py-16">
          <h1 className="text-2xl font-semibold text-foreground mb-4">Không tìm thấy bài viết</h1>
          <Link to="/admin/posts">
            <Button variant="outline">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Quay lại danh sách
            </Button>
          </Link>
        </div>
      </AdminLayout>
    );
  }

  const handleDelete = async () => {
    try {
      await api.patch(`/api/v1/posts/${post.slug}`)

      toast({
        title: "Đã xóa bài viết",
        description: `Bài viết "${post.title}" đã được xóa thành công.`,
      });

      navigate("/admin/posts");
    } catch (error) {
      console.error(error);
      toast({
        variant: "destructive",
        title: "Xóa thất bại",
        description: "Không thể xóa bài viết. Vui lòng thử lại.",
      });
    }
  };

  return (
    <AdminLayout>
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
        <div className="flex items-center gap-4">
          <Link to="/admin/posts">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <div>
            <h1 className="font-heading text-2xl sm:text-3xl font-semibold text-foreground">Chi tiết bài viết</h1>
            <p className="mt-1 text-muted-foreground">Xem thông tin bài viết</p>
          </div>
        </div>
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Link to={`/admin/posts/${post.slug}/edit`} className="flex-1 sm:flex-none">
            <Button variant="outline" className="gap-2 w-full">
              <Edit className="h-4 w-4" />
              Chỉnh sửa
            </Button>
          </Link>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive" className="gap-2 flex-1 sm:flex-none">
                <Trash2 className="h-4 w-4" />
                Xóa
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Xác nhận xóa bài viết?</AlertDialogTitle>
                <AlertDialogDescription>
                  Bài viết "{post.title}" sẽ bị xóa vĩnh viễn. Hành động này không thể hoàn tác.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Hủy</AlertDialogCancel>
                <AlertDialogAction onClick={handleDelete}>Xóa</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>

      {/* Post Content */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          <div className="table-container overflow-hidden">
            <img 
              src={post.image} 
              alt={post.title}
              className="w-full h-48 sm:h-64 object-cover"
            />
            <div className="p-4 sm:p-6">
              <div className="flex flex-wrap items-center gap-3 mb-4">
                <span className="badge-category badge-lifestyle">
                  {post.categoryId?.name}
                </span>
                <Badge variant={post.status === "published" ? "default" : "secondary"}>
                  {post.status === "published" ? "Đã xuất bản" : "Bản nháp"}
                </Badge>
              </div>
              <h2 className="font-heading text-xl sm:text-2xl font-semibold text-foreground mb-4">
                {post.title}
              </h2>
              <p className="text-muted-foreground mb-6">{post.description}</p>
              <div 
                className="max-w-none 
                  [&_h1]:text-3xl [&_h1]:font-bold [&_h1]:mb-4 [&_h1]:mt-6
                  [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:mb-3 [&_h2]:mt-5
                  [&_h3]:text-xl [&_h3]:font-semibold [&_h3]:mb-2 [&_h3]:mt-4
                  [&_p]:mb-3 [&_p]:leading-relaxed
                  [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:mb-3
                  [&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:mb-3
                  [&_li]:mb-1
                  [&_blockquote]:border-l-4 [&_blockquote]:border-muted-foreground/30 [&_blockquote]:pl-4 [&_blockquote]:italic [&_blockquote]:my-4
                  [&_code]:bg-muted [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:rounded [&_code]:text-sm [&_code]:font-mono
                  [&_hr]:border-border [&_hr]:my-6"
                dangerouslySetInnerHTML={{ __html: post.content }}
              />
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <div className="table-container p-4 sm:p-6">
            <h3 className="font-heading text-lg font-semibold text-foreground mb-4">Thông tin</h3>
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-sm">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span className="text-muted-foreground">Ngày đăng:</span>
                <span className="text-foreground">{formatDate(post.createdAt)}</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Eye className="h-4 w-4 text-muted-foreground" />
                <span className="text-muted-foreground">Lượt xem:</span>
                <span className="text-foreground">{post.views.toLocaleString()}</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <BarChart3 className="h-4 w-4 text-muted-foreground" />
                <span className="text-muted-foreground">Trạng thái:</span>
                <span className="text-foreground">
                  {post.status === "published" ? "Đã xuất bản" : "Bản nháp"}
                </span>
              </div>
            </div>
          </div>

          <div className="table-container p-4 sm:p-6">
            <h3 className="font-heading text-lg font-semibold text-foreground mb-4">Thao tác nhanh</h3>
            <div className="space-y-2">
              <Link to={`/admin/posts/${post.slug}/edit`} className="block">
                <Button variant="outline" className="w-full justify-start gap-2">
                  <Edit className="h-4 w-4" />
                  Chỉnh sửa bài viết
                </Button>
              </Link>
              <Link to={`/blog/${post.slug}`} className="block">
                <Button variant="outline" className="w-full justify-start gap-2">
                  <Eye className="h-4 w-4" />
                  Xem trên blog
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
