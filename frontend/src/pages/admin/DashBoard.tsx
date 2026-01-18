import { AdminLayout } from "@/components/admin/AdminLayout";
import { StatCard } from "@/components/admin/StatCard";
import { RecentPosts } from "@/components/admin/RecentPosts";
import { FileText, Eye, Users, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "@/lib/axios"

export default function Dashboard() {

  const [dashboardData, setDashboardData] = useState(null);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const res = await api.get("/api/v1/dashboard");
        setDashboardData(res.data);
      } catch (error) {
        console.error("Error fetching:", error);
      }
    };

    fetchDashboard();
  }, []);

  if (!dashboardData) {
    return (
    <AdminLayout>
      <div className="flex items-center justify-center h-[60vh] text-muted-foreground">
        <span className="animate-spin mr-2">⏳</span>
        Đang tải dữ liệu dashboard...
      </div>
    </AdminLayout>
  );
  }


  // console.log(dashboardData)
  return (
    <AdminLayout>
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-heading text-3xl font-semibold text-foreground">Dashboard</h1>
          <p className="mt-1 text-muted-foreground">Chào mừng trở lại! Đây là tổng quan blog của bạn.</p>
        </div>
        <Link to="/admin/posts/new">
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            Bài viết mới
          </Button>
        </Link>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 mb-8">
        <StatCard
          title="Tổng bài viết"
          value={dashboardData.posts.total}
          icon={FileText}
          trend={{ value: dashboardData.posts.trend.value, isPositive: dashboardData.posts.trend.isPositive }}
        />
        <StatCard
          title="Lượt xem tháng này"
          value={dashboardData.views.total}
          icon={Eye}
          trend={{ value: dashboardData.views.trend.value, isPositive: dashboardData.views.trend.isPositive }}
        />
      </div>

      <RecentPosts />
    </AdminLayout>
  );
}
