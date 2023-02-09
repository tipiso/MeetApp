import Axios from "axios";
import {API_URL} from "@/utils/constants";

export const api = Axios.create({
    baseURL: `${API_URL}/api`,
});
