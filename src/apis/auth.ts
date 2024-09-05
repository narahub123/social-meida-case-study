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

    if (!response.ok) {
      const errorData = await response.json();

      throw new Error(errorData.message);
    }

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

    if (!response.ok) {
      const errorData = await response.json();

      throw new Error(errorData.message);
    }

    const data = await response.json();

    return data;
  } catch (error) {
    throw error;
  }
};

// 회원 가입
export const signupAPI = async (userSignup: UserSignupType) => {
  try {
    const response = await fetch(`${baseUrl}/auth/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userSignup),
    });

    if (!response.ok) {
      const errorData = await response.json();

      throw new Error(errorData.message);
    }

    const success = response.status === 201;

    return success;
  } catch (error) {
    throw error;
  }
};
