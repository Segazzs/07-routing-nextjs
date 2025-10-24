"use client";

import { useEffect } from "react";
import css from "./ModalNote.module.css";

type Props = {
  children: React.ReactNode;
  close: () => void;
};

const Modal = ({ children, close }: Props) => {
  const handleBackDropClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      close();
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        close();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [close]);

  return (
    <div className={css.backdrop} onClick={handleBackDropClick}>
      <div className={css.modal}>{children}</div>
    </div>
  );
};

export default Modal;
