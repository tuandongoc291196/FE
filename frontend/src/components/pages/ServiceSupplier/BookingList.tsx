import { SetStateAction, Dispatch, FC, useEffect, useState } from 'react'
import "./Services.css";
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import VisibilityIcon from '@mui/icons-material/Visibility';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from 'react-router';
import { Box, Button, FormControl, MenuItem, Modal, Select, Typography } from '@mui/material';
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCamera } from '@fortawesome/free-solid-svg-icons';
import { CategoryItem } from '../../../types/schema/category';
import { useDispatch, useSelector } from 'react-redux';
import { PromotionItem } from '../../../types/schema/promotion';
import { BookingItem } from '../../../types/schema/booking';
import { getBookingBySupplierId } from '../../../redux/apiRequest';
import { BOOKING_STATUS } from '../../../constants/consts';

interface Props {
    setMessageStatus: Dispatch<SetStateAction<string>>;
    setMessage: Dispatch<SetStateAction<string>>;
}

const storage = getStorage();

const convertStatusName = (status: string) => {
    switch (status) {
        case BOOKING_STATUS.cancel:
            return "Đã huỷ"
        case BOOKING_STATUS.confirm:
            return "Đã xác nhận"
        default: return "Đang đợi"
    }
}

const BookingList: FC<Props> = (props) => {
    const user = useSelector((state: any) => state.auth.login.currentUser);
    const [bookingList, setBookingList] = useState<BookingItem[]>([]);
    const [images, setImages] = useState<string[]>([]);
    const [bookingName, setBookingName] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [price, setPrice] = useState<string>('0');

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const bookingStatuses = Object.values(BOOKING_STATUS);

    useEffect(() => {
        fetchData();
    }, [])

    async function fetchData() {
        const response = await getBookingBySupplierId(user?.userId, user?.token);
        setBookingList(response);
    }

    const rows = bookingList?.length > 0 ? bookingList.map((booking) => ({
        id: booking.id,
        createdAt: booking.createdAt,
        status: booking.status,
    })) : [];

    const columns: GridColDef[] = [
        { field: "coupleName", headerName: "Tên couple", flex: 0.5 },
        {
            field: '',
            headerName: 'Chi tiết dịch vụ',
            flex: 0.5,
            width: 170,
            renderCell: (params) => (
                <button className="btn-admin-disable" onClick={() => {
                    // handleDisable(params.row.id);
                }}>
                    Xem chi tiết
                </button>
            ),
        },
        { field: "createdAt", headerName: "Ngày booking", flex: 0.5 },
        {
            field: 'status',
            headerName: 'Trạng thái',
            flex: 0.3,
            width: 170,
            renderCell: (params) => (
                <FormControl className="form-input price">
                    <Select
                        className="input regis-input"
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={params.row.status}
                    >
                        {
                            bookingStatuses.map((status: any, index) => {
                                return (
                                    <MenuItem value={status} key={index}><div style={{ fontSize: "4rem !important" }}>{convertStatusName(status)}</div></MenuItem>
                                )
                            })
                        }
                    </Select>
                </FormControl>
            ),
        },
    ];

    return (
        <div id="Services">
            {
                (bookingList?.length > 0) ? (
                    <>
                        <div className="create-booking">
                            <h2 className="h2-title-page" >Booking</h2>
                        </div>
                        <div className="table" style={{ height: 400, width: "100%" }}>
                            <DataGrid rows={rows}
                                columns={columns}
                                autoPageSize
                                pagination />
                        </div>
                    </>
                ) : null
            }

            {/* <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                id="ModalCreateBooking"
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
                            <div className="group-input mb-24">
                                <label>Tên dịch vụ:</label>
                                <div className="form-input">
                                    <input type="Username" className="input regis-input" required onChange={(e) => { setBookingName(e.target.value) }} />
                                    <span className="text-err"></span>
                                </div>
                            </div>
                            <div className="group-input mb-24">
                                <label>Loại:</label>
                                <FormControl className="form-input price">
                                    <Select
                                        className="input regis-input"
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={category}
                                        onChange={(e) => {
                                            setCategory(e.target.value as string); console.log(e.target.value);
                                        }}
                                    >
                                        {
                                            categories.map((category: any, index) => {
                                                return (
                                                    <MenuItem value={category.categoryName} key={index}>{category?.categoryName}</MenuItem>
                                                )
                                            })
                                        }
                                    </Select>
                                </FormControl>
                            </div>
                            <div className="group-input mb-24">
                                <label>Phân khúc:</label>
                                <FormControl className="form-input price">
                                    <Select
                                        className="input regis-input"
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={segment}
                                        onChange={(e) => { setSegment(e.target.value) }}
                                    >
                                        {
                                            segments.map((segment: any, index) => {
                                                return (
                                                    <MenuItem value={segment} key={index}>{segment.name}</MenuItem>
                                                )
                                            })
                                        }
                                    </Select>
                                </FormControl>
                            </div>
                            <div className="group-input mb-24">
                                <label>Giá:</label>
                                <div className="form-input price">
                                    <FormControl className="form-input mr-24">
                                        <Select
                                            className="input regis-input"
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            value={priceType}
                                            onChange={(e) => { setPriceType(e.target.value) }}
                                        >
                                            {
                                                priceTypes.map((type, index) => {
                                                    return (
                                                        <MenuItem value={type} key={index}>{type}</MenuItem>
                                                    )
                                                })
                                            }
                                        </Select>
                                    </FormControl>
                                    {
                                        (priceType == availablePrice) ?
                                            (
                                                <div className="form-input price-input">
                                                    <input type="Username" className="input regis-input" required onChange={(e) => { setPrice(e.target.value) }} />
                                                    <span className="text-err"></span>
                                                </div>
                                            ) : null
                                    }
                                </div>
                            </div>
                            <div className="group-input mb-24">
                                <label>Mã giảm giá:</label>
                                <FormControl className="form-input price">
                                    <Select
                                        className="input regis-input"
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={promotion}
                                        onChange={(e) => { setPromotion(e.target.value) }}
                                    >
                                        {
                                            promotions?.map((promotion: any, index) => {
                                                return (
                                                    <MenuItem value={promotion} key={index}>{promotion.promotionDetails}</MenuItem>
                                                )
                                            })
                                        }
                                    </Select>
                                </FormControl>
                            </div>
                            <div className="group-input mb-24"></div>
                            <div className="group-input individual-input mb-24">
                                <label>Mô tả:</label>
                                <div className="form-input">
                                    <textarea className="textarea regis-input" required onChange={(e) => { setDescription(e.target.value) }} />
                                    <span className="text-err"></span>
                                </div>
                            </div>
                            <div className="group-input individual-input mb-24">
                                <label>Ảnh:</label>
                                <div className="form-input">
                                    <div className="img-input" style={{ cursor: "pointer" }} onClick={(e) => {
                                        document.getElementById("img-file")?.click();
                                    }}>
                                        <input type="file" id="img-file" accept='.jpg, .png' style={{ display: "none" }} onChange={(e) => { uploadImage(e.target.files) }} />
                                        <Button className="btn-create" variant="contained">Thêm ảnh</Button>
                                    </div>
                                    <div className="images">
                                        {
                                            images.map((item, index) => {
                                                return (
                                                    <div className="img-item" key={index}>
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
            </Modal> */}
        </div>
    )
}

export default BookingList