import { AdminLayout } from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArrowLeft, Save } from "lucide-react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { toast } from "@/hooks/use-toast";
import { RichTextEditor } from "@/components/admin/RichTextEditter";
import api from "@/lib/axios";
import { uploadImage } from "@/lib/uploadImage";


export default function PostEdit() {
  const {slug} = useParams();
  const [post, setPost] = useState(null);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const [thumbnailUrl, setThumbnailUrl] = useState<string | null>(import.meta.env.VITE_DEFAULT_IMG);
  const [uploading, setUploading] = useState(false);

  const [catList, setCatList] = useState([])
  const navigate = useNavigate()

  useEffect(()=> {
    if (!slug) return;

    const fetchPost = async () => {
      try {
        const res = await api.get(`/api/v1/posts/${slug}`)
        setPost(res.data);
      } catch (error) {
        toast({
          variant: "destructive",
          title: "Lỗi tải bài viết",
          description:
            error.response?.data?.message || "Có lỗi xảy ra, vui lòng thử lại",
        });
        // navigate("/admin/posts");
      }
    }
    fetchPost();
  },[slug])

  useEffect(() => {
    if (!post) return;

    setTitle(post.title || "");
    setDescription(post.description || "");
    setContent(post.content || "");
    setCategory(post.categoryId?._id || "");
    setThumbnailUrl(post.image || null);
  }, [post]);


  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await api.get("/api/v1/categories");
        setCatList(res.data);
      } catch (error: any) {
        console.error("Error fetching categories:", error);

        toast({
          variant: "destructive",
          title: "Lỗi tải danh mục",
          description:
            error.response?.data?.message || "Không thể tải danh mục",
        });
      }
    };

    fetchCategories();
  }, []);


  async function handleSubmit(publish: boolean) {
    if (!title || !content) {
      toast({
        variant: "destructive",
        title: "Thiếu thông tin",
        description: "Tiêu đề và nội dung không được để trống",
      });
      return;
    }

    const payload = {
      title,
      description,
      content,
      category,
      status: publish ? "published" : "draft",
      thumbnail: thumbnailUrl,
    };

    try {
      await api.patch(`/api/v1/posts/${slug}/edit`, payload);

      toast({
        title: publish ? "Xuất bản thành công" : "Lưu nháp thành công",
        description: publish
          ? "Bài viết đã được chỉnh sửa và xuất bản"
          : "Bạn có thể chỉnh sửa và đăng sau",
        className: "border-l-4 border-success",
      });

      navigate("/admin/posts")
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Sửa bài viết thất bại",
        description:
          error.response?.data?.message || "Có lỗi xảy ra, vui lòng thử lại",
      });
    }
  }


  return (
    <AdminLayout>
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-heading text-3xl font-semibold text-foreground">
            Chỉnh sửa bài viết
          </h1>
        </div>
        <Link to="/admin/posts">
          <Button variant="outline" className="gap-2">
            <ArrowLeft className="h-4 w-4" />
            Quay lại
          </Button>
        </Link>
      </div>

      {/* Form */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main content */}
        <div className="lg:col-span-2 space-y-6">
          <div className="stat-card space-y-4">
            <div>
              <label className="text-sm font-medium">Tiêu đề</label>
              <Input placeholder="Nhập tiêu đề bài viết..." 
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            <div>
              <label className="text-sm font-medium">Mô tả ngắn</label>
              <Textarea
                placeholder="Nhập mô tả..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />

            </div>

            <div>
              <label className="text-sm font-medium">Nội dung</label>
              <RichTextEditor
                  content={content}
                  onChange={setContent}
                  placeholder="Nhập nội dung bài viết..."
              />
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <div className="stat-card space-y-4">
            <div>
              <label className="text-sm font-medium">Danh mục</label>
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger>
                  <SelectValue placeholder="Chọn danh mục" />
                </SelectTrigger>
                <SelectContent>
                  {catList.map((cat) => (
                    <SelectItem key={cat._id} value={cat._id}>
                      {cat.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium">Ảnh đại diện</label>
              <Input type="file" 
                accept="image/*"
                onChange={async (e) => {
                const file = e.target.files?.[0];
                if (!file) {
                  return;
                };
                
                setUploading(true)
                const url = await uploadImage(file);
                setUploading(false)
                
                setThumbnailUrl(url);
              }}
              />

              {thumbnailUrl && (
                <img
                  src={thumbnailUrl}
                  alt="Thumbnail preview"
                  className="mt-2 w-full rounded-lg border"
                />
              )}

              {uploading && (
                <p className="text-sm text-muted-foreground">Đang upload ảnh...</p>
              )}

            </div>
          </div>

          <div className="flex gap-2">
            <Button className="flex-1 gap-2" onClick={() => handleSubmit(true)}>
              <Save className="h-4 w-4" />
              Xuất bản
            </Button>
            <Button variant="secondary" className="flex-1" onClick={() => handleSubmit(false)}>
              Lưu nháp
            </Button>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
