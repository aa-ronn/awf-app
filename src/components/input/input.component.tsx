import { ChangeEvent, FC, Fragment } from "react";
import "./input.styles.scss";

interface IInput {
  handleChange: (
    event:
      | ChangeEvent<HTMLInputElement>
      | ChangeEvent<HTMLSelectElement>
      | ChangeEvent<HTMLTextAreaElement>
  ) => void;
  label: string;
  type: string;
  emoji?: string;
  [x: string]: any;
}

export const Input: FC<IInput> = ({
  handleChange,
  label,
  type,
  emoji,
  ...otherProps
}) => {
  return (
    <Fragment>
      <div className="input-component-wrapper">
        <label>
          <p>
            {emoji} {label}
          </p>
          <input type={type} {...otherProps} onChange={handleChange} />
        </label>
      </div>
    </Fragment>
  );
};
