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
} from "react-icons/fa6";
import { FaMapMarkerAlt, FaRegSmile } from "react-icons/fa";
import { RiCalendarScheduleLine } from "react-icons/ri";
import { BsFillPatchCheckFill } from "react-icons/bs";
import {
  LuCheck,
  LuAtSign,
  LuPlus,
  LuX,
  LuArrowRight,
  LuArrowLeft,
  LuMinus,
} from "react-icons/lu";
import useClickOutside from "../../hooks/useClickOutside";
import NormalInput from "./components/NormalInput";
import { VoteType } from "../../types/home.types";
import SelectItem from "./components/SelectItem";
import { createArrayFromZero } from "./data/home.data";
import Emoticons from "./pages/Emoticons";

const Home = () => {
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const writeRef = useRef<HTMLElement>(null);
  const progressRef = useRef<SVGCircleElement>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const previewContainerRef = useRef<HTMLDivElement>(null);
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

  // 이미지
  const [imgUrls, setImgUrls] = useState<(string | ArrayBuffer | null)[]>([]);

  // 이미지 로딩
  const [loading, setLoading] = useState(false);

  // 슬라이드
  const [imgNum, setImgNum] = useState(1);

  // 투표 보이기
  const [isVoting, setIsVoting] = useState(false);

  // 투표 상태
  const [vote, setVote] = useState<VoteType>({
    choices: {
      choice1: "",
      choice2: "",
    },
    duration: {
      date: undefined,
      hour: undefined,
      min: undefined,
    },
  });

  const choices = Object.values(vote[`choices`]);

  // 투표 포커스 여부 확인
  const [focused, setFocused] = useState(false);

  // 이모지 모달 열기
  const [openEmojiModal, setOpenEmojiModal] = useState(false);

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

  // 글쓰기 및 진행 보여주기
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

  // 이미지 추가하기
  const handleImagesChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const urls: (string | ArrayBuffer | null)[] = [];
    if (!e.target.files) return;

    const files = e.target.files;

    setLoading(true);
    // 각 파일을 비동기로 읽기
    const readFiles = async (
      file: File
    ): Promise<string | ArrayBuffer | null> => {
      return new Promise((resolve, reject) => {
        if (file && file.type.startsWith("image/")) {
          const reader = new FileReader();

          reader.onload = () => resolve(reader.result);
          reader.onerror = () => reject(null);

          reader.readAsDataURL(file);
        } else {
          resolve(null);
        }
      });
    };

    // 파일들을 순차적으로 처리하고 결과를 저장
    for (const file of files) {
      try {
        const result = await readFiles(file);
        urls.push(result);
      } catch (error) {
        console.error("파일 처리 중 오류 발생", error);
        urls.push(null);
      }
    }

    // 기존 이미지 URL에 새로운 URL 추가
    setImgUrls((prevUrls) => [...prevUrls, ...urls]);
    setLoading(false);
  };

  // 이미지 삭제
  const handleRemoveImages = (url: string) => {
    const newImgUrls = imgUrls.filter((img) => img !== url);

    setImgUrls(newImgUrls);

    // 가장 처음 사진으로 이동
    setImgNum(1);
    if (!previewContainerRef.current) return;

    previewContainerRef.current.style.setProperty("--preview-width", `-${0}px`);
  };

  // 오른쪽 이동
  const handleMoveRight = () => {
    if (!previewContainerRef.current) return;
    const width = Math.floor(
      previewContainerRef.current.getBoundingClientRect().width
    );

    previewContainerRef.current.style.setProperty(
      "--preview-width",
      `-${width * imgNum}px`
    );

    setImgNum((prev) => prev + 1);
  };

  // 왼족 이동
  const handleMoveLeft = () => {
    if (!previewContainerRef.current) return;
    const width = Math.floor(
      previewContainerRef.current.getBoundingClientRect().width
    );

    previewContainerRef.current.style.setProperty(
      "--preview-width",
      `-${width * (imgNum - 2)}px`
    );

    setImgNum((prev) => prev - 1);
  };

  // 점 이동
  const handleDotMove = (index: number) => {
    if (!previewContainerRef.current) return;
    const width = Math.floor(
      previewContainerRef.current.getBoundingClientRect().width
    );

    previewContainerRef.current.style.setProperty(
      "--preview-width",
      `-${width * index}px`
    );

    setImgNum(index + 1);
  };

  // 선택지 추가
  const addChoices = (num: number) => {
    const choice = `choice${num}`;

    setVote((prev) => ({
      ...prev,
      choices: {
        ...prev.choices,
        [choice]: "",
      },
    }));
  };

  // 선택지 삭제
  const deleteChoice = (num: number) => {};
  console.log(vote);

  console.log(text);

  // 이모지 추가
  useEffect(() => {
    if (!inputRef.current) return;

    inputRef.current.value = text;
  }, [text]);

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
                {/* 이미지 프리뷰 */}
                <div
                  className="home-write-type-input-imagepreview"
                  ref={previewContainerRef}
                >
                  <div className="home-write-type-input-imagepreview-wrapper">
                    <div
                      className={`home-write-type-input-imagepreview-container`}
                    >
                      {imgUrls.map((url) => {
                        if (typeof url === "string") {
                          return (
                            <div
                              className="home-write-type-input-imagepreview-item"
                              key={url}
                            >
                              <LuX
                                className="home-write-type-input-imagepreview-item-remove"
                                onClick={() => handleRemoveImages(url)}
                              />
                              <img
                                src={url}
                                alt="이미지"
                                className="home-write-type-input-imagepreview-item-img"
                              />
                            </div>
                          );
                        }
                      })}
                    </div>
                    <div className="home-write-type-input-imagepreview-dots">
                      {imgUrls.map((_, idx) => (
                        <p
                          className={`home-write-type-input-imagepreview-dots-dot${
                            imgNum === idx + 1 ? " active" : ""
                          }`}
                          onClick={() => handleDotMove(idx)}
                          key={idx}
                        />
                      ))}
                    </div>
                  </div>
                  {imgUrls.length > 1 && imgNum !== 1 && (
                    <LuArrowLeft
                      className="home-write-type-input-imagepreview-moveleft"
                      onClick={handleMoveLeft}
                    />
                  )}
                  {imgUrls.length > 1 && imgUrls.length > imgNum && (
                    <LuArrowRight
                      className="home-write-type-input-imagepreview-moveright"
                      onClick={handleMoveRight}
                    />
                  )}
                </div>
                {/* 투표 */}
                {isVoting && (
                  <div
                    className="vote"
                    tabIndex={1}
                    onFocus={() => setFocused(true)}
                  >
                    {/* 투표 타이틀 */}
                    <section className="vote-title">질문하기</section>
                    <div className="vote-wrapper">
                      {/* 투표 선택지 */}
                      <section className="vote-choices">
                        {/* choice1 */}
                        <div className="vote-choices-wrapper">
                          <NormalInput
                            id={"choice1"}
                            text={"선택 1"}
                            vote={vote}
                            setVote={setVote}
                          />
                          <span className={`vote-choice-add`}>
                            {choices.length > 2 ? (
                              <LuMinus
                                className={`vote-choice-delete-icon icon active`}
                                onClick={() => deleteChoice(1)}
                              />
                            ) : (
                              <LuMinus
                                className={`vote-choice-delete-icon icon`}
                              />
                            )}
                          </span>
                        </div>
                        {/* choice2 */}
                        <div className="vote-choices-wrapper">
                          <NormalInput
                            id={"choice2"}
                            text={"선택 2"}
                            vote={vote}
                            setVote={setVote}
                          />
                          <span className={`vote-choice-add`}>
                            {choices.length > 2 ? (
                              <LuMinus
                                className={`vote-choice-add-icon icon active`}
                                onClick={() => deleteChoice(2)}
                              />
                            ) : (
                              <LuPlus
                                className={`vote-choice-add-icon icon${
                                  choices.length === 2 ? " active" : ""
                                }`}
                                onClick={() => addChoices(3)}
                              />
                            )}
                          </span>
                        </div>
                        {/* choice3 */}
                        {typeof vote["choices"]["choice3"] === "string" && (
                          <div className="vote-choices-wrapper">
                            <NormalInput
                              id={"choice3"}
                              text={"선택 3 (선택사항)"}
                              vote={vote}
                              setVote={setVote}
                            />
                            <span className={`vote-choice-add`}>
                              {choices.length > 3 ? (
                                <LuMinus
                                  className={`vote-choice-add-icon icon active`}
                                  onClick={() => deleteChoice(3)}
                                />
                              ) : (
                                <LuPlus
                                  className={`vote-choice-add-icon icon${
                                    choices.length === 3 ? " active" : ""
                                  }`}
                                  onClick={() => addChoices(4)}
                                />
                              )}
                            </span>
                          </div>
                        )}
                        {/* choice4 */}
                        {typeof vote["choices"]["choice4"] === "string" && (
                          <div className="vote-choices-wrapper">
                            <NormalInput
                              id={"choice4"}
                              text={"선택 4 (선택사항)"}
                              vote={vote}
                              setVote={setVote}
                            />
                            <span className={`vote-choice-add`}>
                              <LuMinus
                                className={`vote-choice-add-icon icon active`}
                                onClick={() => deleteChoice(4)}
                              />
                            </span>
                          </div>
                        )}
                      </section>
                      {/* 투표 기간 */}
                      <section className="vote-duration">
                        <div className="vote-duration-title">투표기간</div>
                        <div className="vote-duration-container">
                          <SelectItem
                            title={"일"}
                            id="date"
                            array={createArrayFromZero(8)}
                            vote={vote}
                            setVote={setVote}
                          />
                          <SelectItem
                            title={"시간"}
                            id="hour"
                            array={createArrayFromZero(24)}
                            vote={vote}
                            setVote={setVote}
                          />
                          <SelectItem
                            title={"분"}
                            id="min"
                            array={createArrayFromZero(60)}
                            vote={vote}
                            setVote={setVote}
                          />
                        </div>
                      </section>
                      {/* 투표 취소 버튼 */}
                      <section className="vote-button">
                        <button className="vote-button-btn">
                          투표 취소하기
                        </button>
                      </section>
                    </div>
                  </div>
                )}
                {/* home-write에 포커스이 있는 경우에만 보이게 하기 */}
                {(isFocused || imgUrls.length !== 0 || text !== "") && (
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
                {/* 아이콘들  */}
                <span className="home-write-type-icons">
                  {/* 이미지 추가하기 */}
                  <div
                    className="home-write-type-icons-icon-wrapper"
                    onClick={() => fileRef.current?.click()}
                  >
                    <FaRegImage
                      className="home-write-type-icons-icon icon"
                      title="미디어"
                    />
                    <input
                      type="file"
                      hidden
                      ref={fileRef}
                      multiple
                      onChange={(e) => handleImagesChange(e)}
                    />
                  </div>
                  {/* 투표 */}
                  <div
                    className={`home-write-type-icons-icon-wrapper${
                      isVoting ? " selected" : ""
                    }`}
                    onClick={() => setIsVoting(!isVoting)}
                  >
                    <FaListUl
                      className={`home-write-type-icons-icon icon`}
                      title="투표"
                    />
                  </div>
                  {/* 이모티콘 */}
                  <div
                    className="home-write-type-icons-icon-wrapper"
                    onClick={() => setOpenEmojiModal(!openEmojiModal)}
                  >
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
                    {/* 프로그레시브 서클 */}
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
                  <button className="home-write-type-btn">
                    {loading ? "loading.." : "게시하기"}
                  </button>
                </span>
              </div>
              {openEmojiModal && <Emoticons setText={setText} />}
            </div>
          </div>
        </section>
        <section className="home-postlist">포스트 리스트</section>
      </div>
    </div>
  );
};

export default Home;
