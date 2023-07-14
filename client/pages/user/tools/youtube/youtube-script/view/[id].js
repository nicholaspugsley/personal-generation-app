import { useContext, useEffect, useState } from "react";
import { Context } from "../../../../../../context";
import UserRoute from "../../../../../../components/routes/UserRoute";
import axios from "axios";
import { Avatar } from "antd";
import Link from "next/link";
import { SyncOutlined, PlayCircleOutlined } from "@ant-design/icons";
import { useRouter } from "next/router";
import { Divider } from "antd";

const YoutubeScriptShow = () => {
  const router = useRouter();

  const {
    state: { user },
  } = useContext(Context);
  const [script, setScript] = useState({});

  const [loading, setLoading] = useState("");

  useEffect(() => {
    loadScript();
  }, []);

  const loadScript = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`/api/script-one/${script._id}`);
      setScript(data);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  return (
    <UserRoute>
      <h1 className="jumbotron text-center square">youtube script</h1>
      <button className="btn btn-primary m-2" onClick={`/`}>
        edit
      </button>
      <button className="btn btn-danger m-2">delete</button>
      <Divider />

      <p>Title: {script.title}</p>
      <p>Length: {script.length}</p>
      <p>Topic: {script.topic}</p>
      <p>Keywords: {script.keywords}</p>
      <p>Author: {script.author}</p>
      <Divider />
      <h3>Video Script: </h3>
      <p>{script.scriptContent}</p>
      <h3>Video Description:</h3>
      <p>{script.description}</p>
    </UserRoute>
  );
};

export default YoutubeScriptShow;
