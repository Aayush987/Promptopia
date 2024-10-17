import Feed from "@components/Feed";

const Home = async () => {    
   const fetchPosts = await fetch('http:localhost:3000/api/prompt', {
    cache: 'no-store'
   })
   const data = await fetchPosts.json();
   console.log(data);
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