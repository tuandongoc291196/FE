import * as React from 'react';
import { SetStateAction, Dispatch, FC, useEffect, useState } from 'react'
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from 'react-router';
import { Box, Button, FormControl, MenuItem, Modal, Select, Typography } from '@mui/material';
import "../../../constants/styles/TableService.css";
import { PromotionItem, PromotionItemCreate } from '../../../types/schema/promotion';
import { createPromotion, getPromotionBySupplier } from '../../../redux/apiRequest';
import { useSelector } from 'react-redux';
import dayjs, { Dayjs } from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import moment from 'moment';


interface Props {
    setMessageStatus: Dispatch<SetStateAction<string>>;
    setMessage: Dispatch<SetStateAction<string>>;
}

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '50%',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const Promotions: FC<Props> = (props) => {
    const user = useSelector((state: any) => state.auth.login.currentUser);
    const now = new Date();
    const [startDate, setStartDate] = React.useState<Dayjs | null>(dayjs(now));
    const [endDate, setEndDate] = React.useState<Dayjs | null>(dayjs(now));

    const navigate = useNavigate();

    const [promotions, setPromotions] = useState<PromotionItem[]>([]);
    const [percent, setPercent] = useState('0');


    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    useEffect(() => {
        fetchData();

    }, [])

    async function fetchData() {
        const response = await getPromotionBySupplier(true, 0, 10, "id", user?.userId);
        setPromotions(response);
    }

    const handleCreate = async () => {
        try {
            const newPromotion: PromotionItemCreate = {
                listServiceIds: "SERVICE-12",
                percent: parseInt(percent),
                promotionDetails: "string",
                startDate: startDate ? moment(startDate.toString()).format('YYYY-MM-DD') : '',
                endDate: endDate ? moment(endDate.toString()).format('YYYY-MM-DD') : '',
                supplierId: user?.userId
            }
            const status = await createPromotion(newPromotion, user?.token);
            if (status == "SUCCESS") {
                handleClose();
                fetchData();
            }
        } catch (error) {

        }
    }

    const rows = promotions?.length > 0 ? promotions.map((promotion) => ({
        id: promotion.id,
        percent: promotion.percent + "%",
        startDate: promotion.startDate,
        endDate: promotion.endDate,
        status: promotion.status,
    })) : [];

    const columns: GridColDef[] = [
        { field: "id", headerName: "ID", flex: 0.3 },
        { field: "percent", headerName: "Giảm", flex: 0.5 },
        { field: "startDate", headerName: "Ngày bắt đầu", flex: 0.5 },
        { field: "endDate", headerName: "Ngày hết hạn", flex: 0.5 },
        { field: "status", headerName: "Trạng thái", flex: 0.5 },
        {
            field: '',
            headerName: '',
            flex: 0.1,
            width: 170,
            renderCell: (params) => (
                <div className="action">
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
                    pagination />
            </div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                id="ModalCreateService"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h2" component="h2">
                        <span style={{ fontSize: "3rem !important" }}>
                            Tạo giảm giá
                        </span>
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        <div className="create-container">
                            <div className="group-input-10 mb-24">
                                <label>Giảm (%):</label>
                                <div className="form-input">
                                    <input type="Username" className="input regis-input" defaultValue={'0'} required onChange={(e) => { setPercent(e.target.value) }} />
                                    <span className="text-err"></span>
                                </div>
                            </div>
                            <div className="group-input-35 mb-24">
                                <label>Ngày bắt đầu:</label>
                                <div className="form-input">
                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                        <DemoContainer components={['DateTimePicker', 'DateTimePicker']}>
                                            <DateTimePicker
                                                value={startDate}
                                                onChange={(newValue) => setStartDate(newValue)}
                                            />
                                        </DemoContainer>
                                    </LocalizationProvider>
                                </div>
                            </div>
                            <div className="group-input-35 mb-24">
                                <div className="form-input">
                                    <label>Ngày hết hạn:</label>
                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                        <DemoContainer components={['DateTimePicker', 'DateTimePicker']}>
                                            <DateTimePicker
                                                value={endDate}
                                                onChange={(newValue) => setEndDate(newValue)}
                                            />
                                        </DemoContainer>
                                    </LocalizationProvider>
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

export default Promotions