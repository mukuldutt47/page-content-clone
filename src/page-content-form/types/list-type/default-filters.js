import React, { useContext } from "react";
import { FormContext } from "../../../App";
import { TextInput } from "../../inputs";
export default function DefaultFilters({ pageContentData }) {
  const context = useContext(FormContext);
  const { setData, data, onDynamicUpdate } = context;

  return (
    <TextInput
      label={"Default Filter"}
      value={pageContentData.content?.defaultFilters}
      onChange={onDynamicUpdate(["defaultFilters"], null, pageContentData)}
    />
  );
}
