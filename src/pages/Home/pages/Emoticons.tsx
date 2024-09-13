import { LuCheck, LuSearch, LuX } from "react-icons/lu";
import "./emoticons.css";
import { colorArray, listOfEmoji } from "../data/home.data";
import React, { useRef, useState } from "react";
import emojis from "../data/emoji.json";
import { EmojiType } from "../../../types/home.types";
import { debounce } from "../../../utils/debounce";

interface EmoticonsProps {
  setText: React.Dispatch<React.SetStateAction<string>>;
}
const Emoticons = ({ setText }: EmoticonsProps) => {
  // input ref
  const inputRef = useRef<HTMLInputElement>(null);
  // 최근 사용한 이모지 목록
  const [recentArr, setRecentArr] = useState<EmojiType[]>([]);

  const defaultSelect = recentArr.length !== 0 ? "recent" : "";
  // 선택한 navbar 목록
  const [select, setSelect] = useState(defaultSelect);

  // 선택한 이모지 정보 상태
  const [selectedEmoji, setSelectedEmoji] = useState<{
    emoji: string;
    name: string;
    codes: string;
  }>({
    emoji: "👋",
    name: "흔드는 손",
    codes: "",
  });

  // 색 선택 : 설정
  const [color, setColor] = useState("default");
  // hover
  const [isHovering, setIsHovering] = useState("");

  // 색상 선택 열기
  const [openContainer, setOpenContainer] = useState(false);

  // navbar에서 이모지를 선택했을 때
  const handleSelectEmojiSection = (id: string) => {
    if (!inputRef.current) return;
    setSearch("");
    inputRef.current.value = "";
    setSelect(id);

    const elem = document.getElementById(id);

    elem?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  // mouse over 이모지 정보 저장
  const getEmojiInfo = (
    e: React.MouseEvent<HTMLParagraphElement, MouseEvent>
  ) => {
    const target = e.currentTarget;
    const emoji = target.dataset.emoji;
    const emojiName = target.dataset.emoji_name;
    const emojiCodes = target.dataset.emoji_codes;

    if (!emoji || !emojiName || !emojiCodes) return;

    setSelectedEmoji({
      emoji,
      name: emojiName,
      codes: emojiCodes,
    });
  };
  // mouse leave 이모지 정보 없애서 기본 정보 넣기
  const removeEmojiInfo = (
    e: React.MouseEvent<HTMLParagraphElement, MouseEvent>
  ) => {
    setSelectedEmoji({
      emoji: "👋",
      name: "흔드는 손",
      codes: "",
    });
  };

  // 색상 선택하기
  const handleSelectColor = (color: string) => {
    setColor(color);
    setOpenContainer(!openContainer);
  };

  // 이모지 검색어
  const [search, setSearch] = useState("");

  // 검색 결과
  const [results, setResults] = useState<EmojiType[]>([]);

  // 이모지 검색
  const handleFindEmoji = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    setSearch(value);
    const results = emojis.filter(
      (item) => item.name.includes(value) || item.name.includes(color)
    );

    setResults(results);
  };

  // 검색어 삭제하기
  const removeSearch = () => {
    setSearch("");
    if (!inputRef.current) return;

    inputRef.current.value = "";
  };

  // 검색 렌더링 횟수 줄이기
  const debouncedFindEmoji = debounce(handleFindEmoji, 300);

  // 이모지를 클릭했을 때
  const handleClickEmoji = (
    e: React.MouseEvent<HTMLParagraphElement, MouseEvent>,
    emoji: EmojiType
  ) => {
    e.stopPropagation();
    // 글쓰기 input에 내용 추가
    setText((prev) => {
      return (prev += emoji.char);
    });

    const copy = [...recentArr];
    // 최근 사용 목록에 추가 필요
    // fifo이므로 조건에 맞게 삽입해야 함
    // 0 중복 여부 확인 : 이미 배열 안에 포함된 이모지라면 추가 안함
    if (checkDuplicateEmoji(emoji.name) !== -1) return;

    // 1. 현재 recentArr의 개수가 18인지 확인
    const length = copy.length;

    console.log(length);

    // 2-1. 현재 18이라면 우선 가장 마지막 요소 삭제
    if (length === 18) {
      copy.pop();
    }

    // 3. 선택된 이모지를 배열의 처음에 삽입
    copy.unshift(emoji);

    // 수정된 배열을 저장
    setRecentArr(copy);
  };

  // 최근 사용한 이모지 중복 확인
  const checkDuplicateEmoji = (emoji: string) => {
    return recentArr.findIndex((recent) => recent.name === emoji);
  };

  return (
    <div className="emoticons">
      <div className="emoticons-wrapper">
        <div className="emoticons-container">
          <section className="emoticons-search">
            <input
              type="text"
              className="emoticons-search-input"
              onChange={debouncedFindEmoji}
              ref={inputRef}
            />
            <LuSearch className="emoticons-search-icon icon" />
            {search !== "" && (
              <LuX
                className="emoticons-search-remove-icon icon"
                onClick={removeSearch}
              />
            )}
          </section>
          <section className="emoticons-navbar">
            <ul className="emoticons-navbar-container">
              {listOfEmoji.map((emoji) => (
                <li
                  className={`emoticons-navbar-item${
                    select === emoji.id ? " selected" : ""
                  }`}
                  key={emoji.id}
                >
                  <p
                    className={`emoticons-navbar-item-emoji${
                      select === emoji.id ? " selected" : ""
                    }`}
                    onClick={() => handleSelectEmojiSection(emoji.id)}
                  >
                    {emoji.emoji}
                  </p>
                </li>
              ))}
            </ul>
          </section>
          {/* 이모지 목록 */}
          <section className="emoticons-lists">
            {/* search가 있는 경우 */}
            {search !== "" ? (
              <div className="emoticons-lists-list">
                <div className="emoticons-lists-list-info">
                  <p className="emoticons-lists-list-info-title">검색 결과</p>
                </div>
                <ul className="emoticons-lists-list-container">
                  {results.length === 0 ? (
                    <li className="emoticons-lists-list-item">
                      검색 결과가 없습니다.
                    </li>
                  ) : (
                    results.map((map) => (
                      <li className="emoticons-lists-list-item" key={map.codes}>
                        <p
                          className="emoticons-lists-list-item-icon"
                          title={map.name}
                          data-emoji={map.char}
                          data-emoji_name={map.name}
                          data-emoji_codes={map.codes}
                          onMouseEnter={(e) => getEmojiInfo(e)}
                          onMouseLeave={(e) => removeEmojiInfo(e)}
                          onClick={(e) => handleClickEmoji(e, map)}
                        >
                          {map.char}
                        </p>
                      </li>
                    ))
                  )}
                </ul>
              </div>
            ) : (
              // 검색어가 없는 경우
              <>
                {/* 최근 */}
                {recentArr.length !== 0 && (
                  <div className="emoticons-lists-list" id="recent">
                    <div className="emoticons-lists-list-info">
                      <p className="emoticons-lists-list-info-title">최근</p>
                      <p
                        className="emoticons-lists-list-info-delete"
                        onClick={() => setRecentArr([])}
                      >
                        모두 지우기
                      </p>
                    </div>
                    <ul className="emoticons-lists-list-container">
                      {recentArr.map((map) => (
                        <li className="emoticons-lists-list-item">
                          <p
                            className="emoticons-lists-list-item-icon"
                            title={map.name}
                            data-emoji={map.char}
                            data-emoji_name={map.name}
                            data-emoji_codes={map.codes}
                            onMouseEnter={(e) => getEmojiInfo(e)}
                            onMouseLeave={(e) => removeEmojiInfo(e)}
                            onClick={(e) => handleClickEmoji(e, map)}
                          >
                            {map.char}
                          </p>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                {/* 최근 이외의 목록 */}
                {listOfEmoji.map((emoji) => {
                  if (emoji.id === "recent") return;
                  return (
                    <div
                      className="emoticons-lists-list"
                      key={emoji.id}
                      id={emoji.id}
                    >
                      <div className="emoticons-lists-list-info">
                        <p className="emoticons-lists-list-info-title">
                          {emoji.title}
                        </p>
                      </div>
                      <ul
                        className="emoticons-lists-list-container"
                        key={emoji.title}
                      >
                        {emojis.map((map) => {
                          if (
                            emoji.id === "smile" &&
                            (map.group.includes("Smileys") ||
                              (map.group.includes("People") &&
                                (color !== "default"
                                  ? map.name.includes(color)
                                  : !map.name.includes("tone"))))
                          ) {
                            return (
                              <li
                                className="emoticons-lists-list-item"
                                key={map.codes}
                              >
                                <p
                                  className="emoticons-lists-list-item-icon"
                                  title={map.name}
                                  data-emoji={map.char}
                                  data-emoji_name={map.name}
                                  data-emoji_codes={map.codes}
                                  onMouseEnter={(e) => getEmojiInfo(e)}
                                  onMouseLeave={(e) => removeEmojiInfo(e)}
                                  onClick={(e) => handleClickEmoji(e, map)}
                                >
                                  {map.char}
                                </p>
                              </li>
                            );
                          } else if (
                            emoji.id === "animal" &&
                            map.group.includes("Animals")
                          ) {
                            return (
                              <li
                                className="emoticons-lists-list-item"
                                key={map.codes}
                              >
                                <p
                                  className="emoticons-lists-list-item-icon"
                                  title={map.name}
                                  data-emoji={map.char}
                                  data-emoji_name={map.name}
                                  data-emoji_codes={map.codes}
                                  onMouseEnter={(e) => getEmojiInfo(e)}
                                  onMouseLeave={(e) => removeEmojiInfo(e)}
                                  onClick={(e) => handleClickEmoji(e, map)}
                                >
                                  {map.char}
                                </p>
                              </li>
                            );
                          } else if (
                            emoji.id === "food" &&
                            map.group.includes("Food")
                          ) {
                            return (
                              <li
                                className="emoticons-lists-list-item"
                                key={map.codes}
                              >
                                <p
                                  className="emoticons-lists-list-item-icon"
                                  title={map.name}
                                  data-emoji={map.char}
                                  data-emoji_name={map.name}
                                  data-emoji_codes={map.codes}
                                  onMouseEnter={(e) => getEmojiInfo(e)}
                                  onMouseLeave={(e) => removeEmojiInfo(e)}
                                  onClick={(e) => handleClickEmoji(e, map)}
                                >
                                  {map.char}
                                </p>
                              </li>
                            );
                          } else if (
                            emoji.id === "activity" &&
                            map.group.includes("Activities")
                          ) {
                            return (
                              <li
                                className="emoticons-lists-list-item"
                                key={map.codes}
                              >
                                <p
                                  className="emoticons-lists-list-item-icon"
                                  title={map.name}
                                  data-emoji={map.char}
                                  data-emoji_name={map.name}
                                  data-emoji_codes={map.codes}
                                  onMouseEnter={(e) => getEmojiInfo(e)}
                                  onMouseLeave={(e) => removeEmojiInfo(e)}
                                  onClick={(e) => handleClickEmoji(e, map)}
                                >
                                  {map.char}
                                </p>
                              </li>
                            );
                          } else if (
                            emoji.id === "trip" &&
                            map.group.includes("Travel")
                          ) {
                            return (
                              <li
                                className="emoticons-lists-list-item"
                                key={map.codes}
                              >
                                <p
                                  className="emoticons-lists-list-item-icon"
                                  title={map.name}
                                  data-emoji={map.char}
                                  data-emoji_name={map.name}
                                  data-emoji_codes={map.codes}
                                  onMouseEnter={(e) => getEmojiInfo(e)}
                                  onMouseLeave={(e) => removeEmojiInfo(e)}
                                  onClick={(e) => handleClickEmoji(e, map)}
                                >
                                  {map.char}
                                </p>
                              </li>
                            );
                          } else if (
                            emoji.id === "thing" &&
                            map.group.includes("Objects")
                          ) {
                            return (
                              <li
                                className="emoticons-lists-list-item"
                                key={map.codes}
                              >
                                <p
                                  className="emoticons-lists-list-item-icon"
                                  title={map.name}
                                  data-emoji={map.char}
                                  data-emoji_name={map.name}
                                  data-emoji_codes={map.codes}
                                  onMouseEnter={(e) => getEmojiInfo(e)}
                                  onMouseLeave={(e) => removeEmojiInfo(e)}
                                  onClick={(e) => handleClickEmoji(e, map)}
                                >
                                  {map.char}
                                </p>
                              </li>
                            );
                          } else if (
                            emoji.id === "symbol" &&
                            map.group.includes("Symbols")
                          ) {
                            return (
                              <li
                                className="emoticons-lists-list-item"
                                key={map.codes}
                              >
                                <p
                                  className="emoticons-lists-list-item-icon"
                                  title={map.name}
                                  data-emoji={map.char}
                                  data-emoji_name={map.name}
                                  data-emoji_codes={map.codes}
                                  onMouseEnter={(e) => getEmojiInfo(e)}
                                  onMouseLeave={(e) => removeEmojiInfo(e)}
                                  onClick={(e) => handleClickEmoji(e, map)}
                                >
                                  {map.char}
                                </p>
                              </li>
                            );
                          } else if (
                            emoji.id === "flag" &&
                            map.group.includes("Flags")
                          ) {
                            return (
                              <li
                                className="emoticons-lists-list-item"
                                key={map.codes}
                              >
                                <p
                                  className="emoticons-lists-list-item-icon"
                                  title={map.name}
                                  data-emoji={map.char}
                                  data-emoji_name={map.name}
                                  data-emoji_codes={map.codes}
                                  onMouseEnter={(e) => getEmojiInfo(e)}
                                  onMouseLeave={(e) => removeEmojiInfo(e)}
                                  onClick={(e) => handleClickEmoji(e, map)}
                                >
                                  {map.char}
                                </p>
                              </li>
                            );
                          }
                        })}
                      </ul>
                    </div>
                  );
                })}
              </>
            )}
          </section>
        </div>
      </div>
      {/* 이모지 스킨 색상 선택 */}
      <section className="emoticons-select">
        <span className="emoticons-select-emoji">{selectedEmoji.emoji}</span>
        <span className="emoticons-select-emoji-name">
          {selectedEmoji.name}
        </span>
        <span className="emoticons-select-emoji-color">
          <ul
            className={`emoji-select-container${openContainer ? " open" : ""}`}
          >
            {colorArray.map((pick) => (
              <li
                key={pick.name}
                className={`emoji-color-wrapper`}
                style={{
                  backgroundColor:
                    isHovering === pick.name ? `${pick.hover}` : "transparent",
                }}
                onMouseEnter={() => setIsHovering(pick.name)}
                onMouseLeave={() => setIsHovering("")}
                onClick={() => handleSelectColor(pick.name)}
              >
                <p
                  className={`emoji-color-item${
                    pick.name === color ? " selected" : ""
                  } ${pick.name !== color && !openContainer ? " hidden" : ""}`}
                  style={{ backgroundColor: `${pick.color}` }}
                />
                {pick.name === color && (
                  <LuCheck className="emoji-color-item-check icon" />
                )}
              </li>
            ))}
          </ul>
        </span>
      </section>
    </div>
  );
};

export default Emoticons;
