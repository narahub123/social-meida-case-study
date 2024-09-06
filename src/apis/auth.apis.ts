import { UserSignupType } from "../types/authTypes";

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

export const verifyAuthCodeAPI = async (
  authCode: string,
  userId?: string,
  email?: string
) => {
  try {
    const response = await fetch(
      `${baseUrl}/auth/verifyAuthCode?authCode=${authCode}&userId=${userId}&email=${email}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    console.log(response);

    if (!response.ok) {
      const errorData = await response.json();

      throw errorData;
    }

    const success = response.status === 200;

    return success;
  } catch (error) {
    throw error;
  }
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

// 인증 코드 재요청
export const requestAuthCode = async (userId: string) => {
  try {
    const response = await fetch(`${baseUrl}/auth/requestAuthCode`, {
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
