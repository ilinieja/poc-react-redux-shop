import { PropsWithChildren } from "react";
import { createPortal } from "react-dom";
import { useNavigate } from "react-router-dom";

import styles from "./Modal.module.css";

export interface ModalProps {
  onClose: () => void;
}

export function Modal({ children, onClose }: PropsWithChildren<ModalProps>) {
  return createPortal(
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <button className={styles.closeButton} onClick={onClose}>
          <span className="material-symbols-outlined">close</span>
        </button>
        {children}
      </div>
    </div>,
    document.getElementById("modal_root")!
  );
}
