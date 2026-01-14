import { AdminLayout } from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Save, Upload } from "lucide-react";

export default function DonatePageSettings() {
  return (
    <AdminLayout>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="font-heading text-2xl md:text-3xl font-semibold text-foreground">Trang Donate</h1>
          <p className="mt-1 text-muted-foreground text-sm md:text-base">Quản lý trang ủng hộ</p>
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
              <Input id="pageTitle" defaultValue="Support My Work" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="pageDesc">Mô tả</Label>
              <Textarea 
                id="pageDesc" 
                rows={3}
                defaultValue="Your support helps me create more content about mindful living, travel stories, and beautiful everyday moments. Every contribution makes a difference."
              />
            </div>
          </div>
        </div>

        {/* Bank Transfer */}
        <div className="table-container p-4 md:p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-heading text-lg font-semibold">Bank Transfer</h2>
            <Switch defaultChecked />
          </div>
          <div className="space-y-4">
            <div className="grid gap-2">
              <Label>QR Code</Label>
              <div className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-primary/50 transition-colors cursor-pointer max-w-xs">
                <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                <p className="text-sm text-muted-foreground">Upload QR code</p>
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="bankName">Tên ngân hàng</Label>
              <Input id="bankName" defaultValue="Vietcombank" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="accountHolder">Chủ tài khoản</Label>
              <Input id="accountHolder" defaultValue="NGUYEN VAN A" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="accountNumber">Số tài khoản</Label>
              <Input id="accountNumber" defaultValue="1234567890" />
            </div>
          </div>
        </div>

        {/* MoMo Wallet */}
        <div className="table-container p-4 md:p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-heading text-lg font-semibold">MoMo Wallet</h2>
            <Switch defaultChecked />
          </div>
          <div className="space-y-4">
            <div className="grid gap-2">
              <Label>QR Code</Label>
              <div className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-primary/50 transition-colors cursor-pointer max-w-xs">
                <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                <p className="text-sm text-muted-foreground">Upload QR code</p>
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="momoName">Tên</Label>
              <Input id="momoName" defaultValue="NGUYEN VAN A" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="momoPhone">Số điện thoại</Label>
              <Input id="momoPhone" defaultValue="0901234567" />
            </div>
          </div>
        </div>

        {/* Thank You Message */}
        <div className="table-container p-4 md:p-6">
          <h2 className="font-heading text-lg font-semibold mb-6">Lời cảm ơn</h2>
          <div className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="thankMessage">Nội dung</Label>
              <Textarea 
                id="thankMessage" 
                rows={3}
                defaultValue="Thank you for believing in this journey. Your support means the world to me and helps keep this creative space alive."
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="thankSignature">Chữ ký</Label>
              <Input id="thankSignature" defaultValue="— With gratitude" />
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
