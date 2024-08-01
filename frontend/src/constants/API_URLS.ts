// Authentication
export const ACCOUNT_LOGIN = '/auth/login';
export const ACCOUNT_LOGIN_GOOGLE = '/auth/loginGoogle';
export const ACCOUNT_REGISTER_COUPLE = '/auth/register/couple';
export const ACCOUNT_REGISTER_SUPPLIER = '/auth/register/serviceSupplier';
export const ACCOUNT_REGISTER_STAFF = '/auth/register/staff';

// Staff API
export const GET_ALL_BLOGS = "/blog/getAllBlogPosts"
export const GET_ACTIVE_BLOGS = "/blog/getAllActiveBlogPosts"
export const GET_PENDING_BLOGS = "/blog/getAllPendingBlogPosts"
export const GET_REJECTED_BLOGS = "/blog/getAllRejectedBlogPosts"
export const GET_SUPPLIERS_BLOGS = "/blog/getAllBlogPostsByServiceSupplier"
export const GET_ALL_CATEGORIES = "/category/getAllCategory"
export const CREATE_CATEGORY = "/category/create"

// Promotion
export const GET_PROMOTION_BY_SUPPLIER = "/promotion/getPromotionBySupplier"

// Booking
export const GET_BOOKING_BY_SUPPLIER = "/booking/getBySupplier"

// Service
export const GET_SERVICE_BY_ID = "/service/getById"
export const GET_SERVICE_BY_SUPPLIER = "/service/getAllServicesBySupplier"
export const CREATE_SERVICE = "/service/create"
