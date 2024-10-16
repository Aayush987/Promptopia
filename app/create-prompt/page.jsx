"use client";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import Form from "@components/Form";

const CreatePrompt = () => {
    const router = useRouter();
    const {data: session} = useSession();

    const [submitting, setSubmitting] = useState(false);
    const [posts, setPosts] = useState({
        prompt: "",
        tag: "",
    })

    if(!session) {
        return (
            <div className="flex items-center justify-center h-screen">
                <p className="text-2xl font-satoshi font-semibold text-gray-900">Please sign in to continue</p>
            </div>
        )
    }

    const createPrompt = async (e) => {
           e.preventDefault();
           setSubmitting(true);

           try {
            const response = await fetch( 'api/prompt/new',{
                method: "POST",
                body: JSON.stringify({
                    prompt: posts.prompt,
                    userId: session?.user.id,
                    tag: posts.tag
                })
            })
              
            if (response.ok) {
                router.push("/");
            }
           } catch (error) {
            console.log(error);
           }finally {
            setSubmitting(false);
           }
    }
     

  return (
    <Form
      type = "Create"
      post = {posts}
      setPost = {setPosts}
      submitting = {submitting}
      handleSubmit = {createPrompt}
     />
  )
}

export default CreatePrompt