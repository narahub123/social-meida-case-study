import { LuSearch, LuUsers, LuUsers2, LuX } from "react-icons/lu";
import "./messageCompose.css";

const MessageCompose = () => {
  return (
    <div className="message-compose">
      <div className="message-compose-wrapper">
        <section className="message-compose-header">
          <span className="message-compose-header-left">
            <LuX className="message-compose-header-close icon" />
            <p className="message-compose-header-title">새 쪽지</p>
          </span>
          <span className="message-compose-header-right">
            <button className="message-compose-header-btn">다음</button>
          </span>
        </section>
        <section className="message-compose-search">
          <div className="message-compose-search-container">
            <span className="message-compose-search-icon">
              <LuSearch />
            </span>
            <input
              type="text"
              placeholder="사용자 검색"
              className="message-compose-search-input"
            />
          </div>
        </section>
        <section className="message-compose-list">
          <div className="message-compose-list-item">
            <LuUsers2 className="message-compose-list-item-icon icon" />
            <p className="message-compose-list-item-text">그룹 만들기</p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default MessageCompose;
