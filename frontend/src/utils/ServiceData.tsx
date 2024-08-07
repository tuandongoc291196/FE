import WeddingIcon from '@mui/icons-material/Favorite';
import VendorManagerIcon from '@mui/icons-material/AccountBox';
import SeatingChartIcon from '@mui/icons-material/EventSeat';
import RegistryIcon from '@mui/icons-material/CardGiftcard';
import DiamondIcon from '@mui/icons-material/Diamond';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';
import CheckroomIcon from '@mui/icons-material/Checkroom';

export const ServiceData = [
    {
        id: "CATEGORY-2",
        name: "invitations",
        label: "Thiệp cưới",
        icon: <WeddingIcon sx={{ fontSize: 40 }}/>,
        imageBig: "https://ggmeo.com/images/linh-thu-dtcl/ahri-ti-ni.jpg",
        imageSmall: "https://firebasestorage.googleapis.com/v0/b/weddingwise-daa83.appspot.com/o/images%2Fwedding-menu-card.png?alt=media&token=fe5de34c-c70f-40b5-bb1c-d2321bfb3493",
        imageIcon: "https://cdn-icons-png.freepik.com/512/104/104471.png",
        alt: "invitations",
        navigate: "/services/invitations",
        items: [
            {
                id: "Category",
                name: "Hiện Đại"
            },
            {
                id: "Category",
                name: "Truyền thống"
            },
        ]
    },
    {
        id: "CATEGORY-15",
        name: "jewelry",
        label: "Nhẫn cưới",
        icon: <DiamondIcon sx={{ fontSize: 40 }}/>,
        imageBig: "https://ggmeo.com/images/linh-thu-dtcl/ahri-ti-ni.jpg",
        imageSmall: "https://firebasestorage.googleapis.com/v0/b/weddingwise-daa83.appspot.com/o/images%2Fwedding-menu-rings.png?alt=media&token=9cb0b34c-7f39-47c5-8ae4-aef7c95615d8",
        imageIcon: "https://cdn.iconscout.com/icon/free/png-256/free-wedding-ring-1411380-1192859.png?f=webp",
        alt: "jewelry",
        navigate: "/services/jewelry",
        items: [
            {
                id: "Category",
                name: "Nhẫn Bạc"
            },
            {
                id: "Category",
                name: "Nhẫn Vàng"
            },
        ]
    },
    {
        id: "CATEGORY-1",
        name: "photography",
        label: "Ảnh cưới",
        icon: <VendorManagerIcon sx={{ fontSize: 40 }}/>,
        imageBig: "https://ggmeo.com/images/linh-thu-dtcl/ahri-ti-ni.jpg",
        imageSmall: "https://firebasestorage.googleapis.com/v0/b/weddingwise-daa83.appspot.com/o/images%2Fwedding-menu-photographer.png?alt=media&token=c6bb45c1-5796-440d-a5b9-9f62e1fc5a07",
        imageIcon: "https://cdn3.iconfinder.com/data/icons/wedding-love/64/wedding-photography-camera-love-photo-512.png",
        alt: "photography",
        navigate: "/services/photography",
        isPrice: false,
        items: [
            {
                id: "Category",
                name: "Studio"
            },
            {
                id: "Category",
                name: "Ngoại cảnh"
            },
            {
                id: "Category",
                name: "Phóng sự"
            }
        ]
    },
    {
        id: "CATEGORY-17",
        name: "outfits",
        label:"Trang phục",
        icon: <CheckroomIcon sx={{ fontSize: 40 }}/>,
        imageBig: "https://ggmeo.com/images/linh-thu-dtcl/ahri-ti-ni.jpg",
        imageSmall: "https://firebasestorage.googleapis.com/v0/b/weddingwise-daa83.appspot.com/o/images%2Fwedding-menu-trangphuc.png?alt=media&token=fec02c00-0d92-4a4c-bf8f-7c97d7d12e7b",
        imageIcon: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQSww9HjKznDB3Fq-NgA_YXXp4KL39e7I3ghQ&s",
        alt: "outfits",
        navigate: "/services/outfits",
        items: [
            {
                id: "Category",
                name: "Trang phục truyền thống"
            },
            {
                id: "Category",
                name: "Vest"
            },
            {
                id: "Category",
                name: "Váy cưới"
            },
            {
                id: "Category",
                name: "Trang phục bưng quả"
            }
        ]
    },
    {
        id: "CATEGORY-18",
        name: "makeup",
        label: "Make up",
        icon: <AutoFixHighIcon sx={{ fontSize: 40 }}/>,
        imageBig: "https://ggmeo.com/images/linh-thu-dtcl/ahri-ti-ni.jpg",
        imageSmall: "https://firebasestorage.googleapis.com/v0/b/weddingwise-daa83.appspot.com/o/images%2Fwedding-menu-makeup.png?alt=media&token=8bff91aa-957c-494a-92db-c20c72b143a6",
        imageIcon: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS85U5US0cu3mQuWLwwd0hOWeBYkw1l37EGBw&s",
        alt: "makeup",
        navigate: "/services/makeup",
        items: [
            {
                id: "Category",
                name: "Makeup tiệc"
            },
            {
                id: "Category",
                name: "Makeup chụp ảnh"
            }
        ]
    },
    {
        id: "CATEGORY-19",
        name: "wedding-car",
        label: "Xe hoa",
        icon: <DirectionsCarIcon sx={{ fontSize: 40 }}/>,
        imageBig: "https://ggmeo.com/images/linh-thu-dtcl/ahri-ti-ni.jpg",
        imageSmall: "https://firebasestorage.googleapis.com/v0/b/weddingwise-daa83.appspot.com/o/images%2Fwedding-menu-xehoa.png?alt=media&token=bee0fa89-3801-459a-bc27-2f0b8bf7bc3b",
        imageIcon: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTDmzg5K4bbnIlob6SB2zFzlmcB9WRScV4R6A&s",
        alt: "wedding-car",
        navigate: "/services/wedding-car",
        isPrice: false,
        items: [
            {
                id: "Category",
                name: "Xe Cổ"
            },
            {
                id: "Category",
                name: "Xe hiện đại"
            },
            {
                id: "Category",
                name: "Siêu xe"
            }
        ]
    },
    {
        id: "CATEGORY-20",
        name: "venues",
        label: "Địa điểm",
        icon: <RegistryIcon sx={{ fontSize: 40 }}/>,
        imageBig: "https://ggmeo.com/images/linh-thu-dtcl/ahri-ti-ni.jpg",
        imageSmall: "https://firebasestorage.googleapis.com/v0/b/weddingwise-daa83.appspot.com/o/images%2Fwedding-menu-diadiem.png?alt=media&token=ed3b9adf-cda3-48f5-be78-a698520a2196",
        imageIcon: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcReDVUUM52o9C-9oUVUuW6l_rRHgqpdCG9JUQ&s",
        alt: "venues",
        navigate: "/services/venues",
        isPrice: false,
        items: [
            {
                id: "Category",
                name: "Nhà hàng tiệc cưới"
            },
            {
                id: "Category",
                name: "Khách sạn"
            },
            {
                id: "Category",
                name: "Resort"
            },
            {
                id: "Category",
                name: "Biệt thự"
            },
            {
                id: "Category",
                name: "Dịch vụ ăn uống"
            }
        ]
    },
    {
        id: "CATEGORY-21",
        name: "decoration",
        label:"Trang trí",
        icon: <SeatingChartIcon sx={{ fontSize: 40 }}/>,
        imageBig: "https://ggmeo.com/images/linh-thu-dtcl/ahri-ti-ni.jpg",
        imageSmall: "https://firebasestorage.googleapis.com/v0/b/weddingwise-daa83.appspot.com/o/images%2Fwedding-menu-trangtri.png?alt=media&token=1817f253-ed2c-4442-9080-2f7aaeb67775",
        imageIcon: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQKSV4hES-9kCuXRpShL4ThzMtTzPtOLzC2pQ&s",
        alt: "decoration",
        navigate: "/services/decoration",
        isPrice: false,
        items: [
            {
                id: "Category",
                name: "Trang trí gia tiên"
            },
            {
                id: "Category",
                name: "Trang trí cổng hoa"
            },
            {
                id: "Category",
                name: "Trang trí sân khấu - lối đi"
            },
            {
                id: "Category",
                name: "Trang trí bàn tiệc"
            },
            {
                id: "Category",
                name: "Hoa cưới"
            }
        ]
    },
    {
        id: "CATEGORY-22",
        name: "wedding-gifts",
        label: "Sính Lễ",
        icon: <RegistryIcon sx={{ fontSize: 40 }}/>,
        imageBig: "https://ggmeo.com/images/linh-thu-dtcl/ahri-ti-ni.jpg",
        imageSmall: "https://firebasestorage.googleapis.com/v0/b/weddingwise-daa83.appspot.com/o/images%2Fwedding-menu-levat.png?alt=media&token=83da54e1-bbef-46ce-b2e5-6ab3fbc9d4ed",
        imageIcon: "https://cdn.iconscout.com/icon/premium/png-256-thumb/wedding-gift-3842622-3190391.png",
        alt: "wedding-gifts",
        navigate: "/services/wedding-gifts",
        items: [
            {
                id: "Category",
                name: "Mâm quả cưới hỏi"
            },
            {
                id: "Category",
                name: "Bánh kem cưới"
            }
        ]
    },
]