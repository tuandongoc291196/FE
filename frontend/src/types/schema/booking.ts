import { ServiceEntity } from "../entity/Entity"
import { CoupleItem } from "./couple"

export interface BookingItem {
    id: String,
    couple: CoupleItem,
    createdAt: String,
    completedDate: String,
    serviceBookings: Array<ServiceBookingItem>
    totalPrice: Number,
    status: String,
}

export interface ServiceBookingItem {
    service: ServiceEntity,
    bookingPrice: Number
}
