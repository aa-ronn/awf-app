import { FC, createContext, useCallback } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ToastContextType } from "../../types/toast-context";

import "./toast.styles.scss";

const ToastContext = createContext<ToastContextType>({
  notify: async (message: string, type?: "default" | "error") => null,
});

const ToastProvider: FC = ({ children }) => {
  /**
   * Shows a toast with the provided values.
   * @param message The message to be displayed in the toast.
   * @param type the type of toast to show "default" or "error"
   * defaults to "default".
   */
  const notify = useCallback((message: string, type?: "default" | "error") => {
    if (!type) {
      type = "default";
    }
    if (type === "default") {
      toast(message);
    } else if ("error") {
      toast.error(message);
    }
  }, []);

  return (
    <ToastContext.Provider
      value={{
        notify,
      }}
    >
      <ToastContainer />
      {children}
    </ToastContext.Provider>
  );
};

export { ToastProvider, ToastContext };
