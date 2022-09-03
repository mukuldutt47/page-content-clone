import React, { useContext } from "react";
import { FormContext } from "../../App";

export default function Modal({ modal }) {
  const formContext = useContext(FormContext);
  return (
    (modal?.typeId && (
      <div
        className="w-full h-full left-0 top-0 z-10 bg-gray-200 bg-opacity-50 fixed"
        onClick={(e) => {
          [...e.target?.classList]?.includes?.("modal-content") &&
            formContext?.setModal();
        }}
      >
        <div className="grid h-screen place-items-center modal-content">
          {modal.data}
        </div>
      </div>
    )) ||
    null
  );
}
