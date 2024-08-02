import { SetStateAction, Dispatch, FC, useEffect, useState } from 'react'
import "./Services.css";
import { ServiceCreate, ServiceEntity } from '../../../types/entity/Entity';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import VisibilityIcon from '@mui/icons-material/Visibility';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from 'react-router';
import { Box, Button, FormControl, MenuItem, Modal, Select, Typography } from '@mui/material';
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCamera } from '@fortawesome/free-solid-svg-icons';
import { AVAILABLE_PRICE, CONTACT_PRICE, ECONOMY_SEGMENT, LUXURY_SEGMENT } from '../../../constants/consts';
import { createService, getListCategories, getPromotionBySupplier, getServicesBySupplier } from '../../../redux/apiRequest';
import { CategoryItem } from '../../../types/schema/category';
import { useDispatch, useSelector } from 'react-redux';
import { PromotionItem } from '../../../types/schema/promotion';

interface Props {
    setMessageStatus: Dispatch<SetStateAction<string>>;
    setMessage: Dispatch<SetStateAction<string>>;
}

const storage = getStorage();

const priceTypes = [
    AVAILABLE_PRICE,
    CONTACT_PRICE
]

const segments = [
    ECONOMY_SEGMENT,
    LUXURY_SEGMENT
]

const Services: FC<Props> = (props) => {
    const user = useSelector((state: any) => state.auth.login.currentUser);
    const [services, setServices] = useState<ServiceEntity[]>([]);
    const [images, setImages] = useState<string[]>([]);
    const [categories, setCategories] = useState<CategoryItem[]>([]);
    const [category, setCategory] = useState<string>('');
    const [promotions, setPromotions] = useState<PromotionItem[]>([]);
    const [promotion, setPromotion] = useState<any>();
    const [priceType, setPriceType] = useState<string>(AVAILABLE_PRICE);
    const [segment, setSegment] = useState<any>(ECONOMY_SEGMENT);
    const [serviceName, setServiceName] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [price, setPrice] = useState<string>('0');

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        fetchData();
        fetchPromotions();
        fetchCategories();
    }, [])

    async function fetchData() {
        const response = await getServicesBySupplier(true, 0, 10, "id", user?.userId);
        setServices(response);
    }


    const fetchCategories = async () => {
        const response = await getListCategories(0, 10);
        if (response)
            if (response.status === "SUCCESS") {
                await setCategories(response?.data);
            }
            else setCategories([]);
    }

    const fetchPromotions = async () => {
        setPromotions(await getPromotionBySupplier(true, 0, 10, "id", user?.userId));
    }

    const uploadImage = async (files: FileList | null) => {
        if (files) {
            const fileRef = files[0];
            const storageRef = ref(storage, `images/${fileRef?.name}`);

            try {
                // Upload the file to Firebase Storage
                const snapshot = await uploadBytes(storageRef, fileRef);

                // Get the download URL for the file
                const downloadURL = await getDownloadURL(snapshot.ref);

                // Set the state to the download URL
                setImages([...images, downloadURL]);
            } catch (error) {
                console.error(error);
            }
        }
    };

    const handleCreate = async () => {
        try {
            let getImagesPayload = "";
            images.map((image) => {
                getImagesPayload += image + "\n, "
            })
            let categoryId = "";
            categoryId = categories.find((e) => e.categoryName == category)?.id as string;

            const newService: ServiceCreate = {
                categoryId: categoryId,
                description: description,
                images: getImagesPayload,
                listPromotionIds: promotion?.id,
                name: serviceName,
                price: parseInt(price),
                serviceSupplierId: user?.userId,
                type: segment.id,
            }

            const status = await createService(newService, user?.token, dispatch, navigate);

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

    const rows = services?.length > 0 ? services.map((service) => ({
        id: service.id,
        category: service?.categoryResponse?.categoryName,
        name: service?.name,
        description: service?.description,
        promotion: (service?.promotionService) ? service?.promotionService.percent + "%" : "",
        price: service?.price,
        type: service?.type
    })) : [];

    const columns: GridColDef[] = [
        { field: "id", headerName: "ID", flex: 0.3 },
        { field: "category", headerName: "Loại", flex: 0.5 },
        { field: "name", headerName: "Tên", flex: 0.8 },
        { field: "description", headerName: "Mô tả", flex: 1.2 },
        { field: "price", headerName: "Giá", flex: 0.5 },
        { field: "promotion", headerName: "Giảm giá", flex: 0.5 },
        { field: "type", headerName: "Phân khúc", flex: 0.5 },
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
            {
                (services?.length > 0) ? (
                    <>
                        <div className="create-service">
                            <h2 className="h2-title-page" >Dịch vụ</h2>
                            <Button className="btn-create-service" onClick={() => { handleOpen() }}>Tạo mới</Button>
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
                            <div className="group-input mb-24">
                                <label>Tên dịch vụ:</label>
                                <div className="form-input">
                                    <input type="Username" className="input regis-input" required onChange={(e) => { setServiceName(e.target.value) }} />
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
                                        (priceType == AVAILABLE_PRICE) ?
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
            </Modal>
        </div>
    )
}

export default Services