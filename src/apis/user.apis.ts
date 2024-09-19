// 유저 정보 가져오기
const baseUrl = import.meta.env.VITE_BASE_URL;
export const getUserInfo = async () => {
  const response = await fetch(`${baseUrl}/fetchUserInfo`, {
    method: "GET",
    credentials: "include",
  });

  if (!response.ok) {
    const errorData = await response.json();

    throw new Error(errorData.message);
  }

  const data = await response.json();

  return data;
};
