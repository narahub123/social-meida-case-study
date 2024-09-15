import "./post.css";
import { LuAtSign, LuMoreHorizontal } from "react-icons/lu";
import { TbMessageCircle } from "react-icons/tb";
import { AiOutlineRetweet } from "react-icons/ai";
import { FaHeart, FaRegHeart } from "react-icons/fa6";
import { IoStatsChartSharp } from "react-icons/io5";
import { useRef, useState } from "react";

import PostMore from "./components/PostMore";
import useClickOutside from "../../hooks/useClickOutside";

const Post = () => {
  const containerRef = useRef(null);
  // 좋아요 여부
  const [favorite, setFavorite] = useState(false);
  // 좋아요 숫자
  const [favorites, setFavorites] = useState(21);
  // 더보기
  const [openMore, setOpenMore] = useState(false);
  useClickOutside(containerRef, setOpenMore);
  // 정보
  const [info, setInfo] = useState<{
    [key: string]: boolean;
  }>({
    following: false,
    mute: false,
    block: false,
    report: false,
  });
  // 좋아요 핸들러
  const handleFavoriteUnfavorite = () => {
    setFavorite(!favorite);
    if (!favorite) setFavorites((prev) => prev + 1);
    if (favorite) setFavorites((prev) => prev - 1);
  };

  return (
    <div className="post">
      <div className="post-wrapper">
        <div className="post-left">
          <figure className="post-profile-photo-wrapper">
            <img
              src="/test/profile1.jpg"
              alt="프로필 사진"
              className="post-profile-photo"
            />
          </figure>
        </div>
        <div className="post-right">
          {/* 헤더 */}
          <div className="post-main-header">
            <div className="post-main-header-left">
              <p className="post-main-username">이름</p>

              <div className="post-main-userid-wrapper">
                <LuAtSign className="icon" />
                <p className="post-main-userid">주소</p>
              </div>
              <p className="dot" />
              <p className="post-main-postdate">날짜</p>
            </div>
            <div className="post-main-header-right" ref={containerRef}>
              <LuMoreHorizontal
                className="post-main-more"
                onClick={() => setOpenMore(!openMore)}
              />
              {openMore && (
                <PostMore
                  info={info}
                  setInfo={setInfo}
                  setOpenMore={setOpenMore}
                />
              )}
            </div>
          </div>
          {/* 메인 */}
          <div className="post-main-content">
            <div className="post-main-content-text">text</div>
            <div className="post-main-content-extra">extra</div>
          </div>
          {/* 푸터 */}
          <div className="post-main-footer">
            <span className="post-main-footer-item comment">
              <TbMessageCircle className="post-main-footer-item-icon icon" />
              <p className="post-main-footer-item-text">32</p>
            </span>
            <span className="post-main-footer-item retweet">
              <AiOutlineRetweet className="post-main-footer-item-icon icon" />
              <p className="post-main-footer-item-text">32</p>
            </span>
            <span
              className="post-main-footer-item favorite"
              onClick={handleFavoriteUnfavorite}
            >
              {favorite ? (
                <FaHeart className="post-main-footer-item-icon icon favorite" />
              ) : (
                <FaRegHeart className="post-main-footer-item-icon icon unfavorite" />
              )}
              <p className="post-main-footer-item-text">{favorites}</p>
            </span>
            <span className="post-main-footer-item view">
              <IoStatsChartSharp className="post-main-footer-item-icon icon" />
              <p className="post-main-footer-item-text">32</p>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;
