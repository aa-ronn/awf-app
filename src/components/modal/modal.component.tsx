// File: Modal.js
// Description: Modal component

import { FC } from "react";
import "./modal.scss";

interface IModal {
  setModalOpen: (isOpen: boolean) => void;
}
export const Modal: FC<IModal> = ({ children, setModalOpen }) => {
  //   function backdropClick(e) {
  //     if (e.target.classList.contains("backdrop")) {
  //       setModalOpen(false);
  //     }
  //   }

  return (
    <div className="backdrop">
      <div className="modal-content">
        <div className="modal-head">
          <p onClick={() => setModalOpen(false)}>X</p>
        </div>
        {children}
      </div>
    </div>
  );
};
