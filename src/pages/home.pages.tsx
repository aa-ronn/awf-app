import { useContext } from "react";
import { StoreContext } from "../context/store/store.context";
import "./home.styles.scss";

export const HomePage = () => {
  const { state, dispatch } = useContext(StoreContext);
  return (
    <div className="home-page">
      <div className="content"></div>
    </div>
  );
};
