import { PostInfoType } from "../../../types/post.types";
import "./postRetweet.css";
import PostVote from "./PostVote";

interface PostRetweetProps {
  userInfo: {
    [key: string]: string | boolean;
  };
  postInfo: PostInfoType;
  setPostInfo: React.Dispatch<React.SetStateAction<PostInfoType>>;
  setOPenRetweetModal: React.Dispatch<React.SetStateAction<boolean>>;
}
const PostRetweet = ({
  userInfo,
  postInfo,
  setPostInfo,
  setOPenRetweetModal,
}: PostRetweetProps) => {
  return (
    <div className="post-retweet">
      <div className="post-retweet-wrapper">
        <div className="post-retweet-container">
          {/* 헤더 */}
          <div className="post-retweet-header">
            <img
              src={userInfo.userPic as string}
              alt="프로필 사진"
              className="post-retweet-image"
            />
            <input type="text" className="post-retweet-write" />
          </div>
          {/* 리트윗하는 내용 */}
          <div className="post-retweet-content">
            <div className="post-retweet-content-wrapper">
              <PostVote
                userInfo={userInfo}
                postInfo={postInfo}
                setPostInfo={setPostInfo}
              />
            </div>
          </div>
          {/* 아이콘들 */}
          <div className="post-retweet-icons">아이콘들</div>
          <div className="post-retweet-btns">
            <button
              className="post-retweet-btn close"
              onClick={() => setOPenRetweetModal(false)}
            >
              닫기
            </button>
            <button className="post-retweet-btn upload">게시하기</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostRetweet;
