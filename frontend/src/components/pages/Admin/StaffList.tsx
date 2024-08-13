import React, { useState, useEffect, FC, Dispatch, SetStateAction } from 'react'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import "./AdminPage.css";
import { Dropdown } from 'react-bootstrap';
import { Box, Button, FormControl, InputLabel, MenuItem, Modal, Select, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet, useNavigate } from 'react-router';
import { registerStaff } from '../../../redux/apiRequest';
import { StaffEntity } from '../../../types/entity/Entity';

const filters = ["Tất cả", "ACTIVATED", "DISABLED"];

interface Props {
    setMessageStatus: Dispatch<SetStateAction<string>>;
    setMessage: Dispatch<SetStateAction<string>>;
}

const StaffList: FC<Props> = (props) => {
    const user = useSelector((state: any) => state.auth.login.currentUser);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [staffs, setStaffs] = useState<StaffEntity[]>([]);
    const [filter, setFilter] = useState<string>(filters[0]);
    const [positions, setPositions] = useState<string[]>([]);
    const [position, setPosition] = useState<string>(positions[0]);

    const [username, setUsername] = useState<string>('');
    const [address, setAddress] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [phoneNumber, setPhoneNumber] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [statusResponse, setStatusResponse] = useState<string>('');

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    useEffect(() => {
        const staffsList: StaffEntity[] = [
            {
                id: "Staff1",
                name: "Staff 1",
                phone: "0123456789",
                createAt: "05:00 14/12/2000",
                status: "ACTIVATED",
                position: "string",
                department: "string",
            },
            {
                id: "Staff2",
                name: "Staff 2",
                phone: "0123456789",
                createAt: "05:00 14/12/2000",
                status: "ACTIVATED",
                position: "string",
                department: "string",
            },
            {
                id: "Staff3",
                name: "Staff 3",
                phone: "0123456789",
                createAt: "05:00 14/12/2000",
                status: "ACTIVATED",
                position: "string",
                department: "string",
            },
            {
                id: "Staff4",
                name: "Staff 4",
                phone: "0123456789",
                createAt: "05:00 14/12/2000",
                status: "ACTIVATED",
                position: "string",
                department: "string",
            }
        ];

        setStaffs(staffsList);
    }, [])

    const handleCreate = async () => {
        try {
            const newStaff = {
                address: address,
                department: "string",
                email: email,
                name: username,
                password: password,
                phoneNumber: phoneNumber,
                position: "string"
            }


            const status = await registerStaff(newStaff, user?.token, dispatch, navigate);
            if (status == "SUCCESS") {
                props.setMessageStatus("green");
                props.setMessage("Tạo thành công");
                handleClose();
            } else {
                props.setMessageStatus("red");
                props.setMessage(status);
            }
        } catch (error) {

        }
    }

    const rows = staffs?.length > 0 ? staffs.map((staff) => ({
        id: staff.id,
        name: staff.name,
        phone: staff.phone,
        createAt: staff.createAt,
        status: staff.status,
        position: staff.position,
        department: staff.department
    })) : [];

    const columns: GridColDef[] = [
        { field: "id", headerName: "ID", flex: 0.2 },
        { field: "name", headerName: "Tên", flex: 0.8 },
        { field: "phone", headerName: "Số điện thoại", flex: 0.8 },
        { field: "position", headerName: "Vị trí", flex: 0.8 },
        { field: "department", headerName: "Phòng ban", flex: 0.8 },
        { field: "createAt", headerName: "Ngày khởi tạo", flex: 0.8 },
        {
            field: 'status',
            headerName: '',
            flex: 0.5,
            width: 170,
            renderCell: (params) => (
                params.row.status != "ACTIVATED" ?
                    <button className="btn-admin-disable" style={{ backgroundColor: "#f44336" }} onClick={() => {
                        // handleDisable(params.row.id);
                    }}>
                        Đã vô hiệu hoá
                    </button>
                    :
                    <button className="btn-admin-active" style={{ backgroundColor: "#4caf50" }} onClick={() => {
                        // handleActive(params.row.id);
                    }}>
                        Đang hoạt động
                    </button>
            ),
        }
    ];

    return (
        <div id='AdminPage'>
            <h2>Quản lý nhân viên</h2>
            <div className="filter">
                <div className="filter-form-input">
                    <div className="filter-input-icon">
                        <FontAwesomeIcon icon={faMagnifyingGlass} className="icon" />
                    </div>
                    <input type="text" placeholder='Nhập từ khoá tìm kiếm' />
                </div>
                <FormControl className='filter-dropdown ml-8'>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={filter}
                        onChange={(e) => { setFilter(e.target.value) }}
                    >
                        {
                            filters.map((filter, index) => {
                                return (
                                    <MenuItem value={filter} key={index}>{filter}</MenuItem>
                                )
                            })
                        }
                    </Select>
                </FormControl>
                <button className='btn-search ml-8'>Tìm kiếm</button>
            </div>
            <div style={{ height: 400, width: "100%" }}>
                <DataGrid rows={rows}
                    columns={columns}
                    autoPageSize
                    pagination
                    sx={{
                        '& .MuiDataGrid-columnHeaderTitle': {
                            color: 'var(--primary-color)',
                        },
                    }} />
            </div>
            <button className="btn float-right mt-24" onClick={handleOpen}>Tạo nhân viên mới</button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                id="ModalCreateStaff"
            >
                <Box
                    className="box"
                >
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Tạo nhân viên mới
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        <div className="create-container">
                            <div className="group-input">
                                <label>Tên đăng nhập:</label>
                                <div className="form-input">
                                    <input type="Username" className="input regis-input" required onChange={(e) => { setUsername(e.target.value) }} />
                                    <span className="text-err"></span>
                                </div>
                            </div>
                            <div className="group-input">
                                <label>Mật khẩu:</label>
                                <div className="form-input">
                                    <input type="Password" className="input regis-input" required onChange={(e) => { setPassword(e.target.value) }} />
                                    <span className="text-err"></span>
                                </div>
                            </div>
                            <div className="group-input">
                                <label>Địa chỉ:</label>
                                <div className="form-input">
                                    <input type="Address" className="input regis-input" required onChange={(e) => { setAddress(e.target.value) }} />
                                    <span className="text-err"></span>
                                </div>
                            </div>
                            <div className="group-input">
                                <label>Email:</label>
                                <div className="form-input">
                                    <input type="Email" className="input regis-input" required onChange={(e) => { setEmail(e.target.value) }} />
                                    <span className="text-err"></span>
                                </div>
                            </div>
                            <div className="group-input">
                                <label>Số điện thoại:</label>
                                <div className="form-input">
                                    <input type="Phone" className="input regis-input" required onChange={(e) => { setPhoneNumber(e.target.value) }} />
                                    <span className="text-err"></span>
                                </div>
                            </div>
                            {/* Use later */}
                            {/* <div className="group-input">
                                <label>Address:</label>
                                <FormControl className="form-input">
                                    <Select
                                        className="input regis-input"
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={position}
                                        onChange={(e) => { setPosition(e.target.value) }}
                                    >
                                        {
                                            positions.map((position, index) => {
                                                return (
                                                    <MenuItem value={position} key={index}>{position}</MenuItem>
                                                )
                                            })
                                        }
                                    </Select>
                                </FormControl>
                            </div> */}
                            <div className="btn-handle">
                                <Button className="btn-close mr-24" variant="contained" onClick={() => { handleClose() }}>Huỷ</Button>
                                <Button className="btn-create" variant="contained" onClick={() => { handleCreate() }}>Tạo</Button>
                            </div>
                        </div>
                    </Typography>
                </Box>
            </Modal>
        </div>

    )
}

export default StaffList