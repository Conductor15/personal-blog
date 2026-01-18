import { AdminLayout } from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus, Search, Edit, Trash2, Eye, MoreHorizontal } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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



export default function Posts() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [postList, setPostList] = useState([]);
  const [categoryList, setCategoryList] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");


  //Search query
  const filteredPosts = postList.filter(post => {
    const matchesSearch = searchQuery === "" || 
      post.title.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesCategory = categoryFilter === "all" || 
      post.categoryId?._id.toLowerCase() === categoryFilter.toLowerCase();

    const matchesStatus = statusFilter === "all" || 
      post.status === statusFilter;

    return matchesSearch && matchesCategory && matchesStatus;
  });
  //End search query

  useEffect(()=>{
    const postListFetch = async () => {
      try {
        const res = await api.get("/api/v1/posts/admin")
        setPostList(res.data);
      } catch (error) {
        console.error("Error fetching:", error);
      }
    };
    const categoryListFetch = async () => {
      try {
        const res = await api.get("/api/v1/categories")
        setCategoryList(res.data);
      } catch (error) {
        console.error("Error fetching:", error);
      }
    };
    postListFetch();
    categoryListFetch();
  },[])

  const handleDelete = async (postSlug: string, postTitle: string) => {
    try {
      await api.patch(`/api/v1/posts/${postSlug}`)

      setPostList(prev => prev.filter((p: any) => p.slug !== postSlug));

      toast({
        title: "Đã xóa bài viết",
        description: `Bài viết "${postTitle}" đã được xóa thành công.`,
      });
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
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-heading text-3xl font-semibold text-foreground">Bài viết</h1>
          <p className="mt-1 text-muted-foreground">Quản lý tất cả bài viết của bạn</p>
        </div>
        <Link to="/admin/posts/new">
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            Tạo bài viết
          </Button>
        </Link>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Tìm kiếm bài viết..." 
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Select value={categoryFilter} onValueChange={setCategoryFilter}>
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="Danh mục" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tất cả danh mục</SelectItem>
            {categoryList.map((category)=> (
              <SelectItem key={category._id} value={category._id}>
                {category.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-full sm:w-[150px]">
            <SelectValue placeholder="Trạng thái" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tất cả</SelectItem>
            <SelectItem value="published">Đã xuất bản</SelectItem>
            <SelectItem value="draft">Bản nháp</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Posts Grid */}
      <div className="grid gap-4">
        {filteredPosts.length === 0 ? (
          <div className="text-center py-12 text-muted-foreground">
            <p>Không tìm thấy bài viết nào phù hợp.</p>
          </div>
        ) : filteredPosts.map((post) => (
          <div 
            key={post._id} 
            className="table-container p-4 flex flex-col sm:flex-row items-start sm:items-center gap-4 hover:shadow-md transition-shadow"
          >
            <img 
              src={post.image} 
              alt={post.title}
              className="w-full sm:w-16 h-32 sm:h-16 rounded-lg object-cover flex-shrink-0"
            />
            <div className="flex-1 min-w-0 w-full">
              <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-1">
                <h3 className="font-medium text-foreground truncate">{post.title}</h3>
                <span className="badge-category badge-lifestyle">
                  {post.categoryId?.name}
                </span>
              </div>
              <p className="text-sm text-muted-foreground line-clamp-1">{post.description}</p>
              <div className="flex flex-wrap items-center gap-2 sm:gap-4 mt-2 text-xs text-muted-foreground">
                <span>{formatDate(post.createdAt)}</span>
                <span>{post.views.toLocaleString()} lượt xem</span>
                <Badge variant={post.status === "published" ? "default" : "secondary"} className="text-xs">
                  {post.status === "published" ? "Đã xuất bản" : "Bản nháp"}
                </Badge>
              </div>
            </div>
            <div className="flex items-center gap-1 flex-shrink-0 w-full sm:w-auto justify-end">
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-9 w-9 hover:text-primary"
                onClick={() => navigate(`/admin/posts/${post.slug}`)}
              >
                <Eye className="h-4 w-4" />
              </Button>
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-9 w-9 hover:text-primary"
                onClick={() => navigate(`/admin/posts/${post.slug}/edit`)}
              >
                <Edit className="h-4 w-4" />
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-9 w-9">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>Duplicate</DropdownMenuItem>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <DropdownMenuItem 
                        className="text-destructive"
                        onSelect={(e) => e.preventDefault()}
                      >
                        <Trash2 className="h-4 w-4 mr-2" />
                        Xóa
                      </DropdownMenuItem>
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
                        <AlertDialogAction onClick={() => handleDelete(post.slug, post.title)}>
                          Xóa
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        ))}
      </div>
    </AdminLayout>
  );
}
