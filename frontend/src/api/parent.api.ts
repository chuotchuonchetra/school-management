import apiClient from "@/lib/apiClient";


export const getParents = async () => {
    try {
        const response = await apiClient.get("/parents");
        console.log('parent data',response.data.data)
        return response.data.data;
    } catch (error) {
        console.log(error);
    }
}