/* eslint-disable react-hooks/rules-of-hooks */
import axios from "axios"
import { useState } from "react"
import type { role } from "../constants/roles"
export interface loginType {
  role: role
  email: string
  password: string
}
export const loginAuth = () => {
  const [loading, setLoading] = useState(false)

  const login = async (inputData: loginType) => {
    try {
      setLoading(true)
      const res = await axios.post(
        "http://localhost:5000/api/auth/login",
        inputData
      )
      const data = res.data
      localStorage.setItem("token", data.token)
      localStorage.setItem("role", data.user.role)

      return data
    } catch (error: unknown) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }
  return { login, loading }
}
