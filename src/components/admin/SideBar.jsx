import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Calendar,
  ChevronDown,
  ClipboardList,
  Home,
  LayoutDashboard,
  MessageSquare,
  Stethoscope,
  Users,
} from "lucide-react";

const sidebarItems = [
  {
    title: "Dashboard",
    href: "/admin",
    icon: <LayoutDashboard className="h-5 w-5" />,
  },
  {
    title: "Appointments",
    href: "/admin/appointments",
    icon: <Calendar className="h-5 w-5" />,
  },
  {
    title: "Doctors",
    href: "/admin/doctors",
    icon: <Stethoscope className="h-5 w-5" />,
  },
  {
    title: "Patients",
    href: "/admin/patients",
    icon: <Users className="h-5 w-5" />,
  },
  {
    title: "Queue Management",
    href: "/admin/queue",
    icon: <ClipboardList className="h-5 w-5" />,
  },
  {
    title: "Messages",
    href: "/admin/messages",
    icon: <MessageSquare className="h-5 w-5" />,
  },
];

export function Sidebar() {
  const location = useLocation();
  const pathname = location.pathname;
  const [openSubmenu, setOpenSubmenu] = useState(null);

  const toggleSubmenu = (title) => {
    setOpenSubmenu(openSubmenu === title ? null : title);
  };

  return (
    <div className="hidden md:flex flex-col w-64 bg-white border-r min-h-screen">
      <div className="p-4 border-b">
        <Link to="/admin" className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-teal-600">
            <Home className="h-4 w-4 text-white" />
          </div>
          <span className="text-xl font-bold text-teal-600">MediQueue</span>
        </Link>
      </div>
      <div className="flex-1 overflow-y-auto py-4 px-2 space-y-1">
        {sidebarItems.map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
          const hasSubmenu = item.submenu?.length > 0;

          return (
            <div key={item.title} className="space-y-1">
              {hasSubmenu ? (
                <button
                  onClick={() => toggleSubmenu(item.title)}
                  className={`w-full flex justify-between items-center px-3 py-2 text-left text-sm rounded hover:bg-gray-100 ${
                    isActive ? "bg-gray-100 font-semibold" : "text-gray-700"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    {item.icon}
                    <span>{item.title}</span>
                  </div>
                  <ChevronDown
                    className={`h-4 w-4 transition-transform ${
                      openSubmenu === item.title ? "rotate-180" : ""
                    }`}
                  />
                </button>
              ) : (
                <Link
                  to={item.href}
                  className={`flex w-full items-center gap-3 px-3 py-2 text-sm rounded hover:bg-gray-100 ${
                    isActive ? "bg-gray-100 font-semibold" : "text-gray-700"
                  }`}
                >
                  {item.icon}
                  <span>{item.title}</span>
                </Link>
              )}

              {hasSubmenu && openSubmenu === item.title && (
                <div className="ml-6 space-y-1 border-l border-gray-200 pl-3">
                  {item.submenu.map((sub) => {
                    const isSubActive = pathname === sub.href;
                    return (
                      <Link
                        key={sub.title}
                        to={sub.href}
                        className={`block text-sm px-3 py-1.5 rounded hover:bg-gray-100 ${
                          isSubActive ? "bg-gray-100 font-medium" : "text-gray-600"
                        }`}
                      >
                        {sub.title}
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
