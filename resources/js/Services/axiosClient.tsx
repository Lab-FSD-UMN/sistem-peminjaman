import axios from "axios";

// axios.defaults.headers.common["Authorization"] = `Bearer ${localStorage.getItem("token")}`

let axiosClient = axios.create({
    baseURL: "/api",
    headers: {
        "Content-Type": "multipart/form-data",
        Accept: "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
});



export default axiosClient;