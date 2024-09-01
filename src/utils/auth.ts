import { BirthType, UserSignupType, UserSignupValidType } from "../types/auth";
import { debounce } from "./debounce";

// NormalInput.tsx
export const handleClick = (
  field: string,
  setFocused: React.Dispatch<React.SetStateAction<string>>,
  ref: React.RefObject<HTMLInputElement>
) => {
  setFocused(field);
  if (!ref.current) return;
  ref.current.focus();
};

// input typing
const handleInputChange = (
  e: React.ChangeEvent<HTMLInputElement>,
  setMessages: React.Dispatch<React.SetStateAction<string>>,
  setIsValid: React.Dispatch<React.SetStateAction<UserSignupValidType>>,
  setUserSignup: React.Dispatch<React.SetStateAction<UserSignupType>>
) => {
  const { id, value } = e.target;

  const messages = [];

  // 이름 유효성
  if (id === "username") {
    if (value.length > 50) {
      return;
    }
    // 형식에 맞는 경우
    setMessages("");
    setIsValid((prev) => ({
      ...prev,
      [id]: true,
    }));
  }

  // 이메일 유효성
  if (id === "email") {
    // 형식에 맞지 않는 경우
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      messages.push(`이메일 형식이 맞지 않습니다.`);
      setMessages(messages.join(" "));
      setIsValid((prev) => ({
        ...prev,
        [id]: false,
      }));
    } else {
      // 형식에 맞는 경우
      setMessages("");
      setIsValid((prev) => ({
        ...prev,
        [id]: true,
      }));
    }
  }

  const authCode = "1234";
  if (id === "emailAuth") {
    if (value !== authCode) {
      messages.push(`잘못된 인증코드를 입력하셨습니다.`);
      setMessages(messages.join(" "));
      setIsValid((prev) => ({
        ...prev,
        [id]: false,
      }));
    } else {
      setMessages(messages.join(" "));
      setIsValid((prev) => ({
        ...prev,
        [id]: true,
      }));
    }
  }

  // userSignup에 추가\
  setUserSignup((prev) => ({
    ...prev,
    [id]: value,
  }));
};

// debounce를 이용한 타이핑 렌더링 줄이기
export const debouncedInputChange = debounce<typeof handleInputChange>(
  (e, setMessages, setIsValid, setUserSignup) =>
    handleInputChange(e, setMessages, setIsValid, setUserSignup),
  500
);

// ListInput.tsx
// dropdown 여닫기
export const handleOpenDropdown = (
  field: string,
  openDropdown: boolean,
  setOpenDropdown: (value: boolean) => void,
  setFocused: (value: string) => void,
  ref: React.RefObject<HTMLInputElement>
) => {
  setOpenDropdown(!openDropdown);
  setFocused(field);
  ref.current?.focus();
};

// 리스트에서 아이템 선택하기
export const handleSelectItem = (
  e: React.MouseEvent<HTMLLIElement, MouseEvent>,
  index: number,
  field: string,
  unit: string,
  array: any[],
  ref: React.RefObject<HTMLInputElement>,
  openDropdown: boolean,
  setIndex: React.Dispatch<React.SetStateAction<number>>,
  setBirth: React.Dispatch<React.SetStateAction<BirthType>>,
  setOpenDropdown: (value: boolean) => void
) => {
  e.stopPropagation();

  setIndex(index);

  setBirth((prev) => ({
    ...prev,
    [field]: array[index],
  }));

  if (!ref.current) return;
  ref.current.value = array[index] + unit;

  setOpenDropdown(!openDropdown);
};

// tab 이동으로 focus 주기
export const handleFocus = (
  field: string,
  setFocused: (value: string) => void,
  ref: React.RefObject<HTMLInputElement>,
  array: any[],
  index: number,
  unit: string
) => {
  setFocused(field);

  // 포커스를 주면 input 박스에 값 표시하기
  if (!ref.current) return;
  ref.current.value = array[index] + unit;
};

// 키로 목록 이동
export const handleKeyDown = (
  e: React.KeyboardEvent<HTMLInputElement>,
  ref: React.RefObject<HTMLInputElement>,
  setOpenDropdown: (value: boolean) => void,
  openDropdown: boolean,
  index: number,
  array: any[],
  unit: string,
  field: string,
  setIndex: (value: number) => void,
  setBirth: React.Dispatch<React.SetStateAction<BirthType>>
) => {
  e.stopPropagation();
  if (!ref.current) return;

  if (e.key === "Enter") {
    setOpenDropdown(!openDropdown);
  }

  if (e.key === "Escape") {
    setOpenDropdown(false);
  }

  let newIndex = index;
  if (e.key === "ArrowDown") {
    newIndex = index + 1;
    if (newIndex > array.length - 1) return; // 목록 갯수보다 큰 경우
    setIndex(newIndex);
    setBirth((prev) => ({
      ...prev,
      [field]: array[newIndex],
    }));
  }

  if (e.key === "ArrowUp") {
    newIndex = index - 1;
    if (newIndex < 0) return; // 0보다 작은 경우
    setIndex(newIndex);
    setBirth((prev) => ({
      ...prev,
      [field]: array[newIndex],
    }));
  }

  ref.current.value = array[newIndex] + unit;
};
