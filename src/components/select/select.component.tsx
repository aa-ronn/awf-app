import { ChangeEvent, FC, Fragment } from "react";
import "./select.styles.scss";

// For creating a drop down with a label
interface ISelect {
  handleChange: (
    event:
      | ChangeEvent<HTMLInputElement>
      | ChangeEvent<HTMLSelectElement>
      | ChangeEvent<HTMLTextAreaElement>
  ) => void;
  label: string;
  list: { key: any; value: any }[] | undefined;
}

export const Select: FC<ISelect> = ({ handleChange, label, list }) => {
  return (
    <>
      <div className="select-component-wrapper">
        <label>
          <p>{label}</p>
          <select name="selectOption" onChange={handleChange}>
            {list &&
              list.map((item, index) => {
                return <option key={index} value={item.value}>{item.key}</option>;
              })}
          </select>
        </label>
      </div>
    </>
  );
};
