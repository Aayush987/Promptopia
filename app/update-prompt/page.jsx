import EditPrompt from "@components/EditPrompt";
import { Suspense } from "react";

const Page = () => {
  return (
         <Suspense fallback={<div>Loading...</div>}>
          <EditPrompt />
         </Suspense>
  )
}

export default Page;