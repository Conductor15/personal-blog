import { AdminLayout } from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
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
  const [blogTitle, setBlogTitle] = useState("");
  const [blogDescription, setBlogDescription] = useState("");
  const [workingOn, setWorkingOn] = useState([]);
  const [blogIconUrl, setBlogIconUrl] = useState<string | null>(null);
  

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await api.get(`/api/v1/users/${import.meta.env.VITE_USER_ID}`);
        setUser(res.data);
        setThumbnailUrl(res.data.avatar || import.meta.env.VITE_DEFAULT_IMG);
        setBlogIconUrl(res.data.blogIcon || null);
        setBlogName(res.data.blogName || "");
        setAbout(res.data.about || "");
        setYoutubeURL(res.data.youtubeURL || "");
        setInstagramURL(res.data.instagramURL || "");
        setFacebookURL(res.data.facebookURL || "");
        setFeaturePostSlug(res.data.featurePostSlug || "");
        setBlogTitle(res.data.blogTitle || "");
        setBlogDescription(res.data.blogDescription || "");
        setWorkingOn(res.data.workingOn || []);
      } catch (error) {
        console.error("Fetch user failed", error);
      }
    };

    const fetchPost = async () => {
      try {
        const res = await api.get(`/api/v1/posts/client`);
        setPosts(res.data.data);
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
        blogTitle,
        blogDescription,
        blogName,
        about,
        avatar: thumbnailUrl,
        youtubeURL,
        instagramURL,
        facebookURL,
        featurePostSlug,
        workingOn,
        blogIcon: blogIconUrl,
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

      <div className="max-w-4xl space-y-10">

        {/* BRANDING */}
        <div className="table-container p-8 space-y-6">
          <h2 className="font-heading text-xl font-semibold">Branding</h2>

          <div className="grid md:grid-cols-3 gap-8">
            
            {/* Avatar */}
            <div className="space-y-3">
              <Label>Avatar</Label>
              <Input
                type="file"
                accept="image/*"
                onChange={async (e) => {
                  const file = e.target.files?.[0];
                  if (!file) return;
                  setUploading(true);
                  const url = await uploadImage(file);
                  setUploading(false);
                  setThumbnailUrl(url);
                }}
              />

              {thumbnailUrl && (
                <img
                  src={thumbnailUrl}
                  alt="Avatar"
                  className="rounded-xl border w-full aspect-square object-cover"
                />
              )}
            </div>

            <div className="space-y-3">
              <Label>Blog Icon (favicon)</Label>

              <Input
                type="file"
                accept="image/*"
                onChange={async (e) => {
                  const file = e.target.files?.[0];
                  if (!file) return;

                  setUploading(true);
                  const url = await uploadImage(file);
                  setUploading(false);

                  setBlogIconUrl(url);
                }}
              />

              {blogIconUrl && (
                <img
                  src={blogIconUrl}
                  alt="Blog Icon"
                  className="w-16 h-16 rounded-md border object-cover"
                />
              )}
            </div>

            {/* Blog Info */}
            <div className="md:col-span-2 space-y-4">
              <div className="grid gap-2">
                <Label>Blog Title</Label>
                <Input value={blogTitle} onChange={(e) => setBlogTitle(e.target.value)} />
              </div>

              <div className="grid gap-2">
                <Label>Blog Description (SEO)</Label>
                <Textarea
                  rows={3}
                  value={blogDescription}
                  onChange={(e) => setBlogDescription(e.target.value)}
                />
              </div>

              <div className="grid gap-2">
                <Label>Display Name</Label>
                <Input value={blogName} onChange={(e) => setBlogName(e.target.value)} />
              </div>
            </div>
          </div>
        </div>


        {/* CONTENT */}
        <div className="table-container p-8 space-y-6">
          <h2 className="font-heading text-xl font-semibold">Content Settings</h2>

          <div className="space-y-6">

            {/* Featured */}
            <div className="grid gap-2">
              <Label>Featured Post</Label>
              <select
                value={featurePostSlug}
                onChange={(e) => setFeaturePostSlug(e.target.value)}
                className="h-10 rounded-md border border-input bg-background px-3 text-sm"
              >
                <option value="">— Select post —</option>
                {posts?.map((post) => (
                  <option key={post.slug} value={post.slug}>
                    {post.title}
                  </option>
                ))}
              </select>
            </div>

            {/* Working On */}
            <div className="space-y-4">
              <Label>Working On</Label>

              {workingOn.map((item, index) => (
                <div key={index} className="border rounded-xl p-4 space-y-3 bg-muted/30">
                  <Input
                    value={item.title}
                    placeholder="Title"
                    onChange={(e) => {
                      const updated = [...workingOn];
                      updated[index].title = e.target.value;
                      setWorkingOn(updated);
                    }}
                  />
                  <Textarea
                    rows={2}
                    value={item.description}
                    placeholder="Description"
                    onChange={(e) => {
                      const updated = [...workingOn];
                      updated[index].description = e.target.value;
                      setWorkingOn(updated);
                    }}
                  />
                </div>
              ))}
            </div>

          </div>
        </div>


        {/* ABOUT */}
        <div className="table-container p-8 space-y-6">
          <h2 className="font-heading text-xl font-semibold">About</h2>

          <Textarea
            rows={8}
            value={about}
            onChange={(e) => setAbout(e.target.value)}
          />
        </div>


        {/* SOCIAL */}
        <div className="table-container p-8 space-y-6">
          <h2 className="font-heading text-xl font-semibold">Social Links</h2>

          <div className="grid md:grid-cols-3 gap-6">
            <Input
              placeholder="YouTube URL"
              value={youtubeURL}
              onChange={(e) => setYoutubeURL(e.target.value)}
            />
            <Input
              placeholder="Instagram URL"
              value={instagramURL}
              onChange={(e) => setInstagramURL(e.target.value)}
            />
            <Input
              placeholder="Facebook URL"
              value={facebookURL}
              onChange={(e) => setFacebookURL(e.target.value)}
            />
          </div>
        </div>

      </div>
    </AdminLayout>
  );
}
