import {
  checkEmailDuplicateAPI,
  checkUserIdDuplicateAPI,
} from "../apis/auth.apis";
import { fetchAddressByLatLng, fetchIPAPI } from "../apis/test.apis";
import { genderList } from "../pages/Auth/data/authData";
import {
  BirthType,
  SignupInfoType,
  UserSignupType,
  UserSignupValidType,
} from "../types/auth.types";
import { debounce } from "./debounce";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { app } from "../../firebase";

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
const handleInputChange = async (
  e: React.ChangeEvent<HTMLInputElement>,
  setMessages: React.Dispatch<React.SetStateAction<string>>,
  setIsValid: React.Dispatch<React.SetStateAction<UserSignupValidType>>,
  setUserSignup: React.Dispatch<React.SetStateAction<UserSignupType>>,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
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
      setLoading(true);
      // 형식에 맞는 경우
      await checkEmailDuplicateAPI(value)
        .then((res) => {
          console.log(res);
          setMessages(res.message);
          setIsValid((prev) => ({
            ...prev,
            [id]: true,
          }));
        })
        .catch((err) => {
          console.log(err);
          setMessages(err.message);
          setIsValid((prev) => ({
            ...prev,
            [id]: false,
          }));
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }

  if (id === "emailAuth") {
    setIsValid((prev) => ({
      ...prev,
      [id]: true,
    }));
  }

  if (id === "password") {
    // 조건 확인
    if (
      value.length < 8 || // 비밀번호 길이 체크
      !/[A-Za-z]/.test(value) || // 영문자 체크
      !/\d/.test(value) || // 숫자 체크
      !/[@$!%*#?&]/.test(value) // 특수문자 체크
    ) {
      if (value.length < 8) {
        messages.push("비밀번호는 최소 8자 이상이어야 합니다.");
      }
      if (!/[A-Za-z]/.test(value)) {
        messages.push("영문자가 적어도 하나 포함되어야 합니다.");
      }
      if (!/\d/.test(value)) {
        messages.push("숫자가 적어도 하나 포함되어야 합니다.");
      }
      if (!/[@$!%*#?&]/.test(value)) {
        messages.push("특수문자 중 적어도 하나가 포함되어야 합니다.");
      }

      setMessages(messages.join(" "));
      setIsValid((prev) => ({
        ...prev,
        [id]: false,
      }));
    } else {
      setMessages("");
      setIsValid((prev) => ({
        ...prev,
        [id]: true,
      }));
    }
  }

  if (id === "userId") {
    if (!/^(?=.*[a-z])[a-z0-9]{4,16}$/.test(value)) {
      if (value.length < 4 || value.length > 16) {
        messages.push("아이디는 4자 이상 16자 이하로 정해주세요");
      }

      if (/[^a-z0-9]/.test(value)) {
        messages.push("아이디는 영문 소문자와 숫자의 조합이어야 합니다.");
      }

      if (/^\d+$/.test(value)) {
        messages.push("영문 소문자는 적어도 한 글자 이상 포함되어야 합니다.");
      }

      setMessages(messages.join(" "));
      setIsValid((prev) => ({
        ...prev,
        [id]: false,
      }));
    } else {
      setLoading(true);
      await checkUserIdDuplicateAPI(value)
        .then((res) => {
          console.log(res);
          setMessages(res.message);
          setIsValid((prev) => ({
            ...prev,
            [id]: true,
          }));
        })
        .catch((err) => {
          setMessages(err.message);
          setIsValid((prev) => ({
            ...prev,
            [id]: false,
          }));
        })
        .finally(() => setLoading(false));
    }
  }

  // userSignup에 추가
  setUserSignup((prev) => ({
    ...prev,
    [id]: value,
  }));
};

// debounce를 이용한 타이핑 렌더링 줄이기
export const debouncedInputChange = debounce<typeof handleInputChange>(
  (e, setMessages, setIsValid, setUserSignup, setLoading) =>
    handleInputChange(e, setMessages, setIsValid, setUserSignup, setLoading),
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

// gender 키로 이동
export const handleKeyDownObject = (
  e: React.KeyboardEvent<HTMLInputElement>,
  ref: React.RefObject<HTMLInputElement>,
  openDropdown: boolean,
  setOpenDropdown: (value: boolean) => void,
  field: string,
  index: number,
  setIndex: (value: number) => void,
  array: any[],
  setUserSignup: React.Dispatch<React.SetStateAction<UserSignupType>>
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
    const value = array[newIndex].value;

    setIndex(newIndex);
    setUserSignup((prev) => ({
      ...prev,
      [field]: value,
    }));
  }

  if (e.key === "ArrowUp") {
    newIndex = index - 1;
    if (newIndex < 0) return; // 0보다 작은 경우
    const value = array[newIndex].value;
    setIndex(newIndex);
    setUserSignup((prev) => ({
      ...prev,
      [field]: value,
    }));
  }

  ref.current.value = array[newIndex].name;
};

// 키로 목록 이동
export const handleKeyDown = (
  e: React.KeyboardEvent<HTMLInputElement>,
  ref: React.RefObject<HTMLInputElement>,
  openDropdown: boolean,
  setOpenDropdown: (value: boolean) => void,
  field: string,
  index: number,
  setIndex: (value: number) => void,
  setBirth: React.Dispatch<React.SetStateAction<BirthType>>,
  array: any[],
  unit: string
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
    setBirth &&
      array &&
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

//
export const handleNext = (next: string, setStage: (value: string) => void) => {
  setStage(next);
};

//EmailSignup.tsx
// 성공적으로 위도 경도를 불러왔을 때
const successCallback = async (
  position: GeolocationPosition,
  setInfo: React.Dispatch<React.SetStateAction<any>>
) => {
  const lat = position.coords.latitude;
  const lng = position.coords.longitude;

  try {
    // 위도 경도로 주소 알아내기
    const location = await fetchAddressByLatLng(lat, lng);
    setInfo((prev: any) => ({
      ...prev,
      location,
    }));
  } catch (error) {
    console.error("Failed to fetch address:", error);
  }
};

// 위도 경도를 불러오는 것을 실패했을 때
const errorCallback = (error: GeolocationPositionError) => {
  console.error("Geolocation error:", error);
};

// 위도 경도를 알아내는 함수
export const getUserLocation = (
  setInfo: React.Dispatch<React.SetStateAction<any>>
) => {
  // 위치 정보 요청
  navigator.geolocation.getCurrentPosition(
    (position) => successCallback(position, setInfo),
    errorCallback,
    {
      enableHighAccuracy: true,
      timeout: 1000, // 10초 후에 타임아웃
      maximumAge: 0, // 캐시된 위치 정보를 사용하지 않음
    }
  );
};

// ip를 알아내는 함수
export const fetchIPInfo = async (
  setInfo: React.Dispatch<React.SetStateAction<any>>
) => {
  try {
    const res = await fetchIPAPI();
    const ip = res;
    setInfo((prev: any) => ({
      ...prev,
      ip,
    }));
  } catch (error) {
    console.error("Failed to fetch IP info:", error);
  }
};

// 성별 표기하기
export const showGenderName = (value: string) => {
  const found = genderList.find((gender) => gender.value === value);

  return found ? found.name : "";
};

// gender input 포커스 주기
export const getFocused = (
  field: string,
  openDropdown: boolean,
  setOpenDropdown: React.Dispatch<React.SetStateAction<boolean>>,
  setFocused: React.Dispatch<React.SetStateAction<string>>
) => {
  setFocused(field);
  setOpenDropdown(!openDropdown);
};

// 성별 선택하기
export const handleChooseGender = (
  e: React.MouseEvent<HTMLLIElement, MouseEvent>,
  ref: React.RefObject<HTMLInputElement>,
  field: string,
  setUserSignup: React.Dispatch<React.SetStateAction<UserSignupType>>,
  setOpenDropdown: React.Dispatch<React.SetStateAction<boolean>>
) => {
  if (!ref.current) return;
  const gender = e.currentTarget.id;

  if (!gender) return;

  ref.current.value = showGenderName(gender);

  setUserSignup((prev) => ({
    ...prev,
    [field]: gender,
  }));

  setOpenDropdown(false);
};

// Login.tsx
// 입력 정보가 userId 인지 email 인지 구별하기
export const classifyField = (value: string) => {
  let field = "wrong";

  if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
    field = "email";
  } else if (/^(?=.*[a-z])[a-z0-9]{4,16}$/.test(value)) {
    field = "userId";
  }

  return field;
};

// NormalLogin.tsx
export const validatePassword = (value: string) => {
  const isValidPassword =
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,30}$/.test(
      value
    );

  return isValidPassword;
};

export const validAuthCode = (value: string) => {
  const isValidAuthCode = /^\d{6}$/.test(value);

  return isValidAuthCode;
};

export const validUserId = (value: string, messages: string[]) => {
  if (!/^(?=.*[a-z])[a-z0-9]{4,16}$/.test(value)) {
    if (value.length < 4 || value.length > 16) {
      messages.push("아이디는 4자 이상 16자 이하로 정해주세요");
    }

    if (/[^a-z0-9]/.test(value)) {
      messages.push("아이디는 영문 소문자와 숫자의 조합이어야 합니다.");
    }

    if (/^\d+$/.test(value)) {
      messages.push("영문 소문자는 적어도 한 글자 이상 포함되어야 합니다.");
    }

    return false;
  }

  return true;
};

// 구글 계정
export const handleGoogleClick = async (
  setSignupInfo: React.Dispatch<React.SetStateAction<SignupInfoType>>,
  setDuplicate: React.Dispatch<React.SetStateAction<string>>,
  setOpenGoogleSignup: React.Dispatch<React.SetStateAction<boolean>>,
  setOpenLogin: React.Dispatch<React.SetStateAction<boolean>>
) => {
  try {
    const provider = new GoogleAuthProvider();
    const auth = getAuth(app);
    const result = await signInWithPopup(auth, provider);
    const user = result.user;

    const username = user.displayName as string;
    const email = user.email as string;
    const userPic = user.photoURL as string;
    const userId = user.uid as string;

    setSignupInfo((prev) => ({
      ...prev,
      username: username,
      email: email,
      userPic: userPic,
      userId: userId,
    }));

    await checkEmailDuplicateAPI(email, "google")
      .then((res) => {
        console.log(res);
        setOpenGoogleSignup(true);
      })
      .catch((err) => {
        console.log(err.message);
        if (err.message === "이미 존재하는 이메일입니다.") {
          setDuplicate("duplicate");
          setOpenGoogleSignup(true);
        }
        if (err.message === "이미 등록된 소셜 계정입니다.") {
          setOpenGoogleSignup(false);
          setOpenLogin(true);
        }
      });
  } catch (error) {
    console.log("로그인 실패", error);
  }
};
