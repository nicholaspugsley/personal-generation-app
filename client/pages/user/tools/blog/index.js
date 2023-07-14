import { useContext, useEffect, useState } from "react";
import { Context } from "../../../../context";
import UserRoute from "../../../../components/routes/UserRoute";
import axios from "axios";
import { Avatar } from "antd";
import Link from "next/link";
import { SyncOutlined, PlayCircleOutlined } from "@ant-design/icons";
import { toast } from "react-toastify";
import { useRouter } from "next/router";

const Blog = () => {
  const {
    state: { user },
  } = useContext(Context);
  const [keywords, setKeywords] = useState("");
  const [topic, setTopic] = useState("");
  const [loading, setLoading] = useState("");
  const [blog, setBlog] = useState({});

  const router = useRouter("");

  useEffect(() => {
    // loadCourses();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // console.table({ topic, keywords });
    try {
      setLoading(true);
      const { data } = await axios.post(`/api/create-blog`, {
        topic,
        keywords,
      });
      // console.log("REGISTER RESPONSE", data);

      toast("Blog generated successfully.");
      setTopic("");
      setKeywords("");
      setLoading(false);
      router.push(`/user/vault`);
      // router.push(`/user/tools/blog/view/${blog._id}`);
    } catch (err) {
      toast(err.response.data);
      setLoading(false);
    }
  };

  return (
    <UserRoute>
      <h1 className="jumbotron text-center square">Blog Generator</h1>
      <div className="container col-md-4 offset-md-4 pb-5">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            className="form-control mb-4 p-4"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder="Enter blog post topic"
            required
          />

          <input
            type="text"
            className="form-control mb-4 p-4"
            value={keywords}
            onChange={(e) => setKeywords(e.target.value)}
            placeholder="Enter keywords seperated by a comma"
            required
          />

          <button
            type="submit"
            className="btn btn-block btn-primary"
            disabled={!topic || !keywords || loading}
          >
            {loading ? <SyncOutlined spin /> : "Submit"}
          </button>
        </form>
      </div>
      <div>
        <p>{blog.title}</p>
      </div>
    </UserRoute>
  );
};

export default Blog;
