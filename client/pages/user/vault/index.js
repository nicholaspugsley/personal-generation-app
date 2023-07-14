import { useContext, useEffect, useState } from "react";
import { Context } from "../../../context";
import UserRoute from "../../../components/routes/UserRoute";
import axios from "axios";
import { Avatar } from "antd";
import Link from "next/link";
import { SyncOutlined, PlayCircleOutlined } from "@ant-design/icons";

const VaultIndex = () => {
  const {
    state: { user },
  } = useContext(Context);
  const [blogs, setBlogs] = useState([]);
  const [scripts, setScripts] = useState([]);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState();

  useEffect(() => {
    loadBlogs();
    loadScripts();
    loadImages();
  }, []);

  const loadScripts = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get("/api/scripts");
      setScripts(data);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  const loadBlogs = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get("/api/blogs");
      setBlogs(data);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  const loadImages = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get("/api/image-prompts");
      setImages(data);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  return (
    <UserRoute>
      <h1 className="jumbotron text-center square">Vault</h1>

      <div className="container-fluid">
        <h1>Blogs</h1>
        <div className="row">
          {blogs && (
            <>
              {blogs.map((blog) => (
                <div key={blog._id} className="col-md-4">
                  <a href={`/user/tools/blog/view/${blog._id}`}>
                    <p>{blog.title}</p>
                  </a>
                </div>
              ))}
            </>
          )}
        </div>

        <h1>YouTube Scripts</h1>
        {scripts && (
          <>
            {scripts.map((script) => (
              <div key={script._id} className="col-md-4">
                <a
                  href={`/user/tools/youtube/youtube-script/view/${script._id}`}
                >
                  <p>{script.title}</p>
                </a>
              </div>
            ))}
          </>
        )}
      </div>

      <h1>Midjourney Image Prompts</h1>
      {images && (
        <>
          {images.map((image) => (
            <div key={image._id} className="col-md-4">
              <a href={`/user/tools/script/view/${image._id}`}>
                <p>{image.title}</p>
              </a>
            </div>
          ))}
        </>
      )}
    </UserRoute>
  );
};

export default VaultIndex;
