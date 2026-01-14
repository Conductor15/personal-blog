import { AdminLayout } from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Save, Upload, Plus, Trash2 } from "lucide-react";
import { useState } from "react";

export default function HomePageSettings() {
  const [categories, setCategories] = useState([
    { name: "Lifestyle", count: 12 },
    { name: "Nutrition", count: 58 },
    { name: "Fashion", count: 55 },
    { name: "Interior", count: 58 },
  ]);

  return (
    <AdminLayout>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="font-heading text-2xl md:text-3xl font-semibold text-foreground">Trang chủ</h1>
          <p className="mt-1 text-muted-foreground text-sm md:text-base">Quản lý nội dung trang chủ</p>
        </div>
        <Button className="gap-2 w-full sm:w-auto">
          <Save className="h-4 w-4" />
          Lưu thay đổi
        </Button>
      </div>

      <div className="max-w-4xl space-y-6">
        {/* Hero Section */}
        <div className="table-container p-4 md:p-6">
          <h2 className="font-heading text-lg font-semibold mb-6">Hero Section</h2>
          <div className="space-y-4">
            <div className="grid gap-2">
              <Label>Ảnh Hero</Label>
              <div className="border-2 border-dashed border-border rounded-lg p-6 md:p-8 text-center hover:border-primary/50 transition-colors cursor-pointer">
                <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                <p className="text-sm text-muted-foreground">Kéo thả hoặc click để upload ảnh</p>
                <p className="text-xs text-muted-foreground mt-1">Khuyến nghị: 1920x800px</p>
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="heroCategory">Danh mục</Label>
              <Input id="heroCategory" defaultValue="LIFESTYLE" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="heroTitle">Tiêu đề</Label>
              <Input id="heroTitle" defaultValue="Every strike brings me closer to the next" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="heroAuthor">Tác giả</Label>
                <Input id="heroAuthor" defaultValue="Nathan" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="heroDate">Ngày đăng</Label>
                <Input id="heroDate" type="date" defaultValue="2024-05-02" />
              </div>
            </div>
          </div>
        </div>

        {/* Featured Story */}
        <div className="table-container p-4 md:p-6">
          <h2 className="font-heading text-lg font-semibold mb-6">Featured Story</h2>
          <div className="space-y-4">
            <div className="grid gap-2">
              <Label>Ảnh Featured</Label>
              <div className="border-2 border-dashed border-border rounded-lg p-6 md:p-8 text-center hover:border-primary/50 transition-colors cursor-pointer">
                <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                <p className="text-sm text-muted-foreground">Kéo thả hoặc click để upload ảnh</p>
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="featuredTitle">Tiêu đề</Label>
              <Input id="featuredTitle" defaultValue="Life is a flower of which love is the honey." />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="featuredDesc">Mô tả</Label>
              <Textarea 
                id="featuredDesc" 
                rows={3}
                defaultValue="When, while the lovely valley teems with vapour around me, and the meridian sun strikes the upper surface of the impenetrable foliage of my trees."
              />
            </div>
          </div>
        </div>

        {/* Categories Grid */}
        <div className="table-container p-4 md:p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-heading text-lg font-semibold">Danh mục hiển thị</h2>
            <Button variant="outline" size="sm" className="gap-2">
              <Plus className="h-4 w-4" />
              <span className="hidden sm:inline">Thêm</span>
            </Button>
          </div>
          <div className="space-y-3">
            {categories.map((cat, index) => (
              <div key={index} className="flex items-center gap-3 p-3 bg-muted/30 rounded-lg">
                <div className="w-12 h-12 bg-muted rounded-lg flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <Input defaultValue={cat.name} className="mb-1 h-8" />
                  <p className="text-xs text-muted-foreground">{cat.count} bài viết</p>
                </div>
                <Button variant="ghost" size="icon" className="text-destructive hover:bg-destructive/10 flex-shrink-0">
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        </div>

        {/* Popular Stories Section */}
        <div className="table-container p-4 md:p-6">
          <h2 className="font-heading text-lg font-semibold mb-6">Popular Stories</h2>
          <div className="grid gap-2">
            <Label htmlFor="popularCount">Số bài viết hiển thị</Label>
            <Input id="popularCount" type="number" defaultValue="6" className="w-24" />
          </div>
          <p className="text-sm text-muted-foreground mt-2">
            Bài viết phổ biến sẽ được tự động chọn dựa trên lượt xem
          </p>
        </div>
      </div>
    </AdminLayout>
  );
}
