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
                name: "nhân viên",
                navigate: "/staff"
            },
            {
                name: "nhà cung cấp",
                navigate: "/supplier"
            },
            {
                name: "khách hàng",
                navigate: "/couple"
            }
        ]
    },
    {
        user: ROLE.supplier,
        items: [
            {
                name: "dashboard",
                navigate: "/supplier-dashboard"
            },
            {
                name: "dịch vụ",
                navigate: "/services"
            },
            {
                name: "báo giá",
                navigate: "/product-price-reporter"
            },
            {
                name: "bài viết",
                navigate: "/blog"
            },
            {
                name: "giảm giá",
                navigate: "/coupon"
            },
            {
                name: "booking",
                navigate: "/supplier-book"
            }
        ]
    }
]

