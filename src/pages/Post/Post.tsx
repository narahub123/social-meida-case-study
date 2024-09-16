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

const Post = () => {
  const containerRef = useRef(null);
  const imagesRef = useRef<HTMLDivElement>(null);
  // 좋아요 여부
  // 더보기
  const [openMore, setOpenMore] = useState(false);
  const [imgNum, setImgNum] = useState(0);
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
  const [postInfo, setPostInfo] = useState<{
    text: string | undefined;
    images: string[] | undefined;
    postDate: Date;
    userId: string;
    comments: string[];
    retweets: string[];
    favorites: string[];
    views: number;
  }>({
    text: "연습",
    images: ["test/profile1.jpg", "test/profile2.jpg"],
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

  // 사진 dot 핸들러
  const handleDots = (index: number) => {
    if (!imagesRef.current) return;

    const width = Math.floor(imagesRef.current.getBoundingClientRect().width);

    console.log(width);

    imagesRef.current.style.setProperty(
      "--preview-width",
      `-${width * index}px`
    );

    setImgNum(index);
  };

  console.log(postInfo?.favorites);

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
              <div className="post-main-content-extra-photos-wrapper">
                <div
                  className="post-main-content-extra-photos"
                  ref={imagesRef}
                  tabIndex={1}
                >
                  {postInfo.images?.map((img) => (
                    <img
                      src={img}
                      className="post-main-content-extra-photos-photo"
                    />
                  ))}
                </div>
                <div className="post-main-content-extra-photos-dots">
                  {postInfo.images?.map((_, i) => (
                    <p
                      className={`dot-indicator${
                        imgNum === i ? " selected" : ""
                      }`}
                      onClick={() => handleDots(i)}
                    />
                  ))}
                </div>
              </div>
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
