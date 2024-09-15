import { useRef } from "react";
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
import useClickOutside from "../../../hooks/useClickOutside";
interface PostMoreProps {
  info: {
    [key: string]: boolean;
  };
  setInfo: React.Dispatch<
    React.SetStateAction<{
      [key: string]: boolean;
    }>
  >;
  setOpenMore: React.Dispatch<React.SetStateAction<boolean>>;
}
const PostMore = ({ info, setInfo, setOpenMore }: PostMoreProps) => {
  const handleInfo = (key: string) => {
    setInfo((prev) => ({
      ...prev,
      [key]: !info[key],
    }));
  };
  return (
    <ul className="post-more-modal">
      <li className="post-more-item" onClick={() => handleInfo("following")}>
        <span className="post-more-item-icon icon">
          {info.following ? <LuUserX /> : <LuUserPlus />}
        </span>
        <span className="post-more-item-text">
          <LuAtSign className="icon" />
          <span>주소 님 </span>
          <span>{info.following ? "언팔로우하기" : "팔로우하기"}</span>
        </span>
      </li>
      <li className="post-more-item" onClick={() => handleInfo("mute")}>
        <span className="post-more-item-icon">
          {info.mute ? <GoUnmute /> : <GoMute />}
        </span>
        <span className="post-more-item-text">
          <LuAtSign className="icon" />
          <span>주소 님 </span>
          <span>{info.mute ? "언뮤트하기" : "뮤트하기"}</span>
        </span>
      </li>
      <li className="post-more-item" onClick={() => handleInfo("block")}>
        <span className="post-more-item-icon">
          {info.block ? <LuCircle /> : <LuBan />}
        </span>
        <span className="post-more-item-text">
          <LuAtSign className="icon" />
          <span>주소 님 </span>
          <span>{info.block ? "차단풀기" : "차단하기"}</span>
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
