import { FC, FormEvent } from "react";
import "./form.styles.scss";

interface IForm {
  handleSubmit: (event: FormEvent<HTMLFormElement>) => void;
  title: string;
  buttonLabel: string;
  emoji?: string;
  [x: string]: any;
}

export const Form: FC<IForm> = ({
  children,
  handleSubmit,
  title,
  buttonLabel,
  emoji,
}) => {
  return (
    <div className="form-component-wrapper">
      <h1>
        {title} {emoji}
      </h1>
      <form onSubmit={handleSubmit}>
        <div className="children">{children}</div>
        <div className="submit-button">
          <button type="submit">{buttonLabel}</button>
        </div>
      </form>
    </div>
  );
};
