import Feed from "@components/Feed";
import Prompt from "@models/prompt";
import { connectToDB } from "@utils/database";
export const dynamic = "force-dynamic";


const Home = async () => { 
      await connectToDB();
      const prompts = await Prompt.find({}).populate('creator')
      const data = JSON.parse(JSON.stringify(prompts));
      // console.log(data);
      // const data = prompts.json();
      // console.log(data);  
    
  return (
    <section className="w-full flex-center flex-col">
        <h1 className="head_text text-center">
          Discover and Share
            <br />
            <span className="orange_gradient text-center">AI-Powered Prompts</span>
        </h1>
        <p className="desc text-center">
            Promptopia is an open-source AI prompting tool for modern 
            world to discover, create and share creative Prompts
        </p>

      <Feed data = {data} />

    </section>
  )
}

export default Home
