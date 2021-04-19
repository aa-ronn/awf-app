import { FC } from "react";

export const Spinner: FC<{ isLoading: boolean; emoji?: string }> = ({
  isLoading,
  emoji = "🐵",
}) => {
  return <div className="spinner">{isLoading ? emoji : ""}</div>;
};
