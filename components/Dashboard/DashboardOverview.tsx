import { TrendingUp, Users, ShoppingCart, DollarSign, Activity } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";

interface KPICardProps {
  title: string;
  value: string;
  change: string;
  trend: "up" | "down";
  icon: React.ComponentType<{ className?: string }>;
}

function KPICard({ title, value, change, trend, icon: Icon }: KPICardProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-gray-600">{title}</CardTitle>
        <Icon className="h-4 w-4 text-gray-600" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-gray-900">{value}</div>
        <div className="flex items-center gap-2 mt-1">
          <Badge variant={trend === "up" ? "default" : "destructive"} className="text-xs">
            {change}
          </Badge>
          <span className="text-xs text-gray-500">from last month</span>
        </div>
      </CardContent>
    </Card>
  );
}

function RecentActivity() {
  const activities = [
    { user: "John Doe", action: "Created new company", time: "2 minutes ago", type: "create" },
    { user: "Jane Smith", action: "Updated user profile", time: "1 hour ago", type: "update" },
    { user: "Mike Johnson", action: "Deleted location", time: "3 hours ago", type: "delete" },
    { user: "Sarah Wilson", action: "Added new group", time: "1 day ago", type: "create" },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity, index) => (
            <div key={index} className="flex items-center gap-4">
              <div className="h-2 w-2 rounded-full bg-purple-600"></div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">{activity.user}</p>
                <p className="text-sm text-gray-500">{activity.action}</p>
              </div>
              <span className="text-xs text-gray-400">{activity.time}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

function QuickActions() {
  const actions = [
    { title: "Add Company", description: "Create a new company profile", color: "bg-blue-500" },
    { title: "Add User", description: "Invite a new user to the platform", color: "bg-green-500" },
    { title: "Create Group", description: "Set up a new user group", color: "bg-purple-500" },
    { title: "Add Location", description: "Register a new office location", color: "bg-orange-500" },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Quick Actions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          {actions.map((action, index) => (
            <div key={index} className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
              <div className={`w-8 h-8 ${action.color} rounded-lg mb-3`}></div>
              <h4 className="font-semibold text-sm text-gray-900">{action.title}</h4>
              <p className="text-xs text-gray-500 mt-1">{action.description}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

export function DashboardOverview() {
  return (
    <div className="space-y-6">
      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <KPICard
          title="Total Users"
          value="2,847"
          change="+12.5%"
          trend="up"
          icon={Users}
        />
        <KPICard
          title="Active Sessions"
          value="1,324"
          change="+8.2%"
          trend="up"
          icon={Activity}
        />
        <KPICard
          title="Companies"
          value="156"
          change="+4.1%"
          trend="up"
          icon={ShoppingCart}
        />
        <KPICard
          title="Revenue"
          value="$24,580"
          change="-2.4%"
          trend="down"
          icon={DollarSign}
        />
      </div>

      {/* Charts and Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Session Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
              <p className="text-gray-500">Chart Component Placeholder</p>
            </div>
          </CardContent>
        </Card>

        <RecentActivity />
      </div>

      {/* Quick Actions */}
      <QuickActions />
    </div>
  );
}