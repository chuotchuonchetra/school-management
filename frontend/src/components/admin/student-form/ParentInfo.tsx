import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { LinkExistingParent } from "./parent-info/LinkExistingParent"
import { CreateNewParent } from "./parent-info/CreateNewParent"
import { NoParent } from "./parent-info/NoParent"
import type { ParentData } from "@/types/student.types"

interface ParentInfoProps {
  sendDataToStudentForm: (data: ParentData) => void
}
export const ParentInfo = ({ sendDataToStudentForm }: ParentInfoProps) => {
  return (
    <div>
      ParentInfo
      <div className="">
        <div className="">
          <div className="tab">
            <Tabs defaultValue="newparent" className="w-full rounded-lg">
              <TabsList className={"w-full border px-2 py-6"}>
                <TabsTrigger value="newparent" className={"py-4"}>
                  Create New Parent
                </TabsTrigger>
                <TabsTrigger value="linkparent" className={"py-4"}>
                  Link Existing Parent
                </TabsTrigger>
                <TabsTrigger value="noparent" className={"py-4"}>
                  X No Parent
                </TabsTrigger>
              </TabsList>
              <TabsContent value="newparent">
                <CreateNewParent sendDataToParentInfo={sendDataToStudentForm} />
              </TabsContent>
              <TabsContent value="linkparent">
                <LinkExistingParent />
              </TabsContent>
              <TabsContent value="noparent">
                <NoParent />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  )
}
