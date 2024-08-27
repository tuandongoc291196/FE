import { PromotionItem } from "../schema/promotion"

export interface StaffEntity {
    id: String,
    name: String,
    phone: String,
    createAt: String,
    status: String,
    position: String,
    department: String,
}

// CATEGORY
export interface CategoryEntity {
    id: String,
    categoryName: String,
    status: String,
}

// SERVICE
export interface ServiceEntity {
    id: String,
    name: String,
    description: String,
    listImages: Array<String>,
    price: Number,
    status: String,
    categoryResponse: CategoryEntity,
    type: String,
    promotionService: PromotionItem,
}

export interface ServiceCreate {
    description: String,
    images: String,
    name: String,
    price: Number,
    promotionId: String,
    serviceId: String,
    supplierId: String,
    type: String,
}

export interface ServiceUpdate {
    description: String,
    images: String,
    name: String,
    price: Number,
    promotionId: String,
    id: String,
    supplierId: String,
    type: String,
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