import { SignupInfoType, UserSignupType } from "../types/auth.types";

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

// 인증 코드 확인
export const verifyAuthCodeAPI = async (
  authCode: string,
  userId?: string,
  email?: string
) => {
  if (!userId && !email) {
    throw { message: "이메일 혹은 사용자 아이디가 없습니다." };
  }
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
export const requestAuthCode = async (userId?: string, email?: string) => {
  if (!userId && !email) {
    throw { message: "이메일 혹은 사용자 아이디가 없습니다." };
  }
  try {
    const response = await fetch(`${baseUrl}/auth/requestAuthCode`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId, email }),
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

// 로그인 요청
export const loginAPI = async (
  password: string,
  userId?: string,
  email?: string
) => {
  try {
    const response = await fetch(`${baseUrl}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId, email, password }),
    });

    if (!response.ok) {
      const errorData = await response.json();

      throw errorData;
    }

    const data = await response.json();

    return data;
  } catch (error) {
    throw error;
  }
};

// 구글로 회원가입
export const googleOauthSignup = async (signupInfo: SignupInfoType) => {
  try {
    const response = await fetch(`${baseUrl}/auth/signup/google`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(signupInfo),
    });

    if (!response.ok) {
      const errorData = await response.json();

      throw errorData;
    }

    const data = await response.json();

    return data;
  } catch (error) {
    throw error;
  }
};

// 이메일에 소셜 통합히기
export const integrateSocialAPI = async (email: string, social: string) => {
  try {
    const response = await fetch(`${baseUrl}/auth/signup/integrate`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        social,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();

      throw errorData;
    }

    const data = await response.json();

    return data;
  } catch (error) {
    throw error;
  }
};
