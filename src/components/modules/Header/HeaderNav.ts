import { ROLE } from "../../../constants/consts";

export const HeaderNav = [
    {
        user: ROLE.admin,
        items: [
            {
                name: "Bảng điều khiển",
                navigate: "/dashboards"
            },
            {
                name: "tài khoản",
                navigate: "/staffs"
            },
            {
                name: "thanh toán",
                navigate: "/transactions"
            },
            {
                name: "nạp tiền",
                navigate: "/deposit"
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
                name: "khuyến mãi",
                navigate: "/promotions"
            },
            {
                name: "booking",
                navigate: "/booking-list"
            },
            {
                name: "giao dịch",
                navigate: "/transactions"
            }
        ]
    }
]

