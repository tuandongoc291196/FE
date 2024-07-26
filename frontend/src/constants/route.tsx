import {
  Apps,
  AppsOutlined,
  Category,
  Comment,
  Dashboard,
  Diversity3Outlined,
  DynamicFeed,
  SpaceDashboard,
} from "@mui/icons-material";
import { Route } from "../types/common";

export const listStaffRoute: Route[] = [
  {
    title: "Bảng điều khiến",
    icon: <Dashboard />,
    path: "/staff/dashboard",
  },
  {
    title: "Gói dịch vụ",
    icon: <Apps />,
    path: "/staff/combo-services",
  },
  {
    title: "Quản lý bài đăng",
    icon: <DynamicFeed />,
    path: "/staff/blogs",
  },
  {
    title: "Quản lý phản hồi",
    icon: <Comment />,
    path: "/staff/comments",
  },
  {
    title: "Quản lý danh mục",
    icon: <Category />,
    path: "/staff/categories",
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
