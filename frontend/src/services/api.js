import axios from "axios";

const API = axios.create({
    baseURL: "https://swapzone-929t.onrender.com/api"
});

export default API;