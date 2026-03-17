import axios from "axios";

export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:3000";

export const api = axios.create({
	baseURL: API_BASE_URL,
	headers: {
		"Content-Type": "application/json",
	},
});

api.interceptors.response.use(
	(response) => response,
	(error) => {
		const message =
			error.response?.data?.message ||
			error.response?.data?.error ||
			error.message ||
			"Erro desconhecido";

		return Promise.reject(new Error(message));
	},
);