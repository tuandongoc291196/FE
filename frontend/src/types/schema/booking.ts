import { ServiceEntity } from "../entity/Entity"
import { CoupleItem } from "./couple"
import { PromotionItem } from "./promotion"
import { ServiceSupplierResponse } from "./serviceSupplier"

export interface BookingDetailItem {
    bookingDetailId: String,
    price: String,
    note: String,
    createAt: String,
    completedDate: String,
    status: String,
    promotionResponse: PromotionItem,
    couple: CoupleItem,
    serviceSupplierResponse: ServiceSupplierResponse
}

export interface ServiceBookingItem {
    service: ServiceEntity,
    bookingPrice: Number
}


// "bookingDetailId": "BOOKING-DETAIL-38",~
// "partnerName1": "string",~
// "weddingDate": "2024-08-04",~
//     "phoneNumber": "0123456789",~
// "name": "string",~
// "type": "ECONOMY",~
// "price": 1000000,~
// "note": "NOTE",~
// "createAt": "2024-08-07 18:07:55",~
// "completedDate": "2024-09-07",~
// "status": "PENDING",~
// "promotionResponse": null~
