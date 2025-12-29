import axios from "axios";

export const clientAPi = axios.create({
    baseURL:"http://localhost:3001/"
})