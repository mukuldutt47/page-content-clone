import React, { useContext, useEffect } from "react";
import { FormContext } from "../../../App";
import { DataGrid } from "../../components";
import { Checkbox, DropDown, TextInput } from "../../inputs";

export default function ActionButtons({ pageContentData }) {
  const context = useContext(FormContext);
  const { setData, data, onDynamicUpdate } = context;
  const intializers = ["actions"];
  useEffect(() => {
    for (let intializer of intializers) {
      if (typeof pageContentData?.content?.[intializer] != "object") {
        pageContentData.content[intializer] = [getNewActionButton()];
      }
    }
    setData([...context.data]);
  }, []);
  return (
    <DataGrid
      onRemove={(index) => {
        onDynamicUpdate(
          ["actions"],
          null,
          pageContentData
        )({
          target: {
            value: pageContentData?.content?.actions?.filter(
              (_, i) => i !== index
            ),
          },
        });
      }}
      onAdd={() => {
        onDynamicUpdate(
          ["actions"],
          null,
          pageContentData
        )({
          target: {
            value: [
              ...(pageContentData?.content?.actions || getNewActionButton()),
              getNewActionButton(),
            ],
          },
        });
      }}
    >
      {pageContentData?.content?.actions?.map((actionBtn, index) => {
        return (
          <ActionButton
            actionBtn={actionBtn}
            pageContentData={pageContentData}
            index={index}
            context={context}
          />
        );
      })}
    </DataGrid>
  );
}
function ActionButton({ context, actionBtn, pageContentData, index }) {
  const fields = [
    { name: "Name", value: "Name" },
    { name: "Icon", value: "icon" },
    { name: "Display Rule", value: "rule" },
  ];
  return (
    <div className="flex flex-col gap-3">
      <div className="flex gap-3 flex-wrap">
        {fields.map(({ name, value }) => {
          return (
            <TextInput
              label={name}
              value={actionBtn[value]}
              onChange={context.onDynamicUpdate(
                ["actions", index, value],
                null,
                pageContentData
              )}
            />
          );
        })}
      </div>
      <Checkbox
        label={"Default Action"}
        value={!!actionBtn['defaultAction']}
        onClick={context.onDynamicUpdate(
          ["actions", index, 'defaultAction'],
          null,
          pageContentData
        )}
      />
      <DropDown
        label={"Pages"}
        data={context.getPages?.()}
        value={actionBtn?.details?.[0].page_id}
        onChange={context.onDynamicUpdate(
          ["actions", index, "details", 0, "page_id"],
          null,
          pageContentData
        )}
      />
    </div>
  );
}

function getNewActionButton() {
  return { details: [{ type: "Page", page_id: "" }] };
}
