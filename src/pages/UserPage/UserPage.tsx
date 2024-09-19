import { LuBell, LuCalendar, LuMail, LuMoreHorizontal } from "react-icons/lu";
import "./userPage.css";
import { useEffect, useRef, useState } from "react";
import { convertDateToKoreanZone } from "../../components/Calendar/data/calendar.data";
import UserPageMore from "./components/UserPageMore";
import { NavLink, Outlet } from "react-router-dom";
import useClickOutside from "../../hooks/useClickOutside";

const UserPage = () => {
  const moreRef = useRef<HTMLSpanElement>(null);
  const [userInfo, setUserInfo] = useState<{
    [key: string]: string | string[] | Date;
  }>({
    username: "하이요",
    userId: "hihihihi",
    birth: "20060515",
    regDate: new Date(),
    userIntro: "강한 뉴진스의 강한 강해린",
    userPic: "/test/profile1.jpg",
    followings: [],
    followers: [],
    mutes: [],
  });

  const [openMore, setOpenMore] = useState(false);

  useClickOutside(moreRef, setOpenMore);
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
          {/* 더보기 */}
          <span
            className="user-page-follow-item"
            title="더보기"
            onClick={() => setOpenMore(!openMore)}
            ref={moreRef}
          >
            <LuMoreHorizontal className="user-page-follow-alarm icon" />
            {openMore && <UserPageMore userInfo={userInfo} />}
          </span>
          {/* 팔로우 한 상대일 때만 보임 */}
          <span className="user-page-follow-item">
            <LuBell className="user-page-follow-alarm icon" />
          </span>
          <span className="user-page-follow-item">
            <LuMail className="user-page-follow-alarm icon" />
          </span>
          <span className="user-page-follow-btn">팔로우</span>
        </div>

        <div className="user-page-info">
          <div className="user-page-info-user">
            <p className="user-page-username">{userInfo.username as string}</p>
            <p className="user-page-userId">@{userInfo.userId as string}</p>
          </div>
          <div className="user-page-info-intro">
            <p>{userInfo.userIntro as string}</p>
          </div>
          <div className="user-page-info-dates">
            <p className="user-page-birth">
              생일 {(userInfo.birth as string).slice(0, 4)}년{" "}
              {(userInfo.birth as string).slice(4, 6)}월{" "}
              {(userInfo.birth as string).slice(6, 8)}일
            </p>
            <p className="user-page-regdate">
              <LuCalendar className="icon" />
              {convertDateToKoreanZone(userInfo.regDate as Date)}에 가입함
            </p>
          </div>
          <div className="user-page-info-follow">
            <span>{(userInfo.followings as string[]).length} 팔로우 중</span>
            <span>{(userInfo.followers as string[]).length} 팔로워</span>
          </div>
        </div>
      </div>
      <div className="user-page-tablist">
        <ul className="user-page-tablist-container">
          <NavLink
            to={`/${userInfo.userId}`}
            end
            className={"user-page-tablist-tab"}
          >
            <p className="user-page-tablist-tab-text">게시물</p>
          </NavLink>
          <NavLink
            to={`/${userInfo.userId}/replies`}
            className="user-page-tablist-tab"
          >
            <p className="user-page-tablist-tab-text">답글</p>
          </NavLink>
          <NavLink
            to={`/${userInfo.userId}/media`}
            className="user-page-tablist-tab"
          >
            <p className="user-page-tablist-tab-text">미디어</p>
          </NavLink>
          <NavLink
            to={`/${userInfo.userId}/favorites`}
            className="user-page-tablist-tab"
          >
            <p className="user-page-tablist-tab-text">마음에 들어요</p>
          </NavLink>
        </ul>
      </div>
      <div className="user-page-content">
        <Outlet />
      </div>
    </div>
  );
};

export default UserPage;
