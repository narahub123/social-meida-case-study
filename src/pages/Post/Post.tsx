import "./post.css";
import { LuAtSign, LuMoreHorizontal } from "react-icons/lu";
import { TbMessageCircle } from "react-icons/tb";
import { AiOutlineRetweet } from "react-icons/ai";
import { FaHeart, FaRegHeart } from "react-icons/fa6";
import { IoStatsChartSharp } from "react-icons/io5";
import { useRef, useState } from "react";
import PostMore from "./components/PostMore";
import useClickOutside from "../../hooks/useClickOutside";
import { convertDateToYYYYMMDD } from "../../components/Calendar/data/calendar.data";
import { PostInfoType } from "../../types/post.types";
import PostImages from "./components/PostImages";
import PostVote from "./components/PostVote";

const Post = () => {
  const containerRef = useRef(null);

  // 좋아요 여부
  // 더보기
  const [openMore, setOpenMore] = useState(false);

  useClickOutside(containerRef, setOpenMore);
  // 정보
  const [userInfo, setUserInfo] = useState<{
    [key: string]: boolean | string;
  }>({
    username: "하이요",
    userId: "hihihihi",
    following: false,
    mute: false,
    block: false,
    report: false,
  });
  const [postInfo, setPostInfo] = useState<PostInfoType>({
    text: "연습",
    images: [],
    votes: {
      choice0: { text: "하하", selectors: [] },
      choice1: { text: "호호", selectors: [] },
    },
    postDate: new Date(),
    userId: "ihih",
    comments: [],
    retweets: [],
    favorites: [],
    views: 0,
  });
  // 좋아요 핸들러
  const handleFavoriteUnfavorite = () => {
    if (!postInfo) return;

    if (postInfo.favorites.includes(userInfo.userId as string)) {
      const newFavs = postInfo.favorites.filter(
        (fav) => fav !== userInfo.userId
      );
      setPostInfo({
        ...postInfo,
        favorites: newFavs,
      });
    } else {
      setPostInfo({
        ...postInfo,
        favorites: [...postInfo.favorites, userInfo.userId] as string[],
      });
    }
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
              <p className="post-main-username">{userInfo.username}</p>

              <div className="post-main-userid-wrapper">
                <LuAtSign className="icon" />
                <p className="post-main-userid">{userInfo.userId}</p>
              </div>
              <p className="dot" />
              <p className="post-main-postdate">
                {convertDateToYYYYMMDD(postInfo.postDate)}
              </p>
            </div>
            <div className="post-main-header-right" ref={containerRef}>
              <LuMoreHorizontal
                className="post-main-more"
                onClick={() => setOpenMore(!openMore)}
              />
              {openMore && (
                <PostMore
                  userInfo={userInfo}
                  setUserInfo={setUserInfo}
                  setOpenMore={setOpenMore}
                />
              )}
            </div>
          </div>
          {/* 메인 */}
          <div className="post-main-content">
            <div className="post-main-content-text">{postInfo.text}</div>
            <div className="post-main-content-extra">
              <PostImages postInfo={postInfo} setPostInfo={setPostInfo} />
              <PostVote
                userInfo={userInfo}
                postInfo={postInfo}
                setPostInfo={setPostInfo}
              />
            </div>
          </div>
          {/* 푸터 */}
          <div className="post-main-footer">
            <span className="post-main-footer-item comment">
              <TbMessageCircle className="post-main-footer-item-icon icon" />
              <p className="post-main-footer-item-text">
                {postInfo && postInfo.comments ? postInfo.comments.length : 0}
              </p>
            </span>
            <span className="post-main-footer-item retweet">
              <AiOutlineRetweet className="post-main-footer-item-icon icon" />
              <p className="post-main-footer-item-text">
                {postInfo && postInfo.retweets ? postInfo.retweets.length : 0}
              </p>
            </span>
            <span
              className="post-main-footer-item favorite"
              onClick={handleFavoriteUnfavorite}
            >
              {postInfo &&
              userInfo &&
              postInfo?.favorites.includes(userInfo.userId as string) ? (
                <FaHeart className="post-main-footer-item-icon icon favorite" />
              ) : (
                <FaRegHeart className="post-main-footer-item-icon icon unfavorite" />
              )}
              <p className="post-main-footer-item-text">
                {postInfo && postInfo.favorites ? postInfo.favorites.length : 0}
              </p>
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
