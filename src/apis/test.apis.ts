const api_key = import.meta.env.VITE_W_WORLD_API_KEY;

// 위도 경도로 주소 가져오기
export const fetchAddressByLatLng = async (lat: number, lng: number) => {
  try {
    const response = await fetch(
      `/api/req/address?service=address&request=getAddress&version=2.0&crs=epsg:4326&point=${lng},${lat}&type=both&zipcode=true&simple=false&key=${api_key}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const data = await response.json();

    const address = data.response.result[0].text;

    return address;
  } catch (error) {
    console.log(error);

    throw error;
  }
};

// ip 주소 알아내기
export const fetchIPAPI = async () => {
  try {
    const response = await fetch(`https://api64.ipify.org?format=json`);

    if (!response.ok) {
      // HTTP 상태 코드가 200이 아닐 경우 에러 처리
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    const ip = data.ip;

    return ip;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
