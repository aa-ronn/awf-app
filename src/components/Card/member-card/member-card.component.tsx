import { MouseEventHandler, FC } from "react";
import { faMinus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./member-card.styles.scss";

interface IMemberCard {
  email: string;
  firstName: string;
  lastName: string;
  cardClick: MouseEventHandler<HTMLButtonElement>;
}
export const MemberCard: FC<IMemberCard> = ({
  email,
  firstName,
  lastName,
  cardClick,
}) => {
  return (
    <div className="member-card-component-wrapper">
      <div className="member-card-info">
        <div className="member-name">{firstName + " " + lastName}</div>
        <div className="member-email">{email}</div>
      </div>

      <div className="card-button-wrapper">
        <button className="delete" onClick={cardClick}>
          <FontAwesomeIcon icon={faMinus} />
        </button>
      </div>
    </div>
  );
};
