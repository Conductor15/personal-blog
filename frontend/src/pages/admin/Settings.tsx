import { AdminLayout } from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Save } from "lucide-react";

export default function Settings() {
  return (
    <AdminLayout>
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-heading text-3xl font-semibold text-foreground">Cài đặt</h1>
          <p className="mt-1 text-muted-foreground">Quản lý cấu hình blog của bạn</p>
        </div>
        <Button className="gap-2">
          <Save className="h-4 w-4" />
          Lưu thay đổi
        </Button>
      </div>

      <div className="max-w-2xl space-y-8">
        {/* General Settings */}
        <div className="table-container p-6">
          <h2 className="font-heading text-lg font-semibold mb-6">Thông tin chung</h2>
          <div className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="blogName">Tên Blog</Label>
              <Input id="blogName" defaultValue="TRAN" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="tagline">Tagline</Label>
              <Input 
                id="tagline" 
                defaultValue="Stories about lifestyle, travel, fashion, and finding beauty in everyday moments." 
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="description">Mô tả</Label>
              <Textarea 
                id="description" 
                rows={4}
                defaultValue="A personal blog sharing stories and insights about lifestyle, travel, fashion, nutrition, wellness, and interior design."
              />
            </div>
          </div>
        </div>

        <Separator />

        {/* Social Links */}
        <div className="table-container p-6">
          <h2 className="font-heading text-lg font-semibold mb-6">Liên kết mạng xã hội</h2>
          <div className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="youtube">YouTube URL</Label>
              <Input id="youtube" placeholder="https://youtube.com/@yourchanel" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="instagram">Instagram URL</Label>
              <Input id="instagram" placeholder="https://instagram.com/yourusername" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="twitter">Twitter/X URL</Label>
              <Input id="twitter" placeholder="https://x.com/yourusername" />
            </div>
          </div>
        </div>

        <Separator />

        {/* Preferences */}
        <div className="table-container p-6">
          <h2 className="font-heading text-lg font-semibold mb-6">Tùy chọn</h2>
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="comments">Cho phép bình luận</Label>
                <p className="text-sm text-muted-foreground">Người đọc có thể bình luận trên bài viết</p>
              </div>
              <Switch id="comments" defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="newsletter">Đăng ký nhận tin</Label>
                <p className="text-sm text-muted-foreground">Hiển thị form đăng ký newsletter</p>
              </div>
              <Switch id="newsletter" defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="analytics">Google Analytics</Label>
                <p className="text-sm text-muted-foreground">Bật theo dõi Google Analytics</p>
              </div>
              <Switch id="analytics" />
            </div>
          </div>
        </div>

        <Separator />

        {/* Danger Zone */}
        <div className="table-container p-6 border-destructive/20">
          <h2 className="font-heading text-lg font-semibold text-destructive mb-4">Vùng nguy hiểm</h2>
          <p className="text-sm text-muted-foreground mb-4">
            Một khi bạn xóa blog, tất cả dữ liệu sẽ bị mất vĩnh viễn. Hãy cân nhắc kỹ.
          </p>
          <Button variant="destructive">Xóa toàn bộ dữ liệu</Button>
        </div>
      </div>
    </AdminLayout>
  );
}
