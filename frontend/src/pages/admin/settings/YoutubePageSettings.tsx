import { AdminLayout } from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Save, Plus, Trash2, GripVertical } from "lucide-react";
import { useState } from "react";

export default function YoutubePageSettings() {
  const [videos, setVideos] = useState([
    { title: "Minimalist Home Tour 2024", views: "128K", duration: "18:22" },
    { title: "Travel Vlog: Hidden Gems of Portugal", views: "89K", duration: "24:15" },
    { title: "Plant-Based Recipes for Beginners", views: "67K", duration: "15:48" },
  ]);

  return (
    <AdminLayout>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="font-heading text-2xl md:text-3xl font-semibold text-foreground">Trang YouTube</h1>
          <p className="mt-1 text-muted-foreground text-sm md:text-base">Quản lý nội dung trang video</p>
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
              <Input id="pageTitle" defaultValue="YouTube" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="pageDesc">Mô tả</Label>
              <Textarea 
                id="pageDesc" 
                rows={2}
                defaultValue="Video content about lifestyle, travel, and mindful living."
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="subscribeUrl">Link Subscribe</Label>
              <Input id="subscribeUrl" placeholder="https://youtube.com/@yourchannel?sub_confirmation=1" />
            </div>
          </div>
        </div>

        {/* Latest Video */}
        <div className="table-container p-4 md:p-6">
          <h2 className="font-heading text-lg font-semibold mb-6">Video nổi bật</h2>
          <div className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="latestLabel">Label</Label>
              <Input id="latestLabel" defaultValue="LATEST VIDEO" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="latestTitle">Tiêu đề video</Label>
              <Input id="latestTitle" defaultValue="Morning Routine for a Peaceful Day" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="latestDesc">Mô tả</Label>
              <Textarea 
                id="latestDesc" 
                rows={2}
                defaultValue="Start your day with intention and mindfulness. A complete guide to creating morning rituals."
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="latestViews">Lượt xem</Label>
                <Input id="latestViews" defaultValue="45K views" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="latestDuration">Thời lượng</Label>
                <Input id="latestDuration" defaultValue="12:34" />
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="latestUrl">YouTube URL</Label>
              <Input id="latestUrl" placeholder="https://youtube.com/watch?v=..." />
            </div>
          </div>
        </div>

        {/* All Videos */}
        <div className="table-container p-4 md:p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-heading text-lg font-semibold">Danh sách video</h2>
            <Button variant="outline" size="sm" className="gap-2">
              <Plus className="h-4 w-4" />
              <span className="hidden sm:inline">Thêm video</span>
            </Button>
          </div>
          <div className="space-y-3">
            {videos.map((video, index) => (
              <div key={index} className="flex items-center gap-3 p-3 bg-muted/30 rounded-lg">
                <GripVertical className="h-5 w-5 text-muted-foreground cursor-grab hidden sm:block" />
                <div className="w-16 h-12 bg-muted rounded flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <Input defaultValue={video.title} className="mb-1 h-8 text-sm" />
                  <div className="flex gap-3 text-xs text-muted-foreground">
                    <span>{video.views}</span>
                    <span>{video.duration}</span>
                  </div>
                </div>
                <Button variant="ghost" size="icon" className="text-destructive hover:bg-destructive/10 flex-shrink-0">
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        </div>

        {/* Display Settings */}
        <div className="table-container p-4 md:p-6">
          <h2 className="font-heading text-lg font-semibold mb-6">Cài đặt hiển thị</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label>Hiển thị lượt xem</Label>
                <p className="text-sm text-muted-foreground">Hiển thị số lượt xem của video</p>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Label>Hiển thị thời lượng</Label>
                <p className="text-sm text-muted-foreground">Hiển thị độ dài video</p>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Label>Hiển thị mô tả</Label>
                <p className="text-sm text-muted-foreground">Hiển thị mô tả ngắn dưới tiêu đề</p>
              </div>
              <Switch defaultChecked />
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
