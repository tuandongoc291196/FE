import { SetStateAction, Dispatch, FC, useEffect, useState } from 'react'
import { ProductPriceReporterEntity } from '../../../types/entity/Entity';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import VisibilityIcon from '@mui/icons-material/Visibility';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from 'react-router';
import { Box, Button, FormControl, MenuItem, Modal, Select, Typography } from '@mui/material';
import "./Services.css";


interface Props {
    setMessageStatus: Dispatch<SetStateAction<string>>;
    setMessage: Dispatch<SetStateAction<string>>;
}


const ProductPriceReporter: FC<Props> = (props) => {
    const [reporters, setReporters] = useState<ProductPriceReporterEntity[]>([]);


    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    useEffect(() => {
        const reportersList: ProductPriceReporterEntity[] = [
            {
                "id": "1",
                "coupleName": "Couple 1",
                "categoryName": "Category 1",
                "serviceName": "Service 1",
                "requirement": "Requirement",
                "priceReport": "30000000",
            },
            {
                "id": "2",
                "coupleName": "Couple 2",
                "categoryName": "Category 2",
                "serviceName": "Service 2",
                "requirement": "Requirement",
                "priceReport": "30000000",
            }
        ];

        setReporters(reportersList);
    }, [])

    const rows = reporters?.length > 0 ? reporters.map((reporter) => ({
        id: reporter.id,
        coupleName: reporter.coupleName,
        categoryName: reporter.categoryName,
        serviceName: reporter.serviceName,
        requirement: reporter.requirement,
        priceReport: reporter.priceReport
    })) : [];

    const columns: GridColDef[] = [
        { field: "id", headerName: "ID", flex: 0.3 },
        { field: "coupleName", headerName: "Tên Couple", flex: 0.5 },
        { field: "categoryName", headerName: "Loại", flex: 0.8 },
        { field: "serviceName", headerName: "Dịch vụ", flex: 1.2 },
        { field: "requirement", headerName: "Yêu cầu", flex: 0.5 },
        { field: "priceReport", headerName: "Báo giá", flex: 0.5 },
        // {
        //   field: '',
        //   headerName: 'Tác vụ',
        //   flex: 0.5,
        //   width: 170,
        //   renderCell: (params) => (
        //     <div className="action">
        //       <VisibilityIcon onClick={() => navigate(`/service-detail/${params.id}`)}></VisibilityIcon>
        //       <AppRegistrationIcon></AppRegistrationIcon>
        //       <DeleteIcon></DeleteIcon>
        //     </div>
        //   ),
        // }
    ];

    return (
        <div id="Services">
            <h2 className="h2-title-page" >Báo giá</h2>
            <div className="table" style={{ height: 400, width: "100%" }}>
                <DataGrid rows={rows}
                    columns={columns}
                    autoPageSize
                    pagination />
            </div>
            {/* <Modal
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
            </Modal> */}
        </div>
    )
}

export default ProductPriceReporter