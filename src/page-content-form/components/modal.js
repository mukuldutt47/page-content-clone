import React, { useContext, useEffect, useState } from "react";
import { FormContext } from "../../App";

export default function Modal({ modal }) {
  const formContext = useContext(FormContext);
  const [modals, setModals] = useState([]);
  useEffect(() => {
    if (modal?.typeId && modal.data && modal.id) {
      const index = modals.findIndex((v) => v.id == modal.id);
      if (index > -1) {
        modals[index].data = modal.data;
        return setModals([...modals]);
      }
      setModals([
        ...modals,
        { isHidden: true, data: modal.data, id: modal.id },
      ]);
    }
  }, [modal?.typeId]);
  useEffect(() => {
    if (modal?.toggleModal?.id) {
      // setModals([...modals, modal.data]);
      modals.forEach((modalData) => {
        if (modal.toggleModal.id == modalData.id) {
          modalData.isHidden = !modal.toggleModal.value;
        }
      });
      setModals([...modals]);
    }
  }, [modal?.toggle]);

  useEffect(() => {
    if (modal?.remove && modal.id) {
      setModals([
        ...modals.filter((v) => !v.id?.includes(`${modal.id}`)),
      ]);
    }
  }, [modal?.remove]);
  return modals.map(({ data, isHidden, id }, index) => {
    return (
      <div
        className="w-full h-full left-0 top-0 bg-gray-200 bg-opacity-50 fixed"
        style={{
          zIndex: `${(index + 1) * 5}`,
          display: (isHidden && "none") || "unset",
        }}
        onClick={(e) => {
          if ([...e.target?.classList]?.includes?.("modal-content")) {
            modals.forEach((modalData) => {
              if (e.target?.getAttribute?.("modalid") === `${modalData.id}`) {
                modalData.isHidden = true;
              }
            });
            setModals([...modals]);
          }
        }}
      >
        <div
          modalid={id}
          className="grid h-screen place-items-center modal-content"
        >
          {data}
        </div>
      </div>
    );
  });
}
