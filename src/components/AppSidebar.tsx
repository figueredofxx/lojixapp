import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import {
  LayoutDashboard,
  ShoppingCart,
  Package,
  Users,
  BarChart3,
  Settings,
  Palette,
  DollarSign,
  TrendingUp,
  FileText,
  Warehouse
} from "lucide-react";

const navigationItems = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: LayoutDashboard,
    group: "Principal"
  },
  {
    title: "PDV",
    url: "/dashboard?tab=pos",
    icon: ShoppingCart,
    group: "Vendas"
  },
  {
    title: "Catálogo",
    url: "/dashboard?tab=catalog",
    icon: Palette,
    group: "Vendas"
  },
  {
    title: "Produtos",
    url: "/dashboard?tab=products",
    icon: Package,
    group: "Estoque"
  },
  {
    title: "Estoque",
    url: "/dashboard?tab=stock",
    icon: Warehouse,
    group: "Estoque"
  },
  {
    title: "Inventário",
    url: "/dashboard?tab=inventory",
    icon: FileText,
    group: "Estoque"
  },
  {
    title: "Clientes",
    url: "/dashboard?tab=customers",
    icon: Users,
    group: "CRM"
  },
  {
    title: "CRM",
    url: "/dashboard?tab=crm",
    icon: TrendingUp,
    group: "CRM"
  },
  {
    title: "Financeiro",
    url: "/dashboard?tab=financial",
    icon: DollarSign,
    group: "Gestão"
  },
  {
    title: "Relatórios",
    url: "/dashboard?tab=reports",
    icon: BarChart3,
    group: "Gestão"
  },
  {
    title: "Configurações",
    url: "/dashboard?tab=settings",
    icon: Settings,
    group: "Gestão"
  }
];

export function AppSidebar() {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const location = useLocation();
  const currentPath = location.pathname + location.search;

  const isActive = (url: string) => {
    if (url === "/dashboard" && currentPath === "/dashboard") return true;
    if (url !== "/dashboard" && currentPath.includes(url.split("?")[1])) return true;
    return false;
  };

  const getNavCls = (url: string) =>
    isActive(url) 
      ? "bg-sidebar-accent text-sidebar-accent-foreground font-medium" 
      : "hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground";

  const groupedItems = navigationItems.reduce((acc, item) => {
    const group = item.group;
    if (!acc[group]) acc[group] = [];
    acc[group].push(item);
    return acc;
  }, {} as Record<string, typeof navigationItems>);

  return (
    <Sidebar className={collapsed ? "w-14" : "w-64"}>
      <SidebarContent>
        {Object.entries(groupedItems).map(([groupName, items]) => (
          <SidebarGroup key={groupName}>
            {!collapsed && (
              <SidebarGroupLabel className="font-cantarell font-semibold text-sm">
                {groupName}
              </SidebarGroupLabel>
            )}
            <SidebarGroupContent>
              <SidebarMenu>
                {items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <NavLink to={item.url} className={getNavCls(item.url)}>
                        <item.icon className="h-4 w-4" />
                        {!collapsed && (
                          <span className="font-cantarell">{item.title}</span>
                        )}
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
    </Sidebar>
  );
}