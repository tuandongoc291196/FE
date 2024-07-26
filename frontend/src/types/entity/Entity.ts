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

export interface ProductPriceReporterEntity {
    id: String,
    coupleName: String,
    categoryName: String,
    serviceName: String,
    requirement: String,
    priceReport: String,
}

export interface BlogEntity {
    id: String,
    title: String,
    content: String,
    date: String
}