import React, { useContext, useEffect } from "react";
import { FormContext } from "../../../App";
import { DataGrid, PageContentWrapper } from "../../components";
import { Checkbox, Radio, TextInput } from "../../inputs";

export default function BasicConfig({ pageContentData }) {
  const context = useContext(FormContext);
  const { setData, data } = context;
  const updateState = () => {
    setData([...context.data]);
  };
  const intializers = ["listOptions", "pageable", "exportToPDF"];
  useEffect(() => {
    for (let intializer of intializers) {
      if (typeof pageContentData?.content?.[intializer] != "object") {
        pageContentData.content[intializer] = {};
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
  const onUpdate = (key, targetKey) => {
    return ({ target }) => {
      let evalData = eval(`pageContentData.content.${key.join(".")}`);
      evalData = target[targetKey || "value"];
      eval(`pageContentData.content.${key.join(".")} = evalData`);
      updateState();
    };
  };
  return (
    <div className="flex flex-col gap-4">
      <TextInput
        label={"Route"}
        onChange={onUpdate(["route"])}
        value={pageContentData.content?.route}
      />
      {configCheckboxes.map(({ name, value }) => {
        return (
          <Checkbox
            label={name}
            value={!!pageContentData?.content?.listOptions?.[value]}
            onClick={onUpdate(["listOptions", value], "checked")}
          />
        );
      })}
      <TextInput
        label={"Auto Refresh Interval"}
        value={pageContentData?.content?.autoRefresh}
        onChange={onUpdate(["autoRefresh"])}
      />
      <PageContentWrapper label={"Paging Options"} width="w-full">
        <div className="flex gap-3  flex-wrap">
          <div className="flex-1">
            <TextInput
              label={"Button Count"}
              value={pageContentData?.content?.pageable?.["buttonCount"]}
              onChange={onUpdate(["pageable", "buttonCount"])}
            />
          </div>
          <div className="flex-1">
            <DataGrid
              onRemove={(index) => {
                onUpdate(["pageable", "count"])({
                  target: {
                    value: pageContentData?.content?.pageable?.count?.filter(
                      (_, i) => i !== index
                    ),
                  },
                });
              }}
              onAdd={() => {
                onUpdate(["pageable", "count"])({
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
                  onChange={onUpdate(["exportToPDF", value])}
                />
              </div>
            );
          })}
          <div className="flex-1">
            <Checkbox
              label={"Repeat Headers"}
              value={!!pageContentData?.content?.exportToPDF?.["repeatHeaders"]}
              onClick={onUpdate(["exportToPDF", "repeatHeaders"], "checked")}
            />
          </div>
          <div className="flex-1">
            <Radio
              data={[
                { label: "Portrait", value: "portrait" },
                { label: "Landscape", value: "landscape" },
              ]}
              value={pageContentData?.content?.exportToPDF?.["orientation"]}
              onClick={onUpdate(["exportToPDF", "orientation"])}
            >
              Orientation
            </Radio>
          </div>
        </div>
      </PageContentWrapper>
    </div>
  );
}
