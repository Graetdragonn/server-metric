import axios from "axios";

const USERS_REST_API_URL = '';

export function getUsers(){
    return axios.get(USERS_REST_API_URL);
}
