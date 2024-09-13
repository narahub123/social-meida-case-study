export const createArrayFromZero = (num: number) => {
  return Array.from({ length: num }, (_, i) => i);
};

// 이모티콘
export const listOfEmoji = [
  {
    title: "최근",
    id: "recent",
    emoji: "🕑",
  },
  {
    title: "스마일링",
    id: "smile",
    emoji: "😀",
  },
  {
    title: "동물",
    id: "animal",
    emoji: "🐻",
  },
  {
    title: "음식",
    id: "food",
    emoji: "🍔",
  },
  {
    title: "활동",
    id: "activity",
    emoji: "⚽️",
  },
  {
    title: "여행 및 장소",
    id: "trip",
    emoji: "🚘",
  },
  {
    title: "사물",
    id: "thing",
    emoji: "💡",
  },
  {
    title: "기호",
    id: "symbol",
    emoji: "🔣",
  },
  {
    title: "깃발",
    id: "flag",
    emoji: "🚩",
  },
];

// 이모지 색상 선택
export const colorArray = [
  {
    name: "default",
    color: "rgb(255, 220, 93)",
    hover: "rgba(255, 220, 93, 0.3)",
    code: "",
  },
  {
    name: " light skin",
    color: "rgb(247, 222, 206)",
    hover: "rgba(247, 222, 206, 0.3)",
    code: "1F3FB",
  },
  {
    name: "medium-light skin",
    color: "rgb(243, 210, 162)",
    hover: "rgba(243, 210, 162, 0.3)",
    code: "1F3FC",
  },
  {
    name: "medium skin",
    color: "rgb(213, 171, 136)",
    hover: "rgba(213, 171, 136, 0.3)",
    code: "1F3FD",
  },
  {
    name: "medium-dark skin",
    color: "rgb(175, 126, 87)",
    hover: "rgba(175, 126, 87, 0.3)",
    code: "1F3FE",
  },
  {
    name: " dark skin",
    color: "rgb(124, 83, 62)",
    hover: "rgba(124, 83, 62, 0.3)",
    code: "1F3FF",
  },
];
