import { FC, useContext } from "react";
import { AuthContext } from "../../context/auth/auth.context";
import "./header.styles.scss";

export const Header: FC<{ title: string }> = ({ title }) => {
  const { user, signOut } = useContext(AuthContext);
  return (
    <div className="header-component">
      <div className="left-content">
        <h1>{title}</h1>
      </div>

      <div className="right-content">
        <div className="user-details">Hey, {user?.firstName}!</div>
        <button onClick={signOut}>
          <div>Sign Out </div>
        </button>
      </div>
    </div>
  );
};
