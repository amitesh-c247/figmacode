import { useState } from "react";
import { cn } from "../../lib/utils";
import { 
  LayoutDashboard, 
  Building, 
  Users, 
  MapPin, 
  Video,
  Settings,
  ChevronRight
} from "lucide-react";

interface SidebarProps {
  isOpen: boolean;
  currentPage: string;
  onPageChange: (page: string) => void;
}

interface MenuItem {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  active?: boolean;
  children?: MenuItem[];
}

export function Sidebar({ isOpen, currentPage, onPageChange }: SidebarProps) {
  const [expandedItems, setExpandedItems] = useState<string[]>([]);

  const menuItems: MenuItem[] = [
    {
      id: "dashboard",
      label: "Dashboard",
      icon: LayoutDashboard,
    },
    {
      id: "session-management",
      label: "Session Management", 
      icon: Video,
    },
    {
      id: "companies-management",
      label: "Companies Management",
      icon: Building,
    },
    {
      id: "user-management",
      label: "User Management",
      icon: Users,
    },
    {
      id: "group-management",
      label: "Group Management",
      icon: Users,
    },
    {
      id: "locations",
      label: "Locations",
      icon: MapPin,
    },
    {
      id: "settings",
      label: "Settings",
      icon: Settings,
    },
  ];

  const toggleExpanded = (itemId: string) => {
    setExpandedItems(prev => 
      prev.includes(itemId) 
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    );
  };

  const renderMenuItem = (item: MenuItem, level = 0) => {
    const isActive = currentPage === item.id;
    const isExpanded = expandedItems.includes(item.id);
    const hasChildren = item.children && item.children.length > 0;

    return (
      <div key={item.id}>
        <div
          className={cn(
            "flex items-center gap-3 px-6 py-3 cursor-pointer transition-colors relative",
            isActive 
              ? "bg-purple-600 text-white" 
              : "text-gray-700 hover:bg-gray-50",
            level > 0 && "pl-12"
          )}
          onClick={() => {
            if (hasChildren) {
              toggleExpanded(item.id);
            } else {
              onPageChange(item.id);
            }
          }}
        >
          {/* Active indicator */}
          {isActive && (
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-purple-600 rounded-r"></div>
          )}
          
          <item.icon className={cn("h-5 w-5", isActive ? "text-white" : "text-gray-600")} />
          <span className={cn(
            "font-semibold text-sm flex-1",
            !isOpen && "hidden"
          )}>
            {item.label}
          </span>
          
          {hasChildren && isOpen && (
            <ChevronRight 
              className={cn(
                "h-4 w-4 transition-transform",
                isExpanded && "rotate-90"
              )} 
            />
          )}
        </div>

        {/* Children */}
        {hasChildren && isExpanded && isOpen && (
          <div className="bg-gray-50">
            {item.children!.map(child => renderMenuItem(child, level + 1))}
          </div>
        )}
      </div>
    );
  };

  return (
    <aside className={cn(
      "bg-white border-r border-gray-100 transition-all duration-300 h-full",
      isOpen ? "w-[280px]" : "w-16"
    )}>
      <div className="pt-4">
        {menuItems.map(item => renderMenuItem(item))}
      </div>
    </aside>
  );
}