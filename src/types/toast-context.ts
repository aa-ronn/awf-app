export type ToastContextType = {
  notify: (message: string, type?: "default" | "error") => void;
};
