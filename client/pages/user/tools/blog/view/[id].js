import { useContext, useEffect, useState } from "react";
import { Context } from "../../../../../context";
import UserRoute from "../../../../../components/routes/UserRoute";
import axios from "axios";
import { Avatar } from "antd";
import Link from "next/link";
import { SyncOutlined, PlayCircleOutlined } from "@ant-design/icons";

const BlogShow = () => {
  const {
    state: { user },
  } = useContext(Context);
  const [blog, setBlog] = useState({});
  const [loading, setLoading] = useState("");

  useEffect(() => {
    loadBlog();
  }, []);

  const loadBlog = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`/api/blog-one/${blog._id}`);
      setBlog(data);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  return (
    <UserRoute>
      <h1 className="jumbotron text-center square">blog post</h1>
      <button className="btn btn-primary m-2" onClick={`/`}>
        edit
      </button>

      <button className="btn btn-danger m-2">delete</button>
      <p>Title: {blog.title}</p>
      <p>Topic: {blog.topic}</p>
      <p>Keywords: {blog.keywords}</p>
      <p>Slug: {blog.slug}</p>
      <p>Content: {blog.postContent}</p>
      <p>MetaDescription: {blog.metaDescription}</p>
      <p>Author: {blog.author}</p>
    </UserRoute>
  );
};

export default BlogShow;
