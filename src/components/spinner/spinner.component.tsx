import { FC } from "react";

export const Spinner: FC<{ isLoading: boolean; emoji?: string }> = ({
  isLoading,
  emoji = "🐵",
}) => {
  return (
    <div className="spinner-wrapper">
      <span className="spinner">{isLoading ? emoji : ""}</span>
    </div>
  );
};
