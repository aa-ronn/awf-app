import { useContext } from "react";
import { AuthContext } from "../../context/auth/auth.context";
import "./home.styles.scss";

export const HomePage = () => {
  const { user } = useContext(AuthContext);
  return (
    <div className="home-page">
      <div className="content"></div>
    </div>
  );
};
