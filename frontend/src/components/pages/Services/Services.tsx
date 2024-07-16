import { SetStateAction, Dispatch, FC, useEffect, useState } from 'react'
import "./Services.css";
import { ServiceEntity } from '../../../types/entity/Entity';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import VisibilityIcon from '@mui/icons-material/Visibility';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from 'react-router';
import { Box, Button, FormControl, MenuItem, Modal, Select, Typography } from '@mui/material';


interface Props {
    setMessageStatus: Dispatch<SetStateAction<string>>;
    setMessage: Dispatch<SetStateAction<string>>;
}

const images = [
    "https://cdn0.weddingwire.com/cat/10058609--mfvo10058609.jpg",
    "https://cdn0.weddingwire.com/cat/10058611--mfvg10058611.jpg",
    "https://cdn0.weddingwire.com/cat/10058611--mfvo10058611.jpg",
    "https://cdn0.weddingwire.com/cat/10058613--mfvo10058613.jpg"
]

const categoriesList = [
    "Category 1",
    "Category 2",
    "Category 3",
    "Category 4",
]
const Services: FC<Props> = (props) => {
    const [services, setServices] = useState<ServiceEntity[]>([]);
    const [categories, setCategories] = useState<string[]>(categoriesList);
    const [category, setCategory] = useState<string>(categories[0]);
    const [serviceName, setServiceName] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [price, setPrice] = useState<string>('');

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const navigate = useNavigate();

    useEffect(() => {
        const servicesList: ServiceEntity[] = [
            {
                id: "ED01",
                name: "Chụp studio",
                description: "Chụp gọn lẹChụp gọn lẹChụp gọn lẹChụp gọn lẹChụp gọn lẹChụp gọn lẹChụp gọn lẹChụp gọn lẹChụp gọn lẹChụp gọn lẹ",
                category: "Chụp hình",
                images: [],
                price: "10,000,000 đ",
                status: "ACTIVATED"
            },
            {
                id: "ED02",
                name: "Chụp studio",
                description: "Chụp gọn lẹChụp gọn lẹChụp gọn lẹChụp gọn lẹChụp gọn lẹChụp gọn lẹChụp gọn lẹChụp gọn lẹChụp gọn lẹChụp gọn lẹ",
                category: "Chụp hình",
                images: [],
                price: "10,000,000 đ",
                status: "ACTIVATED"
            }
        ];

        setServices(servicesList);
    }, [])

    const handleCreate = async () => {
        try {
            const newStaff = {
            }


            // const status = await registerStaff(newStaff, user?.token, dispatch, navigate);
            // if (status == "SUCCESS") {
            //     props.setMessageStatus("green");
            //     props.setMessage("Tạo thành công");
            //     handleClose();
            // } else {
            //     props.setMessageStatus("red");
            //     props.setMessage(status);
            // }
        } catch (error) {

        }
    }

    const rows = services?.length > 0 ? services.map((staff) => ({
        id: staff.id,
        name: staff.name,
        description: staff.description,
        category: staff.category,
        price: staff.price,
        status: staff.status
    })) : [];

    const columns: GridColDef[] = [
        { field: "id", headerName: "ID", flex: 0.3 },
        { field: "category", headerName: "Loại", flex: 0.5 },
        { field: "name", headerName: "Tên", flex: 0.8 },
        { field: "description", headerName: "Mô tả", flex: 1.2 },
        { field: "price", headerName: "Giá", flex: 0.5 },
        { field: "status", headerName: "Trạng thái", flex: 0.5 },
        {
            field: '',
            headerName: 'Tác vụ',
            flex: 0.5,
            width: 170,
            renderCell: (params) => (
                <div className="action">
                    <VisibilityIcon onClick={() => navigate(`/service-detail/${params.id}`)}></VisibilityIcon>
                    <AppRegistrationIcon></AppRegistrationIcon>
                    <DeleteIcon></DeleteIcon>
                </div>
            ),
        }
    ];

    return (
        <div id="Services">
            <div className="create-service">
                <Button className="btn-create-service" onClick={() => { handleOpen() }}>Tạo mới</Button>
            </div>
            <div className="table" style={{ height: 400, width: "100%" }}>
                <DataGrid rows={rows}
                    columns={columns}
                    autoPageSize
                    pagination />
            </div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                id="ModalCreateService"
            >
                <Box
                    className="box"
                >
                    <Typography id="modal-modal-title" variant="h2" component="h2">
                        <span style={{ fontSize: "3rem !important" }}>
                            Tạo dịch vụ
                        </span>
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        <div className="create-container">
                            <div className="group-input dual-input mb-24">
                                <label>Tên dịch vụ:</label>
                                <div className="form-input">
                                    <input type="Username" className="input regis-input" required onChange={(e) => { setServiceName(e.target.value) }} />
                                    <span className="text-err"></span>
                                </div>
                            </div>
                            <div className="group-input dual-input mb-24">
                                <label>Loại:</label>
                                <div className="form-input">
                                    <input type="Username" className="input regis-input" required onChange={(e) => { setCategory(e.target.value) }} />
                                    <span className="text-err"></span>
                                </div>
                            </div>
                            <div className="group-input individual-input mb-24">
                                <label>Loại:</label>
                                <div className="form-input">
                                    <textarea className="textarea regis-input" required onChange={(e) => { setCategory(e.target.value) }} />
                                    <span className="text-err"></span>
                                </div>
                            </div>
                            <div className="group-input mb-24">
                                <label>Category:</label>
                                <FormControl className="form-input">
                                    <Select
                                        className="input regis-input"
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={category}
                                        onChange={(e) => { setCategory(e.target.value) }}
                                    >
                                        {
                                            categories.map((position, index) => {
                                                return (
                                                    <MenuItem value={position} key={index}>{position}</MenuItem>
                                                )
                                            })
                                        }
                                    </Select>
                                </FormControl>
                            </div>
                            <div className="group-input individual-input mb-24">
                                <label>Ảnh:</label>
                                <div className="form-input">
                                    <input type="file" multiple />
                                    <div className="images">
                                        {
                                            images.map((item, index) => {
                                                return (
                                                    <div className="img-item">
                                                        <img src={item} alt="" />
                                                    </div>
                                                )
                                            })
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="btn-handle">
                            <Button className="btn-close mr-24" variant="contained" onClick={() => { handleClose() }}>Huỷ</Button>
                            <Button className="btn-create" variant="contained" onClick={() => { handleCreate() }}>Tạo mới</Button>
                        </div>
                    </Typography>
                </Box>
            </Modal>
        </div>
    )
}

export default Services