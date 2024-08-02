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
import "./BookingList.css";

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

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '70%',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const BookingList: FC<Props> = (props) => {
    const user = useSelector((state: any) => state.auth.login.currentUser);
    const [bookingList, setBookingList] = useState<BookingItem[]>([]);
    const [bookingDetail, setBookingDetail] = useState<BookingItem>();
    const [bookingDetailRows, setBookingDetailRows] = useState<any>([]);
    const [bookingDetailCols, setBookingDetailCols] = useState<GridColDef[]>([]);


    const [open, setOpen] = useState(false);
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
        coupleName: booking.couple.partnerName1,
        createdAt: booking.createdAt,
        status: booking.status,
        booking: booking
    })) : [];

    const columns: GridColDef[] = [
        { field: "id", headerName: "ID", flex: 0.3 },
        { field: "coupleName", headerName: "Tên couple", flex: 0.5 },
        {
            field: '',
            headerName: 'Chi tiết dịch vụ',
            flex: 0.5,
            width: 170,
            renderCell: (params) => (
                <button className="btn-admin-disable" onClick={() => {
                    handleOpen(params.row.booking)
                }}>
                    Xem chi tiết
                </button>
            ),
        },
        { field: "createdAt", headerName: "Ngày booking", flex: 0.5 },
    ];

    const handleOpen = (booking: BookingItem) => {
        setBookingDetail(booking);
        const rows = booking.serviceBookings?.length > 0 ? booking.serviceBookings.map((item) => ({
            id: item.service.id,
            name: item.service.name,
            price: item.bookingPrice,
            status: item.service.status,
        })) : [];

        const columns: GridColDef[] = [
            { field: "name", headerName: "Tên dịch vụ", flex: 1.2 },
            { field: "price", headerName: "Giá tiền", flex: 0.5 },
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
        if (rows) {
            setBookingDetailRows(rows);
            setBookingDetailCols(columns);
        }
        setOpen(true);
    }

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
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                id="BookingDetailModal"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        <span style={{ fontSize: "3rem !important" }}>
                            Chi tiết dịch vụ
                        </span>
                        <div className="create-container">
                            <div className="group-input mb-24">
                                <label className='booking-detail-label'>Ngày booking:</label>
                                <div className="form-input">
                                    <span className='booking-detail-info' >{bookingDetail?.createdAt}</span>
                                </div>
                            </div>
                            <div className="group-input mb-24">
                                <label className='booking-detail-label'>Ngày cưới:</label>
                                <div className="form-input">
                                    <span className='booking-detail-info' >{bookingDetail?.couple.weddingDate}</span>
                                </div>
                            </div>
                            <div className="group-input mb-24">
                                <label className='booking-detail-label'>Tổng tiền:</label>
                                <div className="form-input">
                                    <span className='booking-detail-info' >{`${bookingDetail?.totalPrice}`}</span>
                                </div>
                            </div>
                        </div>
                        <div className="table" style={{ height: 400, width: "100%" }}>
                            <DataGrid rows={bookingDetailRows}
                                columns={bookingDetailCols}
                                autoPageSize
                                pagination />
                        </div>
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        <div className="btn-handle">
                            <Button className="btn-close mr-24" variant="contained" onClick={() => { handleClose() }}>Huỷ</Button>
                        </div>
                    </Typography>
                </Box>
            </Modal>
        </div>
    )
}

export default BookingList