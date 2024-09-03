import { UserSignupType } from "../types/auth";

const baseUrl = import.meta.env.VITE_BASE_URL;

export const sendAuthEmailAPI = async (userSignup: UserSignupType) => {
  try {
    const response = await fetch(`${baseUrl}/auth/sendAuthEmail`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userSignup),
    });

    const data = await response.json();

    return data;
  } catch (error) {}
};

// 이메일 중복 체크
export const checkEmailDuplicateAPI = async (email: string) => {
  try {
    const response = await fetch(`${baseUrl}/auth/checkExistingEmail`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    });

    const data = await response.json();

    return data;
  } catch (error) {
    throw error;
  }
};

// 아이디 중복 체크
export const checkUserIdDuplicateAPI = async (userId: string) => {
  try {
    const response = await fetch(`${baseUrl}/auth/checkExistingUserId`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId }),
    });

    const data = await response.json();

    return data;
  } catch (error) {
    throw error;
  }
};
