import React, { useContext } from "react";
import { PageContent } from ".";
import { FormContext } from "../../App";
import { DataGrid } from "../components";
import { TextInput } from "../inputs";

export default function Page({ pageIndex, pageData }) {
  const context = useContext(FormContext);
  const currentData = context.data[pageIndex];
  const setData = (key) => {
    return (e) => {
      currentData[key] = e.target.value;
      context.setData([...context.data]);
    };
  };
  const onAdd = () => {
    currentData?.content?.push({
      type: "",
      content: {},
    });
    context.setData([...context.data]);
  };
  const onRemove = (index) => {
    const clone = [...context.data[pageIndex]?.content];
    const idx = clone.findIndex((_, cloneIdx) => cloneIdx == index);
    if (idx > -1) {
      context.data[pageIndex].content.splice(idx, 1);
      context.setData([...context.data]);
    }
  };
  return (
    <div className="flex gap-4 flex-wrap">
      <div className="flex-1 flex flex-col gap-2">
        <TextInput
          label={"Name"}
          value={pageData.name}
          onChange={setData("name")}
        />
        <TextInput
          label={"Description"}
          value={pageData.description}
          onChange={setData("description")}
        />
      </div>
      <div className="flex-1">
        <DataGrid onAdd={onAdd} onRemove={onRemove}>
          {pageData.content.map((c, contentTypeIndex) => {
            return (
              <PageContent
                pageIndex={pageIndex}
                contentTypeIndex={contentTypeIndex}
                pageContentData={
                  context?.data?.[pageIndex]?.content?.[contentTypeIndex]
                }
              />
            );
          })}
        </DataGrid>
      </div>
    </div>
  );
}
