import axios from "axios";

export const api = axios.create({
  baseURL: "https://changenow.io/api/v1"
});

