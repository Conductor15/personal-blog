import { AdminLayout } from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Save } from "lucide-react";

export default function BlogPageSettings() {
  return (
    <AdminLayout>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="font-heading text-2xl md:text-3xl font-semibold text-foreground">Trang Blog</h1>
          <p className="mt-1 text-muted-foreground text-sm md:text-base">Quản lý nội dung trang danh sách bài viết</p>
        </div>
        <Button className="gap-2 w-full sm:w-auto">
          <Save className="h-4 w-4" />
          Lưu thay đổi
        </Button>
      </div>

      <div className="max-w-4xl space-y-6">
        {/* Page Header */}
        <div className="table-container p-4 md:p-6">
          <h2 className="font-heading text-lg font-semibold mb-6">Header trang</h2>
          <div className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="pageTitle">Tiêu đề trang</Label>
              <Input id="pageTitle" defaultValue="Blog" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="pageDesc">Mô tả</Label>
              <Textarea 
                id="pageDesc" 
                rows={2}
                defaultValue="Stories about lifestyle, travel, fashion, and finding beauty in everyday moments."
              />
            </div>
          </div>
        </div>

        {/* Filter Categories */}
        <div className="table-container p-4 md:p-6">
          <h2 className="font-heading text-lg font-semibold mb-6">Bộ lọc danh mục</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label>Hiển thị "All"</Label>
                <p className="text-sm text-muted-foreground">Hiển thị nút xem tất cả bài viết</p>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="space-y-2">
              <Label>Danh mục hiển thị trong filter</Label>
              <div className="flex flex-wrap gap-2">
                {["Lifestyle", "Travel", "Fashion", "Nutrition", "Interior", "Wellness"].map((cat) => (
                  <label key={cat} className="flex items-center gap-2 px-3 py-2 bg-muted/30 rounded-lg cursor-pointer hover:bg-muted/50 transition-colors">
                    <input type="checkbox" defaultChecked className="rounded border-border" />
                    <span className="text-sm">{cat}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Display Settings */}
        <div className="table-container p-4 md:p-6">
          <h2 className="font-heading text-lg font-semibold mb-6">Cài đặt hiển thị</h2>
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="postsPerPage">Số bài viết / trang</Label>
                <Input id="postsPerPage" type="number" defaultValue="6" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="gridCols">Số cột (desktop)</Label>
                <Input id="gridCols" type="number" defaultValue="3" min="2" max="4" />
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Label>Hiển thị ngày đăng</Label>
                <p className="text-sm text-muted-foreground">Hiển thị ngày dưới mỗi bài viết</p>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Label>Hiển thị tác giả</Label>
                <p className="text-sm text-muted-foreground">Hiển thị tên tác giả</p>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Label>Nút "Load More"</Label>
                <p className="text-sm text-muted-foreground">Sử dụng Load More thay vì phân trang</p>
              </div>
              <Switch defaultChecked />
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
