import "./post.css";
import { LuAtSign, LuMoreHorizontal } from "react-icons/lu";
import { TbMessageCircle } from "react-icons/tb";
import { AiOutlineRetweet } from "react-icons/ai";
import { FaHeart, FaRegHeart } from "react-icons/fa6";
import { IoStatsChartSharp } from "react-icons/io5";
import { useState } from "react";

const Post = () => {
  const [favorite, setFavorite] = useState(false);
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
            <LuMoreHorizontal className="post-main-more" />
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
            <span className="post-main-footer-item favorite">
              {favorite ? (
                <FaHeart className="post-main-footer-item-icon icon favorite" />
              ) : (
                <FaRegHeart className="post-main-footer-item-icon icon unfavorite" />
              )}
              <p className="post-main-footer-item-text">32</p>
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
