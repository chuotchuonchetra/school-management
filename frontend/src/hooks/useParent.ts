import { useQuery } from "@tanstack/react-query"
import { getParents } from "@/api/parent.api"

export const useParent = (search:string)=>{ return useQuery({
    queryKey: ["all-parents",search],
    queryFn: ()=> getParents(search),
    enabled: !!search,
   }) 

}