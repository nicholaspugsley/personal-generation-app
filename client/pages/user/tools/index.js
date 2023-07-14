import { useContext, useEffect, useState } from "react";
import { Context } from "../../../context";
import UserRoute from "../../../components/routes/UserRoute";
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
      <h1 className="jumbotron text-center square">Tools</h1>
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
            <h1>LIVE TOOLS</h1>
            <div class="card">
              <a href="/user/tools/blog">
                <div class="card-body">Blog Generator</div>
              </a>
            </div>
            <div class="card">
              <a href="/user/tools/">
                <div class="card-body"></div>
              </a>
            </div>
          </div>

          <div className="col-md-4">
            <h1>BEING BUILT</h1>
            <div class="card">
              <a href="/user/tools/youtube/youtube-script">
                <div class="card-body">Youtube Script</div>
              </a>
            </div>
            <div class="card">
              <a href="/user/tools/">
                <div class="card-body">
                  Key word generator for a topic neil patel 75 words
                </div>
              </a>
            </div>
            <div class="card">
              <a href="/user/tools/">
                <div class="card-body"></div>
              </a>
            </div>
          </div>

          <div className="col-md-4">
            <h1>idea stage</h1>
            <div class="card">
              <a href="/user/tools/">
                <div class="card-body">Ebooks</div>
              </a>
            </div>
            <div class="card">
              <a href="/user/tools/">
                <div class="card-body">Email</div>
              </a>
            </div>

            <div class="card">
              <a href="/user/tools/">
                <div class="card-body">PDFs</div>
              </a>
            </div>
            <div class="card">
              <a href="/user/tools/">
                <div class="card-body">Image Prompt MidJourney</div>
              </a>
            </div>
            <div class="card">
              <a href="/user/tools/">
                <div class="card-body">Image Prompt Dalle-2</div>
              </a>
            </div>

            <div class="card">
              <a href="/user/tools/">
                <div class="card-body"></div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </UserRoute>
  );
};

export default ToolsIndex;
