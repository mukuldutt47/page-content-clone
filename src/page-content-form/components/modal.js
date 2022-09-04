import React, { useContext, useEffect, useState } from "react";
import { FormContext } from "../../App";

export default function Modal({ modal }) {
  const formContext = useContext(FormContext);
  const [modals, setModals] = useState([]);
  useEffect(() => {
    if (modal?.typeId && modal.data) {
      setModals([...modals, modal.data]);
    }
  }, [modal?.typeId]);
  return modals.map((modal, index) => {
    return (
      <div
        className="w-full h-full left-0 top-0 bg-gray-200 bg-opacity-50 fixed"
        style={{ zIndex: `${(index + 1) * 5}` }}
        onClick={(e) => {
          if ([...e.target?.classList]?.includes?.("modal-content")) {
            modals.pop();
            setModals([...modals]);
          }
        }}
      >
        <div className="grid h-screen place-items-center modal-content">
          {modal}
        </div>
      </div>
    );
  });
}
