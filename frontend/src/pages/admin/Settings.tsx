import { AdminLayout } from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Save } from "lucide-react";
import { useEffect, useState } from "react";
import api from "@/lib/axios";
import { uploadImage } from "@/lib/uploadImage";
import { toast } from "@/hooks/use-toast";

export default function Settings() {
  const [user, setUser] = useState(null);
  const [blogName, setBlogName] = useState("");
  const [about, setAbout] = useState("");
  const [youtubeURL, setYoutubeURL] = useState("");
  const [instagramURL, setInstagramURL] = useState("");
  const [facebookURL, setFacebookURL] = useState("");
  const [featurePostSlug, setFeaturePostSlug] = useState("");
  const [posts, setPosts] = useState(null);
  

  const [thumbnailUrl, setThumbnailUrl] = useState<string | null>(import.meta.env.VITE_DEFAULT_IMG);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await api.get(`/api/v1/users/${import.meta.env.VITE_USER_ID}`);
        setUser(res.data);
        setThumbnailUrl(res.data.avatar || import.meta.env.VITE_DEFAULT_IMG);
        setBlogName(res.data.blogName || "");
        setAbout(res.data.about || "");
        setYoutubeURL(res.data.youtubeURL || "");
        setInstagramURL(res.data.instagramURL || "");
        setFacebookURL(res.data.facebookURL || "");
        setFeaturePostSlug(res.data.featurePostSlug || "");
      } catch (error) {
        console.error("Fetch user failed", error);
      }
    };

    const fetchPost = async () => {
      try {
        const res = await api.get(`/api/v1/posts/client`);
        setPosts(res.data);
      } catch (error) {
        console.error("Fetch posts failed", error);
      }
    };

    fetchUser();
    fetchPost();
  }, []);

  

  const handleSubmit = async () => {
    try {
      const payload = {
        blogName,
        about,
        avatar: thumbnailUrl,
        youtubeURL,
        instagramURL,
        facebookURL,
        featurePostSlug
      }
      // console.log(payload);
      // return;
      await api.patch(`/api/v1/users/${import.meta.env.VITE_USER_ID}/edit`,payload);

      toast({
        title: "Đã lưu thành công",
        description: "Thông tin đã được cập nhật",
        className: "border-l-4 border-success"
      });

    } catch (error) {
      console.error("Save failed", error);
      alert("Lưu thất bại");
    }
  };
  
  return (
    <AdminLayout>
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-heading text-3xl font-semibold text-foreground">Cài đặt</h1>
          <p className="mt-1 text-muted-foreground">Quản lý cấu hình blog của bạn</p>
        </div>
        <Button className="gap-2" onClick={handleSubmit} disabled={uploading}>
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
              <Input
                id="blogName"
                value={blogName}
                onChange={(e) => setBlogName(e.target.value)}
              />
            </div>
            {/* <div className="grid gap-2">
              <Label htmlFor="tagline">Tagline</Label>
              <Input 
                id="tagline" 
                defaultValue="Stories about lifestyle, travel, fashion, and finding beauty in everyday moments." 
              />
            </div> */}
            <div className="grid gap-2">
              <Label htmlFor="description">Mô tả</Label>
              <Textarea
                id="description"
                rows={10}
                value={about}
                onChange={(e) => setAbout(e.target.value)}
              />
            </div>


            <div className="grid gap-2">
              <Label htmlFor="featurePost">Bài viết nổi bật</Label>

              <select
                id="featurePost"
                value={featurePostSlug}
                onChange={(e) => setFeaturePostSlug(e.target.value)}
                className="h-10 rounded-md border border-input bg-background px-3 text-sm"
              >
                <option value="">— Lựa chọn —</option>

                {posts?.map((post) => (
                  <option key={post.slug} value={post.slug}>
                    {post.title}
                  </option>
                ))}
              </select>

              {featurePostSlug && (
                <p className="text-sm text-muted-foreground">
                  Slug: <code>{featurePostSlug}</code>
                </p>
              )}
            </div>


            <div className="grid gap-2">
              <Label htmlFor="avatar">Ảnh đại diện</Label>
                <Input type="file" 
                  accept="image/*"
                  onChange={async (e) => {
                  const file = e.target.files?.[0];
                  if (!file) {
                    return;
                  };

                  setUploading(true);
                  const url = await uploadImage(file);
                  setUploading(false);

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
        </div>

        <Separator />

        {/* Social Links */}
        <div className="table-container p-6">
          <h2 className="font-heading text-lg font-semibold mb-6">Liên kết mạng xã hội</h2>
          <div className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="youtube">YouTube URL</Label>
              <Input 
                id="youtube"
                value={youtubeURL}
                onChange={(e) => setYoutubeURL(e.target.value)}
              />
              
            </div>
            <div className="grid gap-2">
              <Label htmlFor="instagram">Instagram URL</Label>
              <Input 
                id="instagram"
                value={instagramURL}
                onChange={(e) => setInstagramURL(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="facebook">Facebook URL</Label>
              <Input 
                id="facebook"
                value={facebookURL}
                onChange={(e) => setFacebookURL(e.target.value)}
              />
            </div>
          </div>
        </div>

        <Separator />
      </div>
    </AdminLayout>
  );
}
