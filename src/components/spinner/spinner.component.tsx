import { FC } from "react";

import "./spinner.styles.scss";

export const Spinner: FC<{ isLoading: boolean; emoji?: string }> = ({
  isLoading,
  emoji = "🐵",
}) => {
  return (
    <span className={`spinner ${isLoading && "spin"}`}>
      {isLoading && emoji}
    </span>
  );
};
