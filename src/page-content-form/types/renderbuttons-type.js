import React, { useContext, useEffect } from "react";
import { FormContext } from "../../App";
import { DataGrid, PageContentWrapper } from "../components";
import { DropDown, TextInput } from "../inputs";
export default function RenderButtons({ pageContentData }) {
  const context = useContext(FormContext);
  const { setData, data, onDynamicUpdate } = context;
  useEffect(() => {
    if (!Array.isArray(pageContentData?.content?.buttonList)) {
      pageContentData.content = {
        buttonList: getEmptyRenderButton(),
      };
      setData([...context.data]);
    }
  }, []);
  const buttonList = pageContentData?.content?.buttonList;
  return (
    <PageContentWrapper label={"Render Buttons"}>
      <DataGrid
        onRemove={(index) => {
          onDynamicUpdate(
            ["buttonList"],
            null,
            pageContentData
          )({
            target: {
              value: pageContentData?.content?.buttonList?.filter(
                (_, i) => i !== index
              ),
            },
          });
        }}
        onAdd={() => {
          onDynamicUpdate(
            ["buttonList"],
            null,
            pageContentData
          )({
            target: {
              value: [
                ...(pageContentData?.content?.buttonList ||
                  getEmptyRenderButton()),
                getEmptyRenderButton(),
              ],
            },
          });
        }}
      >
        {buttonList?.map((button, index) => {
          return (
            <Button
              button={button}
              index={index}
              pageContentData={pageContentData}
              context={context}
            />
          );
        })}
      </DataGrid>
    </PageContentWrapper>
  );
}

function Button({ context, button, pageContentData, index }) {
  const fields = [
    { name: "Icon", value: "icon" },
    { name: "Rule", value: "rule" },
  ];
  return (
    <div className="flex flex-col gap-3">
      <div className="flex gap-3 flex-wrap">
        {fields.map(({ name, value }) => {
          return (
            <TextInput
              label={name}
              value={button[value]}
              onChange={context.onDynamicUpdate(
                ["buttonList", index, value],
                null,
                pageContentData
              )}
            />
          );
        })}
        <TextInput
          label={"Form Id"}
          value={button?.details?.[0]?.form_id}
          onChange={context.onDynamicUpdate(
            ["buttonList", index, "details", 0, "form_id"],
            null,
            pageContentData
          )}
        />
        <DropDown
          label={"Button Type"}
          data={[
            { label: "Export To Pdf", value: "exportToPDF" },
            { label: "Form", value: "form" },
          ]}
          value={button?.details?.[0]?.type}
          onChange={context.onDynamicUpdate(
            ["buttonList", index, "details", 0, "type"],
            null,
            pageContentData
          )}
        />
      </div>
    </div>
  );
}
function getEmptyRenderButton() {
  return [{ details: [{}] }];
}
