import React, { useContext, useEffect } from "react";
import { FormContext } from "../../../App";
import { DataGrid, PageContentWrapper } from "../../components";
import { Checkbox, Radio, TextInput } from "../../inputs";

export default function BasicConfig({ pageContentData }) {
  const context = useContext(FormContext);
  const { setData, data, onDynamicUpdate } = context;
  const updateState = () => {
    setData([...context.data]);
  };
  const intializers = ["listOptions", "pageable", "exportToPDF"];
  useEffect(() => {
    if (!pageContentData.content) {
      pageContentData.content = {};
    }
    for (let intializer of intializers) {
      if (typeof pageContentData?.content?.[intializer] != "object") {
        pageContentData.content[intializer] = {};
        if (intializer === "pageable") {
          pageContentData.content[intializer] = { count: [10] };
        }
      }
    }
    updateState();
  }, []);

  const configCheckboxes = [
    //listOptions
    { name: "Filterable", value: "filterable" },
    { name: "Sortable", value: "sortable" },
    { name: "Resizable", value: "resizable" },
    { name: "Pageable", value: "pageable" },
    { name: "Export To Excel", value: "exportToExcel" },
    { name: "Export To PDF", value: "exportToPdf" },
    { name: "Auto Refresh", value: "autoRefresh" },
    { name: "Search On Enter", value: "searchOnEnter" },
    { name: "Expandable", value: "expandable" },
    { name: "Disable Context Action", value: "disableContextAction" },
  ];
  const pdfExportConfig = [
    { name: "Top", value: "top" },
    { name: "Bottom", value: "bottom" },
    { name: "Left", value: "left" },
    { name: "Right", value: "right" },
    { name: "Author", value: "author" },
    { name: "File Name Template", value: "fileNameTemplate" },
    { name: "Paper Size", value: "paperSize" },
  ];
  return (
    <div className="flex flex-col gap-4">
      <TextInput
        label={"Route"}
        onChange={onDynamicUpdate(["route"], null, pageContentData)}
        value={pageContentData.content?.route}
      />
      {configCheckboxes.map(({ name, value }) => {
        return (
          <Checkbox
            label={name}
            value={!!pageContentData?.content?.listOptions?.[value]}
            onClick={onDynamicUpdate(
              ["listOptions", value],
              "checked",
              pageContentData
            )}
          />
        );
      })}
      <TextInput
        label={"Auto Refresh Interval"}
        value={pageContentData?.content?.autoRefresh}
        onChange={onDynamicUpdate(["autoRefresh"], null, pageContentData)}
      />
      <PageContentWrapper label={"Paging Options"} width="w-full">
        <div className="flex gap-3  flex-wrap">
          <div className="flex-1">
            <TextInput
              label={"Button Count"}
              value={pageContentData?.content?.pageable?.["buttonCount"]}
              onChange={onDynamicUpdate(
                ["pageable", "buttonCount"],
                null,
                pageContentData
              )}
            />
          </div>
          <div className="flex-1">
            <DataGrid
              onRemove={(index) => {
                onDynamicUpdate(
                  ["pageable", "count"],
                  null,
                  pageContentData
                )({
                  target: {
                    value: pageContentData?.content?.pageable?.count?.filter(
                      (_, i) => i !== index
                    ),
                  },
                });
              }}
              onAdd={() => {
                onDynamicUpdate(
                  ["pageable", "count"],
                  null,
                  pageContentData
                )({
                  target: {
                    value: [
                      ...(pageContentData?.content?.pageable?.count || []),
                      "",
                    ],
                  },
                });
              }}
            >
              {pageContentData?.content?.pageable?.count?.map((v, index) => {
                return (
                  <TextInput
                    label={"Button Count"}
                    value={v}
                    onChange={({ target: { value } }) => {
                      pageContentData.content.pageable.count[index] = value;
                      updateState();
                    }}
                  />
                );
              })}
            </DataGrid>
          </div>
        </div>
      </PageContentWrapper>
      <PageContentWrapper label={"PDF Export Options"} width="w-full">
        <div className="flex gap-3  flex-wrap">
          {pdfExportConfig.map(({ name, value }) => {
            return (
              <div className="flex-1">
                <TextInput
                  label={name}
                  value={pageContentData?.content?.exportToPDF?.[value]}
                  onChange={onDynamicUpdate(
                    ["exportToPDF", value],
                    null,
                    pageContentData
                  )}
                />
              </div>
            );
          })}
          <div className="flex-1">
            <Checkbox
              label={"Repeat Headers"}
              value={!!pageContentData?.content?.exportToPDF?.["repeatHeaders"]}
              onClick={onDynamicUpdate(
                ["exportToPDF", "repeatHeaders"],
                "checked",
                pageContentData
              )}
            />
          </div>
          <div className="flex-1">
            <Radio
              data={[
                { label: "Portrait", value: "portrait" },
                { label: "Landscape", value: "landscape" },
              ]}
              value={pageContentData?.content?.exportToPDF?.["orientation"]}
              onClick={onDynamicUpdate(
                ["exportToPDF", "orientation"],
                null,
                pageContentData
              )}
            >
              Orientation
            </Radio>
          </div>
        </div>
      </PageContentWrapper>
    </div>
  );
}
