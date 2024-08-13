import { SetStateAction, Dispatch, FC, useEffect, useState } from 'react'
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import VisibilityIcon from '@mui/icons-material/Visibility';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from 'react-router';
import { Box, Button, FormControl, MenuItem, Modal, Select, Typography } from '@mui/material';
import "../../../constants/styles/TableService.css";
import { BlogEntity } from '../../../types/entity/Entity';


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

const Blogs: FC<Props> = (props) => {
    const navigate = useNavigate();

    const [blogs, setBlogs] = useState<BlogEntity[]>([]);
    const [title, setTitle] = useState<string>("");
    const [content, setContent] = useState<string>("");


    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    useEffect(() => {
        const blogsList: BlogEntity[] = [
            {
                "id": "1",
                "title": "ABC",
                "content": "ABC",
                "date": "2014-14-12"
            },
            {
                "id": "2",
                "title": "ABC",
                "content": "ABC",
                "date": "2014-14-12"
            }
        ];

        setBlogs(blogsList);
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

    const rows = blogs?.length > 0 ? blogs.map((blog) => ({
        id: blog.id,
        title: blog.title,
        date: blog.date,
    })) : [];

    const columns: GridColDef[] = [
        { field: "id", headerName: "ID", flex: 0.3 },
        { field: "title", headerName: "Tiêu đề", flex: 0.5 },
        { field: "content", headerName: "Nội dung", flex: 1.2 },
        { field: "date", headerName: "Ngày", flex: 0.5 },
        {
            field: '',
            headerName: 'Tác vụ',
            flex: 0.5,
            width: 170,
            renderCell: (params) => (
                <div className="action">
                    <VisibilityIcon onClick={() => navigate(`/blog-detail/${params.id}`)}></VisibilityIcon>
                    <AppRegistrationIcon></AppRegistrationIcon>
                    <DeleteIcon></DeleteIcon>
                </div>
            ),
        }
    ];

    return (
        <div id="Services">
            <div className="create-service">
                <h2 className="h2-title-page" >Bài viết</h2>
                <Button className="btn-create-service" onClick={() => { handleOpen() }}>Tạo mới</Button>
            </div>
            <div className="table" style={{ height: 400, width: "100%" }}>
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
                            Tạo bài viết
                        </span>
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        <div className="create-container">
                            <div className="group-input dual-input mb-24">
                                <label>Tiêu đề:</label>
                                <div className="form-input">
                                    <input type="Username" className="input regis-input" required onChange={(e) => { setTitle(e.target.value) }} />
                                    <span className="text-err"></span>
                                </div>
                            </div>
                            <div className="group-input individual-input mb-24">
                                <label>Nội dung:</label>
                                <div className="form-input">
                                    <textarea className="textarea regis-input" required onChange={(e) => { setContent(e.target.value) }} />
                                    <span className="text-err"></span>
                                </div>
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

export default Blogs