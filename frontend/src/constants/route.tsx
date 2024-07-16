import {
  AppsOutlined,
  Diversity3Outlined,
  DynamicFeed,
  SpaceDashboard,
} from "@mui/icons-material";
import { Route } from "../types/common";

export const listStaffRoute: Route[] = [
  {
    title: "Quản lý nhà cung cấp",
    icon: <Diversity3Outlined />,
    path: "/staff/suppliers",
  },
  {
    title: "Quản lý dịch vụ",
    icon: <AppsOutlined />,
    path: "/staff/services",
  },
  {
    title: "Quản lý bài đăng",
    icon: <DynamicFeed />,
    path: "/staff/blogs",
  },
  {
    title: "",
    path: "/staff/blog-detail",
  },
];

export const listSupplierRoute: Route[] = [
  {
    title: "Dashboard",
    icon: <SpaceDashboard />,
    path: "/service-suppliers-dashboard",
  },
];
