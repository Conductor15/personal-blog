import { AdminLayout } from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Save, Upload, Plus, Trash2 } from "lucide-react";
import { useState } from "react";

export default function AboutPageSettings() {
  const [beliefs, setBeliefs] = useState([
    { title: "Mindful Living", desc: "Being present in each moment and making intentional choices that align with our values." },
    { title: "Sustainable Beauty", desc: "Finding elegance in simplicity and choosing quality over quantity in all aspects of life." },
    { title: "Authentic Connection", desc: "Building genuine relationships and sharing stories that inspire and uplift others." },
  ]);

  return (
    <AdminLayout>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="font-heading text-2xl md:text-3xl font-semibold text-foreground">Trang About</h1>
          <p className="mt-1 text-muted-foreground text-sm md:text-base">Quản lý trang giới thiệu</p>
        </div>
        <Button className="gap-2 w-full sm:w-auto">
          <Save className="h-4 w-4" />
          Lưu thay đổi
        </Button>
      </div>

      <div className="max-w-4xl space-y-6">
        {/* Hero Section */}
        <div className="table-container p-4 md:p-6">
          <h2 className="font-heading text-lg font-semibold mb-6">Giới thiệu</h2>
          <div className="space-y-4">
            <div className="grid gap-2">
              <Label>Ảnh đại diện</Label>
              <div className="border-2 border-dashed border-border rounded-lg p-6 md:p-8 text-center hover:border-primary/50 transition-colors cursor-pointer max-w-sm">
                <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                <p className="text-sm text-muted-foreground">Upload ảnh đại diện</p>
                <p className="text-xs text-muted-foreground mt-1">Khuyến nghị: 600x800px</p>
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="sectionLabel">Label</Label>
              <Input id="sectionLabel" defaultValue="ABOUT ME" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="greeting">Lời chào</Label>
              <Input id="greeting" defaultValue="Hello, I'm Sarah" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="intro">Giới thiệu ngắn</Label>
              <Textarea 
                id="intro" 
                rows={3}
                defaultValue="Welcome to Venal, a space where I share stories about mindful living, travel adventures, and finding beauty in everyday moments."
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="story">Câu chuyện</Label>
              <Textarea 
                id="story" 
                rows={4}
                defaultValue="I started this blog as a creative outlet to document my journey towards a more intentional life. What began as personal notes has grown into a community of like-minded souls seeking balance and authenticity."
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="hobbies">Sở thích</Label>
              <Textarea 
                id="hobbies" 
                rows={3}
                defaultValue="When I'm not writing or creating content, you'll find me exploring local farmers markets, practicing yoga, or planning my next travel adventure. I believe in slow living, sustainable choices, and the power of small daily rituals."
              />
            </div>
          </div>
        </div>

        {/* Social Links */}
        <div className="table-container p-4 md:p-6">
          <h2 className="font-heading text-lg font-semibold mb-6">Liên kết mạng xã hội</h2>
          <div className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="instagram">Instagram</Label>
              <Input id="instagram" placeholder="https://instagram.com/username" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="youtube">YouTube</Label>
              <Input id="youtube" placeholder="https://youtube.com/@channel" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="hello@example.com" />
            </div>
          </div>
        </div>

        {/* What I Believe In */}
        <div className="table-container p-4 md:p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-heading text-lg font-semibold">What I Believe In</h2>
            <Button variant="outline" size="sm" className="gap-2">
              <Plus className="h-4 w-4" />
              <span className="hidden sm:inline">Thêm</span>
            </Button>
          </div>
          <div className="space-y-4">
            {beliefs.map((belief, index) => (
              <div key={index} className="p-4 bg-muted/30 rounded-lg">
                <div className="flex items-start justify-between gap-3 mb-3">
                  <Input defaultValue={belief.title} className="font-medium" />
                  <Button variant="ghost" size="icon" className="text-destructive hover:bg-destructive/10 flex-shrink-0">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
                <Textarea defaultValue={belief.desc} rows={2} />
              </div>
            ))}
          </div>
        </div>

        {/* Contact Form */}
        <div className="table-container p-4 md:p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-heading text-lg font-semibold">Form liên hệ</h2>
            <Switch defaultChecked />
          </div>
          <div className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="contactTitle">Tiêu đề</Label>
              <Input id="contactTitle" defaultValue="Let's Connect" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="contactDesc">Mô tả</Label>
              <Textarea 
                id="contactDesc" 
                rows={2}
                defaultValue="Have a question, collaboration idea, or just want to say hello? I'd love to hear from you."
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="contactEmail">Email nhận tin</Label>
              <Input id="contactEmail" type="email" placeholder="Nhập email để nhận form liên hệ" />
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
