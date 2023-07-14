import { useContext, useEffect, useState } from "react";
import { Context } from "../../../../../context";
import UserRoute from "../../../../../components/routes/UserRoute";
import axios from "axios";
import { Avatar } from "antd";
import Link from "next/link";
import { SyncOutlined, PlayCircleOutlined } from "@ant-design/icons";
import { toast } from "react-toastify";
import { useRouter } from "next/router";

const YoutubeChannelIdeas = () => {
  const {
    state: { user },
  } = useContext(Context);
  const [niche, setNiche] = useState("");
  const [tone, setTone] = useState("");
  const [name, setName] = useState("");
  const [audience, setAudience] = useState("");

  //

  //
  const [loading, setLoading] = useState("");
  const [blog, setBlog] = useState({});

  const router = useRouter("");

  useEffect(() => {
    // loadCourses();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // console.table({ niche, });
    try {
      setLoading(true);
      const { data } = await axios.post(`/api/create-youtube-script`, {
        niche,
      });
      // console.log("REGISTER RESPONSE", data);

      toast("Youtube Channel Idea generated successfully.");
      setNiche("");

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
      <h1 className="jumbotron text-center square">Youtube Channel Ideas</h1>
      <div className="container col-md-4 offset-md-4 pb-5">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            className="form-control mb-4 p-4"
            value={niche}
            onChange={(e) => setNiche(e.target.value)}
            placeholder="Enter niche"
            required
          />

          <input
            type="text"
            className="form-control mb-4 p-4"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter channel name"
            required
          />

          <input
            type="text"
            className="form-control mb-4 p-4"
            value={tone}
            onChange={(e) => setTone(e.target.value)}
            placeholder="Enter tone & style"
            required
          />

          <input
            type="text"
            className="form-control mb-4 p-4"
            value={audience}
            onChange={(e) => setAudience(e.target.value)}
            placeholder="Enter audience"
            required
          />

          <button
            type="submit"
            className="btn btn-block btn-primary"
            disabled={!niche || loading}
          >
            {loading ? <SyncOutlined spin /> : "Submit"}
          </button>
        </form>
      </div>
      <div>{/* <p>{youtubeScript.title}</p> */}</div>
    </UserRoute>
  );
};

export default YoutubeChannelIdeas;
