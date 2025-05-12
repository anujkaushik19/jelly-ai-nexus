
import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import DashboardSidebar from "./DashboardSidebar";

const DashboardLayout = () => {
  useEffect(() => {
    // Scroll to top when dashboard is loaded
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-gray-50 min-h-screen">
      <DashboardSidebar />
      <main className="ml-20 lg:ml-64 min-h-screen pb-12">
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;
