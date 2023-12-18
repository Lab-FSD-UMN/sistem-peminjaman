import axios from "axios";

axios.defaults.headers.common["Authorization"] = `Bearer ${localStorage.getItem("token")}`

const axiosClient = axios.create({
    baseURL: "/api",
    headers: {
        "Content-Type": "multipart/form-data",
        Accept: "application/json",
    },
});



export default axiosClient;