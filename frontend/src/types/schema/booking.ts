export interface BookingItem {
    id: String,
    coupleId: String,
    createdAt: String,
    completedDate: String,
    serviceBookings: Array<ServiceBookingItem>
    totalPrice: Number,
    status: String,
}

export interface ServiceBookingItem {
    serviceId: String,
    price: Number
}
