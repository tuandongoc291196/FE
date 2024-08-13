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
import { confirmBookingDetail, getBookingBySupplierId, rejectBookingDetail } from '../../../redux/apiRequest';
import { BOOKING_STATUS } from '../../../constants/consts';
import "./BookingList.css";
import { BookingDetailItem } from '../../../types/schema/booking';

interface Props {
    setMessageStatus: Dispatch<SetStateAction<string>>;
    setMessage: Dispatch<SetStateAction<string>>;
}

const storage = getStorage();

const convertStatusName = (status: string) => {
    switch (status) {
        case BOOKING_STATUS.cancel:
            return "Đã huỷ"
        case BOOKING_STATUS.completed:
            return "Đã hoàn thành"
        case BOOKING_STATUS.approved:
            return "Đã xác nhận"
        case BOOKING_STATUS.reject:
            return "Đã từ chối"
        case BOOKING_STATUS.processing:
            return "Đang thực hiện"
        default: return "Đang đợi"
    }
}

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '40%',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const BookingList: FC<Props> = (props) => {
    const user = useSelector((state: any) => state.auth.login.currentUser);
    const [bookingList, setBookingList] = useState<BookingDetailItem[]>([]);
    const [note, setNote] = useState<string>('');
    const [bookingDetail, setBookingDetail] = useState<BookingDetailItem>();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [bookingDetailRows, setBookingDetailRows] = useState<any>([]);
    const [bookingDetailCols, setBookingDetailCols] = useState<GridColDef[]>([]);


    const [open, setOpen] = useState(false);
    const handleClose = () => { setNote(''); setOpen(false) };

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

    async function rejectBooking(bookingDetailId: string) {
        await rejectBookingDetail(bookingDetailId, user?.token)
        fetchData();
    }

    async function approveBooking(bookingDetailId: string) {
        await confirmBookingDetail(bookingDetailId, user?.token)
        fetchData();
    }

    const rows = bookingList?.length > 0 ? bookingList.map((booking) => ({
        id: booking.bookingDetailId,
        coupleName: booking.couple.partnerName1,
        weddingDate: booking.couple.weddingDate,
        phone: booking.couple.account.phoneNumber,
        serviceSupplyName: booking.serviceSupplierResponse.name,
        type: booking.serviceSupplierResponse.type,
        price: booking.price,
        promotionName: booking?.promotionResponse?.name,
        completedDate: booking.completedDate,
        note: booking.note,
        createAt: booking.createAt,
        status: convertStatusName(`${booking.status}`),
        booking: booking
    })) : [];

    const columns: GridColDef[] = [
        { field: "id", headerName: "ID", flex: 0.5 },
        { field: "coupleName", headerName: "Tên couple", flex: 0.5 },
        { field: "price", headerName: "Giá", flex: 0.5 },
        { field: "completedDate", headerName: "Ngày hoàn thành", flex: 0.5 },
        { field: "weddingDate", headerName: "Ngày cưới", flex: 0.5 },
        { field: "status", headerName: "Trạng thái", flex: 0.5 },
        {
            field: 'note',
            headerName: 'Chi tiết',
            flex: 0.5,
            width: 170,
            renderCell: (params) => (
                <>
                    <Button style={{ fontSize: '1.2rem' }} className="btn-admin-disable" onClick={() => {
                        handleOpen(params.row.note)
                    }}>
                        Xem chi tiết
                    </Button>
                </>
            ),
        },
        {
            field: '',
            headerName: 'Tác vụ',
            flex: 0.45,
            width: 170,
            renderCell: (params) => (
                (params?.row.booking.status == "PENDING") ?
                    (
                        <div className="group-btn">
                            <Button variant="contained" component="span" style={{ backgroundColor: 'red', marginRight: '15px' }}
                                onClick={() => { rejectBooking(params?.row.id) }}
                            >
                                {BOOKING_STATUS.reject.replace(BOOKING_STATUS.reject, "REJECT")}
                            </Button>
                            <Button variant="contained" component="span" style={{ backgroundColor: 'green' }}
                                onClick={() => { approveBooking(params?.row.id) }}
                            >
                                {BOOKING_STATUS.approved.replace(BOOKING_STATUS.approved, "APPROVE")}
                            </Button>
                        </div>
                    ) : null
            ),
        },
    ];

    const handleOpen = (note: string) => {
        setNote(note);
        // setBookingDetail(booking);
        // const rows = booking.serviceBookings?.length > 0 ? booking.serviceBookings.map((item) => ({
        //     id: item.service.id,
        //     name: item.service.name,
        //     price: item.bookingPrice,
        //     status: item.service.status,
        // })) : [];

        // const columns: GridColDef[] = [
        //     { field: "name", headerName: "Tên dịch vụ", flex: 1.2 },
        //     { field: "price", headerName: "Giá tiền", flex: 0.5 },
        //     {
        //         field: 'status',
        //         headerName: 'Trạng thái',
        //         flex: 0.3,
        //         width: 170,
        //         renderCell: (params) => (
        //             <FormControl className="form-input price">
        //                 <Select
        //                     className="input regis-input"
        //                     labelId="demo-simple-select-label"
        //                     id="demo-simple-select"
        //                     value={params.row.status}
        //                 >
        //                     {
        //                         bookingStatuses.map((status: any, index) => {
        //                             return (
        //                                 <MenuItem value={status} key={index}><div style={{ fontSize: "4rem !important" }}>{convertStatusName(status)}</div></MenuItem>
        //                             )
        //                         })
        //                     }
        //                 </Select>
        //             </FormControl>
        //         ),
        //     },
        // ];
        // if (rows) {
        //     setBookingDetailRows(rows);
        //     setBookingDetailCols(columns);
        // }
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
            {
                (note != '') ? (
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
                                    {note}
                                </span>
                            </Typography>
                            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                                <div className="btn-handle">
                                    <Button className="btn-close mr-24" variant="contained" onClick={() => { handleClose() }}>Đóng</Button>
                                </div>
                            </Typography>
                        </Box>
                    </Modal>
                ) : null
            }

            {/* <Modal
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
                                    <span className='booking-detail-info' >{bookingDetail?.createAt}</span>
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
                                    <span className='booking-detail-info' >{`${bookingDetail?.price}`}</span>
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
            </Modal> */}
        </div>
    )
}

export default BookingList