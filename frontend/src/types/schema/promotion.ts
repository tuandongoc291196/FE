export interface PromotionItem {
    id: String,
    name: String,
    value: Number,
    startDate: String,
    endDate: String,
    status: String,
    type: String
}

export interface PromotionItemCreate {
    endDate: String,
    listServiceSupplierId: Array<String>,
    name: String,
    startDate: String,
    supplierId: String,
    type: String,
    value: Number,
}
