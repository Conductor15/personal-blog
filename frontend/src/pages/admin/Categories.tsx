import { AdminLayout } from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Edit, Trash2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

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


import { Label } from "@/components/ui/label";
import { useEffect, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { uploadImage } from "@/lib/uploadImage";
import api from "@/lib/axios";


export default function Categories() {
  const [name, setName] = useState("");
  const [image, setImage] = useState<string | null>(import.meta.env.VITE_DEFAULT_IMG);
  const [uploading, setUploading] = useState(false);
  const [categories,setCategory] = useState([]);
  const { toast } = useToast();
  const [open, setOpen] = useState(false);

  
  const toCloudinary16x9 = (url: string) =>
    url.replace("/upload/", "/upload/ar_16:9,c_fill,g_auto/");


  async function handleSubmit() {
    if (!name) {
      toast({
        variant: "destructive",
        title: "Thiếu thông tin",
        description: "Tên danh mục không được để trống",
      });
      return;
    }
    if (!image) {
      toast({
        variant: "destructive",
        title: "Thiếu thông tin",
        description: "Vui lòng upload thumbnail",
      });
      return;
    }

    const payload = {
      name,
      image
    };

    try {
      const res = await api.post("/api/v1/categories/create",payload);

      const { category } = res.data;

      toast({
        title: "Tạo category thành công",
        description: `Danh mục "${name}" đã được tạo.`,
        className: "border-l-4 border-success"
      });
  
      setCategory(prev => [...prev,category]);
      setOpen(false);
      setName("")
      setImage(import.meta.env.VITE_DEFAULT_IMG)
      return;  
    } catch (err) {
      console.error(err);
      toast({
        variant: "destructive",
        title: "Tạo category thất bại",
        description:
          err.response?.data?.message || "Có lỗi xảy ra, vui lòng thử lại",
      });
    }
  }
  
  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const res = await api.get("/api/v1/categories");
        setCategory(res.data);
      } catch (error) {
          console.error("Fetch categories error:", error);
      }
    }

    fetchCategory();
  }, []);

  const handleDelete = async (categorySlug : string, categoryName: string) => {
    try {
      await api.patch(`/api/v1/categories/${categorySlug}`);

      setCategory(prev => prev.filter(c => c.slug !== categorySlug));

      toast({
        title: "Đã xóa",
        description: `Danh mục "${categoryName}" đã được xóa.`,
        className: "border-l-4 border-success"
      });
    } catch (error) {
      // console.error(error);
      toast({
        variant: "destructive",
        title: "Xóa thất bại",
        description: error.response?.data?.message
      });
    }
  }

  const handleEdit = async (category : string) => {
    toast({
        variant: "destructive",
        title: "To be update",
        description: "Edit feature to be update"
      });
  }
  

  return (
    <AdminLayout>
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-heading text-3xl font-semibold text-foreground">Danh mục</h1>
          <p className="mt-1 text-muted-foreground">Quản lý các danh mục bài viết</p>
        </div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Thêm danh mục
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Thêm danh mục mới</DialogTitle>
              <DialogDescription>
                Tạo một danh mục mới để phân loại bài viết của bạn.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Tên danh mục</Label>
                <Input id="name" placeholder="Ví dụ: Love Story" 
                  value={name}
                  onChange={(e)=>setName(e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="image">Ảnh danh mục</Label>
                <Input
                  id="image"
                  type="file"
                  accept="image/*"
                  onChange={ async (e) => {
                    const file = e.target.files?.[0];
                    if (!file) return;

                    setUploading(true)
                    const url = await uploadImage(file);
                    setUploading(false)
                    setImage(url);
                  }}
                />

                {image && (
                  <img
                    src={toCloudinary16x9(image)}
                    alt="Thumbnail preview"
                    className="mt-2 w-full rounded-lg border"
                  />
                )}

                {uploading && (
                  <p className="text-sm text-muted-foreground">Đang upload ảnh...</p>
                )}
              </div>
            </div>
            <DialogFooter>
              <Button type="submit" onClick={() => handleSubmit()}>Tạo danh mục</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {categories.map((category) => (
          <div 
            key={category.slug} 
            className="table-container p-6 hover:shadow-md transition-shadow"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="badge-category badge-lifestyle">
                {category.name}
              </div>
              <div className="flex items-center gap-1">
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-8 w-8 hover:text-primary"
                  onClick={() => handleEdit(category)}
                >
                  <Edit className="h-4 w-4" />
                </Button>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8 hover:text-destructive">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Xác nhận xóa</AlertDialogTitle>
                      <AlertDialogDescription>
                        Bạn có chắc chắn muốn xóa danh mục "{category.name}"? Hành động này không thể hoàn tác.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Hủy</AlertDialogCancel>
                      <AlertDialogAction onClick={() => handleDelete(category.slug, category.name)}>
                        Xóa
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </div>
            <div className="space-y-1">
              <p className="text-2xl font-heading font-semibold text-foreground">
                {category.postCount}
              </p>
              <p className="text-sm text-muted-foreground">bài viết</p>
            </div>
            <div className="mt-4 pt-4 border-t border-border">
              <p className="text-sm text-muted-foreground">
                Slug: <span className="text-foreground font-mono">{category.slug}</span>
              </p>
            </div>
          </div>
        ))}
      </div>
    </AdminLayout>
  );
}
