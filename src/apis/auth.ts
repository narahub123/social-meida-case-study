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
