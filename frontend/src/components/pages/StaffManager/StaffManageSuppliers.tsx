import React from "react";
import TableViewData from "../../common/TableViewData";
import "./StaffManager.css";
import { IconButton, Typography } from "@mui/material";
import { Delete, Visibility } from "@mui/icons-material";
import { GridColDef } from "@mui/x-data-grid";
const defaultColumns: GridColDef[] = [
  {
    field: "supplier_name",
    headerName: "Nhà cung cấp",
    flex: 1,
  },
  {
    field: "supplier_service",
    headerName: "Dịch vụ cung cấp",
    flex: 1,
  },
  {
    field: "phone_number",
    headerName: "Số điện thoại",
    flex: 1,
  },
  {
    field: "email",
    headerName: "Email",
    flex: 1,
  },

  {
    field: "status",
    headerName: "Trạng thái",
    align: "center",
    flex: 1,
    headerAlign: "center",
    renderCell: (params: any) =>
      params.value ? (
        <span className="active-chip btn">Active</span>
      ) : (
        <span className="inactive-chip">Inactive</span>
      ),
  },
  {
    field: "actions",
    headerName: "Hành động",
    align: "center",
    headerAlign: "center",
    flex: 1,
    renderCell: (params: any) => (
      <div>
        <IconButton aria-label="view" onClick={() => handleView(params.row.id)}>
          <Visibility sx={{ color: "blue", fontSize: 18 }} />
        </IconButton>
        <IconButton
          aria-label="delete"
          onClick={() => handleDelete(params.row.id)}
        >
          <Delete sx={{ color: "red", fontSize: 18 }} />
        </IconButton>
      </div>
    ),
  },
];

const handleView = (id: number) => {
  console.log(`View details for supplier id: ${id}`);
  // Add your logic to view details here
};

const handleDelete = (id: number) => {
  console.log(`Delete supplier id: ${id}`);
  // Add your logic to delete the supplier here
};

const mockData = [
  {
    id: 1,
    supplier_name: "Supplier A",
    supplier_service: "IT Services",
    phone_number: "123-456-7890",
    email: "supplierA@example.com",
    status: true,
  },
  {
    id: 2,
    supplier_name: "Supplier B",
    supplier_service: "Logistics",
    phone_number: "098-765-4321",
    email: "supplierB@example.com",
    status: false,
  },
  {
    id: 3,
    supplier_name: "Supplier C",
    supplier_service: "Consulting",
    phone_number: "555-555-5555",
    email: "supplierC@example.com",
    status: true,
  },
  {
    id: 4,
    supplier_name: "Supplier D",
    supplier_service: "Marketing",
    phone_number: "444-444-4444",
    email: "supplierD@example.com",
    status: false,
  },
  {
    id: 5,
    supplier_name: "Supplier E",
    supplier_service: "Legal Services",
    phone_number: "333-333-3333",
    email: "supplierE@example.com",
    status: true,
  },
];

const StaffManageSuppliers = () => {
  return (
    <div>
      <div>
        <Typography
          className="primary-color"
          textAlign={"start"}
          p={1.2}
          fontSize={14}
          fontWeight={600}
        >
          Danh sách nhà cung cấp
        </Typography>
      </div>
      <TableViewData
        data={mockData}
        isLoading={false}
        defaultColumns={defaultColumns}
      />
    </div>
  );
};

export default StaffManageSuppliers;
