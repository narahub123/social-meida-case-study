import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

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
  return <div className="home">Home</div>;
};

export default Home;
