import { useContext, useEffect, useState } from "react";
import { Context } from "../../../../context";
import UserRoute from "../../../../components/routes/UserRoute";
import axios from "axios";
import { Avatar } from "antd";
import Link from "next/link";
import { SyncOutlined, PlayCircleOutlined } from "@ant-design/icons";

const ToolsIndex = () => {
  const {
    state: { user },
  } = useContext(Context);
  // const [courses, setCourses] = useState([]);

  useEffect(() => {
    // loadCourses();
  }, []);

  //   const loadCourses = async () => {
  //     try {
  //       setLoading(true);
  //       const { data } = await axios.get("/api/user-courses");
  //       setCourses(data);
  //       setLoading(false);
  //     } catch (err) {
  //       console.log(err);
  //       setLoading(false);
  //     }
  //   };

  return (
    <UserRoute>
      <h1 className="jumbotron text-center square">Yotube Tools</h1>
      <div className="container-fluid">
        <div className="col">
          <a href="/user/tools/super-prompt">
            <div class="card  text-white bg-dark">
              <div class="card-body">Super Prompt</div>
            </div>
          </a>
        </div>
        <div className="row">
          <div className="col-md-4">
            <h1>Live</h1>
            <div class="card">
              <a href="/user/tools">
                <div class="card-body"></div>
              </a>
            </div>
          </div>

          <div className="col-md-4">
            <h1>Not Built</h1>
            <div class="card">
              <a href="/user/tools/youtube/channel-ideas">
                <div class="card-body">channel idea generator</div>
              </a>
            </div>
            <div class="card">
              <a href="/user/tools/youtube/video-ideas">
                <div class="card-body">video idea generator</div>
              </a>
            </div>
            <div class="card">
              <a href="/user/tools/youtube/youtube-script">
                <div class="card-body">script generator</div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </UserRoute>
  );
};

export default ToolsIndex;
