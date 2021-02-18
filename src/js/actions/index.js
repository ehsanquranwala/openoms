//import { ADD_ARTICLE,ADD_CART,ADD_PRODUCT, ADD_USER} from "../constants/action-types";
const ADD_ARTICLE      ="ADD_ARTICLE";
const ADD_CART         = "ADD_CART";
const ADD_PRODUCT      = "ADD_PRODUCT";
const ADD_CATEGORY     = "ADD_CATEGORY";
const ADD_USER         = "ADD_USER";
const SELECT_PRODUCT   = "SELECT_PRODUCT";

export function addArticle(payload) {
  return { type: ADD_ARTICLE, payload };
}
export function addtocart(payload) {
  return { type: ADD_CART, payload };
}
export function products(payload) {
  return { type: ADD_PRODUCT, payload };
}
export function category(payload) {
  return { type: ADD_CATEGORY, payload };
}
export function user(payload) {
  return { type: ADD_USER, payload };
}
export function selectProduct(payload) {
  return { type: SELECT_PRODUCT, payload };
}