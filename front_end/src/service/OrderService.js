import axios from "axios";

const REST_API_BASE_URL = "http://localhost:8080/api/orders/";

// get all orders
export const listOrders = () => {
    return axios.get(REST_API_BASE_URL)
}
// post - add 
export const addOrder = (order) => {
    return axios.post(REST_API_BASE_URL, order);
}
// get one order
export const getOrder = (id) => {
    return axios.get(REST_API_BASE_URL + id);
}
// update order status
export const updateOrderStatus = (id, status) => {
    return axios.put(REST_API_BASE_URL + id+ "?status=" + status);
}
// delete one order
export const deleteOrder = (id) => {
    return axios.delete(REST_API_BASE_URL + id);
} 

