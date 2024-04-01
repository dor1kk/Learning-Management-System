import React, { useState } from "react";
import { useParams } from "react-router-dom";
import courses from "./Coursedata";
import { Sidebar, Menu, SubMenu, MenuItem } from "react-pro-sidebar";
import { FaPlayCircle } from 'react-icons/fa';
import Details from "./Details";
import ReviewContainer from "./Review";

const VideoList = ({ videos, onVideoClick }) => (
  <Sidebar style={{ height:"1178px" , width:"200px",boxShadow:" 0 4px 6px rgba(0, 0, 0, 0.1) "}}>
    <Menu>
      {videos.map((video) => (
        <SubMenu key={video.id} label={video.title} className="video-label" style={{width:"209px"}}>
          {video.subvideos && video.subvideos.map((subvideo) => (
            <MenuItem key={subvideo.id} onClick={() => onVideoClick(subvideo)} className="subvideo-item">
              <FaPlayCircle style={{ marginRight: "8px" }} />
              {subvideo.title}
            </MenuItem>
          ))}
        </SubMenu>
      ))}
    </Menu>
  </Sidebar>
);

const BigVideo = ({ video }) => (
  <div className="big-video">
    <video
      controls
      poster={video.poster}
      src={video.url}
      style={{ width: "70%", height: "100%",boxShadow:"0.5px 0.5px 25px lightgrey",border:"1px solid red" }}
    ></video>
  </div>
);

function CourseDetail() {
  const { id } = useParams();
  const course = courses.find((course) => course.id === id);
  const [selectedVideo, setSelectedVideo] = useState(
    course ? course.videos[0] : null
  );

  const handleVideoClick = (video) => {
    setSelectedVideo(video);
  };

  return (
    <div className="container d-flex flex-column" style={{gap:"25px"}}>
      <h3>{course?.title}</h3>
      <div className="d-flex flex-row" style={{gap:"35px"}} >
        <div className="d-flex flex-column" style={{height:"100%"}}>
          <VideoList videos={course?.videos} onVideoClick={handleVideoClick} />
        </div>
        <div className="d-flex flex-column" >
          <BigVideo video={selectedVideo} />
          <Details course={course} />
          <ReviewContainer />
        </div>
      </div>
    </div>
  );
}

export default CourseDetail;
