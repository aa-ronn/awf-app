import { MouseEventHandler, FC, useContext } from "react";
import { StoreContext } from "../../../context/store/store.context";
import { faMinus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./member-card.styles.scss";

interface IMemberCard {
  email: string;
  firstName: string;
  lastName: string;
}
export const MemberCard: FC<IMemberCard> = ({ email, firstName, lastName }) => {
  return (
    <div className="member-card-component-wrapper">
      <div className="member-card-info">
        <div className="member-name">{firstName + " " + lastName}</div>
        <div className="member-email">{email}</div>
      </div>

      <div className="card-button-wrapper">
        <button className="delete">
          <FontAwesomeIcon icon={faMinus} />
        </button>
      </div>
    </div>
  );
};
