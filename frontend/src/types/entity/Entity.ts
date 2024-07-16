export interface StaffEntity {
    id: String,
    name: String,
    phone: String,
    createAt: String,
    status: String,
    position: String,
    department: String,
}

export interface ServiceEntity {
    id: String,
    category: String,
    name: String,
    description: String,
    price: String,
    status: String,
    images: Array<String>
}