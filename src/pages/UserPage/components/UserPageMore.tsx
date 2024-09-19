import "./userPageMore.css";
import { GoMute, GoUnmute } from "react-icons/go";
import { LuAtSign, LuBan, LuFlag, LuLink } from "react-icons/lu";

interface UserPageMoreProps {
  userInfo: {
    [key: string]: string | string[] | Date;
  };
}

const UserPageMore = ({ userInfo }: UserPageMoreProps) => {
  return (
    <ul className="userinfo-more-container">
      {/* 링크 복사 */}
      <li className="userinfo-more-item">
        <span className="userinfo-more-item-icon">
          <LuLink className=" icon" />
        </span>
        <span className="userinfo-more-item-text">프로필 링크 복사하기</span>
      </li>
      {/* 뮤트하기 */}
      <li className="userinfo-more-item">
        <span className="userinfo-more-item-icon">
          {(userInfo.mutes as string[]).includes(userInfo.userId as string) ? (
            <GoUnmute className="icon" />
          ) : (
            <GoMute className="icon" />
          )}
        </span>
        <span className="userinfo-more-item-text">
          <LuAtSign /> {userInfo.userId as string}님 뮤트하기
        </span>
      </li>
      {/* 차단하기 */}
      <li className="userinfo-more-item">
        <span className="userinfo-more-item-icon">
          <LuBan className=" icon" />
        </span>
        <span className="userinfo-more-item-text">
          <LuAtSign /> {userInfo.userId as string}님 차단하기
        </span>
      </li>
      {/* 신고하기 */}
      <li className="userinfo-more-item">
        <span className="userinfo-more-item-icon">
          <LuFlag className=" icon" />
        </span>
        <span className="userinfo-more-item-text">
          <LuAtSign /> {userInfo.userId as string}님 신고하기
        </span>
      </li>
    </ul>
  );
};

export default UserPageMore;
