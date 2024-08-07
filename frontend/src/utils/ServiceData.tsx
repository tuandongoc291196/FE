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
        id: "CATEGORY-1",
        name: "invitations",
        label: "Thiệp cưới",
        icon: <WeddingIcon sx={{ fontSize: 40 }} />,
        imageBig: "https://ggmeo.com/images/linh-thu-dtcl/ahri-ti-ni.jpg",
        imageSmall: "https://ggmeo.com/images/linh-thu-dtcl/ahri-ti-ni.jpg",
        imageIcon: "https://cdn-icons-png.freepik.com/512/104/104471.png",
        alt: "invitations",
        navigate: "/services/invitations",
        items: [
            {
                id: "SERVICE-1",
                name: "Hiện Đại"
            },
            {
                id: "SERVICE-2",
                name: "Truyền thống"
            },
        ]
    },
    {
        id: "CATEGORY-2",
        name: "jewelry",
        label: "Nhẫn cưới",
        icon: <DiamondIcon sx={{ fontSize: 40 }} />,
        imageBig: "https://ggmeo.com/images/linh-thu-dtcl/ahri-ti-ni.jpg",
        imageSmall: "https://ggmeo.com/images/linh-thu-dtcl/ahri-ti-ni.jpg",
        imageIcon: "https://cdn.iconscout.com/icon/free/png-256/free-wedding-ring-1411380-1192859.png?f=webp",
        alt: "jewelry",
        navigate: "/services/jewelry",
        items: [
            {
                id: "SERVICE-3",
                name: "Nhẫn Bạc"
            },
            {
                id: "SERVICE-4",
                name: "Nhẫn Vàng"
            },
        ]
    },
    {
        id: "CATEGORY-3",
        name: "photography",
        label: "Ảnh cưới",
        icon: <VendorManagerIcon sx={{ fontSize: 40 }} />,
        imageBig: "https://ggmeo.com/images/linh-thu-dtcl/ahri-ti-ni.jpg",
        imageSmall: "https://ggmeo.com/images/linh-thu-dtcl/ahri-ti-ni.jpg",
        imageIcon: "https://cdn3.iconfinder.com/data/icons/wedding-love/64/wedding-photography-camera-love-photo-512.png",
        alt: "photography",
        navigate: "/services/photography",
        isPrice: false,
        items: [
            {
                id: "SERVICE-5",
                name: "Studio"
            },
            {
                id: "SERVICE-6",
                name: "Ngoại cảnh"
            },
            {
                id: "SERVICE-7",
                name: "Phóng sự"
            }
        ]
    },
    {
        id: "CATEGORY-4",
        name: "outfits",
        label: "Trang phục",
        icon: <CheckroomIcon sx={{ fontSize: 40 }} />,
        imageBig: "https://ggmeo.com/images/linh-thu-dtcl/ahri-ti-ni.jpg",
        imageSmall: "https://ggmeo.com/images/linh-thu-dtcl/ahri-ti-ni.jpg",
        imageIcon: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQSww9HjKznDB3Fq-NgA_YXXp4KL39e7I3ghQ&s",
        alt: "outfits",
        navigate: "/services/outfits",
        items: [
            {
                id: "SERVICE-8",
                name: "Trang phục truyền thống"
            },
            {
                id: "SERVICE-9",
                name: "Vest"
            },
            {
                id: "SERVICE-10",
                name: "Váy cưới"
            },
            {
                id: "SERVICE-11",
                name: "Trang phục bưng quả"
            }
        ]
    },
    {
        id: "CATEGORY-5",
        name: "makeup",
        label: "Make up",
        icon: <AutoFixHighIcon sx={{ fontSize: 40 }} />,
        imageBig: "https://ggmeo.com/images/linh-thu-dtcl/ahri-ti-ni.jpg",
        imageSmall: "https://ggmeo.com/images/linh-thu-dtcl/ahri-ti-ni.jpg",
        imageIcon: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS85U5US0cu3mQuWLwwd0hOWeBYkw1l37EGBw&s",
        alt: "makeup",
        navigate: "/services/makeup",
        items: [
            {
                id: "SERVICE-12",
                name: "Makeup tiệc"
            },
            {
                id: "SERVICE-13",
                name: "Makeup chụp ảnh"
            }
        ]
    },
    {
        id: "CATEGORY-6",
        name: "wedding-car",
        label: "Xe hoa",
        icon: <DirectionsCarIcon sx={{ fontSize: 40 }} />,
        imageBig: "https://ggmeo.com/images/linh-thu-dtcl/ahri-ti-ni.jpg",
        imageSmall: "https://ggmeo.com/images/linh-thu-dtcl/ahri-ti-ni.jpg",
        imageIcon: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTDmzg5K4bbnIlob6SB2zFzlmcB9WRScV4R6A&s",
        alt: "wedding-car",
        navigate: "/services/wedding-car",
        isPrice: false,
        items: [
            {
                id: "SERVICE-14",
                name: "Xe cổ"
            },
            {
                id: "SERVICE-15",
                name: "Xe hiện đại"
            },
            {
                id: "SERVICE-16",
                name: "Siêu xe"
            }
        ]
    },
    {
        id: "CATEGORY-7",
        name: "venues",
        label: "Địa điểm",
        icon: <RegistryIcon sx={{ fontSize: 40 }} />,
        imageBig: "https://ggmeo.com/images/linh-thu-dtcl/ahri-ti-ni.jpg",
        imageSmall: "https://ggmeo.com/images/linh-thu-dtcl/ahri-ti-ni.jpg",
        imageIcon: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcReDVUUM52o9C-9oUVUuW6l_rRHgqpdCG9JUQ&s",
        alt: "venues",
        navigate: "/services/venues",
        isPrice: false,
        items: [
            {
                id: "SERVICE-17",
                name: "Nhà hàng tiệc cưới"
            },
            {
                id: "SERVICE-18",
                name: "Khách sạn"
            },
            {
                id: "SERVICE-19",
                name: "Resort"
            },
            {
                id: "SERVICE-20",
                name: "Biệt thự"
            },
            {
                id: "SERVICE-21",
                name: "Dịch vụ ăn uống"
            }
        ]
    },
    {
        id: "CATEGORY-8",
        name: "decoration",
        label: "Trang trí",
        icon: <SeatingChartIcon sx={{ fontSize: 40 }} />,
        imageBig: "https://ggmeo.com/images/linh-thu-dtcl/ahri-ti-ni.jpg",
        imageSmall: "https://ggmeo.com/images/linh-thu-dtcl/ahri-ti-ni.jpg",
        imageIcon: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQKSV4hES-9kCuXRpShL4ThzMtTzPtOLzC2pQ&s",
        alt: "decoration",
        navigate: "/services/decoration",
        isPrice: false,
        items: [
            {
                id: "SERVICE-22",
                name: "Trang trí gia tiên"
            },
            {
                id: "SERVICE-23",
                name: "Trang trí cổng hoa"
            },
            {
                id: "SERVICE-24",
                name: "Trang trí sân khấu - lối đi"
            },
            {
                id: "SERVICE-25",
                name: "Trang trí bàn tiệc"
            },
            {
                id: "SERVICE-26",
                name: "Hoa cưới"
            }
        ]
    },
    {
        id: "CATEGORY-9",
        name: "wedding-gifts",
        label: "Lễ vật",
        icon: <RegistryIcon sx={{ fontSize: 40 }} />,
        imageBig: "https://ggmeo.com/images/linh-thu-dtcl/ahri-ti-ni.jpg",
        imageSmall: "https://ggmeo.com/images/linh-thu-dtcl/ahri-ti-ni.jpg",
        imageIcon: "https://cdn.iconscout.com/icon/premium/png-256-thumb/wedding-gift-3842622-3190391.png",
        alt: "wedding-gifts",
        navigate: "/services/wedding-gifts",
        items: [
            {
                id: "SERVICE-27",
                name: "Mâm quả cưới hỏi"
            },
            {
                id: "SERVICE-28",
                name: "Bánh kem cưới"
            }
        ]
    }
]