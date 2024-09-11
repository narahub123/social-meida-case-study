import "./home.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  // 탭 상태 : 추천, 팔로잉 중
  const [tab, setTab] = useState("following");

  // 탭 변경
  const handleTab = (tab: string) => {
    setTab(tab);
  };

  useEffect(() => {
    const baseUrl = import.meta.env.VITE_BASE_URL;
    const fetchData = async () => {
      const response = await fetch(`${baseUrl}/test/enter`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      if (!response.ok) {
        if (response.status === 403 || response.status === 401) {
          navigate("/auth");
        }
      }

      const data = await response.json();

      return data;
    };

    fetchData();
  }, []);
  return (
    <div className="home">
      <div className="home-wrapper">
        <section className="home-tablist">
          <div className="home-tablist-wrapper">
            <div className="home-tablist-item">
              <p
                className={`home-tablist-item-text${
                  tab === "recommend" ? " active" : ""
                }`}
                onClick={() => handleTab("recommend")}
              >
                추천
              </p>
            </div>
            <div className="home-tablist-item">
              <p
                className={`home-tablist-item-text${
                  tab === "following" ? " active" : ""
                }`}
                onClick={() => handleTab("following")}
              >
                팔로우 중
              </p>
            </div>
          </div>
        </section>
        <section className="home-write">글쓰기</section>
        <section className="home-postlist">포스트 리스트</section>
      </div>
    </div>
  );
};

export default Home;
