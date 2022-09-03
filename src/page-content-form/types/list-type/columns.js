import React, { useContext, useEffect } from "react";
import { FormContext } from "../../../App";
import { DataGrid, PageContentWrapper } from "../../components";
import { Checkbox, TextInput } from "../../inputs";
export default function Columns({ pageContentData }) {
  const context = useContext(FormContext);
  const { setData, data, onDynamicUpdate } = context;
  const intializers = ["columns"];
  useEffect(() => {
    for (let intializer of intializers) {
      if (typeof pageContentData?.content?.[intializer] != "object") {
        pageContentData.content[intializer] = [];
      }
    }
    setData([...context.data]);
  }, []);
  return (
    <DataGrid
      onRemove={(index) => {
        onDynamicUpdate(
          ["columns"],
          null,
          pageContentData
        )({
          target: {
            value: pageContentData?.content?.columns?.filter(
              (_, i) => i !== index
            ),
          },
        });
      }}
      onAdd={() => {
        onDynamicUpdate(
          ["columns"],
          null,
          pageContentData
        )({
          target: {
            value: [...(pageContentData?.content?.columns || [{}]), {}],
          },
        });
      }}
    >
      {pageContentData?.content?.columns?.map((column, index) => {
        return (
          <Column
            column={column}
            pageContentData={pageContentData}
            index={index}
            context={context}
          />
        );
      })}
    </DataGrid>
  );
}
function Column({
  column = {},
  onUpdate,
  pageContentData,
  updateState,
  index,
  context,
}) {
  const columnCofigs = [
    { name: "Filterable", value: "filterable" },
    { name: "Sortable", value: "sortable" },
    { name: "Locked", value: "locked" },
    { name: "Reorderable", value: "reorderable" },
  ];
  const firstFields = [
    { name: "Title", value: "title" },
    { name: "Field Key", value: "field" },
  ];
  const columnFields = [
    { name: "Width", value: "width" },
    { name: "Cell HTML ClassName", value: "class" },
    { name: "Header HTML ClassName", value: "headerClassName" },
  ];
  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-2 flex-wrap">
        {firstFields.map(({ name, value }) => {
          return (
            <TextInput
              label={name}
              value={column[value]}
              onChange={context.onDynamicUpdate(
                ["columns", index, value],
                null,
                pageContentData
              )}
            />
          );
        })}
      </div>
      <div className="flex gap-4">
        {columnCofigs.map(({ name, value }) => {
          return (
            <Checkbox
              label={name}
              value={!!column[value]}
              onClick={context.onDynamicUpdate(
                ["columns", index, value],
                "checked",
                pageContentData
              )}
            />
          );
        })}
      </div>
      <PageContentWrapper label={"Advance Options"} width="w-full">
        <div className="flex flex-col gap-2">
          <div className="flex gap-4 flex-wrap">
            {columnFields.map(({ name, value }) => {
              return (
                <TextInput
                  label={name}
                  value={column[value]}
                  onChange={context.onDynamicUpdate(
                    ["columns", index, value],
                    null,
                    pageContentData
                  )}
                />
              );
            })}
          </div>
          <TextInput
            label={"Cell HTML"}
            value={column.cell}
            onChange={context.onDynamicUpdate(
              ["columns", index, "cell"],
              null,
              pageContentData
            )}
          />
        </div>
      </PageContentWrapper>
    </div>
  );
}
