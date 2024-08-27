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
    field: "category",
    headerName: "Danh mục",
    flex: 1,
  },
  {
    field: "description",
    headerName: "Mô tả",
    flex: 1,
  },
  {
    field: "price",
    headerName: "Giá",
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
    headerName: "Actions",
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
    category: "A",
    description: "abc",
    price: 5000,
    status: true,
  },
  {
    id: 2,
    supplier_name: "Supplier B",
    supplier_service: "Logistics",
    category: "A",
    description: "abc",
    price: 5000,
    status: false,
  },
  {
    id: 3,
    supplier_name: "Supplier C",
    supplier_service: "Consulting",
    category: "A",
    description: "abc",
    price: 5000,
    status: true,
  },
  {
    id: 4,
    supplier_name: "Supplier D",
    supplier_service: "Marketing",
    category: "A",
    description: "abc",
    price: 5000,
    status: false,
  },
  {
    id: 5,
    supplier_name: "Supplier E",
    supplier_service: "Legal Services",
    category: "A",
    description: "abc",
    price: 5000,
    status: true,
  },
];

const StaffManageServices = () => {
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
          Danh sách dịch vụ
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

export default StaffManageServices;
