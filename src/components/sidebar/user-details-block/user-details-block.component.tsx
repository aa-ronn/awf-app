import { useContext } from "react";
import { AuthContext } from "../../../context/auth/auth.context";
import "./user-details-block.styles.scss";

export const UserDetailsBlock = () => {
  const { user } = useContext(AuthContext);

  return (
    <div className="user-details-block-component">
      <div className="avatar">
        <p>{user ? user.firstName[0] + user.lastName[0] : ""}</p>
      </div>
      <div className="user-details">
        <p className="name">Aaron Perry</p>
        <p className="email">aaron@email.com</p>
        {/* <p className="profile-link">view profile</p> */}
      </div>
    </div>
  );
};
