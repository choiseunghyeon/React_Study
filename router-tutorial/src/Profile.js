import React from "react";
import WithRouterSample from "./WithRouterSample";
import { withRouter } from "react-router-dom";
const data = {
  velopert: {
    name: "김민준",
    desc: "리액트를 좋아하는 개발자",
  },
  choi: {
    name: "최승현",
    desc: "개발을 좋아하는 개발자",
  },
};
const Profile = ({ match }) => {
  const { username } = match.params;
  const profile = data[username];
  if (!profile) return <div>존재하지 않는 사용자입니다.</div>;

  return (
    <div>
      <h3>
        {username} ({profile.name})
      </h3>
      <p>{profile.desc}</p>
      <WithRouterSample />
    </div>
  );
};

export default Profile;
