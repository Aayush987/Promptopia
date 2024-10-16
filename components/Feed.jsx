"use client";

import { useState, useEffect } from "react";
import PromptCard from "./PromptCard";
import { set } from "mongoose";
import PromptCardList from "./PromptCardList";

// const PromptCardList = ({data, handleTagClick}) => {
//   console.log(data);
//   // console.log("THIS IS PROMPT LIST DATA",data);
//   return (
//     <div className="mt-16 prompt_layout">
//       {data?.map((post) => (
//         <PromptCard
//           key = {post._id}
//           post = {post}
//           handleTagClick = {handleTagClick}
//         />
//       ) )}
//     </div>
//   )
// }

const Feed = ({data}) => {
   const [searchText,setSearchText] = useState("");
   const [allPosts,setallPosts] = useState(data); 
   const [searchTimeout, setSearchTimeout] = useState(null);
   const [searchedResults, setSearchedResults] = useState([]);

   const fetchPosts = async () => {
      const response = await fetch("https://promptopia-bay-nu.vercel.app/api/prompt", {
        cache: 'no-store'
      });
      const data = await response.json();

      setallPosts(data);
      console.log(data);
   }

  //  useEffect(() => {
  //     console.log(data);
  //  },[]);

  //  useEffect(() => {
  //   // console.log(data);
  //     //  fetchPosts();
  //     setallPosts(data);
  //     // console.log("data is stored in state");
  //  },[data]);



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
  )
}

export default Feed
