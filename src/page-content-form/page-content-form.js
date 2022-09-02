import React, { useContext } from "react";
import { FormContext } from "../App";
import { DataGrid } from "./components";
import { Page } from "./contents";
export default function PageContentForm() {
  const appContext = useContext(FormContext);
  const onAdd = () => {
    appContext.setData([...appContext.data, getNewPage()]);
  };
  const onRemove = (index) => {
    const clone = [...appContext.data];
    const idx = clone.findIndex(
      ({ uuid }) => uuid == appContext.data[index].uuid
    );
    if (idx > -1) {
      clone.splice(idx, 1);
      appContext.setData(clone);
    }
  };
  return (
    <DataGrid onAdd={onAdd} onRemove={onRemove}>
      {(appContext.data || [{}]).map((v, index) => {
        return <Page pageIndex={index} pageData={v} />;
      })}
    </DataGrid>
  );
}
function getNewPage() {
  return {
    uuid: Math.random(),
    content: [{}],
  };
}
