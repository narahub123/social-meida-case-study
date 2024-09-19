import { LuArrowLeft, LuMailPlus, LuSearch, LuSettings } from "react-icons/lu";
import "./message.css";
import { useState } from "react";
import { Link } from "react-router-dom";
import MessageCompose from "./pages/MessageCompose";

const Message = () => {
  const [focused, setFocused] = useState(false);
  // 검색
  const [search, setSearch] = useState("");
  // 검색 분야
  const [section, setSection] = useState("total");
  // 검색 결과
  const [results, setResult] = useState([]);
  // 쪽지 생성
  const [openCompose, setOpenCompose] = useState(false);

  // 검색
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const search = e.target.value;
    setSearch(search);
  };

  return (
    <div className="message">
      {/* 헤더 */}
      <section className="message-header">
        <span className="message-header-left">
          <p className="message-header-title">쪽지</p>
        </span>
        <span className="message-header-right">
          <Link
            to={`/messages/settings`}
            className="message-header-item-wrapper"
          >
            <LuSettings className="message-header-item icon" />
          </Link>
          <div
            className="message-header-item-wrapper"
            onClick={() => setOpenCompose(true)}
          >
            <LuMailPlus className="message-header-item icon" />
          </div>
        </span>
      </section>
      {/* 검색 */}
      <section className="message-search">
        <section className="message-search-container">
          {focused && (
            <LuArrowLeft
              className="message-search-blur icon"
              onClick={() => setFocused(false)}
            />
          )}
          <input
            type="text"
            className={`message-search-input${focused ? " focused" : ""}`}
            onFocus={() => setFocused(true)}
            onChange={(e) => handleSearchChange(e)}
          />
          <LuSearch
            className={`message-search-input-icon${
              focused ? " focused" : ""
            } icon`}
          />
        </section>
      </section>
      {/* 탭 리스트 */}
      {search !== "" && (
        <section className="message-search-tablist">
          <span
            className="message-search-tablist-item"
            id="total"
            onClick={() => setSection("total")}
          >
            <p
              className={`message-search-tablist-item-text${
                section === "total" ? " active" : ""
              }`}
            >
              전체
            </p>
          </span>
          <span
            className="message-search-tablist-item"
            id="user"
            onClick={() => setSection("user")}
          >
            <p
              className={`message-search-tablist-item-text${
                section === "user" ? " active" : ""
              }`}
            >
              사용자
            </p>
          </span>
          <span
            className="message-search-tablist-item"
            id="group"
            onClick={() => setSection("group")}
          >
            <p
              className={`message-search-tablist-item-text${
                section === "group" ? " active" : ""
              }`}
            >
              그룹
            </p>
          </span>
          <span
            className="message-search-tablist-item"
            id="message"
            onClick={() => setSection("message")}
          >
            <p
              className={`message-search-tablist-item-text${
                section === "message" ? " active" : ""
              }`}
            >
              쪽지
            </p>
          </span>
        </section>
      )}
      {/* 결과 */}
      <section className="message-search-list">
        <div className="message-search-list-container">
          {search === "" && focused && (
            <p className="message-search-list-message">
              사람, 그룹 또는 쪽지를 검색해 보세요.
            </p>
          )}
          {results.length === 0 && search !== "" && (
            <p className="message-search-list-message">검색 결과가 없습니다.</p>
          )}
        </div>
      </section>
      {openCompose && <MessageCompose />}
    </div>
  );
};

export default Message;
