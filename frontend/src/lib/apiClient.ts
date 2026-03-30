// src/lib/apiClient.ts
import axios from "axios"

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // e.g. https://api.example.com
  timeout: 10000,
  headers: { "Content-Type": "application/json" },
})

// Attach auth token automatically
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("token")
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

// Global error handling
apiClient.interceptors.response.use(
  (res) => res,
  (error) => {
    if (error.response?.status === 401) {
      // redirect to login
      localStorage.removeItem("token")
      localStorage.removeItem("role")
      window.location.href = "/login"
    }
    return Promise.reject(error)
  }
)

export default apiClient
