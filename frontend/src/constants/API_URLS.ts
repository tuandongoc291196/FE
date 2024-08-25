// Authentication
export const ACCOUNT_LOGIN = '/auth/login';
export const ACCOUNT_LOGIN_GOOGLE = '/auth/loginGoogle';
export const ACCOUNT_REGISTER_COUPLE = '/auth/register/couple';
export const ACCOUNT_REGISTER_SUPPLIER = '/auth/register/serviceSupplier';
export const ACCOUNT_REGISTER_STAFF = '/auth/register/staff';
export const GET_COUPLE_BY_ID = '/account/getCoupleProfile';

// Staff API
export const GET_ALL_BLOGS = '/blog/getAllBlogPosts';
export const GET_ACTIVE_BLOGS = '/blog/getAllActiveBlogPosts';
export const GET_PENDING_BLOGS = '/blog/getAllPendingBlogPosts';
export const GET_REJECTED_BLOGS = '/blog/getAllRejectedBlogPosts';
export const GET_SUPPLIERS_BLOGS = '/blog/getAllBlogPostsByServiceSupplier';
export const GET_ALL_CATEGORIES = '/category/getAllCategory';
export const CREATE_CATEGORY = '/category/create';

// Promotion
export const CREATE_PROMOTION = '/promotion/create';
export const GET_PROMOTION_BY_SUPPLIER = '/promotion/getPromotionBySupplier';

// Booking
export const GET_BOOKING_BY_SUPPLIER = '/booking/getBySupplier';
export const POST_BOOKING = '/booking/create';
export const GET_BOOKING_BY_ID = '/booking/getById';
export const REQUEST_PAYMENT = '/payment/request';
export const GET_BOOKING_BY_COUPLE = '/booking/getByCouple';
export const CANCEL_BOOKING = '/booking-service/cancle';
export const RATING_BOOKING = '/rating/create';

export const GET_TRANSACTION_BY_COUPLE =
  '/transaction/getCoupleTransactionsHistoryByFilter';

// Booking Detail
export const UPDATE_REJECT_BOOKING_STATUS = '/booking-service/reject';
export const UPDATE_CONFIRM_BOOKING_STATUS = '/booking-service/confirm';
export const UPDATE_CONFIRM_PROCESSING_STATUS = '/booking-service/processing';
export const UPDATE_CONFIRM_DONE_STATUS = '/booking-service/done';
export const GET_BOOKING_DETAIL_BY_SUPPLIER_ID =
  '/booking/getBookingDetailBySupplierAndBooking';

// Service
export const CREATE_SERVICE = '/service/create';
export const GET_SERVICE_BY_CATEGORY_ID = '/service/getByCategory';

// Service Supplier
export const CREATE_SERVICE_SUPPLIER = '/service-supplier/create';
export const UPDATE_SERVICE_SUPPLIER = '/service-supplier/update';
export const GET_SERVICE_SUPPLIER_FILTER = '/service-supplier/filter';
export const GET_SERVICE_SUPPLIER_BY_ID = '/service-supplier/getById';
export const GET_SERVICE_SUPPLIER_BY_SUPPLIER_ID =
  '/service-supplier/getBySuppler';

// Wallet
export const GET_BALANCE_WALLET = '/wallet/balance';

// Wallet history
export const GET_WALLET_HISTORY = '/wallet-history/byFilter';
