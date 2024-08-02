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
        id: "CATEGORY",
        name: "invitations",
        label: "Thiệp cưới",
        icon: <WeddingIcon sx={{ fontSize: 40 }}/>,
        imageBig: "https://ggmeo.com/images/linh-thu-dtcl/ahri-ti-ni.jpg",
        imageSmall: "https://ggmeo.com/images/linh-thu-dtcl/ahri-ti-ni.jpg",
        imageIcon: "https://cdn-icons-png.freepik.com/512/104/104471.png",
        alt: "invitations",
        navigate: "/services/invitations",
        isPrice: true,
        items: []
    },
    {
        id: "CATEGORY",
        name: "jewelry",
        label: "Nhẫn cưới",
        icon: <DiamondIcon sx={{ fontSize: 40 }}/>,
        imageBig: "https://ggmeo.com/images/linh-thu-dtcl/ahri-ti-ni.jpg",
        imageSmall: "https://ggmeo.com/images/linh-thu-dtcl/ahri-ti-ni.jpg",
        imageIcon: "https://cdn.iconscout.com/icon/free/png-256/free-wedding-ring-1411380-1192859.png?f=webp",
        alt: "jewelry",
        navigate: "/services/jewelry",
        isPrice: true,
        items: []
    },
    {
        id: "CATEGORY",
        name: "photography",
        label: "Ảnh cưới",
        icon: <VendorManagerIcon sx={{ fontSize: 40 }}/>,
        imageBig: "https://ggmeo.com/images/linh-thu-dtcl/ahri-ti-ni.jpg",
        imageSmall: "https://ggmeo.com/images/linh-thu-dtcl/ahri-ti-ni.jpg",
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
        id: "CATEGORY",
        name: "outfits",
        label:"Trang phục",
        icon: <CheckroomIcon sx={{ fontSize: 40 }}/>,
        imageBig: "https://ggmeo.com/images/linh-thu-dtcl/ahri-ti-ni.jpg",
        imageSmall: "https://ggmeo.com/images/linh-thu-dtcl/ahri-ti-ni.jpg",
        imageIcon: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQSww9HjKznDB3Fq-NgA_YXXp4KL39e7I3ghQ&s",
        alt: "outfits",
        navigate: "/services/outfits",
        isPrice: true,
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
        id: "CATEGORY",
        name: "makeup",
        label: "Make up",
        icon: <AutoFixHighIcon sx={{ fontSize: 40 }}/>,
        imageBig: "https://ggmeo.com/images/linh-thu-dtcl/ahri-ti-ni.jpg",
        imageSmall: "https://ggmeo.com/images/linh-thu-dtcl/ahri-ti-ni.jpg",
        imageIcon: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS85U5US0cu3mQuWLwwd0hOWeBYkw1l37EGBw&s",
        alt: "makeup",
        navigate: "/services/makeup",
        isPrice: true,
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
        id: "CATEGORY",
        name: "wedding-car",
        label: "Xe hoa",
        icon: <DirectionsCarIcon sx={{ fontSize: 40 }}/>,
        imageBig: "https://ggmeo.com/images/linh-thu-dtcl/ahri-ti-ni.jpg",
        imageSmall: "https://ggmeo.com/images/linh-thu-dtcl/ahri-ti-ni.jpg",
        imageIcon: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTDmzg5K4bbnIlob6SB2zFzlmcB9WRScV4R6A&s",
        alt: "wedding-car",
        navigate: "/services/wedding-car",
        isPrice: false,
        items: []
    },
    {
        id: "CATEGORY",
        name: "venues",
        label: "Địa điểm",
        icon: <RegistryIcon sx={{ fontSize: 40 }}/>,
        imageBig: "https://ggmeo.com/images/linh-thu-dtcl/ahri-ti-ni.jpg",
        imageSmall: "https://ggmeo.com/images/linh-thu-dtcl/ahri-ti-ni.jpg",
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
        id: "CATEGORY",
        name: "decoration",
        label:"Trang trí",
        icon: <SeatingChartIcon sx={{ fontSize: 40 }}/>,
        imageBig: "https://ggmeo.com/images/linh-thu-dtcl/ahri-ti-ni.jpg",
        imageSmall: "https://ggmeo.com/images/linh-thu-dtcl/ahri-ti-ni.jpg",
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
        id: "CATEGORY",
        name: "wedding-gifts",
        label: "Lễ vật",
        icon: <RegistryIcon sx={{ fontSize: 40 }}/>,
        imageBig: "https://ggmeo.com/images/linh-thu-dtcl/ahri-ti-ni.jpg",
        imageSmall: "https://ggmeo.com/images/linh-thu-dtcl/ahri-ti-ni.jpg",
        imageIcon: "https://cdn.iconscout.com/icon/premium/png-256-thumb/wedding-gift-3842622-3190391.png",
        alt: "wedding-gifts",
        navigate: "/services/wedding-gifts",
        isPrice: true,
        items: [
            {
                id: "Category",
                name: "Lễ vật dậm ngõ"
            },
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