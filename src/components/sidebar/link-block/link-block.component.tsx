import { FC, useContext } from "react";
import { useLocation, useHistory } from "react-router-dom";
import { StoreContext } from "../../../context/store/store.context";
import "./link-block.styles.scss";

interface ILinkBlock {
  text: string;
  urlPath: string;
}

export const LinkBlock: FC<ILinkBlock> = ({ text, urlPath }) => {
  const location = useLocation();
  const history = useHistory();
  const { assignedTasks } = useContext(StoreContext);

  return (
    <div
      className={`link-block-component ${
        location.pathname === urlPath ? "selected" : "not-selected"
      } `}
      onClick={() => history.push(urlPath)}
    >
      <p>{text}</p>
      {text === "📖  Tasks" && assignedTasks && assignedTasks.length > 0 && (
        <div className="floating-todo-number-position">
          <div className="floating-todo-number">
            <span>{assignedTasks?.length}</span>
          </div>
        </div>
      )}
    </div>
  );
};
