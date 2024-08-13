import * as React from 'react';
import { SetStateAction, Dispatch, FC, useEffect, useState } from 'react'
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from 'react-router';
import { Box, Button, FormControl, InputLabel, MenuItem, Modal, Select, Typography } from '@mui/material';
import "../../../constants/styles/TableService.css";
import { PromotionItem, PromotionItemCreate } from '../../../types/schema/promotion';
import { createPromotion, getPromotionBySupplier, getServicesSupplierFilter } from '../../../redux/apiRequest';
import { useSelector } from 'react-redux';
import dayjs, { Dayjs } from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import moment from 'moment';
import { PROMOTION_TYPES } from '../../../constants/consts';
import { ServiceSupplierItem } from '../../../types/schema/serviceSupplier';


interface Props {
    setMessageStatus: Dispatch<SetStateAction<string>>;
    setMessage: Dispatch<SetStateAction<string>>;
}

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '30%',
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
    const promotionTypes = Object.values(PROMOTION_TYPES);
    const [promotionType, setPromotionType] = useState<string>(promotionTypes[0]);
    const [serviceSupplierList, setServiceSupplierList] = useState<ServiceSupplierItem[]>([]);
    const [serviceSupplier, setServiceSupplier] = useState<ServiceSupplierItem>();
    const [name, setName] = useState<string>();



    const navigate = useNavigate();

    const [promotions, setPromotions] = useState<PromotionItem[]>([]);
    const [percent, setPercent] = useState('0');


    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);


    useEffect(() => {
        fetchData();
        fetchServiceSupplierData();
    }, [])

    async function fetchData() {
        const response = await getPromotionBySupplier(user?.userId);
        console.log(response);

        setPromotions(response);
    }

    async function fetchServiceSupplierData() {
        const response = await getServicesSupplierFilter(user?.userId);
        if (Array.isArray(response)) {
            setServiceSupplierList([...response]);
            setServiceSupplier(response[0]);
        } else {
            // Handle the case where response is not an array
            console.error('Response is not an array', response);
        }
    }

    const handleChangeServiceSupplier = (event: any) => {
        const selectedService = serviceSupplierList.find(ser => ser.id === event.target.value);
        if (selectedService) {
            setServiceSupplier(selectedService);
        }
    };

    const handleCreate = async () => {
        try {
            const newPromotion: PromotionItemCreate = {
                supplierId: user?.userId,
                value: parseInt(percent),
                name: `${name}`,
                startDate: startDate ? moment(startDate.toString()).format('YYYY-MM-DD') : '',
                endDate: endDate ? moment(endDate.toString()).format('YYYY-MM-DD') : '',
                listServiceSupplierId: [`${serviceSupplier?.id}`],
                type: promotionType
            }

            const status = await createPromotion(newPromotion, user?.token);
            if (status == "SUCCESS") {
                handleClose();
                fetchData();
            }
        } catch (error) {

        }
    }

    const rows = promotions?.length > 0 ? promotions?.map((promotion) => ({
        id: promotion.id,
        name: promotion.name,
        startDate: promotion.startDate,
        endDate: promotion.endDate,
        status: promotion.status,
        type: promotion.type
    })) : [];

    const columns: GridColDef[] = [
        { field: "id", headerName: "ID", flex: 0.3 },
        { field: "name", headerName: "Giảm", flex: 0.5 },
        { field: "startDate", headerName: "Ngày bắt đầu", flex: 0.5 },
        { field: "endDate", headerName: "Ngày hết hạn", flex: 0.5 },
        { field: "type", headerName: "Đơn vị", flex: 0.5 },
        { field: "status", headerName: "Trạng thái", flex: 0.5 },
        {
            field: '',
            headerName: 'Tác vụ',
            flex: 0.2,
            width: 170,
            renderCell: (params) => (
                <div className="action">
                    <DeleteIcon className="hover" style={{ color: "red" }}></DeleteIcon>
                </div>
            ),
        }
    ];

    return (
        <div id="Services">
            <div className="create-service">
                <h2 className="h2-title-page" >Giảm giá</h2>
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
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h2" component="h2">
                        <span>
                            Tạo giảm giá
                        </span>
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        <div className="create-container group-create-promotion">
                            <div className="group-input-100 mb-24">
                                <label>Tên mã giảm giá:</label>
                                <div className="form-input">
                                    <input type="Username" className="input regis-input" required onChange={(e) => { setName(e.target.value) }} />
                                    <span className="text-err"></span>
                                </div>
                            </div>
                            {/* <div className="group-input-40 mb-24 ml-8">
                                <label>Dịch vụ:</label>
                                <div className="form-input">
                                    {
                                        (serviceSupplier) ? (
                                            <FormControl className="form-input mr-24">
                                                <Select
                                                    className="input regis-input"
                                                    labelId="demo-simple-select-label"
                                                    id="demo-simple-select"
                                                    value={serviceSupplier?.id}
                                                    onChange={handleChangeServiceSupplier}
                                                >
                                                    {serviceSupplierList.map((service, index) => (
                                                        <MenuItem value={`${service?.id}`} key={index}>
                                                            {service?.name}
                                                        </MenuItem>
                                                    ))}
                                                </Select>
                                            </FormControl>
                                        ) : null
                                    }
                                </div>
                            </div> */}
                        </div>
                        <div className="create-container group-create-promotion">

                            <div className="group-input mb-24">
                                <label>Loại giảm giá:</label>
                                <div className="form-input">
                                    <FormControl className="form-input mr-24">
                                        <Select
                                            className="input regis-input"
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            value={promotionType}
                                            onChange={(event) => { setPromotionType(event.target.value) }}
                                            sx={{ padding: "8px 8px 17px" }}
                                        >
                                            {promotionTypes.map((type, index) => (
                                                <MenuItem className="menu-select-item" value={type} key={index}>
                                                    {type}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </div>
                            </div>
                            <div className="group-input-40 mb-24 ml-8">
                                <label>Giảm:</label>
                                <div className="form-input">
                                    <input type="Username" className="input regis-input" defaultValue={'0'} required onChange={(e) => { setPercent(e.target.value) }} />
                                    <span className="text-err"></span>
                                </div>
                            </div>

                        </div>

                        <div className="create-container group-create-promotion">
                            <div className="group-input-40 mb-24">
                                <label>Ngày bắt đầu:</label>
                                <div className="form-input">
                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                        <DemoContainer components={['DateTimePicker', 'DateTimePicker']}>
                                            <DateTimePicker
                                                value={startDate}
                                                onChange={(newValue) => setStartDate(newValue)}
                                                sx={{ width: '10%' }}
                                            />
                                        </DemoContainer>
                                    </LocalizationProvider>
                                </div>
                            </div>
                            <div className="group-input-40 mb-24">
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