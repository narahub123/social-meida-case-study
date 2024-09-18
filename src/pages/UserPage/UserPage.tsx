import { LuBell, LuCalendar } from "react-icons/lu";
import "./userPage.css";
import { useState } from "react";

const UserPage = () => {
  const [userInfo, setUserInfo] = useState<{
    [key: string]: string | string[];
  }>({
    username: "하이요",
    userId: "hihihihi",
    birth: "20060515",
    userPic: "/test/profile1.jpg",
    followings: [],
    followers: [],
  });
  return (
    <div className="user-page">
      <div className="user-page-header">
        <figure className="user-page-profile-wrapper">
          <img
            src="/test/profile1.jpg"
            alt="프로필 이미지"
            className="user-page-profile"
          />
        </figure>
        <figure className="user-page-background-wrapper">
          <img
            src="/test/profile1.jpg"
            alt="헤더 배경 이미지"
            className="user-page-background"
          />
        </figure>
        <div className="user-page-follow">
          <span>
            <LuBell className="user-page-follow-alarm icon" />
          </span>
          <span className="user-page-follow-btn">팔로우</span>
        </div>

        <div className="user-page-info">
          <div className="user-page-info-user">
            <p className="user-page-username">{userInfo.username}</p>
            <p className="user-page-userId">@{userInfo.userId}</p>
          </div>
          <div className="user-page-info-dates">
            <p className="user-page-birth">
              생일 {userInfo.birth.slice(0, 4)}년 {userInfo.birth.slice(4, 6)}월{" "}
              {userInfo.birth.slice(6, 8)}일
            </p>
            <p className="user-page-regdate">
              <LuCalendar className="icon" />
              2017년 5월에 가입함
            </p>
          </div>
          <div className="user-page-info-follow">
            <span>{userInfo.followings.length} 팔로잉</span>
            <span>{userInfo.followers.length} 팔로워</span>
          </div>
        </div>
      </div>
      <div className="user-page-tablist">
        게시물, 답글, 미디어, 마음에 들어요
      </div>
    </div>
  );
};

export default UserPage;
