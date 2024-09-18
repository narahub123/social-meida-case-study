import "./postMore.css";
import { GoMute, GoUnmute } from "react-icons/go";
import { IoStatsChartSharp } from "react-icons/io5";
import {
  LuAtSign,
  LuBan,
  LuCircle,
  LuCode2,
  LuFlag,
  LuUserPlus,
  LuUserX,
} from "react-icons/lu";

interface PostMoreProps {
  userInfo: {
    [key: string]: string | boolean;
  };
  setUserInfo: React.Dispatch<
    React.SetStateAction<{
      [key: string]: string | boolean;
    }>
  >;
  setOpenMore: React.Dispatch<React.SetStateAction<boolean>>;
}
const PostMore = ({ userInfo, setUserInfo, setOpenMore }: PostMoreProps) => {
  const handleInfo = (key: string) => {
    setUserInfo((prev) => ({
      ...prev,
      [key]: !userInfo[key],
    }));
  };
  return (
    <ul className="post-more-modal">
      <li className="post-more-item" onClick={() => handleInfo("following")}>
        <span className="post-more-item-icon icon">
          {userInfo.following ? <LuUserX /> : <LuUserPlus />}
        </span>
        <span className="post-more-item-text">
          <LuAtSign className="icon" />
          <span>{userInfo.userId} 님 </span>
          <span>{userInfo.following ? "언팔로우하기" : "팔로우하기"}</span>
        </span>
      </li>
      <li className="post-more-item" onClick={() => handleInfo("mute")}>
        <span className="post-more-item-icon">
          {userInfo.mute ? <GoUnmute /> : <GoMute />}
        </span>
        <span className="post-more-item-text">
          <LuAtSign className="icon" />
          <span>{userInfo.userId} 님 </span>
          <span>{userInfo.mute ? "언뮤트하기" : "뮤트하기"}</span>
        </span>
      </li>
      <li className="post-more-item" onClick={() => handleInfo("block")}>
        <span className="post-more-item-icon">
          {userInfo.block ? <LuCircle /> : <LuBan />}
        </span>
        <span className="post-more-item-text">
          <LuAtSign className="icon" />
          <span>{userInfo.userId} 님 </span>
          <span>{userInfo.block ? "차단 해제하기" : "차단하기"}</span>
        </span>
      </li>
      <li className="post-more-item">
        <span className="post-more-item-icon">
          <IoStatsChartSharp />
        </span>
        <span className="post-more-item-text">게시 참여수 조회</span>
      </li>
      <li className="post-more-item">
        <span className="post-more-item-icon">
          <LuCode2 />
        </span>
        <span className="post-more-item-text">게시 담기</span>
      </li>
      <li className="post-more-item">
        <span className="post-more-item-icon">
          <LuFlag />
        </span>
        <span className="post-more-item-text">게시 신고하기</span>
      </li>
    </ul>
  );
};

export default PostMore;
