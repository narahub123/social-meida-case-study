import "./home.css";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
// 로그인 유저의 위치에 따라 아이콘의 모양이 다르게 적용
// navigator
import {
  FaEarthAfrica,
  FaEarthAmericas,
  FaEarthAsia,
  FaEarthEurope,
  FaEarthOceania,
  FaUserCheck,
  FaRegImage,
  FaListUl,
  FaRegFaceSmile,
} from "react-icons/fa6";
import { FaMapMarkerAlt, FaRegSmile } from "react-icons/fa";
import { RiCalendarScheduleLine } from "react-icons/ri";
import { BsFillPatchCheckFill } from "react-icons/bs";
import { LuCheck, LuAtSign, LuPlus } from "react-icons/lu";
import useClickOutside from "../../hooks/useClickOutside";

const Home = () => {
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const writeRef = useRef<HTMLElement>(null);
  const progressRef = useRef<SVGCircleElement>(null);
  const MAX_TEXT = 144;

  // 탭 상태 : 추천, 팔로잉 중
  const [tab, setTab] = useState("following");

  // 사용자의 위치 정보
  const [location, setLocation] = useState("asia");

  // input 박스에 포커스가 걸려있는지 여부 확인
  const [isFocused, setIsFocused] = useState(false);

  // input 박스 이외를 클릭하면 focus 사라지게 함
  useClickOutside(writeRef, setIsFocused);

  // 댓글 드롭다운  열기
  const [cmtDropdown, setCmtDropdown] = useState(false);

  // 드롭다운 이외에 클릭하는 경우 드롭다운이 닫히는 hook
  useClickOutside(dropdownRef, setCmtDropdown);

  // 댓글 설정
  const [cmtSetting, setCmtSetting] = useState("all");

  // 글
  const [text, setText] = useState("");

  const handleText = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    if (!progressRef.current) return;

    const length = value.length;

    if (length > MAX_TEXT) return;
    setText(value);
    const offset = 75.36 - (75.36 * length) / MAX_TEXT;

    progressRef.current.style.setProperty("--progress", offset.toString());
  };

  // 탭 변경
  const handleTab = (tab: string) => {
    setTab(tab);
  };

  // 댓글 드롭다운 열기
  const handleCmtDropdown = (
    e: React.MouseEvent<HTMLParagraphElement, MouseEvent>
  ) => {
    e.stopPropagation();
    setCmtDropdown(!cmtDropdown);
  };

  // 댓글 설정하기
  const handleCommentSetting = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    setting: string
  ) => {
    e.stopPropagation();
    setCmtSetting(setting);
    setCmtDropdown(!cmtDropdown);
  };

  // 필요한 데이터 불러오기 (테스트)
  useEffect(() => {
    const baseUrl = import.meta.env.VITE_BASE_URL;
    const fetchData = async () => {
      const response = await fetch(`${baseUrl}/test/enter`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      if (!response.ok) {
        if (response.status === 403 || response.status === 401) {
          navigate("/auth");
        }
      }

      const data = await response.json();

      return data;
    };

    fetchData();
  }, []);

  return (
    <div className="home">
      <div className="home-wrapper">
        <section className="home-tablist">
          <div className="home-tablist-wrapper">
            <div className="home-tablist-item">
              <p
                className={`home-tablist-item-text${
                  tab === "recommend" ? " active" : ""
                }`}
                onClick={() => handleTab("recommend")}
              >
                추천
              </p>
            </div>
            <div className="home-tablist-item">
              <p
                className={`home-tablist-item-text${
                  tab === "following" ? " active" : ""
                }`}
                onClick={() => handleTab("following")}
              >
                팔로우 중
              </p>
            </div>
          </div>
        </section>
        <section
          className="home-write"
          tabIndex={1}
          ref={writeRef}
          onClick={() => setIsFocused(true)}
        >
          <div className="home-write-wrapper">
            <div className="home-write-userinfo">
              <figure className="home-write-userinfo-container">
                <img
                  src="/test/profile1.jpg"
                  alt="로그인 사용자 이미지"
                  className="home-write-userinfo-image"
                />
              </figure>
            </div>
            <div className="home-write-type-container">
              {/* 글쓰기 */}
              <div className="home-write-type-input-container">
                <input
                  type="text"
                  className="home-write-type-input"
                  placeholder="무슨일이 일어나고 있나요?"
                  maxLength={MAX_TEXT}
                  ref={inputRef}
                  onChange={(e) => handleText(e)}
                />
                {/* home-write에 포커스이 있는 경우에만 보이게 하기 */}
                {isFocused && (
                  <div className="home-write-type-comment">
                    <div className="home-write-type-comment-container">
                      {cmtSetting === "all" && location == "asia" ? (
                        <FaEarthAsia className="home-write-type-comment-icon icon" />
                      ) : cmtSetting === "all" && location === "africa" ? (
                        <FaEarthAfrica className="home-write-type-comment-icon icon" />
                      ) : cmtSetting === "all" && location === "america" ? (
                        <FaEarthAmericas className="home-write-type-comment-icon icon" />
                      ) : cmtSetting === "all" && location === "europe" ? (
                        <FaEarthEurope className="home-write-type-comment-icon icon" />
                      ) : cmtSetting === "all" && location === "oceania" ? (
                        <FaEarthOceania className="home-write-type-comment-icon icon" />
                      ) : cmtSetting === "following" ? (
                        <FaUserCheck className="home-write-type-comment-icon icon" />
                      ) : cmtSetting === "authenticated" ? (
                        <BsFillPatchCheckFill className="home-write-type-comment-icon icon" />
                      ) : cmtSetting === "re-comment" ? (
                        <LuAtSign className="home-write-type-comment-icon icon" />
                      ) : (
                        ""
                      )}
                      <p
                        className="home-write-type-comment-text"
                        onClick={(e) => handleCmtDropdown(e)}
                      >
                        {cmtSetting === "all"
                          ? "모든 사람이 답글을 달 수 있습니다."
                          : cmtSetting === "following"
                          ? "내가 팔로우하는 계정은 답글을 쓸 수 있습니다."
                          : cmtSetting === "authenticated"
                          ? "인증된 계정만 답글을 쓸 수 있습니다."
                          : cmtSetting === "re-comment"
                          ? "내가 멘션하는 계정만 답글을 쓸 수 있습니다."
                          : ""}
                      </p>
                    </div>
                    {/* 댓글 설정 드롭다운 */}
                    {cmtDropdown && (
                      <div
                        className="comment-setting-dropdown"
                        ref={dropdownRef}
                      >
                        <div className="comment-setting-dropdown-header">
                          <p className="comment-setting-dropdown-header-title">
                            답글을 달 수 있는 사람
                          </p>
                          <p className="comment-setting-dropdown-header-detail">
                            이 게시물에 답글을 달 수 있는 사람을 선택하세요.
                            멘션된 사람은 언제든지 답글을 달 수 있습니다.
                          </p>
                        </div>
                        <div className="comment-setting-dropdown-container">
                          <div
                            className="comment-setting-dropdown-item"
                            onClick={(e) => handleCommentSetting(e, "all")}
                          >
                            <div className="comment-setting-dropdown-item-icon-container">
                              <FaEarthAsia className="comment-setting-dropdown-item-icon icon" />
                            </div>
                            <p className="comment-setting-dropdown-item-text">
                              모든 사람
                            </p>
                            {cmtSetting === "all" && (
                              <LuCheck className="comment-setting-dropdown-item-checked" />
                            )}
                          </div>
                          <div
                            className="comment-setting-dropdown-item"
                            onClick={(e) =>
                              handleCommentSetting(e, "following")
                            }
                          >
                            <div className="comment-setting-dropdown-item-icon-container">
                              <FaUserCheck className="comment-setting-dropdown-item-icon icon" />
                            </div>
                            <p className="comment-setting-dropdown-item-text">
                              내가 팔로우하는 계정
                            </p>
                            {cmtSetting === "following" && (
                              <LuCheck className="comment-setting-dropdown-item-checked" />
                            )}
                          </div>
                          <div
                            className="comment-setting-dropdown-item"
                            onClick={(e) =>
                              handleCommentSetting(e, "authenticated")
                            }
                          >
                            <div className="comment-setting-dropdown-item-icon-container">
                              <BsFillPatchCheckFill className="comment-setting-dropdown-item-icon icon" />
                            </div>
                            <p className="comment-setting-dropdown-item-text">
                              인증된 계정
                            </p>
                            {cmtSetting === "authenticated" && (
                              <LuCheck className="comment-setting-dropdown-item-checked" />
                            )}
                          </div>
                          <div
                            className="comment-setting-dropdown-item"
                            onClick={(e) =>
                              handleCommentSetting(e, "re-comment")
                            }
                          >
                            <div className="comment-setting-dropdown-item-icon-container">
                              <LuAtSign className="comment-setting-dropdown-item-icon icon" />
                            </div>
                            <p className="comment-setting-dropdown-item-text">
                              내가 멘션하는 계정만
                            </p>
                            {cmtSetting === "re-comment" && (
                              <LuCheck className="comment-setting-dropdown-item-checked" />
                            )}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
              <div className="home-write-type-icons-container">
                <span className="home-write-type-icons">
                  <div className="home-write-type-icons-icon-wrapper">
                    <FaRegImage
                      className="home-write-type-icons-icon icon"
                      title="미디어"
                    />
                  </div>
                  <div className="home-write-type-icons-icon-wrapper">
                    <FaListUl
                      className="home-write-type-icons-icon icon"
                      title="투표"
                    />
                  </div>
                  <div className="home-write-type-icons-icon-wrapper">
                    <FaRegSmile
                      className="home-write-type-icons-icon icon"
                      title="이모티콘"
                    />
                  </div>
                  <div className="home-write-type-icons-icon-wrapper">
                    <RiCalendarScheduleLine
                      className="home-write-type-icons-icon icon"
                      title="예약하기"
                    />
                  </div>
                  <div className="home-write-type-icons-icon-wrapper">
                    <FaMapMarkerAlt
                      className="home-write-type-icons-icon icon"
                      title="지금 장소"
                    />
                  </div>
                </span>
                <span className="home-write-type-right">
                  <span className="home-write-type-extra">
                    <svg
                      className="home-write-type-extra-progress-svg"
                      width={30}
                      height={30}
                    >
                      <circle
                        r={12}
                        cx={15}
                        cy={15}
                        className="home-write-type-extra-border"
                      />
                      <circle
                        r={12}
                        cx={15}
                        cy={15}
                        className="home-write-type-extra-progress"
                        ref={progressRef}
                      />
                      <text
                        x="50%"
                        y="50%"
                        textAnchor="middle"
                        fill="cornflowerblue"
                        dy=".3em"
                        className="home-write-type-extra-progress-text"
                      >
                        {MAX_TEXT - text.length}
                      </text>
                    </svg>
                    <p className="home-write-type-extra-horizontal-divider"></p>
                    <div className="home-write-type-extra-add-wrapper">
                      <LuPlus
                        className="home-write-type-extra-add icon"
                        title="추가"
                      />
                    </div>
                  </span>
                  <button className="home-write-type-btn">게시하기</button>
                </span>
              </div>
            </div>
          </div>
        </section>
        <section className="home-postlist">포스트 리스트</section>
      </div>
    </div>
  );
};

export default Home;
