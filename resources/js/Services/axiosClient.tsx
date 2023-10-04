import axios from "axios";

const axiosClient = axios.create({
    baseURL: "/api",
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
    },
});



export default axiosClient;