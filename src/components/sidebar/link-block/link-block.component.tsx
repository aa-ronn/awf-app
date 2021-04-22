import { FC } from "react";
import { useLocation, useHistory } from "react-router-dom";
import "./link-block.styles.scss";

interface ILinkBlock {
  text: string;
  urlPath: string;
}

export const LinkBlock: FC<ILinkBlock> = ({ text, urlPath }) => {
  const location = useLocation();
  const history = useHistory();

  return (
    <div
      className={`link-block-component ${
        location.pathname === urlPath ? "selected" : "not-selected"
      }`}
      onClick={() => history.push(urlPath)}
    >
      <p>{text}</p>
    </div>
  );
};
