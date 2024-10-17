"use client";
import PromptCardList from "@components/PromptCardList";
import { useState, useEffect } from "react";

const Page = () => {
   const [searchText,setSearchText] = useState("");
   const [allPosts,setallPosts] = useState([]); 
   const [searchTimeout, setSearchTimeout] = useState(null);
   const [searchedResults, setSearchedResults] = useState([]);

   const fetchPosts = async () => {
      const response = await fetch("/api/prompt", {
        cache: 'no-store'
      });
      const data = await response.json();

      setallPosts(data);
      console.log(data);
   }

   useEffect(() => {
       fetchPosts();
       
   },[]);



   const filterPrompts = (searchText) => {
    const regex = new RegExp(searchText,"i");
    return allPosts.filter((item) => 
      regex.test(item.creator.username) ||
      regex.test(item.tag) ||
      regex.test(item.prompt)
    );
   };

   const handleSearchChange = (e) => {
    clearTimeout(searchTimeout);
    setSearchText(e.target.value);
   
    setSearchTimeout(
    setTimeout(() => {
      const searchResult = filterPrompts(e.target.value);
      setSearchedResults(searchResult);
    },500)
   );
  };

  const handleTagClick = (tagName) => {
    setSearchText(tagName);

    const searchResult = filterPrompts(tagName);
    setSearchedResults(searchResult);
  };


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
        <section className="feed">
      <form className="relative w-full flex-center" >
        <input type = "text" placeholder="Search For a tag or an username" value={searchText} onChange={handleSearchChange} required className="search_input peer" />
      </form>

       {/* All Prompts */}
       {searchText ? (
        <PromptCardList
          data={searchedResults}
          handleTagClick={handleTagClick}
        />
      ) : (
        <PromptCardList data={allPosts} handleTagClick={handleTagClick} />
      )}

    </section>
       </section>
     );
};


export default Page;