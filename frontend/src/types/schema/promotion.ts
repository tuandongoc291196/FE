export interface PromotionItem {
    id: String,
    promotionDetails: String,
    percent: Number,
    startDate: String,
    endDate: String,
    status: String
}

export interface PromotionItemCreate {
    promotionDetails: String,
    percent: Number,
    startDate: String,
    endDate: String,
    supplierId: String,
    listServiceIds: String
}
