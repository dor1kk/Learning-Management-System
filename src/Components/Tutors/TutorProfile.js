import React from "react";
import "/.TutorProfile/";

function TutorProfile() {
  return (
    <section className="tutor-profile">
      <h1 className="heading">Profile details</h1>
      <div className="details">
        <div className="tutor">
          <img src="" alt="Tutor"></img>
          <h5>Orgesa Morina</h5>
          <h6>Developer</h6>
        </div>
        <div className="flex">
          <p>Playlists:<span>4</span></p>
          <p>Total videos:<span>4</span></p>
          <p>Total likes:<span>4</span></p>
        </div>
      </div>
    </section>
  );
}
export default TutorProfile;