const BACKEND = "http://localhost:3000/";

//AUTHENTICATION APIs
export const Login_API = `${BACKEND}auth/login/`;
export const Logout_API = `${BACKEND}auth/logout/`;
export const Register_API = `${BACKEND}auth/registration/`;

//USER DETAILS APIs
export const ProfileData_API = `${BACKEND}api/get_profile/`;

//ECOM APIs
export const Products_API = `${BACKEND}api/get_products/`;
export const MyOrders_API = `${BACKEND}api/get_user_orders/`;

//Payment APIs

//OTHER APIs
export const FeedbackForm_API = `${BACKEND}api/feedbackform/`;
export const ContactUsForm_API = `${BACKEND}api/contactusform/`;
export const InvoiceRequest_API = `${BACKEND}api/request_invoice/`;
