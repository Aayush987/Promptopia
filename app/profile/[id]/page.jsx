"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";

import Profile from "@components/Profile";

const UserProfile = ({ params }) => {
    const SearchParams = useSearchParams();
    const userName = SearchParams.get("name");

    const [userPosts, SetUserPosts] = useState([]);

    useEffect(() => {
        const fetchPosts = async() => {
            const response = await fetch(`/api/users/${params?.id}/posts`);
            const data = await response.json();

            SetUserPosts(data);
        };

        if(params?.id) fetchPosts();
    },[params.id]);

    return (
        <Profile
        name = {userName}
        desc = {`Welcome to ${userName}'s personalized profile page. Explore ${userName}'s exceptional prompts and be inspired by the power of their imagination`}
        data = {userPosts}
        />
    );


};

export default UserProfile;