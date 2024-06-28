import {
  AppsOutlined,
  Diversity3Outlined,
  SpaceDashboard,
} from "@mui/icons-material";
import { Route } from "../types/common";

export const listStaffRoute: Route[] = [
  {
    title: "Suppliers List",
    icon: <Diversity3Outlined />,
    path: "/suppliers",
  },
  {
    title: "Services List",
    icon: <AppsOutlined />,
    path: "/services",
  },
];

export const listSupplierRoute: Route[] = [
  {
    title: "Dashboard",
    icon: <SpaceDashboard />,
    path: "/service-suppliers-dashboard",
  },
];
