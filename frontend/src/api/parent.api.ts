import apiClient from "@/lib/apiClient";


export const getAllParents = async () => {
    try {
        const response = await apiClient.get("/parents");
        console.log('parent data',response.data.data)
        return response.data.data;
    } catch (error) {
        console.log(error);
    }
}
export const getParents = async (search: string) => {
  try {
    const response = await apiClient.get(
      `/parents/search?search=${search}`
    )

    return response.data.data ?? [] 
  } catch (error) {
    console.error("getParents error:", error)
    return [] 
  }
}
export const getParentById = async (id:string) => {
    try {
        const response = await apiClient.get(`/parents/${id}`);
        console.log('parent data',response.data.data)
        return response.data.data;
    } catch (error) {
        console.log(error);
    }
}