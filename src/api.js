import axios from "axios";

let baseApi = axios.create({
    baseURL: process.env.VUE_APP_URL + "/api",
});

let api = function() {
    return baseApi;
};

export default api;
