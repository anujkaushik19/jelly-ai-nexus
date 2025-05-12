
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type NavItem = {
  title: string;
  href: string;
  icon: React.ReactNode;
};

const DashboardSidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  
  const navItems: NavItem[] = [
    {
      title: "Entity Sets",
      href: "/dashboard/entity-sets",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="3" width="7" height="7"></rect>
          <rect x="14" y="3" width="7" height="7"></rect>
          <rect x="14" y="14" width="7" height="7"></rect>
          <rect x="3" y="14" width="7" height="7"></rect>
        </svg>
      ),
    },
    {
      title: "New Training",
      href: "/dashboard/new-training",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="12" y1="5" x2="12" y2="19"></line>
          <line x1="5" y1="12" x2="19" y2="12"></line>
        </svg>
      ),
    },
    {
      title: "Past Trainings",
      href: "/dashboard/past-trainings",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10"></circle>
          <polyline points="12 6 12 12 16 14"></polyline>
        </svg>
      ),
    },
  ];

  const isActive = (path: string) => {
    return location.pathname === path || location.pathname.startsWith(`${path}/`);
  };

  return (
    <aside 
      className={cn(
        "h-screen bg-white border-r border-gray-200 fixed top-0 left-0 z-40 transition-all duration-300",
        collapsed ? "w-20" : "w-64"
      )}
    >
      <div className="h-full flex flex-col">
        <div className={cn(
          "h-16 border-b border-gray-200 flex items-center px-4",
          collapsed ? "justify-center" : "justify-between"
        )}>
          {!collapsed && (
            <Link to="/" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-jelly-primary to-jelly-accent flex items-center justify-center text-white font-bold">
                J
              </div>
              <span className="font-bold text-xl">JELLY</span>
            </Link>
          )}
          {collapsed && (
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-jelly-primary to-jelly-accent flex items-center justify-center text-white font-bold">
              J
            </div>
          )}
          <Button
            variant="ghost"
            size="sm"
            className={cn("px-2", collapsed && "hidden")}
            onClick={() => setCollapsed(true)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </Button>
        </div>
        
        <nav className="flex-1 px-3 py-4 overflow-y-auto">
          <ul className="space-y-2">
            {navItems.map((item) => (
              <li key={item.title}>
                <Link
                  to={item.href}
                  className={cn(
                    "flex items-center p-3 text-gray-700 rounded-md hover:bg-gray-100 transition-colors",
                    isActive(item.href) && "bg-jelly-primary/10 text-jelly-primary",
                    collapsed ? "justify-center" : ""
                  )}
                >
                  <span className="flex-shrink-0">{item.icon}</span>
                  {!collapsed && <span className="ml-3">{item.title}</span>}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        
        <div className={cn(
          "border-t border-gray-200 p-4",
          collapsed ? "flex justify-center" : ""
        )}>
          <Button
            variant="ghost"
            size="sm"
            className={cn("w-full justify-center", !collapsed && "hidden")}
            onClick={() => setCollapsed(false)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </Button>
          
          {!collapsed && (
            <div className="flex items-center">
              <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                  <circle cx="12" cy="7" r="4"></circle>
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium">User Name</p>
                <p className="text-xs text-gray-500">user@example.com</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
};

export default DashboardSidebar;
