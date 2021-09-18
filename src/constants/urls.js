export const urls = {
  GET_PRODUCTS: "api/products",
  GET_CATEGORIES: "api/categories",
  GET_SLIDER_IMGAE: "/api/themeConfig/slider-image",
  GET_NEW_ARIVAL_PROUDUCT: "api/newArrival/",
  GET_FEATURED_PRODUCT: "api/featureProducts",
  GET_POPULAR_PRODUCT: `api/popularProducts`,
  GET_PANDING_ORDERS: `api/ecommrece/user-order/pending/`,
  GET_USER_ALL_ORDERS:`api/ecommrece/user-order/all/`,
  IMAGE_URL: `${process.env.API_URL}uploads/`,
  GET_USER_INFO:`api/users/`,
  LOGIN_UTL: `api/auth/login`,
  REGISTER_URL: `api/auth/register`,
  PRE_ORDER:`api/ecommrece/pre-order`,
  GET_INFO:`api/admin/admin-info`,
  GET_DISCOUNTED_PRODUCTS:`api/discounted-products`,
  UPDATE_GENERAL_INFO:`api/userinfo/update/generalInfo`,
  UPDATE_PASSWORD:`api/userinfo/update/password`,
  UPDATE_ADDRESS:`api/userinfo/update/address`,
  PANDING_PREORDER:`api/ecommrece/pre-order/pending/`,
  GET_DISCOUNTED_PRODUCTS:`api/discounted-products`,
  GET_RATINGS:`api/ratings/`,
  POST_RATINGS:`api/rating/`,
  POST_ORDER:'http://localhost:5000/api/ecommrece/checkout',
  GET_RELATED_PRODUCTS:`api/related-products`,
  GET_PAYMENT_GETWAY_NUMBERS :`api/admin/admin-info`,

   // Facebook Pixel
   FACEBOOK_PIXEL: `api/marketing/fb-pixel`,
  GET_SHIPPING_COST:`api/ecommrece/shippingCost/`,

  LOGIN_API:`api/auth/login`


};
