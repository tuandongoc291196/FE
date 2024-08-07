import { ROLE } from "../../../constants/consts";

export const HeaderNav = [
    {
        user: ROLE.admin,
        items: [
            {
                name: "nhân viên",
                navigate: "/staffs"
            },
            {
                name: "nhà cung cấp",
                navigate: "/suppliers"
            },
            {
                name: "khách hàng",
                navigate: "/couples"
            }
        ]
    },
    {
        user: ROLE.couple,
        items: [
            {
                name: "Step by step",
                navigate: "/step-by-step"
            },
            {
                name: "Blogs",
                navigate: "/blogs-couple"
            },
        ]
    },
    {
        user: ROLE.supplier,
        items: [
            {
                name: "dịch vụ",
                navigate: "/services"
            },
            {
                name: "giảm giá",
                navigate: "/promotions"
            },
            {
                name: "booking",
                navigate: "/booking-list"
            }
        ]
    }
]

