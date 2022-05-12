const BACKEND = "http://localhost:3000/";

//AUTHENTICATION APIs
export const Login_API = `${BACKEND}api/v1/auth/login/`;
export const Logout_API = `${BACKEND}api/v1/auth/signout`;
export const Register_API = `${BACKEND}api/v1/auth/register/`;
export const OTP_API = `${BACKEND}api/v1/auth/emailsend/`;
//USER DETAILS APIs
export const ProfileData_API = `${BACKEND}api/v1/profileupdate/`;

//ECOM APIs
export const Products_API = `${BACKEND}api/v1/products/`;
export const MyOrders_API = `${BACKEND}api/get_user_orders/`;
export const CartItems_API = `${BACKEND}api/v1/cart/`;
export const WishlistItems_API = `${BACKEND}api/v1/wishlist/`;
export const ProductAdd_API = `${BACKEND}api/v1/product/`;
//Payment APIs

//OTHER APIs
export const FeedbackForm_API = `${BACKEND}api/feedbackform/`;
export const ContactUsForm_API = `${BACKEND}api/contactusform/`;
export const InvoiceRequest_API = `${BACKEND}api/request_invoice/`;
