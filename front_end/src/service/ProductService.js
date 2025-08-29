import axios from "axios";

const REST_API_BASE_URL = "http://localhost:8080/api/products/";

export const listProducts = () => {
    return axios.get(REST_API_BASE_URL)
}
export const addProduct = (product) => {
    return axios.post(REST_API_BASE_URL, product)
}
export const updateStock = (soldItems) => {
    return axios.put(REST_API_BASE_URL+ "update-stock", soldItems)
}