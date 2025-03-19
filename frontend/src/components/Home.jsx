import React from "react";
import Layout from "./Layout";
import Profile from "./Profile";
import Post from "./Post";
import Posts from "./Posts";
import RightSidebar from "./RightSidebar";
import useGetAllPost from "../hooks/useGetAllPost";

const Home = () => {
  console.log("home");
  useGetAllPost();
  console.log("home");
  return (
    <Layout>
      <div className="flex justify-between h-screen">
        <Posts />
        <RightSidebar />
      </div>
    </Layout>
  );
};

export default Home;
