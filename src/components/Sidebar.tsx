import {
  LuBell,
  LuHome,
  LuMoreHorizontal,
  LuPen,
  LuSearch,
  LuUser,
} from "react-icons/lu";
import { MdOutlineLocalPostOffice } from "react-icons/md";

import "./sidebar.css";

const Sidebar = () => {
  return (
    <aside className="sidebar">
      <div className="sidebar-wrapper">
        <section className="sidebar-logo">
          <p className="sidebar-logo-small">PG</p>
          <p className="sidebar-logo-large">PlayGround</p>
        </section>
        <section className="sidebar-list">
          <ul className="sidebar-list-container">
            <li className="sidebar-list-item">
              <div className="sidebar-list-item-container">
                <LuHome className="sidebar-list-item-icon" />
                <span className="sidebar-list-item-text">홈</span>
              </div>
            </li>
            <li className="sidebar-list-item">
              <div className="sidebar-list-item-container">
                <LuSearch className="sidebar-list-item-icon" />
                <span className="sidebar-list-item-text">검색</span>
              </div>
            </li>
            <li className="sidebar-list-item">
              <div className="sidebar-list-item-container">
                <LuBell className="sidebar-list-item-icon" />
                <span className="sidebar-list-item-text">알림</span>
              </div>
            </li>
            <li className="sidebar-list-item">
              <div className="sidebar-list-item-container">
                <MdOutlineLocalPostOffice className="sidebar-list-item-icon" />
                <span className="sidebar-list-item-text">메세지</span>
              </div>
            </li>
            <li className="sidebar-list-item">
              <div className="sidebar-list-item-container">
                <LuUser className="sidebar-list-item-icon" />
                <span className="sidebar-list-item-text">프로필</span>
              </div>
            </li>
            <li className="sidebar-list-item">
              <div className="sidebar-list-item-container">
                <LuMoreHorizontal className="sidebar-list-item-icon" />
                <span className="sidebar-list-item-text">더보기</span>
              </div>
            </li>
          </ul>
        </section>
        <section className="sidebar-write">
          <button className="sidebar-btn">
            <p className="sidebar-btn-large">글쓰기</p>
            <LuPen className="sidebar-btn-small" />
          </button>
        </section>
        <section className="sidebar-bottom">
          <div className="sidebar-bottom-container">
            <img
              src="/test/profile1.jpg"
              alt="프로필 사진"
              className="sidebar-bottom-profile-photo"
            />
            <span className="sidebar-bottom-info">
              <p>username</p>
              <p>userId</p>
            </span>
            <LuMoreHorizontal className="sidebar-bottom-more" />
          </div>
        </section>
      </div>
    </aside>
  );
};

export default Sidebar;
