import "./postVote.css";
import { PostInfoType } from "../../../types/post.types";
import { useEffect, useState } from "react";
import { LuUsers, LuUsers2 } from "react-icons/lu";

interface PostVoteProps {
  userInfo: {
    [key: string]: string | boolean;
  };
  postInfo: PostInfoType;
  setPostInfo: React.Dispatch<React.SetStateAction<PostInfoType>>;
}

const PostVote = ({ userInfo, postInfo, setPostInfo }: PostVoteProps) => {
  const [selected, setSelected] = useState(false);
  const [selectors, setSelectors] = useState<{
    [key: string]: string[];
  }>();
  const votes = postInfo.votes ? Object.values(postInfo.votes) : [];

  useEffect(() => {
    if (!postInfo.votes) return;
    const keys = Object.keys(postInfo.votes);
    const values = Object.values(postInfo.votes);

    const selectors: { [key: string]: string[] } = {};

    for (let i = 0; i < keys.length; i++) {
      const key = keys[i];
      const value = values[i].selectors;

      // 선택한 적이 있는지 확인
      if (value.includes(userInfo.userId as string)) {
        setSelected(true);
      }

      selectors[key] = value;
    }

    setSelectors(selectors);
  }, [postInfo]);

  // 투표하기
  const handleAddCount = (index: number) => {
    if (!postInfo.votes || !userInfo.userId) return;

    const selector = votes[index].selectors;

    if (selector.includes(userInfo.userId as string)) return;

    setPostInfo({
      ...postInfo,
      votes: {
        ...postInfo.votes,
        [`choice${index}`]: {
          text: postInfo.votes[`choice${index}`].text,
          selectors: [
            ...postInfo.votes[`choice${index}`].selectors,
            userInfo.userId as string,
          ],
        },
      },
    });

    setSelected(true);
  };

  const attendants = votes.reduce((sum, arr) => sum + arr.selectors.length, 0);

  return (
    <div className="post-vote">
      {selected
        ? votes.map((vote) => (
            <div className="post-vote-container">
              <span className="post-vote-text">{vote.text}</span>
              <span className="post-vote-graph">
                <p
                  className="post-vote-occupy"
                  style={{
                    width: `${(vote.selectors.length / attendants) * 100}%`,
                    height: "100%",
                  }}
                />
                <p className="post-vote-occupy-percentage">
                  {`${(vote.selectors.length / attendants) * 100}% (${
                    vote.selectors.length
                  }/${attendants})`}
                </p>
              </span>
            </div>
          ))
        : votes.map((vote, index) => (
            <p
              className="post-vote-item"
              key={vote.text}
              onClick={() => handleAddCount(index)}
            >
              {vote.text}
            </p>
          ))}
      <div className="post-vote-info">
        <div className="post-vote-info-duration">2024년 10월 1일 투표 종료</div>
        <div className="post-vote-attendants">
          <LuUsers2 className="post-vote-attendants-icon icon" />
          {attendants}명
        </div>
      </div>
    </div>
  );
};

export default PostVote;
