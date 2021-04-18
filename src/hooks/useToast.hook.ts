import { useState } from "react";

export const useToast = () => {
  const [toastIsShowing, setToastIsShowing] = useState(false);
  const [message, setMessage] = useState("Default Message");
  const [severity, setSeverity] = useState(0);
  const [timer, setTimer] = useState<NodeJS.Timeout | null>(null);

  /**
   * Toggle the toast open and close. If already open the toast will be
   * closed and re-opened.
   */
  const toggleToast = () => {
    if (toastIsShowing) {
      setToastIsShowing(false);
      setToastIsShowing(true);

      if (timer) {
        clearTimeout(timer);
      }
      setTimer(setTimeout(() => setToastIsShowing(false), 8000));
    } else {
      setToastIsShowing(true);
      if (timer) {
        clearTimeout(timer);
      }
      setTimer(setTimeout(() => setToastIsShowing(false), 8000));
    }
  };

  /**
   * Hides the toast regardless of open state and ends activer timer.
   */
  const forceHideToast = () => {
    if (timer) {
      clearTimeout(timer);
      setTimer(null);
    }
    setToastIsShowing(false);
  };

  /**
   * Sets the message and flag color of the modal.
   * @param message the message to display in the modal
   * @param severity 0 or 1, blue or red
   */
  const setContets = (message: string, severity: number = 0) => {
    if (message) {
      setMessage(message);
    }

    if (severity) {
      if (severity <= 1) {
        setSeverity(severity);
      } else {
        setSeverity(0);
      }
    } else {
      setSeverity(0);
    }
  };

  return {
    message,
    severity,
    toastIsShowing,
    setContets,
    toggleToast,
    forceHideToast,
  };
};

export default useToast;
