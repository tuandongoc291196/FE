import TableViewData from "../../common/TableViewData";
import "./StaffManager.css";
import { Box, Chip, IconButton, Tab, Tabs, Typography } from "@mui/material";
import { Visibility } from "@mui/icons-material";
import { GridColDef } from "@mui/x-data-grid";
import { PROCESS_STATUS, PROCESS_STATUS_VN } from "../../../constants/consts";
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { BlogItem } from "../../../types/schema/blog";
import SearchInput from "../../common/SearchInput";
import BlogDetail from "./BlogDetail";
import { getListBlogs } from "../../../redux/apiRequest";

const StaffManageBlogs = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [value, setValue] = React.useState(0);
  const [data, setData] = React.useState<BlogItem[]>([]);
  const searchParams = new URLSearchParams(location.search);
  const [loading, setLoading] = useState(false);
  const status = searchParams.get("status");
  const id = searchParams.get("id");
  const [blog, setBlog] = useState<BlogItem | null>(null);
  const defaultColumns: GridColDef[] = [
    {
      field: "id",
      headerName: "Mã bài đăng",
      flex: 1,
    },
    {
      field: "serviceSupplierId",
      headerName: "Nhà cung cấp",
      flex: 1,
    },
    {
      field: "createAt",
      headerName: "Ngày tạo",
      flex: 1,
    },
    {
      field: "title",
      headerName: "Tiêu đề",
      flex: 1,
    },
    {
      field: "staffId",
      headerName: "Nhân viên",
      flex: 1,
      align: "center",
      headerAlign: "center",
      renderCell: (params: any) => {
        if (params.row.staffId === null) return <>-</>;
        else return <>{params.value}</>;
      },
    },
    {
      field: "status",
      headerName: "Trạng thái",
      align: "center",
      flex: 1,
      headerAlign: "center",
      renderCell: (params) =>
        params.value === PROCESS_STATUS.pending ? (
          <Chip
            label={PROCESS_STATUS_VN.pending}
            sx={{
              height: "24px",
              width: "80px",
              fontSize: 10,
              fontWeight: 600,
              color: "#cece22",
              bgcolor: "#ffffbb",
            }}
          />
        ) : params.value === PROCESS_STATUS.active ? (
          <Chip
            label={PROCESS_STATUS_VN.active}
            sx={{
              height: "24px",
              width: "80px",
              fontSize: 10,
              fontWeight: 600,
              color: "green",
              bgcolor: "#abffdc",
            }}
          />
        ) : (
          <Chip
            label={PROCESS_STATUS_VN.inactive}
            sx={{
              height: "24px",
              width: "80px",
              fontSize: 10,
              fontWeight: 600,
              color: "red",
              bgcolor: "#ffcaca",
            }}
          />
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
          <IconButton
            aria-label="view"
            onClick={() => {
              setBlog(params.row);
            }}
          >
            <Visibility sx={{ color: "blue", fontSize: 18 }} />
          </IconButton>
        </div>
      ),
    },
  ];

  React.useEffect(() => {
    const getBlogs = async () => {
      setLoading(true);
      const res = await getListBlogs(0, 10, status);
      if (res)
        if (res.status === "SUCCESS") setData(res.data);
        else setData([]);
      setLoading(false);
    };
    getBlogs();
  }, [status]);
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
    if (newValue === 0) navigate("/staff/blogs");
    if (newValue === 1) navigate("/staff/blogs?status=PENDING");
    if (newValue === 2) navigate("/staff/blogs?status=ACTIVE");
    if (newValue === 3) navigate("/staff/blogs?status=REJECTED");
  };
  console.log(blog);
  return (
    <>
      {blog ? (
        <BlogDetail blog={blog} setBlog={setBlog} />
      ) : (
        <div>
          <div className="flex justify-between">
            <Typography
              className="primary-color"
              textAlign={"start"}
              pb={1.2}
              fontSize={20}
              fontWeight={600}
            >
              Danh sách bài đăng
            </Typography>
            <SearchInput />
          </div>
          <Box sx={{ width: "100%" }}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <Tabs
                value={value}
                onChange={handleChange}
                TabIndicatorProps={{
                  style: {
                    backgroundColor: "var(--primary-color)",
                  },
                }}
                sx={{
                  "& .MuiTab-root": {
                    fontWeight: 600,
                  },
                  "& .MuiTab-root.Mui-selected": {
                    color: "var(--primary-color)",
                    fontSize: 9,
                    fontWeight: 600,
                  },
                }}
              >
                <Tab label="Tất cả" />
                <Tab label={PROCESS_STATUS_VN.pending} />
                <Tab label={PROCESS_STATUS_VN.active} />
                <Tab label={PROCESS_STATUS_VN.inactive} />
              </Tabs>
            </Box>
          </Box>
          <TableViewData
            data={data}
            isLoading={loading}
            defaultColumns={defaultColumns}
            height={541}
          />
        </div>
      )}
    </>
  );
};

export default StaffManageBlogs;
