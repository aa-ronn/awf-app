import { FC, FormEvent } from "react";
import { Spinner } from "../spinner/spinner.component";
import "./form.styles.scss";

interface IForm {
  handleSubmit: (event: FormEvent<HTMLFormElement>) => void;
  title: string;
  projectName?: string;
  buttonLabel: string;
  isLoading?: boolean;
  emoji?: string;
  [x: string]: any;
}

export const Form: FC<IForm> = ({
  children,
  handleSubmit,
  isLoading = false,
  title,
  projectName,
  buttonLabel,
  emoji,
}) => {
  return (
    <div className="form-component-wrapper">
      <h1>
        {title} {emoji}
      </h1>
      {projectName &&
        <div className="task-modal-project-name">{"Project: " + projectName}</div>
      }
      <form onSubmit={(e) => handleSubmit(e)}>
        <div className="children">{children}</div>
        <div className="submit-button">
          <button type="submit">
            {!isLoading ? buttonLabel : "Loading..."}{" "}
            <Spinner isLoading={isLoading} />
          </button>
        </div>
      </form>
    </div>
  );
};
