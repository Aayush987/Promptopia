import Feed from "@components/Feed";
export const dynamic = "force-dynamic";

const Home = () => {    
  //  const fetchPosts = await fetch('https://promptopia-aayush987-wheat.vercel.app/api/prompt',
  //    {
  //   method: 'GET',
  //   cache: 'no-store'
  //  })
  //  const data = await fetchPosts.json();
  //  console.log(data);
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

      <Feed />

    </section>
  )
}

export default Home