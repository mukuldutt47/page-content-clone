import React, { useContext, useEffect } from "react";
import { FormContext } from "../../../App";
import { DataGrid } from "../../components";
import { PageContent } from "../../contents";
import { Checkbox, TextInput } from "../../inputs";

export default function ActionButtons({ pageContentData }) {
  const context = useContext(FormContext);
  const { setData, data, onDynamicUpdate } = context;
  const intializers = ["actions"];
  useEffect(() => {
    for (let intializer of intializers) {
      if (typeof pageContentData?.content?.[intializer] != "object") {
        pageContentData.content[intializer] = []//getNewActionButton()];
      }
    }
    setData([...context.data]);
  }, []);
  return (
    <DataGrid
    optional={true}
      onRemove={(index) => {
        onDynamicUpdate(
          ["content" ,"actions"],
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
          ["content" ,"actions"],
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
                ["content" ,"actions", index, value],
                null,
                pageContentData
              )}
            />
          );
        })}
      </div>
      <Checkbox
        label={"Default Action"}
        value={!!actionBtn["defaultAction"]}
        onClick={context.onDynamicUpdate(
          ["content" ,"actions", index, "defaultAction"],
          null,
          pageContentData
        )}
      />
      <PageContent pageContentData={actionBtn?.details[0]}/>
    </div>
  );
}

function getNewActionButton() {
  return { details: [{ type: "", content: {} }] };
}
